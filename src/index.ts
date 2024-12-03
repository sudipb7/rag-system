import * as envs from "./constants/env";
import { checkEnv, getAdvancedPrompt, openai } from "./utils";
import { rankDocuments, retrieveData, extractName, getOptimizedQuery } from "./utils/rag";

checkEnv(Object.keys(envs));

async function main(query: string) {
  const optimizedQuery = await getOptimizedQuery(query);
  const entityName = await extractName(optimizedQuery);
  const retrievedDocs = await retrieveData(optimizedQuery, { name: entityName });
  const relevantDocs = await rankDocuments(optimizedQuery, retrievedDocs, 3);

  const context = relevantDocs.map(doc => doc.content).join("\n\n");
  const prompt = getAdvancedPrompt(context);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: query },
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta.content ?? "");
  }
}

main("Tell me something about Koalas");
