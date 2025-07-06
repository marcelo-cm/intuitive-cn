import { memo } from 'react';

import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarPrimitive,
} from '@/components/ui/avatar';

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive> {
  src: string | undefined | null;
  name?: string;
}

const getInitials = (name: string | undefined): string => {
  if (!name) return 'NA';

  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const Avatar = memo(({ src, name, ...props }: AvatarProps) => {
  const initials = getInitials(name);

  return (
    <AvatarPrimitive {...props}>
      <AvatarImage
        src={src!}
        alt={`${name || 'N/A'}'s profile avatar.`}
        className="object-cover"
      />
      <AvatarFallback {...props}>{initials}</AvatarFallback>
    </AvatarPrimitive>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
