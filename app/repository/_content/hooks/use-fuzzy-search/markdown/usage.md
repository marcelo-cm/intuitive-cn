---
title: Usage
---

# Usage

```tsx
'use client';

import React from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/intuitive-ui/(native)/input';

import { useAutoFocusedInput } from '@/hooks/use-auto-focused-input';
import { useFuzzySearch } from '@/hooks/use-fuzzy-search';

import Container from '@/app/repository/[topic]/[slug]/_components/container';

const data = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Radix UI',
  'Shadcn UI',
];

const BasicExample: React.FC = () => {
  const [query, setQuery, results] = useFuzzySearch(data, {
    searchKeys: [],
  });
  const inputRef = useAutoFocusedInput();

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <div className="flex flex-col gap-2">
          <Input
            LeadingIcon={Search}
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies"
            className="max-w-sm min-w-sm"
          />
          <ul className="min-h-32 list-disc pl-6 text-sm">
            {results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default BasicExample;
```
