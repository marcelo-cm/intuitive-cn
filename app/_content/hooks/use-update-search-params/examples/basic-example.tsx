'use client';

import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/intuitive-ui/(native)/button';
import {
  Accent,
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useUpdateSearchParams } from '@/hooks/use-update-search-params';

import Container from '@/app/[topic]/[slug]/_components/container';

import SearchParamForm from './_components/search-param-form';

const BasicExample: React.FC = () => {
  const { currentSearchParams, removeSearchParams } = useUpdateSearchParams();

  const searchParamEntries = Object.entries(currentSearchParams);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <SearchParamForm />
      <Container className="min-h-96 justify-start">
        <p className="text-muted-foreground mb-2 text-sm">
          Current Search Parameters
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchParamEntries.map(([key, value]) => (
              <TableRow key={key} className="group/row">
                <TableCell>{key}</TableCell>
                <TableCell className="flex flex-row items-center justify-between gap-2">
                  <div className="w-full">{value}</div>

                  <Button
                    variant={Variant.GHOST}
                    size={Size.SM}
                    icon
                    onClick={() => removeSearchParams(key)}
                    accent={Accent.DESTRUCTIVE}
                    className="opacity-0 group-hover/row:opacity-100"
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Container className="flex min-h-96 justify-start">
        <p className="text-muted-foreground mb-2 text-sm">
          Current Parameters JSON
        </p>
        <pre className="bg-muted flex flex-grow flex-col items-center justify-center overflow-x-auto rounded-md p-4 text-xs">
          {JSON.stringify(currentSearchParams, null, 2)}
        </pre>
      </Container>
    </div>
  );
};

export default BasicExample;
