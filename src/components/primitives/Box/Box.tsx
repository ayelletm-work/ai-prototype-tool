import './Box.css';
import type { BoxProps } from './Box.types';
import { BOX_STYLES } from './Box.styles';
import { BOX_TOKENS } from './Box.tokens';

export function Box({
  as: Tag = 'div',
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  className,
  style,
  children,
  ...rest
}: BoxProps) {
  const computedStyle: React.CSSProperties = {
    ...(padding !== undefined && { padding: BOX_TOKENS.spaceScale(padding) }),
    ...(paddingX !== undefined && { paddingLeft: BOX_TOKENS.spaceScale(paddingX), paddingRight: BOX_TOKENS.spaceScale(paddingX) }),
    ...(paddingY !== undefined && { paddingTop: BOX_TOKENS.spaceScale(paddingY), paddingBottom: BOX_TOKENS.spaceScale(paddingY) }),
    ...(paddingTop !== undefined && { paddingTop: BOX_TOKENS.spaceScale(paddingTop) }),
    ...(paddingRight !== undefined && { paddingRight: BOX_TOKENS.spaceScale(paddingRight) }),
    ...(paddingBottom !== undefined && { paddingBottom: BOX_TOKENS.spaceScale(paddingBottom) }),
    ...(paddingLeft !== undefined && { paddingLeft: BOX_TOKENS.spaceScale(paddingLeft) }),
    ...style,
  };

  return (
    <Tag
      className={[BOX_STYLES.root, className].filter(Boolean).join(' ')}
      style={computedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
