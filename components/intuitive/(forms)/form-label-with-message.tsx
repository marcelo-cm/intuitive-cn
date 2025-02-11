import { FormLabel, FormMessage, useFormField } from '@/components/ui/form';

import { cn, prettifyText } from '@/lib/utils';

export const FormLabelWithMessage = ({
  className,
  required = false,
}: {
  className?: string;
  required?: boolean;
}) => {
  const { error, name: fieldName } = useFormField();

  return (
    <div
      className={`mb-3 flex w-full flex-row items-center justify-between ${className}`}
    >
      <FormLabel className="my-0">{prettifyText(fieldName)}</FormLabel>

      {((!required && !error) || (!required && !error?.message)) && (
        <span
          className={cn(
            'text-xs font-medium leading-none text-muted-foreground',
            required && error && !error?.message && 'text-destructive',
          )}
        >
          Optional
        </span>
      )}
      <FormMessage className="text-xs !leading-[14px]" />
    </div>
  );
};
