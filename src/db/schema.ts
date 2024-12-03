import { index, pgTable, text, serial, timestamp, vector } from "drizzle-orm/pg-core";

export const facts = pgTable(
  "facts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 256 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  table => ({
    embedding_index: index("embedding_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export type InsertFacts = typeof facts.$inferInsert;
export type SelectFacts = typeof facts.$inferSelect;
