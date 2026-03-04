# RHL Digital - Marketing Website

## Overview
Marketing website for RHL Digital, an AI-powered business services company offering AI Voice Receptionist and Smart Websites for small businesses. Features a 7-day free trial signup, interactive pricing calculator, contact form, and AI-powered live chat widget.

## Tech Stack
- **Frontend**: React + TypeScript, Vite, Tailwind CSS, Shadcn UI, Framer Motion, wouter
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Chat**: OpenAI via Replit AI Integrations (gpt-5.2 for chat assistant)

## Architecture
- Single-page marketing landing page with smooth scroll navigation
- No sidebar - this is a public-facing marketing site
- Backend serves API endpoints for trial signups, contact form, and AI chat
- Chat widget uses streaming SSE for real-time AI responses

## Key Files
- `client/src/pages/home.tsx` - Main landing page assembling all sections
- `client/src/components/` - All section components (navbar, hero, problem, services, pricing, etc.)
- `shared/schema.ts` - Database schema (users, trial_signups, contact_submissions, conversations, messages)
- `server/routes.ts` - API routes (trial signup, contact, chat)
- `server/storage.ts` - Database storage layer using Drizzle
- `server/db.ts` - Database connection pool

## Database Tables
- `users` - Base user table (UUID primary key)
- `trial_signups` - 7-day trial registrations (serial PK)
- `contact_submissions` - Contact form entries (serial PK)
- `conversations` - AI chat conversations (serial PK)
- `messages` - AI chat messages (serial PK)

## Color Scheme
- Navy Blue (primary): #1e3a5f / HSL 215 55% 25%
- Gold (accent): #d4af37 / HSL 43 74% 49%
- Typography: Plus Jakarta Sans (sans), Playfair Display (serif)

## Branding
- Company: RHL Digital
- Tagline: "Innovation with Integrity"
- Services: AI Voice Receptionist, Smart Websites
- Trial: 7-day free, no credit card required
- Plans: Starter ($97/mo), Growth ($197/mo), Enterprise ($397/mo)
- Discount: 15% off first 3 months if signup before trial ends

## Environment
- OpenAI integration via Replit AI Integrations (no API key needed)
- DATABASE_URL for PostgreSQL
- SESSION_SECRET available
