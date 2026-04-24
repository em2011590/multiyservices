'use client';
import React from 'react';

interface StatusBadgeProps {
  status: number | string;
  text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  let color = 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  
  const code = typeof status === 'number' ? status : 200; // Mock parse mapping
  
  if (code >= 200 && code < 300) {
    color = 'bg-accent-green/20 text-accent-green border-accent-green/50';
  } else if (code >= 400 && code < 500) {
    color = 'bg-accent-amber/20 text-accent-amber border-accent-amber/50';
  } else if (code >= 500) {
    color = 'bg-red-500/20 text-red-400 border-red-500/50';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {text || status}
    </span>
  );
};

export default StatusBadge;
