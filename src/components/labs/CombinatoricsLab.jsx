import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import {
  permutations,
  combinations,
  starsAndBars,
  derangements,
  solvePIE3Sets,
  pigeonholePrinciple,
} from '../../engines/combinatoricsEngine';
import { Sparkles, PieChart, Users, HelpCircle, Star, Sliders } from 'lucide-react';

export default function CombinatoricsLab({ initialData }) {
  const [activeTab, setActiveTab] = useState(initialData?.model || 'starsAndBars');

  // Wizard State
  const [orderMatters, setOrderMatters] = useState(false);
  const [repetitionAllowed, setRepetitionAllowed] = useState(false);
  const [nVal, setNVal] = useState(initialData?.n ?? 7);
  const [rVal, setRVal] = useState(initialData?.r ?? 3);

  // Stars & Bars State
  const [sbN, setSbN] = useState(initialData?.n ?? 10);
  const [sbK, setSbK] = useState(initialData?.k ?? 4);
  const [sbPositiveOnly, setSbPositiveOnly] = useState(false);

  // PIE 3-Sets State
  const [pieInputs, setPieInputs] = useState({
    setA: 50,
    setB: 40,
    setC: 30,
    ab: 15,
    ac: 12,
    bc: 10,
    abc: 5,
    universal: 100,
  });

  // Pigeonhole State
  const [phItems, setPhItems] = useState(initialData?.items ?? 49);
  const [phBins, setPhBins] = useState(initialData?.bins ?? 12);

  // Compute wizard outcome
  const wizardResult = useMemo(() => {
    const n = Number(nVal) || 0;
    const r = Number(rVal) || 0;

    if (!orderMatters && !repetitionAllowed) {
      return {
        name: 'Standard Combinations',
        formula: `\\binom{${n}}{${r}} = \\frac{${n}!}{${r}!(${n}-${r})!}`,
        value: combinations(n, r),
        useCase: `Selecting ${r} distinct items from ${n} without regard to order.`,
      };
    } else if (orderMatters && !repetitionAllowed) {
      return {
        name: 'Permutations without Repetition',
        formula: `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`,
        value: permutations(n, r),
        useCase: `Arranging ${r} distinct items chosen from ${n}.`,
      };
    } else if (orderMatters && repetitionAllowed) {
      return {
        name: 'Sequences with Repetition',
        formula: `${n}^{${r}}`,
        value: Math.pow(n, r),
        useCase: `Strings or passwords of length ${r} from an alphabet of size ${n}.`,
      };
    } else {
      return {
        name: 'Combinations with Repetition (Stars and Bars)',
        formula: `\\binom{${n} + ${r} - 1}{${r}} = \\binom{${n + r - 1}}{${r}}`,
        value: starsAndBars(n, r, false),
        useCase: `Distributing ${r} identical items into ${n} distinct bins.`,
      };
    }
  }, [orderMatters, repetitionAllowed, nVal, rVal]);

  const sbResult = useMemo(() => {
    const n = Number(sbN) || 0;
    const k = Number(sbK) || 1;
    const val = starsAndBars(n, k, sbPositiveOnly);
    const formula = sbPositiveOnly
      ? `\\binom{${n}-1}{${k}-1} = \\binom{${Math.max(n - 1, 0)}}{${Math.max(k - 1, 0)}}`
      : `\\binom{${n}+${k}-1}{${k}-1} = \\binom{${n + k - 1}}{${k - 1}}`;
    return { value: val, formula };
  }, [sbN, sbK, sbPositiveOnly]);

  const pieResult = useMemo(() => {
    return solvePIE3Sets(pieInputs);
  }, [pieInputs]);

  const phResult = useMemo(() => {
    return pigeonholePrinciple(Number(phItems) || 1, Number(phBins) || 1);
  }, [phItems, phBins]);

  return (
    <div className="space-y-6">
      {/* Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-cosmic-750 pb-2">
        {[
          { id: 'starsAndBars', label: '⭐ Stars & Bars (Integer Partitions)' },
          { id: 'wizard', label: '🧙 Counting Decision Wizard' },
          { id: 'pie', label: '⭕ Inclusion-Exclusion (PIE)' },
          { id: 'pigeonhole', label: '🐦 Pigeonhole Calculator' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition ${
              activeTab === tab.id
                ? 'bg-neon-gold text-cosmic-950 font-extrabold shadow-glow-gold border border-neon-gold'
                : 'text-slate-400 hover:text-white bg-cosmic-950/60 border border-cosmic-750'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 0: Stars & Bars */}
      {activeTab === 'starsAndBars' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-gold flex items-center gap-2">
                <Star className="w-4 h-4 fill-neon-gold" />
                <MathView text="Stars & Bars Equation Solver: $x_1 + x_2 + \dots + x_k = n$" />
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setSbPositiveOnly(false)}
                  className={`btn-arcade px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                    !sbPositiveOnly
                      ? 'bg-neon-gold/20 text-neon-gold border-neon-gold font-bold shadow-glow-gold'
                      : 'bg-cosmic-950 text-slate-400 border-cosmic-750'
                  }`}
                >
                  <MathView text="Non-Negative ($x_i \ge 0$)" />
                </button>
                <button
                  onClick={() => setSbPositiveOnly(true)}
                  className={`btn-arcade px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                    sbPositiveOnly
                      ? 'bg-neon-gold/20 text-neon-gold border-neon-gold font-bold shadow-glow-gold'
                      : 'bg-cosmic-950 text-slate-400 border-cosmic-750'
                  }`}
                >
                  <MathView text="Positive ($x_i \ge 1$)" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  Target Sum / Identical Stars ($n$)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={sbN}
                  onChange={(e) => setSbN(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  Number of Variables / Distinct Bins ($k$)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={sbK}
                  onChange={(e) => setSbK(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
            </div>
          </div>

          {/* Stars & Bars Visual Result Card */}
          <div className="p-6 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-neon-gold tracking-wider block">
                  Total Integer Solutions
                </span>
                <span className="text-2xl font-mono font-black text-white">
                  = {sbResult.value.toLocaleString()} solutions
                </span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-neon-gold/15 border border-neon-gold/40 text-neon-gold text-sm font-mono font-bold">
                <MathView math={sbResult.formula} />
              </div>
            </div>

            {/* Visual Token Representation */}
            <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-2">
              <span className="text-xs font-mono text-slate-300 uppercase font-bold tracking-wider">
                Divider Representation ({Math.min(sbN, 20)} Stars ★ and {Math.min(sbK - 1, 8)} Bars |):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 py-2 font-mono text-lg">
                {Array.from({ length: Math.min(sbN, 20) }, (_, i) => (
                  <span key={`s-${i}`} className="text-neon-gold">★</span>
                ))}
                {Array.from({ length: Math.max(sbK - 1, 0) }, (_, i) => (
                  <span key={`b-${i}`} className="text-neon-cyan font-bold px-1">|</span>
                ))}
                {sbN > 20 && <span className="text-xs sm:text-sm text-slate-400 font-sans">...+{sbN - 20} more stars</span>}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Choose positions for the {sbK - 1} dividers among the total slots of stars + dividers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Counting Wizard */}
      {activeTab === 'wizard' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-purple flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              Scenario Classifier & Decision Engine
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750">
                <span className="text-xs sm:text-sm font-bold text-slate-200 block mb-2">
                  1. Does Order of Selection Matter?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderMatters(true)}
                    className={`btn-arcade flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      orderMatters
                        ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                        : 'bg-cosmic-900 border border-cosmic-750 text-slate-400'
                    }`}
                  >
                    Yes (Permutation)
                  </button>
                  <button
                    onClick={() => setOrderMatters(false)}
                    className={`btn-arcade flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      !orderMatters
                        ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                        : 'bg-cosmic-900 border border-cosmic-750 text-slate-400'
                    }`}
                  >
                    No (Combination)
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750">
                <span className="text-xs sm:text-sm font-bold text-slate-200 block mb-2">
                  2. Can Elements Repeat?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRepetitionAllowed(true)}
                    className={`btn-arcade flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      repetitionAllowed
                        ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                        : 'bg-cosmic-900 border border-cosmic-750 text-slate-400'
                    }`}
                  >
                    Yes (With Repetition)
                  </button>
                  <button
                    onClick={() => setRepetitionAllowed(false)}
                    className={`btn-arcade flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      !repetitionAllowed
                        ? 'bg-neon-purple text-white shadow-glow-purple border border-neon-purple'
                        : 'bg-cosmic-900 border border-cosmic-750 text-slate-400'
                    }`}
                  >
                    No (Without Repetition)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Total Items / Types ($n$)" />
                </label>
                <input
                  type="number"
                  value={nVal}
                  onChange={(e) => setNVal(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-purple focus:outline-none focus:border-neon-purple"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Selection Size / Slots ($r$)" />
                </label>
                <input
                  type="number"
                  value={rVal}
                  onChange={(e) => setRVal(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-purple focus:outline-none focus:border-neon-purple"
                />
              </div>
            </div>
          </div>

          {/* Outcome Card */}
          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-neon-purple block">
              Applicable Counting Formula
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">
                <MathView text={wizardResult.name} />
              </span>
              <span className="text-xl font-mono font-bold text-neon-mint">
                = {wizardResult.value.toLocaleString()}
              </span>
            </div>
            <div className="text-sm font-mono text-neon-cyan py-1">
              <MathView math={wizardResult.formula} display />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic">{wizardResult.useCase}</p>
          </div>
        </div>
      )}

      {/* TAB 2: Inclusion-Exclusion */}
      {activeTab === 'pie' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan">
              3-Set Cardinality Inputs
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs sm:text-sm text-slate-300">
                  <MathView math="|A|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.setA}
                  onChange={(e) => setPieInputs({ ...pieInputs, setA: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300">
                  <MathView math="|B|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.setB}
                  onChange={(e) => setPieInputs({ ...pieInputs, setB: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300">
                  <MathView math="|C|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.setC}
                  onChange={(e) => setPieInputs({ ...pieInputs, setC: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  <MathView math="|A \cap B|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.ab}
                  onChange={(e) => setPieInputs({ ...pieInputs, ab: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-2.5 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  <MathView math="|A \cap C|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.ac}
                  onChange={(e) => setPieInputs({ ...pieInputs, ac: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-2.5 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  <MathView math="|B \cap C|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.bc}
                  onChange={(e) => setPieInputs({ ...pieInputs, bc: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-2.5 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  <MathView math="|A \cap B \cap C|" />
                </label>
                <input
                  type="number"
                  value={pieInputs.abc}
                  onChange={(e) => setPieInputs({ ...pieInputs, abc: Number(e.target.value) })}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-2.5 py-1.5 text-sm font-mono text-neon-cyan"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-3">
            <span className="text-xs sm:text-sm uppercase font-bold tracking-wider text-neon-mint">
              PIE Union Calculation
            </span>
            <div className="text-base font-mono text-neon-mint py-1">
              <MathView math={pieResult.formula} display />
            </div>

            <div className="pt-2 border-t border-cosmic-750">
              <h5 className="text-xs sm:text-sm uppercase font-bold text-neon-cyan mb-2">
                Disjoint Venn Diagram Regions
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm font-mono">
                <span className="p-2.5 rounded-xl bg-cosmic-950 border border-cosmic-750">
                  <MathView text={`Only $A$: ${pieResult.vennRegions.onlyA}`} />
                </span>
                <span className="p-2.5 rounded-xl bg-cosmic-950 border border-cosmic-750">
                  <MathView text={`Only $B$: ${pieResult.vennRegions.onlyB}`} />
                </span>
                <span className="p-2.5 rounded-xl bg-cosmic-950 border border-cosmic-750">
                  <MathView text={`Only $C$: ${pieResult.vennRegions.onlyC}`} />
                </span>
                <span className="p-2.5 rounded-xl bg-cosmic-950 border border-neon-purple/40 text-neon-purple font-bold">
                  <MathView text={`Center $A \\cap B \\cap C$: ${pieResult.vennRegions.onlyABC}`} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Pigeonhole */}
      {activeTab === 'pigeonhole' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint mb-3">
              Configure Pigeonhole Distribution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Number of Pigeons / Items ($N$)" />
                </label>
                <input
                  type="number"
                  value={phItems}
                  onChange={(e) => setPhItems(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-mint focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Number of Holes / Bins ($k$)" />
                </label>
                <input
                  type="number"
                  value={phBins}
                  onChange={(e) => setPhBins(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono text-neon-mint focus:outline-none focus:border-neon-mint"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint">
              Pigeonhole Guarantee
            </span>
            <div className="text-sm sm:text-base text-slate-200 leading-relaxed">
              <MathView text={phResult.guarantee} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
