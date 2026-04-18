import type { HTMLAttributes } from 'react';

export type SpaceScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '12' | '14' | '16';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  padding?: SpaceScale;
  paddingX?: SpaceScale;
  paddingY?: SpaceScale;
  paddingTop?: SpaceScale;
  paddingRight?: SpaceScale;
  paddingBottom?: SpaceScale;
  paddingLeft?: SpaceScale;
}
