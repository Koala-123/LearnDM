import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MathView from './components/MathView';
import { TOPICS } from './data/topics';

// Dedicated Full-Width Screens
import StoryIntuitionScreen from './components/screens/StoryIntuitionScreen';
import InteractiveLabScreen from './components/screens/InteractiveLabScreen';
import PracticeArenaScreen from './components/screens/PracticeArenaScreen';
import CheatSheetScreen from './components/screens/CheatSheetScreen';

import {
  BookOpen,
  FlaskConical,
  Target,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState('relations');
  const [activeScreen, setActiveScreen] = useState('lab'); // 'story' | 'lab' | 'practice' | 'cheatsheet'
  const [examFilter, setExamFilter] = useState('all');
  const [labPayload, setLabPayload] = useState(null);
  const [xp, setXp] = useState(1420);
  const [loadedBanner, setLoadedBanner] = useState(null);

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  const handleAddXp = (amount = 50) => {
    setXp((prev) => prev + amount);
  };

  // Callback when user clicks "Load into Lab" from any challenge card
  const handleLoadLab = (payload) => {
    setLabPayload(payload);
    setActiveScreen('lab');
    setLoadedBanner('Problem parameters loaded directly into the interactive simulation!');
    setTimeout(() => setLoadedBanner(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 text-slate-100 cosmic-grid">
      {/* Top Navbar */}
      <Navbar
        activeTopicId={activeTopicId}
        onSelectTopic={(id) => {
          setActiveTopicId(id);
          setLabPayload(null);
        }}
        examFilter={examFilter}
        onChangeExamFilter={setExamFilter}
        xp={xp}
      />

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Active Topic Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-cosmic-750 flex flex-wrap items-center justify-between gap-4 shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
                {activeTopic.week}
              </span>
              <span className="text-xs text-slate-400">Unit {activeTopic.unitNumber}</span>
              {activeTopic.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neon-gold/20 text-neon-gold border border-neon-gold/30">
                  {activeTopic.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {activeTopic.subtitle}
            </p>
          </div>

          {/* Quick Key Formulas Preview */}
          <div className="hidden lg:flex flex-wrap gap-2 max-w-md justify-end">
            {activeTopic.keyFormulas.slice(0, 2).map((formula, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-cosmic-950/80 border border-cosmic-750 text-xs font-mono text-neon-purple shadow-sm"
              >
                <MathView math={formula} />
              </span>
            ))}
          </div>
        </div>

        {/* Loaded into lab notification toast */}
        {loadedBanner && (
          <div className="p-3.5 rounded-2xl bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-neon-cyan shrink-0" />
            <span>{loadedBanner}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOPIC SUB-NAVIGATION HUD TABS (The 4 Screens per Topic)                  */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 p-1.5 bg-cosmic-900/90 rounded-2xl border border-cosmic-750 overflow-x-auto no-scrollbar shadow-lg">
          {[
            {
              id: 'story',
              label: '1. Story & Intuition',
              icon: BookOpen,
              badge: null,
            },
            {
              id: 'lab',
              label: '2. Interactive Lab',
              icon: FlaskConical,
              badge: 'Live',
            },
            {
              id: 'practice',
              label: '3. Practice Arena (15+ Challenges)',
              icon: Target,
              badge: '+50 XP',
            },
            {
              id: 'cheatsheet',
              label: '4. Cheat Sheet & Secret Traps',
              icon: FileText,
              badge: 'Exams',
            },
          ].map((screen) => {
            const Icon = screen.icon;
            const isActive = activeScreen === screen.id;

            return (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`btn-arcade flex-1 min-w-[170px] sm:min-w-0 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                    : 'text-slate-400 hover:text-white hover:bg-cosmic-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{screen.label}</span>
                {screen.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                      isActive
                        ? 'bg-cosmic-950/60 text-neon-gold border border-neon-gold/30'
                        : 'bg-cosmic-950 text-slate-400 border border-cosmic-750'
                    }`}
                  >
                    {screen.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE SCREEN CONTENT DISPLAY                                             */}
        {/* ========================================================================= */}
        <div className="pt-2">
          {activeScreen === 'story' && (
            <StoryIntuitionScreen
              topic={activeTopic}
              onNavigateToLab={() => setActiveScreen('lab')}
            />
          )}

          {activeScreen === 'lab' && (
            <InteractiveLabScreen
              topic={activeTopic}
              labPayload={labPayload}
              onLoadLabPayload={handleLoadLab}
              onAddXp={handleAddXp}
            />
          )}

          {activeScreen === 'practice' && (
            <PracticeArenaScreen
              topicId={activeTopic.id}
              onLoadLab={handleLoadLab}
              onAddXp={handleAddXp}
            />
          )}

          {activeScreen === 'cheatsheet' && (
            <CheatSheetScreen topic={activeTopic} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-cosmic-750/80 bg-cosmic-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Plaksha University • Discrete Mathematics (Sem 3) • Instructors: Dr. Saeed Salehi & Dr. Sushant Vijayan
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            SYS::COSMIC_ARCADE v2.0 • 120 Questions • 8 Computational Engines
          </div>
        </div>
      </footer>
    </div>
  );
}
