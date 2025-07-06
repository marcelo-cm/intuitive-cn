import Link from 'next/link';

import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';
import { TextLevel } from '@/components/intuitive-ui/(native)/(typography)/typography-enums';
import { Separator } from '@/components/ui/separator';

import { TABLE_OF_CONTENTS_ITEMS } from './table-of-contents-constants';

const TableOfContents = () => {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {TABLE_OF_CONTENTS_ITEMS.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <div className="flex flex-row items-start justify-between gap-2">
            <Title className="mb-0 text-sm font-medium" level={TextLevel.H6}>
              {group.title}
            </Title>
            <group.Icon className="mt-0.5 size-4" />
          </div>
          <Separator />
          {group.items.map((item) => (
            <Link
              key={item.title}
              className="text-muted-foreground hover:text-foreground flex flex-row items-start justify-between gap-2 no-underline hover:underline"
              href={item.href}
            >
              <p className="mb-0 text-sm font-normal">{item.title}</p>
              <item.Icon className="mt-0.5 size-4" />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
