import { Book, BookOpen, Database, FileWarning } from 'lucide-react';

import { IContentGroup } from '@/app/[topic]/_constants/content-types';

const CONTENT: IContentGroup = {
  title: 'Docs',
  Icon: Book,
  items: [
    {
      title: 'Getting Started—What is this, and why does it exist?',
      href: '/docs/getting-started',
      Icon: BookOpen,
    },
    {
      title: 'Linting—What it is, why and how to use it',
      description:
        'Automated code quality checks to catch bugs early and enforce consistent style',
      href: '/docs/linting-101',
      Icon: FileWarning,
    },
    {
      title: 'Working with Drizzle ORM & Supabase, and Why',
      href: '/docs/drizzle-orm',
      Icon: Database,
    },
    // {
    //   title: 'Cursor Rules',
    //   description:
    //     'Helpful directives to make your Cursor Agent a better frontend engineer',
    //   href: '/docs/cursor-rules',
    //   Icon: MousePointer,
    // },
  ],
};

export default CONTENT;
