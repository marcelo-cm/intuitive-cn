import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import { COLORS } from '../_constants/colors-constants';

const ColorSquare = ({ color }: { color: string }) => {
  const cssVariableName = color.replace('bg-', '');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn('border-border size-5 border', color)} />
      </TooltipTrigger>
      <TooltipContent>{cssVariableName}</TooltipContent>
    </Tooltip>
  );
};

const Colors = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-center text-sm">Light</p>
        <div className="bg-muted grid grid-flow-col grid-cols-11 grid-rows-2 gap-2 p-4">
          {Object.entries(COLORS).map(([key, value]) => (
            <ColorSquare key={key} color={value} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-center text-sm">Dark</p>
        <div className="dark bg-muted grid grid-flow-col grid-cols-11 grid-rows-2 gap-2 p-4">
          {Object.entries(COLORS).map(([key, value]) => (
            <ColorSquare key={key} color={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colors;
