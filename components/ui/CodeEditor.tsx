'use client';
import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange, readOnly = false }) => {
  return (
    <div className="w-full h-full rounded-md overflow-hidden bg-[#1e1e1e] border border-white/10">
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        language={language}
        value={value}
        onChange={onChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
    </div>
  );
};

export default CodeEditor;
