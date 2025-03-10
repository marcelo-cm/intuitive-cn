import React from 'react';

import { Card, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useContext } from './view';

const NameInput = () => {
  const { state, setState } = useContext();

  return (
    <Input
      value={state.name}
      onChange={(e) => setState({ ...state, name: e.target.value })}
    />
  );
};

const AgeInput = () => {
  const { state, setState } = useContext();

  return (
    <Input
      value={state.age}
      onChange={(e) => setState({ ...state, age: e.target.value })}
    />
  );
};

const NameAge = () => {
  const { state } = useContext();

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

const Unstable = () => {
  return (
    <div className="bg-slate10 grid h-full items-center justify-center gap-4 p-8">
      <div className="flex flex-col gap-4">
        <p className="text-slate10 text-center text-sm">
          Using StableStateProvider
        </p>
        <NameAge />
        <div className="flex gap-2">
          <NameInput />
          <AgeInput />
        </div>
      </div>
    </div>
  );
};

export default Unstable;
