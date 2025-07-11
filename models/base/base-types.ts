import { boolean, text, timestamp } from 'drizzle-orm/pg-core';

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
  is_active: boolean('is_active').notNull().default(true),
  deleted_at: timestamp('deleted_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  }),
};
export type TBaseModel = typeof DrizzleBaseModel;
export type TWithoutBaseModel<T> = Omit<T, keyof TBaseModel>;
