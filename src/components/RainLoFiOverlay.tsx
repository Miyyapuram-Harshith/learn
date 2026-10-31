'use client';

import React, { useEffect, useRef } from 'react';

interface RainLoFiOverlayProps {
  isActive: boolean;
}

export const RainLoFiOverlay: React.FC<RainLoFiOverlayProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Raindrop particles
    const dropsCount = 75;
    const drops: Array<{
      x: number;
      y: number;
      speed: number;
      len: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < dropsCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 4 + Math.random() * 6,
        len: 12 + Math.random() * 15,
        opacity: 0.15 + Math.random() * 0.25
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      drops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.len);
        ctx.strokeStyle = `rgba(125, 211, 252, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 0.5;

        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 40,
        opacity: 0.85
      }}
    />
  );
};
