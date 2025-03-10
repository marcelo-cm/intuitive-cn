import React from 'react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

/**
 * HOOK-BASED STABLE STATE PATTERN
 *
 * USE CASE: Factory hook approach for feature-specific state that needs to be:
 * 1. Scoped to specific features or modules
 * 2. Defined once with a static initial value
 * 3. Used directly without providers/context
 * 4. Potentially created in multiple independent instances
 *
 * Example usage:
 * ```tsx
 * // Create feature-specific state hooks
 * const useUserState = create({ name: '', email: '', isLoggedIn: false });
 * const useCartState = create({ items: [], total: 0 });
 *
 * // UserProfile component only re-renders when user properties change
 * function UserProfile() {
 *   const user = useUserState();
 *   return (
 *     <div>
 *       <h2>{user.name}</h2>
 *       <p>{user.email}</p>
 *       <button onClick={() => user.isLoggedIn = false}>Logout</button>
 *     </div>
 *   );
 * }
 *
 * // ShoppingCart component only re-renders when cart properties change
 * function ShoppingCart() {
 *   const cart = useCartState();
 *   return (
 *     <div>
 *       <p>Items: {cart.items.length}</p>
 *       <p>Total: ${cart.total}</p>
 *     </div>
 *   );
 * }
 *
 * // Multiple independent counters example
 * const useCounter = create({ count: 0 });
 * const useSecondCounter = create({ count: 100 }); // Different instance
 *
 * function CounterA() {
 *   const counter = useCounter();
 *   return <button onClick={() => counter.count++}>{counter.count}</button>;
 * }
 *
 * function CounterB() {
 *   const counter = useSecondCounter(); // Different state instance
 *   return <button onClick={() => counter.count++}>{counter.count}</button>;
 * }
 * ```
 *
 * ADVANTAGES:
 * - No provider needed - simpler component tree
 * - Module-level singletons for related components
 * - Can create multiple independent instances
 * - Works with code splitting naturally
 * - Easy to test without context mocking
 * - Perfect for UI state that doesn't need to be hydrated from server
 */

const useLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Define types for our state
interface IState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type TListener = (state: IState, key: string) => void;

function create<T extends IState>(initial: T) {
  const state: IState = initial;
  const listeners = new Set<TListener>();

  function subscribe(listener: TListener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function setState(key: string, value: unknown) {
    if (!Object.is(state[key], value)) {
      state[key] = value;
    }

    listeners.forEach((listener) => listener(state, key));
  }

  function useStore(): IState {
    const tracked = React.useRef<Record<string, boolean>>({});
    const stateRef = React.useRef<IState>(state);
    const [, rerender] = useState<object>({});

    const proxy = useMemo(() => {
      stateRef.current = state;

      return new Proxy(
        {},
        {
          get(_: object, property: string | symbol) {
            if (typeof property === 'string') {
              tracked.current[property] = true;
              return stateRef.current[property];
            }
            return undefined;
          },
          set(_: object, property: string | symbol, value: unknown) {
            if (typeof property === 'string') {
              setState(property, value);
            }
            return true;
          },
        },
      );
    }, []);

    useLayout(() => {
      const unsub = subscribe((_: IState, key: string) => {
        if (tracked.current[key]) {
          rerender({});
        }
      });

      return unsub;
    }, []);

    return proxy as IState;
  }

  return useStore;
}

export default create;
