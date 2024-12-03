import { Doc } from "../types";
import { cohere } from "./clients";
// import { retrieveData } from "./retrieve-data";

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

// async function main() {
//   const retrievedDocs = await retrieveData("I want to learn about animal sleep");
//   console.log("Retieved Docs: ", retrievedDocs);
//   const documents = await rankDocuments("I want to learn about animal sleep", retrievedDocs);
//   console.log("Reranked Docs: ", documents);
// }

// main();
