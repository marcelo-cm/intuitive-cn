'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import Container from '@/app/[topic]/[slug]/_components/container';

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
          <div className="flex flex-row gap-2">
            <RadioGroupItem value="0" />
            <Label>0</Label>
          </div>
          <div className="flex flex-row gap-2">
            <RadioGroupItem value="10" />
            <Label>10</Label>
          </div>
          <div className="flex flex-row gap-2">
            <RadioGroupItem value="100" />
            <Label>100</Label>
          </div>
        </RadioGroup>
      </div>
      <ExampleButton initialCount={count} />
    </Container>
  );
};

export default BasicExample;
