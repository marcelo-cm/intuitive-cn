import type React from 'react';

import { getAllPosts, getPostData } from '@/app/[topic]/_utils/markdown-utils';

import {
  getAllContentSlugs,
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

export async function generateStaticParams() {
  const params = [];

  // Get all markdown posts
  const posts = await getAllPosts();
  for (const post of posts) {
    params.push({
      topic: post.topic,
      slug: post.slug,
    });
  }

  // Get all config-driven content
  const contentSlugs = await getAllContentSlugs();
  for (const { topic, slug } of contentSlugs) {
    params.push({
      topic,
      slug,
    });
  }

  return params;
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
