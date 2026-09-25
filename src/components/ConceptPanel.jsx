import React from 'react';
import MathView from './MathView';
import { CONCEPTS_DATA } from '../data/conceptsData';
import { BookOpen, AlertTriangle, Award, ExternalLink } from 'lucide-react';

export default function ConceptPanel({ topic }) {
  const concept = CONCEPTS_DATA[topic.id];

  if (!concept) {
    return (
      <div className="p-6 text-slate-500 text-sm">
        Concept notes loading for this unit...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Textbook Cross-Reference Header */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Primary Textbook Readings
        </span>
        <div className="flex flex-col sm:flex-row gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-mono">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Grimaldi: {topic.readings.grimaldi}</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-300 font-mono">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>O'Regan: {topic.readings.oregan}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-slate-300 leading-relaxed">
        <MathView text={concept.summary} />
      </div>

      {/* Key Theorems */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
          <Award className="w-4 h-4" /> Core Theorems & Formulas
        </h4>
        <div className="space-y-3">
          {concept.theorems.map((thm, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{thm.name}</span>
                <span className="text-[10px] font-mono text-slate-500">{thm.reference}</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathView text={thm.statement} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Pitfalls & Traps */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Common Exam Pitfalls & Traps
        </h4>
        <div className="space-y-2">
          {concept.pitfalls.map((pitfall, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed"
            >
              • <MathView text={pitfall} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
