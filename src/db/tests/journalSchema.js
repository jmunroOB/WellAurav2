import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const journalTable = pgTable("Journal Entries", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    journalId: text("journal_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cotent: text("content"),
    createdAt: timestamp("created_at").defaultNow(),

})