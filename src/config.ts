import { config } from "dotenv";

config({ path: ".env.local" });

export const { OPENAI_API_KEY, DATABASE_URL, COHERE_API_KEY } = process.env;
