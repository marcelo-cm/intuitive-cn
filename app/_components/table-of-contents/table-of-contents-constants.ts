import { ElementType } from 'react';

import {
  Book,
  BookOpen,
  Copy,
  Cuboid,
  Database,
  FileWarning,
  Folder,
  LayoutGrid,
  Loader,
  MousePointer,
  MousePointerClick,
  Search,
  Server,
  Smartphone,
  Table,
  TextIcon,
  Zap,
} from 'lucide-react';

interface ITableOfContentsItem {
  Icon: ElementType;
  title: string;
  description?: string;
  href: string;
}

interface ITableOfContentsGroup {
  Icon: ElementType;
  title: string;
  items: ITableOfContentsItem[];
}

export const TABLE_OF_CONTENTS_ITEMS: ITableOfContentsGroup[] = [
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
  {
    title: 'Hooks',
    Icon: Zap,
    items: [
      {
        title: 'useCopyText',
        href: '/hooks/use-copy-text',
        Icon: Copy,
      },
      {
        title: 'useMobile',
        href: '/hooks/use-mobile',
        Icon: Smartphone,
      },
      {
        title: 'useUpdateSearchParams',
        href: '/hooks/use-update-search-params',
        Icon: Search,
      },
      {
        title: 'useGlobalLoading',
        href: '/hooks/use-global-loading',
        Icon: Loader,
      },
    ],
  },
  {
    title: 'Components',
    Icon: LayoutGrid,
    items: [
      {
        title: 'Typography',
        Icon: TextIcon,
        href: '/components/typography',
      },
      {
        title: 'Button',
        Icon: MousePointerClick,
        href: '/components/button',
      },
    ],
  },
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
  {
    title: 'Helpers',
    Icon: Cuboid,
    items: [
      {
        title: 'API Fetching Client',
        href: '/helpers/api-fetching-client',
        Icon: Server,
      },
    ],
  },
];
