import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ShieldCaptcha Contact Form Integration Tests', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('should verify public/captcha.js is present and contains ShieldCaptcha mount API', () => {
    const captchaScriptPath = path.join(rootDir, 'public', 'captcha.js');
    expect(fs.existsSync(captchaScriptPath)).toBe(true);

    const scriptContent = fs.readFileSync(captchaScriptPath, 'utf8');
    expect(scriptContent).toContain('global.ShieldCaptcha = { mount, version:');
    expect(scriptContent).toContain('function mount(');
    expect(scriptContent).toContain('SHA-256');
  });

  it('should verify public/logo.png is available for captcha widget badge', () => {
    const logoPath = path.join(rootDir, 'public', 'logo.png');
    expect(fs.existsSync(logoPath)).toBe(true);
  });

  it('should verify ShieldCaptchaWidget component has dark mode adapter, telemetry, and audio feedback', () => {
    const widgetPath = path.join(rootDir, 'components', 'ShieldCaptchaWidget.tsx');
    expect(fs.existsSync(widgetPath)).toBe(true);

    const widgetContent = fs.readFileSync(widgetPath, 'utf8');
    expect(widgetContent).toContain('export const ShieldCaptchaWidget');
    expect(widgetContent).toContain('window.ShieldCaptcha.mount');
    expect(widgetContent).toContain('playSuccessChime');
    expect(widgetContent).toContain('showTelemetry');
    expect(widgetContent).toContain('dark .sc-view-checkbox');
    expect(widgetContent).toContain('Zero-Cookie Proof-of-Work');
    expect(widgetContent).toContain('onVerify');
    expect(widgetContent).toContain('onReset');
  });

  it('should verify Contact.tsx imports and attaches ShieldCaptchaWidget with validation gating & smooth scroll', () => {
    const contactPath = path.join(rootDir, 'pages', 'Contact.tsx');
    expect(fs.existsSync(contactPath)).toBe(true);

    const contactContent = fs.readFileSync(contactPath, 'utf8');
    expect(contactContent).toContain("import ShieldCaptchaWidget from '../components/ShieldCaptchaWidget'");
    expect(contactContent).toContain('<ShieldCaptchaWidget');
    expect(contactContent).toContain('if (!captchaToken)');
    expect(contactContent).toContain('setCaptchaError(true)');
    expect(contactContent).toContain('scrollIntoView');
    expect(contactContent).toContain('ShieldCaptcha Verified');
  });
});
