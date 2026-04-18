import type { CoraInsight, CoraContext } from '@/types';
import { generateId, generateTimestamp } from '../contracts';
import { MOCK_INSIGHTS, MOCK_CORA_RESPONSES } from '../data/cora';

let insightStore: CoraInsight[] = [...MOCK_INSIGHTS];

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const coraRepository = {
  async getInsights(context?: Partial<CoraContext>): Promise<CoraInsight[]> {
    await delay();
    if (!context?.pageId) return [...insightStore];
    return insightStore.filter((i) => !i.context || i.context === context.pageId);
  },

  async getResponse(prompt: string, context?: Partial<CoraContext>): Promise<string> {
    await delay(300);
    const pageKey = context?.pageId ?? 'default';
    const response = MOCK_CORA_RESPONSES[pageKey] ?? MOCK_CORA_RESPONSES['default']!;
    if (prompt.toLowerCase().includes('help')) {
      return `I can help with: ${prompt.substring(0, 50)}... Based on your context: ${response}`;
    }
    return response;
  },

  async dismissInsight(id: string): Promise<void> {
    await delay(100);
    insightStore = insightStore.filter((i) => i.id !== id);
  },

  async addInsight(data: Omit<CoraInsight, 'id' | 'timestamp'>): Promise<CoraInsight> {
    await delay(100);
    const insight: CoraInsight = {
      ...data,
      id: generateId(),
      timestamp: generateTimestamp(),
    };
    insightStore = [insight, ...insightStore];
    return insight;
  },
};
