import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import { serverConfig } from '@/lib/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverConfig.databaseUrl,
  },
});
