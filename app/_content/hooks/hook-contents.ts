import {
  CopyIcon,
  MousePointerIcon,
  RefreshCcwDotIcon,
  SearchIcon,
  Zap,
} from 'lucide-react';

import { IContentGroup } from '@/app/[topic]/_constants/content-types';

import useCopyToClipboardConfig from './use-copy-to-clipboard/config';
import useRemoteTriggerConfig from './use-remote-trigger/config';
import useSyncedStateConfig from './use-synced-state/config';
import useUpdateSearchParamsConfig from './use-update-search-params/config';

const HOOK_CONTENT: IContentGroup = {
  title: 'Hooks',
  Icon: Zap,
  items: [
    {
      ...useCopyToClipboardConfig,
      href: '/hooks/use-copy-to-clipboard',
      Icon: CopyIcon,
    },
    {
      ...useRemoteTriggerConfig,
      href: '/hooks/use-remote-trigger',
      Icon: MousePointerIcon,
    },
    {
      ...useUpdateSearchParamsConfig,
      href: '/hooks/use-update-search-params',
      Icon: SearchIcon,
    },
    {
      ...useSyncedStateConfig,
      href: '/hooks/use-synced-state',
      Icon: RefreshCcwDotIcon,
    },
  ],
};

export default HOOK_CONTENT;
