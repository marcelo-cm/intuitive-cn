'use client';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Container from '@/app/[topic]/[slug]/_components/container';

import ExampleTriggeredDialog from './_components/example-triggered-dialog';

const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    // Clear input when dialog is closed
    if (!open) {
      setInputValue('');
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Trigger on Enter key if input contains "please"
      if (e.key === 'Enter' && inputValue.toLowerCase().trim() === 'please') {
        setIsOpen(true);
      }
    },
    [inputValue],
  );

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <ExampleTriggeredDialog>
          <Button>Open</Button>
        </ExampleTriggeredDialog>
      </Container>
      <Container>
        <Input
          placeholder="Say 'please' and press Enter..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Magic word input"
        />
        <ExampleTriggeredDialog open={isOpen} onOpenChange={handleOpenChange} />
      </Container>
    </div>
  );
};

export default BasicExample;
