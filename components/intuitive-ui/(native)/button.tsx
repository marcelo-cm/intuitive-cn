import * as React from 'react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Loader2, LucideProps } from 'lucide-react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Accent, Orientation, Shadow, Size, Variant } from './component-enums';

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
        [Variant.GHOST]:
          'bg-transparent hover:backdrop-blur hover:bg-accent/3 hover:opacity-80 active:opacity-90',
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
      accent: {
        [Accent.DESTRUCTIVE]:
          'hover:bg-destructive/80 active:bg-destructive/90 focus-visible:ring-destructive hover:text-destructive-foreground hover:border-destructive-foreground/10',
        [Accent.SUCCESS]:
          'hover:bg-success/80 active:bg-success/90 focus-visible:ring-success hover:text-success-foreground hover:border-success-foreground/10',
        [Accent.WARNING]:
          'hover:bg-warning/80 active:bg-warning/90 focus-visible:ring-warning hover:text-warning-foreground hover:border-warning-foreground/10',
      },
      icon: { true: 'p-0' },
      rounded: { true: 'rounded-full' },
      invert: { true: '' },
      invertAccent: { true: '' },
    },
    defaultVariants: {
      variant: Variant.PRIMARY,
      size: Size.MD,
      icon: false,
      rounded: false,
    },
    compoundVariants: [
      // Icon size compounds
      { size: Size.XXXS, icon: true, className: 'size-6 [&_svg]:size-3!' },
      { size: Size.XXS, icon: true, className: 'size-7 [&_svg]:size-3.5!' },
      { size: Size.XS, icon: true, className: 'size-8' },
      { size: Size.SM, icon: true, className: 'size-9' },
      { size: Size.MD, icon: true, className: 'size-10' },
      { size: Size.LG, icon: true, className: 'size-11' },
      { size: Size.XL, icon: true, className: 'size-12' },
      { size: Size.XXL, icon: true, className: 'size-13 [&_svg]:size-5' },
      { size: Size.XXXL, icon: true, className: 'size-14 [&_svg]:size-6' },

      // Invert compounds
      {
        invert: true,
        variant: Variant.PRIMARY,
        className:
          'bg-primary-foreground text-primary hover:bg-primary-foreground/80 active:bg-primary-foreground/90',
      },
      {
        invert: true,
        variant: Variant.SECONDARY,
        className:
          'bg-secondary-foreground text-secondary hover:bg-secondary-foreground/80 active:bg-secondary-foreground/90',
      },
      {
        invert: true,
        variant: Variant.ACCENT,
        className:
          'bg-accent-foreground text-accent hover:bg-accent-foreground/80 active:bg-accent-foreground/90',
      },
      {
        invert: true,
        variant: Variant.DESTRUCTIVE,
        className:
          'bg-destructive-foreground text-destructive hover:bg-destructive-foreground/80 active:bg-destructive-foreground/90',
      },
      {
        invert: true,
        variant: Variant.SUCCESS,
        className:
          'bg-success-foreground text-success hover:bg-success-foreground/80 active:bg-success-foreground/90',
      },
      {
        invert: true,
        variant: Variant.WARNING,
        className:
          'bg-warning-foreground text-warning hover:bg-warning-foreground/80 active:bg-warning-foreground/90',
      },

      // Invert accent compounds
      {
        invertAccent: true,
        accent: Accent.DESTRUCTIVE,
        className:
          'hover:bg-destructive-foreground/70 active:bg-destructive-foreground hover:text-destructive active:text-destructive',
      },
      {
        invertAccent: true,
        accent: Accent.SUCCESS,
        className:
          'hover:bg-success-foreground/70 active:bg-success-foreground hover:text-success active:text-success',
      },
      {
        invertAccent: true,
        accent: Accent.WARNING,
        className:
          'hover:bg-warning-foreground/70 active:bg-warning-foreground hover:text-warning active:text-warning',
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
      accent,
      rounded,
      shadow,
      invert,
      invertAccent,
      LeadingIcon,
      TrailingIcon,
      asChild = false,
      children,
      loading = false,
      disabled = false,
      description,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = loading || disabled;
    const hiddenWhenLoading = loading
      ? 'opacity-0 pointer-events-none select-none'
      : 'opacity-100';

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            icon,
            rounded,
            shadow,
            invert,
            invertAccent,
            accent,
            className,
          }),
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-live="polite"
        aria-label={ariaLabel}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn(
              'absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin text-inherit transition-opacity',
              loading ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden="true"
          />
        )}

        {LeadingIcon && (
          <LeadingIcon aria-hidden="true" className={cn(hiddenWhenLoading)} />
        )}
        {loading ? (
          <span className={cn(hiddenWhenLoading)}>{children}</span>
        ) : (
          children
        )}
        {TrailingIcon && (
          <TrailingIcon aria-hidden="true" className={cn(hiddenWhenLoading)} />
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
    if (!ariaLabel) {
      console.warn('ButtonGroup: aria-label is required');
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel ?? 'Button group'}
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
