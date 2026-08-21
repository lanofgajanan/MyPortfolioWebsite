import { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface GlitchHeroTextProps {
  key?: string | number;
  title: string;
  status: string;
  intensity?: 'low' | 'medium' | 'high' | 'overdrive';
}

export function GlitchHeroText({
  title,
  status,
  intensity = 'medium',
}: GlitchHeroTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayedStatus, setDisplayedStatus] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect for system status
  useEffect(() => {
    let index = 0;
    setDisplayedStatus('');
    const timer = setInterval(() => {
      if (index < status.length) {
        setDisplayedStatus(status.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [status]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  // Periodic random micro-glitch
  useEffect(() => {
    const interval = setInterval(() => {
      const glitchChance = intensity === 'overdrive' ? 0.7 : intensity === 'high' ? 0.4 : 0.2;
      if (Math.random() < glitchChance) {
        triggerGlitchBurst();
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [intensity]);

  const triggerGlitchBurst = () => {
    setIsGlitching(true);
    sound.playGlitch();
    setTimeout(() => {
      setIsGlitching(false);
    }, 280);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative z-10 my-6 px-4">
      {/* Interactive Cyber Title */}
      <div className="relative">
        <div className="relative select-none">
          {/* Background chromatic layer 1 (Emerald Green Split) */}
          <h1
            className={`font-cyber text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#34d399] absolute top-0 left-0 w-full select-none pointer-events-none transition-transform duration-75 ${
              isGlitching
                ? 'translate-x-[6px] -translate-y-[3px] opacity-90 blur-[1px]'
                : 'translate-x-[2px] opacity-70'
            }`}
            style={{
              clipPath: isGlitching ? 'polygon(0 0, 100% 0, 100% 48%, 0 48%)' : undefined,
            }}
          >
            {title}
          </h1>

          {/* Background chromatic layer 2 (Soft Violet Split) */}
          <h1
            className={`font-cyber text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#a78bfa] absolute top-0 left-0 w-full select-none pointer-events-none transition-transform duration-75 ${
              isGlitching
                ? '-translate-x-[7px] translate-y-[4px] opacity-90 blur-[1px]'
                : '-translate-x-[2px] opacity-75'
            }`}
            style={{
              clipPath: isGlitching ? 'polygon(0 52%, 100% 52%, 100% 100%, 0 100%)' : undefined,
            }}
          >
            {title}
          </h1>

          {/* Background chromatic layer 3 (Cyan Split) */}
          <h1
            className={`font-cyber text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#38bdf8] absolute top-0 left-0 w-full select-none pointer-events-none transition-transform duration-75 ${
              isGlitching
                ? 'translate-x-[3px] translate-y-[2px] opacity-80'
                : 'translate-y-[1px] opacity-60'
            }`}
          >
            {title}
          </h1>

          {/* Foreground Main Text */}
          <h1
            id="hero-cyber-title"
            className="font-cyber text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#ffffff] relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Subtitle status beacon matching screenshot */}
      <div className="mt-4 sm:mt-5 max-w-2xl px-2">
        <p
          id="system-status-beacon"
          className="font-mono-hud text-xs sm:text-sm md:text-base tracking-widest text-[#34d399] font-medium leading-relaxed drop-shadow-[0_0_10px_rgba(52,211,153,0.6)] flex items-center justify-center flex-wrap gap-1"
        >
          <span>{displayedStatus}</span>
          <span
            className={`inline-block w-2 sm:w-2.5 h-4 bg-[#34d399] ml-1 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </p>
      </div>
    </div>
  );
}
