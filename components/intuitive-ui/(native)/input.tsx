import * as React from 'react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { LucideProps } from 'lucide-react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Accent, Shadow, Size, Variant } from './component-enums';

const inputVariants = cva(
  'border-input file:text-foreground bg-background placeholder:text-muted-foreground focus-visible:ring-ring ring-offset-background flex w-full rounded-sm border px-3 py-1 text-base transition-colors duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        [Variant.PRIMARY]:
          'border-input bg-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring',
        [Variant.SECONDARY]:
          'border-secondary bg-secondary/5 file:text-secondary-foreground placeholder:text-secondary-foreground/50 focus-visible:ring-secondary',
        [Variant.ACCENT]:
          'border-accent bg-accent/5 file:text-accent-foreground placeholder:text-accent-foreground/50 focus-visible:ring-accent',
        [Variant.DESTRUCTIVE]:
          'border-destructive bg-destructive/5 file:text-destructive-foreground placeholder:text-destructive-foreground/50 focus-visible:ring-destructive',
        [Variant.SUCCESS]:
          'border-success bg-success/5 file:text-success-foreground placeholder:text-success-foreground/50 focus-visible:ring-success',
        [Variant.WARNING]:
          'border-warning bg-warning/5 file:text-warning-foreground placeholder:text-warning-foreground/50 focus-visible:ring-warning',
        [Variant.GHOST]:
          'file:text-foreground placeholder:text-muted-foreground focus-visible:ring-accent border-transparent bg-transparent',
        [Variant.OUTLINE]:
          'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring bg-white',
        [Variant.MUTED]:
          'bg-muted file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring border-transparent',
      },
      size: {
        [Size.XXXS]: 'h-6 rounded-sm px-2 text-xs',
        [Size.XXS]: 'h-7 px-2 text-xs',
        [Size.XS]: 'h-8 px-3 text-xs',
        [Size.SM]: 'h-9 px-3 text-xs',
        [Size.MD]: 'h-10 px-4 py-2',
        [Size.LG]: 'h-11 px-4',
        [Size.XL]: 'h-12 px-4',
        [Size.XXL]: 'h-13 px-4',
        [Size.XXXL]: 'h-14 px-4',
      },
      shadow: {
        true: 'shadow',
        [Shadow.SM]: 'shadow-sm',
        [Shadow.MD]: 'shadow-md',
        [Shadow.LG]: 'shadow-lg',
      },
      accent: {
        [Accent.DESTRUCTIVE]:
          'border-destructive/50 bg-destructive/5 focus-visible:ring-destructive placeholder:text-destructive-foreground/50',
        [Accent.SUCCESS]:
          'border-success/50 bg-success/5 focus-visible:ring-success placeholder:text-success-foreground/50',
        [Accent.WARNING]:
          'border-warning/50 bg-warning/5 focus-visible:ring-warning placeholder:text-warning-foreground/50',
      },
      rounded: { true: 'rounded-full' },
      invert: { true: '' },
    },
    defaultVariants: {
      variant: Variant.PRIMARY,
      size: Size.SM,
      rounded: false,
    },
    compoundVariants: [
      // Invert compounds
      {
        invert: true,
        variant: Variant.PRIMARY,
        className:
          'bg-primary text-primary-foreground border-primary placeholder:text-primary-foreground/70',
      },
      {
        invert: true,
        variant: Variant.SECONDARY,
        className:
          'bg-secondary text-secondary-foreground border-secondary placeholder:text-secondary-foreground/70',
      },
      {
        invert: true,
        variant: Variant.ACCENT,
        className:
          'bg-accent text-accent-foreground border-accent placeholder:text-accent-foreground/70',
      },
      {
        invert: true,
        variant: Variant.DESTRUCTIVE,
        className:
          'bg-destructive text-destructive-foreground border-destructive placeholder:text-destructive-foreground/70',
      },
      {
        invert: true,
        variant: Variant.SUCCESS,
        className:
          'bg-success text-success-foreground border-success placeholder:text-success-foreground/70',
      },
      {
        invert: true,
        variant: Variant.WARNING,
        className:
          'bg-warning text-warning-foreground border-warning placeholder:text-warning-foreground/70',
      },
    ],
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display before the input */
  LeadingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  /** Icon to display after the input */
  TrailingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  /** Description for the input */
  description?: string;
  /** Error message for the input */
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      accent,
      rounded,
      shadow,
      invert,
      LeadingIcon,
      TrailingIcon,
      description,
      error,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const effectiveVariant = hasError ? Variant.DESTRUCTIVE : variant;
    const inputId = React.useId();
    const finalInputId = props.id || inputId;
    const descriptionId = description
      ? `${finalInputId}-description`
      : undefined;
    const errorId = error ? `${finalInputId}-error` : undefined;

    const combinedAriaDescribedBy =
      [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div className="relative w-full">
        {LeadingIcon && (
          <LeadingIcon
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
        )}

        <input
          id={finalInputId}
          type={type}
          className={cn(
            inputVariants({
              variant: effectiveVariant,
              size,
              rounded,
              shadow,
              invert,
              accent: hasError ? Accent.DESTRUCTIVE : accent,
              className,
            }),
            LeadingIcon && 'pl-10',
            TrailingIcon && 'pr-10',
          )}
          ref={ref}
          aria-describedby={combinedAriaDescribedBy}
          aria-invalid={hasError}
          {...props}
        />

        {TrailingIcon && (
          <TrailingIcon
            className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
        )}

        {/* Description text */}
        {description && !hasError && (
          <p id={descriptionId} className="text-muted-foreground mt-1 text-xs">
            {description}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="text-destructive mt-1 text-xs"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the input group for screen readers */
  'aria-label': string;
  /** Children must be Input components */
  children: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, 'aria-label': ariaLabel, children, ...props }, ref) => {
    if (!ariaLabel) {
      console.warn('InputGroup: aria-label is required');
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel ?? 'Input group'}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
InputGroup.displayName = 'InputGroup';

export { Input, InputGroup, inputVariants };
