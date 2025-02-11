import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from './db-schema';

export const UserSchema = createSelectSchema(users);
export const CreateUserSchema = createInsertSchema(users)
  .pick({
    first_name: true,
    last_name: true,
    email: true,
  })
  .extend({
    password: z.string().min(8, '8 characters minimum'),
  });
export const UpdateUserSchema = createInsertSchema(users).partial();
