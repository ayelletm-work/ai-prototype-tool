import { useState, useEffect, useCallback } from 'react';
import type { CoraInsight, CoraContext, AsyncState } from '@/types';
import { coraRepository } from '@/backend/repositories';

export function useCora(context?: Partial<CoraContext>) {
  const [state, setState] = useState<AsyncState<CoraInsight[]>>({
    data: null,
    loading: true,
    error: null,
  });
  const [response, setResponse] = useState<string | null>(null);
  const [responding, setResponding] = useState(false);

  const loadInsights = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await coraRepository.getInsights(context);
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: String(err) });
    }
  }, [context]);

  useEffect(() => { void loadInsights(); }, [loadInsights]);

  const ask = useCallback(async (prompt: string) => {
    setResponding(true);
    try {
      const res = await coraRepository.getResponse(prompt, context);
      setResponse(res);
    } finally {
      setResponding(false);
    }
  }, [context]);

  const dismiss = useCallback(async (id: string) => {
    await coraRepository.dismissInsight(id);
    setState((s) => ({ ...s, data: s.data ? s.data.filter((i) => i.id !== id) : [] }));
  }, []);

  return { ...state, response, responding, ask, dismiss, reload: loadInsights };
}
