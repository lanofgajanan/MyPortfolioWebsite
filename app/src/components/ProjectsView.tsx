import React from 'react';
import { ArrowRight, Shield, Server, Lock, Cpu, Database } from 'lucide-react';

interface ProjectsViewProps {
  onOpenProject: (projectId: string) => void;
}

export function ProjectsView({ onOpenProject }: ProjectsViewProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 sm:py-24 z-20 pointer-events-auto">
      {/* Header section */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 font-mono-hud text-xs text-[#00d4ff] tracking-widest uppercase mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span>PROJECT_REGISTRY // ARCHIVE_01</span>
        </div>
        <h2 className="font-cyber text-2xl sm:text-4xl font-bold tracking-wider text-white text-shadow-cyber">
          FEATURED SYSTEMS &amp; PRODUCTS
        </h2>
        <p className="font-space-grotesk text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Active hardware prototypes, self-hosted infrastructure, and digital tools built with a focus on privacy, sovereignty, and minimal craft.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Project 1: AEGIS (Featured) */}
        <div className="relative group rounded-lg border border-[#1a3a52] bg-[#0d1420]/90 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#00d4ff]/60 hover:shadow-[0_0_24px_rgba(0,212,255,0.15)]">
          {/* Subtle decorative corner markers */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00d4ff] pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00d4ff] pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00d4ff] pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00d4ff] pointer-events-none" />

          <div>
            {/* Top metadata */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#16202e] mb-5 font-jetbrains text-xs">
              <span className="text-[#4a5568] tracking-wider">SYS_ID: #001 // HW_SERVER</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00d4ff]/10 text-[#00d4ff] border border-[#1a3a52]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                IN_DEVELOPMENT
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/40 text-[#00d4ff]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-cyber text-2xl font-bold tracking-wider text-white group-hover:text-[#00d4ff] transition-colors">
                AEGIS
              </h3>
            </div>

            <p className="font-jetbrains text-xs text-[#00d4ff]/90 tracking-wide mb-4">
              Your data. Your server. Your rules.
            </p>

            <p className="font-space-grotesk text-zinc-300 text-sm leading-relaxed mb-6">
              A pre-configured mini PC that brings your DNS traffic, personal cloud files, and secure remote network access back under your own roof — no subscriptions, no corporate dashboards.
            </p>

            {/* Capabilities badges */}
            <div className="flex flex-wrap gap-2 mb-6 font-jetbrains text-[11px] text-zinc-400">
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
                <Server className="w-3 h-3 text-[#00d4ff]" /> Private DNS
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
                <Database className="w-3 h-3 text-[#00d4ff]" /> Personal Cloud
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
                <Lock className="w-3 h-3 text-[#00d4ff]" /> Remote Access
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
                <Cpu className="w-3 h-3 text-[#00d4ff]" /> Mini-PC Box
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={() => onOpenProject('aegis')}
            className="w-full flex items-center justify-between px-4 py-3 rounded bg-cyan-950/40 hover:bg-[#00d4ff]/15 text-[#00d4ff] border border-[#1a3a52] hover:border-[#00d4ff] font-jetbrains text-xs tracking-wider transition-all duration-200 cursor-pointer group/btn"
          >
            <span className="font-semibold">INITIALIZE_PROJECT_VIEW // AEGIS</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Project 2: Pipeline Placeholder */}
        <div className="relative rounded-lg border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div>
            {/* Top metadata */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800/80 mb-5 font-jetbrains text-xs">
              <span className="text-zinc-600 tracking-wider">SYS_ID: #002 // BIO_TELEMETRY</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                CONCEPT
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[#34d399]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-cyber text-2xl font-bold tracking-wider text-zinc-200">
                OBSIDIAN PROTOCOLS
              </h3>
            </div>

            <p className="font-jetbrains text-xs text-[#34d399]/80 tracking-wide mb-4">
              Biometric telemetry &amp; neural terminal interface
            </p>

            <p className="font-space-grotesk text-zinc-400 text-sm leading-relaxed mb-6">
              Low-latency edge orchestration interface for local machine telemetry, ambient background generation, and reactive canvas shader systems.
            </p>

            {/* Capabilities badges */}
            <div className="flex flex-wrap gap-2 mb-6 font-jetbrains text-[11px] text-zinc-400">
              <span className="px-2 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                React 19
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                Canvas 2D
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Disabled action */}
          <div className="w-full flex items-center justify-between px-4 py-3 rounded bg-zinc-900/40 text-zinc-500 border border-zinc-800/60 font-jetbrains text-xs tracking-wider">
            <span>ACTIVE_IN_CORE_TERMINAL</span>
            <span className="text-[10px] text-zinc-600">[LIVE]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
