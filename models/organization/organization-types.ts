import { z } from 'zod';

import {
  CreateOrganizationSchema,
  OrganizationSchema,
  UpdateOrganizationSchema,
} from '@/models/organization/organization-schemas';

export type TOrganization = z.infer<typeof OrganizationSchema>;
export type TCreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type TUpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
