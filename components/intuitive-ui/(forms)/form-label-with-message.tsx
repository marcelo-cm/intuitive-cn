import { FormLabel, FormMessage, useFormField } from '@/components/ui/form';

import { cn } from '@/lib/utils';
import { prettifyText } from '@/lib/utils/text-formatting-utils';

interface IFormLabelWithMessageProps {
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
  style?: 'optional-text' | 'required-text' | 'required-icon';
}

export const FormLabelWithMessage = ({
  className,
  required = false,
  children,
  style = 'optional-text',
}: IFormLabelWithMessageProps) => {
  const { error, name: fieldName } = useFormField();
  const labelText = children ?? prettifyText(fieldName);

  return (
    <div
      className={cn(
        'mb-3 flex w-full flex-row items-center justify-between',
        className,
      )}
    >
      <FormLabel className="my-0">{labelText}</FormLabel>
      <_FormStatus
        required={required}
        style={style}
        hasError={!!error?.message}
      />
    </div>
  );
};

interface _IFormStatusProps {
  required: boolean;
  style: 'optional-text' | 'required-text' | 'required-icon';
  hasError: boolean;
}

const _FormStatus = ({ required, style, hasError }: _IFormStatusProps) => {
  // If there's an error message, always show it
  if (hasError) {
    return <FormMessage className="text-xs leading-[14px]!" />;
  }

  // No error message, show based on style and required state
  if (style === 'optional-text' && !required) {
    return (
      <span className="text-muted-foreground-foreground text-xs leading-none font-medium">
        Optional
      </span>
    );
  }

  if (style === 'required-text' && required) {
    return (
      <span className="text-muted-foreground-foreground text-xs leading-none font-medium">
        Required
      </span>
    );
  }

  if (style === 'required-icon' && required) {
    return (
      <span className="text-destructive-foreground text-xs leading-none font-medium">
        *
      </span>
    );
  }

  return null;
};
