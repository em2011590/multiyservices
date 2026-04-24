'use client';
import React, { useState } from 'react';
import { useLazySearchDevQuery } from '@/store/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Github, Box, ExternalLink, Filter } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const DeepSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('github');
  const [triggerSearch, { data, isFetching, error }] = useLazySearchDevQuery();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    triggerSearch({ query, platform });
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-accent-violet" />
          Deep Search Engine
        </h2>
        <p className="text-muted text-sm">Query across GitHub, NPM, StackOverflow, and more simultaneously.</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories, packages, answers..."
            className="w-full glass bg-transparent border border-accent-violet/30 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent-violet transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="appearance-none glass border border-white/10 rounded-xl py-3 px-4 pr-10 text-white focus:outline-none focus:border-accent-violet cursor-pointer h-full"
            >
              <option value="github">GitHub</option>
              <option value="npm">NPM</option>
              <option value="stackoverflow">StackOverflow</option>
              <option value="mdn">MDN</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
          
          <button
            type="submit"
            disabled={isFetching}
            className="bg-accent-violet text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent-violet/90 transition-colors disabled:opacity-50"
          >
            {isFetching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 rounded-xl">
        <AnimatePresence>
          {error && (
             <p className="text-red-400">Error fetching results.</p>
          )}

          {data?.results?.length === 0 && !isFetching && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-12 text-muted h-64 border border-dashed border-white/10 rounded-xl">
              <SearchIcon className="w-12 h-12 mb-4 opacity-50" />
              <p>No results found for "{query}"</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.results?.map((item: any, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <GlassCard glowColor="violet" className="h-full flex flex-col group hover:border-accent-violet/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-accent-violet">
                      {item.platform === 'GitHub' ? <Github className="w-5 h-5" /> : <Box className="w-5 h-5" />}
                      <span className="font-semibold text-sm">{item.platform}</span>
                    </div>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{item.description}</p>
                  
                  {item.stars !== undefined && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400 mt-auto">
                      ⭐ {item.stars.toLocaleString()}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeepSearch;
