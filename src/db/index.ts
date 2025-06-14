import { drizzle } from 'drizzle-orm/postgres-js';

import { serverConfig } from '@/lib/config';

export const db = drizzle(serverConfig.databaseUrl);
