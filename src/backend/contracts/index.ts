import type { ID } from '@/types';

export interface Repository<T> {
  list(filters?: Partial<T>): Promise<T[]>;
  getById(id: ID): Promise<T | null>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: ID, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T>;
  delete(id: ID): Promise<void>;
}

export function generateId(): ID {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateTimestamp(): string {
  return new Date().toISOString();
}
