"use strict";(()=>{(()=>{if(window.__saathi_widget_initialized__)return;window.__saathi_widget_initialized__=!0;let z=document.currentScript||document.querySelector("script[data-bot]");if(!z){console.error("[Saathi] Widget script element not found.");return}let q=z.getAttribute("data-bot");if(!q){console.error("[Saathi] Missing data-bot attribute on widget script.");return}let E=z.getAttribute("data-api")||"";if(!E)try{E=z.src?new URL(z.src).origin:window.location.origin}catch{E=window.location.origin}let ye=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function Z(i){if(!i||typeof i!="string")return null;let r=i.trim();return/^(https?:\/\/|mailto:|tel:)/i.test(r)?r:null}function ee(i,r,n=""){let e=Z(i);if(!e){let h=document.createElement("span");return h.textContent=r,n&&(h.className=n),h}let s=document.createElement("a");return s.href=e,s.textContent=r,s.target="_blank",s.rel="noopener noreferrer",n&&(s.className=n),s}function te(i,r){i.innerHTML="";let n=r.split(`
`),e=null;for(let s of n){let h=s.trim();if(!h){e=null;continue}let l=h.match(/^[-*•]\s+(.*)$/);if(l){e||(e=document.createElement("ul"),e.className="saathi-list",i.appendChild(e));let g=document.createElement("li");ae(g,l[1]),e.appendChild(g)}else{e=null;let g=document.createElement("p");g.className="saathi-p",ae(g,h),i.appendChild(g)}}}function ae(i,r){let n=/(\*\*[^*]+\*\*|`[^`]+`|\[\d+\])/g,e=0,s;for(;(s=n.exec(r))!==null;){s.index>e&&i.appendChild(document.createTextNode(r.slice(e,s.index)));let h=s[0];if(h.startsWith("**")&&h.endsWith("**")){let l=document.createElement("strong");l.textContent=h.slice(2,-2),i.appendChild(l)}else if(h.startsWith("`")&&h.endsWith("`")){let l=document.createElement("code");l.className="saathi-inline-code",l.textContent=h.slice(1,-1),i.appendChild(l)}else if(/^\[\d+\]$/.test(h)){let l=document.createElement("span");l.className="saathi-cite-badge",l.textContent=h,i.appendChild(l)}e=n.lastIndex}e<r.length&&i.appendChild(document.createTextNode(r.slice(e)))}let T=null,d=null,O=null,C=!1,$=!1,F=!1,ie=!0,B=!1;function W(i){if(!ie)try{let r=window.AudioContext||window.webkitAudioContext;if(!r)return;let n=new r,e=n.createOscillator(),s=n.createGain();e.connect(s),s.connect(n.destination),i==="send"?(e.frequency.setValueAtTime(440,n.currentTime),e.frequency.exponentialRampToValueAtTime(880,n.currentTime+.08),s.gain.setValueAtTime(.05,n.currentTime),s.gain.linearRampToValueAtTime(.001,n.currentTime+.08),e.start(n.currentTime),e.stop(n.currentTime+.09)):(e.frequency.setValueAtTime(659.25,n.currentTime),e.frequency.setValueAtTime(880,n.currentTime+.06),s.gain.setValueAtTime(.07,n.currentTime),s.gain.linearRampToValueAtTime(.001,n.currentTime+.16),e.start(n.currentTime),e.stop(n.currentTime+.17))}catch{}}function G(i){if("speechSynthesis"in window)try{window.speechSynthesis.cancel();let r=i.replace(/\[\d+\]/g,"").replace(/[*`_#]/g,"").replace(/\n+/g," ").trim();if(!r)return;let n=new SpeechSynthesisUtterance(r);n.rate=1.05,n.pitch=1,window.speechSynthesis.speak(n)}catch{}}function ve(){let i="saathi_vid";try{let r=localStorage.getItem(i);return r||(r="v_"+Math.random().toString(36).slice(2)+Date.now().toString(36),localStorage.setItem(i,r)),r}catch{return"anon_"+Math.random().toString(36).slice(2)+Date.now().toString(36)}}let ne=ve();function se(){if(document.getElementById("saathi-bot-widget-container")||!document.body)return;let i=document.createElement("div");i.id="saathi-bot-widget-container",i.style.position="fixed",i.style.bottom="0",i.style.right="0",i.style.zIndex="2147483647",i.style.pointerEvents="none",document.body.appendChild(i);let r=i.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=`
    :host {
      --saathi-primary: #0f172a;
      --saathi-primary-dark: #020617;
      --saathi-accent: #3b82f6;
      --saathi-panel-bg: #ffffff;
      --saathi-text: #0f172a;
      --saathi-text-secondary: #475569;
      --saathi-text-muted: #64748b;
      --saathi-border: #e2e8f0;
      --saathi-border-subtle: #f1f5f9;
      --saathi-bot-bubble: #f8fafc;
      --saathi-bot-bubble-border: #e2e8f0;
      --saathi-user-bubble: #0f172a;
      --saathi-user-text: #ffffff;
      --saathi-shadow-panel: 0 25px 60px -15px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(15, 23, 42, 0.08);
      --saathi-shadow-fab: 0 10px 25px -5px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
      width: 58px;
      height: 58px;
      min-width: 48px;
      min-height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      color: #ffffff;
      border: none;
      box-shadow: var(--saathi-shadow-fab);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, filter 0.2s ease;
      outline: none;
      z-index: 10;
    }
    .saathi-fab:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.45);
      filter: brightness(1.08);
    }
    .saathi-fab:active {
      transform: scale(0.94);
    }

    .saathi-fab-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 14px;
      height: 14px;
      background: #10b981;
      border: 2.5px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    }

    .saathi-fab svg {
      width: 25px;
      height: 25px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* Chat Panel Container */
    .saathi-panel {
      pointer-events: auto;
      position: fixed;
      bottom: calc(max(20px, env(safe-area-inset-bottom, 20px)) + 70px);
      right: max(20px, env(safe-area-inset-right, 20px));
      width: 400px;
      max-width: calc(100vw - 32px);
      height: 620px;
      max-height: calc(100vh - 110px);
      background: var(--saathi-panel-bg);
      border: 1px solid var(--saathi-border);
      border-radius: 24px;
      box-shadow: var(--saathi-shadow-panel);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s ease, height 0.3s ease;
      z-index: 9;
      backdrop-filter: blur(12px);
    }
    .saathi-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .saathi-panel.expanded {
      width: 560px;
      height: 720px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 90px);
    }

    /* Mobile pull handle (shown on small devices) */
    .saathi-mobile-handle-bar {
      display: none;
      width: 100%;
      height: 14px;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      padding-top: 6px;
      cursor: pointer;
    }
    .saathi-mobile-handle-pill {
      width: 36px;
      height: 4px;
      border-radius: 4px;
      background: #cbd5e1;
    }

    /* Header Bar */
    .saathi-header {
      padding: 14px 18px;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      border-bottom: 1px solid var(--saathi-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
    }
    .saathi-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .saathi-avatar-wrap {
      position: relative;
      width: 38px;
      height: 38px;
      flex-shrink: 0;
    }
    .saathi-header-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.18);
    }
    .saathi-online-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #ffffff;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
    }
    .saathi-header-text {
      min-width: 0;
    }
    .saathi-header-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .saathi-header-title {
      font-weight: 700;
      font-size: 14.5px;
      color: var(--saathi-text);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .saathi-verified-badge {
      display: inline-flex;
      color: var(--saathi-accent);
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .saathi-header-sub {
      font-size: 11px;
      color: #059669;
      font-weight: 600;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .saathi-sub-ping {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      display: inline-block;
    }

    .saathi-header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .saathi-hdr-btn {
      background: transparent;
      border: none;
      color: var(--saathi-text-muted);
      cursor: pointer;
      padding: 6px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s ease, background 0.15s ease, transform 0.15s ease;
      outline: none;
    }
    .saathi-hdr-btn:hover {
      color: var(--saathi-text);
      background: #f1f5f9;
      transform: scale(1.05);
    }
    .saathi-hdr-btn:active {
      transform: scale(0.95);
    }
    .saathi-hdr-btn.active {
      color: var(--saathi-accent);
      background: rgba(59, 130, 246, 0.1);
    }

    /* Message list area */
    .saathi-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: #fafafa;
      scroll-behavior: smooth;
    }
    .saathi-messages::-webkit-scrollbar {
      width: 5px;
    }
    .saathi-messages::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    /* Starter prompt suggestions banner */
    .saathi-starters {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
      animation: saathiFadeIn 0.3s ease-out;
    }
    .saathi-starters-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--saathi-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .saathi-starter-chip {
      background: #ffffff;
      border: 1px solid var(--saathi-border);
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--saathi-text);
      cursor: pointer;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: all 0.18s ease;
    }
    .saathi-starter-chip:hover {
      background: #f8fafc;
      border-color: var(--saathi-accent);
      color: var(--saathi-accent);
      transform: translateX(2px);
    }
    .saathi-starter-chip svg {
      width: 14px;
      height: 14px;
      opacity: 0.6;
      flex-shrink: 0;
    }

    /* Chat message bubble */
    .saathi-msg {
      max-width: 86%;
      font-size: 13.5px;
      line-height: 1.55;
      word-break: break-word;
      animation: saathiFadeIn 0.22s ease-out;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    @keyframes saathiFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .saathi-msg-user {
      align-self: flex-end;
    }
    .saathi-msg-user .saathi-bubble {
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      color: var(--saathi-user-text);
      padding: 10px 15px;
      border-radius: 18px 18px 4px 18px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
      font-weight: 450;
    }

    .saathi-msg-bot {
      align-self: flex-start;
    }
    .saathi-msg-bot .saathi-bubble {
      background: var(--saathi-bot-bubble);
      color: var(--saathi-text);
      padding: 12px 15px;
      border-radius: 18px 18px 18px 4px;
      border: 1px solid var(--saathi-bot-bubble-border);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    /* Message Meta Timestamp */
    .saathi-msg-time {
      font-size: 10px;
      color: var(--saathi-text-muted);
      margin-top: 2px;
      align-self: flex-end;
      padding: 0 2px;
    }
    .saathi-msg-bot .saathi-msg-time {
      align-self: flex-start;
    }

    /* Message Action Bar (Copy & Voice) */
    .saathi-msg-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
      opacity: 0.85;
    }
    .saathi-msg-tool-btn {
      background: transparent;
      border: none;
      padding: 3px 6px;
      border-radius: 6px;
      color: var(--saathi-text-muted);
      cursor: pointer;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .saathi-msg-tool-btn:hover {
      background: #e2e8f0;
      color: var(--saathi-text);
    }
    .saathi-msg-tool-btn svg {
      width: 12px;
      height: 12px;
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
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #0f172a;
    }
    .saathi-cite-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: var(--saathi-accent);
      background: rgba(59, 130, 246, 0.12);
      border: 1px solid rgba(59, 130, 246, 0.25);
      padding: 1px 6px;
      border-radius: 6px;
      margin-left: 4px;
      vertical-align: baseline;
    }

    /* Typing Dots */
    .saathi-typing {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 2px;
    }
    .saathi-typing span {
      width: 6px;
      height: 6px;
      background: var(--saathi-accent);
      border-radius: 50%;
      animation: saathiBounce 1.2s infinite ease-in-out;
    }
    .saathi-typing span:nth-child(2) { animation-delay: 0.2s; }
    .saathi-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes saathiBounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1.1); opacity: 1; }
    }

    /* Sources card chips */
    .saathi-sources {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .saathi-source-chip {
      font-size: 11px;
      font-weight: 500;
      padding: 4px 9px;
      border-radius: 12px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #334155;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    .saathi-source-chip:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
      color: #0f172a;
    }

    /* Handoff Card */
    .saathi-handoff {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .saathi-handoff-text {
      font-size: 11.5px;
      color: var(--saathi-text-secondary);
    }
    .saathi-handoff-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      background: var(--saathi-primary);
      color: #ffffff;
      text-decoration: none;
      width: fit-content;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .saathi-handoff-link:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }

    /* Modern Feedback Rating Row */
    .saathi-feedback-row {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .saathi-fb-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      font-size: 11px;
      color: #64748b;
      padding: 4px 8px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .saathi-fb-btn:hover {
      color: var(--saathi-text);
      background: #f1f5f9;
      border-color: #cbd5e1;
    }
    .saathi-fb-btn svg {
      width: 12px;
      height: 12px;
    }
    .saathi-fb-feedback-done {
      font-size: 11px;
      color: #059669;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Quick Action Bar */
    .saathi-quick-bar {
      padding: 8px 14px;
      background: #ffffff;
      border-top: 1px solid var(--saathi-border);
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .saathi-quick-bar::-webkit-scrollbar {
      display: none;
    }
    .saathi-quick-pill {
      background: #f8fafc;
      border: 1px solid var(--saathi-border);
      border-radius: 18px;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--saathi-text);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }
    .saathi-quick-pill:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }
    .saathi-quick-pill svg {
      width: 13px;
      height: 13px;
      color: var(--saathi-accent);
    }

    /* Inline Booking Trigger in chat */
    .saathi-inline-book-wrap {
      margin-top: 10px;
    }
    .saathi-inline-book-btn {
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      padding: 8px 14px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .saathi-inline-book-btn:hover {
      opacity: 0.93;
      transform: translateY(-1px);
    }

    /* Input Bar */
    .saathi-input-bar {
      padding: 12px 14px;
      background: #ffffff;
      border-top: 1px solid var(--saathi-border);
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
    .saathi-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      background: #f8fafc;
      border: 1px solid var(--saathi-border);
      border-radius: 24px;
      padding: 2px 6px 2px 14px;
      transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    }
    .saathi-input-wrap:focus-within {
      border-color: var(--saathi-accent);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      background: #ffffff;
    }
    .saathi-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      font-size: 16px; /* 16px minimum prevents automatic zoom on iOS Safari */
      outline: none;
      color: var(--saathi-text);
      font-family: inherit;
    }
    .saathi-input::placeholder {
      color: #94a3b8;
      font-size: 13.5px;
    }
    .saathi-send-btn {
      width: 34px;
      height: 34px;
      min-width: 34px;
      min-height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2);
    }
    .saathi-send-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      transform: none;
    }
    .saathi-send-btn:not(:disabled):hover {
      transform: scale(1.08);
    }
    .saathi-send-btn:not(:disabled):active {
      transform: scale(0.92);
    }

    /* Booking Form Drawer */
    .saathi-booking-drawer {
      border-top: 1px solid var(--saathi-border);
      background: #ffffff;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: saathiFadeIn 0.25s ease-out;
      max-height: 360px;
      overflow-y: auto;
    }
    .saathi-booking-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--saathi-border);
    }
    .saathi-booking-title {
      font-size: 13px;
      font-weight: 700;
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
      font-size: 15px;
      padding: 4px 8px;
      border-radius: 6px;
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
      gap: 3px;
    }
    .saathi-bf-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--saathi-text-secondary);
    }
    .saathi-bf-input, .saathi-bf-textarea {
      border: 1px solid var(--saathi-border);
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 12.5px;
      background: #f8fafc;
      color: var(--saathi-text);
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    }
    .saathi-bf-input:focus, .saathi-bf-textarea:focus {
      border-color: var(--saathi-accent);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
      background: #ffffff;
    }
    .saathi-bf-textarea {
      resize: none;
      height: 44px;
    }
    .saathi-bf-error {
      color: #ef4444;
      font-size: 11.5px;
      padding: 6px 10px;
      background: #fef2f2;
      border-radius: 6px;
      border: 1px solid #fecaca;
    }
    .saathi-bf-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 4px;
    }
    .saathi-bf-btn-cancel {
      background: #f1f5f9;
      border: 1px solid var(--saathi-border);
      color: var(--saathi-text);
      font-size: 12px;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
    }
    .saathi-bf-btn-submit {
      background: linear-gradient(135deg, var(--saathi-primary) 0%, var(--saathi-accent) 100%);
      border: none;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .saathi-bf-btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
    /* RESPONSIVE DESIGN FOR MOBILE, TABLET & LAPTOP      */
    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

    /* Mobile Phones (< 640px) */
    @media (max-width: 640px) {
      .saathi-panel {
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        width: 100% !important;
        max-width: 100vw !important;
        height: min(650px, 94dvh) !important;
        max-height: 94dvh !important;
        border-radius: 24px 24px 0 0 !important;
        border-bottom: none !important;
        border-left: none !important;
        border-right: none !important;
        box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.25) !important;
      }
      .saathi-mobile-handle-bar {
        display: flex !important;
      }
      .saathi-expand-btn {
        display: none !important;
      }
      .saathi-input-bar {
        padding-bottom: max(14px, env(safe-area-inset-bottom, 14px)) !important;
      }
      .saathi-hdr-btn {
        min-width: 40px !important;
        min-height: 40px !important;
      }
      .saathi-fb-btn {
        min-height: 36px !important;
        padding: 6px 12px !important;
      }
      .saathi-fab {
        bottom: max(16px, env(safe-area-inset-bottom, 16px));
        right: max(16px, env(safe-area-inset-right, 16px));
        width: 52px;
        height: 52px;
      }
    }

    /* Landscape Mode on Phones (short height) */
    @media (max-height: 520px) {
      .saathi-panel {
        bottom: 0 !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
      }
      .saathi-mobile-handle-bar {
        display: none !important;
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
  `,r.appendChild(n);let e=document.createElement("div");e.className="saathi-panel",e.innerHTML=`
    <div class="saathi-mobile-handle-bar">
      <div class="saathi-mobile-handle-pill"></div>
    </div>
    <div class="saathi-header">
      <div class="saathi-header-info">
        <div class="saathi-avatar-wrap">
          <div class="saathi-header-avatar">S</div>
          <div class="saathi-online-dot"></div>
        </div>
        <div class="saathi-header-text">
          <div class="saathi-header-title-row">
            <span class="saathi-header-title">Assistant</span>
            <svg class="saathi-verified-badge" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="saathi-header-sub">
            <span class="saathi-sub-ping"></span>
            <span>Online \u2022 AI Assistant</span>
          </div>
        </div>
      </div>
      <div class="saathi-header-actions">
        <button class="saathi-hdr-btn saathi-speech-toggle" aria-label="Toggle Read Aloud" title="Toggle voice read aloud">
          <svg class="saathi-icon-tts-off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          <svg class="saathi-icon-tts-on" style="display:none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        </button>
        <button class="saathi-hdr-btn saathi-expand-btn" aria-label="Expand Chat" title="Expand view">
          <svg class="saathi-icon-expand" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          <svg class="saathi-icon-collapse" style="display:none;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        </button>
        <button class="saathi-hdr-btn saathi-reset-btn" aria-label="Restart Conversation" title="Restart conversation">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <button class="saathi-hdr-btn saathi-close-btn" aria-label="Close Chat" title="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <div class="saathi-messages" id="saathi-messages"></div>

    <div class="saathi-quick-bar">
      <button class="saathi-quick-pill saathi-book-pill" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>\u{1F4C5} Book a meeting</span>
      </button>
      <button class="saathi-quick-pill saathi-chip-services" type="button">
        <span>\u{1F4BC} Services</span>
      </button>
      <button class="saathi-quick-pill saathi-chip-pricing" type="button">
        <span>\u{1F4B0} Pricing</span>
      </button>
    </div>

    <div class="saathi-input-bar">
      <div class="saathi-input-wrap">
        <input type="text" class="saathi-input" placeholder="Ask anything about our services..." aria-label="Chat input" />
        <button class="saathi-send-btn" aria-label="Send Message">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>

    <div class="saathi-booking-drawer" style="display: none;">
      <div class="saathi-booking-header">
        <span class="saathi-booking-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Schedule a Meeting
        </span>
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
        <input type="text" class="saathi-bf-input saathi-bf-budget" placeholder="e.g. \u20B925,000 - \u20B950,000" />
      </div>
      <div class="saathi-bf-field">
        <label class="saathi-bf-label">Message / Project Details</label>
        <textarea class="saathi-bf-textarea saathi-bf-message" placeholder="Brief note on what you need..."></textarea>
      </div>
      <div class="saathi-bf-actions">
        <button type="button" class="saathi-bf-btn-cancel">Cancel</button>
        <button type="button" class="saathi-bf-btn-submit">Confirm Booking</button>
      </div>
    </div>
  `,r.appendChild(e);let s=document.createElement("button");s.className="saathi-fab",s.setAttribute("aria-label","Open Support Chat"),s.innerHTML=`
    <span class="saathi-fab-badge"></span>
    <svg class="saathi-fab-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  `,r.appendChild(s);let h=e.querySelector("#saathi-messages"),l=e.querySelector(".saathi-input"),g=e.querySelector(".saathi-send-btn"),we=e.querySelector(".saathi-close-btn"),ke=e.querySelector(".saathi-reset-btn"),S=e.querySelector(".saathi-expand-btn"),L=e.querySelector(".saathi-speech-toggle"),Ee=e.querySelector(".saathi-mobile-handle-bar"),Te=e.querySelector(".saathi-header-title"),Ce=e.querySelector(".saathi-header-avatar"),oe=e.querySelector(".saathi-quick-bar"),Se=e.querySelector(".saathi-book-pill"),Le=e.querySelector(".saathi-chip-services"),Me=e.querySelector(".saathi-chip-pricing"),re=e.querySelector(".saathi-input-bar"),le=e.querySelector(".saathi-booking-drawer"),Be=e.querySelector(".saathi-booking-close"),He=e.querySelector(".saathi-bf-btn-cancel"),A=e.querySelector(".saathi-bf-btn-submit"),R=e.querySelector(".saathi-bf-error"),_=e.querySelector(".saathi-bf-name"),Y=e.querySelector(".saathi-bf-email"),de=e.querySelector(".saathi-bf-phone"),ce=e.querySelector(".saathi-bf-time"),pe=e.querySelector(".saathi-bf-budget"),he=e.querySelector(".saathi-bf-message");function U(){oe.style.display="none",re.style.display="none",le.style.display="flex",R.style.display="none",I(),_.focus()}function K(){le.style.display="none",oe.style.display="flex",re.style.display="flex",l.focus()}function J(t){R.textContent=t,R.style.display="block"}async function ze(){let t=_.value.trim(),a=Y.value.trim(),c=de.value.trim(),o=ce.value.trim(),p=pe.value.trim(),x=he.value.trim();if(!t){J("Please enter your name."),_.focus();return}if(!a||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a)){J("Please enter a valid email address."),Y.focus();return}R.style.display="none",A.disabled=!0,A.textContent="Submitting...";try{if(!T&&!await X())throw new Error("Session could not be established");let m=await fetch(`${E}/api/widget/${q}/booking`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({name:t,email:a,phone:c||void 0,preferredAt:o||void 0,budget:p||void 0,message:x||void 0,conversationId:O,visitorId:ne})}),v=await m.json().catch(()=>({}));if(!m.ok)throw new Error(v.error||"Failed to complete booking. Please try again.");K(),_.value="",Y.value="",de.value="",ce.value="",pe.value="",he.value="";let w=v.bookingCode||"BKG-CONFIRMED";k("bot",`\u{1F389} Thanks **${t}**! Your meeting request has been submitted.

Booking reference: **${w}**
We will get in touch via email (${a}) shortly!`)}catch(m){J(m.message||"Submission failed. Please check details.")}finally{A.disabled=!1,A.textContent="Confirm Booking"}}Se.addEventListener("click",U),Be.addEventListener("click",K),He.addEventListener("click",K),A.addEventListener("click",ze),Le.addEventListener("click",()=>{l.value="What services and solutions do you provide?",N()}),Me.addEventListener("click",()=>{l.value="Can you share details on pricing and packages?",N()}),S.addEventListener("click",()=>{F=!F;let t=S.querySelector(".saathi-icon-expand"),a=S.querySelector(".saathi-icon-collapse");F?(e.classList.add("expanded"),S.classList.add("active"),S.setAttribute("title","Compact view"),t&&(t.style.display="none"),a&&(a.style.display="block")):(e.classList.remove("expanded"),S.classList.remove("active"),S.setAttribute("title","Expand view"),t&&(t.style.display="block"),a&&(a.style.display="none"))}),L.addEventListener("click",()=>{B=!B,ie=!B;let t=L.querySelector(".saathi-icon-tts-off"),a=L.querySelector(".saathi-icon-tts-on");B?(L.classList.add("active"),L.setAttribute("title","Mute voice read aloud"),t&&(t.style.display="none"),a&&(a.style.display="block"),W("receive")):(L.classList.remove("active"),L.setAttribute("title","Enable voice read aloud"),t&&(t.style.display="block"),a&&(a.style.display="none"),"speechSynthesis"in window&&window.speechSynthesis.cancel())}),Ee.addEventListener("click",()=>{D()});function I(){h.scrollTop=h.scrollHeight}function k(t,a){let c=document.createElement("div");c.className=`saathi-msg saathi-msg-${t}`;let o=document.createElement("div");o.className="saathi-bubble";let p=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});if(t==="user")o.textContent=a,c.appendChild(o);else{let M=document.createElement("div");M.className="saathi-msg-content",a&&te(M,a),o.appendChild(M),c.appendChild(o),a&&fe(c,a)}let x=document.createElement("span");return x.className="saathi-msg-time",x.textContent=p,c.appendChild(x),h.appendChild(c),I(),c}function fe(t,a){let c=document.createElement("div");c.className="saathi-msg-toolbar";let o=document.createElement("button");o.type="button",o.className="saathi-msg-tool-btn",o.innerHTML=`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span>Copy</span>
      `,o.onclick=async()=>{try{await navigator.clipboard.writeText(a),o.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style="color: #10b981; font-weight: 600;">Copied!</span>
          `,setTimeout(()=>{o.innerHTML=`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            `},2e3)}catch{}};let p=document.createElement("button");p.type="button",p.className="saathi-msg-tool-btn",p.innerHTML=`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span>Listen</span>
      `,p.onclick=()=>{G(a)},c.appendChild(o),c.appendChild(p),t.appendChild(c)}function ue(){let t=document.createElement("div");t.className="saathi-starters";let a=document.createElement("div");a.className="saathi-starters-label",a.textContent="\u{1F4A1} Suggested questions",t.appendChild(a);let c=["How can your AI solutions help my business?","Tell me about your web & software development services.","How do I schedule a meeting with your team?"];for(let o of c){let p=document.createElement("button");p.type="button",p.className="saathi-starter-chip",p.innerHTML=`
          <span>${o}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        `,p.onclick=()=>{t.remove(),l.value=o,N()},t.appendChild(p)}h.appendChild(t),I()}async function X(){var t;if(T)return!0;try{let a=await fetch(`${E}/api/widget/${q}/session`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({visitorId:ne})});if(!a.ok){if(a.status===503||a.status===404)return k("bot","This assistant is temporarily unavailable."),l.disabled=!0,g.disabled=!0,!1;if(a.status===403)return k("bot","This chat widget is not authorized for this domain. Please contact the site owner."),l.disabled=!0,g.disabled=!0,!1;throw new Error(`Session failed: ${a.status}`)}let c=await a.json();if(T=c.token,d=c.bot,d!=null&&d.name){Te.textContent=d.name;let o=d.name.trim().charAt(0).toUpperCase();o&&(Ce.textContent=o)}return(t=d==null?void 0:d.theme)!=null&&t.primary&&ye.test(d.theme.primary)&&(i.style.setProperty("--saathi-primary",d.theme.primary),i.style.setProperty("--saathi-user-bubble",d.theme.primary)),d!=null&&d.welcomeMessage&&h.children.length===0&&(k("bot",d.welcomeMessage),ue(),B&&G(d.welcomeMessage)),!0}catch(a){return console.warn("[Saathi] Failed to initialize chat session:",a),k("bot","Unable to connect to support chat right now. Please try again later."),!1}}function D(){C&&(C=!1,e.classList.remove("open"),s.innerHTML=`
        <span class="saathi-fab-badge"></span>
        <svg class="saathi-fab-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      `,s.focus(),"speechSynthesis"in window&&window.speechSynthesis.cancel())}async function be(){C=!C,C?(e.classList.add("open"),s.innerHTML=`
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        `,await X(),l.focus()):D()}s.addEventListener("click",be),we.addEventListener("click",D),window.addEventListener("saathi-bot:open",()=>{C||be()}),ke.addEventListener("click",()=>{O=null,h.innerHTML="",d!=null&&d.welcomeMessage&&(k("bot",d.welcomeMessage),ue())});function ge(t){t.key==="Escape"&&C&&(t.preventDefault(),D())}e.addEventListener("keydown",ge),document.addEventListener("keydown",ge);async function N(){var M;let t=l.value.trim();if(!t||$)return;let c=/(book\s+(a\s+)?(meeting|call|demo|slot|appointment)|schedule\s+(a\s+)?(meeting|call|demo|slot|appointment)|appointment|booking|मीटिंग|बात\s+करनी|कॉल\s+(करो|चाहिए|बुक)|call\s+back)/i.test(t);if(!T&&!await X())return;l.value="",$=!0,g.disabled=!0,W("send"),k("user",t);let o=k("bot",""),p=o.querySelector(".saathi-msg-content");p&&(p.innerHTML='<span class="saathi-typing"><span></span><span></span><span></span></span>');let x="";try{let m=await fetch(`${E}/api/widget/${q}/chat`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({message:t,conversationId:O})});if(!m.ok)throw new Error(`Chat error HTTP ${m.status}`);let v=(M=m.body)==null?void 0:M.getReader();if(!v)throw new Error("Response stream unavailable");let w=new TextDecoder,V="",j="message",Q=null;for(;;){let{done:qe,value:Ae}=await v.read();if(qe)break;V+=w.decode(Ae,{stream:!0});let me=V.split(`
`);V=me.pop()||"";for(let Ie of me){let P=Ie.trim();if(P){if(P.startsWith("event: ")){j=P.slice(7).trim();continue}if(P.startsWith("data: ")){let Ne=P.slice(6),u=null;try{u=JSON.parse(Ne)}catch{continue}if(j==="meta")u.conversationId&&(O=u.conversationId),u.messageId&&(Q=u.messageId);else if(j==="token")u.t&&(x+=u.t,p&&te(p,x),I());else if(j==="done"){if(W("receive"),B&&x&&G(x),fe(o,x),Array.isArray(u.sources)&&u.sources.length>0){let b=document.createElement("div");b.className="saathi-sources";for(let f of u.sources){let y=ee(f.url,f.title||f.url,"saathi-source-chip");b.appendChild(y)}o.appendChild(b)}if(u.handoffUrl){let b=Z(u.handoffUrl);if(b){let f=document.createElement("div");f.className="saathi-handoff";let y=document.createElement("div");y.className="saathi-handoff-text",y.textContent="Need personalized assistance from our team?",f.appendChild(y);let H=ee(b,"Contact Support","saathi-handoff-link");f.appendChild(H),o.appendChild(f)}}if(Q){let b=Q,f=document.createElement("div");f.className="saathi-feedback-row";let y=document.createElement("button");y.className="saathi-fb-btn",y.innerHTML=`
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    <span>Helpful</span>
                  `,y.onclick=()=>xe(b,1,f);let H=document.createElement("button");H.className="saathi-fb-btn",H.innerHTML=`
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                    <span>Not helpful</span>
                  `,H.onclick=()=>xe(b,-1,f),f.appendChild(y),f.appendChild(H),o.appendChild(f)}if(c){let b=document.createElement("div");b.className="saathi-inline-book-wrap";let f=document.createElement("button");f.type="button",f.className="saathi-inline-book-btn",f.innerHTML=`
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>Schedule a Meeting</span>
                  `,f.onclick=()=>U(),b.appendChild(f),o.appendChild(b)}I()}else j==="error"&&p&&(p.textContent=u.error||"An error occurred while answering.")}}}}}catch(m){if(console.warn("[Saathi] Chat request failed:",m),p&&(p.textContent=(d==null?void 0:d.fallbackMessage)||"Sorry, I encountered an error. Please try again or reach out to support."),c){let v=document.createElement("div");v.className="saathi-inline-book-wrap";let w=document.createElement("button");w.type="button",w.className="saathi-inline-book-btn",w.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Schedule a Meeting</span>
          `,w.onclick=()=>U(),v.appendChild(w),o.appendChild(v)}}finally{$=!1,g.disabled=!1,l.focus()}}async function xe(t,a,c){c.innerHTML=`
        <span class="saathi-fb-feedback-done">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${a===1?"Thanks for the positive feedback!":"Feedback received, thank you."}</span>
        </span>
      `;try{await fetch(`${E}/api/widget/${q}/feedback`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({messageId:t,rating:a})})}catch{}}g.addEventListener("click",N),l.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),N())})}document.readyState==="complete"?se():window.addEventListener("load",se)})();})();
