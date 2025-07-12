import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

import { MarkdownRenderer } from '../../_components/markdown-renderer';
import { ContentType } from '../../_constants/content-enums';
import { IContentConfig } from '../../_constants/content-types';
import ContentBreadcrumbs from './content-breadcrumbs';
import ShareLinkButton from './share-link-button';

interface IConfigDrivenContentProps {
  topic: string;
  slug: string;
  config: IContentConfig;
  compiledMarkdown: Record<string, string>;
}

/**
 * Config-driven article component with mixed markdown and React components
 */
export const ConfigDrivenContent = ({
  config,
  compiledMarkdown,
}: IConfigDrivenContentProps) => {
  return (
    <article className="mx-auto flex w-full max-w-4xl grow flex-col space-y-8 px-4 pt-8 pb-12 md:py-12">
      <div>
        <ContentBreadcrumbs />
        <div className="flex flex-row items-start justify-between">
          <div>
            <p>{config.title}</p>
            <p className="text-muted-foreground text-sm">
              {config.description}
            </p>
            {/* <ViewCounter topic={topic} slug={slug} /> */}
          </div>
          <ShareLinkButton className="hidden sm:flex" />
        </div>
      </div>

      {config.content.map((block, i) => {
        if (block.type === ContentType.MARKDOWN) {
          return (
            <MarkdownRenderer
              key={`markdown-${block.id}`}
              content={compiledMarkdown[block.id]}
              className={block?.className}
            />
          );
        }

        if (block.type === ContentType.COMPONENT) {
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

      <ShareLinkButton
        className="animate-in fade-in slide-in-from-bottom-full ease-inout fixed right-4 bottom-4 flex shadow-lg duration-1000 sm:hidden"
        variant={Variant.OUTLINE}
        rounded
        size={Size.LG}
      />
    </article>
  );
};
