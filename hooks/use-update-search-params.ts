import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchParamValue = string | number | boolean | null | undefined;
type SearchParams = Record<string, SearchParamValue>;

interface UpdateOptions {
  scroll?: boolean;
  shallow?: boolean;
}

/**
 * Hook to update the search params of the current URL.
 */
export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearchParams = useMemo(() => {
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

  const updateSearchParam = useCallback(
    (key: string, value: SearchParamValue, options?: UpdateOptions) => {
      updateSearchParams({ [key]: value }, options);
    },
    [updateSearchParams],
  );

  const removeSearchParams = useCallback(
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

  const removeSearchParam = useCallback(
    (key: string, options?: UpdateOptions) => {
      removeSearchParams([key], options);
    },
    [removeSearchParams],
  );

  const clearSearchParams = useCallback(
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
    updateSearchParam,
    removeSearchParam,
    removeSearchParams,
    clearSearchParams,
    currentSearchParams,
  };
};
