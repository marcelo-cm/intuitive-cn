import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useCopyToClipboard',
  content: [
    {
      type: 'markdown',
      id: '1',
    },
    {
      type: 'example',
      component: BasicExample,
    },
    {
      type: 'markdown',
      id: '2',
    },
  ],
};

export default config;
