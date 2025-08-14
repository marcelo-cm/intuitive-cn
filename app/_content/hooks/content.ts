import type { ElementType } from 'react';

import {
  CopyIcon,
  KeyboardIcon,
  ListTreeIcon,
  MousePointerIcon,
  RefreshCcwDotIcon,
  SearchIcon,
  Zap,
} from 'lucide-react';

import {
  IContentConfig,
  IContentGroup,
} from '@/app/[topic]/_constants/content-types';

import useAutoFocusedInputConfig from './use-auto-focused-input/config';
import useCopyToClipboardConfig from './use-copy-to-clipboard/config';
import useFuzzySearchGroupsConfig from './use-fuzzy-search-groups/config';
import useFuzzySearchConfig from './use-fuzzy-search/config';
import useHasMountedConfig from './use-has-mounted/config';
import useRemoteTriggerConfig from './use-remote-trigger/config';
import useSyncedStateConfig from './use-synced-state/config';

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
    // createHookItem(useUpdateSearchParamsConfig, SearchIcon),
    createHookItem(useRemoteTriggerConfig, MousePointerIcon),
    createHookItem(useSyncedStateConfig, RefreshCcwDotIcon),
    createHookItem(useAutoFocusedInputConfig, KeyboardIcon),
    createHookItem(useHasMountedConfig, RefreshCcwDotIcon),
    createHookItem(useFuzzySearchConfig, SearchIcon),
    createHookItem(useFuzzySearchGroupsConfig, ListTreeIcon),
  ],
};

export default CONTENT;
