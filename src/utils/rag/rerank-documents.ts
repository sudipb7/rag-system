import { Doc } from "../../types";
import { cohere } from "../clients";

// Rerank the retrieved documents based on their relevance to the query using Cohere's Rerank API
export async function rankDocuments(query: string, documents: Doc[], limit = 5) {
  const rerank = await cohere.v2.rerank({
    documents: documents.map(doc => ({ text: doc.content })),
    query,
    topN: limit,
    model: "rerank-english-v3.0",
  });

  return rerank.results.map(result => ({
    name: documents[result.index]?.name,
    content: documents[result.index]?.content,
    relevanceScore: result.relevanceScore,
  }));
}
