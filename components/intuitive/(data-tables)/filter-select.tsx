import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useDataTable } from '@/contexts/data-table-provider';
import { prettifyText } from '@/lib/utils';

interface DLIFilterSelectProps {
  name: string;
  children?: React.ReactNode;
}

const DLIFilterSelect = ({ name, children }: DLIFilterSelectProps) => {
  const context = useDataTable();

  if (!context) {
    throw new Error('DataTableProvider is missing');
  }

  const { table } = context;

  return (
    <Select
      onValueChange={(value) => table.getColumn(name)?.setFilterValue(value)}
    >
      <SelectTrigger
        data-is-empty={!table.getColumn(name)?.getFilterValue()}
        className="group text-black data-[is-empty=true]:text-muted-foreground xl:max-w-[200px]"
      >
        <SelectValue placeholder={`Filter by ${prettifyText(name)}`} />
      </SelectTrigger>
      <SelectContent
        data-is-empty={!table.getColumn(name)?.getFilterValue()}
        className="group"
      >
        <SelectItem
          value={undefined as unknown as string}
          className="flex group-data-[is-empty=true]:hidden"
          onClick={() => table.getColumn(name)?.setFilterValue(undefined)}
        >
          {table.getColumn(name)?.getFilterValue() ? 'All' : ''}
        </SelectItem>
        <hr className="my-2 flex group-data-[is-empty=true]:hidden" />
        {children}
      </SelectContent>
    </Select>
  );
};

export default DLIFilterSelect;
