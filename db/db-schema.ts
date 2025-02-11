import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { UserRoleEnum } from './enums';

export const DrizzleBaseModel = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
};

export const users = pgTable('users', {
  ...DrizzleBaseModel,
  first_name: text('first_name').notNull(),
  last_name: text('last_name'),
  email: text('email').notNull(),
  role: UserRoleEnum(),
});

export type TInsertUser = typeof users.$inferInsert;
export type TUser = typeof users.$inferSelect;
export type TUpdateUser = Omit<TUser, keyof typeof DrizzleBaseModel>;
