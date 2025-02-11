'use client';

import React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { toast } from 'sonner';

import { Insert } from '@/app/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

type DataTableContextType<T extends { id: string }> = {
  data: T[];
  table: Table<T>;
  updateItem: (id: string, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
  createItem: (data: Insert<T>) => Promise<T>;
  columns: ColumnDef<T>[];
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

// Create a generic context

const DataTableContext = React.createContext<
  DataTableContextType<any> | undefined
>(undefined);

const isBrowser = typeof window !== 'undefined';

const LOCAL_STORAGE_KEY = 'data-table-columns';

// Provider component
export function DataTableProvider<T extends { id: string }>({
  children,
  columns,
  data,
  updateFunction,
  deleteFunction,
  createFunction,
}: {
  children: React.ReactNode;
  columns: ColumnDef<T>[];
  data: T[];
  updateFunction?: (id: string, data: Partial<any>) => Promise<any>;
  deleteFunction?: (id: string) => Promise<unknown>;
  createFunction?: (data: Insert<any> | any) => Promise<any>;
}) {
  const [items, setItems] = React.useState<T[]>(data ?? []);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<
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

  React.useEffect(() => {
    if (isBrowser) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setColumnVisibility(JSON.parse(stored));
      }
    }
  }, []);

  React.useEffect(() => {
    // Save the column visibility to localStorage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  // If you are feeding the context a prop that is fetched on the client (initially null) then you need to update the items when the data changes
  // Otherwise the table will be defined with null items that will never be updated
  React.useEffect(() => {
    if (data === items) return;
    setItems(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const table = useReactTable({
    data: items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility,
      columnFilters,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  const updateItem = React.useCallback(
    async (id: string, data: Partial<T>) => {
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
            item.id === id ? (updatedItem as T) : item,
          ),
        );

        toast.success('Item updated successfully');
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

  const createItem = React.useCallback(
    async (data: Insert<T>) => {
      if (!createFunction) {
        throw new Error('createFunction is required');
      }

      try {
        const newItem = await createFunction(data);

        setItems((currentItems) => [newItem, ...currentItems]);

        // toast.success('Item created successfully');

        return newItem;
      } catch (error) {
        // toast.error('Failed to create item');
        throw error;
      }
    },
    [createFunction],
  );

  const deleteItem = React.useCallback(
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
        toast.success('Item deleted successfully');
      } catch (error) {
        setItems(originalItems);

        // toast.error('Failed to delete item');

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
        updateItem,
        deleteItem,
        createItem,
        columns,
        columnVisibility,
        setColumnVisibility,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export const useDataTable = () => {
  const context = React.useContext(DataTableContext);

  if (!context) {
    return null;
    // We don't throw an error because it can be used in sheets that aren't in providers
    throw new Error('useDataTable must be used within a DataTableProvider');
  }

  return context;
};
