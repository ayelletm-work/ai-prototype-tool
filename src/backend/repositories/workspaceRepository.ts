import type { WorkspaceItem } from '@/types';
import type { Repository } from '../contracts';
import { generateId, generateTimestamp } from '../contracts';
import { MOCK_WORKSPACE_ITEMS } from '../data/workspace';

let store: WorkspaceItem[] = [...MOCK_WORKSPACE_ITEMS];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const workspaceRepository: Repository<WorkspaceItem> = {
  async list(filters?: Partial<WorkspaceItem>): Promise<WorkspaceItem[]> {
    await delay();
    if (!filters) return [...store];
    return store.filter((item) =>
      Object.entries(filters).every(([key, value]) => item[key as keyof WorkspaceItem] === value)
    );
  },

  async getById(id: string): Promise<WorkspaceItem | null> {
    await delay();
    return store.find((i) => i.id === id) ?? null;
  },

  async create(data: Omit<WorkspaceItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkspaceItem> {
    await delay();
    const now = generateTimestamp();
    const item: WorkspaceItem = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    store = [...store, item];
    return item;
  },

  async update(id: string, data: Partial<Omit<WorkspaceItem, 'id' | 'createdAt' | 'updatedAt'>>): Promise<WorkspaceItem> {
    await delay();
    const index = store.findIndex((i) => i.id === id);
    if (index === -1) throw new Error(`WorkspaceItem not found: ${id}`);
    const updated: WorkspaceItem = { ...store[index]!, ...data, id, updatedAt: generateTimestamp() };
    store = store.map((i) => (i.id === id ? updated : i));
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    store = store.filter((i) => i.id !== id);
  },
};
