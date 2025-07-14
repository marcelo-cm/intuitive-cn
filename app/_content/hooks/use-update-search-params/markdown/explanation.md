---
title: useUpdateSearchParams
visibility: public
---

# What & Why?

This `useUpdateSearchParams` hook provides a comprehensive API for managing URL search parameters. It includes flexible options for controlling scroll behavior and routing methods (push vs replace). This ensures performant URL updates while maintaining proper browser history management, according to user preferences.

# Code

```tsx
import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchParamValue = string | number | boolean | null | undefined;
type SearchParams = Record<string, SearchParamValue>;

interface UpdateOptions {
  scroll?: boolean;
  shallow?: boolean;
}

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo(() => {
    if (!searchParams) return {};

    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (params: SearchParams, options: UpdateOptions = {}) => {
      if (!searchParams) return;

      const { scroll = false, shallow = false } = options;
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value == null || value === '') {
          nextSearchParams.delete(key);
        } else {
          nextSearchParams.set(key, String(value));
        }
      }

      const newUrl = `${pathname}?${nextSearchParams.toString()}`;

      if (shallow) {
        /**
         * Use push for shallow updates (adds to history)
         */
        router.push(newUrl, { scroll });
      } else {
        /**
         * Use replace for deep updates (replaces current history entry)
         */
        router.replace(newUrl, { scroll });
      }
    },
    [router, pathname, searchParams],
  );

  const updateParam = useCallback(
    (key: string, value: SearchParamValue, options?: UpdateOptions) => {
      updateSearchParams({ [key]: value }, options);
    },
    [updateSearchParams],
  );

  const removeParams = useCallback(
    (keys: string | string[], options?: UpdateOptions) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      const paramsToRemove = keysArray.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {} as SearchParams);

      updateSearchParams(paramsToRemove, options);
    },
    [updateSearchParams],
  );

  const clearParams = useCallback(
    (options?: UpdateOptions) => {
      if (!searchParams) return;

      const allParams: SearchParams = {};
      searchParams.forEach((_, key) => {
        allParams[key] = null;
      });

      updateSearchParams(allParams, options);
    },
    [searchParams, updateSearchParams],
  );

  return {
    updateSearchParams,
    updateParam,
    removeParams,
    clearParams,
    currentParams,
  };
};
```
