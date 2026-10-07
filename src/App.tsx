/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GothamAtmosphere } from './components/GothamAtmosphere';
import { MissionCard } from './components/MissionCard';
import { AcceptedModal } from './components/AcceptedModal';

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Gotham Atmospheric Canvas & City Skyline */}
      <GothamAtmosphere missionAccepted={isAccepted} />

      {/* Top Header / Wayne Enterprises Bar */}
      <header className="relative z-10 w-full px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between border-b border-zinc-900/60 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-sm shadow-[0_0_8px_#facc15] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-zinc-300 uppercase">
            WAYNE ENTERPRISES // SECURE DISPATCH
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>COORDINATES: GOTHAM CITY</span>
          <span>·</span>
          <span>SYSTEM: ONLINE</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-8">
        <MissionCard onAccept={() => setIsAccepted(true)} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-4 py-3 text-center border-t border-zinc-900/60 bg-black/50 backdrop-blur-sm">
        <p className="text-[11px] font-mono text-zinc-500 tracking-wider">
          "It's not who I am underneath, but what I do that defines me." — Gotham Nightwatch © Wayne Enterprises
        </p>
      </footer>

      {/* Mission Accepted Modal */}
      {isAccepted && <AcceptedModal onClose={() => setIsAccepted(false)} />}
    </div>
  );
}
