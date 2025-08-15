import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

import { BlogVisibility } from '@/app/simplexity/_constants/enums';

export interface IBlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
  visibility: BlogVisibility;
}

const postsDirectory = path.join(
  process.cwd(),
  'app',
  'simplexity',
  '_content',
);

/**
 * Get all blog posts sorted by date
 */
export function getAllPosts(): IBlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    } as IBlogPost;
  });

  allPostsData.sort((a, b) => {
    // Special case for "Living Documents" - always first
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // If either date is invalid, move it to the end.
    if (isNaN(dateA) && isNaN(dateB)) return 0; // Both invalid
    if (isNaN(dateA)) return -1; // `a` is invalid, `b` comes first
    if (isNaN(dateB)) return 1; // `b` is invalid, `a` comes first

    // Compare valid dates - newest first
    return dateB - dateA; // Reversed to show newest first
  });

  return allPostsData;
}

/**
 * Get a single blog post by ID
 */
export async function getPostData(id: string): Promise<IBlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as IBlogPost;
}
