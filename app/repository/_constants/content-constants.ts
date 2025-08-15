import HOOK_CONTENT from '@/app/repository/_content/hooks/content';

import DOCS_CONTENT from '@/app/repository/_content/docs/content';
import PATTERNS_CONTENT from '@/app/repository/_content/patterns/content';

import { IContentGroup } from './content-types';

export const TABLE_OF_CONTENTS_ITEMS: IContentGroup[] = [
  DOCS_CONTENT,
  HOOK_CONTENT,
  PATTERNS_CONTENT,
];
