import { openai } from "../clients";

export async function generateEmbeddings(texts: string[]) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    dimensions: 256,
    input: texts,
  });

  return response.data.map(item => item.embedding);
}
