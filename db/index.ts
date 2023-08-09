import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { messagesTable } from "./schema";

export const db = drizzle(sql, {
  schema: {
    messages: messagesTable,
  },
});
