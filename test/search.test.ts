import { describe, it, expect } from 'vitest';
import { searchData } from '../lib/searchData';
import { search } from '../lib/search';

describe('Search Engine Smoke Tests', () => {
  it('should have indexed projects, services and SaaS products', () => {
    expect(searchData.length).toBeGreaterThan(0);
    const hasSaaS = searchData.some(item => item.type === 'saas');
    const hasProject = searchData.some(item => item.type === 'project');
    const hasService = searchData.some(item => item.type === 'service');

    expect(hasSaaS).toBe(true);
    expect(hasProject).toBe(true);
    expect(hasService).toBe(true);
  });

  it('should find TASQ-ONE in search results', () => {
    const results = search('TASQ-ONE');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('TASQ-ONE');
  });

  it('should handle empty or whitespace search queries gracefully', () => {
    const emptyResults = search('');
    expect(Array.isArray(emptyResults)).toBe(true);
    expect(emptyResults.length).toBe(0);

    const whitespaceResults = search('   ');
    expect(Array.isArray(whitespaceResults)).toBe(true);
    expect(whitespaceResults.length).toBe(0);
  });
});
