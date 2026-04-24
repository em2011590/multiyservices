'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Search, Globe, RefreshCw, MessageSquare } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  type: 'code' | 'search' | 'api' | 'convert' | 'chat';
  color: string;
}

const iconMap = {
  code: { Icon: Code2, glow: '#00f5ff' },
  search: { Icon: Search, glow: '#8b5cf6' },
  api: { Icon: Globe, glow: '#39ff14' },
  convert: { Icon: RefreshCw, glow: '#f59e0b' },
  chat: { Icon: MessageSquare, glow: '#ec4899' },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, href, type, color }) => {
  const { Icon, glow } = iconMap[type];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group h-full cursor-pointer"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

        <div className="glass h-full p-6 flex flex-col items-center text-center gap-4 border-white/5 group-hover:border-white/20 transition-colors z-10 relative overflow-hidden">
          {/* CSS icon — replaces the 4 separate WebGL Canvas contexts */}
          <div className="w-32 h-32 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
              style={{ boxShadow: `0 0 32px ${glow}30` }}
            >
              <Icon
                className="w-12 h-12"
                style={{ color: glow, filter: `drop-shadow(0 0 8px ${glow})` }}
              />
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard;
