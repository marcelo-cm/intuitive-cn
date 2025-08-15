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

const postsDirectory = path.join(
  process.cwd(),
  'app',
  'repository',
  '_content',
);

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

/**
 * Check if a markdown post is private without processing its content
 */
export function isPostPrivate(topic: string, slug: string): boolean {
  const fullPath = path.join(postsDirectory, `${topic}/${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return false;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return matterResult.data.visibility === 'private';
}

/**
 * Get all blog posts for static generation
 */
export async function getAllPosts(): Promise<
  Array<{ topic: string; slug: string }>
> {
  const posts: Array<{ topic: string; slug: string }> = [];

  if (!fs.existsSync(postsDirectory)) {
    return posts;
  }

  const topics = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const topic of topics) {
    const topicPath = path.join(postsDirectory, topic);
    const files = fs
      .readdirSync(topicPath)
      .filter((file) => file.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      // Skip private posts in static generation
      if (!isPostPrivate(topic, slug)) {
        posts.push({ topic, slug });
      }
    }
  }

  return posts;
}
