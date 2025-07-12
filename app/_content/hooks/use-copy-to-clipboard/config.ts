import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useCopyToClipboard',
  description:
    'Copy text to the clipboard with feedback state and toast notifications.',
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
    {
      type: ContentType.MARKDOWN,
      id: 'further-reading',
    },
  ],
};

export default config;
