import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface IMarkdownContent {
  topic: string;
  slug: string;
  title: string;
  description?: string;
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), 'app', '_content');

/**
 * Get a single blog post by ID
 */
export async function getPostData(
  topic: string,
  slug: string,
): Promise<IMarkdownContent> {
  const fullPath = path.join(postsDirectory, `${topic}/${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    topic,
    slug,
    contentHtml,
    ...matterResult.data,
  } as IMarkdownContent;
}
