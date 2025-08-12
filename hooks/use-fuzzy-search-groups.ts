import { useMemo, useState } from 'react';

import Fuse, { FuseOptionKey } from 'fuse.js';

type UseFuzzySearchGroupsOptions<T, C> = {
  searchKeys: FuseOptionKey<T>[];
  threshold?: number;
  ignoreLocation?: boolean;
  groupKeyFn?: (group: C) => string; // Optional function to generate a key for a group
};

/**
 * A hook that provides search functionality for nested items within groups.
 *
 * @param groups - List of group objects
 * @param itemsKey - Key in each group that contains the array of items to search
 * @param options - Search configuration options
 * @returns Object containing query state, setter, and filtered groups
 */
export function useFuzzySearchGroups<Group, Item>(
  groups: Group[],
  itemsKey: keyof Group,
  options: UseFuzzySearchGroupsOptions<Item, Group> = { searchKeys: [] },
): [
  string,
  (e: React.ChangeEvent<HTMLInputElement> | string) => void,
  Group[],
  boolean,
] {
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setQuery(value);
  };

  const {
    searchKeys,
    threshold = 0.2,
    ignoreLocation = true,
    groupKeyFn,
  } = options;

  // Create a memoized map of Fuse instances for each group
  // This prevents recreating Fuse instances on every render
  const fuseInstancesMap = useMemo(() => {
    return groups.reduce(
      (acc, group, index) => {
        const items = group[itemsKey] as unknown as Item[];

        if (items && Array.isArray(items)) {
          // Use provided key function, or fallback to index as a simple key
          // This avoids the expensive JSON.stringify operation
          const groupKey = groupKeyFn ? groupKeyFn(group) : `group_${index}`;

          acc[groupKey] = new Fuse(items, {
            keys: searchKeys as FuseOptionKey<Item>[],
            threshold,
            ignoreLocation,
          });
        }

        return acc;
      },
      {} as Record<string, Fuse<Item>>,
    );
  }, [groups, itemsKey, searchKeys, threshold, ignoreLocation, groupKeyFn]);

  const filteredGroups = useMemo(() => {
    if (!query) return groups;

    return groups
      .map((group, index) => {
        // Get the items array from the category using the provided key
        const items = group[itemsKey] as unknown as Item[];

        if (!items || !Array.isArray(items)) {
          return null;
        }

        // Use the pre-created Fuse instance for this group
        const groupKey = groupKeyFn ? groupKeyFn(group) : `group_${index}`;
        const fuse = fuseInstancesMap[groupKey];

        if (!fuse) return null;

        // Find matching items
        const matchingItems = fuse.search(query).map((result) => result.item);

        // Only keep categories with matching items
        return matchingItems.length > 0
          ? { ...group, [itemsKey]: matchingItems }
          : null;
      })
      .filter(Boolean) as Group[];
  }, [groups, query, itemsKey, fuseInstancesMap, groupKeyFn]);

  const isEmpty = useMemo(() => {
    return filteredGroups.length === 0;
  }, [filteredGroups]);

  return [query, handleQueryChange, filteredGroups, isEmpty];
}
