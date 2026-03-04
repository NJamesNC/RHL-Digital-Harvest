import {
  type User,
  type InsertUser,
  type TrialSignup,
  type InsertTrialSignup,
  type ContactSubmission,
  type InsertContactSubmission,
  users,
  trialSignups,
  contactSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTrialSignup(data: InsertTrialSignup): Promise<TrialSignup>;
  getTrialSignupByEmail(email: string): Promise<TrialSignup | undefined>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createTrialSignup(data: InsertTrialSignup): Promise<TrialSignup> {
    const [signup] = await db.insert(trialSignups).values(data).returning();
    return signup;
  }

  async getTrialSignupByEmail(email: string): Promise<TrialSignup | undefined> {
    const [signup] = await db.select().from(trialSignups).where(eq(trialSignups.email, email));
    return signup || undefined;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();
