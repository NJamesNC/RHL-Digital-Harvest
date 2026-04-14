import type { Express } from "express";
import express from "express";
import path from "path";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTrialSignupSchema, insertContactSubmissionSchema } from "@shared/schema";
import { registerChatRoutes } from "./replit_integrations/chat";
import OpenAI from "openai";
import { chatStorage } from "./replit_integrations/chat/storage";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const publicDir = path.resolve(process.cwd(), "public");
  app.use(express.static(publicDir));

  app.get("/audit", (_req, res) => {
    res.sendFile(path.join(publicDir, "audit.html"));
  });

  app.post("/api/trial-signups", async (req, res) => {
    try {
      const parsed = insertTrialSignupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data", details: parsed.error.errors });
      }

      const existing = await storage.getTrialSignupByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const signup = await storage.createTrialSignup(parsed.data);
      res.status(201).json(signup);
    } catch (error) {
      console.error("Error creating trial signup:", error);
      res.status(500).json({ error: "Failed to create trial signup" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data", details: parsed.error.errors });
      }

      const submission = await storage.createContactSubmission(parsed.data);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/api/chat/conversations", async (_req, res) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.post("/api/chat/conversations", async (req, res) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(title || "New Chat");
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  app.post("/api/chat/conversations/:id/messages", async (req, res) => {
    try {
      if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY || !process.env.AI_INTEGRATIONS_OPENAI_BASE_URL) {
        return res.status(503).json({ error: "AI service not configured" });
      }

      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: "Invalid conversation ID" });
      }

      const { content } = req.body;
      if (!content || typeof content !== "string" || content.length > 5000) {
        return res.status(400).json({ error: "Message content is required and must be under 5000 characters" });
      }

      await chatStorage.createMessage(conversationId, "user", content);

      const messages = await chatStorage.getMessagesByConversation(conversationId);
      const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
        {
          role: "system",
          content: `You are the RHL Digital sales assistant on the RHL Digital website. Your job is to help potential customers understand the value of RHL Digital's services.

RHL Digital offers two main products:
1. AI Voice Receptionist - A 24/7 AI-powered phone assistant that answers calls, captures leads, books appointments, and provides business information. Plans start at $97/month.
2. Smart Websites - Modern, mobile-first websites with built-in lead capture forms, online scheduling, and SEO optimization.

Key selling points:
- 62% of calls to small businesses go unanswered
- 78% of customers buy from whoever responds first
- A full-time receptionist costs $35,000+/year
- RHL Digital's AI works 24/7/365 for a fraction of the cost
- 7-day free trial, no credit card required
- 15% off if they subscribe before trial ends

Pricing plans: Starter ($97/mo), Growth ($197/mo - most popular), Enterprise ($397/mo)

Company tagline: "Innovation with Integrity"

Be helpful, enthusiastic but not pushy. Guide customers toward the free trial. Answer questions accurately and concisely. If they ask something you don't know, suggest they use the contact form or call directly.`,
        },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: chatMessages,
        stream: true,
        max_completion_tokens: 8192,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      await chatStorage.createMessage(conversationId, "assistant", fullResponse);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to process message" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  return httpServer;
}
