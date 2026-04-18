import { useState } from 'react';
import { Stack } from '@/components/primitives/Stack';
import { Surface } from '@/components/primitives/Surface';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/core/Button';
import { Input } from '@/components/core/Input';
import { Select } from '@/components/core/Select';
import { useTheme } from '@/theme/ThemeProvider';

export function PreferencesPage() {
  const { themeMode, setThemeMode } = useTheme();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: 640, height: '100%', overflowY: 'auto' }}>
      <Stack direction="vertical" gap="xl">
        <Stack direction="vertical" gap="xs">
          <Heading as="h1" size="2xl" weight="semibold">Preferences</Heading>
          <Text size="lg" color="secondary">Configure your workspace settings</Text>
        </Stack>

        <Surface padding="lg" radius="lg" border>
          <Stack direction="vertical" gap="lg">
            <Heading as="h2" size="md" weight="semibold">Appearance</Heading>
            <Divider />
            <Select
              label="Theme"
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
              fullWidth
            />
            <Select
              label="Language"
              defaultValue="en"
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
              ]}
              fullWidth
            />
          </Stack>
        </Surface>

        <Surface padding="lg" radius="lg" border>
          <Stack direction="vertical" gap="lg">
            <Heading as="h2" size="md" weight="semibold">Account</Heading>
            <Divider />
            <Input label="Display Name" defaultValue="Developer" fullWidth />
            <Input label="Email" type="email" defaultValue="dev@example.com" fullWidth />
          </Stack>
        </Surface>

        <Surface padding="lg" radius="lg" border>
          <Stack direction="vertical" gap="lg">
            <Heading as="h2" size="md" weight="semibold">Cora AI</Heading>
            <Divider />
            <Select
              label="Default Model"
              defaultValue="claude-sonnet-4-6"
              options={[
                { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 (Recommended)' },
                { value: 'claude-opus-4-7', label: 'Claude Opus 4.7' },
                { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (Fastest)' },
              ]}
              fullWidth
            />
            <Select
              label="Insight Frequency"
              defaultValue="realtime"
              options={[
                { value: 'realtime', label: 'Real-time' },
                { value: 'hourly', label: 'Hourly' },
                { value: 'manual', label: 'Manual only' },
              ]}
              fullWidth
            />
          </Stack>
        </Surface>

        <Stack direction="horizontal" justify="end" gap="sm">
          <Button variant="secondary">Reset to defaults</Button>
          <Button variant="primary" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save preferences'}
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
