import { SVGProps, memo } from 'react';

type IconProps = {
  size?: number;
  color?: string;
} & Omit<SVGProps<SVGSVGElement>, 'dangerouslySetInnerHTML' | 'children'>;

/**
 * @author Paco Coursey
 * @modified
 * @link https://paco.me/writing/svg-caching-with-use
 */
const withIcon = (iconSvg: string, viewBoxSize = 24) => {
  const Icon = ({ size = 20, color = 'currentColor', ...rest }: IconProps) => (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      style={{ color }}
      stroke="currentColor"
      dangerouslySetInnerHTML={{ __html: iconSvg }}
      {...rest}
    />
  );

  return memo(Icon);
};

export default withIcon;
