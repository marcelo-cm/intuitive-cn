'use client';

import React, { useCallback } from 'react';

import { Check, SortAsc, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { usePaginatedDataTable } from '@/contexts/paginated-data-table-provider';
import { cn, prettifyText } from '@/lib/utils';

interface PaginatedSortPopoverProps {
  options: string[];
  className?: string;
}

export function PaginatedSortPopover({
  options,
  className,
}: PaginatedSortPopoverProps) {
  const context = usePaginatedDataTable();

  if (!context) {
    throw new Error('PaginatedDataTableProvider is missing');
  }

  const { sortState, setSortState: onSortChange } = context;
  const handleSortingToggle = useCallback(() => {
    if (!sortState.sortedBy) return;

    const newDirection = sortState.sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange({
      ...sortState,
      sortDirection: newDirection,
    });
  }, [sortState, onSortChange]);

  const handleSelectSortedBy = useCallback(
    (option: string) => {
      if (sortState.sortedBy === option) {
        onSortChange({
          sortedBy: undefined,
          sortDirection: null,
        });
      } else {
        onSortChange({
          sortedBy: option,
          sortDirection: 'asc',
        });
      }
    },
    [sortState.sortedBy, onSortChange],
  );

  return (
    <div className="flex gap-2">
      {sortState.sortedBy && (
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 rounded-md"
          onClick={handleSortingToggle}
        >
          <SortAsc
            className={cn(
              'transition-all',
              sortState.sortDirection === 'desc' ? 'rotate-0' : 'rotate-180',
            )}
          />
        </Button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              !sortState.sortedBy &&
                'text-muted-foreground rounded-md font-normal',
              className,
            )}
          >
            {sortState.sortedBy
              ? `Sorted by ${prettifyText(sortState.sortedBy)}`
              : 'Sort by...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-48 flex-col p-1">
          {options.map((option) => (
            <Button
              key={option}
              variant="ghost"
              size="sm"
              data-active={sortState.sortedBy === option}
              className="group justify-start hover:data-[active=true]:bg-red-100 hover:data-[active=true]:text-red-500"
              onClick={() => handleSelectSortedBy(option)}
            >
              {prettifyText(option)}
              <Check className="ml-auto hidden group-data-[active=true]:flex group-data-[active=true]:group-hover:hidden" />
              <X className="ml-auto hidden group-data-[active=true]:group-hover:flex" />
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
