'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { MENU, TRoute } from '../_constants/menu';

const Navigation = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TRoute>(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const containerWidth = container.offsetWidth;
        const rightInset =
          100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;
        const leftInset = (offsetLeft / containerWidth) * 100;

        const side = activeTabElement.getAttribute('data-side');

        let borderRadius;
        if (side === 'left') {
          borderRadius = '2rem 1rem 1rem 2rem';
        } else if (side === 'right') {
          borderRadius = '1rem 2rem 2rem 1rem';
        } else {
          borderRadius = '0.5rem';
        }

        container.style.clipPath = `inset(0.25rem ${rightInset.toFixed(2)}% 0.25rem ${leftInset.toFixed(2)}% round ${borderRadius})`;
      }
    }
  }, [activeTab]);

  return (
    <div className="pointer-events-none absolute top-0 left-0 h-dvh w-dvw">
      <div className="pointer-events-auto fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow duration-1000 ease-in-out">
        <div className="bg-popover text-popover-foreground border-border/5 top-0 flex flex-row gap-0.5 rounded-full border p-1">
          {MENU.map(({ route, label }, idx) => (
            <Link href={route} passHref key={route}>
              <div
                data-side={
                  idx === 0
                    ? 'left'
                    : idx === MENU.length - 1
                      ? 'right'
                      : 'center'
                }
                onClick={() => setActiveTab(route)}
                className={cn(
                  'flex h-8 items-center-safe justify-center-safe rounded-full px-3 text-sm active:text-white',
                )}
                ref={activeTab === route ? activeTabElementRef : null}
              >
                {label}
              </div>
            </Link>
          ))}
        </div>
        <div
          className="bg-background/10 text-popover-foreground clip-path-container top-0 flex w-fit flex-row gap-0.5 rounded-full border p-1"
          aria-hidden
          ref={containerRef}
        >
          {MENU.map(({ route, label }) => (
            <Link href={route} passHref key={route}>
              <div
                key={route}
                className={cn(
                  'flex h-8 items-center-safe justify-center-safe px-3 text-sm drop-shadow-[0_0_5px_rgb(255_255_255_/_80%)]',
                )}
                tabIndex={-1}
              >
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
