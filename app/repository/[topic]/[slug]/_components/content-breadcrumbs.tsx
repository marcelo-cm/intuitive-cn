'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { capitalizeText } from '@/lib/utils/text-formatting-utils';

const ContentBreadcrumbs = () => {
  const pathname = usePathname();
  const topic = pathname?.split('/')[2] ?? '';

  return (
    <Breadcrumb className="flex flex-row items-center gap-2">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/repository">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem className="text-muted-foreground text-sm">
        {capitalizeText(topic)}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ContentBreadcrumbs;
