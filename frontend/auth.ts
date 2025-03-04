import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

export const auth = betterAuth({
  database: createPool({
    host: DB_HOST,
    password: DB_PASSWORD,
    user: DB_USER,
    database: DB_NAME,
    port: Number(DB_PORT),
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
    fields: {
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
      isAdmin: "isAdmin",
      password: "password",
    },
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      isAdmin: {
        type: "boolean",
        defaultValue: false,
      },
      password: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        defaultValue: "",
      },
    },
  },
});
