'use client';

import React from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/intuitive-ui/(native)/input';

import { useAutoFocusedInput } from '@/hooks/use-auto-focused-input';
import { useFuzzySearchGroups } from '@/hooks/use-fuzzy-search-groups';

import Container from '@/app/repository/[topic]/[slug]/_components/container';

interface IGroup {
  id: string;
  title: string;
  items: { id: string; label: string }[];
}

const groups: IGroup[] = [
  {
    id: 'a',
    title: 'Frontend',
    items: [
      { id: '1', label: 'Next.js' },
      { id: '2', label: 'React' },
    ],
  },
  {
    id: 'b',
    title: 'Styling',
    items: [
      { id: '3', label: 'Tailwind' },
      { id: '4', label: 'Radix' },
    ],
  },
];

const BasicExample: React.FC = () => {
  const [query, setQuery, filtered] = useFuzzySearchGroups<
    IGroup,
    IGroup['items'][number]
  >(groups, 'items', { searchKeys: ['label'], groupKeyFn: (g) => g.id });

  const inputRef = useAutoFocusedInput();

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <div className="flex min-h-44 flex-col gap-2">
          <Input
            LeadingIcon={Search}
            ref={inputRef}
            value={query}
            onChange={setQuery}
            placeholder="Search across groups"
            className="max-w-sm min-w-sm"
          />
          <div className="space-y-3">
            {filtered.map((group) => (
              <div key={group.id}>
                <div className="text-muted-foreground mb-1 text-xs font-medium">
                  {group.title}
                </div>
                <ul className="list-disc pl-6 text-sm">
                  {group.items.map((item) => (
                    <li key={item.id}>{item.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BasicExample;
