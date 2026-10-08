import React, { useState } from 'react';
import {
  Download, Copy, Check, Sparkles, Database, Mail, Phone,
  User, Globe, RefreshCw, Trash2, ArrowRight, FileSpreadsheet,
  FileCode, Layers, ShieldCheck, Zap
} from 'lucide-react';

interface ExtractedData {
  emails: string[];
  phones: string[];
  links: string[];
  names: string[];
}

const SAMPLE_RAW_TEXT = `Hi Team,
Here are the leads from our business conference:
1. Rahul Sharma - Lead Architect at HealthFirst Tech
Email: rahul.sharma@healthfirst.in, Contact: +91 98765 43210
Website: https://healthfirst.in | LinkedIn: https://linkedin.com/in/rahulsharma

2. Priya Patel - Marketing VP at Nexus Global
Reach her at: priya@nexusglobal.com or call +1 (555) 234-5678
Website: https://nexusglobal.com

3. Alex Johnson - CTO at CloudScale Solutions
Email: alex.j@cloudscale.io | Direct WhatsApp: +44 7911 123456
Social: https://twitter.com/alexcloudscale

4. Ananya Roy - Founder at FinEdge Capital
Email: ananya.roy@finedge.co | Mobile: 08851619647
Website: https://finedge.co`;

export const DataScraperTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedData>({
    emails: [],
    phones: [],
    links: [],
    names: [],
  });

  const extractData = (text: string) => {
    setInputText(text);
    if (!text.trim()) {
      setExtracted({ emails: [], phones: [], links: [], names: [] });
      return;
    }

    // 1. Extract Emails
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const rawEmails = text.match(emailRegex) || [];
    const uniqueEmails = Array.from(new Set(rawEmails.map(e => e.toLowerCase())));

    // 2. Extract Phones (India, US, UK, international patterns)
    const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
    const rawPhones = text.match(phoneRegex) || [];
    const uniquePhones = Array.from(
      new Set(
        rawPhones
          .map(p => p.trim())
          .filter(p => {
            const digits = p.replace(/\D/g, '');
            return digits.length >= 8 && digits.length <= 15;
          })
      )
    );

    // 3. Extract URLs & Social Links
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    const rawLinks = text.match(urlRegex) || [];
    const uniqueLinks = Array.from(new Set(rawLinks.map(l => l.replace(/[),;.]+$/, ''))));

    // 4. Extract Names / Contact Labels (Heuristic parsing)
    const nameRegex = /(?:name|contact|lead|person|mr\.|ms\.|dr\.)?:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g;
    const rawNames: string[] = [];
    let match;
    while ((match = nameRegex.exec(text)) !== null) {
      if (match[1] && !match[1].includes('HealthFirst') && !match[1].includes('LinkedIn') && match[1].length < 35) {
        rawNames.push(match[1].trim());
      }
    }
    const uniqueNames = Array.from(new Set(rawNames));

    setExtracted({
      emails: uniqueEmails,
      phones: uniquePhones,
      links: uniqueLinks,
      names: uniqueNames,
    });
  };

  const handleLoadSample = () => {
    extractData(SAMPLE_RAW_TEXT);
  };

  const handleClear = () => {
    setInputText('');
    setExtracted({ emails: [], phones: [], links: [], names: [] });
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(extracted, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const maxLen = Math.max(
      extracted.names.length,
      extracted.emails.length,
      extracted.phones.length,
      extracted.links.length,
      1
    );

    let csvContent = 'data:text/csv;charset=utf-8,Name,Email,Phone,Link\n';
    for (let i = 0; i < maxLen; i++) {
      const name = (extracted.names[i] || '').replace(/,/g, ' ');
      const email = extracted.emails[i] || '';
      const phone = extracted.phones[i] || '';
      const link = extracted.links[i] || '';
      csvContent += `"${name}","${email}","${phone}","${link}"\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `scraped_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalExtracted =
    extracted.emails.length +
    extracted.phones.length +
    extracted.links.length +
    extracted.names.length;

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <Database size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-outfit font-black text-lg sm:text-xl text-slate-950 dark:text-white">
                Live Data Scraper &amp; Lead Extractor
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Instant
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Paste any raw website HTML, text, directory or email dump to auto-extract contacts.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Load Sample</span>
          </button>
          {inputText && (
            <button
              onClick={handleClear}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
              title="Clear input"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Input Textarea */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center justify-between">
          <span>Raw Text / HTML Source</span>
          <span className="text-slate-400 font-normal">{inputText.length.toLocaleString()} / 50,000 max characters</span>
        </label>
        <textarea
          value={inputText}
          maxLength={50000}
          onChange={(e) => extractData(e.target.value)}
          placeholder="Paste raw email text, Google Maps dump, contact list, LinkedIn text, or website source here..."
          rows={5}
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-mono transition-all resize-y"
        />
      </div>

      {/* Extracted Results Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Scraped Results ({totalExtracted} items found)
            </span>
          </div>

          {totalExtracted > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJSON}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copied ? 'JSON Copied' : 'Copy JSON'}</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Category Result Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Emails */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                <Mail size={14} /> Emails
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80">
                {extracted.emails.length}
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 text-xs">
              {extracted.emails.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic py-2">No emails detected</p>
              ) : (
                extracted.emails.map((e, idx) => (
                  <p key={idx} className="font-mono text-slate-800 dark:text-slate-200 truncate select-all bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                    {e}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Phones */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                <Phone size={14} /> Phone Numbers
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80">
                {extracted.phones.length}
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 text-xs">
              {extracted.phones.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic py-2">No numbers detected</p>
              ) : (
                extracted.phones.map((p, idx) => (
                  <p key={idx} className="font-mono text-slate-800 dark:text-slate-200 truncate select-all bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                    {p}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Links & Websites */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                <Globe size={14} /> Links &amp; URLs
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80">
                {extracted.links.length}
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 text-xs">
              {extracted.links.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic py-2">No links detected</p>
              ) : (
                extracted.links.map((l, idx) => (
                  <p key={idx} className="font-mono text-slate-800 dark:text-slate-200 truncate select-all bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                    {l}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Names */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-violet-600 dark:text-violet-400">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                <User size={14} /> Detected Names
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80">
                {extracted.names.length}
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 text-xs">
              {extracted.names.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic py-2">No names detected</p>
              ) : (
                extracted.names.map((n, idx) => (
                  <p key={idx} className="text-slate-800 dark:text-slate-200 truncate bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 font-semibold">
                    {n}
                  </p>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Enterprise Custom Scraping Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50 dark:from-slate-800 dark:to-indigo-950/50 border border-indigo-200 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-outfit font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
            <Zap size={14} className="text-amber-500" />
            Need Automated Web Scraping for 10,000+ Records?
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            I build custom Python, Puppeteer &amp; n8n scrapers with proxy rotation, anti-bot bypass &amp; CRM sync.
          </p>
        </div>

        <a
          href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20build%20a%20custom%20automated%20data%20scraper%20for%20my%20business!"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-all shrink-0 shadow-md flex items-center gap-1.5 active:scale-95"
        >
          <span>Discuss on WhatsApp</span>
          <ArrowRight size={13} />
        </a>
      </div>

    </div>
  );
};

export default DataScraperTool;
