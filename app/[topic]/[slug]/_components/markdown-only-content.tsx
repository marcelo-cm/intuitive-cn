import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

import { MarkdownRenderer } from '../../_components/markdown-renderer';
import { IMarkdownContent } from '../../_utils/markdown-utils';
import ContentBreadcrumbs from './content-breadcrumbs';
import ShareLinkButton from './share-link-button';

interface IMarkdownOnlyContentProps {
  post: IMarkdownContent;
}

/**
 * Traditional single-markdown blog post component
 */
export const MarkdownOnlyContent = ({ post }: IMarkdownOnlyContentProps) => {
  return (
    <article className="mx-auto flex w-full max-w-4xl grow flex-col gap-12 px-4 pt-8 pb-12 md:py-12">
      <div>
        <ContentBreadcrumbs />
        <div className="flex flex-row items-start justify-between">
          <div>
            <p>{post.title}</p>
            {/* <ViewCounter topic={post.topic} slug={post.slug} /> */}
          </div>
          <ShareLinkButton className="hidden sm:flex" />
        </div>
      </div>

      <MarkdownRenderer content={post.contentHtml} />

      <ShareLinkButton
        className="animate-in fade-in slide-in-from-bottom-full ease-inout fixed right-4 bottom-4 flex shadow-lg duration-1000 sm:hidden"
        variant={Variant.OUTLINE}
        rounded
        size={Size.LG}
      />
    </article>
  );
};
