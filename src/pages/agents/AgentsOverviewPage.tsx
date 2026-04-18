import { useState, useMemo } from 'react';
import { EntityScreen } from '@/components/templates/EntityScreen';
import { DetailsPanel } from '@/components/complex/DetailsPanel';
import { Badge } from '@/components/core/Badge';
import { Button } from '@/components/core/Button';
import { useAgents } from '@/hooks/backend/useAgents';
import type { AgentEntity, TableColumn, FilterConfig, BadgeVariant } from '@/types';

const STATUS_VARIANT: Record<AgentEntity['status'], BadgeVariant> = {
  active: 'success',
  idle: 'default',
  error: 'danger',
};

const TYPE_VARIANT: Record<AgentEntity['type'], BadgeVariant> = {
  builder: 'primary',
  validator: 'info',
  explorer: 'purple',
};

const COLUMNS: TableColumn<AgentEntity>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'type',
    label: 'Type',
    width: 110,
    render: (v) => (
      <Badge variant={TYPE_VARIANT[v as AgentEntity['type']] ?? 'default'} size="sm">
        {String(v)}
      </Badge>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 90,
    render: (v) => (
      <Badge variant={STATUS_VARIANT[v as AgentEntity['status']] ?? 'default'} size="sm">
        {String(v)}
      </Badge>
    ),
  },
  {
    key: 'description',
    label: 'Description',
    render: (v) => (
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        {String(v ?? '—')}
      </span>
    ),
  },
  {
    key: 'lastRun',
    label: 'Last Run',
    sortable: true,
    width: 160,
    render: (v) => (
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        {v ? new Date(String(v)).toLocaleString() : '—'}
      </span>
    ),
  },
];

const FILTERS: FilterConfig[] = [
  { key: 'search', label: 'Search', type: 'text' },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'idle', label: 'Idle' },
      { value: 'error', label: 'Error' },
    ],
  },
  {
    key: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'builder', label: 'Builder' },
      { value: 'validator', label: 'Validator' },
      { value: 'explorer', label: 'Explorer' },
    ],
  },
];

export function AgentsOverviewPage() {
  const { data: agents, loading } = useAgents();
  const [activeAgent, setActiveAgent] = useState<AgentEntity | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    if (!agents) return [];
    const search = (filterValues['search'] ?? '').toLowerCase();
    const statusFilter = filterValues['status'] ?? '';
    const typeFilter = filterValues['type'] ?? '';
    return agents.filter(
      (a) =>
        (!search || a.name.toLowerCase().includes(search)) &&
        (!statusFilter || a.status === statusFilter) &&
        (!typeFilter || a.type === typeFilter)
    );
  }, [agents, filterValues]);

  const activeCount = agents?.filter((a) => a.status === 'active').length ?? 0;
  const errorCount = agents?.filter((a) => a.status === 'error').length ?? 0;

  const agentConfig = activeAgent?.config as Record<string, unknown> | undefined;

  const detailFields = activeAgent
    ? [
        { label: 'ID', value: activeAgent.id },
        { label: 'Type', value: <Badge variant={TYPE_VARIANT[activeAgent.type]}>{activeAgent.type}</Badge> },
        { label: 'Status', value: <Badge variant={STATUS_VARIANT[activeAgent.status]}>{activeAgent.status}</Badge> },
        { label: 'Description', value: activeAgent.description ?? '—' },
        { label: 'Last Run', value: activeAgent.lastRun ? new Date(activeAgent.lastRun).toLocaleString() : 'Never' },
        { label: 'Model', value: String(agentConfig?.['model'] ?? '—') },
        { label: 'Created', value: new Date(activeAgent.createdAt).toLocaleString() },
      ]
    : [];

  return (
    <EntityScreen<AgentEntity>
      title="Agents"
      subtitle="Manage your AI agents and automations"
      actions={<Button variant="primary" size="sm">New Agent</Button>}
      filters={FILTERS}
      filterValues={filterValues}
      onFilterChange={(k, v) => setFilterValues((prev) => ({ ...prev, [k]: v }))}
      onFilterReset={() => setFilterValues({})}
      summaryItems={[
        { label: 'active', value: activeCount, variant: 'success' },
        { label: 'errors', value: errorCount, variant: errorCount > 0 ? 'danger' : 'default' },
      ]}
      columns={COLUMNS}
      data={filteredData}
      loading={loading}
      onRowClick={(row) => setActiveAgent(row)}
      activeRowId={activeAgent?.id}
      detailsPanel={
        <DetailsPanel
          open={!!activeAgent}
          onClose={() => setActiveAgent(null)}
          title={activeAgent?.name}
          subtitle={activeAgent ? `${activeAgent.type} agent` : undefined}
          fields={detailFields}
          actions={
            <>
              <Button variant="secondary" size="sm" fullWidth>Configure</Button>
              <Button variant="primary" size="sm">Run Now</Button>
            </>
          }
        />
      }
    />
  );
}
