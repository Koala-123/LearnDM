import React, { useState, useMemo, useEffect } from 'react';
import MathView from '../MathView';
import {
  extendedEuclidean,
  modularInverse,
  solveLinearCongruence,
  solveCRT,
  fastModularExponentiation,
} from '../../engines/numberTheoryEngine';
import {
  Calculator,
  Check,
  AlertCircle,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function ModularArithmeticLab({ initialData }) {
  const [activeTab, setActiveTab] = useState(initialData?.type === 'modular' ? 'clock' : (initialData?.type || 'clock'));

  // Clock Dial state
  const [clockN, setClockN] = useState(initialData?.n ?? 12);
  const [clockA, setClockA] = useState(initialData?.a ?? 38);
  const [isSpinning, setIsSpinning] = useState(false);

  // Euclidean state
  const [numA, setNumA] = useState(initialData?.a ?? 7);
  const [numB, setNumB] = useState(initialData?.n ?? 31);

  // Linear Congruence state: ax = b mod m
  const [congA, setCongA] = useState(7);
  const [congB, setCongB] = useState(1);
  const [congM, setCongM] = useState(31);

  // CRT state
  const [crtRows, setCrtRows] = useState([
    { a: 2, m: 3 },
    { a: 3, m: 5 },
    { a: 2, m: 7 },
  ]);

  // Fast Exponentiation
  const [expBase, setExpBase] = useState(3);
  const [expPow, setExpPow] = useState(25);
  const [expMod, setExpMod] = useState(13);

  // Spin animation timer
  useEffect(() => {
    let interval = null;
    if (isSpinning) {
      interval = setInterval(() => {
        setClockA((prev) => prev + 1);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  const nVal = Math.max(Number(clockN) || 2, 2);
  const aVal = Number(clockA) || 0;
  const canonicalRemainder = ((aVal % nVal) + nVal) % nVal;
  const quotient = Math.floor(aVal / nVal);

  const extResult = useMemo(() => {
    return extendedEuclidean(Number(numA) || 1, Number(numB) || 1);
  }, [numA, numB]);

  const modInvResult = useMemo(() => {
    return modularInverse(Number(numA) || 1, Number(numB) || 1);
  }, [numA, numB]);

  const congResult = useMemo(() => {
    return solveLinearCongruence(Number(congA), Number(congB), Number(congM));
  }, [congA, congB, congM]);

  const crtResult = useMemo(() => {
    return solveCRT(crtRows.map((r) => ({ a: Number(r.a), m: Number(r.m) })));
  }, [crtRows]);

  const fastExpResult = useMemo(() => {
    return fastModularExponentiation(Number(expBase), Number(expPow), Number(expMod));
  }, [expBase, expPow, expMod]);

  return (
    <div className="space-y-6">
      {/* Subtab selection */}
      <div className="flex flex-wrap gap-2 border-b border-cosmic-750 pb-2">
        {[
          { id: 'clock', label: '🕹️ Modular Clock Dial (ℤ/nℤ)' },
          { id: 'euclid', label: '⚡ Extended Euclidean & Bézout' },
          { id: 'congruence', label: '🎯 Linear Congruences' },
          { id: 'crt', label: '🧩 Chinese Remainder Theorem' },
          { id: 'fastexp', label: '🚀 Fast Exponentiation' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition ${
              activeTab === tab.id
                ? 'bg-neon-pink text-white shadow-glow-pink font-bold border border-neon-pink'
                : 'text-slate-400 hover:text-white bg-cosmic-950/60 border border-cosmic-750'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 0: MODULAR CLOCK DIAL (ℤ/nℤ) */}
      {activeTab === 'clock' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Clock Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-cosmic-950/90 rounded-3xl border border-cosmic-750 relative overflow-hidden">
            <div className="absolute top-2 left-4 text-xs font-mono uppercase text-neon-cyan font-bold tracking-wider">
              <MathView math={`\\text{Residue Ring } \\mathbb{Z}/${nVal}\\mathbb{Z}`} />
            </div>

            {/* SVG Modular Clock Ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2">
              <svg viewBox="0 0 280 280" className="w-full h-full">
                {/* Outer Ring */}
                <circle
                  cx="140"
                  cy="140"
                  r="105"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.25)"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />

                {/* Dial Pointer to active residue */}
                {(() => {
                  const angle = (2 * Math.PI * canonicalRemainder) / nVal - Math.PI / 2;
                  const handX = 140 + 80 * Math.cos(angle);
                  const handY = 140 + 80 * Math.sin(angle);
                  return (
                    <g>
                      <line
                        x1="140"
                        y1="140"
                        x2={handX}
                        y2={handY}
                        stroke="#ff4b72"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="140" cy="140" r="5" fill="#ff4b72" />
                    </g>
                  );
                })()}

                {/* Residue Nodes around the circle */}
                {Array.from({ length: Math.min(nVal, 24) }, (_, k) => {
                  const angle = (2 * Math.PI * k) / nVal - Math.PI / 2;
                  const x = 140 + 105 * Math.cos(angle);
                  const y = 140 + 105 * Math.sin(angle);
                  const isCurrent = k === canonicalRemainder;

                  return (
                    <g key={k}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 14 : 10}
                        fill={isCurrent ? '#ff4b72' : '#111827'}
                        stroke={isCurrent ? '#ffffff' : '#a855f7'}
                        strokeWidth={isCurrent ? '2.5' : '1.5'}
                        className="transition-all duration-200"
                      />
                      <text
                        x={x}
                        y={y + 3.5}
                        textAnchor="middle"
                        fill={isCurrent ? '#ffffff' : '#94a3b8'}
                        fontSize={isCurrent ? '12' : '10'}
                        fontFamily="Space Mono"
                        fontWeight="bold"
                      >
                        {k}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Invariant Equation Readout */}
            <div className="w-full mt-2 p-3 rounded-2xl bg-cosmic-900 border border-neon-cyan/30 text-center">
              <div className="text-xs font-mono text-slate-400">
                Division Algorithm Identity:
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-neon-cyan mt-0.5">
                <MathView math={`${aVal} = (${quotient}) \\times ${nVal} + ${canonicalRemainder}`} />
              </div>
              <div className="text-xs sm:text-sm text-neon-mint mt-1">
                Canonical: <MathView math={`${aVal} \\equiv ${canonicalRemainder} \\pmod{${nVal}}`} />
              </div>
            </div>
          </div>

          {/* Right: Controls & Presets */}
          <div className="lg:col-span-6 space-y-4">
            {/* Input Config */}
            <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-purple flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Clock & Residue Parameters
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 mb-1">
                    <MathView text="Modulus $n$ (Clock Size):" />
                    <span className="font-mono font-bold text-neon-purple">{nVal}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={clockN}
                    onChange={(e) => setClockN(Number(e.target.value))}
                    className="w-full accent-neon-purple cursor-pointer h-2 bg-cosmic-950 rounded-lg"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      { label: 'Clock n=12', val: 12 },
                      { label: 'Prime n=7', val: 7 },
                      { label: 'n=5', val: 5 },
                      { label: 'n=16', val: 16 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        onClick={() => setClockN(p.val)}
                        className={`btn-arcade px-3 py-1 rounded-full text-xs font-mono border ${
                          clockN === p.val
                            ? 'bg-neon-purple/20 text-neon-purple border-neon-purple font-bold'
                            : 'bg-cosmic-950 border-cosmic-750 text-slate-400'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 mb-1">
                    <MathView text="Dividend Integer $a$:" />
                    <span className="font-mono font-bold text-neon-pink">{aVal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={clockA}
                      onChange={(e) => setClockA(Number(e.target.value))}
                      className="flex-1 bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm sm:text-base font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                    />
                    <button
                      onClick={() => setIsSpinning(!isSpinning)}
                      className={`btn-arcade px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                        isSpinning
                          ? 'bg-neon-pink text-white shadow-glow-pink'
                          : 'bg-cosmic-950 border border-cosmic-750 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      {isSpinning ? 'Pause' : 'Auto Spin'}
                    </button>
                  </div>

                  {/* Steppers */}
                  <div className="flex gap-1.5 mt-2">
                    {[-10, -1, 1, 10].map((step) => (
                      <button
                        key={step}
                        onClick={() => setClockA((prev) => prev + step)}
                        className="btn-arcade flex-1 py-1.5 rounded-lg bg-cosmic-950/80 border border-cosmic-750 text-xs sm:text-sm font-mono text-slate-300 hover:border-neon-cyan hover:text-neon-cyan"
                      >
                        {step > 0 ? `+${step}` : step}
                      </button>
                    ))}
                    <button
                      onClick={() => setClockA(0)}
                      className="btn-arcade px-3 py-1.5 rounded-lg bg-cosmic-950/80 border border-cosmic-750 text-xs sm:text-sm text-slate-400 hover:text-white"
                      title="Reset to 0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mathematical Interpretation */}
            <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 text-xs sm:text-sm text-slate-300 space-y-1.5">
              <div className="font-bold text-neon-gold uppercase tracking-wider text-xs">
                Geometric Clock Property
              </div>
              <p className="leading-relaxed">
                <MathView text="As $a$ increases by $n$, the clock hand completes exactly one full $360^\circ$ orbit. The remainder $r \in \{0, 1, \dots, n-1\}$ represents the exact terminal landing point!" />
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Extended Euclidean */}
      {activeTab === 'euclid' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neon-pink mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <MathView text="Input Integers $a$ and $b$ (Compute $\\gcd$ & Bézout)" />
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  <MathView text="Integer $a$" />
                </label>
                <input
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  <MathView text="Integer $b$" />
                </label>
                <input
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-2">
              <span className="text-xs sm:text-sm uppercase font-bold text-neon-mint flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <MathView text="Bézout's Identity: $s \\cdot a + t \\cdot b = \\gcd(a, b)$" />
              </span>
              <div className="text-base font-mono text-emerald-400 py-1">
                <MathView math={`\\gcd(${numA}, ${numB}) = ${extResult.gcd}`} display />
                <MathView math={extResult.identity} display />
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                <MathView text={`Coefficients: $s = ${extResult.s}$, $t = ${extResult.t}$`} />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-2">
              <span className="text-xs sm:text-sm uppercase font-bold text-neon-purple flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Modular Multiplicative Inverse</span> <MathView math={`a^{-1} \\pmod b`} />
              </span>
              {modInvResult.exists ? (
                <div className="text-sm text-emerald-400 space-y-1">
                  <div className="text-base font-mono font-bold text-neon-mint py-1">
                    <MathView math={`(${numA})^{-1} \\equiv ${modInvResult.inverse} \\pmod{${numB}}`} />
                  </div>
                  <div className="text-slate-300 text-xs sm:text-sm">
                    <MathView text={`Verification: $${numA} \\times ${modInvResult.inverse} = ${numA * modInvResult.inverse} \\equiv 1 \\pmod{${numB}}$`} />
                  </div>
                </div>
              ) : (
                <div className="text-sm text-rose-400 py-2">
                  <MathView text={modInvResult.reason} />
                </div>
              )}
            </div>
          </div>

          {/* Extended Euclidean Table */}
          <div className="bg-cosmic-900/90 rounded-3xl border border-cosmic-750 p-5">
            <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Step-by-Step Back-Substitution Table
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm font-mono text-left">
                <thead>
                  <tr className="border-b border-cosmic-750 text-slate-400">
                    <th className="py-2.5 px-3"><MathView text="Step $k$" /></th>
                    <th className="py-2.5 px-3"><MathView text="Remainder $r_k$" /></th>
                    <th className="py-2.5 px-3"><MathView text="Quotient $q_k$" /></th>
                    <th className="py-2.5 px-3"><MathView text="Coeff $s_k$" /></th>
                    <th className="py-2.5 px-3"><MathView text="Coeff $t_k$" /></th>
                  </tr>
                </thead>
                <tbody>
                  {extResult.table.map((row, idx) => (
                    <tr key={idx} className="border-b border-cosmic-750/40 hover:bg-cosmic-800/40 transition">
                      <td className="py-2 px-3 text-slate-500">{row.step}</td>
                      <td className="py-2 px-3 text-neon-pink font-bold">{row.r}</td>
                      <td className="py-2 px-3 text-slate-300">{row.q}</td>
                      <td className="py-2 px-3 text-neon-purple">{row.s}</td>
                      <td className="py-2 px-3 text-neon-cyan">{row.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Linear Congruence */}
      {activeTab === 'congruence' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-purple mb-3 flex items-center gap-2">
              <span>Solve Linear Congruence:</span>
              <MathView math="a \cdot x \equiv b \pmod m" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Coefficient $a$" />
                </label>
                <input
                  type="number"
                  value={congA}
                  onChange={(e) => setCongA(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Constant $b$" />
                </label>
                <input
                  type="number"
                  value={congB}
                  onChange={(e) => setCongB(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Modulus $m$" />
                </label>
                <input
                  type="number"
                  value={congM}
                  onChange={(e) => setCongM(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750">
            {congResult.solvable ? (
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint">
                  ✓ Solution Found ({congResult.gcd} incongruent solution{congResult.gcd > 1 ? 's' : ''})
                </span>
                <div className="text-base font-mono text-neon-cyan">
                  <MathView math={congResult.generalForm} display />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {congResult.solutions.map((sol, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-xs sm:text-sm font-mono font-bold text-neon-purple"
                    >
                      <MathView math={`x \\equiv ${sol} \\pmod{${congM}}`} />
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-neon-pink">
                <MathView text={congResult.reason} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Chinese Remainder Theorem */}
      {activeTab === 'crt' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-gold flex items-center gap-2">
              <span>System of Linear Congruences:</span>
              <MathView math="x \equiv a_i \pmod{m_i}" />
            </h4>
            {crtRows.map((row, idx) => (
              <div key={idx} className="flex flex-wrap items-center gap-3">
                <span className="text-xs sm:text-sm font-mono text-slate-400">Eq {idx + 1}:</span>
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  <MathView math="x \equiv" />
                </span>
                <input
                  type="number"
                  value={row.a}
                  onChange={(e) => {
                    const next = [...crtRows];
                    next[idx].a = e.target.value;
                    setCrtRows(next);
                  }}
                  className="w-24 bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  <MathView text="$(\\text{mod}$" />
                </span>
                <input
                  type="number"
                  value={row.m}
                  onChange={(e) => {
                    const next = [...crtRows];
                    next[idx].m = e.target.value;
                    setCrtRows(next);
                  }}
                  className="w-24 bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-1.5 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  <MathView text="$)$" />
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750">
            {crtResult.valid ? (
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint">
                  <MathView text={`Unique CRT Solution Modulo $M = ${crtResult.M}$`} />
                </span>
                <div className="text-base sm:text-lg font-mono font-bold text-neon-mint py-1">
                  <MathView
                    math={`x \\equiv ${crtResult.solution} \\pmod{${crtResult.M}}`}
                    display
                  />
                </div>
                <div className="pt-2 border-t border-cosmic-750">
                  <h6 className="text-xs sm:text-sm uppercase font-bold text-neon-cyan mb-2">
                    Step-by-step CRT Coefficients
                  </h6>
                  <div className="space-y-1.5 text-xs sm:text-sm font-mono text-slate-300">
                    {crtResult.steps.map((s) => (
                      <div key={s.index} className="p-2.5 rounded-xl bg-cosmic-950 border border-cosmic-750">
                        Equation {s.index}: <MathView math={`M_${s.index} = ${s.Mi}, \\; y_${s.index} \\equiv (${s.Mi})^{-1} \\equiv ${s.yi} \\pmod{${s.mi}}, \\; \\text{term} = ${s.term}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-neon-pink">
                <MathView text={crtResult.error} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Fast Exponentiation */}
      {activeTab === 'fastexp' && (
        <div className="space-y-6">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan mb-3 flex items-center gap-2">
              <span>Compute Fast Modular Exponentiation:</span>
              <MathView math="a^b \pmod m" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Base $a$" />
                </label>
                <input
                  type="number"
                  value={expBase}
                  onChange={(e) => setExpBase(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Exponent $b$" />
                </label>
                <input
                  type="number"
                  value={expPow}
                  onChange={(e) => setExpPow(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm text-slate-300 block mb-1">
                  <MathView text="Modulus $m$" />
                </label>
                <input
                  type="number"
                  value={expMod}
                  onChange={(e) => setExpMod(e.target.value)}
                  className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                <MathView text={`Binary Representation: $${expPow} = (${fastExpResult.binaryExp})_2$`} />
              </span>
              <span className="text-base font-mono font-bold text-neon-mint">
                <MathView text={`Result $= ${fastExpResult.result}$`} />
              </span>
            </div>
            <div className="space-y-1.5 pt-2">
              {fastExpResult.steps.map((st, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-cosmic-950 border border-cosmic-750 flex items-center justify-between text-xs sm:text-sm font-mono"
                >
                  <span className="text-slate-400">
                    <MathView text={`Bit $${st.bit}$ ($2^{${st.power}}$):`} />
                  </span>
                  <span className="text-neon-cyan">
                    <MathView text={st.action} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
