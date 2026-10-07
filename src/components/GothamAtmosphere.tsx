import React, { useEffect, useRef, useState } from 'react';
import { BatLogo, BatSignalBeam } from './BatLogo';
import { soundEffects } from '../utils/audio';

interface GothamAtmosphereProps {
  onLightningTriggered?: () => void;
  missionAccepted?: boolean;
}

export const GothamAtmosphere: React.FC<GothamAtmosphereProps> = ({
  missionAccepted = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [bats, setBats] = useState<Array<{ id: number; x: number; y: number; scale: number; speed: number }>>([]);

  // Initialize rain canvas
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

    // Rain drop particles
    const dropCount = Math.min(220, Math.floor((width * height) / 4500));
    const drops = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 22 + 14,
      speed: Math.random() * 9 + 14,
      opacity: Math.random() * 0.45 + 0.15,
      thickness: Math.random() * 1.2 + 0.6,
    }));

    // Splash particles
    const splashes: Array<{ x: number; y: number; vx: number; vy: number; alpha: number; life: number }> = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render rain streaks
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 205, 235, ${d.opacity})`;
        ctx.lineWidth = d.thickness;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 1.8; // Wind effect

        if (d.y > height - 10) {
          // Add splash
          if (Math.random() < 0.3) {
            splashes.push({
              x: d.x,
              y: height - 10 + Math.random() * 8,
              vx: (Math.random() - 0.5) * 3,
              vy: -(Math.random() * 2 + 1),
              alpha: 0.5,
              life: 1,
            });
          }
          d.y = -d.length;
          d.x = Math.random() * (width + 100);
        }
      }

      // Render splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.05;
        s.alpha *= 0.9;

        ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0) {
          splashes.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Periodic random thunder and lightning flashes
  useEffect(() => {
    const triggerLightning = () => {
      setIsFlashing(true);
      soundEffects.playThunderSound();
      setTimeout(() => setIsFlashing(false), 90);
      setTimeout(() => {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 120);
      }, 160);
    };

    // First lightning after 6 seconds, then periodic
    const timeout = setTimeout(() => {
      triggerLightning();
    }, 5000);

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerLightning();
      }
    }, 16000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Bats generation on mission accepted or randomly
  useEffect(() => {
    if (missionAccepted) {
      // Swarm of bats across the screen
      const swarm = Array.from({ length: 18 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        scale: Math.random() * 0.8 + 0.4,
        speed: Math.random() * 2 + 3,
      }));
      setBats(swarm);
    }
  }, [missionAccepted]);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#06080c]">
      {/* Dark sky moody gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #151a24 0%, #0a0d14 45%, #030508 100%)',
        }}
      />

      {/* Cloud mist layers */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(200, 220, 255, 0.08) 0%, transparent 60%),
                            radial-gradient(circle at 70% 30%, rgba(180, 160, 240, 0.06) 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 70%)`,
        }}
      />

      {/* Lightning screen flash */}
      <div 
        className={`absolute inset-0 bg-slate-200/25 transition-opacity duration-75 pointer-events-none z-10 ${
          isFlashing ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Bat-Signal Projector & Beam */}
      <BatSignalBeam active={true} />

      {/* Animated Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />

      {/* Gothic City Skyline Silhouettes */}
      <div className="absolute bottom-0 inset-x-0 h-48 md:h-72 z-[2] opacity-85">
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#030407]"
        >
          {/* Distant building silhouettes */}
          <path
            opacity="0.5"
            d="M0,360 L0,220 L40,220 L40,180 L80,180 L80,240 L120,240 L140,160 L180,160 L200,210 L260,210 L280,130 L320,130 L340,220 L410,220 L430,90 L450,70 L470,90 L490,220 L560,220 L580,160 L620,160 L650,230 L730,230 L750,110 L770,80 L790,110 L820,220 L890,220 L910,140 L970,140 L1000,210 L1070,210 L1090,100 L1120,100 L1140,230 L1200,230 L1230,170 L1290,170 L1320,220 L1390,220 L1410,150 L1440,150 L1440,360 Z"
          />

          {/* Foreground Gothic Art-Deco Skyscrapers & Wayne Tower */}
          <path
            d="M0,360 L0,260 L30,260 L35,210 L65,210 L70,260 L110,260 L130,190 L160,190 L180,270 L240,270 L250,150 L270,130 L290,150 L310,270 L370,270 L390,180 L440,180 L460,280 L520,280 L540,140 L555,140 L565,60 L570,30 L575,60 L585,140 L600,140 L620,280 L690,280 L710,190 L760,190 L780,270 L840,270 L860,130 L875,100 L890,130 L910,270 L970,270 L990,170 L1040,170 L1060,280 L1130,280 L1150,140 L1190,140 L1210,270 L1270,270 L1290,180 L1340,180 L1360,260 L1400,260 L1410,210 L1440,210 L1440,360 Z"
          />
        </svg>

        {/* Lit windows in the skyscrapers */}
        <div className="absolute inset-0 flex justify-around items-end pb-8 pointer-events-none opacity-40">
          <div className="grid grid-cols-2 gap-1.5 mb-6">
            <span className="w-1 h-1.5 bg-amber-400/70" />
            <span className="w-1 h-1.5 bg-amber-200/50" />
            <span className="w-1 h-1.5 bg-amber-500/60" />
            <span className="w-1 h-1.5 bg-cyan-200/40" />
          </div>
          <div className="grid grid-cols-3 gap-1 mb-14">
            <span className="w-1 h-1.5 bg-amber-300/80" />
            <span className="w-1 h-1.5 bg-transparent" />
            <span className="w-1 h-1.5 bg-amber-400/70" />
            <span className="w-1 h-1.5 bg-amber-200/60" />
            <span className="w-1 h-1.5 bg-amber-500/70" />
            <span className="w-1 h-1.5 bg-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-20">
            <span className="w-1.5 h-2 bg-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            <span className="w-1.5 h-2 bg-amber-300/70" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-10">
            <span className="w-1 h-1.5 bg-amber-400/60" />
            <span className="w-1 h-1.5 bg-amber-100/50" />
            <span className="w-1 h-1.5 bg-amber-400/70" />
          </div>
          <div className="grid grid-cols-2 gap-1 mb-16">
            <span className="w-1 h-1.5 bg-amber-300/80" />
            <span className="w-1 h-1.5 bg-cyan-300/50" />
          </div>
        </div>

        {/* Ground level street fog */}
        <div 
          className="absolute bottom-0 inset-x-0 h-28"
          style={{
            background: 'linear-gradient(to top, rgba(3, 5, 8, 0.98) 0%, rgba(10, 15, 25, 0.6) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Atmospheric Swarming Bats when activated */}
      {bats.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-[4]">
          {bats.map((bat) => (
            <div
              key={bat.id}
              className="absolute animate-bat-flight"
              style={{
                top: `${bat.y}%`,
                left: `${bat.x}%`,
                transform: `scale(${bat.scale})`,
                animationDuration: `${bat.speed}s`,
              }}
            >
              <BatLogo className="w-10 h-6 text-black/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>
          ))}
        </div>
      )}

      {/* Subtle CRT Scanlines & Film Vignette */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(0, 0, 0, 0.8)',
          backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </div>
  );
};
