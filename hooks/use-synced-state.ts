import { useEffect, useState } from 'react';

/**
 * Just like a useState, but if the initial state is changed, the state will be updated to the new value.
 * @important — You should only ever use this hook if you need to use the setter, otherwise you should just useMemo the value you want to sync.
 */
const useSyncedState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState] as const;
};

export default useSyncedState;
