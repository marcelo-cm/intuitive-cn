import { ContentType } from '@/app/[topic]/_constants/content-enums';
import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import BasicExample from './examples/basic-example';

const config: IContentConfig = {
  title: 'useAutoFocusedInput',
  description:
    'Auto-focus an input on typing non-modifier keys. Supports Escape/Enter blur with optional callbacks.',
  content: [
    { type: ContentType.MARKDOWN, id: 'explanation' },
    { type: ContentType.MARKDOWN, id: 'example', className: 'mb-0' },
    { type: ContentType.COMPONENT, component: BasicExample },
    { type: ContentType.MARKDOWN, id: 'usage' },
  ],
};

export default config;
