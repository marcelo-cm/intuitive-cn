import {
  CopyIcon,
  KeyboardIcon,
  ListTreeIcon,
  MousePointerIcon,
  RefreshCcwDotIcon,
  SearchIcon,
  Zap,
} from 'lucide-react';

import { IContentGroup } from '@/app/repository/_constants/content-types';

import { createHookItem } from '../_utils/helper-utils';
import useAutoFocusedInputConfig from './use-auto-focused-input/config';
import useCopyToClipboardConfig from './use-copy-to-clipboard/config';
import useFuzzySearchGroupsConfig from './use-fuzzy-search-groups/config';
import useFuzzySearchConfig from './use-fuzzy-search/config';
import useHasMountedConfig from './use-has-mounted/config';
import useRemoteTriggerConfig from './use-remote-trigger/config';
import useSyncedStateConfig from './use-synced-state/config';

const CONTENT: IContentGroup = {
  title: 'Hooks',
  Icon: Zap,
  items: [
    createHookItem(useCopyToClipboardConfig, CopyIcon),
    createHookItem(useRemoteTriggerConfig, MousePointerIcon),
    createHookItem(useSyncedStateConfig, RefreshCcwDotIcon),
    createHookItem(useAutoFocusedInputConfig, KeyboardIcon),
    createHookItem(useHasMountedConfig, RefreshCcwDotIcon),
    createHookItem(useFuzzySearchConfig, SearchIcon),
    createHookItem(useFuzzySearchGroupsConfig, ListTreeIcon),
  ],
};

export default CONTENT;
