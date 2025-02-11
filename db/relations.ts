import { relations } from 'drizzle-orm';

import { users } from './db-schema';

export const usersRelations = relations(users, ({}) => ({}));
