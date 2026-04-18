import { useState, useEffect, useCallback } from 'react';
import type { Tag, AsyncState } from '@/types';
import { tagsRepository } from '@/backend/repositories';

export function useTags() {
  const [state, setState] = useState<AsyncState<Tag[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await tagsRepository.list();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: String(err) });
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createTag = useCallback(async (data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tag = await tagsRepository.create(data);
    setState((s) => ({ ...s, data: s.data ? [...s.data, tag] : [tag] }));
    return tag;
  }, []);

  const updateTag = useCallback(async (id: string, data: Partial<Tag>) => {
    const tag = await tagsRepository.update(id, data);
    setState((s) => ({
      ...s,
      data: s.data ? s.data.map((t) => (t.id === id ? tag : t)) : [tag],
    }));
    return tag;
  }, []);

  const deleteTag = useCallback(async (id: string) => {
    await tagsRepository.delete(id);
    setState((s) => ({ ...s, data: s.data ? s.data.filter((t) => t.id !== id) : [] }));
  }, []);

  return { ...state, reload: load, createTag, updateTag, deleteTag };
}
