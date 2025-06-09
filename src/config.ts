import { z } from '@zod/mini';

const ClientSchema = z.object({});

const ServerSchema = z.object({
  databaseUrl: z.string(),
});

export const clientConfig = ClientSchema.parse({});

export const serverConfig = ServerSchema.parse({
  databaseUrl: process.env.DATABASE_URL,
});
