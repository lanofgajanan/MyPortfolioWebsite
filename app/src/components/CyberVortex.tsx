import { useEffect, useRef } from 'react';

interface CyberVortexProps {
  intensity?: 'low' | 'medium' | 'high' | 'overdrive';
  accentColor?: string;
}

export function CyberVortex({ intensity = 'medium' }: CyberVortexProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for digital cyber dust
    const particleCount = intensity === 'overdrive' ? 90 : intensity === 'high' ? 65 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: 30 + Math.random() * 260,
      speed: (0.002 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2.2,
      opacity: 0.2 + Math.random() * 0.6,
      color: Math.random() > 0.6 ? '#a78bfa' : Math.random() > 0.3 ? '#34d399' : '#38bdf8',
    }));

    let rotationAngle = 0;
    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 - 20;

      rotationAngle += 0.004;
      pulse += 0.025;
      const pulseFactor = 1 + Math.sin(pulse) * 0.06;

      // 1. Soft radial ambient background glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        340 * pulseFactor
      );
      radialGlow.addColorStop(0, 'rgba(167, 139, 250, 0.16)');
      radialGlow.addColorStop(0.35, 'rgba(56, 189, 248, 0.08)');
      radialGlow.addColorStop(0.7, 'rgba(52, 211, 153, 0.03)');
      radialGlow.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 340 * pulseFactor, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric segmented cyber vortex rings (as seen in the screenshot behind GAJANAN LOHAR)
      const ringRadii = [60, 95, 140, 190, 240];

      ringRadii.forEach((radius, idx) => {
        const currentR = radius * pulseFactor;
        const dir = idx % 2 === 0 ? 1 : -1;
        const ringRotation = rotationAngle * dir * (0.8 + idx * 0.2);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ringRotation);

        // Dashed ring
        ctx.beginPath();
        ctx.arc(0, 0, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(167, 139, 250, 0.22)' : 'rgba(56, 189, 248, 0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash([idx * 12 + 8, idx * 8 + 12]);
        ctx.stroke();

        // Accent nodes on rings
        const nodeCount = 3 + idx;
        for (let n = 0; n < nodeCount; n++) {
          const nodeAngle = (Math.PI * 2 / nodeCount) * n;
          const nx = Math.cos(nodeAngle) * currentR;
          const ny = Math.sin(nodeAngle) * currentR;

          ctx.beginPath();
          ctx.arc(nx, ny, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = idx === 1 ? '#34d399' : idx === 3 ? '#a78bfa' : '#38bdf8';
          ctx.fill();
        }

        ctx.restore();
      });

      // 3. Digital Orbiting Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = centerX + Math.cos(p.angle) * (p.distance * pulseFactor);
        const py = centerY + Math.sin(p.angle) * (p.distance * 0.7 * pulseFactor);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.7 + Math.sin(pulse + p.distance) * 0.3);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      id="cyber-vortex-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
    />
  );
}
