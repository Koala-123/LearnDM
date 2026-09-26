import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MathView from './components/MathView';
import { TOPICS } from './data/topics';
import { QUESTIONS_DATA } from './data/questionsData';

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
} from 'lucide-react';

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState('relations');
  const [activeScreen, setActiveScreen] = useState('lab'); // 'story' | 'lab' | 'practice' | 'cheatsheet'
  const [examFilter, setExamFilter] = useState('all');
  const [labPayload, setLabPayload] = useState(null);
  const [loadedBanner, setLoadedBanner] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  // Callback when user clicks "Load into Lab" from any challenge card
  const handleLoadLab = (payload) => {
    setLabPayload(payload);
    setActiveScreen('lab');
    setLoadedBanner('Problem parameters loaded directly into the interactive simulation!');
    setTimeout(() => setLoadedBanner(null), 4000);
  };

  return (
    <div className="min-h-screen flex bg-cosmic-950 text-slate-100 cosmic-grid">
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-neon-purple focus:text-white focus:font-bold focus:rounded-xl focus:shadow-glow-purple focus:outline-none focus:ring-2 focus:ring-neon-cyan"
      >
        Skip to main content
      </a>

      {/* 1. Left Sidebar Navigation (Desktop permanent + Mobile/Tablet slide-over drawer) */}
      <Sidebar
        activeTopicId={activeTopicId}
        onSelectTopic={(id) => {
          setActiveTopicId(id);
          setLabPayload(null);
        }}
        examFilter={examFilter}
        onChangeExamFilter={setExamFilter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Content Studio Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Responsive Top Header */}
        <Navbar
          activeTopic={activeTopic}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Main Work Area */}
        <main
          id="main-content"
          role="main"
          tabIndex="-1"
          aria-label={`Learning module: ${activeTopic.title}`}
          className="flex-1 max-w-6xl w-full mx-auto p-3.5 sm:p-5 lg:p-7 space-y-6 focus:outline-none"
        >
          {/* Active Topic Banner */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-cosmic-750 flex flex-wrap items-center justify-between gap-4 shadow-xl shadow-black/40">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
                  {activeTopic.week}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-400">
                  Unit {activeTopic.unitNumber}
                </span>
                {activeTopic.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neon-gold/20 text-neon-gold border border-neon-gold/30">
                    {activeTopic.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                <MathView text={activeTopic.title} />
              </h2>
              <div className="text-sm sm:text-base text-slate-300 font-medium">
                <MathView text={activeTopic.subtitle} />
              </div>
            </div>

            {/* Quick Key Formulas Preview */}
            <div className="hidden sm:flex flex-wrap gap-2 max-w-sm justify-end">
              {activeTopic.keyFormulas.slice(0, 2).map((formula, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-cosmic-950/90 border border-cosmic-750 text-xs sm:text-sm font-mono text-neon-purple shadow-sm"
                >
                  <MathView math={formula} />
                </span>
              ))}
            </div>
          </div>

          {/* Loaded into lab notification toast */}
          {loadedBanner && (
            <div className="p-4 rounded-2xl bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-sm font-semibold flex items-center gap-2.5 animate-fadeIn shadow-glow-cyan">
              <Sparkles className="w-5 h-5 text-neon-cyan shrink-0" />
              <span>{loadedBanner}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC SUB-NAVIGATION HUD TABS (The 4 Screens per Topic - WCAG Tabs Pattern) */}
          {/* ========================================================================= */}
          <div
            role="tablist"
            aria-label="Course module view modes"
            className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 bg-cosmic-900/90 rounded-2xl border border-cosmic-750 shadow-lg"
          >
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
                label: '3. Practice Arena',
                icon: Target,
                badge: `${QUESTIONS_DATA.filter((q) => q.unitId === activeTopic.id).length} Challenges`,
              },
              {
                id: 'cheatsheet',
                label: '4. Cheat Sheet',
                icon: FileText,
                badge: 'Traps',
              },
            ].map((screen) => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;

              return (
                <button
                  key={screen.id}
                  id={`tab-${screen.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${screen.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveScreen(screen.id)}
                  className={`btn-arcade py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
                    isActive
                      ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                      : 'text-slate-300 hover:text-white hover:bg-cosmic-800/60 bg-cosmic-950/60 border border-cosmic-750/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{screen.label}</span>
                  {screen.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold shrink-0 ${
                        isActive
                          ? 'bg-cosmic-950/70 text-neon-gold border border-neon-gold/40'
                          : 'bg-cosmic-900 text-slate-400 border border-cosmic-750'
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
          {/* ACTIVE SCREEN CONTENT DISPLAY (WCAG Tabpanel)                             */}
          {/* ========================================================================= */}
          <div
            id={`panel-${activeScreen}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeScreen}`}
            tabIndex="0"
            className="pt-2 focus:outline-none"
          >
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
              />
            )}

            {activeScreen === 'practice' && (
              <PracticeArenaScreen
                topicId={activeTopic.id}
                onLoadLab={handleLoadLab}
              />
            )}

            {activeScreen === 'cheatsheet' && (
              <CheatSheetScreen topic={activeTopic} />
            )}
          </div>
        </main>

        {/* Studio Footer */}
        <footer role="contentinfo" className="mt-auto border-t border-cosmic-750/80 bg-cosmic-950 py-5 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              LearnDM • Interactive Discrete Mathematics Studio • Theory, Visual Simulations &amp; Problem Solving
            </div>
            <div className="text-xs text-slate-400 font-mono">
              SYS::COSMIC_ARCADE v2.0 • {QUESTIONS_DATA.length} Questions • 8 Labs
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
