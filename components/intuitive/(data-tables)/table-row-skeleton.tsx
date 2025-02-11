import React, { memo } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

interface TableLoadingSkeletonProps {
  columnsLength: number;
  rowsLength: number;
}

export const TableLoadingSkeleton = memo(
  ({ columnsLength, rowsLength = 5 }: TableLoadingSkeletonProps) => {
    return (
      <React.Fragment>
        {Array.from({ length: rowsLength }).map((_, idx) => (
          <TableRow key={idx}>
            <TableCell className="py-3 pl-3 pr-1">
              <span className="flex gap-2">
                <Skeleton className="flex size-11 flex-none animate-pulse items-center justify-center rounded-full" />
                <Skeleton className="flex h-11 w-full animate-pulse items-center justify-center" />
              </span>
            </TableCell>
            {Array.from({ length: columnsLength - 1 }).map((_, idx) => (
              <TableCell className={cn('px-1 py-3 last:pr-3')} key={idx}>
                <Skeleton className="flex h-11 w-full animate-pulse items-center justify-center" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </React.Fragment>
    );
  },
);
TableLoadingSkeleton.displayName = 'TableLoadingSkeleton';
