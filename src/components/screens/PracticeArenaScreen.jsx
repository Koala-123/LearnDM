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
      <section
        aria-label="Practice Arena Overview"
        className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-purple/30 shadow-xl shadow-black/40"
      >
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
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Completion</div>
            <div className="text-base sm:text-lg font-extrabold text-neon-cyan">
              {questions.length > 0 ? Math.round((solvedCount / questions.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Filter Tabs & Controls */}
      <div
        role="group"
        aria-label="Filter problems by tier"
        className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-cosmic-900/80 rounded-2xl border border-cosmic-750"
      >
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `All (${questions.length})` },
            { id: '1', label: `🟢 Tier 1: Understanding (${questions.filter((q) => q.tier === 1).length})` },
            { id: '2', label: `🟡 Tier 2: Exam Style (${questions.filter((q) => q.tier === 2).length})` },
            { id: '3', label: `🔴 Tier 3: Hard / Traps (${questions.filter((q) => q.tier === 3).length})` },
          ].map((tier) => (
            <button
              key={tier.id}
              aria-pressed={selectedTier === tier.id}
              onClick={() => {
                setSelectedTier(tier.id);
                setCurrentPage(1);
              }}
              className={`btn-arcade px-3.5 py-2 text-xs sm:text-sm rounded-full border font-semibold transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
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
        <div className="text-xs sm:text-sm text-slate-400 font-mono font-medium pr-2" aria-live="polite">
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
              <article
                key={q.id}
                aria-labelledby={`q-title-${q.id}`}
                className="bg-cosmic-900/90 rounded-3xl border border-cosmic-750 p-5 sm:p-7 space-y-4 shadow-xl shadow-black/30 hover:border-cosmic-700 transition"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-cosmic-950 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-200 shrink-0" aria-label={`Question ${globalIndex}`}>
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
                        ? '🟢 Tier 1: Understanding'
                        : q.tier === 2
                        ? '🟡 Tier 2: Exam Style'
                        : '🔴 Tier 3: Hard / Trap'}
                    </span>
                    <h4 id={`q-title-${q.id}`} className="text-base sm:text-lg font-bold text-white tracking-tight">
                      <MathView text={q.title} />
                    </h4>
                  </div>

                  {q.loadLabPayload && (
                    <button
                      onClick={() => onLoadLab(q.loadLabPayload)}
                      className="btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/25 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                      aria-label={`Load problem ${globalIndex} into lab simulator`}
                    >
                      <Play className="w-3.5 h-3.5 fill-neon-cyan" aria-hidden="true" />
                      <span>Load into Lab</span>
                    </button>
                  )}
                </div>

                {/* Prompt */}
                <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-cosmic-950/70 p-4 sm:p-5 rounded-2xl border border-cosmic-750/70">
                  <MathView text={q.prompt} />
                </div>

                {/* Options Grid */}
                <div
                  role="radiogroup"
                  aria-label={`Options for question ${globalIndex}`}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
                >
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
                        role="radio"
                        aria-checked={isAnswered && optIdx === userAnswer}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
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
                        {isAnswered && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-neon-mint shrink-0 ml-2" aria-label="Correct answer" />
                        )}
                        {isAnswered && optIdx === userAnswer && optIdx !== q.correctIndex && (
                          <XCircle className="w-5 h-5 text-neon-pink shrink-0 ml-2" aria-label="Incorrect answer" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Mathematical Explanation Box */}
                {isAnswered && showExplanation[q.id] && (
                  <div
                    role="region"
                    aria-live="polite"
                    aria-label={`Explanation for question ${globalIndex}`}
                    className={`p-5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                      isCorrect
                        ? 'bg-neon-mint/10 border-neon-mint/40 text-slate-200'
                        : 'bg-neon-purple/10 border-neon-purple/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-gold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        {isCorrect ? '🎉 Correct! Step-by-Step Derivation' : '💡 Detailed Mathematical Solution'}
                      </span>
                      <button
                        onClick={() => handleReset(q.id)}
                        className="btn-arcade text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1 font-semibold focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                        aria-label={`Retry question ${globalIndex}`}
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" /> Retry
                      </button>
                    </div>
                    <div className="text-sm text-slate-200 leading-relaxed">
                      <MathView text={q.explanation} />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Practice questions pagination" className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="btn-arcade p-2.5 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-cosmic-600 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
              className={`btn-arcade w-10 h-10 rounded-xl border text-sm font-mono font-bold transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
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
            className="btn-arcade p-2.5 rounded-xl bg-cosmic-900 border border-cosmic-750 text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-cosmic-600 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
