import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Zap, Brain, Loader2, Minimize2 } from 'lucide-react';
import { chatWithGemini } from '../lib/gemini';

const AiChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [fastMode, setFastMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithGemini(userMsg, fastMode);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I couldn't process that request." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connectivity error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[120] w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-3xl hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 group"
      >
        <Brain className="group-hover:animate-pulse" size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 left-6 z-[150] w-[90vw] sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-500 overflow-hidden ${isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'}`}>
      <div className="p-5 bg-slate-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain size={18} className="text-indigo-400" />
          <h3 className="text-[10px] font-black uppercase tracking-widest">Singh AI Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Minimize2 size={14} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-rose-400">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Modality</span>
            <button 
              onClick={() => setFastMode(!fastMode)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${fastMode ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}
            >
              {fastMode ? <Zap size={10} /> : <Brain size={10} />}
              {fastMode ? 'Flash' : 'Pro'}
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <p className="text-[10px] text-slate-400 font-black uppercase leading-relaxed tracking-widest">Technical Liaison Ready</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[12px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-3 h-3 text-indigo-600 animate-spin" />
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Processing...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="w-full pl-5 pr-12 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AiChatAssistant;