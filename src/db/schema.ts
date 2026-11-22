import { pgTable, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "saved",
  "applied",
  "interview",
  "rejected",
]);

export const offers = pgTable("offers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description"),
  url: text("url").notNull().unique(),
  status: statusEnum("status").notNull().default("saved"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
