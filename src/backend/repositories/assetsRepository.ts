import type { Asset } from '@/types';
import type { Repository } from '../contracts';
import { generateId, generateTimestamp } from '../contracts';
import { MOCK_ASSETS } from '../data/assets';

let store: Asset[] = [...MOCK_ASSETS];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const assetsRepository: Repository<Asset> = {
  async list(filters?: Partial<Asset>): Promise<Asset[]> {
    await delay();
    if (!filters) return [...store];
    return store.filter((asset) =>
      Object.entries(filters).every(([key, value]) => asset[key as keyof Asset] === value)
    );
  },

  async getById(id: string): Promise<Asset | null> {
    await delay();
    return store.find((a) => a.id === id) ?? null;
  },

  async create(data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> {
    await delay();
    const now = generateTimestamp();
    const asset: Asset = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    store = [...store, asset];
    return asset;
  },

  async update(id: string, data: Partial<Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Asset> {
    await delay();
    const index = store.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Asset not found: ${id}`);
    const updated: Asset = { ...store[index]!, ...data, id, updatedAt: generateTimestamp() };
    store = store.map((a) => (a.id === id ? updated : a));
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    store = store.filter((a) => a.id !== id);
  },
};
