import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import {
  buildZModN,
  buildZStarModN,
  buildKlein4,
  auditCayleyTable,
} from '../../engines/groupEngine';
import { Boxes, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function CayleyGroupLab({ initialData }) {
  const initialPreset = useMemo(() => {
    if (initialData?.groupType === 'units') return `ZStar${initialData.n || 8}`;
    if (initialData?.groupType === 'cyclic') return `Z${initialData.n || 4}`;
    if (initialData?.groupType === 'klein4') return 'Klein4';
    return initialData?.preset || 'Z4';
  }, [initialData]);

  const [preset, setPreset] = useState(initialPreset);

  const currentPreset = useMemo(() => {
    if (preset === 'Z4') return buildZModN(4);
    if (preset === 'Z6') return buildZModN(6);
    if (preset === 'ZStar8') return buildZStarModN(8);
    if (preset === 'ZStar10') return buildZStarModN(10);
    if (preset === 'Klein4') return buildKlein4();
    return buildZModN(4);
  }, [preset]);

  const [elements, setElements] = useState(currentPreset.elements);
  const [table, setTable] = useState(currentPreset.table);

  React.useEffect(() => {
    setElements(currentPreset.elements);
    setTable(currentPreset.table);
  }, [currentPreset]);

  const audit = useMemo(() => {
    return auditCayleyTable(elements, table);
  }, [elements, table]);

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Standard Structures:</span>
        {[
          { id: 'Z4', label: '(ℤ₄, +)' },
          { id: 'Z6', label: '(ℤ₆, +)' },
          { id: 'ZStar8', label: '(ℤ₈*, ×) Units' },
          { id: 'ZStar10', label: '(ℤ₁₀*, ×) Units' },
          { id: 'Klein4', label: 'V₄ (Klein 4-Group)' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            className={`btn-arcade px-3 py-1.5 text-xs rounded-full border transition ${
              preset === p.id
                ? 'bg-neon-cyan text-white border-neon-cyan shadow-glow-cyan font-bold'
                : 'bg-cosmic-950/80 border-cosmic-750 text-slate-400 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Structure Classification & Axiom Badges */}
      <div className="p-5 rounded-3xl bg-cosmic-900/90 border border-cosmic-750 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-neon-cyan block">
            Algebraic Classification
          </span>
          <span className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            {audit.classification}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-cosmic-950 border border-cosmic-750 text-slate-300">
            Identity: <span className="text-neon-mint font-bold">{audit.identity ?? 'None'}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-cosmic-950 border border-cosmic-750 text-slate-300">
            Order |G|: <span className="text-neon-purple font-bold">{elements.length}</span>
          </span>
        </div>
      </div>

      {/* Axiom Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <AxiomBadge label="Closure" holds={audit.isClosed} />
        <AxiomBadge label="Identity" holds={audit.identity !== null} />
        <AxiomBadge label="Inverses" holds={audit.allHaveInverses} />
        <AxiomBadge label="Associativity" holds={audit.isAssociative} />
        <AxiomBadge label="Abelian" holds={audit.isCommutative} />
      </div>

      {/* Cayley Table + Subgroup Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table View */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neon-cyan mb-2">
            Cayley Operation Table <MathView math={currentPreset.name} />
          </h4>
          <div className="overflow-x-auto p-2 bg-cosmic-950/80 rounded-2xl border border-cosmic-750/70">
            <table className="border-collapse mx-auto">
              <thead>
                <tr>
                  <th className="p-2.5 text-xs text-neon-cyan font-mono border-b border-r border-cosmic-750">
                    *
                  </th>
                  {elements.map((el) => (
                    <th
                      key={el}
                      className="p-2.5 text-xs font-mono font-bold text-neon-cyan border-b border-cosmic-750 text-center"
                    >
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {elements.map((rowEl, i) => (
                  <tr key={rowEl}>
                    <td className="p-2.5 text-xs font-mono font-bold text-neon-cyan border-r border-cosmic-750 text-right">
                      {rowEl}
                    </td>
                    {elements.map((colEl, j) => {
                      const val = table[i]?.[j];
                      const isIdentity = val === audit.identity;
                      return (
                        <td
                          key={colEl}
                          className={`p-2.5 text-center text-xs font-mono border border-cosmic-750/40 ${
                            isIdentity
                              ? 'bg-neon-mint/20 text-neon-mint font-bold border-neon-mint/40'
                              : 'text-slate-300 hover:bg-cosmic-800/40'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Element Orders & Cyclic Subgroups */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neon-purple">
            Element Orders & Cyclic Subgroups ⟨g⟩
          </h4>
          <div className="space-y-2">
            {elements.map((el) => (
              <div
                key={el}
                className="p-3 rounded-2xl bg-cosmic-950 border border-cosmic-750 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-neon-cyan">g = {el}</span>
                  <span className="text-slate-400">
                    ord({el}) ={' '}
                    <span className="text-neon-mint font-mono font-bold">
                      {audit.elementOrders[el]}
                    </span>
                  </span>
                </div>
                <div className="text-slate-300 font-mono text-[11px]">
                  ⟨{el}⟩ = &#123;{audit.cyclicSubgroups[el]?.join(', ')}&#125;
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-cosmic-950/60 border border-cosmic-750 text-[11px] text-slate-400">
            By <strong>Lagrange's Theorem</strong>, the order of each subgroup |⟨g⟩| and element ord(g) divides the group order |G| = {elements.length}.
          </div>
        </div>
      </div>
    </div>
  );
}

function AxiomBadge({ label, holds }) {
  return (
    <div
      className={`p-3 rounded-2xl border text-center transition ${
        holds
          ? 'bg-neon-mint/15 border-neon-mint/40 text-neon-mint shadow-glow-mint'
          : 'bg-neon-pink/15 border-neon-pink/40 text-neon-pink shadow-glow-pink'
      }`}
    >
      <div className="flex items-center justify-center gap-1 text-xs font-bold">
        {holds ? <Check className="w-3.5 h-3.5 text-neon-mint" /> : <X className="w-3.5 h-3.5 text-neon-pink" />}
        {label}
      </div>
      <span className="text-[10px] font-mono block opacity-80 mt-0.5">{holds ? 'Verified' : 'Violated'}</span>
    </div>
  );
}
