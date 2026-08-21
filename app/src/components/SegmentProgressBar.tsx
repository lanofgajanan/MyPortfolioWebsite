import { useEffect, useState } from 'react';

const GUI_PHRASES = [
  "ASSEMBLING UI COMPONENTS...",
  "INJECTING CSS SHADERS...",
  "RENDERING DOM GEOMETRY...",
  "CALCULATING LAYOUT NODES...",
  "PAINTING PIXEL MATRIX...",
  "COMPILING VIEW HIERARCHY...",
  "SYNCING CLIENT STATE...",
  "MOUNTING VIRTUAL DOM...",
  "RESOLVING STYLE CONFLICTS..."
];

export function SegmentProgressBar() {
  const [progress, setProgress] = useState(87);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % GUI_PHRASES.length);
      // Jitter the progress slightly between 84 and 89 to look "stuck processing"
      setProgress(84 + Math.floor(Math.random() * 6));
    }, 1000);

    return () => clearInterval(phraseInterval);
  }, []);

  const totalSegments = 28;
  const activeSegments = Math.round((progress / 100) * totalSegments);

  return (
    <div className="flex flex-col items-center justify-center my-4 select-none group">
      {/* Outer framing box matching screenshot */}
      <div className="relative p-1 border border-[#38bdf8]/60 bg-[#09090b]/80 backdrop-blur-sm rounded-none shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:border-[#34d399]/80 transition-colors max-w-full">
        {/* Corner tech ticks */}
        <span className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-[#34d399]" />
        <span className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-[#38bdf8]" />
        <span className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-[#34d399]" />
        <span className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-[#a78bfa]" />

        {/* Segment Blocks Track */}
        <div className="flex gap-[2px] sm:gap-[3px] items-center px-1.5 py-1 bg-[#0c0c0f] max-w-full overflow-hidden">
          {Array.from({ length: totalSegments }).map((_, i) => {
            const isActive = i < activeSegments;
            const isHead = i === activeSegments - 1;

            // Calculate gradient position (0 = green, 0.5 = purple, 1 = cyan)
            const ratio = i / totalSegments;
            let bgColor = 'bg-zinc-800/40';
            let glow = '';

            if (isActive) {
              if (ratio < 0.35) {
                // Emerald / Lime Green
                bgColor = 'bg-[#34d399]';
                glow = 'shadow-[0_0_8px_#34d399]';
              } else if (ratio < 0.7) {
                // Soft Violet / Purple
                bgColor = 'bg-[#a78bfa]';
                glow = 'shadow-[0_0_8px_#a78bfa]';
              } else {
                // Cyan / Electric Blue
                bgColor = 'bg-[#38bdf8]';
                glow = 'shadow-[0_0_8px_#38bdf8]';
              }
            }

            return (
              <div
                key={i}
                className={`w-1.5 sm:w-3.5 h-5 sm:h-6 transition-all duration-75 ${bgColor} ${
                  isActive ? glow : ''
                } ${isHead ? 'animate-pulse opacity-100' : isActive ? 'opacity-90' : 'opacity-20'} relative overflow-hidden`}
                style={{
                  clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/25 mix-blend-overlay" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry sub-label under bar */}
      <div className="flex items-center justify-between w-full max-w-md mt-2 px-1 text-[11px] font-mono-hud text-[#a1a1aa]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
          <span className="text-[#34d399] truncate">{GUI_PHRASES[phraseIndex]}</span>
        </div>
        <span className="text-[#fafafa] font-bold tracking-wider">{progress}%</span>
      </div>
    </div>
  );
}
