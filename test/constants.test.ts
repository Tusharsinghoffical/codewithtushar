import { describe, it, expect } from 'vitest';
import {
  PROJECTS, SERVICES, SAAS_PRODUCTS,
  SITE_URL, SITE_NAME, PRIMARY_DOMAIN,
  SUPPORTED_DOMAINS, getActiveDomain
} from '../constants';

describe('Constants & Data Integrity Tests', () => {
  it('should have valid site metadata', () => {
    expect(SITE_NAME).toBe('Code with Tushar');
    expect(SITE_URL).toBe('https://www.codewithtushar.me');
    expect(PRIMARY_DOMAIN).toBe('www.codewithtushar.me');
    expect(SUPPORTED_DOMAINS).toContain('www.codewithtushar.me');
    expect(getActiveDomain()).toBe('https://www.codewithtushar.me');
  });

  it('should validate all projects have required production properties', () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    PROJECTS.forEach(project => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.imageUrl).toBeTruthy();
      expect(Array.isArray(project.tags)).toBe(true);
    });
  });

  it('should validate all SaaS products have required specifications and metrics', () => {
    expect(SAAS_PRODUCTS.length).toBeGreaterThan(0);
    SAAS_PRODUCTS.forEach(product => {
      expect(product.id).toBeTruthy();
      expect(product.title).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.bannerImage).toBeTruthy();
      expect(product.demoUrl).toBeTruthy();
      expect(Array.isArray(product.metrics)).toBe(true);
      expect(product.metrics.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should validate all services have required client deliverables', () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    SERVICES.forEach(service => {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.category).toBeTruthy();
      expect(Array.isArray(service.features)).toBe(true);
    });
  });
});
