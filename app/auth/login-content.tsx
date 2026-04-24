'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Github, Globe } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Login failed');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Access your DevSphere account</p>
          </motion.div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm"
            >
              ✓ {successMessage}
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4 mb-6"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  className="rounded bg-white/10 border border-white/20"
                  disabled={isLoading}
                />
                Remember me
              </label>
              <Link href="/auth/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Logging in...' : 'Login'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* OAuth Buttons */}
          <motion.div variants={itemVariants} className="space-y-3 mb-6">
            <button 
              type="button"
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
            <button 
              type="button"
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <Globe className="w-5 h-5" />
              Continue with Google
            </button>
          </motion.div>

          {/* Footer */}
          <motion.p variants={itemVariants} className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Sign up here
            </Link>
          </motion.p>

          {/* Back Home */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
