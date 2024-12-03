import { Doc } from "../../types";
// import { ELEPHANT_WIKI } from "./mock-data";

// Splits the text into chunks of a specified size
// Useful for splitting the text into smaller chunks to avoid exceeding the token limit
export async function splitText(data: Doc[]) {
  const chunks: Doc[] = [];

  const CHUNK_SIZE = 500;

  for (const { content, name } of data) {
    const words = content.split(/\s+/);

    for (let i = 0; i < words.length; i += CHUNK_SIZE) {
      const chunkWords = words.slice(i, i + CHUNK_SIZE);
      chunks.push({ content: chunkWords.join(" "), name });
    }
  }

  return chunks;
}

// async function main() {
//   const chunks = await splitText([{ content: ELEPHANT_WIKI, name: "Elephants" }]);
//   console.log(chunks);
//   console.log(chunks.length);
// }

// main();
