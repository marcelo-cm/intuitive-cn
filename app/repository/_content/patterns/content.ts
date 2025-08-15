import { Folder, LayoutGrid } from 'lucide-react';

import { IContentGroup } from '@/app/repository/_constants/content-types';

import { getContentURL } from '../_utils/helper-utils';

const CONTENT: IContentGroup = {
  title: 'Patterns',
  Icon: LayoutGrid,
  items: [
    {
      title: 'Directory Structure & File Naming',
      href: getContentURL('patterns', 'directory-structure-and-file-naming'),
      Icon: Folder,
    },
    // {
    //   title: 'Data Modeling Base Model Requirements',
    //   href: '/patterns/data-modeling-base-model-requirements',
    //   Icon: Table,
    // },
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
