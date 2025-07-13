import {
  Book,
  BookOpen,
  Database,
  FileWarning,
  Folder,
  LayoutGrid,
  MousePointer,
  Table,
} from 'lucide-react';

import HOOK_CONTENT from '@/app/_content/hooks/content';

import { IContentGroup } from './content-types';

export const TABLE_OF_CONTENTS_ITEMS: IContentGroup[] = [
  {
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
        href: '/docs/linting-what-why-and-how-to-use-it',
        Icon: FileWarning,
      },
      {
        title: 'Working with Drizzle ORM & Supabase, and Why',
        href: '/docs/drizzle-orm',
        Icon: Database,
      },
      {
        title: 'Cursor Rules',
        href: '/docs/cursor-rules',
        Icon: MousePointer,
      },
    ],
  },
  HOOK_CONTENT,
  {
    title: 'Patterns',
    Icon: LayoutGrid,
    items: [
      {
        title: 'Directory Structure & File Naming',
        href: '/patterns/directory-structure-and-file-naming',
        Icon: Folder,
      },
      {
        title: 'Data Modeling Base Model Requirements',
        href: '/patterns/data-modeling-base-model-requirements',
        Icon: Table,
      },
      {
        title: 'Data Fetching (Server vs Client Side)',
        description:
          'Why you should use one or the other, and how to do each well.',
        href: '/patterns/data-fetching',
        Icon: Database,
      },
    ],
  },
];
