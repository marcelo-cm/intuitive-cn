import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useSyncedState',
  description:
    'Just like a useState, but if the initial state is changed, the state will be updated to the new value.',
  content: [
    {
      type: ContentType.MARKDOWN,
      id: 'explanation',
    },
    {
      type: ContentType.COMPONENT,
      component: BasicExample,
    },
  ],
};

export default config;
