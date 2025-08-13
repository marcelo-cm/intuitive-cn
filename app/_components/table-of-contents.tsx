'use client';

import { useCallback } from 'react';

import { Search } from 'lucide-react';

import { useLogSnag } from '@logsnag/next';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';

import { Button } from '@/components/intuitive-ui/(native)/button';
import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';
import { Input } from '@/components/intuitive-ui/(native)/input';

import { useAutoFocusedInput } from '@/hooks/use-auto-focused-input';
import { useFuzzySearchGroups } from '@/hooks/use-fuzzy-search-groups';
import { useIsMobile } from '@/hooks/use-is-mobile';

import { cn } from '@/lib/utils';

import { TABLE_OF_CONTENTS_ITEMS } from '../[topic]/_constants/content-constants';
import TableOfContentsSection from './table-of-contents-section';

const TableOfContents = () => {
  const isMobile = useIsMobile();
  const { track } = useLogSnag();
  const [query, setQuery, filteredContentGroups, isEmpty] =
    useFuzzySearchGroups(TABLE_OF_CONTENTS_ITEMS, 'items', {
      searchKeys: ['title', 'description'],
    });

  const searchRef = useAutoFocusedInput({
    onEscape: () => setQuery(''),
    onEnter: () => {
      if (isEmpty && query) {
        handleLogSnagRequest(query);
      }
    },
  });

  const handleLogSnagRequest = useCallback(
    (request: string | null) => {
      if (!request) return;

      track({
        event: 'request',
        channel: 'requests',
        description: request,
      });

      toast.success('Request submitted');
      setQuery('');
    },
    [track, setQuery],
  );

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogSnagRequest(query);
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="popLayout">
        <motion.form
          autoComplete="off"
          key="search-container"
          layout
          className={cn(
            isEmpty && 'bg-muted flex flex-col gap-2 rounded-sm p-4',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, delay: 0.1 }}
          onSubmit={handleSubmitRequest}
        >
          {isEmpty && (
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              I&apos;d like to read more about:
            </motion.p>
          )}

          <motion.div layoutId="search-input-container">
            <Input
              key="search-input"
              ref={searchRef}
              size={Size.SM}
              placeholder={
                !isMobile
                  ? 'Search the repository, or request something...'
                  : 'Search the repository...'
              }
              LeadingIcon={Search}
              value={query}
              onChange={setQuery}
              variant={isEmpty ? Variant.OUTLINE : Variant.MUTED}
            />
          </motion.div>
          {isEmpty && (
            <motion.div
              layoutId="submit-request-button"
              className="flex justify-end"
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button variant={Variant.PRIMARY} size={Size.XS} type="submit">
                Submit Request
              </Button>
            </motion.div>
          )}
        </motion.form>
        {filteredContentGroups.length > 0 && (
          <motion.div
            key={`content`}
            className="grid grid-cols-1 gap-12"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, delay: 0.15 },
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          >
            {filteredContentGroups.map((group) => (
              <TableOfContentsSection key={group.title} group={group} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableOfContents;
