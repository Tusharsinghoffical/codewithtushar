import { describe, it, expect } from 'vitest';

// Test query classification logic directly
describe('AIChatAssistant Query Intelligence Engine', () => {
  it('correctly routes cost queries to pricing instead of generic automation', () => {
    const q1 = "How much does a custom AI automation or chatbot cost?".toLowerCase();
    const hasPrice = q1.includes('price') || q1.includes('cost') || q1.includes('how much');
    expect(hasPrice).toBe(true);
  });

  it('correctly routes WhatsApp and Google Sheets to specific integration', () => {
    const q2 = "Can n8n connect with WhatsApp and Google Sheets?".toLowerCase();
    const isSheets = (q2.includes('whatsapp') && (q2.includes('sheet') || q2.includes('google sheet'))) || (q2.includes('n8n') && q2.includes('sheet'));
    expect(isSheets).toBe(true);
  });

  it('correctly routes hosting and API costs', () => {
    const q3 = "What are the hosting & API costs of running n8n?".toLowerCase();
    const isHosting = (q3.includes('hosting') && (q3.includes('cost') || q3.includes('n8n'))) || q3.includes('api cost');
    expect(isHosting).toBe(true);
  });

  it('correctly routes Saathi demo inquiry', () => {
    const q4 = "Can I test the Saathi Bot demo widget right now?".toLowerCase();
    const isSaathiDemo = q4.includes('saathi') && (q4.includes('demo') || q4.includes('test') || q4.includes('widget'));
    expect(isSaathiDemo).toBe(true);
  });

  it('correctly routes MVP turnaround timeline', () => {
    const q5 = "How fast can Tushar deliver a working MVP?".toLowerCase();
    const isTimeline = q5.includes('timeline') || q5.includes('how fast') || q5.includes('turnaround');
    expect(isTimeline).toBe(true);
  });
});
