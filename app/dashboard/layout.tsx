'use client';
import React from 'react';
import Sidebar from '@/components/ui/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-pageBg">
      <Sidebar />
      <div className="flex-1 overflow-y-auto w-full relative">
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-screen" />
        <div className="p-4 lg:p-8 max-w-7xl mx-auto h-full relative z-10 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
