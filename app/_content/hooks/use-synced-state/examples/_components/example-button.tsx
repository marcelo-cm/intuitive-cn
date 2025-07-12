import { Button } from '@/components/ui/button';

import useSyncedState from '@/hooks/use-synced-state';

import Container from '@/app/[topic]/[slug]/_components/container';

interface ExampleButtonProps {
  initialCount: number;
}

const ExampleButton = ({ initialCount }: ExampleButtonProps) => {
  const [count, setCount] = useSyncedState(initialCount);

  return (
    <Container className="bg-background w-full">
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </Container>
  );
};

export default ExampleButton;
