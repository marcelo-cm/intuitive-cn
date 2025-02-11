import React, { useCallback } from 'react';

import { Check, SortAsc, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useDataTable } from '@/contexts/data-table-provider';
import { cn, prettifyText } from '@/lib/utils';

function SortPopover({ options }: { options: string[] }) {
  const context = useDataTable();
  const [sortedBy, setSortedBy] = React.useState<string | undefined>();
  const [sortingDirection, setSortingDirection] = React.useState<
    'asc' | 'desc' | null
  >(null);

  if (!context) {
    throw new Error('DataTableProvider is missing');
  }

  const { table } = context;

  const handleSortingToggle = useCallback(
    (option: string) => {
      const column = table.getColumn(option);

      if (column) {
        column.toggleSorting();
        setSortingDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortedBy(undefined);
        setSortingDirection(null);
      }
    },
    [table],
  );

  const handleSelectSortedBy = useCallback(
    (option: string) => {
      const column = table.getColumn(option);

      if (!column) return;

      if (sortedBy === option) {
        setSortedBy(undefined);
        setSortingDirection(null);
        column.clearSorting?.();
      } else {
        setSortedBy(option);
        setSortingDirection('asc');
        column.toggleSorting?.();
      }
    },
    [table, sortedBy, setSortedBy, setSortingDirection],
  );

  return (
    <div className="flex gap-2">
      {sortedBy && (
        <Button
          variant="outline"
          size={'icon'}
          className="shrink-0 rounded-md"
          onClick={() => handleSortingToggle(sortedBy)}
        >
          <SortAsc
            className={`transition-all ${sortingDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`}
          />
        </Button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              !sortedBy && 'rounded-md font-normal text-muted-foreground',
            )}
          >
            {sortedBy ? `Sorted by ${prettifyText(sortedBy)}` : 'Sort by...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-48 flex-col p-1">
          {options.map((option) => (
            <Button
              key={option}
              variant="ghost"
              size="sm"
              data-active={sortedBy === option}
              className={`group justify-start hover:data-[active=true]:bg-red-100 hover:data-[active=true]:text-red-500`}
              onClick={() => handleSelectSortedBy(option)}
            >
              {prettifyText(option)}
              <Check className="ml-auto hidden group-data-[active=true]:flex group-hover:group-data-[active=true]:hidden" />
              <X className="ml-auto hidden group-hover:group-data-[active=true]:flex" />
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SortPopover;
