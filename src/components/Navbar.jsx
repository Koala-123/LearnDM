import React, { useState } from 'react';
import MathView from './MathView';
import {
  Menu,
  Flame,
  Star,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
} from 'lucide-react';

export default function Navbar({
  activeTopic,
  onOpenSidebar,
  xp = 1420,
}) {
  const [sfxOn, setSfxOn] = useState(true);
  const level = Math.floor(xp / 500) + 1;

  return (
    <header className="bg-cosmic-950/90 backdrop-blur-md border-b border-cosmic-750 sticky top-0 z-20">
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left Side: Mobile/Tablet Menu Button & Current Topic Indicator */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile/Tablet Drawer Toggle Button */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden btn-arcade flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-cosmic-900 border border-cosmic-750 hover:border-neon-purple text-left transition shadow-md group shrink-0"
            aria-label="Open course units sidebar"
          >
            <div className="w-8 h-8 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition">
              <Menu className="w-4 h-4" />
            </div>
            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-neon-cyan font-bold tracking-wider uppercase">
                <span>Unit {activeTopic?.unitNumber}</span>
                <span className="text-slate-500">•</span>
                <span className="text-neon-purple underline underline-offset-2">Switch ▾</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[220px]">
                <MathView text={activeTopic?.title || 'Units'} />
              </div>
            </div>
          </button>

          {/* Desktop Breadcrumb Header */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
                Unit {activeTopic?.unitNumber} of 8
              </span>
              <span className="px-2.5 py-1 rounded-xl text-xs font-mono text-slate-400 bg-cosmic-900 border border-cosmic-750">
                {activeTopic?.week}
              </span>
            </div>
            <div className="h-4 w-px bg-cosmic-750" />
            <div className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <span>Current Module:</span>
              <span className="text-white font-extrabold">
                <MathView text={activeTopic?.title} />
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Arcade HUD Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Level Badge (Hidden on mobile <640px, visible on tablets/desktops) */}
          <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-cosmic-900 border border-cosmic-750 text-xs font-mono font-semibold text-slate-300 items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Lvl {level} Apprentice</span>
          </div>

          {/* Streak Counter */}
          <div className="px-3 py-1.5 rounded-full bg-neon-pink/15 border border-neon-pink/40 text-neon-pink text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 shadow-glow-pink">
            <Flame className="w-4 h-4 fill-neon-pink" />
            <span>4 <span className="hidden sm:inline">Streak</span></span>
          </div>

          {/* XP Counter */}
          <div className="px-3 py-1.5 rounded-full bg-neon-gold/15 border border-neon-gold/40 text-neon-gold text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 shadow-glow-gold">
            <Star className="w-4 h-4 fill-neon-gold" />
            <span>{xp.toLocaleString()} XP</span>
          </div>

          {/* Audio SFX Toggle */}
          <button
            onClick={() => setSfxOn(!sfxOn)}
            className="p-2 rounded-full bg-cosmic-900 border border-cosmic-750 text-slate-400 hover:text-white hover:border-cosmic-600 transition"
            title={sfxOn ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle sound effects"
          >
            {sfxOn ? (
              <Volume2 className="w-4 h-4 text-neon-mint" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
