'use client';
import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/uiStore';
import { Menu, Search, LogIn, UserPlus } from 'lucide-react';

const Navbar: React.FC = () => {
  const { toggleSidebar, setCommandPaletteOpen } = useUIStore();

  return (
    <nav className="glass sticky top-0 z-40 w-full h-16 flex items-center justify-between px-4 lg:px-6 border-b border-white/5 rounded-none backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-md transition-colors lg:hidden">
          <Menu className="w-5 h-5 text-primary" />
        </button>
        <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-violet flex items-center justify-center">
            <span className="text-black font-extrabold pb-[2px]">DS</span>
          </div>
          <span className="hidden sm:inline-block">DevSphere</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 bg-black/20 hover:bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-sm text-muted transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search tools...</span>
          <kbd className="ml-4 font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20">Cmd E</kbd>
        </button>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium border border-white/10">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm font-medium">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Up</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
