import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import { generateTruthTable, checkEquivalence } from '../../engines/logicEngine';
import { Binary, Check, X, Sparkles, Scale } from 'lucide-react';

export default function LogicTruthTableLab({ initialData }) {
  const [expr, setExpr] = useState(initialData?.expression || initialData?.exprA || '((p -> q) ∧ ¬q) -> ¬p');
  const [compareMode, setCompareMode] = useState(Boolean(initialData?.exprB));
  const [exprB, setExprB] = useState(initialData?.exprB || '¬p ∨ q');

  // Insert symbol at cursor / end
  const insertSymbol = (sym, isSecondary = false) => {
    if (isSecondary) {
      setExprB((prev) => prev + sym);
    } else {
      setExpr((prev) => prev + sym);
    }
  };

  const tableData = useMemo(() => {
    if (compareMode) {
      return checkEquivalence(expr, exprB);
    }
    return generateTruthTable(expr);
  }, [expr, exprB, compareMode]);

  const presets = [
    { label: 'Modus Tollens', expr: '((p -> q) ∧ ¬q) -> ¬p' },
    { label: 'De Morgan (AND)', exprA: '¬(p ∧ q)', exprB: '¬p ∨ ¬q', compare: true },
    { label: 'Implication Equivalence', exprA: 'p -> q', exprB: '¬p ∨ q', compare: true },
    { label: 'Exclusive OR', exprA: 'p ⊕ q', exprB: '(p ∧ ¬q) ∨ (¬p ∧ q)', compare: true },
    { label: 'Hypothetical Syllogism', expr: '((p -> q) ∧ (q -> r)) -> (p -> r)' },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">Quick Presets:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (preset.compare) {
                setCompareMode(true);
                setExpr(preset.exprA);
                setExprB(preset.exprB);
              } else {
                setCompareMode(false);
                setExpr(preset.expr);
              }
            }}
            className="btn-arcade px-3.5 py-1.5 text-xs sm:text-sm rounded-full bg-cosmic-950/80 border border-cosmic-750 text-slate-300 hover:border-neon-mint hover:text-neon-mint transition"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint">
            {compareMode ? 'Proposition Expression A' : 'Proposition Expression'}
          </label>
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`btn-arcade px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
              compareMode
                ? 'bg-neon-mint/20 text-neon-mint border border-neon-mint/40 shadow-glow-mint'
                : 'bg-cosmic-950 border border-cosmic-750 text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            {compareMode ? 'Comparing 2 Propositions' : 'Compare with 2nd Expression'}
          </button>
        </div>

        {/* Expression A input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="flex-1 bg-cosmic-950 border border-cosmic-750 rounded-xl px-4 py-2.5 text-sm sm:text-base text-neon-mint font-mono focus:outline-none focus:border-neon-mint"
            placeholder="(p -> q) ∧ p -> q"
          />
        </div>

        {/* Expression B input (if compare mode) */}
        {compareMode && (
          <div>
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan block mb-1">
              Proposition Expression B
            </label>
            <input
              type="text"
              value={exprB}
              onChange={(e) => setExprB(e.target.value)}
              className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-4 py-2.5 text-sm sm:text-base text-neon-cyan font-mono focus:outline-none focus:border-neon-cyan"
              placeholder="¬p ∨ q"
            />
          </div>
        )}

        {/* Virtual Logic Keyboard */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-cosmic-750/70 items-center">
          <span className="text-xs text-slate-400 mr-1 flex items-center font-mono font-bold">Symbols:</span>
          {['¬', '∧', '∨', '→', '↔', '⊕', '(', ')', 'p', 'q', 'r', 's'].map((sym) => (
            <button
              key={sym}
              onClick={() => insertSymbol(sym)}
              className="btn-arcade px-3.5 py-1.5 rounded-xl bg-cosmic-950 hover:bg-neon-mint/20 hover:text-neon-mint hover:border-neon-mint/40 border border-cosmic-750 text-xs sm:text-sm font-mono font-bold text-slate-200 transition"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Output results */}
      {tableData.error ? (
        <div className="p-4 rounded-2xl bg-neon-pink/10 border border-neon-pink/40 text-neon-pink text-sm font-mono">
          {tableData.error}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Classification Banner */}
          {!compareMode ? (
            <div
              className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-2 ${
                tableData.isTautology
                  ? 'bg-neon-mint/15 border-neon-mint/50 text-neon-mint shadow-glow-mint'
                  : tableData.isContradiction
                  ? 'bg-neon-pink/15 border-neon-pink/50 text-neon-pink shadow-glow-pink'
                  : 'bg-neon-purple/15 border-neon-purple/40 text-neon-purple'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs sm:text-sm uppercase font-bold tracking-wider">Classification:</span>
                <span className="text-sm sm:text-base font-bold">{tableData.classification}</span>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold opacity-90">
                {tableData.trueCount} / {tableData.totalRows} True evaluations
              </span>
            </div>
          ) : (
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                tableData.equivalent
                  ? 'bg-neon-mint/15 border-neon-mint/50 text-neon-mint shadow-glow-mint'
                  : 'bg-neon-pink/15 border-neon-pink/50 text-neon-pink shadow-glow-pink'
              }`}
            >
              <div className="flex items-center gap-2">
                {tableData.equivalent ? (
                  <Check className="w-4 h-4 text-neon-mint" />
                ) : (
                  <X className="w-4 h-4 text-neon-pink" />
                )}
                <span className="text-xs sm:text-sm uppercase font-bold tracking-wider">
                  Equivalence Verdict:
                </span>
                <span className="text-sm sm:text-base font-bold">
                  {tableData.equivalent ? (
                    <span className="flex items-center gap-1.5">
                      <span>Expressions are Logically Equivalent (</span>
                      <MathView math="A \equiv B" />
                      <span>) ✓</span>
                    </span>
                  ) : (
                    'Expressions are NOT Logically Equivalent ✗'
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Truth Table Display */}
          <div className="bg-cosmic-900/90 rounded-3xl border border-cosmic-750 overflow-x-auto p-4">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-cosmic-750 bg-cosmic-950/80 text-slate-400">
                  <th className="py-2.5 px-3 rounded-l-xl">#</th>
                  {tableData.variables?.map((v) => (
                    <th key={v} className="py-2.5 px-3 text-center text-neon-purple font-bold">
                      {v}
                    </th>
                  ))}
                  {!compareMode ? (
                    <th className="py-2.5 px-3 text-right text-neon-mint font-bold rounded-r-xl">
                      {expr}
                    </th>
                  ) : (
                    <>
                      <th className="py-2.5 px-3 text-center text-neon-mint font-bold">A: {expr}</th>
                      <th className="py-2.5 px-3 text-center text-neon-cyan font-bold">B: {exprB}</th>
                      <th className="py-2.5 px-3 text-right text-slate-300 rounded-r-xl">Match?</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData.rows?.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-cosmic-750/40 hover:bg-cosmic-800/40 transition"
                  >
                    <td className="py-2 px-3 text-slate-600">{idx + 1}</td>
                    {row.inputs.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        className={`py-2 px-3 text-center font-bold ${
                          val ? 'text-neon-mint' : 'text-slate-500'
                        }`}
                      >
                        {val ? 'T' : 'F'}
                      </td>
                    ))}
                    {!compareMode ? (
                      <td
                        className={`py-2 px-3 text-right font-bold ${
                          row.result ? 'text-neon-mint' : 'text-neon-pink'
                        }`}
                      >
                        {row.result ? 'T' : 'F'}
                      </td>
                    ) : (
                      <>
                        <td
                          className={`py-2 px-3 text-center font-bold ${
                            row.resA ? 'text-neon-mint' : 'text-neon-pink'
                          }`}
                        >
                          {row.resA ? 'T' : 'F'}
                        </td>
                        <td
                          className={`py-2 px-3 text-center font-bold ${
                            row.resB ? 'text-neon-mint' : 'text-neon-pink'
                          }`}
                        >
                          {row.resB ? 'T' : 'F'}
                        </td>
                        <td className="py-2 px-3 text-right">
                          {row.match ? (
                            <span className="text-neon-mint font-bold">✓</span>
                          ) : (
                            <span className="text-neon-pink font-bold">✗</span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
