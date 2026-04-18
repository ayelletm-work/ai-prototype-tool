import './SelectionSummary.css';
import type { SelectionSummaryProps } from './SelectionSummary.types';
import { SELECTION_SUMMARY_STYLES } from './SelectionSummary.styles';

export function SelectionSummary({ selectedCount, totalCount, onClear }: SelectionSummaryProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={SELECTION_SUMMARY_STYLES.root}>
      <span>
        <span className={SELECTION_SUMMARY_STYLES.count}>{selectedCount}</span>
        <span className={SELECTION_SUMMARY_STYLES.of}> of {totalCount} selected</span>
      </span>
      <button type="button" className={SELECTION_SUMMARY_STYLES.clearBtn} onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
