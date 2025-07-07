import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

import {
  IContentConfig,
  IContentMarkdown,
} from '@/app/[topic]/_constants/content-types';

import { ContentType } from '../_constants/content-enums';

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
    'app',
    '_content',
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
   * Use dynamic import to load the config file
   * We construct the path relative to the current file location
   */
  try {
    const { default: config } = (await import(
      `@/app/_content/${topic}/${slug}/config`
    )) as { default: IContentConfig };

    return await _processConfigContent(config, topic, slug);
  } catch (error) {
    console.error(`Failed to load config for ${topic}/${slug}:`, error);
    throw new Error(`Config file not found for ${topic}/${slug}`);
  }
}

async function _processConfigContent(
  config: IContentConfig,
  topic: string,
  slug: string,
): Promise<IConfigDrivenContent> {
  /*
   * Compile each markdown snippet referenced in the config
   * We process them in parallel for better performance
   */
  const markdownDir = path.join(
    process.cwd(),
    'app',
    '_content',
    topic,
    slug,
    'markdown',
  );
  const compiledMarkdown: Record<string, string> = {};

  await Promise.all(
    config.content
      .filter(
        (block): block is IContentMarkdown =>
          block.type === ContentType.MARKDOWN,
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
