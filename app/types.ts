export type Insert<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;
export type Update<T> = Partial<Insert<T extends { id: string } ? T : never>>;
export type Delete<T extends { id: string }> = Pick<T, 'id'>;

// Types for pagination
export type TGetResourceFilterState = {
  [key: string]: string | number | boolean | null | undefined;
};

export type TGetResourceSortState = {
  sortedBy?: string;
  sortDirection?: 'asc' | 'desc' | null;
};

export type TPaginationOptions = {
  pageIndex: number;
  pageSize: number;
};

export type TGetResourceOptions = {
  filters: TGetResourceFilterState;
  sortState: TGetResourceSortState;
  pagination: TPaginationOptions;
};
