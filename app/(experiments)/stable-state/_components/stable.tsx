import React from 'react';

import { Card, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import create from '@/hooks/use-stable-state';

import { useStableState } from '@/contexts/stable-state-provider';

/**
 * BENEFIT 1: Centralized State Definition
 * - Create a single source of truth for state that can be accessed by any component
 * - No need for React.Context or prop drilling
 * - Type-safe with proper TypeScript interfaces
 */
const useCount = create({ name: 'John', age: 20 });

/**
 * BENEFIT 2: Component Isolation with Shared State
 * - This component only tracks and re-renders when the 'name' property changes
 * - Changes to 'age' won't cause this component to re-render
 */
const NameInput = () => {
  const state = useCount();

  return (
    <Input value={state.name} onChange={(e) => (state.name = e.target.value)} />
  );
};

/**
 * BENEFIT 3: Optimized Rendering
 * - This component only tracks and re-renders when the 'age' property changes
 * - Changes to 'name' won't cause this component to re-render
 * - Direct state mutation with simple assignment syntax
 */
const AgeInput = () => {
  const state = useCount();

  return (
    <Input
      value={state.age}
      type="number"
      onChange={(e) => (state.age = e.target.value)}
    />
  );
};

/**
 * BENEFIT 4: Granular Subscriptions
 * - This component subscribes to both 'name' and 'age'
 * - Uses the same hook instance but only re-renders when accessed properties change
 * - No explicit dependency arrays or context selectors needed
 */
const AgeName = () => {
  const state = useCount();

  return (
    <Card className="flex flex-col gap-2">
      <CardDescription className="p-3">
        <h1 className="text-center text-lg font-medium">
          {state.name}, {state.age}
        </h1>
      </CardDescription>
    </Card>
  );
};

/**
 * BENEFIT 5: Context does not rerender the entire component tree
 * - Only the components that use the state will rerender
 */
const ContextNameAge = () => {
  const state = useStableState();

  return (
    <Card className="flex flex-col gap-2">
      <CardDescription className="p-3">
        <h1 className="text-center text-lg font-medium">
          {state.name}, {state.age}
        </h1>
      </CardDescription>
    </Card>
  );
};

const ContextNameInput = () => {
  const state = useStableState();

  return (
    <Input
      value={state.name ?? ''}
      onChange={(e) => (state.name = e.target.value)}
    />
  );
};

const ContextAgeInput = () => {
  const state = useStableState();

  return (
    <Input
      value={state.age ?? 0}
      type="number"
      onChange={(e) => (state.age = Number(e.target.value))}
    />
  );
};

const Stable = () => {
  return (
    <div className="bg-slate2 grid h-full items-center justify-center gap-4 p-8">
      <div className="flex flex-col gap-4">
        <p className="text-slate10 text-center text-sm">
          Using useStableState hook
        </p>
        <AgeName />
        <div className="flex gap-2">
          <NameInput />
          <AgeInput />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-slate10 text-center text-sm">
          Using StableStateProvider
        </p>
        <ContextNameAge />
        <div className="flex gap-2">
          <ContextNameInput />
          <ContextAgeInput />
        </div>
      </div>
    </div>
  );
};

export default Stable;
