'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Search, BookOpen, Sparkles, Share2, Zap } from 'lucide-react';

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      name: "Code Translator",
      description: "Convert code between multiple languages with AST visualization and real-time syntax analysis",
      icon: Code2,
      color: "from-cyan-500 to-blue-500",
      bgGradient: "bg-gradient-to-br from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/30",
      path: "/dashboard/converter",
      features: ["Multi-language support", "AST Visualization", "Syntax highlighting"]
    },
    {
      id: 2,
      name: "AI Assistant",
      description: "Get intelligent code analysis, debugging help, and development guidance powered by advanced AI",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      bgGradient: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/30",
      path: "/dashboard/assistant",
      features: ["Code review", "Debugging help", "Best practices"]
    },
    {
      id: 3,
      name: "Deep Search",
      description: "Search across NPM packages and GitHub repositories with semantic understanding",
      icon: Search,
      color: "from-violet-500 to-purple-500",
      bgGradient: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      borderColor: "border-violet-500/30",
      path: "/dashboard/search",
      features: ["NPM packages", "GitHub repos", "Smart filtering"]
    },
    {
      id: 4,
      name: "API Explorer",
      description: "Build, test, and save REST API requests with an intuitive visual interface",
      icon: BookOpen,
      color: "from-emerald-500 to-green-500",
      bgGradient: "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
      borderColor: "border-emerald-500/30",
      path: "/dashboard/api-explorer",
      features: ["Request builder", "Save endpoints", "Real-time testing"]
    },
    {
      id: 5,
      name: "Format Converter",
      description: "Convert between JSON, YAML, XML, and other data formats instantly",
      icon: Share2,
      color: "from-orange-500 to-amber-500",
      bgGradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
      borderColor: "border-orange-500/30",
      path: "/dashboard/converter",
      features: ["Multiple formats", "Instant conversion", "Validation"]
    },
    {
      id: 6,
      name: "Content Translator",
      description: "Translate content and text across multiple languages with context preservation",
      icon: Zap,
      color: "from-indigo-500 to-blue-500",
      bgGradient: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/30",
      path: "/dashboard/translator",
      features: ["Multi-language", "Context aware", "Quick translation"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden min-h-screen bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-start px-4 py-12 lg:py-20"
      >
        {/* Hero Section */}
        <div className="w-full max-w-6xl mx-auto text-center mb-20">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              ✨ Welcome to DevSphere
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-violet-400 tracking-tight mb-6"
          >
            The Ultimate Developer <br className="hidden md:inline" /> Toolkit
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Experience the power of six integrated services designed to supercharge your development workflow. From code translation to AI-powered assistance, everything you need in one beautiful platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                Launch Dashboard <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <a href="https://github.com/em2011590/multiyservices" target="_blank" rel="noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md hover:shadow-2xl hover:shadow-white/10"
              >
                View Source Code
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="w-full max-w-7xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
          >
            All Services at Your Fingertips
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={serviceCardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  {hoveredService === idx && (
                    <motion.div
                      layoutId={`glow-${idx}`}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-20 blur-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* Card */}
                  <Link href={service.path}>
                    <div
                      className={`relative h-full p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 cursor-pointer
                        ${hoveredService === idx
                          ? `${service.bgGradient} ${service.borderColor} shadow-2xl`
                          : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 rounded-2xl ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-4 flex items-center justify-center shadow-lg`}
                          animate={hoveredService === idx ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300" style={hoveredService === idx ? { backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` } : {}}>
                          {service.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={hoveredService === idx ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-4 space-y-2"
                        >
                          {service.features.map((feature, i) => (
                            <div key={i} className="text-xs text-cyan-400/80 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-cyan-400" />
                              {feature}
                            </div>
                          ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={hoveredService === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}
                        >
                          Explore <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          className="w-full max-w-6xl mx-auto mt-20 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Services", value: "6" },
              { label: "Languages", value: "15+" },
              { label: "API Integrations", value: "50+" },
              { label: "Daily Users", value: "1000+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <p className="text-gray-400 mb-4">Ready to transform your development workflow?</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
