import type { CoraInsight } from '@/types';

export const MOCK_INSIGHTS: CoraInsight[] = [
  {
    id: 'insight-1',
    type: 'suggestion',
    title: 'Optimize token usage',
    content: 'I noticed 3 components using hardcoded hex values instead of design tokens. This can cause inconsistencies when switching themes.',
    context: 'manage/tags',
    actions: [
      { id: 'a1', label: 'View components', action: 'navigate:/manage/assets', variant: 'primary' },
      { id: 'a2', label: 'Dismiss', action: 'dismiss', variant: 'secondary' },
    ],
    timestamp: '2024-03-15T10:00:00Z',
  },
  {
    id: 'insight-2',
    type: 'warning',
    title: 'Cache layer error detected',
    content: 'The Cache Layer workspace item has been in error state for 15 minutes. This may be affecting API response times.',
    context: 'workspace',
    actions: [
      { id: 'a3', label: 'View details', action: 'navigate:/workspace/runtime', variant: 'primary' },
      { id: 'a4', label: 'Restart service', action: 'restart:ws-5', variant: 'danger' },
    ],
    timestamp: '2024-03-15T09:45:00Z',
  },
  {
    id: 'insight-3',
    type: 'info',
    title: 'New pattern detected',
    content: 'The Pattern Explorer agent identified a recurring button-group pattern used in 8 different prototypes. Consider formalizing it as a component.',
    context: 'agents',
    actions: [
      { id: 'a5', label: 'Create component', action: 'create:component', variant: 'primary' },
    ],
    timestamp: '2024-03-15T09:30:00Z',
  },
  {
    id: 'insight-4',
    type: 'action',
    title: 'Prototype validation complete',
    content: 'The Design Validator finished analyzing 12 components. 10 passed, 2 have minor token violations.',
    context: 'manage',
    actions: [
      { id: 'a6', label: 'View report', action: 'navigate:/manage/assets', variant: 'primary' },
    ],
    timestamp: '2024-03-15T08:30:00Z',
  },
];

export const MOCK_CORA_RESPONSES: Record<string, string> = {
  default: "I'm Cora, your AI design and development assistant. I can help you build prototypes, validate designs, and explore patterns across your workspace.",
  tags: "I see you're working with tags. You have 8 tags total, with 'ai-generated' being the most used (89 usages). Consider creating a tag hierarchy for better organization.",
  assets: "Your asset library has 7 items. 1 is processing and 1 is archived. The most common type is code files.",
  workspace: "Your workspace has 6 services. 3 are running, 1 has an error (Cache Layer), 1 is stopped, and 1 is pending deployment.",
  agents: "You have 4 active agents. The Prototype Builder and Design Validator are performing well. The API Builder has encountered an error — check its configuration.",
};
