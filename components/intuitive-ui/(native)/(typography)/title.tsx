import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Size } from '../component-enums';
import { TextLevel, TextTransform } from './typography-enums';

const titleVariants = cva(
  'tracking-tight break-words font-medium flex items-center mb-2',
  {
    variants: {
      level: {
        [TextLevel.H1]: 'text-4xl [&_svg]:size-7.5',
        [TextLevel.H2]: 'text-3xl',
        [TextLevel.H3]: 'text-2xl [&_svg]:size-5.5',
        [TextLevel.H4]: 'text-xl',
        [TextLevel.H5]: 'text-lg',
        [TextLevel.H6]: 'text-base',
        [TextLevel.P]: 'text-base',
        [TextLevel.SPAN]: 'inline',
      },
      size: {
        [Size.XXS]: 'text-xs',
        [Size.XS]: 'text-sm',
        [Size.SM]: 'text-base',
        [Size.MD]: 'text-lg',
        [Size.LG]: 'text-xl',
        [Size.XL]: 'text-2xl [&_svg]:size-5.5',
        [Size.XXL]: 'text-3xl',
        [Size.XXXL]: 'text-4xl [&_svg]:size-7.5',
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
      level: TextLevel.H1,
      srOnly: false,
      pretty: false,
      balance: false,
    },
  },
);

export interface TitleProps
  extends React.HTMLAttributes<
      HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
    >,
    VariantProps<typeof titleVariants> {
  /** Icon to display before the title text */
  LeadingIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon to display after the title text */
  TrailingIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** For accessibility, mark if this title is a section heading */
  isSectionHeading?: boolean;
  /** For accessibility, override the heading level for screen readers */
  ariaLevel?: number;
}

const Title = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement,
  TitleProps
>(
  (
    {
      className,
      level = TextLevel.H1,
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
          titleVariants({
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
          <LeadingIcon className="mr-2 inline-block" aria-hidden="true" />
        )}
        {children}
        {TrailingIcon && (
          <TrailingIcon className="ml-2 inline-block" aria-hidden="true" />
        )}
      </Comp>
    );
  },
);
Title.displayName = 'Title';

export { Title, titleVariants };
