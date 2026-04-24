'use client';
import React, { useState } from 'react';
import { Send, Save, Trash2 } from 'lucide-react';
import CodeEditor from '@/components/ui/CodeEditor';
import StatusBadge from '@/components/ui/StatusBadge';
import toast from 'react-hot-toast';

const APIExplorer: React.FC = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('headers');

  const handleSend = async () => {
    setIsLoading(true);
    setResponse(null);
    try {
      let parsedHeaders = {};
      try {
        parsedHeaders = headers.trim() ? JSON.parse(headers) : {};
      } catch (e) {
        toast.error('Invalid JSON in headers array');
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, method, headers: parsedHeaders, body: body.trim() || undefined }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      toast.error('Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="glass py-3 px-4 rounded-xl text-white font-bold bg-black/40 border-accent-green/30 focus:outline-none w-32"
        >
          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/users"
          className="flex-1 glass py-3 px-4 rounded-xl text-white bg-black/20 border-white/10 focus:border-accent-green/50 outline-none transition-colors"
        />
        
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-accent-green text-black px-6 py-3 rounded-xl font-semibold hover:bg-accent-green/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'} <Send className="w-4 h-4" />
        </button>
        <button className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
          <Save className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden min-h-[400px]">
        {/* Request Config */}
        <div className="glass rounded-xl flex flex-col border border-white/10 overflow-hidden">
          <div className="flex bg-black/40 border-b border-white/10">
            {['headers', 'body'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 text-sm font-medium uppercase tracking-wider ${activeTab === tab ? 'text-accent-green border-b-2 border-accent-green bg-white/5' : 'text-gray-400 hover:bg-white/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            {activeTab === 'headers' && (
              <CodeEditor language="json" value={headers} onChange={(v) => setHeaders(v || '')} />
            )}
            {activeTab === 'body' && (
              <CodeEditor language="json" value={body} onChange={(v) => setBody(v || '')} />
            )}
          </div>
        </div>

        {/* Response Viewer */}
        <div className="glass rounded-xl flex flex-col border border-white/10 overflow-hidden relative">
          <div className="flex justify-between items-center bg-black/40 px-4 py-2 border-b border-white/10 min-h-[50px]">
            <span className="text-sm font-medium text-gray-300">Response</span>
            {response && (
               <StatusBadge status={response.status} text={`${response.status} ${response.statusText}`} />
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            {response ? (
              <CodeEditor 
                language="json" 
                value={typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)} 
                readOnly 
              />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-muted">
                 Hit send to get a response
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIExplorer;
