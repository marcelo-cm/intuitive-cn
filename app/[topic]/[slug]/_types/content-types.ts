import { IContentConfig } from '@/app/[topic]/_constants/content-types';

import { IMarkdownContent } from '../../_utils/markdown-utils';

export interface IBlogPostPageProps {
  params: Promise<{
    topic: string;
    slug: string;
  }>;
}

export interface IConfigDrivenContentProps {
  topic: string;
  slug: string;
  config: IContentConfig;
  compiledMarkdown: Record<string, string>;
}

export interface ITraditionalPostProps {
  post: IMarkdownContent;
}
