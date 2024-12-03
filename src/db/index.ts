import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { DATABASE_URL } from "../constants/env";
import { facts } from "./schema";

const schema = { facts };

function init(url: string) {
  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema });
}

export const db = init(DATABASE_URL!);
