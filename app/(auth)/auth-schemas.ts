import { CreateUserSchema } from '@/models/user/user-schemas';

export const SigninSchema = CreateUserSchema.pick({
  email: true,
  password: true,
});
