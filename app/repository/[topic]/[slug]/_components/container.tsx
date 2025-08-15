import { cn } from '@/lib/utils';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <div
      className={cn(
        'border-border bg-muted mt-0 flex flex-col items-center justify-center gap-4 rounded-sm border p-4 sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
