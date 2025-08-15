'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import Container from '@/app/repository/[topic]/[slug]/_components/container';

import ExampleButton from './_components/example-button';

const BasicExample = () => {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <div className="flex shrink-0 flex-grow flex-col">
        <p className="text-muted-foreground mb-2 text-sm">
          Start counting from...
        </p>
        <RadioGroup
          onValueChange={(value) => setCount(Number(value))}
          className="grid grid-cols-3 gap-2"
        >
          <div className="flex flex-row items-center gap-2">
            <RadioGroupItem value="0" id="start-from-0" />
            <Label htmlFor="start-from-0">0</Label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <RadioGroupItem value="10" id="start-from-10" />
            <Label htmlFor="start-from-10">10</Label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <RadioGroupItem value="100" id="start-from-100" />
            <Label htmlFor="start-from-100">100</Label>
          </div>
        </RadioGroup>
      </div>
      <ExampleButton initialCount={count} />
    </Container>
  );
};

export default BasicExample;
