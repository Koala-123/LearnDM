import React, { useState } from 'react';
import { TOPICS } from '../data/topics';
import {
  Network,
  BrainCircuit,
  Binary,
  Layers,
  Calculator,
  Boxes,
  Sparkles,
  Share2,
  Flame,
  Star,
  Volume2,
  VolumeX,
  ChevronDown,
} from 'lucide-react';

const ICON_MAP = {
  Network,
  BrainCircuit,
  Binary,
  Layers,
  Calculator,
  Boxes,
  Sparkles,
  Share2,
};

export default function Navbar({
  activeTopicId,
  onSelectTopic,
  examFilter,
  onChangeExamFilter,
  xp = 1420,
}) {
  const [sfxOn, setSfxOn] = useState(true);

  const filteredTopics = TOPICS.filter((t) => {
    if (examFilter === 'all') return true;
    if (examFilter === 'test1') return t.examCategory === 'test1';
    if (examFilter === 'midterm') return t.examCategory === 'test1' || t.examCategory === 'midterm';
    if (examFilter === 'test2_final') return t.examCategory === 'test2' || t.examCategory === 'final';
    return true;
  });

  const level = Math.floor(xp / 500) + 1;

  return (
    <header className="bg-cosmic-950/95 backdrop-blur-md border-b border-cosmic-750 sticky top-0 z-40">
      {/* Top HUD Branding & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Course */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center shadow-glow-purple text-white font-extrabold text-base">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                LearnDM
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
                Plaksha Sem 3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Interactive Discrete Math • Dr. Saeed Salehi & Dr. Sushant Vijayan
            </p>
          </div>
        </div>

        {/* Gamification Arcade Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Level Badge */}
          <div className="px-3 py-1 rounded-full bg-cosmic-900 border border-cosmic-750 text-[11px] font-mono font-semibold text-slate-300 hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Lvl {level} Apprentice</span>
          </div>

          {/* Streak Counter */}
          <div className="px-3 py-1 rounded-full bg-neon-pink/15 border border-neon-pink/40 text-neon-pink text-xs font-mono font-bold flex items-center gap-1.5 shadow-glow-pink">
            <Flame className="w-3.5 h-3.5 fill-neon-pink" />
            <span>4 Streak</span>
          </div>

          {/* XP Counter */}
          <div className="px-3 py-1 rounded-full bg-neon-gold/15 border border-neon-gold/40 text-neon-gold text-xs font-mono font-bold flex items-center gap-1.5 shadow-glow-gold">
            <Star className="w-3.5 h-3.5 fill-neon-gold" />
            <span>{xp.toLocaleString()} XP</span>
          </div>

          {/* Audio SFX Toggle */}
          <button
            onClick={() => setSfxOn(!sfxOn)}
            className="p-1.5 rounded-full bg-cosmic-900 border border-cosmic-750 text-slate-400 hover:text-white transition"
            title={sfxOn ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {sfxOn ? <Volume2 className="w-4 h-4 text-neon-mint" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Non-linear Topic Selector Bar */}
      <div className="border-t border-cosmic-750/60 bg-cosmic-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          {/* Horizontal scrollable pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar flex-1 min-w-0">
            {filteredTopics.map((topic) => {
              const Icon = ICON_MAP[topic.icon] || Network;
              const isActive = activeTopicId === topic.id;

              return (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                  className={`btn-arcade flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition shrink-0 ${
                    isActive
                      ? 'bg-neon-purple text-white shadow-glow-purple font-bold border border-neon-purple'
                      : 'bg-cosmic-900/80 border border-cosmic-750 text-slate-400 hover:text-slate-200 hover:border-cosmic-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{topic.title}</span>
                  {topic.badge && (
                    <span className="hidden lg:inline-block px-1.5 py-0.2 rounded-full text-[9px] bg-cosmic-950/60 text-neon-gold border border-neon-gold/30">
                      {topic.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Exam Milestone Filter Dropdown/Pills */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] shrink-0 bg-cosmic-900/90 p-1 rounded-full border border-cosmic-750">
            {[
              { id: 'all', label: 'All' },
              { id: 'test1', label: 'Test 1' },
              { id: 'midterm', label: 'Midterm' },
              { id: 'test2_final', label: 'Test 2 & Final' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => onChangeExamFilter(f.id)}
                className={`px-2.5 py-1 rounded-full transition ${
                  examFilter === f.id
                    ? 'bg-neon-purple/20 text-neon-purple font-bold border border-neon-purple/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
