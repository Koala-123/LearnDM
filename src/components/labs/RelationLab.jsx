import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import { analyzeRelation } from '../../engines/relationEngine';
import { Check, X, ShieldAlert, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export default function RelationLab({ initialData }) {
  const [elementsStr, setElementsStr] = useState(
    initialData?.elements ? initialData.elements.join(', ') : '1, 2, 3, 4'
  );
  const [pairsStr, setPairsStr] = useState(
    initialData?.pairs
      ? initialData.pairs.map((p) => `(${p[0]},${p[1]})`).join(' ')
      : '(1,1) (2,2) (3,3) (4,4) (1,2) (2,1)'
  );

  const elements = useMemo(() => {
    return elementsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }, [elementsStr]);

  const pairs = useMemo(() => {
    const raw = pairsStr.match(/\(([^,]+),([^)]+)\)/g) || [];
    return raw.map((p) => {
      const parts = p.slice(1, -1).split(',');
      return [parts[0].trim(), parts[1].trim()];
    });
  }, [pairsStr]);

  const analysis = useMemo(() => {
    return analyzeRelation(elements, pairs);
  }, [elements, pairs]);

  // Toggle cell in matrix
  const handleToggleCell = (u, v) => {
    const exists = pairs.some(([a, b]) => a === u && b === v);
    if (exists) {
      const next = pairs.filter(([a, b]) => !(a === u && b === v));
      setPairsStr(next.map((p) => `(${p[0]},${p[1]})`).join(' '));
    } else {
      const next = [...pairs, [u, v]];
      setPairsStr(next.map((p) => `(${p[0]},${p[1]})`).join(' '));
    }
  };

  const applyClosure = (type) => {
    if (type === 'reflexive') {
      setPairsStr(analysis.reflexiveClosurePairs.map((p) => `(${p[0]},${p[1]})`).join(' '));
    } else if (type === 'symmetric') {
      setPairsStr(analysis.symmetricClosurePairs.map((p) => `(${p[0]},${p[1]})`).join(' '));
    } else if (type === 'transitive') {
      setPairsStr(analysis.transitiveClosurePairs.map((p) => `(${p[0]},${p[1]})`).join(' '));
    }
  };

  return (
    <div className="space-y-6">
      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neon-purple mb-1">
            Set Elements <span className="text-slate-400 font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={elementsStr}
            onChange={(e) => setElementsStr(e.target.value)}
            className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm text-neon-purple font-mono focus:outline-none focus:border-neon-purple"
            placeholder="1, 2, 3, 4"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neon-pink mb-1">
            Relation Pairs <span className="text-slate-400 font-normal">format: (a,b) (c,d)</span>
          </label>
          <input
            type="text"
            value={pairsStr}
            onChange={(e) => setPairsStr(e.target.value)}
            className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-sm text-neon-pink font-mono focus:outline-none focus:border-neon-pink"
            placeholder="(1,1) (1,2) (2,1)"
          />
        </div>
      </div>

      {/* Property Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <PropertyBadge
          label="Reflexive"
          holds={analysis.reflexive}
          tooltip={analysis.reflexive ? 'All (a, a) present' : `Missing: ${analysis.missingReflexive.map(x => `(${x},${x})`).join(', ')}`}
        />
        <PropertyBadge
          label="Symmetric"
          holds={analysis.symmetric}
          tooltip={analysis.symmetric ? 'For all (a,b), (b,a) in R' : `Failed on: (${analysis.failingSymmetric[0]?.[0]}, ${analysis.failingSymmetric[0]?.[1]})`}
        />
        <PropertyBadge
          label="Antisymmetric"
          holds={analysis.antisymmetric}
          tooltip={analysis.antisymmetric ? 'No distinct mutual pairs' : `Both (${analysis.failingAntisymmetric[0]?.[0]},${analysis.failingAntisymmetric[0]?.[1]}) and reverse in R`}
        />
        <PropertyBadge
          label="Transitive"
          holds={analysis.transitive}
          tooltip={analysis.transitive ? 'Paths compose correctly' : `Missing transitive link for (${analysis.failingTransitive[0]?.[0]},${analysis.failingTransitive[0]?.[1]}) & (${analysis.failingTransitive[0]?.[1]},${analysis.failingTransitive[0]?.[2]})`}
        />
        <PropertyBadge
          label="Equivalence"
          holds={analysis.isEquivalence}
          tooltip="Reflexive + Symmetric + Transitive"
          highlight
        />
        <PropertyBadge
          label="Partial Order"
          holds={analysis.isPartialOrder}
          tooltip="Reflexive + Antisymmetric + Transitive"
          highlight
        />
      </div>

      {/* Interactive 0-1 Matrix & Fast Closures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matrix Card */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-purple shadow-glow-purple" />
              0–1 Boolean Adjacency Matrix
            </h4>
            <span className="text-[11px] text-slate-400">Click cells to toggle</span>
          </div>

          <div className="overflow-x-auto p-2 bg-cosmic-950/80 rounded-2xl border border-cosmic-750/70">
            <table className="border-collapse mx-auto">
              <thead>
                <tr>
                  <th className="p-2 text-xs text-slate-500 font-mono"></th>
                  {elements.map((el) => (
                    <th key={el} className="p-2 text-xs text-neon-purple font-mono text-center">
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {elements.map((u, i) => (
                  <tr key={u}>
                    <td className="p-2 text-xs text-neon-purple font-mono text-right">{u}</td>
                    {elements.map((v, j) => {
                      const hasPair = analysis.matrix[i]?.[j];
                      return (
                        <td key={v} className="p-1">
                          <button
                            onClick={() => handleToggleCell(u, v)}
                            className={`btn-arcade w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                              hasPair
                                ? 'bg-neon-purple text-white shadow-glow-purple hover:bg-neon-purple/90 border border-neon-purple'
                                : 'bg-cosmic-900 border border-cosmic-750 text-slate-500 hover:bg-cosmic-800 hover:text-slate-300'
                            }`}
                            title={`Toggle (${u}, ${v})`}
                          >
                            {hasPair ? '1' : '0'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Closures & Equivalence Partition */}
        <div className="space-y-4">
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-gold" />
              1-Click Algorithmic Closures
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyClosure('reflexive')}
                className="btn-arcade px-3 py-1.5 rounded-full text-xs font-semibold bg-cosmic-950 border border-cosmic-750 text-slate-200 hover:border-neon-purple hover:text-neon-purple transition"
              >
                + Reflexive Closure <MathView math="R \cup \Delta" />
              </button>
              <button
                onClick={() => applyClosure('symmetric')}
                className="btn-arcade px-3 py-1.5 rounded-full text-xs font-semibold bg-cosmic-950 border border-cosmic-750 text-slate-200 hover:border-neon-pink hover:text-neon-pink transition"
              >
                + Symmetric Closure <MathView math="R \cup R^{-1}" />
              </button>
              <button
                onClick={() => applyClosure('transitive')}
                className="btn-arcade px-3 py-1.5 rounded-full text-xs font-semibold bg-cosmic-950 border border-cosmic-750 text-slate-200 hover:border-neon-cyan hover:text-neon-cyan transition"
              >
                + Transitive Closure (Warshall)
              </button>
            </div>
          </div>

          {/* Equivalence Classes Card */}
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">
              Quotient Set & Partitions <MathView math="A / R" />
            </h4>
            {analysis.isEquivalence ? (
              <div className="space-y-2">
                <p className="text-xs text-neon-mint font-semibold">
                  ✓ Valid Equivalence Relation! Generates partition of A:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.equivalenceClasses.map((cls, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 bg-neon-purple/15 border border-neon-purple/40 rounded-2xl text-xs font-mono font-bold text-neon-purple"
                    >
                      [{cls[0]}] = &#123;{cls.join(', ')}&#125;
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                R is not yet an equivalence relation. Use the 1-click closure buttons above or toggle matrix cells to complete missing pairs.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyBadge({ label, holds, tooltip, highlight = false }) {
  return (
    <div
      title={tooltip}
      className={`p-3 rounded-2xl border flex flex-col items-center text-center cursor-help transition ${
        holds
          ? highlight
            ? 'bg-neon-mint/15 border-neon-mint/60 text-neon-mint shadow-glow-mint'
            : 'bg-neon-mint/10 border-neon-mint/40 text-neon-mint'
          : 'bg-cosmic-950/60 border-cosmic-750 text-slate-500'
      }`}
    >
      <div className="flex items-center gap-1 text-xs font-bold">
        {holds ? <Check className="w-3.5 h-3.5 text-neon-mint" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
        {label}
      </div>
      <span className="text-[10px] font-mono mt-0.5 opacity-80">{holds ? 'Holds' : 'Fails'}</span>
    </div>
  );
}
