import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Sitemap Integrity & SEO Tests', () => {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');

  it('should have public/saas/sitemap.xml with both SaaS routes', () => {
    const saasSitemapPath = path.join(publicDir, 'saas', 'sitemap.xml');
    expect(fs.existsSync(saasSitemapPath)).toBe(true);

    const content = fs.readFileSync(saasSitemapPath, 'utf8');
    expect(content).toContain('https://www.codewithtushar.me/saas');
    expect(content).toContain('https://www.codewithtushar.me/saas/tasq-one');
    expect(content).toContain('https://www.codewithtushar.me/saas/saathi-bot');
    expect(content).toContain('https://www.codewithtushar.me/saas/shield-captcha');
    expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(content).toContain('<urlset');
  });

  it('should have master public/sitemap.xml with all core pages and blog posts', () => {
    const masterSitemapPath = path.join(publicDir, 'sitemap.xml');
    expect(fs.existsSync(masterSitemapPath)).toBe(true);

    const content = fs.readFileSync(masterSitemapPath, 'utf8');
    expect(content).toContain('https://www.codewithtushar.me/');
    expect(content).toContain('https://www.codewithtushar.me/services');
    expect(content).toContain('https://www.codewithtushar.me/projects');
    expect(content).toContain('https://www.codewithtushar.me/about');
    expect(content).toContain('https://www.codewithtushar.me/contact');
    expect(content).toContain('https://www.codewithtushar.me/testimonials');
    expect(content).toContain('https://www.codewithtushar.me/saas');
    expect(content).toContain('https://www.codewithtushar.me/saas/tasq-one');
    expect(content).toContain('https://www.codewithtushar.me/saas/saathi-bot');
    expect(content).toContain('https://www.codewithtushar.me/blog');
    expect(content).toContain('ai-vs-human-coding-software-development');
    expect(content).toContain('env-schema-guard-zero-dependency-config-validator');
    expect(content).toContain('retry-circuit-distributed-resilience-engine');
    expect(content).toContain('prompt-kit-js-versioned-llm-prompt-registry');
  });

  it('should have sitemap index linking to all section sitemaps', () => {
    const sitemapIndexPath = path.join(publicDir, 'sitemap-index.xml');
    expect(fs.existsSync(sitemapIndexPath)).toBe(true);

    const content = fs.readFileSync(sitemapIndexPath, 'utf8');
    expect(content).toContain('https://www.codewithtushar.me/sitemap.xml');
    expect(content).toContain('https://www.codewithtushar.me/saas/sitemap.xml');
    expect(content).toContain('https://www.codewithtushar.me/blog/sitemap.xml');
    expect(content).toContain('https://www.codewithtushar.me/services/sitemap.xml');
    expect(content).toContain('https://www.codewithtushar.me/projects/sitemap.xml');
  });

  it('should have robots.txt referencing all sitemaps and modern AI search crawlers', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, 'utf8');
    expect(content).toContain('Sitemap: https://www.codewithtushar.me/sitemap.xml');
    expect(content).toContain('Sitemap: https://www.codewithtushar.me/saas/sitemap.xml');
    expect(content).toContain('Sitemap: https://www.codewithtushar.me/projects/sitemap.xml');
    expect(content).toContain('User-agent: GPTBot');
    expect(content).toContain('User-agent: ClaudeBot');
    expect(content).toContain('User-agent: PerplexityBot');
    expect(content).toContain('User-agent: OAI-SearchBot');
    expect(content).toContain('User-agent: Meta-ExternalAgent');
  });

  it('should have llms.txt and llms-full.txt with TASQ-ONE and Saathi Bot documentation', () => {
    const llmsPath = path.join(publicDir, 'llms.txt');
    const llmsFullPath = path.join(publicDir, 'llms-full.txt');
    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    const llms = fs.readFileSync(llmsPath, 'utf8');
    expect(llms).toContain('TASQ-ONE');
    expect(llms).toContain('Saathi Bot');
    expect(llms).toContain('ShieldCaptcha');
    expect(llms).toContain('https://saathi-bot.vercel.app');
    expect(llms).toContain('https://www.codewithtushar.me/saas/saathi-bot');
    expect(llms).toContain('https://www.codewithtushar.me/saas/shield-captcha');

    const llmsFull = fs.readFileSync(llmsFullPath, 'utf8');
    expect(llmsFull).toContain('TASQ-ONE');
    expect(llmsFull).toContain('Saathi Bot');
    expect(llmsFull).toContain('Pre-LLM Confidence Gate');
    expect(llmsFull).toContain('Shadow DOM');
  });
});
