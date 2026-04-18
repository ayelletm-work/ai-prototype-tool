import { coraRepository } from '@/backend/repositories';
import type { CoraContext } from '@/types';

export const coraService = {
  async getPageInsights(context: Partial<CoraContext>) {
    return coraRepository.getInsights(context);
  },

  async ask(prompt: string, context?: Partial<CoraContext>) {
    return coraRepository.getResponse(prompt, context);
  },

  async dismiss(insightId: string) {
    return coraRepository.dismissInsight(insightId);
  },
};
