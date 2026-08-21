/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { InteractiveGlitchBackground } from './components/InteractiveGlitchBackground';
import { SegmentProgressBar } from './components/SegmentProgressBar';
import { GlitchHeroText } from './components/GlitchHeroText';
import { HUDCornerTelemetry } from './components/HUDCornerTelemetry';

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState({
    lat: '34.8522',
    lng: '-118.2437',
    hex1: '#08FF00',
    hex2: '#6BFF60',
    altLat: '34.B622',
    altLng: '-8.9943',
    rawX: 0,
    rawY: 0,
  });

  const updateCoordinates = useCallback((x: number, y: number) => {
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;

    const ratioX = Math.min(Math.max(x / w, 0), 1);
    const ratioY = Math.min(Math.max(y / h, 0), 1);

    // Realistic GPS coordinate mapping around the reference coordinates [34.8522, -118.2437]
    const latNum = 34.8000 + ratioY * 0.0950;
    const lngNum = -118.2000 - ratioX * 0.0850;

    // Hex telemetry generator
    const hexG = Math.floor(200 + ratioX * 55).toString(16).toUpperCase().padStart(2, '0');
    const hexB = Math.floor(ratioY * 80).toString(16).toUpperCase().padStart(2, '0');
    const hexCode = `#08FF${hexB === '00' ? '00' : hexB}`;

    const altLatHex = (34.8000 + (1 - ratioY) * 0.0950).toFixed(4).replace('.', '.B');
    const altLngHex = (-8.9000 - ratioX * 0.1500).toFixed(4);

    setCursorCoords({
      lat: latNum.toFixed(4),
      lng: lngNum.toFixed(4),
      hex1: '#08FF00',
      hex2: '#6BFF60',
      altLat: altLatHex,
      altLng: altLngHex,
      rawX: Math.round(x),
      rawY: Math.round(y),
    });
  }, []);

  useEffect(() => {
    // Initial center coordinates
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    setCursorPos({ x: initialX, y: initialY });
    updateCoordinates(initialX, initialY);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      updateCoordinates(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setCursorPos({ x: touch.clientX, y: touch.clientY });
        updateCoordinates(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [updateCoordinates]);

  return (
    <main
      id="obsidian-hud-root"
      className="relative w-screen h-screen overflow-hidden bg-[#09090b] text-[#fafafa] flex flex-col justify-between select-none cursor-default"
    >
      {/* 1. Dynamic Interactive Glitch Background responding near cursor */}
      <InteractiveGlitchBackground cursorPos={cursorPos} />

      {/* 2. CRT Scanline Grid Overlay */}
      <div className="absolute inset-0 w-full h-full crt-overlay z-20 pointer-events-none" />

      {/* 4. Dynamic Scanline Sweep */}
      <div className="scanline-sweep z-20 pointer-events-none" />

      {/* 5. Minimalistic Four-Corner Live Cursor Coordinates */}
      <HUDCornerTelemetry cursorCoords={cursorCoords} />

      {/* 6. Centerpiece Glitch Title & Bio-Protocols Beacon */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl mx-auto px-4 pointer-events-auto">
        <GlitchHeroText
          title="GAJANAN LOHAR"
          status="SYSTEM STATUS: UNDER CONSTRUCTION // INITIALIZING BIO-PROTOCOLS..."
          intensity="medium"
        />

        {/* Futuristic Segmented Progress Bar */}
        <SegmentProgressBar />
      </div>

      {/* 7. Footer Text */}
      <div className="absolute bottom-6 sm:bottom-8 w-full flex justify-center items-center gap-3 text-[10px] sm:text-xs font-mono-hud text-zinc-500 tracking-widest z-30 pointer-events-none opacity-80">
        <span>GAJANAN LOHAR</span>
        <span className="text-zinc-700">|</span>
        <span>OBSIDIAN_TERMINAL v1.0.0</span>
      </div>
    </main>
  );
}
