'use client';
import React from 'react';
import { useUIStore } from '@/store/uiStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  Search,
  BookOpen,
  FileJson,
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Code Translator', href: '/dashboard/translator', icon: Code2, accent: 'text-accent-cyan' },
  { name: 'Deep Search', href: '/dashboard/search', icon: Search, accent: 'text-accent-violet' },
  { name: 'API Explorer', href: '/dashboard/api-explorer', icon: BookOpen, accent: 'text-accent-green' },
  { name: 'Format Converter', href: '/dashboard/converter', icon: FileJson, accent: 'text-accent-amber' },
  { name: 'AI Assistant', href: '/dashboard/assistant', icon: MessageSquare, accent: 'text-pink-400' },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useUIStore();
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="fixed inset-y-0 left-0 z-30 lg:static lg:h-[calc(100vh-4rem)] flex-shrink-0 pt-16 lg:pt-0"
        >
          <div className="h-full w-64 glass border-r border-white/5 p-4 flex flex-col gap-2 rounded-none bg-sidebar/95 overflow-y-auto">
            <h3 className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4">
              Services
            </h3>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                    isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.accent || ''} ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-accent-cyan rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
