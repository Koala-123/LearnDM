import React, { useState } from 'react';
import MathView from './MathView';
import { QUESTIONS_DATA } from '../data/questionsData';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function QuestionPanel({ topicId, onLoadLab }) {
  const [selectedTier, setSelectedTier] = useState('all');
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: selectedIndex }
  const [showExplanation, setShowExplanation] = useState({}); // { [qId]: boolean }

  const questions = QUESTIONS_DATA.filter((q) => q.unitId === topicId);
  const filteredQuestions =
    selectedTier === 'all'
      ? questions
      : questions.filter((q) => q.tier === Number(selectedTier));

  const handleSelectOption = (qId, optionIdx, correctIdx) => {
    if (userAnswers[qId] !== undefined) return; // already answered

    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));

    if (optionIdx === correctIdx) {
      confetti({
        particleCount: 50,
        spread: 60,
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
    <div className="space-y-6">
      {/* Tier Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-medium">Difficulty:</span>
        {[
          { id: 'all', label: 'All Levels' },
          { id: '1', label: '🟢 Level 1: Understanding' },
          { id: '2', label: '🟡 Level 2: Exam Style' },
          { id: '3', label: '🔴 Level 3: Hard / Trap' },
        ].map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`px-3 py-1 text-xs rounded-lg border transition ${
              selectedTier === tier.id
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/60 font-semibold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-sm">
          No questions available for this filter.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-4 shadow-lg shadow-black/20"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        q.tier === 1
                          ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                          : q.tier === 2
                          ? 'bg-amber-950 border border-amber-500/40 text-amber-300'
                          : 'bg-rose-950 border border-rose-500/40 text-rose-300'
                      }`}
                    >
                      {q.tier === 1
                        ? '🟢 Understanding'
                        : q.tier === 2
                        ? '🟡 Exam Style'
                        : '🔴 Hard / Trap'}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{q.title}</span>
                  </div>

                  {q.loadLabPayload && (
                    <button
                      onClick={() => onLoadLab(q.loadLabPayload)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900 transition flex items-center gap-1.5"
                      title="Load this problem into the interactive visualizer"
                    >
                      <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                      Load into Lab
                    </button>
                  )}
                </div>

                {/* Prompt */}
                <div className="text-sm text-slate-100 font-medium leading-relaxed">
                  <MathView text={q.prompt} />
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isAnswered) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (optIdx === userAnswer) {
                        btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>
                            <MathView text={opt} />
                          </span>
                        </div>
                        {isAnswered && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isAnswered && optIdx === userAnswer && optIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswered && showExplanation[q.id] && (
                  <div
                    className={`p-4 rounded-xl border space-y-2 animate-fadeIn ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-200/90'
                        : 'bg-indigo-950/30 border-indigo-600/40 text-indigo-200/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Step-by-Step Mathematical Explanation
                      </span>
                      <button
                        onClick={() => handleReset(q.id)}
                        className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                        title="Retry question"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                    <div className="text-xs leading-relaxed text-slate-300">
                      <MathView text={q.explanation} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
