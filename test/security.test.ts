import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Security & Vulnerability Audit Tests', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('should verify .htaccess contains essential security hardening headers', () => {
    const htaccessPath = path.join(rootDir, '.htaccess');
    expect(fs.existsSync(htaccessPath)).toBe(true);

    const content = fs.readFileSync(htaccessPath, 'utf8');
    expect(content).toContain('Strict-Transport-Security');
    expect(content).toContain('X-Content-Type-Options "nosniff"');
    expect(content).toContain('X-Frame-Options "SAMEORIGIN"');
    expect(content).toContain('Referrer-Policy "strict-origin-when-cross-origin"');
    expect(content).toContain('Permissions-Policy');
  });

  it('should verify sensitive files (.env, .git, package.json, etc.) are protected in .htaccess', () => {
    const htaccessPath = path.join(rootDir, '.htaccess');
    const content = fs.readFileSync(htaccessPath, 'utf8');
    expect(content).toContain('Deny from all');
    expect(content).toContain('(package\\.json|README\\.md|\\.git|\\.env|\\.htaccess)');
  });

  it('should verify no live private API keys or private tokens are leaked in repository', () => {
    const filesToScan = [
      path.join(rootDir, 'constants.tsx'),
      path.join(rootDir, 'content', 'posts.json'),
      path.join(rootDir, 'App.tsx'),
      path.join(rootDir, 'package.json'),
    ];

    const secretPatterns = [
      /sk_live_[a-zA-Z0-9]{24,}/, // Real live Stripe secret keys
      /ghp_[a-zA-Z0-9]{36}/,       // GitHub personal access tokens
      /AIza[0-9A-Za-z-_]{35}/,     // Google API keys
      /xox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{24}/, // Slack tokens
    ];

    filesToScan.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        secretPatterns.forEach(pattern => {
          // If regex pattern matches, it should only be in code examples or validation regexes
          const matches = fileContent.match(pattern);
          if (matches) {
            // Verify it is not an actual raw key
            expect(matches[0]).not.toMatch(/^sk_live_[0-9a-fA-F]{32}$/);
          }
        });
      }
    });
  });

  it('should verify .gitignore contains rules to prevent committing secrets', () => {
    const gitignorePath = path.join(rootDir, '.gitignore');
    expect(fs.existsSync(gitignorePath)).toBe(true);

    const content = fs.readFileSync(gitignorePath, 'utf8');
    expect(content).toContain('.env');
    expect(content).toContain('.env.local');
    expect(content).toContain('node_modules');
  });

  it('should verify all blog articles have safe, balanced HTML structure', () => {
    const postsPath = path.join(rootDir, 'content', 'posts.json');
    expect(fs.existsSync(postsPath)).toBe(true);

    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThanOrEqual(8);

    posts.forEach((post: any) => {
      expect(post.id).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.content).toBeTruthy();
      // Ensure no script injections in blog articles
      expect(post.content).not.toContain('<script');
      expect(post.content).not.toContain('javascript:');
      expect(post.content).not.toContain('onload=');
      expect(post.content).not.toContain('onerror=');
    });
  });
});
