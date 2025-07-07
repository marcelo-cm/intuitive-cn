import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

import { IContentConfig } from '@/app/[topic]/_constants/content-types';

export interface IConfigDrivenContent {
  config: IContentConfig;
  compiledMarkdown: Record<string, string>;
}

/**
 * Checks if a config-driven article exists for the given topic and slug
 */
export function hasConfigDrivenContent(topic: string, slug: string): boolean {
  const configPath = path.join(
    process.cwd(),
    'content',
    topic,
    slug,
    'config.ts',
  );
  return fs.existsSync(configPath);
}

/**
 * Loads and processes a config-driven article
 *
 * This function:
 * 1. Dynamically imports the config file
 * 2. Compiles all referenced markdown files to HTML
 * 3. Returns the config and compiled markdown for rendering
 */
export async function loadConfigDrivenContent(
  topic: string,
  slug: string,
): Promise<IConfigDrivenContent> {
  /*
   * Use webpack-aware dynamic import to load the config file
   * The webpackInclude comment tells the bundler to include all config files
   */
  const { default: config } = (await import(
    /* webpackInclude: /content\/.*\/config$/ */
    `@/content/${topic}/${slug}/config`
  )) as { default: IContentConfig };

  /*
   * Compile each markdown snippet referenced in the config
   * We process them in parallel for better performance
   */
  const markdownDir = path.join(
    process.cwd(),
    'content',
    topic,
    slug,
    'markdown',
  );
  const compiledMarkdown: Record<string, string> = {};

  await Promise.all(
    config.content
      .filter(
        (block): block is { type: 'markdown'; id: string } =>
          block.type === 'markdown',
      )
      .map(async ({ id }) => {
        const rawMarkdown = fs.readFileSync(
          path.join(markdownDir, `${id}.md`),
          'utf8',
        );
        const { content } = matter(rawMarkdown);
        const htmlContent = await remark().use(html).process(content);
        compiledMarkdown[id] = htmlContent.toString();
      }),
  );

  return {
    config,
    compiledMarkdown,
  };
}
