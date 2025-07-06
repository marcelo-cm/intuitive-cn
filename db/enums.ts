import { pgEnum } from 'drizzle-orm/pg-core';

import { OrganizationTier } from '@/models/organization/organization-enums';
import { UserRole } from '@/models/user/user-enums';

export const UserRoleEnum = pgEnum(
  'role',
  Object.values(UserRole) as [string, ...string[]],
);

export const OrganizationTierEnum = pgEnum(
  'tier',
  Object.values(OrganizationTier) as [string, ...string[]],
);
