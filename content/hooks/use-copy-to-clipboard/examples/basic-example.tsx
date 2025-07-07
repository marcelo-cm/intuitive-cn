'use client';

import {
  AlertTriangleIcon,
  CheckIcon,
  CopyIcon,
  RefreshCcwIcon,
} from 'lucide-react';

import { Button } from '@/components/intuitive-ui/(native)/button';
import { Variant } from '@/components/intuitive-ui/(native)/component-enums';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

import Container from '@/app/[topic]/[slug]/_components/container';
import { cn } from '@/lib/utils';

const BasicExample: React.FC = () => {
  const { handleCopy, isCopied } = useCopyToClipboard('Hello, world!');
  const {
    handleCopy: handleCopyFailure,
    error: errorFailure,
    reset: resetFailure,
  } = useCopyToClipboard('Hello, world!', {
    persistError: true,
  });

  // Force failure by overriding clipboard API temporarily
  const handleForcedFailure = async () => {
    const originalClipboard = navigator.clipboard;
    // Temporarily remove clipboard API to force failure
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });

    try {
      await handleCopyFailure();
    } finally {
      // Restore clipboard API
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <Button
          onClick={handleCopy}
          variant={isCopied ? Variant.SUCCESS : Variant.PRIMARY}
          TrailingIcon={isCopied ? CheckIcon : CopyIcon}
        >
          {isCopied ? 'Copied!' : 'Copy  to clipboard'}
        </Button>
      </Container>
      <Container className="gap-2">
        <div className="flex flex-row items-center gap-2">
          <Button
            onClick={handleForcedFailure}
            TrailingIcon={errorFailure ? AlertTriangleIcon : CopyIcon}
            variant={errorFailure ? Variant.DESTRUCTIVE : Variant.PRIMARY}
          >
            {errorFailure ? 'Failed to copy!' : 'Click to see failure'}
          </Button>
          <Button variant={Variant.GHOST} onClick={resetFailure} icon>
            <RefreshCcwIcon className="h-4 w-4" />
          </Button>
        </div>
        <p
          className={cn(
            'mt-2 text-sm',
            errorFailure
              ? 'text-destructive-foreground'
              : 'text-muted-foreground',
          )}
        >
          {(errorFailure && errorFailure) || 'No error'}
        </p>
      </Container>
    </div>
  );
};

export default BasicExample;
