import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
export const auth = betterAuth({
  database: new Database("/../db/database.db"),
  // Other options
  emailAndPassword: {
    enabled: true,
  },
});
