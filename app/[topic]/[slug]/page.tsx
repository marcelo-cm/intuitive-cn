import fs from 'fs';
import matter from 'gray-matter';
import { Metadata } from 'next';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}): Promise<Metadata> {
  const { topic, slug } = await params;
  const fileContents = fs.readFileSync(`content/${topic}/${slug}.md`, 'utf8');
  const matterResult = matter(fileContents);
  const { title = 'Personal Research & Thoughts', description = '' } =
    matterResult.data;

  return {
    metadataBase: new URL('https://therepository.dev'),
    title: `${title} | The Repository`,
    description,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${title}`,
          width: 2160,
          height: 1080,
          alt: `${title} | ${description}`,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `/api/og?title=${title}`,
          width: 2160,
          height: 1080,
          alt: `${title} | ${description}`,
        },
      ],
    },
  };
}

interface IBlogPostPageProps {
  params: Promise<{
    topic: string;
    slug: string;
  }>;
}

/**
 * Individual blog post page component
 */
export default async function BlogPostPage({ params }: IBlogPostPageProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const { topic, slug } = await params;
  const post = await getPostData(topic, slug);

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

  return (
    <article className="mx-auto flex w-full max-w-4xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <div className="flex flex-row items-start justify-between">
        <div>
          <p>{post.title}</p>
          <ViewCounter topic={post.topic} slug={post.slug} date={post.date} />
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
