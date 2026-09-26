import React, { useState } from 'react';
import MathView from '../MathView';
import confetti from 'canvas-confetti';
import {
  FlaskConical,
  Sparkles,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Zap,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

// Labs
import RelationLab from '../labs/RelationLab';
import ProofRecurrenceLab from '../labs/ProofRecurrenceLab';
import LogicTruthTableLab from '../labs/LogicTruthTableLab';
import PosetHasseLab from '../labs/PosetHasseLab';
import ModularArithmeticLab from '../labs/ModularArithmeticLab';
import CayleyGroupLab from '../labs/CayleyGroupLab';
import CombinatoricsLab from '../labs/CombinatoricsLab';
import GraphTheoryLab from '../labs/GraphTheoryLab';

export default function InteractiveLabScreen({
  topic,
  labPayload,
  onLoadLabPayload,
}) {
  const [selectedQuestOption, setSelectedQuestOption] = useState(null);
  const [isQuestSubmitted, setIsQuestSubmitted] = useState(false);
  const [questSolved, setQuestSolved] = useState(false);
  const [questWrongAttempts, setQuestWrongAttempts] = useState([]);

  const totalOptions = topic.quickQuest?.options?.length || 4;
  const maxAttempts = Math.max(1, totalOptions - 1);
  const isInProgress = !isQuestSubmitted && questWrongAttempts.length > 0;
  const attemptsRemaining = Math.max(0, maxAttempts - questWrongAttempts.length);

  const labGuide = topic.labGuide || {
    mission: `Master ${topic.title} through interactive computational simulation.`,
    invariant: 'Invariant: Invariant checks active',
    step1: { title: 'Configure Inputs', desc: 'Set initial elements and variables.' },
    step2: { title: 'Simulate & Mutate', desc: 'Interact with the sandbox controls.' },
    step3: { title: 'Inspect Algorithmic Output', desc: 'Analyze generated results and proofs.' },
  };

  const handleQuestSelect = (idx) => {
    if (isQuestSubmitted) return;
    if (questWrongAttempts.includes(idx)) return;

    if (idx === topic.quickQuest.correctIndex) {
      setSelectedQuestOption(idx);
      setIsQuestSubmitted(true);
      setQuestSolved(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } else {
      const updatedWrong = [...questWrongAttempts, idx];
      setQuestWrongAttempts(updatedWrong);
      if (updatedWrong.length >= maxAttempts) {
        setSelectedQuestOption(idx);
        setIsQuestSubmitted(true);
        setQuestSolved(false);
      }
    }
  };

  const resetQuest = () => {
    setSelectedQuestOption(null);
    setIsQuestSubmitted(false);
    setQuestSolved(false);
    setQuestWrongAttempts([]);
  };

  const renderLab = () => {
    const key = JSON.stringify(labPayload) + topic.id;
    switch (topic.labId) {
      case 'relations':
        return <RelationLab key={key} initialData={labPayload} />;
      case 'proofs':
        return <ProofRecurrenceLab key={key} initialData={labPayload} />;
      case 'logic':
        return <LogicTruthTableLab key={key} initialData={labPayload} />;
      case 'posets':
        return <PosetHasseLab key={key} initialData={labPayload} />;
      case 'modular':
        return <ModularArithmeticLab key={key} initialData={labPayload} />;
      case 'groups':
        return <CayleyGroupLab key={key} initialData={labPayload} />;
      case 'combinatorics':
        return <CombinatoricsLab key={key} initialData={labPayload} />;
      case 'graphs':
        return <GraphTheoryLab key={key} initialData={labPayload} />;
      default:
        return <div>Select a topic above</div>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. TOPIC MISSION & 3-STEP "HOW TO INTERACT" GUIDE BANNER                  */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-cyan/40 p-5 sm:p-7 shadow-xl shadow-black/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cosmic-750 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Simulation Mission
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400">Unit {topic.unitNumber}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>💡</span>
              <MathView text={topic.title} />
              <span>Interactive Lab</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-200 mt-1 max-w-3xl font-medium">
              <MathView text={labGuide.mission} />
            </p>
          </div>

          {/* Live Invariant Pill */}
          <div className="px-4 py-2 rounded-2xl bg-neon-mint/10 border border-neon-mint/30 text-neon-mint text-xs sm:text-sm font-mono flex items-center gap-2 shadow-glow-mint font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-mint animate-pulse" />
            <span>
              <MathView text={labGuide.invariant} />
            </span>
          </div>
        </div>

        {/* 3 Numbered Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-2 hover:border-neon-cyan/50 transition">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-xs font-mono font-bold flex items-center justify-center shrink-0">
                01
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                <MathView text={labGuide.step1.title} />
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-9">
              <MathView text={labGuide.step1.desc} />
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-2 hover:border-neon-purple/50 transition">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-xs font-mono font-bold flex items-center justify-center shrink-0">
                02
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                <MathView text={labGuide.step2.title} />
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-9">
              <MathView text={labGuide.step2.desc} />
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-2 hover:border-neon-mint/50 transition">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-neon-mint/20 border border-neon-mint/40 text-neon-mint text-xs font-mono font-bold flex items-center justify-center shrink-0">
                03
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                <MathView text={labGuide.step3.title} />
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-9">
              <MathView text={labGuide.step3.desc} />
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LAB WORKSPACE                                                    */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-cosmic-900/90 border border-cosmic-750 p-5 sm:p-7 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-cosmic-750">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Active Simulation Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Interactive Discrete Mathematics Sandbox • Pure Client-Side Computation
              </p>
            </div>
          </div>
        </div>

        {renderLab()}
      </div>

      {/* ========================================================================= */}
      {/* 3. QUICK QUEST MINI-CARD                                                  */}
      {/* ========================================================================= */}
      {topic.quickQuest && (
        <section
          aria-label="Interactive Quick Quest Challenge"
          className="rounded-3xl bg-gradient-to-r from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-pink/30 p-5 sm:p-7 shadow-xl space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-pink/20 text-neon-pink border border-neon-pink/40 flex items-center gap-1.5 shadow-glow-pink">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                ⚡ QUICK QUEST
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                Instant Concept Check
              </span>
            </div>

            {topic.quickQuest.loadPayload && (
              <button
                onClick={() => onLoadLabPayload(topic.quickQuest.loadPayload)}
                className="btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/30 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                aria-label="Load problem parameters directly into simulator"
              >
                <Play className="w-3.5 h-3.5 fill-neon-cyan" aria-hidden="true" />
                <span>Load Parameters into Lab</span>
              </button>
            )}
          </div>

          <div className="text-base sm:text-lg text-white font-semibold leading-relaxed">
            <MathView text={topic.quickQuest.question} />
          </div>

          {/* Attempts Status Banners */}
          {isInProgress && (
            <div
              role="status"
              aria-live="polite"
              className="p-3.5 rounded-xl bg-neon-pink/10 border border-neon-pink/30 text-xs sm:text-sm text-neon-pink font-medium flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Incorrect choice. Try another option!</span>
              </div>
              <span className="font-mono text-xs text-slate-300 px-2.5 py-0.5 rounded-full bg-cosmic-950/80 border border-cosmic-750">
                {attemptsRemaining} attempt{attemptsRemaining === 1 ? '' : 's'} remaining
              </span>
            </div>
          )}

          {isQuestSubmitted && !questSolved && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-300 font-medium flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-neon-gold shrink-0" aria-hidden="true" />
                <span>All {maxAttempts} attempts used. Correct answer revealed below.</span>
              </div>
              <span className="font-mono text-xs text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-cosmic-950/80 border border-cosmic-750">
                0 attempts left
              </span>
            </div>
          )}

          {!isQuestSubmitted && !isInProgress && (
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
              <span>Single Choice</span>
              <span>
                {maxAttempts} attempt{maxAttempts === 1 ? '' : 's'} allowed
              </span>
            </div>
          )}

          <div
            role="radiogroup"
            aria-label="Quick quest multiple choice options"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {topic.quickQuest.options.map((opt, optIdx) => {
              const isWrongAttempt = questWrongAttempts.includes(optIdx);
              const isCorrectOption = optIdx === topic.quickQuest.correctIndex;

              let btnClass = 'bg-cosmic-950/80 border-cosmic-750 text-slate-200 hover:border-cosmic-600';
              let isDisabled = false;

              if (isQuestSubmitted) {
                isDisabled = true;
                if (questSolved) {
                  if (isCorrectOption) {
                    btnClass = 'bg-neon-mint/20 border-neon-mint text-neon-mint font-bold shadow-glow-mint';
                  } else if (isWrongAttempt) {
                    btnClass = 'bg-neon-pink/20 border-neon-pink text-neon-pink opacity-70';
                  } else {
                    btnClass = 'bg-cosmic-950/40 border-cosmic-750/40 text-slate-600 opacity-50';
                  }
                } else {
                  // attempts exhausted
                  if (isCorrectOption) {
                    btnClass = 'bg-neon-mint/20 border-neon-mint text-neon-mint font-bold shadow-glow-mint';
                  } else if (isWrongAttempt) {
                    btnClass = 'bg-neon-pink/20 border-neon-pink text-neon-pink';
                  } else {
                    btnClass = 'bg-cosmic-950/40 border-cosmic-750/40 text-slate-600 opacity-50';
                  }
                }
              } else {
                // In progress or untouched
                if (isWrongAttempt) {
                  isDisabled = true;
                  btnClass = 'bg-neon-pink/15 border-neon-pink/40 text-neon-pink/70 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={optIdx}
                  role="radio"
                  aria-checked={isQuestSubmitted && (questSolved ? isCorrectOption : isWrongAttempt)}
                  disabled={isDisabled}
                  onClick={() => handleQuestSelect(optIdx)}
                  className={`btn-arcade p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center justify-between focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cosmic-900 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">
                      <MathView text={opt} />
                    </span>
                  </div>
                  {isQuestSubmitted && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-neon-mint shrink-0 ml-2" aria-label="Correct answer" />
                  )}
                  {(isWrongAttempt || (isQuestSubmitted && optIdx === selectedQuestOption && !questSolved)) && (
                    <XCircle className="w-5 h-5 text-neon-pink shrink-0 ml-2" aria-label="Incorrect answer" />
                  )}
                </button>
              );
            })}
          </div>

          {isQuestSubmitted && (
            <div
              role="region"
              aria-live="polite"
              aria-label="Solution explanation and derivation"
              className={`p-5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                questSolved ? 'bg-neon-mint/10 border-neon-mint/40 text-slate-200' : 'bg-neon-purple/10 border-neon-purple/40 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-neon-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  {questSolved ? '🎉 Correct! Step-by-Step Derivation' : '💡 Explanation & Derivation'}
                </span>
                <button
                  onClick={resetQuest}
                  className="btn-arcade text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1 font-semibold focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                  aria-label="Retry quick quest"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Retry
                </button>
              </div>
              <div className="text-sm text-slate-200 leading-relaxed">
                <MathView text={topic.quickQuest.explanation} />
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
