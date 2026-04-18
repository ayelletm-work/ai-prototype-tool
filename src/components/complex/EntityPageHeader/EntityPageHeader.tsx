import './EntityPageHeader.css';
import type { EntityPageHeaderProps } from './EntityPageHeader.types';
import { ENTITY_PAGE_HEADER_STYLES } from './EntityPageHeader.styles';

export function EntityPageHeader({ title, subtitle, eyebrow, actions }: EntityPageHeaderProps) {
  return (
    <div className={ENTITY_PAGE_HEADER_STYLES.root}>
      <div className={ENTITY_PAGE_HEADER_STYLES.content}>
        {eyebrow && (
          <div className={ENTITY_PAGE_HEADER_STYLES.eyebrow}>{eyebrow}</div>
        )}
        <h1 className={ENTITY_PAGE_HEADER_STYLES.title}>{title}</h1>
        {subtitle && (
          <p className={ENTITY_PAGE_HEADER_STYLES.subtitle}>{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className={ENTITY_PAGE_HEADER_STYLES.actions}>{actions}</div>
      )}
    </div>
  );
}
