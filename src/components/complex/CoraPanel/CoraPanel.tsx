import { useState } from 'react';
import './CoraPanel.css';
import type { CoraPanelProps } from './CoraPanel.types';
import { CORA_PANEL_STYLES } from './CoraPanel.styles';
import { useCora } from '@/hooks/backend';
import { Spinner } from '@/components/core';

export function CoraPanel({ open, context }: CoraPanelProps) {
  const { data: insights, loading, dismiss, ask, response, responding } = useCora(context);
  const [prompt, setPrompt] = useState('');

  async function handleAsk() {
    if (!prompt.trim()) return;
    await ask(prompt.trim());
    setPrompt('');
  }

  const typeLabel: Record<string, string> = {
    suggestion: 'Suggestion',
    warning: 'Warning',
    info: 'Info',
    action: 'Action',
  };

  return (
    <aside className={[CORA_PANEL_STYLES.root, open ? CORA_PANEL_STYLES.open : ''].filter(Boolean).join(' ')} aria-label="Cora AI assistant">
      <div className={CORA_PANEL_STYLES.header}>
        <div className={CORA_PANEL_STYLES.headerTitle}>
          <div className={CORA_PANEL_STYLES.headerIcon}>AI</div>
          <h3>Cora</h3>
          <span className={CORA_PANEL_STYLES.headerBadge}>AI Assistant</span>
        </div>
        {context?.pageTitle && (
          <div className={CORA_PANEL_STYLES.context}>
            <span className={CORA_PANEL_STYLES.contextLabel}>{context.pageTitle}</span>
          </div>
        )}
      </div>

      <div className={CORA_PANEL_STYLES.body}>
        {loading ? (
          <div className={CORA_PANEL_STYLES.loading}><Spinner size="md" /></div>
        ) : insights && insights.length > 0 ? (
          <div>
            <div className={CORA_PANEL_STYLES.sectionTitle}>Insights</div>
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={[
                  CORA_PANEL_STYLES.insight,
                  CORA_PANEL_STYLES[`insight${insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}` as keyof typeof CORA_PANEL_STYLES] ?? '',
                ].filter(Boolean).join(' ')}
                style={{ marginBottom: 'var(--space-3)' }}
              >
                <div className={CORA_PANEL_STYLES.insightHeader}>
                  <span className={CORA_PANEL_STYLES.insightType}>{typeLabel[insight.type] ?? insight.type}</span>
                  <button
                    type="button"
                    className={CORA_PANEL_STYLES.insightDismiss}
                    onClick={() => void dismiss(insight.id)}
                    aria-label="Dismiss insight"
                  >×</button>
                </div>
                <div className={CORA_PANEL_STYLES.insightTitle}>{insight.title}</div>
                <div className={CORA_PANEL_STYLES.insightContent}>{insight.content}</div>
                {insight.actions && insight.actions.length > 0 && (
                  <div className={CORA_PANEL_STYLES.insightActions}>
                    {insight.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={[
                          CORA_PANEL_STYLES.insightActionBtn,
                          action.variant === 'primary' ? CORA_PANEL_STYLES.insightActionBtnPrimary : '',
                          action.variant === 'danger' ? CORA_PANEL_STYLES.insightActionBtnDanger : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={CORA_PANEL_STYLES.empty}>
            No insights for this page yet. Ask me something below.
          </div>
        )}

        {response && (
          <div className={CORA_PANEL_STYLES.response}>
            <div className={CORA_PANEL_STYLES.responseText}>{response}</div>
          </div>
        )}

        <div className={CORA_PANEL_STYLES.askSection}>
          <div className={CORA_PANEL_STYLES.sectionTitle}>Ask Cora</div>
          <textarea
            className={CORA_PANEL_STYLES.askInput}
            placeholder="Ask about this page, request insights, or get help..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void handleAsk();
            }}
          />
          <button
            type="button"
            className={CORA_PANEL_STYLES.askBtn}
            onClick={() => void handleAsk()}
            disabled={!prompt.trim() || responding}
          >
            {responding ? 'Thinking...' : 'Ask Cora'}
          </button>
        </div>
      </div>
    </aside>
  );
}
