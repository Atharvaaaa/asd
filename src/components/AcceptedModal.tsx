import React, { useState } from 'react';
import { BatLogo } from './BatLogo';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { Calendar, Download, Copy, Check, MessageSquare, ShieldCheck, MapPin, Clock, User, X, FileArchive } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface AcceptedModalProps {
  onClose: () => void;
}

export const AcceptedModal: React.FC<AcceptedModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const dispatchText = `🦇 WAYNETECH CLASSIFIED DISPATCH 🦇\n\nMission Status: CONFIRMED\nTarget Operative: Siddhant Shetty\nRendezvous Point: Sandeep\nDate & Time: Friday @ 8:00 PM\nDirective: Dinner date locked in. Gotham can rest for the evening.\n\n"I am vengeance. I am the night. And Friday at 8pm, we dine at Sandeep."`;

  const handleCopy = () => {
    soundEffects.playBeep();
    navigator.clipboard.writeText(dispatchText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleWhatsApp = () => {
    soundEffects.playBeep();
    const encoded = encodeURIComponent(
      `Hey Siddhant! 🦇 The Bat-Signal has been answered. Dinner date at Sandeep this Friday at 8:00 PM is officially LOCKED IN! Table reserved, see you there!`
    );
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-zinc-950 border-2 border-yellow-400/60 rounded-xl shadow-[0_0_80px_rgba(255,225,0,0.3)] p-5 sm:p-8 text-slate-100 overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_#facc15]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-zinc-400 hover:text-yellow-400 hover:bg-zinc-900 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center p-2 sm:p-3 mb-2.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 shadow-[0_0_35px_rgba(255,225,0,0.35)]">
            <BatLogo className="w-20 sm:w-28 h-12 sm:h-16" glow={true} />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-widest text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AUTHORIZATION GRANTED // MISSION ACCEPTED</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold tracking-wider text-slate-100 font-gotham uppercase">
            Rendezvous Locked
          </h2>
          <p className="text-zinc-400 text-[11px] sm:text-xs font-mono mt-0.5">
            WayneTech Directive #0724-GOTHAM // Target Secured
          </p>
        </div>

        {/* Classified Dossier Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3.5 sm:p-5 mb-5 shadow-inner space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>GUEST OF HONOR:</span>
            </div>
            <span className="text-yellow-300 font-bold tracking-wide">SIDDHANT SHETTY</span>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span>LOCATION:</span>
            </div>
            <span className="text-white font-bold tracking-wide">SANDEEP</span>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span>TIMING:</span>
            </div>
            <span className="text-white font-bold tracking-wide">THIS FRIDAY @ 8:00 PM</span>
          </div>

          <div className="pt-2 text-[11px] sm:text-xs text-zinc-400 leading-relaxed italic border-t border-zinc-800">
            "Alfred has officially booked the table at Sandeep under Wayne. The city can survive a few hours without Batman, but dinner with Siddhant cannot wait."
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playBeep()}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-md transition-all shadow-[0_0_20px_rgba(255,225,0,0.35)] hover:scale-[1.02] active:scale-95 text-xs sm:text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={() => {
                soundEffects.playBeep();
                downloadIcsFile();
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-md transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm"
            >
              <Download className="w-4 h-4 text-yellow-400" />
              <span>Download (.ics) Invite</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-md transition-all text-xs sm:text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-yellow-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Dispatch Text'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 rounded-md transition-all text-xs sm:text-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Footer quote */}
        <div className="mt-4 text-center text-[10px] sm:text-[11px] font-mono text-zinc-500">
          "It's not who I am underneath, but what I do that defines me." — Bruce Wayne
        </div>
      </div>
    </div>
  );
};
