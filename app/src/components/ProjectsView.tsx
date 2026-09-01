import React from 'react';
import { ArrowRight, Shield, Server, Lock, Cpu, Database } from 'lucide-react';

interface ProjectsViewProps {
  onOpenProject: (projectId: string) => void;
}

export function ProjectsView({ onOpenProject }: ProjectsViewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-20 pointer-events-auto flex flex-col justify-center">
      {/* Header section */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono-hud text-xs text-[#00d4ff] tracking-widest uppercase mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span>PROJECT_REGISTRY // ARCHIVE_01</span>
        </div>
        <h2 className="font-cyber text-2xl sm:text-3xl font-bold tracking-wider text-white">
          FEATURED SYSTEM
        </h2>
      </div>

      {/* Single Project Card: AEGIS */}
      <div className="relative group rounded-lg border border-[#1a3a52] bg-[#0d1420]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#00d4ff]/60 hover:shadow-[0_0_24px_rgba(0,212,255,0.15)]">
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
            <h3 className="font-cyber text-2xl sm:text-3xl font-bold tracking-wider text-white group-hover:text-[#00d4ff] transition-colors">
              AEGIS
            </h3>
          </div>

          <p className="font-jetbrains text-xs sm:text-sm text-[#00d4ff]/90 tracking-wide mb-4">
            Your data. Your server. Your rules.
          </p>

          <p className="font-space-grotesk text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
            A pre-configured mini PC that brings your DNS traffic, personal cloud files, and secure remote network access back under your own roof — no subscriptions, no corporate dashboards.
          </p>

          {/* Capabilities badges */}
          <div className="flex flex-wrap gap-2 mb-6 font-jetbrains text-xs text-zinc-400">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
              <Server className="w-3.5 h-3.5 text-[#00d4ff]" /> Private DNS
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
              <Database className="w-3.5 h-3.5 text-[#00d4ff]" /> Personal Cloud
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
              <Lock className="w-3.5 h-3.5 text-[#00d4ff]" /> Remote Access
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0a0e17] border border-[#16202e] text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-[#00d4ff]" /> Mini-PC Box
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={() => onOpenProject('aegis')}
          className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 rounded bg-cyan-950/40 hover:bg-[#00d4ff]/15 text-[#00d4ff] border border-[#1a3a52] hover:border-[#00d4ff] font-jetbrains text-xs sm:text-sm tracking-wider transition-all duration-200 cursor-pointer group/btn"
        >
          <span className="font-semibold">INITIALIZE_PROJECT_VIEW // AEGIS</span>
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
