'use client';

import React, { memo, useCallback, useMemo } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { type Table as TableType, flexRender } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { usePaginatedDataTable } from '@/contexts/paginated-data-table-provider';
import { cn } from '@/lib/utils';

import { TableLoadingSkeleton } from '../table-row-skeleton';

interface DataTableProps {
  className?: string;
  children?: React.ReactNode;
}

export function PaginatedDataTable({ className, children }: DataTableProps) {
  const context = usePaginatedDataTable();

  const headerGroups = useMemo(
    () => context?.table?.getHeaderGroups(),
    [context?.table],
  );

  if (!context) {
    return null;
  }

  const { table, columns, loading } = context;

  return (
    <Card
      className={cn(
        'w-full overflow-auto',
        className,
        loading && 'cursor-progress',
      )}
    >
      <div className="relative">
        <Table>
          <TableHeader className="bg-white/70">
            {headerGroups?.map((headerGroup) => (
              <TableRow key={headerGroup?.id} className="hover:bg-white/70">
                {headerGroup?.headers?.map((header) => (
                  <TableHead
                    key={header?.id}
                    className="text-nowrap break-keep"
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {!loading
              ? table?.getRowModel()?.rows?.map((row) => (
                  <TableRow
                    key={row?.id}
                    data-state={row?.getIsSelected() && 'selected'}
                  >
                    {row
                      ?.getVisibleCells()
                      ?.map((cell) => (
                        <TableCell key={cell?.id}>
                          {flexRender(
                            cell?.column?.columnDef?.cell,
                            cell?.getContext(),
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              : null}
            {table?.getRowModel()?.rows?.length === 0 && !loading && (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableLoadingSkeleton
                columnsLength={columns?.length}
                rowsLength={table?.getState()?.pagination?.pageSize}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {children}

      <div className="grid grid-cols-3 items-center justify-start border-t px-4 py-3">
        <PageSizeSelector
          currentSize={table?.getState()?.pagination?.pageSize}
          onSizeChange={(value) => {
            table?.setPageSize(Number(value));
          }}
        />
        <PageInfo
          currentPage={table?.getState()?.pagination?.pageIndex + 1}
          totalPages={table?.getPageCount()}
        />
        <NavigationButtons
          table={table as TableType<unknown>}
          canPreviousPage={table?.getCanPreviousPage()}
          canNextPage={table?.getCanNextPage()}
        />
      </div>
    </Card>
  );
}

interface PageSizeSelectorProps {
  currentSize: number;
  onSizeChange: (value: string) => void;
}

const PageSizeSelector = memo(
  ({ currentSize, onSizeChange }: PageSizeSelectorProps) => (
    <div className="flex items-center space-x-2">
      <Select value={`${currentSize}`} onValueChange={onSizeChange}>
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={currentSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[1, 5, 10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm leading-none font-medium">per page</p>
    </div>
  ),
);
PageSizeSelector.displayName = 'PageSizeSelector';

interface PageInfoProps {
  currentPage: number;
  totalPages: number;
}

const PageInfo = memo(({ currentPage, totalPages }: PageInfoProps) => (
  <div className="flex items-center justify-center text-sm font-medium">
    Page {currentPage} of {totalPages}
  </div>
));
PageInfo.displayName = 'PageInfo';

interface NavigationButtonsProps<TData> {
  table: TableType<TData>;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

const NavigationButtons = memo(
  <TData,>({
    table,
    canPreviousPage,
    canNextPage,
  }: NavigationButtonsProps<TData>) => {
    const goToFirstPage = useCallback(() => table.setPageIndex(0), [table]);
    const goToPreviousPage = useCallback(() => table.previousPage(), [table]);
    const goToNextPage = useCallback(() => table.nextPage(), [table]);
    const goToLastPage = useCallback(
      () => table.setPageIndex(table.getPageCount() - 1),
      [table],
    );

    return (
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={goToFirstPage}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={goToPreviousPage}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={goToNextPage}
          disabled={!canNextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={goToLastPage}
          disabled={!canNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    );
  },
);

NavigationButtons.displayName = 'NavigationButtons';
