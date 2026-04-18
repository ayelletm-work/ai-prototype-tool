import { Stack } from '@/components/primitives/Stack';
import { Grid } from '@/components/primitives/Grid';
import { Surface } from '@/components/primitives/Surface';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Badge } from '@/components/core/Badge';
import { Spinner } from '@/components/core/Spinner';
import { useWorkspace } from '@/hooks/backend/useWorkspace';

interface MetricBarProps {
  label: string;
  value: number;
  color: string;
}

function MetricBar({ label, value, color }: MetricBarProps) {
  return (
    <Stack direction="vertical" gap="xs">
      <Stack direction="horizontal" justify="between">
        <Text size="sm" color="secondary">{label}</Text>
        <Text size="sm" weight="medium">{value}%</Text>
      </Stack>
      <div
        style={{
          height: 6,
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-muted)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            backgroundColor: color,
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-slow)',
          }}
        />
      </div>
    </Stack>
  );
}

export function RuntimePage() {
  const { data: items, loading } = useWorkspace();
  const runningItems = items?.filter((i) => i.status === 'running') ?? [];

  return (
    <div style={{ padding: 'var(--space-6)', height: '100%', overflowY: 'auto' }}>
      <Stack direction="vertical" gap="xl">
        <Stack direction="vertical" gap="xs">
          <Heading as="h1" size="2xl" weight="semibold">Runtime</Heading>
          <Text size="lg" color="secondary">Live metrics for running services</Text>
        </Stack>

        {loading ? (
          <Stack direction="horizontal" justify="center" style={{ padding: 'var(--space-12)' }}>
            <Spinner size="lg" />
          </Stack>
        ) : runningItems.length === 0 ? (
          <Text color="tertiary" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            No services currently running
          </Text>
        ) : (
          <Grid columns={2} gap="md">
            {runningItems.map((item) => (
              <Surface key={item.id} padding="lg" radius="lg" shadow="sm">
                <Stack direction="vertical" gap="md">
                  <Stack direction="horizontal" justify="between" align="center">
                    <Heading as="h3" size="md" weight="semibold">{item.name}</Heading>
                    <Badge variant="success" size="sm">running</Badge>
                  </Stack>
                  {item.description && (
                    <Text size="sm" color="secondary">{item.description}</Text>
                  )}
                  {item.metrics ? (
                    <Stack direction="vertical" gap="sm">
                      <MetricBar label="CPU" value={item.metrics.cpu} color="var(--accent-primary)" />
                      <MetricBar
                        label="Memory"
                        value={item.metrics.memory}
                        color={
                          item.metrics.memory > 80
                            ? 'var(--accent-danger)'
                            : item.metrics.memory > 60
                              ? 'var(--accent-warning)'
                              : 'var(--accent-success)'
                        }
                      />
                      <Stack direction="horizontal" justify="between" style={{ paddingTop: 'var(--space-1)' }}>
                        <Text size="xs" color="tertiary">Requests</Text>
                        <Text size="sm" weight="semibold">
                          {item.metrics.requests.toLocaleString()}
                        </Text>
                      </Stack>
                    </Stack>
                  ) : (
                    <Text size="sm" color="tertiary">No metrics available</Text>
                  )}
                </Stack>
              </Surface>
            ))}
          </Grid>
        )}
      </Stack>
    </div>
  );
}
