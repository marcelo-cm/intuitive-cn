/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

/**
 * STABLE STATE PROVIDER PATTERN
 *
 * USE CASE: Provider-based approach for global application state that needs to be:
 * 1. Accessed across the entire application or within large subtrees
 * 2. Initialized with dynamic values (like from server components or props)
 * 3. Potentially overridden in different parts of the component tree
 * 4. Shared between unrelated components without creating module-level singletons
 *
 * Example usage:
 * ```tsx
 * // Layout or root component
 * export default function RootLayout({ children, initialData }) {
 *   return (
 *     <StableStateProvider value={initialData}>
 *       {children}
 *     </StableStateProvider>
 *   );
 * }
 *
 * // Nested component that overrides specific values
 * function FeatureSection() {
 *   return (
 *     <StableStateProvider value={{ featureFlag: true }}>
 *       <FeatureComponents />
 *     </StableStateProvider>
 *   );
 * }
 *
 * // Usage in a deeply nested component
 * function DeepComponent() {
 *   const state = useStableState();
 *   return <div>{state.user?.name}</div>;
 * }
 * ```
 *
 * ADVANTAGES:
 * - Can be initialized with props or server data
 * - Can be nested with value overrides
 * - Works well with Next.js App Router/RSC architecture
 * - No module-level singletons (better for testing)
 * - State can be "reset" when providers unmount
 */

// Define the state type with index signature to allow dynamic keys
interface IState {
  [key: string]: any;
}

// Define the context value interface
interface IStableStateContext {
  state: IState;
  subscribe: (listener: (key: string, value: any) => void) => () => void;
}

// Create context with proper typing
const StableStateContext = React.createContext<IStableStateContext | undefined>(
  undefined,
);

/**
 * @problem this only works with a key value pair where the entire object is being changed. for example if you had [key]: {name: 'John', age: 20} and you wanted to update the name, you would have to pass the entire object again.
 */
export const useStableState = () => {
  const rerender = React.useState<any>({})[1];
  const tracked = React.useRef<Record<string, boolean>>({});
  const context = React.useContext(StableStateContext);

  if (!context) {
    throw new Error('useStableState must be used within a Provider');
  }

  const { state, subscribe } = context;

  const proxy = React.useRef(
    new Proxy(
      {},
      {
        get(_: any, key: string | symbol) {
          if (typeof key === 'string') {
            tracked.current[key] = true;
            return state[key];
          }
          return undefined;
        },
        set(_: any, key: string | symbol, value: any) {
          if (typeof key === 'string') {
            state[key] = value;
          }
          return true;
        },
      },
    ),
  );

  React.useEffect(() => {
    return subscribe((key: string) => {
      if (tracked.current[key]) {
        rerender({});
      }
    });
  }, [subscribe]);

  return proxy.current as IState;
};

interface IProviderProps {
  children: React.ReactNode;
  value?: IState;
}

export const StableStateProvider: React.FC<IProviderProps> = ({
  children,
  value = {},
}) => {
  const state = React.useRef<IState>(value);
  const listeners = React.useRef<Set<(key: string, value: any) => void>>(
    new Set(),
  );

  const proxy = React.useRef(
    new Proxy(
      {},
      {
        get(_: any, key: string | symbol) {
          if (typeof key === 'string') {
            return state.current[key];
          }
          return undefined;
        },
        set(_: any, key: string | symbol, value: any) {
          if (typeof key === 'string') {
            state.current[key] = value;
            console.log('state.current[key]', state.current[key]);
            listeners.current.forEach((listener) => listener(key, value));
          }
          return true;
        },
      },
    ),
  );

  const subscribe = React.useCallback(
    (listener: (key: string, value: any) => void) => {
      listeners.current.add(listener);
      return () => {
        listeners.current.delete(listener);
      };
    },
    [],
  );

  const context = React.useMemo<IStableStateContext>(
    () => ({ state: proxy.current as IState, subscribe }),
    [subscribe],
  );

  return (
    <StableStateContext.Provider value={context}>
      {children}
    </StableStateContext.Provider>
  );
};
