---
title: Explanation
---

`useHasMounted` returns a boolean flag indicating whether the component has mounted on the client. This is helpful to gate rendering that depends on browser APIs or values that differ between SSR and client (preventing hydration mismatches).

# Code

```tsx
import { useEffect, useState } from 'react';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
```
