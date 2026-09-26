import React, { useEffect } from 'react';
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
  ChevronRight,
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
}) {
  // Listen for Escape key to close mobile/tablet drawer (WCAG modal requirement)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTopics = TOPICS.filter((t) => {
    if (examFilter === 'all') return true;
    if (examFilter === 'core') return t.badge === 'Core';
    if (examFilter === 'test1') return t.examCategory === 'test1';
    if (examFilter === 'midterm') return t.examCategory === 'midterm';
    if (examFilter === 'test2') return t.examCategory === 'test2';
    if (examFilter === 'final') return t.examCategory === 'final';
    return true;
  });

  const sidebarContent = (
    <div className="flex flex-col h-full bg-cosmic-950 border-r border-cosmic-750 text-slate-100 select-none">
      {/* 1. Sidebar Brand Header */}
      <div className="p-4 sm:p-5 border-b border-cosmic-750/80 bg-cosmic-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center shadow-glow-purple text-white font-extrabold text-xl shrink-0"
              aria-hidden="true"
            >
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  LearnDM
                </span>
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
            className="lg:hidden p-2 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-400 hover:text-white hover:border-cosmic-600 transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
            aria-label="Close course units sidebar"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2. Exam Milestone Filter */}
      <div className="px-4 py-3 border-b border-cosmic-750/60 bg-cosmic-950/80" role="region" aria-label="Syllabus filter">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Syllabus Filter
          </span>
          <span className="text-xs font-mono text-neon-cyan font-semibold">
            {filteredTopics.length} Modules
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs" role="group" aria-label="Filter modules by exam">
          {[
            { id: 'all', label: 'All' },
            { id: 'core', label: 'Core' },
            { id: 'test1', label: 'Test 1' },
            { id: 'midterm', label: 'Midterm' },
            { id: 'test2', label: 'Test 2' },
            { id: 'final', label: 'Final' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChangeExamFilter(f.id)}
              aria-pressed={examFilter === f.id}
              className={`btn-arcade py-1.5 px-2 rounded-xl font-medium transition text-center truncate focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
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
      <nav
        className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar"
        aria-label="Course modules navigation"
      >
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
              aria-current={isActive ? 'page' : undefined}
              className={`w-full group text-left p-3 rounded-2xl transition-all flex items-start gap-3 border focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
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
                aria-hidden="true"
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
                      aria-hidden="true"
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
                <ChevronRight
                  className="w-4 h-4 text-neon-purple shrink-0 self-center animate-pulse"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* 4. Clean Course Summary Footer (Zero gamification/XP/Level clutter) */}
      <div className="p-4 border-t border-cosmic-750/80 bg-cosmic-900/70 flex items-center justify-between text-xs" role="region" aria-label="Course status">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-mint" aria-hidden="true" />
          <span className="text-slate-300 font-semibold">8 Course Modules</span>
        </div>
        <span className="font-mono text-slate-400 text-xs font-medium">Self-Paced</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed on left, hidden on mobile/tablet) */}
      <aside
        className="hidden lg:block w-80 shrink-0 h-screen sticky top-0 z-30 shadow-2xl shadow-black/60"
        aria-label="Course schedule sidebar"
      >
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer with Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Course units navigation drawer"
        >
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
