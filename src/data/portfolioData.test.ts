import { describe, it, expect } from 'vitest';
import { PROJECTS_DATA, PROFILE } from './portfolioData';

describe('portfolioData integrity', () => {
  it('has profile contact fields', () => {
    expect(PROFILE.name).toBe('Parul Gupta');
    expect(PROFILE.email).toContain('@');
    expect(PROFILE.github).toMatch(/^https:\/\/github\.com\//);
    expect(PROFILE.linkedin).toMatch(/^https:\/\//);
  });

  it('includes flagship projects', () => {
    const ids = PROJECTS_DATA.map((p) => p.id);
    expect(ids).toContain('priceloop');
    expect(ids).toContain('codeforge');
    expect(ids).toContain('pulseops');
  });

  it('every project has github or empty string only', () => {
    for (const p of PROJECTS_DATA) {
      if (p.githubUrl) {
        expect(p.githubUrl).toMatch(/^https:\/\/github\.com\//);
      }
    }
  });

  it('no fake uptime metrics in project strings', () => {
    const blob = JSON.stringify(PROJECTS_DATA);
    expect(blob).not.toMatch(/99\.999%/);
  });
});
