import { pgEnum } from 'drizzle-orm/pg-core';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export const UserRoleEnum = pgEnum(
  'role',
  Object.values(UserRole) as [string, ...string[]],
);
