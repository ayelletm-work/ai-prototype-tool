import { useState, useEffect, useCallback } from 'react';
import type { AgentEntity, AsyncState } from '@/types';
import { agentsRepository } from '@/backend/repositories';

export function useAgents() {
  const [state, setState] = useState<AsyncState<AgentEntity[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await agentsRepository.list();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: String(err) });
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return { ...state, reload: load };
}
