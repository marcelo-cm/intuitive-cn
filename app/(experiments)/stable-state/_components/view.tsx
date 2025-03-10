'use client';

import React from 'react';

import { StableStateProvider } from '@/contexts/stable-state-provider';

import Stable from './stable';
import Unstable from './unstable';

/**
 * COMPARISON: WHEN TO USE WHICH PATTERN
 *
 * 1. StableStateProvider (contexts/stable-state-provider.tsx)
 *    Best for:
 *    - Global app state (theme, user, settings)
 *    - State that needs to be initialized from server/props
 *    - State that needs to be nested/overridden in different subtrees
 *    - When you need to avoid module-level singletons
 *
 *    Example:
 *    ```tsx
 *    // In a layout or page component
 *    <StableStateProvider value={{ user: serverUser }}>
 *      <App />
 *    </StableStateProvider>
 *
 *    // In a component
 *    const state = useStableState();
 *    return <div>{state.user?.name}</div>;
 *    ```
 *
 * 2. useStableState hook (hooks/use-stable-state.tsx)
 *    Best for:
 *    - Feature-specific state
 *    - State with static initial values
 *    - When you don't want to add providers to your component tree
 *    - Creating multiple independent state instances
 *
 *    Example: (shown in this file below)
 */

// Define an interface that matches the AppState in app-state-provider

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StableStateViewWrapper = ({ data }: { data: any }) => {
  // Now data is properly typed and should match the expected structure
  return (
    <StableStateProvider value={data}>
      <StableStateView />
    </StableStateProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = React.createContext<any>({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState({ name: 'John', age: 20 });

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export const useContext = () => {
  return React.useContext(Context);
};

/**
 * BENEFIT 6: Clean Component Tree
 * - No provider wrappers needed (unlike Context API)
 * - Components can be placed anywhere in the tree
 * - Simple compositional pattern without complex state management boilerplate
 */
const StableStateView = () => {
  return (
    <div className="grid h-svh grid-cols-2">
      <Stable />
      <ContextProvider>
        <Unstable />
      </ContextProvider>
    </div>
  );
};

export default StableStateViewWrapper;
