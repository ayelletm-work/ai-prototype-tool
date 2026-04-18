import './MasterDetails.css';
import type { MasterDetailsProps } from './MasterDetails.types';
import { MASTER_DETAILS_STYLES } from './MasterDetails.styles';

export function MasterDetails({ master, details, detailsOpen }: MasterDetailsProps) {
  return (
    <div className={MASTER_DETAILS_STYLES.root}>
      <div className={MASTER_DETAILS_STYLES.master}>{master}</div>
      <div
        className={[
          MASTER_DETAILS_STYLES.details,
          detailsOpen ? MASTER_DETAILS_STYLES.detailsOpen : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {details}
      </div>
    </div>
  );
}
