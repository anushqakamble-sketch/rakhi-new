import React, { useEffect, useRef } from 'react';
import { ParticleType } from '../types';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: ParticleType;
  petalPath?: number;
}

interface ParticleCanvasProps {
  type?: ParticleType;
  density?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  type = 'petals',
  density = 30,
}) => {
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

    const currentType: ParticleType = (type as ParticleType) || 'petals';
    const petalsColors = ['#FDA4AF', '#FB7185', '#F43F5E', '#FFE4E6', '#F472B6'];
    const marigoldColors = ['#F59E0B', '#FBBF24', '#FCD34D', '#D97706', '#EA580C'];
    const sparklesColors = ['#FDE047', '#FEF08A', '#FFFFFF', '#F59E0B', '#67E8F9'];
    const confettiColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

    const getColors = (t: ParticleType) => {
      if (t === 'petals') return petalsColors;
      if (t === 'marigold') return marigoldColors;
      if (t === 'sparkles') return sparklesColors;
      return confettiColors;
    };

    const particles: Particle[] = [];
    const colors = getColors(currentType);

    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: currentType === 'sparkles' ? Math.random() * 4 + 2 : Math.random() * 12 + 8,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: currentType === 'sparkles' ? (Math.random() - 0.5) * 0.8 : Math.random() * 1.5 + 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: currentType,
      });
    }



    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate((p.rotation * Math.PI) / 180);
      c.globalAlpha = p.opacity;
      c.fillStyle = p.color;

      c.beginPath();
      c.moveTo(0, -p.size);
      c.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
      c.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate((p.rotation * Math.PI) / 180);
      c.globalAlpha = p.opacity;
      c.fillStyle = p.color;

      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(Math.cos((i * Math.PI) / 2) * p.size, Math.sin((i * Math.PI) / 2) * p.size);
        c.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (p.size * 0.3),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (p.size * 0.3)
        );
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawConfetti = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate((p.rotation * Math.PI) / 180);
      c.globalAlpha = p.opacity;
      c.fillStyle = p.color;
      c.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Draw
        if (p.type === 'petals' || p.type === 'marigold') {
          drawPetal(ctx, p);
        } else if (p.type === 'sparkles') {
          drawSparkle(ctx, p);
        } else {
          drawConfetti(ctx, p);
        }

        // Update physics
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 20;
        }

        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type, density]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70" />;
};
