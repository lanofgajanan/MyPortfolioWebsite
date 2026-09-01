import React, { useEffect, useState } from 'react';
import { ArrowLeft, Home, Layers } from 'lucide-react';
import { AegisCanvasTerrain } from './AegisCanvasTerrain';

interface AegisProjectViewProps {
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
}

export function AegisProjectView({ onNavigateHome, onNavigateProjects }: AegisProjectViewProps) {
  const [terminalRevealed, setTerminalRevealed] = useState(false);

  useEffect(() => {
    // Reveal terminal output smoothly
    const timer = setTimeout(() => {
      setTerminalRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0e17] text-[#e5e9f0] font-space-grotesk overflow-x-hidden selection:bg-[#00d4ff]/20 selection:text-[#00d4ff]">
      {/* 1. Scroll-driven Canvas Terrain */}
      <AegisCanvasTerrain />

      {/* 2. Top Minimalistic Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0a0e17]/85 border-b border-[#16202e] transition-colors">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-jetbrains text-xs">
          {/* Home / Return button */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#00d4ff] transition-colors py-1.5 px-2.5 rounded hover:bg-[#16202e]/60 cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <Home className="w-3.5 h-3.5 opacity-70" />
            <span className="tracking-wider">HOME</span>
          </button>

          {/* All Projects button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateProjects}
              className="hidden sm:flex items-center gap-1.5 text-zinc-500 hover:text-zinc-200 transition-colors py-1.5 px-2 rounded hover:bg-[#16202e]/40 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECTS</span>
            </button>
            <span className="text-[#1a3a52] hidden sm:inline">|</span>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#00d4ff] bg-[#00d4ff]/5 border border-[#1a3a52] px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              <span>AEGIS // SYS_001</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Content Container (max-w: 720px adhering to PRD) */}
      <main className="relative z-10 max-w-[720px] mx-auto px-6">
        {/* HERO SECTION */}
        <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 border-b border-[#16202e] bg-[#0a0e17]/70">
          <h1 className="font-cyber font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#e5e9f0] leading-none">
            AEGIS
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#7d8aa0] font-normal leading-relaxed">
            Your data. Your server. Your rules.
          </p>
          <div className="inline-flex items-center gap-2 mt-8 font-jetbrains text-xs tracking-wider text-[#00d4ff] border border-[#1a3a52] px-3.5 py-1.5 rounded bg-[#00d4ff]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse shadow-[0_0_8px_#00d4ff]" />
            STATUS: IN_DEVELOPMENT
          </div>
        </section>

        {/* WHAT IT IS SECTION */}
        <section className="py-20 sm:py-24 border-b border-[#16202e] bg-[#0a0e17]/70">
          <div className="font-cyber text-xs font-semibold tracking-[0.18em] uppercase text-[#0891b2] mb-4">
            What it is
          </div>
          <h2 className="font-space-grotesk text-2xl sm:text-3xl font-semibold text-[#e5e9f0] mb-5 max-w-xl">
            One box, plugged into your own home.
          </h2>
          <div className="text-[#7d8aa0] space-y-4 text-base sm:text-lg leading-relaxed max-w-2xl">
            <p>
              Aegis is a pre-configured mini PC that puts three things you'd otherwise hand to someone else's servers back under your own roof: your DNS traffic, your files, and your access to your own network from anywhere.
            </p>
            <p>
              No subscriptions. No dashboards owned by a company deciding what to do with your data. Just a small machine that works for you.
            </p>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section className="py-20 sm:py-24 border-b border-[#16202e] bg-[#0a0e17]/70">
          <div className="font-cyber text-xs font-semibold tracking-[0.18em] uppercase text-[#0891b2] mb-4">
            Capabilities
          </div>
          <ul className="divide-y divide-[#16202e] mt-6">
            <li className="flex gap-5 py-6">
              <span className="font-jetbrains text-xs text-[#4a5568] pt-1 shrink-0 w-6">01</span>
              <div>
                <h3 className="font-space-grotesk text-lg font-semibold text-[#e5e9f0] mb-1">
                  Private DNS &amp; ad-blocking
                </h3>
                <p className="text-[#7d8aa0] text-sm sm:text-base leading-relaxed">
                  Network-wide filtering that runs locally — nothing about what you browse leaves the house.
                </p>
              </div>
            </li>
            <li className="flex gap-5 py-6">
              <span className="font-jetbrains text-xs text-[#4a5568] pt-1 shrink-0 w-6">02</span>
              <div>
                <h3 className="font-space-grotesk text-lg font-semibold text-[#e5e9f0] mb-1">
                  Personal cloud
                </h3>
                <p className="text-[#7d8aa0] text-sm sm:text-base leading-relaxed">
                  Your own storage, reachable from anywhere, living on hardware you actually own.
                </p>
              </div>
            </li>
            <li className="flex gap-5 py-6">
              <span className="font-jetbrains text-xs text-[#4a5568] pt-1 shrink-0 w-6">03</span>
              <div>
                <h3 className="font-space-grotesk text-lg font-semibold text-[#e5e9f0] mb-1 flex items-center flex-wrap gap-2">
                  <span>Secure remote access</span>
                  <span className="font-jetbrains text-[10px] tracking-wider text-[#0891b2] border border-[#1a3a52] px-1.5 py-0.5 rounded">
                    planned
                  </span>
                </h3>
                <p className="text-[#7d8aa0] text-sm sm:text-base leading-relaxed">
                  Reach your home network safely from outside it, without opening it up to the internet.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* BUILD STATUS SECTION */}
        <section className="py-20 sm:py-24 border-b border-[#16202e] bg-[#0a0e17]/70">
          <div className="font-cyber text-xs font-semibold tracking-[0.18em] uppercase text-[#0891b2] mb-4">
            Build status
          </div>
          <h2 className="font-space-grotesk text-2xl sm:text-3xl font-semibold text-[#e5e9f0] mb-6 max-w-xl">
            Nothing here is finished yet — here's exactly where it stands.
          </h2>
          <div className="bg-[#0d1420] border border-[#1a3a52] rounded p-6 sm:p-7 font-jetbrains text-xs sm:text-sm leading-loose">
            <div className="text-[#4a5568] mb-3">
              root@aegis:~$ <span className="text-[#7d8aa0]">status</span>
            </div>
            <div
              className={`space-y-1 text-[#4a5568] transition-opacity duration-700 ${
                terminalRevealed ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div>&gt; hardware ......... <span className="text-[#00d4ff]">undecided</span></div>
              <div>&gt; software ......... <span className="text-[#00d4ff]">in_progress</span></div>
              <div>&gt; stage ............ <span className="text-[#00d4ff]">concept &rarr; dev</span></div>
            </div>
            <div className="mt-4 text-[#4a5568] text-[11px] sm:text-xs">
              last updated: manually, by a human, occasionally
              <span className="inline-block w-2 h-3.5 bg-[#00d4ff] ml-1.5 align-middle animate-pulse" />
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="py-20 sm:py-24 border-b border-[#16202e] bg-[#0a0e17]/70">
          <div className="font-cyber text-xs font-semibold tracking-[0.18em] uppercase text-[#0891b2] mb-4">
            Why
          </div>
          <p className="text-lg sm:text-xl text-[#e5e9f0] font-normal leading-relaxed max-w-xl">
            Every convenient cloud service is a company deciding it's fine to hold your data. Aegis starts from the opposite assumption — that the most private option is also the one you can see, touch, and unplug yourself.
          </p>
        </section>

        {/* FOLLOW SECTION */}
        <section className="py-20 sm:py-24 bg-[#0a0e17]/70">
          <div className="font-cyber text-xs font-semibold tracking-[0.18em] uppercase text-[#0891b2] mb-4">
            Follow along
          </div>
          <h2 className="font-space-grotesk text-2xl sm:text-3xl font-semibold text-[#e5e9f0] mb-6 max-w-xl">
            Aegis isn't ready to ship. But you can watch it get there.
          </h2>
          <div className="flex flex-col gap-3 font-space-grotesk text-sm sm:text-base">
            <a
              href="https://github.com/lanofgajanan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d4ff] hover:text-[#7ee8ff] border-b border-[#1a3a52] hover:border-[#00d4ff] pb-0.5 w-fit transition-colors"
            >
              Development log on GitHub &rarr;
            </a>
            <a
              href="mailto:lanofgajanan@gmail.com"
              className="text-[#00d4ff] hover:text-[#7ee8ff] border-b border-[#1a3a52] hover:border-[#00d4ff] pb-0.5 w-fit transition-colors"
            >
              Get in touch &rarr;
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10 sm:py-14 border-t border-[#16202e] font-jetbrains text-xs text-[#4a5568] tracking-wide">
        <div className="max-w-[720px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>AEGIS — built by Gajanan Lohar</div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-zinc-500 hover:text-[#00d4ff] transition-colors cursor-pointer"
          >
            &larr; Return to main terminal
          </button>
        </div>
      </footer>
    </div>
  );
}
