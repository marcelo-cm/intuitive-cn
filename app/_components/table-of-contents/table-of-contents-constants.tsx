import { ElementType } from 'react';

import {
  Book,
  Copy,
  Database,
  FileWarning,
  Folder,
  LayoutGrid,
  Loader,
  MousePointer,
  MousePointerClick,
  Search,
  Smartphone,
  Table,
  TextIcon,
  Zap,
} from 'lucide-react';

interface TTableOfContentsItem {
  Icon: ElementType;
  title: string;
  description?: string;
  href: string;
}

interface TTableOfContentsGroup {
  Icon: ElementType;
  title: string;
  items: TTableOfContentsItem[];
}

export const TABLE_OF_CONTENTS_ITEMS: TTableOfContentsGroup[] = [
  {
    title: 'Docs',
    Icon: Book,
    items: [
      {
        title: 'File Structure, Organization, and Naming Conventions',
        href: '/docs/file-structure-organization-and-naming-conventions',
        Icon: Folder,
      },
      {
        title: 'Linting—What it is, why and how to use it',
        href: '/docs/linting-what-why-and-how-to-use-it',
        Icon: FileWarning,
      },
      {
        title: 'Basic Data Model Requirements',
        href: '/docs/basic-data-model-requirements',
        Icon: Table,
      },
      {
        title: 'Cursor Rules',
        href: '/docs/cursor-rules',
        Icon: MousePointer,
      },
      {
        title: 'Working with Drizzle ORM & Supabase, and Why',
        href: '/docs/drizzle-orm',
        Icon: Database,
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
];
