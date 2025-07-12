import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useUpdateSearchParams',
  description: 'Standardized practices to update search parameters.',
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
    {
      type: ContentType.MARKDOWN,
      id: 'usage',
    },
  ],
};

export default config;
