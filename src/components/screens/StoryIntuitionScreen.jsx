import React, { useState } from 'react';
import MathView from '../MathView';
import { CONCEPTS_DATA } from '../../data/conceptsData';
import {
  BookOpen,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Laptop,
  Compass,
} from 'lucide-react';

export default function StoryIntuitionScreen({ topic, onNavigateToLab }) {
  const concept = CONCEPTS_DATA[topic.id];
  const [expandedProofs, setExpandedProofs] = useState({});

  const toggleProof = (idx) => {
    setExpandedProofs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Textbook Cross Reference & Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cosmic-900/80 border border-cosmic-750 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Assigned Reading • Grimaldi & O'Regan
            </div>
            <div className="text-xs font-semibold text-slate-200">
              Grimaldi: {topic.readings.grimaldi} &nbsp;|&nbsp; O'Regan: {topic.readings.oregan}
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToLab}
          className="btn-arcade px-4 py-2 rounded-full text-xs font-bold bg-neon-purple text-white hover:bg-neon-purple/90 shadow-glow-purple flex items-center gap-2"
        >
          Jump to Interactive Lab
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Real-World Computer Science Story / Hook */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-purple/30 relative overflow-hidden shadow-xl shadow-black/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-neon-pink/20 text-neon-pink border border-neon-pink/40 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5" />
              Real-World CS Engineering Impact
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {topic.story.hook}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {topic.story.csApp}
          </p>

          <div className="p-4 rounded-2xl bg-cosmic-950/70 border border-cosmic-750 flex items-start gap-3">
            <Compass className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">
                Intuitive Mental Model
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {topic.story.keyIntuition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Conceptual Intuition Breakdown */}
      {concept?.intuition && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon-gold" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Foundational Concepts & Intuition
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {concept.intuition.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 space-y-2 hover:border-cosmic-600 transition"
              >
                <h4 className="text-sm font-bold text-neon-cyan flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-xs font-mono flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  {item.heading}
                </h4>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8 whitespace-pre-line">
                  <MathView text={item.body} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formal Theorems & Step-by-Step Proof Breakdowns */}
      {concept?.theorems && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-mint" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Core Theorems & Mathematical Proofs
            </h3>
          </div>

          <div className="space-y-4">
            {concept.theorems.map((thm, idx) => {
              const isExpanded = expandedProofs[idx];

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-cosmic-900/90 border border-cosmic-750 overflow-hidden shadow-lg"
                >
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neon-mint shadow-glow-mint" />
                        {thm.name}
                      </span>
                      <span className="text-[11px] font-mono text-neon-purple px-2 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/30">
                        {thm.reference}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-cosmic-950/60 p-4 rounded-xl border border-cosmic-750/70">
                      <MathView text={thm.statement} />
                    </div>

                    {thm.proofSketch && (
                      <div className="pt-2">
                        <button
                          onClick={() => toggleProof(idx)}
                          className="text-xs font-semibold text-neon-cyan hover:text-neon-cyan/80 flex items-center gap-1.5 transition"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide Proof Breakdown
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View Formal Proof / Derivation
                            </>
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 rounded-xl bg-cosmic-950/90 border border-neon-cyan/30 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-neon-cyan font-bold mb-1">
                              Step-by-Step Proof
                            </div>
                            <MathView text={thm.proofSketch} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Step Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-purple/20 border border-neon-purple/40 text-center space-y-3">
        <h4 className="text-lg font-bold text-white">
          Ready to put theory into practice?
        </h4>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Explore the interactive simulation sandbox to experiment with custom parameters, run real-time closure algorithms, and test invariants.
        </p>
        <button
          onClick={onNavigateToLab}
          className="btn-arcade inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neon-purple text-white font-bold text-xs shadow-glow-purple hover:bg-neon-purple/90"
        >
          Launch {topic.title} Lab ➔
        </button>
      </div>
    </div>
  );
}
