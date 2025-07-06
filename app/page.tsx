'use client';

import { Subtitle } from '@/components/intuitive-ui/(native)/(typography)/subtitle';
import { Title } from '@/components/intuitive-ui/(native)/(typography)/title';

import DashedGridGutter from './_components/dashed-grid-gutter';
import TableOfContents from './_components/table-of-contents';

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-grow flex-col justify-start sm:justify-center">
      <div className="flex flex-col gap-8 p-6 py-24 sm:px-16">
        <div>
          <Title>the repository</Title>
          <Subtitle balance>
            components built for design engineering. patterns optimized for
            codegen, and scale.
          </Subtitle>
        </div>
        <TableOfContents />
      </div>
      <DashedGridGutter />
    </main>
  );
}
