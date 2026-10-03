"use strict";(()=>{(()=>{if(window.__saathi_widget_initialized__)return;window.__saathi_widget_initialized__=!0;let T=document.currentScript||document.querySelector("script[data-bot]");if(!T){console.error("[Saathi] Widget script element not found.");return}let S=T.getAttribute("data-bot");if(!S){console.error("[Saathi] Missing data-bot attribute on widget script.");return}let v=T.getAttribute("data-api")||"";if(!v)try{v=T.src?new URL(T.src).origin:window.location.origin}catch{v=window.location.origin}let ce=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function K(t){if(!t||typeof t!="string")return null;let s=t.trim();return/^(https?:\/\/|mailto:|tel:)/i.test(s)?s:null}function Y(t,s,b=""){let o=K(t);if(!o){let a=document.createElement("span");return a.textContent=s,b&&(a.className=b),a}let e=document.createElement("a");return e.href=o,e.textContent=s,e.target="_blank",e.rel="noopener noreferrer",b&&(e.className=b),e}function J(t,s){t.innerHTML="";let b=s.split(`
`),o=null;for(let e of b){let a=e.trim();if(!a){o=null;continue}let d=a.match(/^[-*•]\s+(.*)$/);if(d){o||(o=document.createElement("ul"),o.className="saathi-list",t.appendChild(o));let c=document.createElement("li");X(c,d[1]),o.appendChild(c)}else{o=null;let c=document.createElement("p");c.className="saathi-p",X(c,a),t.appendChild(c)}}}function X(t,s){let b=/(\*\*[^*]+\*\*|`[^`]+`|\[\d+\])/g,o=0,e;for(;(e=b.exec(s))!==null;){e.index>o&&t.appendChild(document.createTextNode(s.slice(o,e.index)));let a=e[0];if(a.startsWith("**")&&a.endsWith("**")){let d=document.createElement("strong");d.textContent=a.slice(2,-2),t.appendChild(d)}else if(a.startsWith("`")&&a.endsWith("`")){let d=document.createElement("code");d.className="saathi-inline-code",d.textContent=a.slice(1,-1),t.appendChild(d)}else if(/^\[\d+\]$/.test(a)){let d=document.createElement("span");d.className="saathi-cite-badge",d.textContent=a,t.appendChild(d)}o=b.lastIndex}o<s.length&&t.appendChild(document.createTextNode(s.slice(o)))}let E=null,n=null,I=null,C=!1,A=!1;function pe(){let t="saathi_vid";try{let s=localStorage.getItem(t);return s||(s="v_"+Math.random().toString(36).slice(2)+Date.now().toString(36),localStorage.setItem(t,s)),s}catch{return"anon_"+Math.random().toString(36).slice(2)+Date.now().toString(36)}}let Q=pe();function V(){if(document.getElementById("saathi-bot-widget-container")||!document.body)return;let t=document.createElement("div");t.id="saathi-bot-widget-container",t.style.position="fixed",t.style.bottom="0",t.style.right="0",t.style.zIndex="2147483647",t.style.pointerEvents="none",document.body.appendChild(t);let s=t.attachShadow({mode:"open"}),b=document.createElement("style");b.textContent=`
    :host {
      --saathi-primary: #0f172a;
      --saathi-primary-dark: #020617;
      --saathi-accent: #2563eb;
      --saathi-panel-bg: #ffffff;
      --saathi-text: #0f172a;
      --saathi-text-secondary: #475569;
      --saathi-text-muted: #94a3b8;
      --saathi-border: #e2e8f0;
      --saathi-bot-bubble: #f8fafc;
      --saathi-user-bubble: #0f172a;
      --saathi-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.16), 0 0 1px 1px rgba(0, 0, 0, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }
    *, *:before, *:after { box-sizing: inherit; }

    /* Launcher / Floating Action Button */
    .saathi-fab {
      pointer-events: auto;
      position: fixed;
      bottom: max(20px, env(safe-area-inset-bottom, 20px));
      right: max(20px, env(safe-area-inset-right, 20px));
      width: 56px;
      height: 56px;
      min-width: 44px;
      min-height: 44px;
      border-radius: 50%;
      background: #ffffff;
      color: var(--saathi-primary);
      border: 1px solid var(--saathi-border);
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.18);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease;
      outline: none;
      padding: 0;
      overflow: hidden;
    }
    .saathi-fab:hover {
      transform: scale(1.06);
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.24);
    }
    .saathi-fab:active { transform: scale(0.95); }

    .saathi-fab-img {
      width: 34px;
      height: 34px;
      object-fit: contain;
      pointer-events: none;
      user-select: none;
      display: block;
      transition: transform 0.2s ease;
    }

    .saathi-fab svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: var(--saathi-primary);
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.2s ease;
    }

    /* Chat Panel */
    .saathi-panel {
      pointer-events: auto;
      position: fixed;
      bottom: calc(max(20px, env(safe-area-inset-bottom, 20px)) + 68px);
      right: max(20px, env(safe-area-inset-right, 20px));
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 580px;
      max-height: calc(100vh - 110px);
      background: var(--saathi-panel-bg);
      border: 1px solid var(--saathi-border);
      border-radius: 20px;
      box-shadow: var(--saathi-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .saathi-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Minimalist Header */
    .saathi-header {
      padding: 14px 18px;
      background: #ffffff;
      border-bottom: 1px solid var(--saathi-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .saathi-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .saathi-avatar-wrap {
      position: relative;
      width: 34px;
      height: 34px;
    }
    .saathi-header-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid var(--saathi-border);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .saathi-header-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 2px;
      display: block;
      pointer-events: none;
      user-select: none;
    }
    .saathi-online-dot {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #ffffff;
    }
    .saathi-header-title {
      font-weight: 600;
      font-size: 14px;
      color: var(--saathi-text);
      line-height: 1.2;
    }
    .saathi-header-sub {
      font-size: 11px;
      color: #10b981;
      font-weight: 500;
      margin-top: 2px;
    }
    .saathi-header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .saathi-hdr-btn {
      background: transparent;
      border: none;
      color: var(--saathi-text-muted);
      cursor: pointer;
      padding: 6px;
      min-width: 36px;
      min-height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s ease, background 0.15s ease;
    }
    .saathi-hdr-btn:hover {
      color: var(--saathi-text);
      background: #f1f5f9;
    }

    /* Message list */
    .saathi-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #fafafa;
    }

    .saathi-msg {
      max-width: 85%;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
      animation: saathiFadeIn 0.2s ease-out;
    }
    @keyframes saathiFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .saathi-msg-user {
      align-self: flex-end;
      background: var(--saathi-user-bubble);
      color: #ffffff;
      padding: 10px 14px;
      border-radius: 16px;
      border-bottom-right-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    .saathi-msg-bot {
      align-self: flex-start;
      background: var(--saathi-bot-bubble);
      color: var(--saathi-text);
      padding: 12px 14px;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      border: 1px solid var(--saathi-border);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    }

    /* Markdown inside bot bubble */
    .saathi-msg-bot p {
      margin: 0 0 8px 0;
    }
    .saathi-msg-bot p:last-child {
      margin-bottom: 0;
    }
    .saathi-msg-bot ul {
      margin: 4px 0 8px 0;
      padding-left: 18px;
    }
    .saathi-msg-bot li {
      margin-bottom: 4px;
    }
    .saathi-msg-bot li:last-child {
      margin-bottom: 0;
    }
    .saathi-inline-code {
      background: #e2e8f0;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
    }
    .saathi-cite-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      color: var(--saathi-accent);
      background: rgba(37, 99, 235, 0.1);
      padding: 1px 5px;
      border-radius: 6px;
      margin-left: 3px;
      vertical-align: baseline;
    }

    /* Typing Dots */
    .saathi-typing {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 2px;
    }
    .saathi-typing span {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: saathiBounce 1.2s infinite ease-in-out;
    }
    .saathi-typing span:nth-child(2) { animation-delay: 0.2s; }
    .saathi-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes saathiBounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }

    /* Sources */
    .saathi-sources {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .saathi-source-chip {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 10px;
      background: #e2e8f0;
      color: #334155;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .saathi-source-chip:hover {
      background: #cbd5e1;
      color: #0f172a;
    }

    /* Handoff */
    .saathi-handoff {
      margin-top: 10px;
    }
    .saathi-handoff-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 8px;
      background: var(--saathi-primary);
      color: #ffffff;
      text-decoration: none;
      transition: opacity 0.15s ease;
    }
    .saathi-handoff-link:hover { opacity: 0.9; }

    /* Feedback */
    .saathi-feedback-row {
      margin-top: 8px;
      display: flex;
      gap: 6px;
    }
    .saathi-feedback-btn {
      background: transparent;
      border: 1px solid var(--saathi-border);
      cursor: pointer;
      font-size: 11px;
      color: #64748b;
      padding: 3px 8px;
      border-radius: 6px;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .saathi-feedback-btn:hover { color: #0f172a; background: #e2e8f0; }

    /* Input Bar */
    .saathi-input-bar {
      padding: 12px 14px;
      background: #ffffff;
      border-top: 1px solid var(--saathi-border);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .saathi-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      background: #f8fafc;
      border: 1px solid var(--saathi-border);
      border-radius: 22px;
      padding: 2px 6px 2px 14px;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .saathi-input-wrap:focus-within {
      border-color: var(--saathi-primary);
      box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);
      background: #ffffff;
    }
    .saathi-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 8px 0;
      font-size: 16px; /* 16px minimum prevents automatic zoom on iOS Safari */
      outline: none;
      color: var(--saathi-text);
      font-family: inherit;
    }
    .saathi-send-btn {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      border-radius: 50%;
      background: var(--saathi-primary);
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .saathi-send-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .saathi-send-btn:not(:disabled):hover {
      transform: scale(1.05);
    }

    /* Quick Action Pills */
    .saathi-quick-bar {
      padding: 6px 14px;
      background: #ffffff;
      border-top: 1px solid var(--saathi-border);
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
    }
    .saathi-quick-pill {
      background: #f1f5f9;
      border: 1px solid var(--saathi-border);
      border-radius: 16px;
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--saathi-text);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .saathi-quick-pill:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }

    /* Inline Booking Trigger */
    .saathi-inline-book-wrap {
      margin-top: 8px;
    }
    .saathi-inline-book-btn {
      background: var(--saathi-primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: opacity 0.15s ease;
    }
    .saathi-inline-book-btn:hover {
      opacity: 0.9;
    }

    /* Booking Form Drawer */
    .saathi-booking-drawer {
      border-top: 1px solid var(--saathi-border);
      background: #ffffff;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: saathiFadeIn 0.2s ease-out;
      max-height: 320px;
      overflow-y: auto;
    }
    .saathi-booking-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--saathi-border);
    }
    .saathi-booking-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--saathi-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .saathi-booking-close {
      background: transparent;
      border: none;
      color: var(--saathi-text-muted);
      cursor: pointer;
      font-size: 14px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .saathi-booking-close:hover {
      background: #f1f5f9;
      color: var(--saathi-text);
    }
    .saathi-bf-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .saathi-bf-field {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .saathi-bf-label {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--saathi-text-muted);
    }
    .saathi-bf-input, .saathi-bf-textarea {
      border: 1px solid var(--saathi-border);
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 12px;
      background: #f8fafc;
      color: var(--saathi-text);
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .saathi-bf-input:focus, .saathi-bf-textarea:focus {
      border-color: var(--saathi-primary);
      background: #ffffff;
    }
    .saathi-bf-textarea {
      resize: none;
      height: 38px;
    }
    .saathi-bf-error {
      color: #ef4444;
      font-size: 11px;
      padding: 4px 6px;
      background: #fef2f2;
      border-radius: 4px;
      border: 1px solid #fecaca;
    }
    .saathi-bf-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 4px;
    }
    .saathi-bf-btn-cancel {
      background: #f1f5f9;
      border: 1px solid var(--saathi-border);
      color: var(--saathi-text);
      font-size: 11.5px;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
    }
    .saathi-bf-btn-submit {
      background: var(--saathi-primary);
      border: none;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 500;
      padding: 5px 14px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .saathi-bf-btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Mobile full-width bottom sheet (< 640px) */
    @media (max-width: 640px) {
      .saathi-panel {
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        width: 100% !important;
        max-width: 100vw !important;
        height: min(640px, calc(100dvh - 16px)) !important;
        max-height: 100dvh !important;
        border-radius: 20px 20px 0 0 !important;
        border-bottom: none !important;
        border-left: none !important;
        border-right: none !important;
      }
      .saathi-input-bar {
        padding-bottom: max(12px, env(safe-area-inset-bottom, 12px)) !important;
      }
      .saathi-hdr-btn {
        min-width: 44px !important;
        min-height: 44px !important;
      }
      .saathi-feedback-btn {
        min-height: 36px !important;
        padding: 6px 12px !important;
      }
    }

    /* Landscape mode on phones (short viewport height) */
    @media (max-height: 520px) {
      .saathi-panel {
        bottom: 0 !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
      }
      .saathi-header {
        padding: 8px 14px !important;
      }
      .saathi-avatar-wrap {
        width: 28px !important;
        height: 28px !important;
      }
      .saathi-messages {
        padding: 10px 14px !important;
        gap: 8px !important;
      }
      .saathi-input-bar {
        padding: 6px 12px !important;
      }
    }

    /* Accessibility: prefers-reduced-motion */
    @media (prefers-reduced-motion: reduce) {
      .saathi-panel,
      .saathi-fab,
      .saathi-msg,
      .saathi-send-btn,
      .saathi-typing span {
        animation: none !important;
        transition: none !important;
      }
    }
  `,s.appendChild(b);let o=`${v}/saathi-black-icon.svg`,e=document.createElement("div");e.className="saathi-panel",e.innerHTML=`
    <div class="saathi-header">
      <div class="saathi-header-info">
        <div class="saathi-avatar-wrap">
          <div class="saathi-header-avatar">
            <img class="saathi-header-avatar-img" src="${o}" alt="Saathi" />
          </div>
          <div class="saathi-online-dot"></div>
        </div>
        <div>
          <div class="saathi-header-title">Assistant</div>
          <div class="saathi-header-sub">Online</div>
        </div>
      </div>
      <div class="saathi-header-actions">
        <button class="saathi-hdr-btn saathi-reset-btn" aria-label="Restart Conversation" title="Restart Conversation">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <button class="saathi-hdr-btn saathi-close-btn" aria-label="Close Chat" title="Close Chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
    <div class="saathi-messages" id="saathi-messages"></div>
    <div class="saathi-quick-bar">
      <button class="saathi-quick-pill saathi-book-pill" type="button">
        \u{1F4C5} Book a meeting
      </button>
    </div>
    <div class="saathi-input-bar">
      <div class="saathi-input-wrap">
        <input type="text" class="saathi-input" placeholder="Type your message..." />
        <button class="saathi-send-btn" aria-label="Send Message">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
    <div class="saathi-booking-drawer" style="display: none;">
      <div class="saathi-booking-header">
        <span class="saathi-booking-title">\u{1F4C5} Schedule a Meeting</span>
        <button class="saathi-booking-close" aria-label="Cancel">\u2715</button>
      </div>
      <div class="saathi-bf-error" style="display: none;"></div>
      <div class="saathi-bf-grid">
        <div class="saathi-bf-field">
          <label class="saathi-bf-label">Name *</label>
          <input type="text" class="saathi-bf-input saathi-bf-name" placeholder="Your name" required />
        </div>
        <div class="saathi-bf-field">
          <label class="saathi-bf-label">Email *</label>
          <input type="email" class="saathi-bf-input saathi-bf-email" placeholder="name@example.com" required />
        </div>
      </div>
      <div class="saathi-bf-grid">
        <div class="saathi-bf-field">
          <label class="saathi-bf-label">Phone</label>
          <input type="tel" class="saathi-bf-input saathi-bf-phone" placeholder="Phone number" />
        </div>
        <div class="saathi-bf-field">
          <label class="saathi-bf-label">Preferred Date/Time</label>
          <input type="text" class="saathi-bf-input saathi-bf-time" placeholder="e.g. Tomorrow 3 PM" />
        </div>
      </div>
      <div class="saathi-bf-field">
        <label class="saathi-bf-label">Estimated Budget (Optional)</label>
        <input type="text" class="saathi-bf-input saathi-bf-budget" placeholder="e.g. \u20B920,000 - \u20B950,000" />
      </div>
      <div class="saathi-bf-field">
        <label class="saathi-bf-label">Message / Note</label>
        <textarea class="saathi-bf-textarea saathi-bf-message" placeholder="Brief note on what you need..."></textarea>
      </div>
      <div class="saathi-bf-actions">
        <button type="button" class="saathi-bf-btn-cancel">Cancel</button>
        <button type="button" class="saathi-bf-btn-submit">Confirm Booking</button>
      </div>
    </div>
  `,s.appendChild(e);let a=document.createElement("button");a.className="saathi-fab",a.setAttribute("aria-label","Open Support Chat"),a.innerHTML=`
    <img class="saathi-fab-img" src="${o}" alt="Saathi Bot" />
  `,s.appendChild(a);let d=e.querySelector("#saathi-messages"),c=e.querySelector(".saathi-input"),L=e.querySelector(".saathi-send-btn"),he=e.querySelector(".saathi-close-btn"),fe=e.querySelector(".saathi-reset-btn"),be=e.querySelector(".saathi-header-title"),Ce=e.querySelector(".saathi-header-avatar"),Z=e.querySelector(".saathi-quick-bar"),ue=e.querySelector(".saathi-book-pill"),ee=e.querySelector(".saathi-input-bar"),te=e.querySelector(".saathi-booking-drawer"),me=e.querySelector(".saathi-booking-close"),ge=e.querySelector(".saathi-bf-btn-cancel"),M=e.querySelector(".saathi-bf-btn-submit"),z=e.querySelector(".saathi-bf-error"),q=e.querySelector(".saathi-bf-name"),O=e.querySelector(".saathi-bf-email"),ae=e.querySelector(".saathi-bf-phone"),ie=e.querySelector(".saathi-bf-time"),ne=e.querySelector(".saathi-bf-budget"),se=e.querySelector(".saathi-bf-message");function j(){Z.style.display="none",ee.style.display="none",te.style.display="flex",z.style.display="none",N(),q.focus()}function D(){te.style.display="none",Z.style.display="flex",ee.style.display="flex",c.focus()}function F(i){z.textContent=i,z.style.display="block"}async function xe(){let i=q.value.trim(),r=O.value.trim(),p=ae.value.trim(),u=ie.value.trim(),g=ne.value.trim(),P=se.value.trim();if(!i){F("Please enter your name."),q.focus();return}if(!r||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r)){F("Please enter a valid email address."),O.focus();return}z.style.display="none",M.disabled=!0,M.textContent="Submitting...";try{if(!E&&!await R())throw new Error("Session could not be established");let m=await fetch(`${v}/api/widget/${S}/booking`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({name:i,email:r,phone:p||void 0,preferredAt:u||void 0,budget:g||void 0,message:P||void 0,conversationId:I,visitorId:Q})}),x=await m.json().catch(()=>({}));if(!m.ok)throw new Error(x.error||"Failed to complete booking. Please try again.");D(),q.value="",O.value="",ae.value="",ie.value="",ne.value="",se.value="";let y=x.bookingCode||"BKG-CONFIRMED";k("bot",`Thanks! Your booking reference is **${y}** \u2014 we'll be in touch.`)}catch(m){F(m.message||"Submission failed. Please check details.")}finally{M.disabled=!1,M.textContent="Confirm Booking"}}ue.addEventListener("click",j),me.addEventListener("click",D),ge.addEventListener("click",D),M.addEventListener("click",xe);function N(){d.scrollTop=d.scrollHeight}function k(i,r){let p=document.createElement("div");if(p.className=`saathi-msg saathi-msg-${i}`,i==="user")p.textContent=r;else{let u=document.createElement("div");u.className="saathi-msg-content",r&&J(u,r),p.appendChild(u)}return d.appendChild(p),N(),p}async function R(){var i;if(E)return!0;try{let r=await fetch(`${v}/api/widget/${S}/session`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({visitorId:Q})});if(!r.ok){if(r.status===503||r.status===404)return k("bot","This assistant is temporarily unavailable."),c.disabled=!0,L.disabled=!0,!1;if(r.status===403)return k("bot","This chat widget is not authorized for this domain. Please contact the site owner."),c.disabled=!0,L.disabled=!0,!1;throw new Error(`Session failed: ${r.status}`)}let p=await r.json();return E=p.token,n=p.bot,n!=null&&n.name&&(be.textContent=n.name),(i=n==null?void 0:n.theme)!=null&&i.primary&&ce.test(n.theme.primary)&&(t.style.setProperty("--saathi-primary",n.theme.primary),t.style.setProperty("--saathi-user-bubble",n.theme.primary)),n!=null&&n.welcomeMessage&&d.children.length===0&&k("bot",n.welcomeMessage),!0}catch(r){return console.warn("[Saathi] Failed to initialize chat session:",r),k("bot","Unable to connect to support chat right now. Please try again later."),!1}}function W(){C&&(C=!1,e.classList.remove("open"),a.innerHTML=`<img class="saathi-fab-img" src="${o}" alt="Saathi Bot" />`,a.focus())}async function ye(){C=!C,C?(e.classList.add("open"),a.innerHTML='<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',await R(),c.focus()):W()}a.addEventListener("click",ye),he.addEventListener("click",W),fe.addEventListener("click",()=>{I=null,d.innerHTML="",n!=null&&n.welcomeMessage&&k("bot",n.welcomeMessage)});function oe(i){i.key==="Escape"&&C&&(i.preventDefault(),W())}e.addEventListener("keydown",oe),document.addEventListener("keydown",oe);async function re(){var U;let i=c.value.trim();if(!i||A)return;let p=/(book\s+(a\s+)?(meeting|call|demo|slot|appointment)|schedule\s+(a\s+)?(meeting|call|demo|slot|appointment)|appointment|booking|मीटिंग|बात\s+करनी|कॉल\s+(करो|चाहिए|बुक)|call\s+back)/i.test(i);if(!E&&!await R())return;c.value="",A=!0,L.disabled=!0,k("user",i);let u=k("bot",""),g=u.querySelector(".saathi-msg-content");g&&(g.innerHTML='<span class="saathi-typing"><span></span><span></span><span></span></span>');let P="";try{let m=await fetch(`${v}/api/widget/${S}/chat`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({message:i,conversationId:I})});if(!m.ok)throw new Error(`Chat error HTTP ${m.status}`);let x=(U=m.body)==null?void 0:U.getReader();if(!x)throw new Error("Response stream unavailable");let y=new TextDecoder,_="",B="message",G=null;for(;;){let{done:ve,value:ke}=await x.read();if(ve)break;_+=y.decode(ke,{stream:!0});let de=_.split(`
`);_=de.pop()||"";for(let we of de){let H=we.trim();if(H){if(H.startsWith("event: ")){B=H.slice(7).trim();continue}if(H.startsWith("data: ")){let Ee=H.slice(6),h=null;try{h=JSON.parse(Ee)}catch{continue}if(B==="meta")h.conversationId&&(I=h.conversationId),h.messageId&&(G=h.messageId);else if(B==="token")h.t&&(P+=h.t,g&&J(g,P),N());else if(B==="done"){if(Array.isArray(h.sources)&&h.sources.length>0){let f=document.createElement("div");f.className="saathi-sources";for(let l of h.sources){let w=Y(l.url,l.title||l.url,"saathi-source-chip");f.appendChild(w)}u.appendChild(f)}if(h.handoffUrl){let f=K(h.handoffUrl);if(f){let l=document.createElement("div");l.className="saathi-handoff";let w=Y(f,"Contact Support","saathi-handoff-link");l.appendChild(w),u.appendChild(l)}}if(G){let f=G,l=document.createElement("div");l.className="saathi-feedback-row";let w=document.createElement("button");w.className="saathi-feedback-btn",w.textContent="\u{1F44D}",w.onclick=()=>le(f,1,l);let $=document.createElement("button");$.className="saathi-feedback-btn",$.textContent="\u{1F44E}",$.onclick=()=>le(f,-1,l),l.appendChild(w),l.appendChild($),u.appendChild(l)}if(p){let f=document.createElement("div");f.className="saathi-inline-book-wrap";let l=document.createElement("button");l.type="button",l.className="saathi-inline-book-btn",l.innerHTML="\u{1F4C5} Book a meeting",l.onclick=()=>j(),f.appendChild(l),u.appendChild(f)}N()}else B==="error"&&g&&(g.textContent=h.error||"An error occurred while answering.")}}}}}catch(m){if(console.warn("[Saathi] Chat request failed:",m),g&&(g.textContent=(n==null?void 0:n.fallbackMessage)||"Sorry, I encountered an error. Please try again or reach out to support."),p){let x=document.createElement("div");x.className="saathi-inline-book-wrap";let y=document.createElement("button");y.type="button",y.className="saathi-inline-book-btn",y.innerHTML="\u{1F4C5} Book a meeting",y.onclick=()=>j(),x.appendChild(y),u.appendChild(x)}}finally{A=!1,L.disabled=!1,c.focus()}}async function le(i,r,p){p.textContent=r===1?"Thanks for feedback! \u{1F44D}":"Feedback recorded.";try{await fetch(`${v}/api/widget/${S}/feedback`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({messageId:i,rating:r})})}catch{}}L.addEventListener("click",re),c.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),re())})}document.readyState==="complete"?V():window.addEventListener("load",V)})();})();
