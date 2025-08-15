import { ContentType } from '@/app/repository/_constants/content-enums';
import { IContentConfig } from '@/app/repository/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useFuzzySearchGroups',
  description: 'Fuzzy search across nested groups of items using Fuse.js.',
  content: [
    { type: ContentType.MARKDOWN, id: 'explanation' },
    { type: ContentType.MARKDOWN, id: 'example', className: 'mb-0' },
    { type: ContentType.COMPONENT, component: BasicExample },
    { type: ContentType.MARKDOWN, id: 'usage' },
  ],
};

export default config;
