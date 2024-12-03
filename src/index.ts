import * as envs from "./config";
import { checkEnv } from "./utils/checkEnv";
import { extractName } from "./utils/filter-metadata";
import { getOptimizedQuery } from "./utils/optimize-query";
import { rankDocuments } from "./utils/rerank-documents";
import { retrieveData } from "./utils/retrieve-data";

checkEnv(Object.keys(envs));

export async function processQuery(query: string) {
  const optimizedQuery = await getOptimizedQuery(query);
  // console.log("Optimized Query:", optimizedQuery);

  const entityName = await extractName(optimizedQuery);
  // console.log("Entity Name:", entityName);

  const retrievedDocs = await retrieveData(optimizedQuery, { name: entityName });
  // console.log("Retrieved Docs:", retrievedDocs);

  const rankedResults = await rankDocuments(optimizedQuery, retrievedDocs, 3);
  // console.log("Ranked Results:", rankedResults);

  return rankedResults;
}

// async function main() {
//   const query = "Can sea otters use tools?";
//   const results = await processQuery(query);
//   console.log("Results:", results);
// }

// main();
