import { useEffect, useRef } from 'react';

interface InteractiveGlitchBackgroundProps {
  cursorPos: { x: number; y: number };
}

export function InteractiveGlitchBackground({ cursorPos }: InteractiveGlitchBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Grid properties
    const gridSize = 40;
    let frame = 0;
    
    // Spark particles near cursor
    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }> = [];

    // Glitch slices
    let glitchSlices: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      offset: number;
      color: string;
      life: number;
    }> = [];

    let lastMouseX = cursorPos.x;
    let lastMouseY = cursorPos.y;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const mx = cursorPos.x;
      const my = cursorPos.y;

      const mouseSpeed = Math.hypot(mx - lastMouseX, my - lastMouseY);
      lastMouseX = mx;
      lastMouseY = my;

      // Spawn glitch sparks near cursor if moving
      if (mouseSpeed > 1 && sparks.length < 50) {
        sparks.push({
          x: mx + (Math.random() * 40 - 20),
          y: my + (Math.random() * 40 - 20),
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#34d399' : Math.random() > 0.3 ? '#a78bfa' : '#38bdf8',
          life: 0,
          maxLife: 20 + Math.random() * 20,
        });
      }

      // Random glitch slice blocks around cursor
      if (Math.random() < 0.35 && mx > 0) {
        glitchSlices.push({
          x: mx - 80 + Math.random() * 160,
          y: my - 60 + Math.random() * 120,
          w: 20 + Math.random() * 120,
          h: 2 + Math.random() * 8,
          offset: (Math.random() - 0.5) * 24,
          color: Math.random() > 0.6 ? '#34d399' : Math.random() > 0.3 ? '#a78bfa' : '#38bdf8',
          life: 3 + Math.floor(Math.random() * 4),
        });
      }

      // 1. Cyber Ambient Radial Glow following cursor
      if (mx > 0 && my > 0) {
        const rad = ctx.createRadialGradient(mx, my, 5, mx, my, 280);
        rad.addColorStop(0, 'rgba(167, 139, 250, 0.12)');
        rad.addColorStop(0.3, 'rgba(52, 211, 153, 0.06)');
        rad.addColorStop(0.6, 'rgba(56, 189, 248, 0.03)');
        rad.addColorStop(1, 'rgba(9, 9, 11, 0)');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Cyber Grid with Glitch Distortion near cursor
      ctx.lineWidth = 1;
      const cursorDistMax = 220;

      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 12) {
          let drawX = x;
          const dist = Math.hypot(x - mx, y - my);

          if (dist < cursorDistMax && mx > 0) {
            // Glitch wave warp based on distance and frame
            const intensity = (1 - dist / cursorDistMax);
            const noise = Math.sin(y * 0.08 + frame * 0.2) * 8 * intensity;
            const jitter = (Math.random() - 0.5) * 4 * intensity;
            drawX += noise + jitter;
          }

          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }

        const distLine = Math.abs(x - mx);
        const nearCursor = distLine < cursorDistMax && mx > 0;
        ctx.strokeStyle = nearCursor
          ? 'rgba(52, 211, 153, 0.12)'
          : 'rgba(39, 39, 42, 0.15)';
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 12) {
          let drawY = y;
          const dist = Math.hypot(x - mx, y - my);

          if (dist < cursorDistMax && mx > 0) {
            const intensity = (1 - dist / cursorDistMax);
            const noise = Math.cos(x * 0.08 + frame * 0.2) * 8 * intensity;
            const jitter = (Math.random() - 0.5) * 4 * intensity;
            drawY += noise + jitter;
          }

          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }

        const distLine = Math.abs(y - my);
        const nearCursor = distLine < cursorDistMax && my > 0;
        ctx.strokeStyle = nearCursor
          ? 'rgba(167, 139, 250, 0.12)'
          : 'rgba(39, 39, 42, 0.15)';
        ctx.stroke();
      }

      // 3. Draw Glitch Slice Blocks near cursor
      glitchSlices.forEach((slice) => {
        ctx.fillStyle = slice.color;
        ctx.globalAlpha = (slice.life / 6) * 0.55;
        ctx.fillRect(slice.x + slice.offset, slice.y, slice.w, slice.h);
        ctx.globalAlpha = 1.0;
        slice.life--;
      });
      glitchSlices = glitchSlices.filter((s) => s.life > 0);

      // 4. Cursor Crosshair Radar Ring
      // Removed per user request to keep cursor normal and simple.

      // 5. Digital Sparks Simulation
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1.0;

        if (p.life >= p.maxLife) {
          sparks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorPos]);

  return (
    <canvas
      id="interactive-glitch-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
