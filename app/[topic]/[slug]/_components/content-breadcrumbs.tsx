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
  const topic = pathname?.split('/')[1] ?? '';

  return (
    <Breadcrumb className="flex flex-row items-center gap-2">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href={`/${topic}`}>{capitalizeText(topic)}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ContentBreadcrumbs;
