import { drizzle } from 'drizzle-orm/postgres-js';

import { serverConfig } from '@/config';

export const db = drizzle(serverConfig.databaseUrl);
