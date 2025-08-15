---
title: Usage
---

# Usage

```tsx
'use client';

import React, { useCallback } from 'react';

import { toast } from 'sonner';

import { Input } from '@/components/intuitive-ui/(native)/input';

import { useAutoFocusedInput } from '@/hooks/use-auto-focused-input';

import Container from '@/app/repository/[topic]/[slug]/_components/container';

const BasicExample: React.FC = () => {
  const onEscape = useCallback(() => toast('Escape pressed'), []);
  const onEnter = useCallback(() => toast('Enter pressed'), []);

  const inputRef = useAutoFocusedInput({ onEscape, onEnter });

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <p className="text-muted-foreground text-sm">
          Start typing anywhere on the page to auto-focus the input
        </p>
        <Input
          ref={inputRef}
          placeholder="Start typing to focus me"
          className="max-w-sm"
        />
        <p className="text-muted-foreground text-sm">
          Press Escape or Enter to blur
        </p>
      </Container>
    </div>
  );
};

export default BasicExample;
```
