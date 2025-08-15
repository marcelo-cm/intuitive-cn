import Link from 'next/link';

import { Subtitle } from '@/components/intuitive-ui/(native)/(typography)/subtitle';
import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';

import DashedGridGutter from './_components/dashed-grid-gutter';
import TableOfContents from './_components/table-of-contents';

export default function Repository() {
  return (
    <main className="flex h-dvh overflow-hidden">
      <div className="flex flex-grow flex-col items-center justify-start overflow-y-auto mask-y-from-[95%]">
        <div className="flex flex-grow flex-col gap-8 p-6 pt-24 pb-12 sm:px-16">
          <div>
            <Title>the repository</Title>
            <Subtitle balance>
              patterns, code snippets, and basic practices for design
              engineering.
            </Subtitle>
          </div>
          <div className="max-w-lg">
            <TableOfContents />
          </div>
          <p className="text-muted-foreground mt-auto py-4 text-sm">
            By{' '}
            <Link
              href="https://x.com/marcelochaman"
              className="underline-offset-2 hover:underline"
            >
              Marcelo
            </Link>
          </p>
        </div>
      </div>
      <DashedGridGutter />
    </main>
  );
}
