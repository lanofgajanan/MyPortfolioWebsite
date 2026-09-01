import React from 'react';

export type TabType = 'overview' | 'projects' | 'aegis';

interface HUDNavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export function HUDNavigation({ activeTab, onSelectTab }: HUDNavigationProps) {
  // If we are on aegis subview, active indicator can still highlight projects or show special badge
  const isOverview = activeTab === 'overview';
  const isProjects = activeTab === 'projects' || activeTab === 'aegis';

  return (
    <nav
      aria-label="Terminal Navigation"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded border border-zinc-800/80 bg-[#09090b]/85 backdrop-blur-md shadow-2xl shadow-black/80 font-mono-hud text-xs select-none"
    >
      {/* Overview / Terminal Tab */}
      <button
        type="button"
        onClick={() => onSelectTab('overview')}
        className={`px-3 py-1.5 rounded transition-all duration-200 flex items-center gap-2 cursor-pointer ${
          isOverview
            ? 'bg-zinc-800/90 text-[#34d399] border border-[#34d399]/40 shadow-[0_0_12px_rgba(52,211,153,0.25)] font-semibold'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
        }`}
      >
        <span className={isOverview ? 'text-[#34d399]' : 'text-zinc-600'}>01 //</span>
        <span>OVERVIEW</span>
      </button>

      <span className="text-zinc-700 select-none">|</span>

      {/* Projects Tab */}
      <button
        type="button"
        onClick={() => onSelectTab('projects')}
        className={`px-3 py-1.5 rounded transition-all duration-200 flex items-center gap-2 cursor-pointer ${
          isProjects
            ? 'bg-zinc-800/90 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_12px_rgba(0,212,255,0.25)] font-semibold'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
        }`}
      >
        <span className={isProjects ? 'text-[#00d4ff]' : 'text-zinc-600'}>02 //</span>
        <span>PROJECTS</span>
        <span className="inline-flex items-center justify-center text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-[#00d4ff] border border-cyan-700/50">
          1
        </span>
      </button>
    </nav>
  );
}
