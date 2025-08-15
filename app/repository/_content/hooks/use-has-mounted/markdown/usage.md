---
title: Usage
---

# Usage

```tsx
import { useHasMounted } from '@/hooks/use-has-mounted';

export function ClientOnly() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return <SomeBrowserOnlyComponent />;
}
```
