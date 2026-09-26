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
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  AlertCircle,
  Hash,
  ListFilter,
  Check,
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 5;

/**
 * Helper to determine whether a submitted answer matches the solution for any question type.
 */
function isQuestionCorrect(q, answer) {
  if (answer === undefined || answer === null) return false;
  const qType = q.type || 'mcq';

  if (qType === 'mcq') {
    return answer === q.correctIndex;
  }

  if (qType === 'msq') {
    if (!Array.isArray(answer)) return false;
    const correct = q.correctIndices || [];
    if (answer.length !== correct.length) return false;
    const sortedUser = [...answer].sort((a, b) => a - b);
    const sortedCorrect = [...correct].sort((a, b) => a - b);
    return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
  }

  if (qType === 'nat') {
    const userVal = String(answer).trim().toLowerCase();
    const correctVal = String(q.correctAnswer).trim().toLowerCase();
    const userNum = parseFloat(userVal);
    const correctNum = parseFloat(correctVal);

    if (!isNaN(userNum) && !isNaN(correctNum)) {
      const tol = q.tolerance !== undefined ? q.tolerance : 0.001;
      return Math.abs(userNum - correctNum) <= tol;
    }
    return userVal === correctVal;
  }

  return false;
}

export default function PracticeArenaScreen({
  topicId,
  onLoadLab,
}) {
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'mcq' | 'msq' | 'nat'
  const [currentPage, setCurrentPage] = useState(1);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: answer }
  const [showExplanation, setShowExplanation] = useState({}); // { [qId]: boolean }
  const [msqSelections, setMsqSelections] = useState({}); // { [qId]: number[] }
  const [natInputs, setNatInputs] = useState({}); // { [qId]: string }

  const questions = QUESTIONS_DATA.filter((q) => q.unitId === topicId);

  // Filter questions by Tier and Type
  const filteredQuestions = questions.filter((q) => {
    const qType = q.type || 'mcq';
    const matchesTier = selectedTier === 'all' || q.tier === Number(selectedTier);
    const matchesType = selectedType === 'all' || qType === selectedType;
    return matchesTier && matchesType;
  });

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

  // Solved and Attempted counts
  const solvedCount = Object.keys(userAnswers).filter((qId) => {
    const q = questions.find((item) => item.id === qId);
    return q && isQuestionCorrect(q, userAnswers[qId]);
  }).length;

  const attemptedCount = Object.keys(userAnswers).filter((qId) =>
    questions.some((item) => item.id === qId)
  ).length;

  const triggerConfetti = () => {
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.8 },
    });
  };

  // --- Handlers for MCQ ---
  const handleSelectMcq = (qId, optionIdx, correctIdx) => {
    if (userAnswers[qId] !== undefined) return;

    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));

    if (optionIdx === correctIdx) {
      triggerConfetti();
    }
  };

  // --- Handlers for MSQ ---
  const handleToggleMsq = (qId, optionIdx) => {
    if (userAnswers[qId] !== undefined) return;

    setMsqSelections((prev) => {
      const current = prev[qId] || [];
      const next = current.includes(optionIdx)
        ? current.filter((i) => i !== optionIdx)
        : [...current, optionIdx];
      return { ...prev, [qId]: next };
    });
  };

  const handleSubmitMsq = (q) => {
    if (userAnswers[q.id] !== undefined) return;
    const selected = msqSelections[q.id] || [];
    if (selected.length === 0) return;

    setUserAnswers((prev) => ({ ...prev, [q.id]: selected }));
    setShowExplanation((prev) => ({ ...prev, [q.id]: true }));

    if (isQuestionCorrect(q, selected)) {
      triggerConfetti();
    }
  };

  // --- Handlers for NAT ---
  const handleNatInputChange = (qId, val) => {
    setNatInputs((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitNat = (q) => {
    if (userAnswers[q.id] !== undefined) return;
    const val = natInputs[q.id]?.trim();
    if (!val) return;

    setUserAnswers((prev) => ({ ...prev, [q.id]: val }));
    setShowExplanation((prev) => ({ ...prev, [q.id]: true }));

    if (isQuestionCorrect(q, val)) {
      triggerConfetti();
    }
  };

  // --- Common Reset Handler ---
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
    setMsqSelections((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setNatInputs((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. Scoreboard & Stats Banner */}
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
            Solve Single Choice (MCQs), Multi-Select (MSQs), and Numerical Entry (NAT) problems with instant feedback.
          </p>
        </div>

        {/* Stats Chips */}
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
              {questions.length > 0 ? Math.round((attemptedCount / questions.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual Filtering Controls: Tier & Question Type */}
      <div className="p-3 bg-cosmic-900/80 rounded-2xl border border-cosmic-750 space-y-3">
        {/* Tier Filters */}
        <div
          role="group"
          aria-label="Filter problems by tier"
          className="flex flex-wrap items-center justify-between gap-2.5 border-b border-cosmic-750/70 pb-3"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase font-semibold mr-1">
            <span>Tier:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Tiers (${questions.length})` },
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
                className={`btn-arcade px-3 py-1.5 text-xs sm:text-sm rounded-xl border font-semibold transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
                  selectedTier === tier.id
                    ? 'bg-neon-purple text-white border-neon-purple shadow-glow-purple font-bold'
                    : 'bg-cosmic-950/60 border-cosmic-750 text-slate-300 hover:text-white'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 font-medium ml-auto" aria-live="polite">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Question Type Filters */}
        <div
          role="group"
          aria-label="Filter problems by question format"
          className="flex flex-wrap items-center gap-2"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase font-semibold mr-1">
            <span>Format:</span>
          </div>
          {[
            { id: 'all', label: `All Formats (${questions.length})` },
            { id: 'mcq', label: `🔘 Single Choice MCQ (${questions.filter((q) => (q.type || 'mcq') === 'mcq').length})` },
            { id: 'msq', label: `☑️ Multi-Select MSQ (${questions.filter((q) => q.type === 'msq').length})` },
            { id: 'nat', label: `🔢 Numerical NAT (${questions.filter((q) => q.type === 'nat').length})` },
          ].map((typeItem) => (
            <button
              key={typeItem.id}
              aria-pressed={selectedType === typeItem.id}
              onClick={() => {
                setSelectedType(typeItem.id);
                setCurrentPage(1);
              }}
              className={`btn-arcade px-3 py-1.5 text-xs sm:text-sm rounded-xl border font-semibold transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${
                selectedType === typeItem.id
                  ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan shadow-glow-cyan font-bold'
                  : 'bg-cosmic-950/60 border-cosmic-750 text-slate-300 hover:text-white'
              }`}
            >
              {typeItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm sm:text-base bg-cosmic-900/40 rounded-2xl border border-cosmic-750">
          No questions found matching your filter criteria.
        </div>
      ) : (
        <div className="space-y-6">
          {currentQuestions.map((q, idx) => {
            const globalIndex = startIndex + idx + 1;
            const qType = q.type || 'mcq';
            const userAnswer = userAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && isQuestionCorrect(q, userAnswer);

            return (
              <article
                key={q.id}
                aria-labelledby={`q-title-${q.id}`}
                className="bg-cosmic-900/90 rounded-3xl border border-cosmic-750 p-5 sm:p-7 space-y-4 shadow-xl shadow-black/30 hover:border-cosmic-700 transition"
              >
                {/* Header: Global Number, Tier, Type Badge, and Load Lab */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-full bg-cosmic-950 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-200 shrink-0"
                      aria-label={`Question ${globalIndex}`}
                    >
                      {globalIndex}
                    </span>

                    {/* Tier Badge */}
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

                    {/* Question Type Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                        qType === 'mcq'
                          ? 'bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan'
                          : qType === 'msq'
                          ? 'bg-neon-purple/15 border border-neon-purple/40 text-neon-purple'
                          : 'bg-neon-gold/15 border border-neon-gold/40 text-neon-gold'
                      }`}
                    >
                      {qType === 'mcq' && '🔘 Single Choice'}
                      {qType === 'msq' && '☑️ Multiple Select (MSQ)'}
                      {qType === 'nat' && '🔢 Numerical Answer (NAT)'}
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
                <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-cosmic-950/70 p-4 sm:p-5 rounded-2xl border border-cosmic-750/70 space-y-1">
                  <MathView text={q.prompt} />
                  {qType === 'msq' && (
                    <p className="text-xs text-neon-purple/90 font-semibold italic">
                      *(Select all correct options. One or more choices may be valid.)*
                    </p>
                  )}
                  {qType === 'nat' && (
                    <p className="text-xs text-neon-gold/90 font-semibold italic">
                      *(Enter an exact integer or decimal value in the field below.)*
                    </p>
                  )}
                </div>

                {/* ========================================================= */}
                {/* 1. MCQ Single Choice Radio View                          */}
                {/* ========================================================= */}
                {qType === 'mcq' && (
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
                          onClick={() => handleSelectMcq(q.id, optIdx, q.correctIndex)}
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
                )}

                {/* ========================================================= */}
                {/* 2. MSQ Multi-Select Checkbox View                         */}
                {/* ========================================================= */}
                {qType === 'msq' && (
                  <div className="space-y-3 pt-1">
                    <div
                      role="group"
                      aria-label={`Multiple select choices for question ${globalIndex}`}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {q.options.map((opt, optIdx) => {
                        const isSelectedBeforeSubmit = (msqSelections[q.id] || []).includes(optIdx);
                        const isSelectedSubmitted = Array.isArray(userAnswer) && userAnswer.includes(optIdx);
                        const isCorrectOption = (q.correctIndices || []).includes(optIdx);

                        let btnClass = 'bg-cosmic-950/80 border-cosmic-750 text-slate-200 hover:border-cosmic-600';

                        if (!isAnswered) {
                          if (isSelectedBeforeSubmit) {
                            btnClass = 'bg-neon-purple/20 border-neon-purple text-white shadow-glow-purple';
                          }
                        } else {
                          // Answer has been submitted: provide detailed per-choice feedback
                          if (isSelectedSubmitted && isCorrectOption) {
                            btnClass = 'bg-neon-mint/20 border-neon-mint text-neon-mint font-bold shadow-glow-mint';
                          } else if (isSelectedSubmitted && !isCorrectOption) {
                            btnClass = 'bg-neon-pink/20 border-neon-pink text-neon-pink';
                          } else if (!isSelectedSubmitted && isCorrectOption) {
                            btnClass = 'bg-neon-gold/15 border-dashed border-neon-gold text-neon-gold';
                          } else {
                            btnClass = 'bg-cosmic-950/40 border-cosmic-750/40 text-slate-600 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            role="checkbox"
                            aria-checked={isAnswered ? isSelectedSubmitted : isSelectedBeforeSubmit}
                            disabled={isAnswered}
                            onClick={() => handleToggleMsq(q.id, optIdx)}
                            className={`btn-arcade p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center justify-between focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none ${btnClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-cosmic-900 border border-cosmic-750 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shrink-0">
                                {isAnswered ? (
                                  isSelectedSubmitted ? (
                                    <Check className="w-3.5 h-3.5 text-white" />
                                  ) : (
                                    String.fromCharCode(65 + optIdx)
                                  )
                                ) : isSelectedBeforeSubmit ? (
                                  <CheckSquare className="w-4 h-4 text-neon-purple" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500" />
                                )}
                              </span>
                              <span className="leading-snug">
                                <MathView text={opt} />
                              </span>
                            </div>

                            {/* Status Icon Indicator */}
                            {isAnswered && (
                              <div className="shrink-0 ml-2">
                                {isSelectedSubmitted && isCorrectOption && (
                                  <CheckCircle2 className="w-5 h-5 text-neon-mint" aria-label="Correct selection" />
                                )}
                                {isSelectedSubmitted && !isCorrectOption && (
                                  <XCircle className="w-5 h-5 text-neon-pink" aria-label="Incorrect selection" />
                                )}
                                {!isSelectedSubmitted && isCorrectOption && (
                                  <AlertCircle className="w-5 h-5 text-neon-gold" aria-label="Missed correct option" />
                                )}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit MSQ Selection Button */}
                    {!isAnswered && (
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <span className="text-xs text-slate-400 font-mono">
                          {(msqSelections[q.id]?.length || 0)} option(s) selected
                        </span>
                        <button
                          onClick={() => handleSubmitMsq(q)}
                          disabled={(msqSelections[q.id]?.length || 0) === 0}
                          className="btn-arcade px-5 py-2.5 rounded-xl bg-neon-purple text-white font-bold text-xs sm:text-sm border border-neon-purple shadow-glow-purple disabled:opacity-40 disabled:pointer-events-none hover:bg-neon-purple/90 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                        >
                          <CheckSquare className="w-4 h-4" />
                          <span>Submit Selection</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================= */}
                {/* 3. NAT Numerical Answer Type Input View                   */}
                {/* ========================================================= */}
                {qType === 'nat' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitNat(q);
                    }}
                    className="space-y-3 pt-1"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <input
                          id={`nat-input-${q.id}`}
                          type="text"
                          inputMode="numeric"
                          disabled={isAnswered}
                          placeholder={q.placeholder || 'Enter integer answer...'}
                          value={isAnswered ? userAnswer : (natInputs[q.id] ?? '')}
                          onChange={(e) => handleNatInputChange(q.id, e.target.value)}
                          className={`w-full px-4 py-3 rounded-2xl bg-cosmic-950/90 border font-mono text-base sm:text-lg font-bold text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                            isAnswered
                              ? isCorrect
                                ? 'border-neon-mint shadow-glow-mint text-neon-mint focus:ring-neon-mint'
                                : 'border-neon-pink text-neon-pink focus:ring-neon-pink'
                              : 'border-cosmic-750 focus:border-neon-gold focus:ring-neon-gold/50'
                          }`}
                        />
                        {q.unit && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 font-bold uppercase">
                            {q.unit}
                          </span>
                        )}
                      </div>

                      {!isAnswered ? (
                        <button
                          type="submit"
                          disabled={!natInputs[q.id]?.trim()}
                          className="btn-arcade px-5 py-3 rounded-2xl bg-neon-gold/20 border border-neon-gold/50 text-neon-gold hover:bg-neon-gold/30 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-glow-gold focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                        >
                          <Hash className="w-4 h-4" />
                          <span>Submit Answer</span>
                        </button>
                      ) : (
                        <div
                          className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-mono font-bold flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-neon-mint/20 border-neon-mint text-neon-mint shadow-glow-mint'
                              : 'bg-neon-pink/20 border-neon-pink text-neon-pink'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-neon-mint shrink-0" />
                              <span>Exact Match: {q.correctAnswer}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-neon-pink shrink-0" />
                              <span>
                                Your Answer: {userAnswer} • Correct: {q.correctAnswer}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </form>
                )}

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

      {/* 4. Pagination Controls */}
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
