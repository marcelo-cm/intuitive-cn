import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useSyncedState',
  description:
    'useState that updates to the new value when the initial state changes.',
  content: [
    {
      type: ContentType.MARKDOWN,
      id: 'explanation',
    },
    {
      type: ContentType.MARKDOWN,
      id: 'example',
      className: 'mb-0',
    },
    {
      type: ContentType.COMPONENT,
      component: BasicExample,
    },
  ],
};

export default config;
