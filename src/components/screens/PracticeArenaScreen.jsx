import React, { useState } from 'react';
import MathView from '../MathView';
import { QUESTIONS_DATA } from '../../data/questionsData';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 5;

export default function PracticeArenaScreen({
  topicId,
  onLoadLab,
  onAddXp,
}) {
  const [selectedTier, setSelectedTier] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: selectedIndex }
  const [showExplanation, setShowExplanation] = useState({}); // { [qId]: boolean }

  const questions = QUESTIONS_DATA.filter((q) => q.unitId === topicId);
  const filteredQuestions =
    selectedTier === 'all'
      ? questions
      : questions.filter((q) => q.tier === Number(selectedTier));

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

  const solvedCount = Object.keys(userAnswers).filter(
    (qId) => {
      const q = questions.find((item) => item.id === qId);
      return q && userAnswers[qId] === q.correctIndex;
    }
  ).length;

  const handleSelectOption = (qId, optionIdx, correctIdx) => {
    if (userAnswers[qId] !== undefined) return;

    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));

    if (optionIdx === correctIdx) {
      if (onAddXp) onAddXp(50);
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.8 },
      });
    }
  };

  const handleReset = (qId) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setShowExplanation((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Practice Arena Scoreboard & Stats Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-purple/30 shadow-xl shadow-black/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/40">
              🎯 Practice Arena
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-400">
              {questions.length} Comprehensive Challenges
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Mastery Challenge Deck
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Master core concepts, practice exam-style problems, and conquer challenging edge-case traps.
          </p>
        </div>

        {/* Stats Multiplier Chips */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 text-center">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Solved</div>
            <div className="text-base sm:text-lg font-extrabold text-neon-mint">
              {solvedCount} / {questions.length}
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 text-center">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">XP Yield</div>
            <div className="text-base sm:text-lg font-extrabold text-neon-gold">
              +{solvedCount * 50} XP
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Filter Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-cosmic-900/80 rounded-2xl border border-cosmic-750">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `All (${questions.length})` },
            { id: '1', label: `🟢 Level 1: Understanding (${questions.filter((q) => q.tier === 1).length})` },
            { id: '2', label: `🟡 Level 2: Exam Style (${questions.filter((q) => q.tier === 2).length})` },
            { id: '3', label: `🔴 Level 3: Hard / Traps (${questions.filter((q) => q.tier === 3).length})` },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                setSelectedTier(tier.id);
                setCurrentPage(1);
              }}
              className={`btn-arcade px-3.5 py-2 text-xs sm:text-sm rounded-full border font-semibold transition ${
                selectedTier === tier.id
                  ? 'bg-neon-purple text-white border-neon-purple shadow-glow-purple font-bold'
                  : 'bg-cosmic-950/60 border-cosmic-750 text-slate-300 hover:text-white'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Page status */}
        <div className="text-xs sm:text-sm text-slate-400 font-mono font-medium pr-2">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm sm:text-base bg-cosmic-900/40 rounded-2xl border border-cosmic-750">
          No questions found for this filter.
        </div>
      ) : (
        <div className="space-y-6">
          {currentQuestions.map((q, idx) => {
            const globalIndex = startIndex + idx + 1;
            const userAnswer = userAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-cosmic-900/90 rounded-3xl border border-cosmic-750 p-5 sm:p-7 space-y-4 shadow-xl shadow-black/30 hover:border-cosmic-700 transition"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-cosmic-950 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-200 shrink-0">
                      {globalIndex}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        q.tier === 1
                          ? 'bg-neon-mint/15 border border-neon-mint/40 text-neon-mint'
                          : q.tier === 2
                          ? 'bg-neon-gold/15 border border-neon-gold/40 text-neon-gold'
                          : 'bg-neon-pink/15 border border-neon-pink/40 text-neon-pink'
                      }`}
                    >
                      {q.tier === 1
                        ? '🟢 Level 1: Understanding'
                        : q.tier === 2
                        ? '🟡 Level 2: Exam Style'
                        : '🔴 Level 3: Hard / Trap'}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      <MathView text={q.title} />
                    </h4>
                  </div>

                  {q.loadLabPayload && (
                    <button
                      onClick={() => onLoadLab(q.loadLabPayload)}
                      className="btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/25 flex items-center gap-1.5"
                      title="Load this problem directly into the interactive simulator"
                    >
                      <Play className="w-3.5 h-3.5 fill-neon-cyan" />
                      🎮 Load into Lab
                    </button>
                  )}
                </div>

                {/* Prompt */}
                <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-cosmic-950/70 p-4 sm:p-5 rounded-2xl border border-cosmic-750/70">
                  <MathView text={q.prompt} />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {q.options.map((opt, optIdx) => {
                    let btnClass = 'bg-cosmic-950/80 border-cosmic-750 text-slate-200 hover:border-cosmic-600';
                    if (isAnswered) {
                      if (optIdx === q.correctIndex) {
                        btnClass = 'bg-neon-mint/20 border-neon-mint text-neon-mint font-bold shadow-glow-mint';
                      } else if (optIdx === userAnswer) {
                        btnClass = 'bg-neon-pink/20 border-neon-pink text-neon-pink';
                      } else {
                        btnClass = 'bg-cosmic-950/40 border-cosmic-750/40 text-slate-600 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`btn-arcade p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center justify-between ${btnClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-cosmic-900 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">
                            <MathView text={opt} />
                          </span>
                        </div>
                        {isAnswered && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-neon-mint shrink-0 ml-2" />
                        )}
                        {isAnswered && optIdx === userAnswer && optIdx !== q.correctIndex && (
                          <XCircle className="w-5 h-5 text-neon-pink shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Mathematical Explanation Box */}
                {isAnswered && showExplanation[q.id] && (
                  <div
                    className={`p-5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                      isCorrect
                        ? 'bg-neon-mint/10 border-neon-mint/40 text-slate-200'
                        : 'bg-neon-purple/10 border-neon-purple/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-gold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        {isCorrect ? '🎉 Correct! Step-by-Step Derivation' : '💡 Detailed Mathematical Solution'}
                      </span>
                      <button
                        onClick={() => handleReset(q.id)}
                        className="btn-arcade text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                        title="Retry question"
                      >
                        <RotateCcw className="w-4 h-4" /> Retry
                      </button>
                    </div>
                    <div className="text-sm text-slate-200 leading-relaxed">
                      <MathView text={q.explanation} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="btn-arcade p-2.5 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-cosmic-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`btn-arcade w-10 h-10 rounded-xl border text-sm font-mono font-bold transition ${
                currentPage === pageNum
                  ? 'bg-neon-purple text-white border-neon-purple shadow-glow-purple'
                  : 'bg-cosmic-900 border-cosmic-750 text-slate-400 hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="btn-arcade p-2.5 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-cosmic-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
