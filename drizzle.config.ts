import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/config";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
  schema: "./src/db/schema.ts",
});
