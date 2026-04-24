'use client';
import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { Search, Code2, BookOpen, FileJson, MessageSquare, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl pointer-events-auto shadow-2xl"
            >
              <Command
                className="bg-card/95 border border-white/10 rounded-xl overflow-hidden glass"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setCommandPaletteOpen(false);
                }}
              >
                <div className="flex items-center px-4 py-3 border-b border-white/10 text-white">
                  <Search className="w-5 h-5 text-muted mr-3" />
                  <Command.Input
                    autoFocus
                    placeholder="Search DevSphere services..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-muted text-lg"
                  />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                  <Command.Empty className="p-4 text-center text-muted">No results found.</Command.Empty>

                  <Command.Group heading="Services" className="px-2 py-1 text-xs text-muted font-semibold tracking-wider">
                    <Command.Item
                      onSelect={() => { router.push('/dashboard/translator'); setCommandPaletteOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md cursor-pointer text-white hover:bg-accent-cyan/10 aria-selected:bg-accent-cyan/20 transition-colors"
                    >
                      <Code2 className="w-5 h-5 text-accent-cyan" />
                      <span>Code Translator</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { router.push('/dashboard/search'); setCommandPaletteOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md cursor-pointer text-white hover:bg-accent-violet/10 aria-selected:bg-accent-violet/20 transition-colors"
                    >
                      <Search className="w-5 h-5 text-accent-violet" />
                      <span>Deep Search</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { router.push('/dashboard/api-explorer'); setCommandPaletteOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md cursor-pointer text-white hover:bg-accent-green/10 aria-selected:bg-accent-green/20 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-accent-green" />
                      <span>API Explorer</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { router.push('/dashboard/converter'); setCommandPaletteOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md cursor-pointer text-white hover:bg-accent-amber/10 aria-selected:bg-accent-amber/20 transition-colors"
                    >
                      <FileJson className="w-5 h-5 text-accent-amber" />
                      <span>Format Converter</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { router.push('/dashboard/assistant'); setCommandPaletteOpen(false); }}
                      className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md cursor-pointer text-white hover:bg-pink-500/10 aria-selected:bg-pink-500/20 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 text-pink-400" />
                      <span>AI Assistant</span>
                    </Command.Item>
                  </Command.Group>
                  <Command.Group heading="External Docs" className="px-2 py-1 text-xs text-muted font-semibold tracking-wider mt-2 border-t border-white/5 pt-3">
                    <Command.Item onSelect={() => window.open('https://developer.mozilla.org', '_blank')} className="flex items-center gap-3 px-3 py-2 mt-1 rounded-md cursor-pointer text-gray-300 hover:bg-white/5 aria-selected:bg-white/10">
                      <ExternalLink className="w-4 h-4" />
                      <span>MDN Web Docs</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
