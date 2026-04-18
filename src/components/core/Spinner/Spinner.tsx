import './Spinner.css';
import type { SpinnerProps } from './Spinner.types';
import { SPINNER_STYLES } from './Spinner.styles';

export function Spinner({ size = 'md', label = 'Loading...', className, ...rest }: SpinnerProps) {
  return (
    <div
      className={[SPINNER_STYLES.root, SPINNER_STYLES[size], className].filter(Boolean).join(' ')}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
}
