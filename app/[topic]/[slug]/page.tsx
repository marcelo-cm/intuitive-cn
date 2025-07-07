import type React from 'react';

import Link from 'next/link';

import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

import { MarkdownRenderer } from '@/app/[topic]/_components/markdown-renderer';
import { getPostData } from '@/app/[topic]/_utils/markdown-utils';

import ShareBlogButton from './_components/share-blog-button';
import ViewCounter from './_components/view-counter';
import { BlogVisibility } from './_constants/enums';
import {
  IBlogPostPageProps,
  IConfigDrivenContentProps,
  ITraditionalPostProps,
} from './_types/content-types';
import {
  hasConfigDrivenContent,
  loadConfigDrivenContent,
} from './_utils/content-utils';

/**
 * Config-driven article component with mixed markdown and React components
 */
function ConfigDrivenContent({
  topic,
  slug,
  config,
  compiledMarkdown,
}: IConfigDrivenContentProps) {
  return (
    <article className="mx-auto flex w-full max-w-4xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <div className="flex flex-row items-start justify-between">
        <div>
          <p>{config.title}</p>
          <ViewCounter topic={topic} slug={slug} />
        </div>
        <ShareBlogButton className="hidden sm:flex" />
      </div>

      {config.content.map((block, i) => {
        if (block.type === 'markdown') {
          return (
            <MarkdownRenderer
              key={`markdown-${block.id}`}
              content={compiledMarkdown[block.id]}
            />
          );
        }

        if (block.type === 'example') {
          const ExampleComponent = block.component as React.ElementType;
          return (
            <div key={`example-${i}`}>
              {/*
               * Example components must be client components with 'use client' directive
               */}
              <ExampleComponent />
            </div>
          );
        }

        return null;
      })}

      <ShareBlogButton
        className="animate-in fade-in slide-in-from-bottom-full ease-inout fixed right-4 bottom-4 flex shadow-lg duration-1000 sm:hidden"
        variant={Variant.OUTLINE}
        rounded
        size={Size.LG}
      />
    </article>
  );
}

/**
 * Traditional single-markdown blog post component
 */
function TraditionalPost({ post }: ITraditionalPostProps) {
  return (
    <article className="mx-auto flex w-full max-w-4xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <div className="flex flex-row items-start justify-between">
        <div>
          <p>{post.title}</p>
          <ViewCounter topic={post.topic} slug={post.slug} />
        </div>
        <ShareBlogButton className="hidden sm:flex" />
      </div>

      <MarkdownRenderer content={post.contentHtml} />

      <ShareBlogButton
        className="animate-in fade-in slide-in-from-bottom-full ease-inout fixed right-4 bottom-4 flex shadow-lg duration-1000 sm:hidden"
        variant={Variant.OUTLINE}
        rounded
        size={Size.LG}
      />
    </article>
  );
}

/**
 * Individual blog post page component
 *
 * Supports two types of content:
 * 1. Config-driven articles (markdown + React components)
 * 2. Traditional single-markdown posts
 */
export default async function BlogPostPage({ params }: IBlogPostPageProps) {
  const isDev = process.env.NODE_ENV === 'development';
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

  /*
   * Handle private posts in development vs production
   */
  if (post.visibility === BlogVisibility.PRIVATE && !isDev) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-u-300">
          This post is private. How did you even get here?
        </div>
        <Link
          href="/"
          className="text-u-300 flex flex-row items-center gap-2 underline"
        >
          Go back
        </Link>
      </div>
    );
  }

  return <TraditionalPost post={post} />;
}
