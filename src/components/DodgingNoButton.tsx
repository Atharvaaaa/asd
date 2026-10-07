import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEffects } from '../utils/audio';

interface DodgingNoButtonProps {
  onDodge?: (count: number, quote: string) => void;
}

const BATMAN_EVASION_QUOTES = [
  "Alfred: 'Dinner cancellation protocols are offline, sir.'",
  "WayneTech Security: Option 'No' has moved out of reach.",
  "The Batmobile navigation is already locked to Sandeep.",
  "Error 404: Rejection not found in Batcomputer database.",
  "A Batarang just nudged the button away!",
  "Joker tried saying no once. Don't be like the Joker.",
  "The Dark Knight does not take 'No' for an answer, Siddhant.",
  "Commissioner Gordon already reserved the table at Sandeep.",
  "You cannot escape Gotham's summons.",
  "Bane voice: 'You merely adopted the refusal...'",
  "Lucius Fox: 'That feature was removed from the suit.'",
  "Target: Siddhant Shetty. Status: Compulsory dinner operative.",
];

export const DodgingNoButton: React.FC<DodgingNoButtonProps> = ({ onDodge }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [isJittering, setIsJittering] = useState(false);
  const lastDodgeTime = useRef<number>(0);

  const performEvasion = useCallback((cursorX?: number, cursorY?: number) => {
    const now = Date.now();
    // Throttle slightly to ensure crisp animation
    if (now - lastDodgeTime.current < 90) return;
    lastDodgeTime.current = now;

    const btn = buttonRef.current;
    if (!btn) return;

    // Mobile haptic vibration if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        // Ignore
      }
    }

    soundEffects.playDodgeSound();
    setIsJittering(true);

    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);
    const quote = BATMAN_EVASION_QUOTES[(nextCount - 1) % BATMAN_EVASION_QUOTES.length];
    setCurrentQuote(quote);

    if (onDodge) {
      onDodge(nextCount, quote);
    }

    // Determine direction away from cursor, or random if hovered directly
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    let angle: number;
    if (typeof cursorX === 'number' && typeof cursorY === 'number') {
      const dx = btnCenterX - cursorX;
      const dy = btnCenterY - cursorY;
      angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
    } else {
      angle = Math.random() * Math.PI * 2;
    }

    // Small pixel step: move 45px to 65px away!
    const step = 45 + Math.random() * 20;

    // Responsive boundaries to stay strictly within the visible interactive area
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const limitX = isMobile ? 65 : 100;
    const limitY = isMobile ? 45 : 55;

    let nextX = pos.x + Math.cos(angle) * step;
    let nextY = pos.y + Math.sin(angle) * step;

    // Bounce back inward if pushing past boundary
    if (nextX > limitX) nextX = limitX - 30;
    if (nextX < -limitX) nextX = -limitX + 30;
    if (nextY > limitY) nextY = limitY - 25;
    if (nextY < -limitY) nextY = -limitY + 25;

    setPos({ x: nextX, y: nextY });

    setTimeout(() => {
      setIsJittering(false);
    }, 160);
  }, [dodgeCount, pos, onDodge]);

  // Proximity detection: when cursor/finger comes within 65px, dodge small pixels away!
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const btn = buttonRef.current;
      if (!btn) return;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      // Trigger dodge when cursor/finger gets within 65px
      if (dist < 65) {
        performEvasion(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [performEvasion]);

  return (
    <div className="relative inline-block select-none touch-none">
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={(e) => performEvasion(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const touch = e.touches[0];
          performEvasion(touch ? touch.clientX : undefined, touch ? touch.clientY : undefined);
        }}
        onFocus={() => performEvasion()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          performEvasion();
        }}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) ${
            isJittering ? 'scale(0.92) rotate(-3deg)' : 'scale(1)'
          }`,
          transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
        className="group relative px-5 py-3 sm:px-6 sm:py-3.5 bg-zinc-900/95 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/80 rounded-md font-mono text-xs sm:text-sm tracking-wider uppercase shadow-lg cursor-not-allowed active:scale-95 whitespace-nowrap z-30"
        aria-label="No button (evasive)"
      >
        <span className="relative z-10 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500/80 animate-pulse" />
          NO, I CANNOT
        </span>
        <span className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
      </button>

      {/* Live Batman Evading Feedback Message */}
      {currentQuote && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm sm:max-w-md w-[92%] px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/95 border border-yellow-400/60 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.95)] backdrop-blur-md text-center transition-all animate-fade-in pointer-events-none">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-mono text-yellow-400 mb-0.5 sm:mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
            <span>WAYNETECH EVASION #{dodgeCount}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-medium italic">
            "{currentQuote}"
          </p>
        </div>
      )}
    </div>
  );
};
