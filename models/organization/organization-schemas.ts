import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { organizations } from '@/db/db-schema';

export const OrganizationSchema = createSelectSchema(organizations);
export const CreateOrganizationSchema = createInsertSchema(organizations);
export const UpdateOrganizationSchema = createInsertSchema(organizations);
