import OpenAI from "openai";
import { CohereClient } from "cohere-ai";

import { OPENAI_API_KEY, COHERE_API_KEY } from "../config";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY!,
});

export const cohere = new CohereClient({
  token: COHERE_API_KEY!,
});
