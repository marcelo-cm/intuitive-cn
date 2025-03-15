import * as React from 'react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Loader2, LucideProps } from 'lucide-react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Orientation, Shadow, Size, Variant } from './enums';

const buttonVariants = cva(
  'inline-flex w-fit relative items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm text-nowrap break-keep underline-offset-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-colors duration-200 focus-visible:ring-offset-2 focus-visible:ring-accent',
  {
    variants: {
      variant: {
        [Variant.PRIMARY]:
          'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/90 focus-visible:ring-primary',
        [Variant.SECONDARY]:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90 focus-visible:ring-secondary',
        [Variant.ACCENT]:
          'bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent/90',
        [Variant.DESTRUCTIVE]:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/90 focus-visible:ring-destructive',
        [Variant.SUCCESS]:
          'bg-success text-success-foreground hover:bg-success/80 active:bg-success/90 focus-visible:ring-success',
        [Variant.WARNING]:
          'bg-warning text-warning-foreground hover:bg-warning/80 active:bg-warning/90 focus-visible:ring-warning',
        [Variant.GHOST]: 'bg-transparent hover:backdrop-blur hover:bg-accent/3',
        [Variant.LINK]:
          'bg-transparent text-accent hover:text-accent/80 active:text-accent/90 hover:underline hover:backdrop-blur',
        [Variant.OUTLINE]:
          'border border-input bg-white hover:bg-gray-50 active:bg-gray-100',
      },
      size: {
        [Size.XXXS]: 'h-6 min-w-6 px-2 text-xs rounded-full',
        [Size.XXS]: 'h-7 min-w-7 px-2 text-xs',
        [Size.XS]: 'h-8 min-w-8 px-3 text-xs',
        [Size.SM]: 'h-9 min-w-9 px-3 text-xs',
        [Size.MD]: 'h-10 min-w-10 px-4 py-2',
        [Size.LG]: 'h-11 min-w-11 px-8',
        [Size.XL]: 'h-12 min-w-12 px-8',
        [Size.XXL]: 'h-13 min-w-13 px-8',
        [Size.XXXL]: 'h-14 min-w-14 px-8',
      },
      shadow: {
        true: 'shadow',
        [Shadow.SM]: 'shadow-sm',
        [Shadow.MD]: 'shadow-md',
        [Shadow.LG]: 'shadow-lg',
      },
      icon: {
        true: 'shrink-0 items-center justify-center p-0',
      },
      rounded: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: Variant.PRIMARY,
      size: Size.MD,
      icon: false,
      rounded: false,
    },
    compoundVariants: [
      {
        size: Size.XXXS,
        icon: true,
        className: 'size-6',
      },
      {
        size: Size.XXS,
        icon: true,
        className: 'size-7',
      },
      {
        size: Size.XS,
        icon: true,
        className: 'size-8',
      },
      {
        size: Size.SM,
        icon: true,
        className: 'size-9',
      },
      {
        size: Size.MD,
        icon: true,
        className: 'size-10',
      },
      {
        size: Size.LG,
        icon: true,
        className: 'size-11',
      },
      {
        size: Size.XL,
        icon: true,
        className: 'size-12',
      },
      {
        size: Size.XXL,
        icon: true,
        className: 'size-13',
      },
      {
        size: Size.XXXL,
        icon: true,
        className: 'size-14',
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Use the Radix UI Slot primitive to compose the button with other components */
  asChild?: boolean;
  /** Icon to display before the button children */
  LeadingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  /** Icon to display after the button children */
  TrailingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  /** Whether to display a loading spinner */
  loading?: boolean;
  /** Description for the button */
  description?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      rounded,
      shadow,
      LeadingIcon,
      TrailingIcon,
      asChild = false,
      children,
      loading = false,
      disabled = false,
      description,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = loading || disabled;
    const hiddenWhenLoading = loading ? 'opacity-0' : 'opacity-100';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, icon, rounded, shadow, className }),
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-live="polite"
        {...props}
      >
        <Loader2
          className={cn(
            'absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin text-inherit transition-opacity',
            loading ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        />

        {LeadingIcon && (
          <LeadingIcon
            aria-hidden="true"
            className={cn(hiddenWhenLoading, 'transition-opacity ease-in')}
          />
        )}
        <span className={cn(hiddenWhenLoading, 'transition-opacity ease-in')}>
          {children}
        </span>
        {TrailingIcon && (
          <TrailingIcon
            aria-hidden="true"
            className={cn(hiddenWhenLoading, 'transition-opacity ease-in')}
          />
        )}

        {/* Hidden description for screen readers */}
        {description && (
          <span id={`${props.id || ''}-description`} className="sr-only">
            {description}
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the button group for screen readers */
  'aria-label': string;
  /** Orientation of the button group */
  orientation?: Orientation;
  /** Children must be Button components */
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      'aria-label': ariaLabel,
      orientation = Orientation.HORIZONTAL,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn(
          'flex gap-2',
          orientation === Orientation.VERTICAL ? 'flex-col' : 'flex-row',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, buttonVariants };
