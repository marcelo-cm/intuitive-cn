import { pgTable, text } from 'drizzle-orm/pg-core';

import { DrizzleBaseModel } from '@/models/base/base-types';
import { OrganizationTier } from '@/models/organization/organization-enums';
import { UserRole } from '@/models/user/user-enums';

import { OrganizationTierEnum, UserRoleEnum } from './enums';

export const organizations = pgTable('organizations', {
  ...DrizzleBaseModel,
  name: text('name').notNull(),
  logo_url: text('logo_url'),
  tier: OrganizationTierEnum('tier').notNull().default(OrganizationTier.FREE),
});

export const users = pgTable('users', {
  ...DrizzleBaseModel,
  first_name: text('first_name').notNull(),
  last_name: text('last_name'),
  email: text('email').notNull().unique(),
  role: UserRoleEnum('role').notNull().default(UserRole.USER),
  organization_id: text('organization_id').references(() => organizations.id, {
    onDelete: 'cascade',
  }),
});
