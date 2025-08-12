import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import Fuse, { FuseOptionKey } from 'fuse.js';

type UseFuzzySearchOptions<T> = {
  searchKeys: FuseOptionKey<T>[];
  threshold?: number;
  ignoreLocation?: boolean;
};

/**
 * A hook that provides fuzzy search functionality for an array of items.
 *
 * @param items - Array of items to search
 * @param options - Search configuration options
 * @returns Array containing query state, setter, and filtered items
 */
export function useFuzzySearch<T>(
  items: T[],
  options: UseFuzzySearchOptions<T> = { searchKeys: [] },
): [string, Dispatch<SetStateAction<string>>, T[], boolean] {
  const [query, setQuery] = useState<string>('');
  const { searchKeys, threshold = 0.2, ignoreLocation = true } = options;

  // Create a memoized Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: searchKeys as FuseOptionKey<T>[],
      threshold,
      ignoreLocation,
    });
  }, [items, searchKeys, threshold, ignoreLocation]);

  // Filter items based on the search query
  const filteredItems = useMemo(() => {
    if (!query) return items;
    return fuse.search(query).map((result) => result.item);
  }, [fuse, items, query]);

  const isEmpty = useMemo(() => {
    return filteredItems.length === 0;
  }, [filteredItems]);

  return [query, setQuery, filteredItems, isEmpty];
}
