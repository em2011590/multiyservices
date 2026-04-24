'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hello! I am your AI Developer Assistant. How can I help you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputVal.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: inputVal }];
    setMessages(newMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode: 'chat' })
      });
      const data = await res.json();
      
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass rounded-xl border border-pink-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />
      
      <div className="px-6 py-4 border-b border-white/10 bg-black/20 flex items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500/20 border border-pink-500/50 text-pink-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">AI Assistant</h2>
          <p className="text-xs text-pink-300">Powered by DevSphere Models</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-1 ${
              m.role === 'assistant' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/10 text-gray-300'
            }`}>
              {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
              m.role === 'assistant' ? 'bg-white/5 text-gray-200 border border-white/10' : 'bg-pink-600 text-white'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-1 bg-pink-500/20 text-pink-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-white/5 text-gray-200 border border-white/10 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-black/40 border-t border-white/10 z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question or request code analysis..."
            className="w-full bg-black/40 border border-white/10 focus:border-pink-500/50 rounded-xl py-3 pl-4 pr-12 text-white outline-none transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputVal.trim()}
            className="absolute right-2 p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
