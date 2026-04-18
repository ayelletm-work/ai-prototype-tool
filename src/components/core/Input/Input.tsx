import { useId } from 'react';
import './Input.css';
import type { InputProps } from './Input.types';
import { INPUT_STYLES } from './Input.styles';

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = false,
  id,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const inputClasses = [
    INPUT_STYLES.input,
    leftIcon ? INPUT_STYLES.hasLeft : '',
    rightIcon ? INPUT_STYLES.hasRight : '',
    error ? INPUT_STYLES.inputError : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={[INPUT_STYLES.root, fullWidth ? INPUT_STYLES.fullWidth : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={INPUT_STYLES.label}>
          {label}
        </label>
      )}
      <div className={INPUT_STYLES.wrapper}>
        {leftIcon && <span className={INPUT_STYLES.leftIcon}>{leftIcon}</span>}
        <input id={inputId} className={inputClasses} aria-invalid={!!error} {...rest} />
        {rightIcon && <span className={INPUT_STYLES.rightIcon}>{rightIcon}</span>}
      </div>
      {error && <span className={INPUT_STYLES.error} role="alert">{error}</span>}
      {hint && !error && <span className={INPUT_STYLES.hint}>{hint}</span>}
    </div>
  );
}
