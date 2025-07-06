import { ArrowLeft, Mail } from 'lucide-react';

import Link from 'next/link';

import { Button, ButtonGroup } from '@/components/intuitive-ui/(native)/button';
import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

const NotFound = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <p className="text-muted-foreground text-lg">
        sorry, this doesn&apos;t exist. can you shoot me an email about this?
      </p>
      <ButtonGroup aria-label="not-found-actions">
        <Link href="/">
          <Button size={Size.XXS} LeadingIcon={ArrowLeft}>
            home
          </Button>
        </Link>
        <Link href="mailto:hello@therepository.dev">
          <Button size={Size.XXS} TrailingIcon={Mail} variant={Variant.OUTLINE}>
            email
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default NotFound;
