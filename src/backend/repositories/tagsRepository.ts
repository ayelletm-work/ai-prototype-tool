import type { Tag } from '@/types';
import type { Repository } from '../contracts';
import { generateId, generateTimestamp } from '../contracts';
import { MOCK_TAGS } from '../data/tags';

let store: Tag[] = [...MOCK_TAGS];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const tagsRepository: Repository<Tag> = {
  async list(filters?: Partial<Tag>): Promise<Tag[]> {
    await delay();
    if (!filters) return [...store];
    return store.filter((tag) =>
      Object.entries(filters).every(([key, value]) => tag[key as keyof Tag] === value)
    );
  },

  async getById(id: string): Promise<Tag | null> {
    await delay();
    return store.find((t) => t.id === id) ?? null;
  },

  async create(data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tag> {
    await delay();
    const now = generateTimestamp();
    const tag: Tag = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    store = [...store, tag];
    return tag;
  },

  async update(id: string, data: Partial<Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Tag> {
    await delay();
    const index = store.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Tag not found: ${id}`);
    const updated: Tag = { ...store[index]!, ...data, id, updatedAt: generateTimestamp() };
    store = store.map((t) => (t.id === id ? updated : t));
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    store = store.filter((t) => t.id !== id);
  },
};
