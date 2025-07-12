import Link from 'next/link';

import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';
import { TextLevel } from '@/components/intuitive-ui/(native)/(typography)/typography-enums';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import { IContentGroup } from '../[topic]/_constants/content-types';

interface ITableOfContentsSectionProps {
  group: IContentGroup;
}

const TableOfContentsSection = ({ group }: ITableOfContentsSectionProps) => {
  return (
    <div className={cn('flex flex-col gap-2')}>
      <div className="flex flex-row items-start justify-between gap-2">
        <Title className="mb-0 text-sm font-medium" level={TextLevel.H6}>
          {group.title}
        </Title>
        <group.Icon className="mt-0.5 size-4" />
      </div>
      <Separator />
      {group.items.map((item) => (
        <Link key={item.title} className="group/link" href={item.href}>
          <div className="text-foreground flex flex-row items-start justify-between gap-2 no-underline group-hover/link:underline">
            <p className="mb-0 text-sm font-normal">{item.title}</p>
            <item.Icon className="mt-0.5 size-4" />
          </div>
          {item.description && (
            <p className="text-muted-foreground pr-6 text-sm text-pretty">
              {item.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
};

export default TableOfContentsSection;
