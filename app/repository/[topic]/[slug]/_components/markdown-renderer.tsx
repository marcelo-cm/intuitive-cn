'use client';

import { type ClassValue } from 'clsx';

import { cn } from '@/lib/utils';

interface IMarkdownStyles {
  h1?: ClassValue;
  h2?: ClassValue;
  h3?: ClassValue;
  p?: ClassValue;
  ul?: ClassValue;
  ol?: ClassValue;
  li?: ClassValue;
  blockquote?: ClassValue;
  pre?: ClassValue;
  code?: ClassValue;
  a?: ClassValue;
  img?: ClassValue;
  table?: ClassValue;
  th?: ClassValue;
  td?: ClassValue;
  hr?: ClassValue;
}

interface IMarkdownRendererProps {
  content: string;
  className?: ClassValue;
  styles?: IMarkdownStyles;
}

/**
 * A reusable markdown renderer component with configurable styling
 * @param content - The HTML content to render
 * @param className - Additional classes to apply to the container
 * @param styles - Custom styles to override the default styles
 */
export function MarkdownRenderer({
  content,
  className,
}: IMarkdownRendererProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          '[&_h1]:text-muted-foreground [&_h1]:mb-4 [&_h1]:font-mono [&_h1]:text-sm [&_h1]:leading-tight [&_h1]:font-medium [&_h1]:uppercase',
          '[&_h2]:text-muted-foreground [&_h2]:mb-3 [&_h2]:font-mono [&_h2]:text-sm [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:uppercase',
          '[&_h3]:text-muted-foreground [&_h3]:mb-2 [&_h3]:font-mono [&_h3]:text-sm [&_h3]:leading-tight [&_h3]:font-medium [&_h3]:uppercase',
          '[&_p]:text-foreground [&_p]:mb-4',
          '[&_ul]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc',
          '[&_ol]:mb-3 [&_ol]:ml-5 [&_ol]:list-decimal',
          '[&_li]:mb-1',
          '[&_blockquote]:border-accent-foreground [&_blockquote]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic',
          '[&_pre]:bg-muted-foreground [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4',
          '[&_code]:text-muted-foreground [&_code]:bg-muted [&_code]:border-muted-foreground/20 [&_code]:rounded [&_code]:border [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm',
          '[&_a]:text-accent-foreground [&_a]:whitespace-nowrap [&_a]:after:decoration-transparent [&_a]:after:content-["_↗"] [&_a]:hover:underline',
          '[&_img]:my-4 [&_img]:rounded-lg',
          '[&_table]:mb-4 [&_table]:w-full [&_table]:border-collapse',
          '[&_th]:border-border [&_th]:bg-muted [&_th]:border [&_th]:px-4 [&_th]:py-2',
          '[&_td]:border-border [&_td]:border [&_td]:px-4 [&_td]:py-2',
          '[&_hr]:border-border [&_hr]:my-8 [&_hr]:border-t',
          '[&_strong]:font-semibold',
          '[&_pre]:text-muted-foreground [&_pre]:bg-muted [&_pre]:border-border [&_pre]:rounded [&_pre]:border [&_pre]:px-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:[&>code]:border-none',
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
