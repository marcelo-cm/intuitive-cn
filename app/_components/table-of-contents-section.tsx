'use client';

import { useState } from 'react';

import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';
import { TextLevel } from '@/components/intuitive-ui/(native)/(typography)/typography-enums';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import {
  IContentGroup,
  IContentItem,
} from '../[topic]/_constants/content-types';
import TableOfContentsItem from './table-of-contents-item';

interface ITableOfContentsSectionProps {
  group: IContentGroup;
}

const TableOfContentsSection = ({ group }: ITableOfContentsSectionProps) => {
  const [activeItem, setActiveItem] = useState<IContentItem | null>(null);

  const handleItemClick = (item: IContentItem) => {
    setActiveItem(item);
  };

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
        <TableOfContentsItem
          key={item.title}
          item={item}
          isLoading={activeItem === item}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </div>
  );
};

export default TableOfContentsSection;
