import * as React from 'react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { LucideProps } from 'lucide-react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Shadow, Size, Variant } from './component-enums';

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
    },
    defaultVariants: {
      variant: Variant.PRIMARY,
      size: Size.SM,
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display before the input */
  LeadingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  LeadingIconProps?: React.SVGProps<SVGSVGElement>;
  /** Icon to display after the input */
  TrailingIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  TrailingIconProps?: React.SVGProps<SVGSVGElement>;
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
      shadow,
      LeadingIcon,
      LeadingIconProps,
      TrailingIcon,
      TrailingIconProps,
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

    if (LeadingIcon || TrailingIcon) {
      const { className: leadingIconClassName, ...leadingIconProps } =
        LeadingIconProps || {};
      const { className: trailingIconClassName, ...trailingIconProps } =
        TrailingIconProps || {};

      return (
        <div
          className={cn(
            '[&_svg]:text-muted-foreground relative [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:-translate-y-1/2',
            className,
          )}
        >
          {LeadingIcon && (
            <LeadingIcon
              className={cn(
                'left-3',
                leadingIconProps?.onClick
                  ? 'cursor-pointer'
                  : 'pointer-events-none',
                leadingIconClassName,
              )}
              {...leadingIconProps}
            />
          )}

          <input
            id={finalInputId}
            type={type}
            className={cn(
              inputVariants({
                variant: effectiveVariant,
                size,
                shadow,
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
              className={cn(
                'right-3',
                trailingIconProps?.onClick
                  ? 'cursor-pointer'
                  : 'pointer-events-none',
                trailingIconClassName,
              )}
              {...trailingIconProps}
            />
          )}
        </div>
      );
    }

    return (
      <input
        id={finalInputId}
        type={type}
        className={cn(
          inputVariants({ variant: effectiveVariant, size, shadow, className }),
        )}
        aria-describedby={combinedAriaDescribedBy}
        aria-invalid={hasError}
        ref={ref}
        {...props}
      />
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
