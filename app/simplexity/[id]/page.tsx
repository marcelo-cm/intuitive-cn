import fs from 'fs';
import matter from 'gray-matter';
import { Metadata } from 'next';
import Link from 'next/link';
import path from 'path';

import { MarkdownRenderer } from '@/app/repository/[topic]/[slug]/_components/markdown-renderer';
import {
  getAllPosts,
  getPostData,
} from '@/app/simplexity/_utils/content-utils';

import IconBar from '../_components/icon-bar';
import ShareBlogButton from '../_components/share-blog-button';
import ViewCounter from '../_components/view-counter';
import { BlogVisibility } from '../_constants/enums';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const fullPath = path.join(
    process.cwd(),
    'app',
    'simplexity',
    '_content',
    `${id}.md`,
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const {
    title = 'Personal Research & Thoughts',
    date = 'Living Document',
    subtitle = '',
  } = matterResult.data;

  return {
    title: `${title} | Simplexity by Marcelo`,
    description: subtitle,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${title}&date=${date}`,
          width: 2160,
          height: 1080,
          alt: `${title} | ${subtitle}`,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `/api/og?title=${title}&date=${date}`,
          width: 2160,
          height: 1080,
          alt: `${title} | ${subtitle}`,
        },
      ],
    },
  };
}

interface IBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateStaticParams = async () => {
  const posts = getAllPosts();
  const publicPosts = posts.filter(
    (post) => post.visibility === BlogVisibility.PUBLIC,
  );
  return publicPosts.map((post) => ({ id: post.id }));
};

/**
 * Individual blog post page component
 */
export default async function BlogPostPage({ params }: IBlogPostPageProps) {
  const { id } = await params;
  const post = await getPostData(id);

  if (post.visibility === BlogVisibility.PRIVATE) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-u-300">
          This post is private. How did you even get here?
        </div>
        <Link
          href="/simplexity"
          className="text-u-300 flex flex-row items-center gap-2 underline"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto flex w-full max-w-2xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <div className="flex flex-row items-start justify-between">
        <div>
          <p>{post.title}</p>
          <ViewCounter slug={post.id} date={post.date} />
          <IconBar className="mt-4" />
        </div>
        <ShareBlogButton id={post.id} className="hidden sm:flex" />
      </div>

      <MarkdownRenderer content={post.contentHtml} />
      <IconBar />
      <ShareBlogButton
        id={post.id}
        className="animate-in fade-in slide-in-from-bottom-full ease-inout fixed right-4 bottom-4 flex shadow-lg duration-1000 sm:hidden"
        rounded
      />
    </article>
  );
}
