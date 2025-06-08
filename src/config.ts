import { z } from '@zod/mini';

const ClientSchema = z.object({});

const ServerSchema = z.object({
  database_url: z.string(),
});

export const clientConfig = ClientSchema.parse({});

export const serverConfig = ServerSchema.parse({
  database_url: process.env.DATABASE_URL,
});
