import { useId } from 'react';
import './Select.css';
import type { SelectProps } from './Select.types';
import { SELECT_STYLES } from './Select.styles';

export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  fullWidth = false,
  id,
  className,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={[SELECT_STYLES.root, fullWidth ? SELECT_STYLES.fullWidth : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={selectId} className={SELECT_STYLES.label}>
          {label}
        </label>
      )}
      <div className={SELECT_STYLES.wrapper}>
        <select
          id={selectId}
          className={[SELECT_STYLES.select, error ? SELECT_STYLES.selectError : ''].filter(Boolean).join(' ')}
          aria-invalid={!!error}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={SELECT_STYLES.icon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {error && <span className={SELECT_STYLES.error} role="alert">{error}</span>}
      {hint && !error && <span className={SELECT_STYLES.hint}>{hint}</span>}
    </div>
  );
}
