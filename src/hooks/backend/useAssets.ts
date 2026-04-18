import { useState, useEffect, useCallback } from 'react';
import type { Asset, AsyncState } from '@/types';
import { assetsRepository } from '@/backend/repositories';

export function useAssets() {
  const [state, setState] = useState<AsyncState<Asset[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await assetsRepository.list();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: String(err) });
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createAsset = useCallback(async (data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => {
    const asset = await assetsRepository.create(data);
    setState((s) => ({ ...s, data: s.data ? [...s.data, asset] : [asset] }));
    return asset;
  }, []);

  const updateAsset = useCallback(async (id: string, data: Partial<Asset>) => {
    const asset = await assetsRepository.update(id, data);
    setState((s) => ({
      ...s,
      data: s.data ? s.data.map((a) => (a.id === id ? asset : a)) : [asset],
    }));
    return asset;
  }, []);

  const deleteAsset = useCallback(async (id: string) => {
    await assetsRepository.delete(id);
    setState((s) => ({ ...s, data: s.data ? s.data.filter((a) => a.id !== id) : [] }));
  }, []);

  return { ...state, reload: load, createAsset, updateAsset, deleteAsset };
}
