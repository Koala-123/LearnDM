import React from 'react';
import MathView from './MathView';
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
  X,
  CheckCircle2,
  ChevronRight,
  Flame,
  Star,
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

export default function Sidebar({
  activeTopicId,
  onSelectTopic,
  examFilter,
  onChangeExamFilter,
  isOpen,
  onClose,
  xp = 1420,
}) {
  const filteredTopics = TOPICS.filter((t) => {
    if (examFilter === 'all') return true;
    if (examFilter === 'test1') return t.examCategory === 'test1';
    if (examFilter === 'midterm') return t.examCategory === 'test1' || t.examCategory === 'midterm';
    if (examFilter === 'test2_final') return t.examCategory === 'test2' || t.examCategory === 'final';
    return true;
  });

  const level = Math.floor(xp / 500) + 1;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-cosmic-950 border-r border-cosmic-750 text-slate-100 select-none">
      {/* 1. Sidebar Brand Header */}
      <div className="p-4 sm:p-5 border-b border-cosmic-750/80 bg-cosmic-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center shadow-glow-purple text-white font-extrabold text-xl shrink-0">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white tracking-tight">
                  LearnDM
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Discrete Mathematics Studio
              </p>
            </div>
          </div>

          {/* Close button for Mobile/Tablet drawer */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-400 hover:text-white hover:border-cosmic-600 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Exam Milestone Filter */}
      <div className="px-4 py-3 border-b border-cosmic-750/60 bg-cosmic-950/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Syllabus Filter
          </span>
          <span className="text-xs font-mono text-neon-cyan font-semibold">
            {filteredTopics.length} Modules
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'test1', label: 'Test 1' },
            { id: 'midterm', label: 'Midterm' },
            { id: 'test2_final', label: 'Test 2 & Final' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChangeExamFilter(f.id)}
              className={`btn-arcade py-1.5 px-2.5 rounded-xl font-medium transition text-center truncate ${
                examFilter === f.id
                  ? 'bg-neon-purple/25 text-neon-purple font-bold border border-neon-purple/50 shadow-glow-purple'
                  : 'bg-cosmic-900/70 border border-cosmic-750/70 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Schedule List (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
          Course Schedule
        </div>

        {filteredTopics.map((topic) => {
          const Icon = ICON_MAP[topic.icon] || Network;
          const isActive = activeTopicId === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => {
                onSelectTopic(topic.id);
                if (onClose) onClose();
              }}
              className={`w-full group text-left p-3 rounded-2xl transition-all flex items-start gap-3 border ${
                isActive
                  ? 'bg-gradient-to-r from-neon-purple/25 via-neon-purple/15 to-transparent border-neon-purple/60 shadow-glow-purple text-white'
                  : 'bg-cosmic-900/40 border-cosmic-750/60 hover:bg-cosmic-900/80 hover:border-cosmic-700 text-slate-300'
              }`}
            >
              {/* Icon Box */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                  isActive
                    ? 'bg-neon-purple text-white shadow-glow-purple'
                    : 'bg-cosmic-950 border border-cosmic-750 text-slate-400 group-hover:text-neon-cyan group-hover:border-neon-cyan/40'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Topic Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-neon-cyan/25 text-neon-cyan border border-neon-cyan/60 shadow-glow-cyan'
                        : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan/50 group-hover:shadow-glow-cyan'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? 'bg-neon-cyan shadow-glow-cyan animate-pulse'
                          : 'bg-neon-cyan/80'
                      }`}
                    />
                    {topic.week}
                  </span>
                  {topic.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cosmic-950/80 text-neon-gold border border-neon-gold/30 shrink-0 truncate max-w-[125px]">
                      {topic.badge}
                    </span>
                  )}
                </div>

                <div
                  className={`text-sm font-bold leading-snug truncate ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  <MathView text={topic.title} />
                </div>

                <div className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-normal">
                  <MathView text={topic.subtitle} />
                </div>
              </div>

              {/* Active Arrow indicator */}
              {isActive && (
                <ChevronRight className="w-4 h-4 text-neon-purple shrink-0 self-center animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Gamified Profile & Arcade Footer */}
      <div className="p-4 border-t border-cosmic-750/80 bg-cosmic-900/70 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            Lvl {level} Apprentice
          </span>
          <span className="text-neon-gold font-bold">
            {xp.toLocaleString()} XP
          </span>
        </div>

        {/* Progress Bar towards Next Level */}
        <div className="w-full bg-cosmic-950 rounded-full h-2 border border-cosmic-750/80 overflow-hidden">
          <div
            className="bg-gradient-to-r from-neon-purple to-neon-pink h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, ((xp % 500) / 500) * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-neon-pink font-semibold">
            <Flame className="w-3.5 h-3.5 fill-neon-pink" /> 4-Day Streak
          </span>
          <span className="text-xs text-slate-500 font-mono">
            8 Core Modules
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed on left, hidden on mobile/tablet) */}
      <aside className="hidden lg:block w-80 shrink-0 h-screen sticky top-0 z-30 shadow-2xl shadow-black/60">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer with Backdrop */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl animate-slideRight z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
