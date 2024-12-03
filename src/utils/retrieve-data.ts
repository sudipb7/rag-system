import { and, cosineDistance, desc, gt, sql } from "drizzle-orm";

import { db } from "../db";
import { facts } from "../db/schema";
import { generateEmbeddings } from "./generate-embeddings";

/**
 * Retrieves documents based on input text,
 * applying filters for similarity and name if provided.
 * These documents will be used later on as context for the LLM.
 */
export async function retrieveData(
  input: string,
  options: { limit?: number; minSimilarity?: number; name?: string | null } = {}
) {
  const { limit = 10, minSimilarity = 0.3, name = null } = options;

  const embeddings = await generateEmbeddings([input]);
  if (!embeddings[0]?.length) {
    throw new Error("No embeddings found");
  }

  // Calculate the similarity between the input and each document using cosine distance.
  // I should have paid more attention in math class
  const similarity = sql<number>`1 - (${cosineDistance(facts.embedding, embeddings[0])})`;

  const documents = await db
    .select({
      name: facts.name,
      content: facts.content,
      similarity,
    })
    .from(facts)
    .where(
      name
        ? and(gt(similarity, minSimilarity), sql`LOWER(${facts.name}) = LOWER(${name})`)
        : gt(similarity, minSimilarity)
    )
    .orderBy(t => desc(t.similarity))
    .limit(limit);

  return documents;
}

// Testing
// async function main() {
//   const documents = await retrieveData("Tell me about elephants");
//   console.log(documents);
// }

// main();
