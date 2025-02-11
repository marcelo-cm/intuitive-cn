import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { usePaginatedDataTable } from '@/contexts/paginated-data-table-provider';
import { cn } from '@/lib/utils';

interface PaginatedFilterSelectProps<T> {
  filters: T;
  filterKey: keyof T;
  placeholder: string;
  className?: string;
  children: React.ReactNode;
}

export function PaginatedFilterSelect<T>({
  filters,
  filterKey,
  placeholder,
  className,
  children,
}: PaginatedFilterSelectProps<T>) {
  const context = usePaginatedDataTable();

  if (!context) {
    throw new Error('PaginatedDataTableProvider is missing');
  }

  const { setFilters, table } = context;

  const onFilterChange = (value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
    table.setPageIndex(0);
  };
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger
        className={cn(
          'group data-[is-empty=true]:text-muted-foreground text-black xl:max-w-[200px]',
          className,
        )}
        data-is-empty={!filters[filterKey]}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent data-is-empty={!filters[filterKey]} className="group">
        <SelectItem
          value={undefined as unknown as string}
          className="flex group-data-[is-empty=true]:hidden"
        >
          {filters[filterKey] ? 'All' : ''}
        </SelectItem>
        <hr className="my-2 flex group-data-[is-empty=true]:hidden" />
        {children}
      </SelectContent>
    </Select>
  );
}
