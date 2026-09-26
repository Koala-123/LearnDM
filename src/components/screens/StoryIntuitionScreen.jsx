import React, { useState } from 'react';
import MathView from '../MathView';
import { CONCEPTS_DATA } from '../../data/conceptsData';
import {
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Laptop,
  Compass,
} from 'lucide-react';

/**
 * Normalizes an intuition item into structured subsections with headings,
 * badges, and paragraph-style indented text without bullet points.
 */
function normalizeIntuitionSubsections(item) {
  if (Array.isArray(item.subsections) && item.subsections.length > 0) {
    return item.subsections;
  }

  if (!item.body) return [];

  const raw = String(item.body).trim();
  const sections = [];
  const lines = raw.split('\n');
  let currentTitle = null;
  let currentBadge = null;
  let currentLines = [];

  const flush = () => {
    if (currentTitle || currentLines.length > 0) {
      sections.push({
        title: currentTitle || 'Overview',
        badge: currentBadge,
        content: currentLines.join('\n\n').trim(),
      });
      currentTitle = null;
      currentBadge = null;
      currentLines = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    // Match patterns like:
    // • **Title**: body
    // 1. **Title**: body
    // ### Title
    // #### Title
    const headingMatch = trimmed.match(
      /^(?:•|-|\*|\d+\.)?\s*(?:\*\*(.+?)\*\*|###\s*(.+)|####\s*(.+))(?::\s*(.*))?$/
    );

    if (headingMatch) {
      flush();
      const rawTitle = (headingMatch[1] || headingMatch[2] || headingMatch[3] || '').trim();
      currentTitle = rawTitle;
      const rest = headingMatch[4];
      if (rest) {
        currentLines.push(rest.trim());
      }
    } else {
      // Clean leading bullet if present
      const cleanLine = trimmed.replace(/^[•\-\*]\s*/, '');
      currentLines.push(cleanLine);
    }
  }

  flush();
  return sections;
}

export default function StoryIntuitionScreen({ topic, onNavigateToLab }) {
  if (!topic) return null;

  const concept = CONCEPTS_DATA[topic.id] || {};
  const story = topic.story || {};
  const [expandedProofs, setExpandedProofs] = useState({});

  const toggleProof = (idx) => {
    setExpandedProofs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const summaryText = Array.isArray(concept.summary)
    ? concept.summary.join('\n')
    : concept.summary || '';

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn max-w-5xl mx-auto py-1">
      {/* Module Overview & Focus Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-cosmic-900/80 border border-cosmic-750 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple shrink-0"
            aria-hidden="true"
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neon-cyan font-bold">
              Module Focus • {topic.week}
            </div>
            <div className="text-sm sm:text-base font-semibold text-slate-200">
              {topic.subtitle}
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToLab}
          className="btn-arcade px-4 py-2 rounded-full text-xs font-bold bg-neon-purple text-white hover:bg-neon-purple/90 shadow-glow-purple flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
        >
          <span>Jump to Interactive Lab</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Starting from Scratch • Concept at a Glance */}
      {summaryText && (
        <section
          aria-label="Starting from scratch key ideas"
          className="p-6 sm:p-7 rounded-3xl bg-cosmic-900/90 border border-neon-cyan/40 space-y-4 shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40" aria-hidden="true">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Starting from Scratch • Key Ideas at a Glance
            </h3>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-cosmic-950/70 border border-cosmic-750 text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7">
            <MathView text={summaryText} />
          </div>
        </section>
      )}

      {/* Real-World Computer Science Story / Hook */}
      <section
        aria-label="Real-world computer science context"
        className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-purple/30 relative overflow-hidden shadow-xl shadow-black/40 space-y-5"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-pink/20 text-neon-pink border border-neon-pink/40 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5" aria-hidden="true" />
              Real-World Computer Science (CS) Impact
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            <MathView text={story.hook} />
          </h3>

          <div className="text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7 max-w-3xl">
            <MathView text={story.csApp} />
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-950/70 border border-cosmic-750 flex items-start gap-3.5">
            <Compass className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-bold text-neon-cyan uppercase tracking-wider block">
                Intuitive Mental Model
              </span>
              <div className="text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7">
                <MathView text={story.keyIntuition} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Conceptual Intuition Breakdown */}
      {Array.isArray(concept?.intuition) && concept.intuition.length > 0 && (
        <section aria-label="Foundational concepts and intuition" className="space-y-6 sm:space-y-7">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-neon-gold" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Foundational Concepts & Intuition
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-7">
            {concept.intuition.map((item, idx) => {
              const subsections = normalizeIntuitionSubsections(item);

              return (
                <article
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 space-y-6 hover:border-cosmic-600 transition shadow-xl"
                >
                  {/* Primary Card Heading (Level 1 Hierarchy) */}
                  <div className="border-b border-cosmic-800/80 pb-4 flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/40 text-neon-cyan text-sm font-mono font-extrabold flex items-center justify-center shadow-glow-cyan/20 shrink-0"
                        aria-hidden="true"
                      >
                        0{idx + 1}
                      </span>
                      <MathView text={item.heading} />
                    </h4>
                    {item.tag && (
                      <span className="text-xs font-mono text-neon-cyan px-2.5 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 font-semibold">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Intro paragraph if present */}
                  {item.intro && (
                    <div className="text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7 space-y-3">
                      {item.intro
                        .split('\n\n')
                        .map((p) => p.trim())
                        .filter(Boolean)
                        .map((para, pIdx) => (
                          <p key={pIdx} className="indent-6 sm:indent-8">
                            <MathView text={para} />
                          </p>
                        ))}
                    </div>
                  )}

                  {/* Hierarchical Subheadings & Indented Paragraphs (Level 2 & 3 Hierarchy) */}
                  <div className="space-y-5">
                    {subsections.map((sub, sIdx) => {
                      const paras = (sub.content || '')
                        .split('\n\n')
                        .map((p) => p.trim())
                        .filter(Boolean);

                      return (
                        <div
                          key={sIdx}
                          className="rounded-xl bg-cosmic-950/70 border border-cosmic-800/80 p-5 sm:p-6 space-y-3.5 relative overflow-hidden shadow-md"
                        >
                          {/* Vertical decorative hierarchy gradient bar */}
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-mint" aria-hidden="true" />

                          {/* Subheading header */}
                          <div className="flex flex-wrap items-center justify-between gap-2.5 pl-2.5 pb-2.5 border-b border-cosmic-800/40">
                            <h5 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-glow-cyan" aria-hidden="true" />
                              <MathView text={sub.title} />
                            </h5>
                            {sub.badge && (
                              <span className="text-xs font-mono font-bold text-neon-purple bg-neon-purple/10 border border-neon-purple/30 px-2.5 py-0.5 rounded-full">
                                {sub.badge}
                              </span>
                            )}
                          </div>

                          {/* Paragraph content with paragraph-style indentation */}
                          <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7 pl-2.5">
                            {paras.map((p, pIdx) => (
                              <p key={pIdx} className="indent-6 sm:indent-8">
                                <MathView text={p} />
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Formal Theorems & Step-by-Step Proof Breakdowns */}
      {Array.isArray(concept?.theorems) && concept.theorems.length > 0 && (
        <section aria-label="Core theorems and mathematical proofs" className="space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-neon-mint" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Core Theorems & Mathematical Proofs
            </h3>
          </div>

          <div className="space-y-5">
            {concept.theorems.map((thm, idx) => {
              const isExpanded = expandedProofs[idx];

              return (
                <article
                  key={idx}
                  className="rounded-2xl bg-cosmic-900/90 border border-cosmic-750 overflow-hidden shadow-lg"
                >
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <span className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-neon-mint shadow-glow-mint" aria-hidden="true" />
                        <MathView text={thm.name} />
                      </span>
                      <span className="text-xs font-mono text-neon-purple px-2.5 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 font-semibold">
                        {thm.category || 'Core Theorem'}
                      </span>
                    </div>

                    <div className="text-sm sm:text-base text-slate-100 leading-relaxed sm:leading-7 bg-cosmic-950/70 p-4 sm:p-5 rounded-2xl border border-cosmic-750/70 font-medium">
                      <MathView text={thm.statement} />
                    </div>

                    {thm.proofSketch && (
                      <div className="pt-1.5">
                        <button
                          onClick={() => toggleProof(idx)}
                          aria-expanded={isExpanded}
                          aria-controls={`proof-details-${idx}`}
                          className="btn-arcade text-sm font-bold text-neon-cyan hover:text-neon-cyan/80 flex items-center gap-2 transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" aria-hidden="true" />
                              <span>Hide Proof Breakdown</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" aria-hidden="true" />
                              <span>View Formal Proof / Derivation ➔</span>
                            </>
                          )}
                        </button>

                        {isExpanded && (
                          <div
                            id={`proof-details-${idx}`}
                            role="region"
                            aria-label={`Proof breakdown for ${thm.name}`}
                            className="mt-3 p-4 sm:p-5 rounded-xl bg-cosmic-950/90 border border-neon-cyan/30 text-sm sm:text-base text-slate-200 leading-relaxed sm:leading-7 animate-fadeIn space-y-2"
                          >
                            <div className="text-xs font-mono uppercase tracking-wider text-neon-cyan font-bold mb-1">
                              Step-by-Step Proof Breakdown
                            </div>
                            <MathView text={thm.proofSketch} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Next Step Banner */}
      <section
        aria-label="Next step interactive simulation"
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-purple/20 border border-neon-purple/40 text-center space-y-3.5"
      >
        <h4 className="text-lg sm:text-xl font-bold text-white">
          Ready to put theory into practice?
        </h4>
        <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Explore the interactive simulation sandbox to experiment with custom parameters, run real-time closure algorithms, and test invariants.
        </p>
        <button
          onClick={onNavigateToLab}
          className="btn-arcade inline-flex items-center gap-2 px-7 py-3 rounded-full bg-neon-purple text-white font-bold text-sm shadow-glow-purple hover:bg-neon-purple/90 transition focus-visible:ring-2 focus-visible:ring-neon-cyan focus:outline-none"
        >
          <span>Launch</span> <MathView text={topic.title} /> <span>Lab ➔</span>
        </button>
      </section>
    </div>
  );
}
