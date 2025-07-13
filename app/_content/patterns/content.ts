import { Folder, LayoutGrid, Table } from 'lucide-react';

import { IContentGroup } from '@/app/[topic]/_constants/content-types';

const CONTENT: IContentGroup = {
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
    // {
    //   title: 'Data Fetching (Server vs Client Side)',
    //   description:
    //     'Why you should use one or the other, and how to do each well.',
    //   href: '/patterns/data-fetching',
    //   Icon: Database,
    // },
  ],
};

export default CONTENT;
