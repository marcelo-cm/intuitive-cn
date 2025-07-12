import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useUpdateSearchParams',
  content: [
    {
      type: ContentType.MARKDOWN,
      id: 'explanation',
    },
    {
      type: ContentType.MARKDOWN,
      id: 'basic-example',
      className: 'mb-0',
    },
    {
      type: ContentType.COMPONENT,
      component: BasicExample,
    },
  ],
};

export default config;
