import { ElementType } from 'react';

import { IContentConfig } from '../../_constants/content-types';

export function getContentURL(topic: string, slug: string): string {
  return `/repository/${topic}/${slug}`;
}

export function createHookItem(config: IContentConfig, Icon: ElementType) {
  // Convert title to kebab-case for URL slug
  const slug = config.title
    .split(/(?=[A-Z])/) // Split by capital letters
    .join('-') // Join with hyphens
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric chars except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  return {
    ...config,
    href: getContentURL('hooks', slug),
    Icon,
  };
}
