import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Email } from '@/icons/email-icon';
import { Github } from '@/icons/github-icon';
import { LinkedIn } from '@/icons/linkedin-icon';
import { X } from '@/icons/x';
import { cn } from '@/lib/utils';

const IconBar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        '[&_svg]:fill-muted-foreground [&_svg]:stroke-muted-foreground [&_svg]:active:stroke-accent-foreground [&_svg]:active:fill-accent-foreground flex flex-row gap-2 [&_svg]:stroke-0! [&_svg]:transition-all [&_svg]:duration-300 [&_svg]:ease-in-out [&_svg]:hover:rotate-12',
        className,
      )}
      {...props}
    >
      <Link href="https://github.com/marcelo-cm">
        <Github />
      </Link>
      <Link href="https://www.linkedin.com/in/marc-cham/">
        <LinkedIn />
      </Link>
      <Link href="https://x.com/marcelochaman">
        <X />
      </Link>
      <Link href="mailto:marcelo@gumloop.com">
        <Email className="stroke-[0.5px]" />
      </Link>
    </div>
  );
};

export default IconBar;
