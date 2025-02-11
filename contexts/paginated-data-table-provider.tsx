'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { ReactNode, createContext, useCallback, useState } from 'react';

import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Insert } from '@/app/types';
import {
  TGetResourceFilterState,
  TGetResourceOptions,
  TGetResourceSortState,
} from '@/app/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

type PaginatedDataTableContextType<TData extends { id: string }> = {
  data: TData[];
  table: Table<TData>;
  loading: boolean;
  updateItem: (id: string, data: Partial<TData>) => Promise<TData>;
  deleteItem: (id: string) => Promise<void>;
  createItem: (data: Insert<TData>) => Promise<TData>;
  columns: ColumnDef<TData>[];
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: Dispatch<SetStateAction<Record<string, boolean>>>;
  filters: TGetResourceFilterState;
  setFilters: Dispatch<SetStateAction<TGetResourceFilterState>>;
  sortState: TGetResourceSortState;
  setSortState: Dispatch<SetStateAction<TGetResourceSortState>>;
};

// Create a generic context

const DataTableContext = createContext<
  PaginatedDataTableContextType<any> | undefined
>(undefined);

const isBrowser = typeof window !== 'undefined';

const LOCAL_STORAGE_KEY = 'data-table-columns';

interface PaginatedDataTableProviderProps<TData extends { id: string }> {
  children: ReactNode;
  columns: ColumnDef<TData>[];
  initialData?: TData[];
  initialRowCount?: number;
  fetchData: (
    options: TGetResourceOptions,
  ) => Promise<{ data: TData[]; count: number }>;

  updateFunction?: (id: string, data: Partial<any>) => Promise<any>;
  deleteFunction?: (id: string) => Promise<unknown>;
  createFunction?: (data: Insert<any> | any) => Promise<any>;
}

// Provider component
export function PaginatedDataTableProvider<TData extends { id: string }>({
  children,
  columns,
  initialData,
  initialRowCount,
  fetchData,
  updateFunction,
  deleteFunction,
  createFunction,
}: PaginatedDataTableProviderProps<TData>) {
  const [items, setItems] = useState<TData[]>(initialData || []);
  const [filters, setFilters] = React.useState<TGetResourceFilterState>({});
  const [sortState, setSortState] = React.useState<TGetResourceSortState>({
    sortedBy: undefined,
    sortDirection: null,
  });
  const [rowCount, setRowCount] = React.useState(initialRowCount);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(
    columns.reduce((acc: Record<string, boolean>, col) => {
      const key =
        'accessorKey' in col
          ? (col.accessorKey as string)
          : (col.header as string);
      if (key) {
        acc[key] = true;
      }

      return acc;
    }, {}),
  );
  const [isFetching, setIsFetching] = useState(false);

  const prevFilters = useRef<TGetResourceFilterState>(filters);
  const prevSortState = useRef<TGetResourceSortState>(sortState);
  const prevPagination = useRef({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    setRowCount(initialRowCount);
  }, [initialRowCount]);

  useEffect(() => {
    setItems(initialData || []);
  }, [initialData]);

  useEffect(() => {
    if (isBrowser) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setColumnVisibility(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    // Save the column visibility to localStorage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const table = useReactTable({
    data: items,
    columns: columns,
    rowCount,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableSortingRemoval: false,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });
  const { pageSize, pageIndex } = table.getState().pagination;

  const fetchDataCallback = useCallback(
    async (options: TGetResourceOptions) => {
      setIsFetching(true);
      const { data, count } = await fetchData(options);
      setItems(data);
      setRowCount(count);
      setIsFetching(false);
    },
    [fetchData],
  );

  useEffect(() => {
    const isEqual = (obj1: unknown, obj2: unknown) =>
      JSON.stringify(obj1) === JSON.stringify(obj2);

    const hasChanged =
      !isEqual(prevFilters.current, filters) ||
      !isEqual(prevSortState.current, sortState) ||
      !isEqual(prevPagination.current, { pageIndex, pageSize });

    if (hasChanged) {
      fetchDataCallback({
        filters,
        pagination: { pageIndex, pageSize },
        sortState,
      });
    }

    prevFilters.current = filters;
    prevSortState.current = sortState;
    prevPagination.current = { pageIndex, pageSize };
  }, [fetchDataCallback, filters, pageIndex, pageSize, table, sortState]);

  const updateItem = useCallback(
    async (id: string, data: Partial<TData>) => {
      if (!updateFunction) {
        throw new Error('updateFunction is required');
      }

      // Find the original item
      const originalItem = items.find((item) => item.id === id);
      if (!originalItem) return;

      // Optimistic update
      const optimisticUpdate = items.map((item) =>
        item.id === id ? { ...item, ...data } : item,
      );
      setItems(optimisticUpdate);

      try {
        const updatedItem = await updateFunction(id, data);

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? (updatedItem as TData) : item,
          ),
        );

        return updatedItem;
      } catch (error) {
        setItems((currentItems) =>
          currentItems.map((item) => (item.id === id ? originalItem : item)),
        );

        throw error;
      }
    },
    [items, updateFunction],
  );

  const createItem = useCallback(
    async (data: Insert<TData>) => {
      if (!createFunction) {
        throw new Error('createFunction is required');
      }

      try {
        const newItem = await createFunction(data);

        setItems((currentItems) => [...currentItems, newItem]);

        return newItem;
      } catch (error) {
        throw error;
      }
    },
    [createFunction],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      if (!deleteFunction) {
        throw new Error('deleteFunction is required');
      }
      // Store original items for potential rollback
      const originalItems = [...items];

      // Optimistic deletion
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));

      try {
        await deleteFunction(id);
      } catch (error) {
        setItems(originalItems);
        throw error;
      }
    },
    [items, deleteFunction],
  );

  return (
    <DataTableContext.Provider
      value={{
        data: items,
        table,
        loading: isFetching,
        updateItem,
        deleteItem,
        createItem,
        columns,
        columnVisibility,
        setColumnVisibility,
        filters,
        setFilters,
        sortState,
        setSortState,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export const usePaginatedDataTable = () => {
  const context = React.useContext(DataTableContext);

  if (!context) {
    return null;
    // We don't throw an error because it can be used in sheets that aren't in providers
    throw new Error('useDataTable must be used within a DataTableProvider');
  }

  return context;
};
