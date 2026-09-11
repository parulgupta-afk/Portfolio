import { describe, it, expect } from 'vitest';
import { answerPortfolioQuery } from './portfolioKnowledge';

describe('answerPortfolioQuery', () => {
  it('returns contact intent', () => {
    const a = answerPortfolioQuery('how to contact');
    expect(a.intent).toBe('CONTACT');
  });
  it('finds codeforge', () => {
    const a = answerPortfolioQuery('codeforge agent sandbox');
    expect(a.projects.some((p) => p.id === 'codeforge') || a.summary.toLowerCase().includes('code')).toBeTruthy();
  });
  it('does not invent empty', () => {
    const a = answerPortfolioQuery('');
    expect(a.intent).toBe('EMPTY');
  });
});
