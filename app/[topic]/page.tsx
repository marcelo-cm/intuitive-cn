import { notFound } from 'next/navigation';

import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';

import TableOfContentsSection from '@/app/_components/table-of-contents-section';

import { IContentGroup } from './_constants/content-types';

interface ITopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

/**
 * Dynamically loads content configuration for a given topic
 * Checks if the topic has a content.ts file and returns the content group
 */
async function loadTopicContent(topic: string): Promise<IContentGroup | null> {
  try {
    const { default: content } = (await import(
      `@/app/_content/${topic}/content`
    )) as { default: IContentGroup };

    return content;
  } catch (error) {
    console.error(`Failed to load content for topic: ${topic}`, error);
    return null;
  }
}

/**
 * Dynamic topic page that displays a table of contents
 * for content found in app/_content/[topic]/content.ts
 */
export default async function TopicPage({ params }: ITopicPageProps) {
  const { topic } = await params;

  // Load the topic content dynamically
  const topicContent = await loadTopicContent(topic);

  // If no content found, show 404
  if (!topicContent) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <Title>the repository</Title>
      <TableOfContentsSection group={topicContent} />
    </div>
  );
}
