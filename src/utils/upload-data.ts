import { db } from "../db";
import { facts } from "../db/schema";
import { generateEmbeddings } from "./generate-embeddings";
// import { MOCK_DATA } from "./mock-data";

interface Doc {
  name: string;
  content: string;
}

export async function uploadData(docs: Doc[]) {
  const embeddings = await generateEmbeddings(docs.map(doc => doc.content));

  await db.insert(facts).values(
    embeddings.map((embedding, index) => ({
      embedding,
      name: docs[index]!.name,
      content: docs[index]!.content,
    }))
  );
}

/**
 * ! This section is intended to be run once to initialize the database
 * ! with mock data for development purposes while setting up the project.
 */
// async function main() {
//   await uploadData(MOCK_DATA);
// }

// main();
