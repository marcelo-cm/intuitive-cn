import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useRemoteTrigger',
  description:
    'Control dialogs, sheets, and other components triggered by open states or on the click of a trigger.',
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
    {
      type: ContentType.MARKDOWN,
      id: 'usage',
    },
  ],
};

export default config;
