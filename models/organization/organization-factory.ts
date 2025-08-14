import { faker } from '@faker-js/faker';

import buildFakeBase from '../base/base-factory';
import type { TBaseModel, TWithoutBaseModel } from '../base/base-types';
import { buildMany } from '../base/base-utils';
import { OrganizationTier } from './organization-enums';
import type { TOrganization } from './organization-types';

export function buildFakeOrganization(
  options: {
    baseOverride?: Partial<TBaseModel>;
    override?: Partial<TWithoutBaseModel<TOrganization>>;
  } = {},
): TOrganization {
  const { baseOverride, override } = options;
  const base = buildFakeBase(baseOverride);
  const organization: TOrganization = {
    ...base,
    name: faker.company.name(),
    logo_url: faker.image.url(),
    tier: faker.helpers.enumValue(OrganizationTier),
  };

  return { ...organization, ...override };
}

export function buildFakeOrganizations(
  count = 1,
  optionsFactory?: (index: number) => {
    baseOverride?: Partial<TBaseModel>;
    override?: Partial<TWithoutBaseModel<TOrganization>>;
  },
): TOrganization[] {
  return buildMany(
    (index) => buildFakeOrganization(optionsFactory?.(index)),
    count,
  );
}

export default buildFakeOrganization;
