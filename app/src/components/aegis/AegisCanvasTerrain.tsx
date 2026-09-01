import React, { useEffect, useRef } from 'react';

interface AegisCanvasTerrainProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function AegisCanvasTerrain({ containerRef }: AegisCanvasTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const ROWS = 15;
    const COLS = 26;
    const HORIZON_RATIO = 0.2;

    const drive = { phase: 0, pulse: 0 };
    const rowGeo: Array<{
      depthT: number;
      nearT: number;
      screenY: number;
      cols: Array<{ x: number; xT: number; _y?: number }>;
    }> = [];

    let renderQueued = false;
    let settleRAF: number | null = null;
    let pulseRAF: number | null = null;
    let lastY = window.scrollY;
    let rotVel = 0;
    let rot = 0;

    function buildGeometry() {
      rowGeo.length = 0;
      const horizonY = H * HORIZON_RATIO;
      for (let r = 0; r < ROWS; r++) {
        const depthT = r / (ROWS - 1);
        const persp = Math.pow(depthT, 1.9);
        const nearT = 1 - persp;
        const screenY = horizonY + nearT * (H - horizonY);
        const rowW = W * (0.1 + nearT * 1.15);
        const cols: Array<{ x: number; xT: number; _y?: number }> = [];
        for (let c = 0; c < COLS; c++) {
          const xT = c / (COLS - 1) - 0.5;
          cols.push({ x: W / 2 + xT * rowW, xT: xT });
        }
        rowGeo.push({ depthT, nearT, screenY, cols });
      }
    }

    function drawTerrain() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      for (let r = 0; r < ROWS; r++) {
        const row = rowGeo[r];
        if (!row) continue;
        const nearT = row.nearT;
        const amp = (20 + drive.pulse * 24) * (0.25 + nearT * 0.75);
        const alpha = Math.min((0.1 + nearT * 0.6) * (0.75 + drive.pulse * 0.45), 0.9);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.6})`;
        ctx.lineWidth = 0.8;

        const pts = row.cols;
        for (let c = 0; c < pts.length; c++) {
          const p = pts[c];
          const wave = Math.sin(p.xT * 7.5 + row.depthT * 5.5 - drive.phase) * amp;
          const y = row.screenY - wave;
          p._y = y;
          if (c === 0) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
        }
        ctx.stroke();

        // Dots on near rows
        if (nearT > 0.55) {
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          const radius = 1 + nearT * 1.8;
          for (let c2 = 0; c2 < pts.length; c2++) {
            const p2 = pts[c2];
            if (p2._y !== undefined) {
              ctx.beginPath();
              ctx.arc(p2.x, p2._y, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Connecting lines between rows
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 0.6;
      for (let c3 = 0; c3 < COLS; c3++) {
        for (let r2 = 0; r2 < ROWS; r2++) {
          const pt = rowGeo[r2]?.cols[c3];
          if (!pt || pt._y === undefined) continue;
          if (r2 === 0) ctx.moveTo(pt.x, pt._y);
          else ctx.lineTo(pt.x, pt._y);
        }
      }
      ctx.stroke();
    }

    function requestRender() {
      if (renderQueued) return;
      renderQueued = true;
      requestAnimationFrame(() => {
        renderQueued = false;
        buildGeometry();
        drawTerrain();
      });
    }

    function resize() {
      if (!canvas || !ctx) return;
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      requestRender();
    }

    function settle() {
      if (!canvas) return;
      rot += (rotVel - rot) * 0.14;
      rotVel *= 0.82;
      canvas.style.transform = `rotate(${rot.toFixed(3)}deg)`;
      if (Math.abs(rotVel) > 0.01 || Math.abs(rot) > 0.01) {
        settleRAF = requestAnimationFrame(settle);
      } else {
        rot = 0;
        rotVel = 0;
        canvas.style.transform = 'rotate(0deg)';
        settleRAF = null;
      }
    }

    function handleScroll() {
      const scrollSource = containerRef?.current || window;
      const y = scrollSource instanceof Window ? window.scrollY : (scrollSource as HTMLElement).scrollTop;
      const dy = y - lastY;
      lastY = y;

      drive.phase += dy * 0.012;
      rotVel += dy * 0.006;

      requestRender();
      if (!settleRAF && !reduceMotion) {
        settleRAF = requestAnimationFrame(settle);
      }
    }

    resize();
    window.addEventListener('resize', resize);

    const scrollTarget = containerRef?.current || window;
    scrollTarget.addEventListener('scroll', handleScroll as EventListener, { passive: true });

    // Initial render & pulse trigger
    buildGeometry();
    drawTerrain();

    // Subtle entrance pulse
    if (!reduceMotion) {
      drive.pulse = 1;
      const startPulse = performance.now();
      const pulseDuration = 1200;
      const animatePulse = (now: number) => {
        const elapsed = now - startPulse;
        const progress = Math.min(elapsed / pulseDuration, 1);
        drive.pulse = 1 - Math.pow(progress, 2);
        requestRender();
        if (progress < 1) {
          pulseRAF = requestAnimationFrame(animatePulse);
        } else {
          drive.pulse = 0;
          pulseRAF = null;
        }
      };
      pulseRAF = requestAnimationFrame(animatePulse);
    }

    return () => {
      window.removeEventListener('resize', resize);
      scrollTarget.removeEventListener('scroll', handleScroll as EventListener);
      if (settleRAF) cancelAnimationFrame(settleRAF);
      if (pulseRAF) cancelAnimationFrame(pulseRAF);
    };
  }, [containerRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 block pointer-events-none transition-transform duration-75"
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(10,14,23,0.55) 0%,
            rgba(10,14,23,0.15) 18%,
            rgba(10,14,23,0.05) 40%,
            rgba(10,14,23,0.25) 100%)`,
        }}
      />
    </>
  );
}
