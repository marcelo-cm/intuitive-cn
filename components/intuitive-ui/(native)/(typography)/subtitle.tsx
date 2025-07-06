import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Size } from '../component-enums';
import { TextLevel, TextTransform } from './typography-enums';

const subtitleVariants = cva(
  'tracking-tight break-words mb-4 flex items-center gap-2',
  {
    variants: {
      level: {
        [TextLevel.H1]: 'text-3xl text-foreground',
        [TextLevel.H2]: 'text-2xl text-foreground',
        [TextLevel.H3]: 'text-xl text-foreground',
        [TextLevel.H4]: 'text-lg text-muted-foreground',
        [TextLevel.H5]: 'text-base text-muted-foreground',
        [TextLevel.H6]: 'text-sm text-muted-foreground',
        [TextLevel.P]: 'text-base text-muted-foreground',
        [TextLevel.SPAN]: 'inline text-muted-foreground',
      },
      size: {
        [Size.XXS]: 'text-xs',
        [Size.XS]: 'text-sm',
        [Size.SM]: 'text-base',
        [Size.MD]: 'text-lg',
        [Size.LG]: 'text-xl',
        [Size.XL]: 'text-2xl',
        [Size.XXL]: 'text-3xl',
        [Size.XXXL]: 'text-4xl [&_svg]:size-6',
      },
      transform: {
        [TextTransform.UPPERCASE]: 'uppercase',
        [TextTransform.LOWERCASE]: 'lowercase',
        [TextTransform.CAPITALIZE]: 'capitalize',
      },
      srOnly: { true: 'sr-only' },
      pretty: { true: 'text-pretty' },
      balance: { true: 'text-balance' },
    },
    defaultVariants: {
      level: TextLevel.H4,
      srOnly: false,
      pretty: false,
      balance: false,
    },
  },
);

export interface SubtitleProps
  extends React.HTMLAttributes<
      HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
    >,
    VariantProps<typeof subtitleVariants> {
  /** Icon to display before the subtitle text */
  LeadingIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon to display after the subtitle text */
  TrailingIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** For accessibility, mark if this subtitle is a section heading */
  isSectionHeading?: boolean;
  /** For accessibility, override the heading level for screen readers */
  ariaLevel?: number;
}

const Subtitle = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement,
  SubtitleProps
>(
  (
    {
      className,
      level = TextLevel.H4,
      size,
      transform,
      srOnly,
      pretty,
      LeadingIcon,
      TrailingIcon,
      isSectionHeading = false,
      ariaLevel,
      children,
      balance,
      ...props
    },
    ref,
  ) => {
    if (balance && pretty) {
      throw new Error(
        'balance and pretty cannot be used together. please use one or the other.',
      );
    }
    // Determine the component to render
    const Comp = level as React.ElementType;

    // Accessibility attributes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessibilityProps: Record<string, any> = {};
    if (isSectionHeading) {
      accessibilityProps.role = 'heading';
      accessibilityProps['aria-level'] =
        ariaLevel || (level === TextLevel.P ? 2 : undefined);
    }

    return (
      <Comp
        className={cn(
          subtitleVariants({
            level,
            size,
            transform,
            srOnly,
            pretty,
            balance,
          }),
          className,
        )}
        ref={ref}
        {...accessibilityProps}
        {...props}
      >
        {LeadingIcon && (
          <LeadingIcon className="inline-block" aria-hidden="true" />
        )}
        {children}
        {TrailingIcon && (
          <TrailingIcon className="inline-block" aria-hidden="true" />
        )}
      </Comp>
    );
  },
);
Subtitle.displayName = 'Subtitle';

export { Subtitle, subtitleVariants };
