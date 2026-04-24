'use client';
import React, { useState } from 'react';
import CodeEditor from '@/components/ui/CodeEditor';
import { useTranslateCodeMutation } from '@/store/apiService';
import toast from 'react-hot-toast';
import { ArrowRight, Save, LayoutTemplate } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addHistoryEntry } from '@/store/historySlice';

const languages = ['javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust', 'php', 'ruby'];

const CodeTranslator: React.FC = () => {
  const [sourceCode, setSourceCode] = useState('function example() {\n  console.log("Hello DevSphere");\n}');
  const [targetCode, setTargetCode] = useState('');
  const [sourceLang, setSourceLang] = useState('javascript');
  const [targetLang, setTargetLang] = useState('python');
  const [astData, setAstData] = useState<{ nodes: any[], edges: any[] } | null>(null);
  
  const [translateCode, { isLoading }] = useTranslateCodeMutation();
  const dispatch = useAppDispatch(); // Fallback if hooks exist, else we mock

  const handleTranslate = async () => {
    try {
      const res = await translateCode({ code: sourceCode, sourceLang, targetLang }).unwrap();
      setTargetCode(res.translatedCode);
      if (res.ast) setAstData(res.ast);
      
      toast.success('Translation successful!');
      
      dispatch(addHistoryEntry({
        serviceType: 'translator',
        inputSnapshot: sourceCode,
        outputSnapshot: res.translatedCode,
        createdAt: new Date().toISOString(),
      }));
    } catch (err: any) {
      toast.error(err?.data?.error || 'Translation failed');
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-accent-cyan" />
            Code Translator
          </h2>
          <p className="text-muted text-sm mt-1">Translate code between 20+ languages with 3D AST visualization.</p>
        </div>
        <button
          onClick={handleTranslate}
          disabled={isLoading}
          className="bg-accent-cyan text-black px-6 py-2 rounded-md font-semibold hover:bg-accent-cyan/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? 'Translating...' : 'Translate Code'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-100">
        {/* Source Editor */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-t-lg border border-white/5 border-b-0">
            <span className="text-sm font-medium text-gray-300">Source</span>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm text-white"
            >
              {languages.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="flex-1 overflow-hidden rounded-b-lg shadow-lg">
            <CodeEditor language={sourceLang} value={sourceCode} onChange={(val) => setSourceCode(val || '')} />
          </div>
        </div>

        {/* Target Editor */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-t-lg border border-white/5 border-b-0">
            <span className="text-sm font-medium text-gray-300">Output</span>
            <div className="flex items-center gap-2">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm text-white"
              >
                {languages.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
              </select>
              <button className="text-muted hover:text-white p-1"><Save className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-b-lg shadow-lg">
            <CodeEditor language={targetLang} value={targetCode} readOnly />
          </div>
        </div>
      </div>

      {/* 3D AST VISUALIZER */}
      <div className="glass flex-1 rounded-xl relative overflow-hidden border-accent-cyan/20 flex flex-col min-h-75">
        <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
          <h3 className="text-sm font-semibold text-white">AST Visualizer</h3>
          <p className="text-xs text-muted">Rotate to explore structural mapping</p>
        </div>
        <div className="w-full h-full min-h-75 flex flex-col items-center justify-center text-muted gap-4 bg-gradient-to-br from-white/5 to-transparent">
          {astData ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-white mb-2">AST Analysis Complete</p>
              <p className="text-xs text-muted">{astData.nodes?.length || 0} nodes detected</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
              <p>Translate code to generate AST analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeTranslator;
