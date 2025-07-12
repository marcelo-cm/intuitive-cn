import type { ElementType } from 'react';

import {
  CopyIcon,
  MousePointerIcon,
  RefreshCcwDotIcon,
  SearchIcon,
  Zap,
} from 'lucide-react';

import {
  IContentConfig,
  IContentGroup,
} from '@/app/[topic]/_constants/content-types';

import useCopyToClipboardConfig from './use-copy-to-clipboard/config';
import useRemoteTriggerConfig from './use-remote-trigger/config';
import useSyncedStateConfig from './use-synced-state/config';
import useUpdateSearchParamsConfig from './use-update-search-params/config';

function createHookItem(config: IContentConfig, Icon: ElementType) {
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
    href: `/hooks/${slug}`,
    Icon,
  };
}

const CONTENT: IContentGroup = {
  title: 'Hooks',
  Icon: Zap,
  items: [
    createHookItem(useCopyToClipboardConfig, CopyIcon),
    createHookItem(useRemoteTriggerConfig, MousePointerIcon),
    createHookItem(useUpdateSearchParamsConfig, SearchIcon),
    createHookItem(useSyncedStateConfig, RefreshCcwDotIcon),
  ],
};

export default CONTENT;
