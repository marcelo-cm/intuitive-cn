import Link from 'next/link';

import { Subtitle } from '@/components/intuitive-ui/(native)/(typography)/subtitle';
import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';

import DashedGridGutter from './_components/dashed-grid-gutter';
import TableOfContents from './_components/table-of-contents';

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-grow flex-col items-center justify-start">
      <div className="asm:px-16 flex flex-grow flex-col gap-8 p-6 pt-24 pb-12">
        <div>
          <Title>the repository</Title>
          <Subtitle balance>
            patterns, code snippets, and basic practices for design engineering.
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
      <DashedGridGutter />
    </main>
  );
}
