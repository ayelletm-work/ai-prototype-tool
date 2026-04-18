import { Stack } from '@/components/primitives/Stack';
import { Grid } from '@/components/primitives/Grid';
import { Surface } from '@/components/primitives/Surface';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Badge } from '@/components/core/Badge';
import { Spinner } from '@/components/core/Spinner';
import { useTags } from '@/hooks/backend/useTags';
import { useAssets } from '@/hooks/backend/useAssets';
import { useAgents } from '@/hooks/backend/useAgents';
import { useWorkspace } from '@/hooks/backend/useWorkspace';

interface StatCardProps {
  label: string;
  value: number | string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

function StatCard({ label, value, description, variant = 'default' }: StatCardProps) {
  const variantMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'danger'> = {
    default: 'default',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  };

  return (
    <Surface padding="lg" radius="lg" shadow="sm">
      <Stack direction="vertical" gap="sm">
        <Text size="sm" color="secondary">{label}</Text>
        <Stack direction="horizontal" align="center" gap="sm">
          <Heading as="h3" size="2xl" weight="bold">{value}</Heading>
          {variant !== 'default' && (
            <Badge variant={variantMap[variant]}>{variant}</Badge>
          )}
        </Stack>
        {description && <Text size="sm" color="tertiary">{description}</Text>}
      </Stack>
    </Surface>
  );
}

export function HomePage() {
  const { data: tags, loading: loadingTags } = useTags();
  const { data: assets, loading: loadingAssets } = useAssets();
  const { data: agents, loading: loadingAgents } = useAgents();
  const { data: workspaceItems, loading: loadingWorkspace } = useWorkspace();

  const isLoading = loadingTags || loadingAssets || loadingAgents || loadingWorkspace;

  const runningServices = workspaceItems?.filter((w) => w.status === 'running').length ?? 0;
  const errorServices = workspaceItems?.filter((w) => w.status === 'error').length ?? 0;
  const activeAgents = agents?.filter((a) => a.status === 'active').length ?? 0;

  return (
    <div style={{ padding: 'var(--space-6)', height: '100%', overflowY: 'auto' }}>
      <Stack direction="vertical" gap="xl">
        <Stack direction="vertical" gap="xs">
          <Heading as="h1" size="2xl" weight="semibold">Welcome back</Heading>
          <Text size="lg" color="secondary">Here's what's happening in your workspace.</Text>
        </Stack>

        {isLoading ? (
          <Stack direction="horizontal" justify="center" style={{ padding: 'var(--space-12)' }}>
            <Spinner size="lg" />
          </Stack>
        ) : (
          <Grid columns={4} gap="md">
            <StatCard
              label="Tags"
              value={tags?.length ?? 0}
              description="Total tags in system"
            />
            <StatCard
              label="Assets"
              value={assets?.length ?? 0}
              description="Files and resources"
            />
            <StatCard
              label="Services Running"
              value={runningServices}
              description={errorServices > 0 ? `${errorServices} with errors` : 'All healthy'}
              variant={errorServices > 0 ? 'warning' : 'success'}
            />
            <StatCard
              label="Active Agents"
              value={activeAgents}
              description={`of ${agents?.length ?? 0} total`}
            />
          </Grid>
        )}

        <Grid columns={2} gap="md">
          <Surface padding="lg" radius="lg" border>
            <Stack direction="vertical" gap="md">
              <Heading as="h2" size="md" weight="semibold">Quick Actions</Heading>
              <Stack direction="vertical" gap="sm">
                {[
                  { label: 'Create a new tag', path: '/manage/tags' },
                  { label: 'Upload an asset', path: '/manage/assets' },
                  { label: 'View workspace runtime', path: '/workspace/runtime' },
                  { label: 'Check agent status', path: '/agents/overview' },
                ].map((action) => (
                  <a
                    key={action.path}
                    href={action.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-link)',
                      fontSize: 'var(--font-size-base)',
                      textDecoration: 'none',
                      transition: 'background-color var(--transition-base)',
                    }}
                  >
                    → {action.label}
                  </a>
                ))}
              </Stack>
            </Stack>
          </Surface>

          <Surface padding="lg" radius="lg" border>
            <Stack direction="vertical" gap="md">
              <Heading as="h2" size="md" weight="semibold">System Status</Heading>
              <Stack direction="vertical" gap="sm">
                {workspaceItems?.slice(0, 5).map((item) => (
                  <Stack key={item.id} direction="horizontal" justify="between" align="center">
                    <Text size="sm">{item.name}</Text>
                    <Badge
                      variant={
                        item.status === 'running' ? 'success' :
                        item.status === 'error' ? 'danger' :
                        item.status === 'pending' ? 'warning' : 'default'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Surface>
        </Grid>
      </Stack>
    </div>
  );
}
