import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import { Sparkles, Calculator, CheckCircle2 } from 'lucide-react';

export default function ProofRecurrenceLab({ initialData }) {
  const [activeSubTab, setActiveSubTab] = useState('recurrence');

  // Recurrence state
  const [c1, setC1] = useState(initialData?.c1 ?? 1);
  const [c2, setC2] = useState(initialData?.c2 ?? 1);
  const [a0, setA0] = useState(initialData?.a0 ?? 0);
  const [a1, setA1] = useState(initialData?.a1 ?? 1);

  // Compute recurrence terms
  const recurrenceData = useMemo(() => {
    const terms = [a0, a1];
    for (let i = 2; i <= 10; i++) {
      terms.push(c1 * terms[i - 1] + c2 * terms[i - 2]);
    }

    // Characteristic equation: r^2 - c1*r - c2 = 0
    const disc = c1 * c1 + 4 * c2;
    let charRoots = '';
    let closedForm = '';

    if (disc > 0) {
      const r1 = (c1 + Math.sqrt(disc)) / 2;
      const r2 = (c1 - Math.sqrt(disc)) / 2;
      charRoots = `r_1 = ${r1.toFixed(3)}, \\quad r_2 = ${r2.toFixed(3)}`;
      const B = (a1 - a0 * r1) / (r2 - r1);
      const A = a0 - B;
      closedForm = `a_n = (${A.toFixed(2)}) \\cdot (${r1.toFixed(2)})^n + (${B.toFixed(2)}) \\cdot (${r2.toFixed(2)})^n`;
    } else if (disc === 0) {
      const r = c1 / 2;
      charRoots = `r = ${r.toFixed(3)} \\text{ (Repeated)}`;
      const A = a0;
      const B = r !== 0 ? (a1 - A * r) / r : 0;
      closedForm = `a_n = (${A.toFixed(2)} + ${B.toFixed(2)} n) \\cdot (${r.toFixed(2)})^n`;
    } else {
      charRoots = `r = \\frac{${c1} \\pm i\\sqrt{${Math.abs(disc)}}}{2} \\text{ (Complex roots)}`;
      closedForm = `a_n \\text{ exhibits oscillatory behavior governed by complex roots}`;
    }

    return { terms, disc, charRoots, closedForm };
  }, [c1, c2, a0, a1]);

  // Induction Presets
  const [selectedInduction, setSelectedInduction] = useState('sum_squares');

  const inductionProofs = {
    sum_squares: {
      title: 'Sum of First n Squares',
      theorem: '\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}',
      baseCase: 'For $n = 1$: $\\text{LHS} = 1^2 = 1$. $\\text{RHS} = \\frac{1(2)(3)}{6} = 1$. Since $\\text{LHS} = \\text{RHS}$, $P(1)$ is verified.',
      hyp: 'Assume $P(k)$ holds for some $k \\ge 1$: $\\sum_{i=1}^k i^2 = \\frac{k(k+1)(2k+1)}{6}$.',
      step: 'Prove $P(k+1)$: $\\sum_{i=1}^{k+1} i^2 = \\left(\\sum_{i=1}^k i^2\\right) + (k+1)^2 = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2$. Factor out $(k+1)$: $\\frac{k+1}{6} [k(2k+1) + 6(k+1)] = \\frac{k+1}{6} [2k^2 + 7k + 6] = \\frac{(k+1)(k+2)(2k+3)}{6}$, which is precisely $P(k+1)$.',
    },
    divisibility: {
      title: 'Divisibility by 3',
      theorem: '3 \\mid (n^3 - n) \\quad \\forall n \\ge 1',
      baseCase: 'For $n = 1$: $1^3 - 1 = 0$, and $3 \\mid 0$. Thus $P(1)$ is True.',
      hyp: 'Assume $3 \\mid (k^3 - k)$, so $k^3 - k = 3m$ for some integer $m$.',
      step: 'For $n = k+1$: $(k+1)^3 - (k+1) = (k^3 + 3k^2 + 3k + 1) - (k + 1) = (k^3 - k) + 3(k^2 + k) = 3m + 3(k^2 + k) = 3[m + k^2 + k]$. Since this is an explicit multiple of 3, $P(k+1)$ is True.',
    },
    inequality: {
      title: 'Exponential vs Linear Inequality',
      theorem: '2^n > n^2 \\quad \\forall n \\ge 5',
      baseCase: 'For $n = 5$: $2^5 = 32 > 5^2 = 25$. Verified.',
      hyp: 'Assume $2^k > k^2$ for some $k \\ge 5$.',
      step: 'For $n = k+1$: $2^{k+1} = 2 \\cdot 2^k > 2k^2$. We need $2k^2 > (k+1)^2 = k^2 + 2k + 1 \\iff k^2 - 2k - 1 > 0$. Since $k \\ge 5$, $k^2 - 2k - 1 = k(k-2) - 1 \\ge 5(3) - 1 = 14 > 0$. Hence $2^{k+1} > (k+1)^2$.',
    },
  };

  const currInduction = inductionProofs[selectedInduction];

  return (
    <div className="space-y-6">
      {/* Subtab navigation */}
      <div className="flex gap-2 border-b border-cosmic-750 pb-2">
        <button
          onClick={() => setActiveSubTab('recurrence')}
          className={`btn-arcade px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            activeSubTab === 'recurrence'
              ? 'bg-neon-gold text-cosmic-950 shadow-glow-gold border border-neon-gold'
              : 'text-slate-400 hover:text-white bg-cosmic-950/60 border border-cosmic-750'
          }`}
        >
          Recurrence Relation Solver
        </button>
        <button
          onClick={() => setActiveSubTab('induction')}
          className={`btn-arcade px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            activeSubTab === 'induction'
              ? 'bg-neon-gold text-cosmic-950 shadow-glow-gold border border-neon-gold'
              : 'text-slate-400 hover:text-white bg-cosmic-950/60 border border-cosmic-750'
          }`}
        >
          Induction Step-by-Step Viewer
        </button>
      </div>

      {activeSubTab === 'recurrence' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-neon-gold" />
              Configure Recurrence: <MathView math="a_n = c_1 a_{n-1} + c_2 a_{n-2}" />
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Coeff $c_1$</label>
                <input
                  type="number"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Coeff $c_2$</label>
                <input
                  type="number"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Initial $a_0$</label>
                <input
                  type="number"
                  value={a0}
                  onChange={(e) => setA0(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Initial $a_1$</label>
                <input
                  type="number"
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-gold focus:outline-none focus:border-neon-gold"
                />
              </div>
            </div>
          </div>

          {/* Solution & Sequence display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neon-gold">
                Characteristic Equation & Roots
              </h5>
              <div className="text-sm font-mono text-slate-200">
                <MathView math={`r^2 - (${c1})r - (${c2}) = 0`} display />
                <div className="mt-2 text-xs text-neon-gold">
                  <MathView math={recurrenceData.charRoots} />
                </div>
              </div>
              <div className="pt-2 border-t border-cosmic-750">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neon-purple mb-1">
                  Closed Form Solution
                </h5>
                <div className="text-xs font-mono text-neon-purple overflow-x-auto py-1">
                  <MathView math={recurrenceData.closedForm} />
                </div>
              </div>
            </div>

            <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neon-mint mb-3">
                First 11 Computed Terms
              </h5>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {recurrenceData.terms.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-2xl bg-cosmic-950 border border-cosmic-750 text-center"
                  >
                    <span className="text-[10px] text-slate-500 font-mono block">a_{idx}</span>
                    <span className="text-xs font-mono font-bold text-neon-mint">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'induction' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(inductionProofs).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedInduction(key)}
                className={`btn-arcade px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedInduction === key
                    ? 'bg-neon-gold text-cosmic-950 shadow-glow-gold border border-neon-gold'
                    : 'bg-cosmic-950/80 text-slate-400 border border-cosmic-750 hover:text-white'
                }`}
              >
                {inductionProofs[key].title}
              </button>
            ))}
          </div>

          <div className="bg-cosmic-900/90 p-6 rounded-3xl border border-cosmic-750 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neon-gold">
                Theorem to Prove
              </span>
              <div className="mt-1 text-base font-bold text-white">
                <MathView math={currInduction.theorem} display />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-neon-mint mb-1">
                <CheckCircle2 className="w-4 h-4" /> Step 1: Base Case
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathView text={currInduction.baseCase} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-neon-cyan mb-1">
                <CheckCircle2 className="w-4 h-4" /> Step 2: Inductive Hypothesis
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathView text={currInduction.hyp} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-neon-gold mb-1">
                <CheckCircle2 className="w-4 h-4" /> Step 3: Inductive Step (Deduce P(k+1))
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathView text={currInduction.step} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
