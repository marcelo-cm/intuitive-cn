import type React from 'react';

import { getPostData } from '@/app/[topic]/_utils/markdown-utils';

import {
  hasConfigDrivenContent,
  loadConfigDrivenContent,
} from '../_utils/content-utils';
import { ConfigDrivenContent } from './_components/config-driven-content';
import { MarkdownOnlyContent } from './_components/markdown-only-content';

interface IBlogPostPageProps {
  params: Promise<{
    topic: string;
    slug: string;
  }>;
}

/**
 * Individual blog post page component
 *
 * Supports two types of content:
 * 1. Config-driven articles (markdown + React components)
 * 2. Traditional single-markdown posts
 */
export default async function ContentPage({ params }: IBlogPostPageProps) {
  const { topic, slug } = await params;

  /*
   * Check for config-driven content first
   * This allows for mixed markdown + React component articles
   */
  if (hasConfigDrivenContent(topic, slug)) {
    const { config, compiledMarkdown } = await loadConfigDrivenContent(
      topic,
      slug,
    );

    return (
      <ConfigDrivenContent
        topic={topic}
        slug={slug}
        config={config}
        compiledMarkdown={compiledMarkdown}
      />
    );
  }

  /*
   * Fallback to traditional single-markdown post
   * This maintains backward compatibility with existing content
   */
  const post = await getPostData(topic, slug);

  return <MarkdownOnlyContent post={post} />;
}
