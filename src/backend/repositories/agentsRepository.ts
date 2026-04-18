import type { AgentEntity } from '@/types';
import type { Repository } from '../contracts';
import { generateId, generateTimestamp } from '../contracts';
import { MOCK_AGENTS } from '../data/agents';

let store: AgentEntity[] = [...MOCK_AGENTS];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const agentsRepository: Repository<AgentEntity> = {
  async list(filters?: Partial<AgentEntity>): Promise<AgentEntity[]> {
    await delay();
    if (!filters) return [...store];
    return store.filter((agent) =>
      Object.entries(filters).every(([key, value]) => agent[key as keyof AgentEntity] === value)
    );
  },

  async getById(id: string): Promise<AgentEntity | null> {
    await delay();
    return store.find((a) => a.id === id) ?? null;
  },

  async create(data: Omit<AgentEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<AgentEntity> {
    await delay();
    const now = generateTimestamp();
    const agent: AgentEntity = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    store = [...store, agent];
    return agent;
  },

  async update(id: string, data: Partial<Omit<AgentEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<AgentEntity> {
    await delay();
    const index = store.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Agent not found: ${id}`);
    const updated: AgentEntity = { ...store[index]!, ...data, id, updatedAt: generateTimestamp() };
    store = store.map((a) => (a.id === id ? updated : a));
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay();
    store = store.filter((a) => a.id !== id);
  },
};
