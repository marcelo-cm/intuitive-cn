enum Variant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  DESTRUCTIVE = 'destructive',
  SUCCESS = 'success',
  WARNING = 'warning',
  GHOST = 'ghost',
  LINK = 'link',
  OUTLINE = 'outline',
}

enum Size {
  XXXS = '3xs',
  XXS = '2xs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
  XXXL = '3xl',
}

enum Shadow {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

enum Orientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type TVariant = typeof Variant;
type TSize = typeof Size;

type TShadow = typeof Shadow;

type TOrientation = typeof Orientation;

export { Variant, Shadow, Size, Orientation };

export type { TVariant, TShadow, TSize, TOrientation };
