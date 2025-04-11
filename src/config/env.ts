import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("90d"), // Changed from JWT_EXPIRATION to JWT_EXPIRES_IN
});

const parseEnv = () => {
  // Ensure environment variables are loaded
  if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    console.error("Missing required environment variables");
    throw new Error("Missing required environment variables");
  }

  const parsedEnv = {
    ...process.env,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };

  const result = envSchema.safeParse(parsedEnv);
  if (!result.success) {
    console.error("Invalid environment variables:", JSON.stringify(result.error.format(), null, 2));
    throw new Error("Invalid environment variables");
  }
  return result.data;
};

export const config = parseEnv();
export type Env = z.infer<typeof envSchema>;
