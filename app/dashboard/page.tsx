'use client';
import React from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import GlassCard from '@/components/ui/GlassCard';
import { Activity, Clock, Database, Cloud } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-muted mt-1">Welcome back. Here is the activity for your DevSphere account.</p>
        </div>
        <div className="bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full border border-accent-cyan/20 text-xs font-semibold tracking-wider">
          PRO PLAN
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Activity, label: 'Translations', val: '142', color: 'text-accent-cyan' },
          { icon: Database, label: 'API Calls', val: '2.1k', color: 'text-accent-green' },
          { icon: Cloud, label: 'Uploaded Assets', val: '38', color: 'text-accent-amber' },
          { icon: Clock, label: 'Searches', val: '849', color: 'text-accent-violet' },
        ].map((stat, i) => (
          <GlassCard key={i} className="flex items-center gap-4 py-4 px-5">
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.val}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Services Grid (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white mb-2">Available Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full min-h-[300px]">
            <ServiceCard title="Code Translator" description="Translate languages & view AST in 3D" href="/dashboard/translator" type="code" color="from-cyan-500/20 to-blue-500/20" />
            <ServiceCard title="Deep Search" description="Simultaneous GitHub & NPM Queries" href="/dashboard/search" type="search" color="from-violet-500/20 to-fuchsia-500/20" />
            <ServiceCard title="API Explorer" description="Test REST endpoints and save workflows" href="/dashboard/api-explorer" type="api" color="from-green-500/20 to-emerald-500/20" />
            <ServiceCard title="Format Converter" description="Convert JSON, YAML, TOML, XML" href="/dashboard/converter" type="convert" color="from-amber-500/20 to-orange-500/20" />
          </div>
        </div>

        {/* Recent Activity (1/3 width) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white mb-2">Recent Activity</h2>
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
             <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center text-sm">
                <span className="text-muted font-medium">Action</span>
                <span className="text-muted font-medium">Time</span>
             </div>
             <div className="flex-1 overflow-y-auto p-2">
                {/* Mock activity feed */}
                {[
                  { text: 'Translated JS to Python', time: '10 min ago', color: 'bg-accent-cyan' },
                  { text: 'Saved "Weather API" endpoint', time: '1 hr ago', color: 'bg-accent-green' },
                  { text: 'Converted package.json to YAML', time: '3 hrs ago', color: 'bg-accent-amber' },
                  { text: 'Searched GitHub for "zustand"', time: 'Yesterday', color: 'bg-accent-violet' },
                  { text: 'Chat with AI Assistant', time: 'Yesterday', color: 'bg-pink-500' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${act.color} shadow-[0_0_8px_currentColor]`} />
                      <span className="text-sm text-gray-300 group-hover:text-white">{act.text}</span>
                    </div>
                    <span className="text-xs text-muted">{act.time}</span>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>
      </div>

    </div>
  );
}
