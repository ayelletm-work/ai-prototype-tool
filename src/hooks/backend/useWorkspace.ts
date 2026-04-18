import { useState, useEffect, useCallback } from 'react';
import type { WorkspaceItem, AsyncState } from '@/types';
import { workspaceRepository } from '@/backend/repositories';

export function useWorkspace() {
  const [state, setState] = useState<AsyncState<WorkspaceItem[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await workspaceRepository.list();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: String(err) });
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return { ...state, reload: load };
}
