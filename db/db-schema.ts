import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { UserRoleEnum } from './enums';

export const DrizzleBaseModel = {
  id: text('id')
    .primaryKey()
    .unique()
    .$defaultFn(() => crypto.randomUUID())
    .generatedAlwaysAs('uuid')
    .notNull(),
  created_at: timestamp('created_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
export type TBaseModel = typeof DrizzleBaseModel;
export type TWithoutBaseModel<T> = Omit<T, keyof TBaseModel>;

export const users = pgTable('users', {
  ...DrizzleBaseModel,
  first_name: text('first_name').notNull(),
  last_name: text('last_name'),
  email: text('email').notNull().unique(),
  role: UserRoleEnum('role').notNull().default('user'),
});

export type TInsertUser = TWithoutBaseModel<typeof users.$inferInsert>;
export type TUser = typeof users.$inferSelect;
export type TUpdateUser = TWithoutBaseModel<TUser>;
