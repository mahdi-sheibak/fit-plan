import { z } from '@zod/mini';

const ClientSchema = z.object({});

const ServerSchema = z.object({
  databaseUrl: z.string(),
  googleClientId: z.string(),
  googleClientSecret: z.string(),
  betterAuthSecret: z.string(),
});

export const clientConfig = ClientSchema.parse({});

export const serverConfig = ServerSchema.parse({
  databaseUrl: process.env.DATABASE_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET,
});
