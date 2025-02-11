import { z } from 'zod';

import { CreateUserSchema } from '@/db/schema';

export const SigninSchema = CreateUserSchema.pick({
  email: true,
  password: true,
});
