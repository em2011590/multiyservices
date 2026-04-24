'use client';
import React, { useState } from 'react';
import CodeEditor from '@/components/ui/CodeEditor';
import FileDropzone from '@/components/ui/FileDropzone';
import { ArrowRightLeft, Copy, Trash2, Download } from 'lucide-react';
import yaml from 'js-yaml';
import toml from '@iarna/toml';
import Papa from 'papaparse';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import toast from 'react-hot-toast';

type Format = 'json' | 'yaml' | 'toml' | 'xml' | 'csv';

export const FormatConverter: React.FC = () => {
  const [inputVal, setInputVal] = useState('{"hello": "world"}');
  const [outputVal, setOutputVal] = useState('');
  const [inputFormat, setInputFormat] = useState<Format>('json');
  const [outputFormat, setOutputFormat] = useState<Format>('yaml');

  const convertData = () => {
    try {
      let parsedObj: any = null;
      
      // Parse Input
      if (inputFormat === 'json') parsedObj = JSON.parse(inputVal);
      if (inputFormat === 'yaml') parsedObj = yaml.load(inputVal);
      if (inputFormat === 'toml') parsedObj = toml.parse(inputVal);
      if (inputFormat === 'csv') {
        const res = Papa.parse(inputVal, { header: true });
        parsedObj = res.data;
      }
      if (inputFormat === 'xml') {
        const parser = new XMLParser();
        parsedObj = parser.parse(inputVal);
      }

      // Format Output
      let result = '';
      if (outputFormat === 'json') result = JSON.stringify(parsedObj, null, 2);
      if (outputFormat === 'yaml') result = yaml.dump(parsedObj);
      if (outputFormat === 'toml') result = toml.stringify(parsedObj);
      if (outputFormat === 'xml') {
        const builder = new XMLBuilder();
        result = builder.build(parsedObj);
      }
      if (outputFormat === 'csv') {
        result = Papa.unparse(parsedObj);
      }

      setOutputVal(result);
      toast.success('Conversion successful!');
    } catch (e: any) {
      setOutputVal(`Error: ${e.message}`);
      toast.error('Conversion failed!');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputVal);
    toast.success('Copied to clipboard!');
  };

  const clearInput = () => {
    setInputVal('');
    setOutputVal('');
  };

  const downloadOutput = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputVal));
    element.setAttribute('download', `converted.${outputFormat}`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Downloaded!');
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="glass p-6 rounded-xl border-accent-amber/20">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-2 block">Input Format</label>
            <select 
              value={inputFormat} onChange={(e) => setInputFormat(e.target.value as Format)}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white"
            >
              {['json', 'yaml', 'toml', 'xml', 'csv'].map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-2 block">Output Format</label>
            <select 
              value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as Format)}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white"
            >
              {['json', 'yaml', 'toml', 'xml', 'csv'].map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={convertData} 
            className="flex items-center gap-2 px-4 py-2 bg-accent-amber/20 hover:bg-accent-amber/30 text-accent-amber rounded-lg transition-colors border border-accent-amber/50 font-semibold"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Convert
          </button>
          <button 
            onClick={copyToClipboard}
            disabled={!outputVal}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/20 hover:bg-accent-cyan/30 text-accent-cyan rounded-lg transition-colors border border-accent-cyan/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button 
            onClick={downloadOutput}
            disabled={!outputVal}
            className="flex items-center gap-2 px-4 py-2 bg-accent-green/20 hover:bg-accent-green/30 text-accent-green rounded-lg transition-colors border border-accent-green/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button 
            onClick={clearInput}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/50 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        <div className="flex flex-col h-full glass rounded-xl border border-white/10 overflow-hidden">
          <div className="p-2 bg-black/40 border-b border-white/5"><span className="text-sm px-2 text-gray-300">Input</span></div>
          <CodeEditor language={inputFormat} value={inputVal} onChange={(v) => setInputVal(v || '')} />
        </div>
        <div className="flex flex-col h-full glass rounded-xl border border-white/10 overflow-hidden">
           <div className="p-2 bg-black/40 border-b border-white/5"><span className="text-sm px-2 text-gray-300">Output</span></div>
          <CodeEditor language={outputFormat} value={outputVal} readOnly />
        </div>
      </div>
    </div>
  );
};

export default FormatConverter;
