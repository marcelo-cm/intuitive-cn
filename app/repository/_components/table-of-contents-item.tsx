import Link from 'next/link';

import { cn } from '@/lib/utils';

import { IContentItem } from '../_constants/content-types';

interface ITableOfContentsItemProps {
  item: IContentItem;
  isLoading?: boolean;
  onClick: () => void;
}

const TableOfContentsItem = ({
  item,
  isLoading,
  onClick,
}: ITableOfContentsItemProps) => {
  return (
    <Link
      className={cn('group/link', isLoading && 'pointer-events-none')}
      href={item.href}
      onClick={onClick}
    >
      <div className="text-foreground flex flex-row items-start justify-between gap-2 no-underline group-hover/link:underline">
        <p
          className={cn(
            'mb-0 text-sm font-normal',
            isLoading && 'animate-pulse duration-800',
          )}
        >
          {item.title}
        </p>
        <item.Icon className="mt-0.5 size-4" />
      </div>
      {item.description && (
        <p className="text-muted-foreground pr-6 text-sm text-pretty">
          {item.description}
        </p>
      )}
    </Link>
  );
};

export default TableOfContentsItem;
