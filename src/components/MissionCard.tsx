import React, { useState } from 'react';
import { BatLogo } from './BatLogo';
import { DodgingNoButton } from './DodgingNoButton';
import { soundEffects } from '../utils/audio';
import { Volume2, VolumeX, ShieldAlert, Sparkles, Utensils, Clock, MapPin, Download } from 'lucide-react';

interface MissionCardProps {
  onAccept: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ onAccept }) => {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const handleToggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEffects.playBeep();
    }
  };

  const handleAcceptClick = () => {
    soundEffects.playAcceptSound();
    onAccept();
  };

  const handleDodge = (count: number) => {
    setDodgeCount(count);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto px-3 sm:px-4 py-4 sm:py-6 z-10">
      {/* Sound & Utility Bar */}
      <div className="flex items-center justify-between mb-3 text-[11px] sm:text-xs font-mono text-zinc-400 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span className="tracking-widest uppercase text-yellow-400 font-bold">Batcomputer: Online</span>
        </div>
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors"
          title={isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-yellow-400" />}
          <span>{isMuted ? 'Sound OFF' : 'Sound ON'}</span>
        </button>
      </div>

      {/* Main Dossier Card Container */}
      <div className="relative bg-[#0b0d12]/92 backdrop-blur-xl border border-zinc-800 hover:border-yellow-400/40 rounded-xl p-4 sm:p-8 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_40px_rgba(255,225,0,0.12)] transition-all">
        {/* Corner Tech Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />

        {/* Batman Insignia Watermark / Emblem with uploaded classic yellow oval logo */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
          <div 
            className="relative mb-3 group cursor-pointer" 
            onClick={() => soundEffects.playBeep()}
            title="Wayne Industries Emblem"
          >
            <div className="absolute -inset-4 bg-yellow-400/15 rounded-full blur-xl group-hover:bg-yellow-400/30 transition-all" />
            <BatLogo 
              className="w-28 sm:w-36 md:w-44 h-16 sm:h-22 md:h-26 drop-shadow-[0_0_22px_rgba(255,225,0,0.6)] transition-transform group-hover:scale-105" 
              glow={true} 
            />
          </div>

          <div className="inline-block px-2.5 py-0.5 mb-2 bg-yellow-400/10 border border-yellow-400/30 rounded text-[10px] sm:text-[11px] font-mono tracking-widest text-yellow-400 uppercase">
            WAYNETECH CLASSIFIED DOSSIER
          </div>

          <div className="text-zinc-500 text-[11px] sm:text-xs font-mono tracking-wider">
            FOR THE ATTENTION OF:
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-white font-gotham mt-0.5 uppercase">
            Siddhant Shetty
          </h1>
        </div>

        {/* The Central Question */}
        <div className="my-4 sm:my-6 text-center">
          <p className="text-base sm:text-xl md:text-2xl font-semibold text-slate-100 leading-snug tracking-wide font-gotham">
            Will you go for a dinner date to{' '}
            <span className="text-yellow-400 underline decoration-yellow-400/70 decoration-2 underline-offset-4 font-bold">
              Sandeep
            </span>{' '}
            this{' '}
            <span className="text-yellow-300 font-bold">Friday at 8:00 PM</span>?
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-2.5 sm:mt-3 leading-relaxed max-w-md mx-auto">
            "Gotham is in safe hands tonight. The Dark Knight has reserved our private booth. Rejection is not within authorized mission parameters."
          </p>
        </div>

        {/* Tactical Parameters Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 my-4 sm:my-6 p-2.5 sm:p-3.5 bg-black/70 border border-zinc-800/80 rounded-lg text-xs font-mono">
          <div className="flex items-center gap-2 p-2 rounded bg-zinc-900/50">
            <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Location</div>
              <div className="text-white font-semibold">Sandeep</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded bg-zinc-900/50">
            <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Target Time</div>
              <div className="text-white font-semibold">Friday, 8:00 PM</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded bg-zinc-900/50">
            <Utensils className="w-4 h-4 text-yellow-400 shrink-0" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Operation</div>
              <div className="text-yellow-300 font-semibold">Dinner Date</div>
            </div>
          </div>
        </div>

        {/* Interactive Choice Buttons */}
        <div className="relative pt-1 sm:pt-2 pb-2 sm:pb-4">
          <div className="text-center text-[10px] sm:text-[11px] font-mono text-zinc-500 mb-3 tracking-widest uppercase">
            SELECT DIRECTIVE:
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 min-h-[90px]">
            {/* The YES Button */}
            <button
              onClick={handleAcceptClick}
              className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-md shadow-[0_0_30px_rgba(255,225,0,0.5)] hover:shadow-[0_0_45px_rgba(255,225,0,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2.5 font-mono cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>YES, I'LL BE THERE</span>
              <BatLogo className="w-5 h-3 text-black" />
            </button>

            {/* The NO Button (Dodges as cursor or touch approaches!) */}
            <div className="w-full sm:w-auto flex justify-center">
              <DodgingNoButton onDodge={handleDodge} />
            </div>
          </div>

          {/* Evasion Counter Tracker */}
          {dodgeCount > 0 && (
            <div className="mt-3.5 pt-3 border-t border-zinc-800/80 text-center font-mono text-[11px] sm:text-xs text-zinc-400 flex items-center justify-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
              <span>Rejection attempts thwarted: <strong className="text-yellow-400">{dodgeCount}</strong></span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500 italic">"The No button is completely out of reach"</span>
            </div>
          )}
        </div>

        {/* Batcomputer status footnote */}
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
            Wayne Security Clearance: LEVEL 1 // Transmission ID: 🦇-SIDDHANT-SANDEEP-FRI-8PM
          </p>
        </div>
      </div>
    </div>
  );
};
