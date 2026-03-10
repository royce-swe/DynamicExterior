import { db } from "./db";
import { contactMessages, type CreateContactMessageRequest, type ContactMessageResponse } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse>;
  getAllContactMessages(): Promise<ContactMessageResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async getAllContactMessages(): Promise<ContactMessageResponse[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
}

export const storage = new DatabaseStorage();
