import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import { buildDivisibilityPoset, buildPowerSetPoset } from '../../engines/posetEngine';
import { Layers, Check, X, Sparkles, Eye } from 'lucide-react';

export default function PosetHasseLab({ initialData }) {
  const [presetType, setPresetType] = useState(
    initialData?.n ? `D${initialData.n}` : (initialData?.preset || 'D12')
  );
  const [selectedPair, setSelectedPair] = useState(['4', '6']);

  const poset = useMemo(() => {
    if (presetType === 'D12') return buildDivisibilityPoset(12);
    if (presetType === 'D30') return buildDivisibilityPoset(30);
    if (presetType === 'D36') return buildDivisibilityPoset(36);
    if (presetType === 'P3') return buildPowerSetPoset(['a', 'b', 'c']);
    return buildDivisibilityPoset(12);
  }, [presetType]);

  // Ensure selected pair elements exist in current poset
  const safePair = useMemo(() => {
    const el1 = poset.elements.includes(selectedPair[0]) ? selectedPair[0] : poset.elements[0];
    const el2 = poset.elements.includes(selectedPair[1])
      ? selectedPair[1]
      : poset.elements[Math.min(1, poset.elements.length - 1)];
    return [el1, el2];
  }, [poset, selectedPair]);

  const pairBounds = useMemo(() => {
    return poset.getPairBounds(safePair[0], safePair[1]);
  }, [poset, safePair]);

  // Compute 2D node coordinates for SVG Hasse diagram
  const svgLayout = useMemo(() => {
    const width = 480;
    const height = 320;
    const padding = 45;

    const levels = poset.levelGroups;
    const maxLevel = Math.max(...Object.keys(levels).map(Number));

    const coords = {};
    Object.keys(levels).forEach((lvlStr) => {
      const lvl = Number(lvlStr);
      const row = levels[lvl];
      const y = height - padding - (lvl / (maxLevel || 1)) * (height - 2 * padding);

      row.forEach((el, idx) => {
        const x = padding + ((idx + 1) / (row.length + 1)) * (width - 2 * padding);
        coords[el] = { x, y };
      });
    });

    return { width, height, coords };
  }, [poset]);

  return (
    <div className="space-y-6">
      {/* Presets Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Poset Presets:</span>
        {[
          { id: 'D12', label: 'D₁₂ (Divisors of 12)' },
          { id: 'D30', label: 'D₃₀ (Square-free: Boolean Algebra)' },
          { id: 'D36', label: 'D₃₆ (Non-Boolean Lattice)' },
          { id: 'P3', label: '𝒫({a,b,c}) (Power Set Cube)' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPresetType(p.id)}
            className={`btn-arcade px-3 py-1.5 text-xs rounded-full border transition ${
              presetType === p.id
                ? 'bg-neon-purple text-white border-neon-purple shadow-glow-purple font-bold'
                : 'bg-cosmic-950/80 border-cosmic-750 text-slate-400 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Extremal elements & Lattice Audit */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Element (⊤)</span>
          <span className="text-sm font-mono font-bold text-neon-purple">
            {poset.greatest ?? 'None'}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Bottom Element (⊥)</span>
          <span className="text-sm font-mono font-bold text-neon-purple">
            {poset.least ?? 'None'}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Lattice Status</span>
          <span
            className={`text-xs font-bold flex items-center justify-center gap-1 mt-0.5 ${
              poset.isLattice ? 'text-neon-mint' : 'text-neon-pink'
            }`}
          >
            {poset.isLattice ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {poset.isLattice ? 'Is a Lattice' : 'Not a Lattice'}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Boolean Algebra</span>
          <span
            className={`text-xs font-bold flex items-center justify-center gap-1 mt-0.5 ${
              poset.isBooleanAlgebra ? 'text-neon-mint' : 'text-neon-gold'
            }`}
          >
            {poset.isBooleanAlgebra ? 'Boolean Algebra' : 'Non-Boolean'}
          </span>
        </div>
      </div>

      {/* Main Grid: SVG Hasse Diagram + Interactive Pair Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SVG Hasse Diagram */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 flex flex-col items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neon-purple self-start mb-3">
            Layered Hasse Diagram <MathView math={poset.name} />
          </h4>
          <svg
            viewBox={`0 0 ${svgLayout.width} ${svgLayout.height}`}
            className="w-full max-w-md h-auto bg-cosmic-950/80 rounded-2xl border border-cosmic-750 p-2"
          >
            {/* Hasse Edges */}
            {poset.hasseEdges.map(([u, v], idx) => {
              const p1 = svgLayout.coords[u];
              const p2 = svgLayout.coords[v];
              if (!p1 || !p2) return null;
              return (
                <line
                  key={idx}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Nodes */}
            {poset.elements.map((el) => {
              const pt = svgLayout.coords[el];
              if (!pt) return null;
              const isSelected = safePair.includes(el);
              const isLub = pairBounds?.lub === el;
              const isGlb = pairBounds?.glb === el;

              let fill = '#0a0e1a';
              let stroke = '#a855f7';
              if (isSelected) {
                fill = '#ff4b72';
                stroke = '#ffffff';
              } else if (isLub) {
                fill = '#10e598';
                stroke = '#ffffff';
              } else if (isGlb) {
                fill = '#fbbf24';
                stroke = '#ffffff';
              }

              return (
                <g key={el} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected || isLub || isGlb ? 16 : 13}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected || isLub || isGlb ? '2.5' : '1.5'}
                    className="transition-all duration-150"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 4}
                    textAnchor="middle"
                    fill={isSelected || isLub || isGlb ? '#ffffff' : '#f1f5f9'}
                    fontSize="10"
                    fontFamily="Space Mono"
                    fontWeight="bold"
                  >
                    {el}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Pair LUB/GLB Explorer */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-neon-cyan" />
            Interactive Pair Bounds & Meets/Joins
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Element 1</label>
              <select
                value={safePair[0]}
                onChange={(e) => setSelectedPair([e.target.value, safePair[1]])}
                className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-xs font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
              >
                {poset.elements.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Element 2</label>
              <select
                value={safePair[1]}
                onChange={(e) => setSelectedPair([safePair[0], e.target.value])}
                className="w-full bg-cosmic-950 border border-cosmic-750 rounded-xl px-3 py-2 text-xs font-mono text-neon-pink focus:outline-none focus:border-neon-pink"
              >
                {poset.elements.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pairBounds && (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Upper Bounds of &#123;{safePair[0]}, {safePair[1]}&#125;
                </span>
                <span className="text-xs font-mono text-slate-200">
                  &#123;{pairBounds.upperBounds.join(', ') || '∅'}&#125;
                </span>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-cosmic-750/70">
                  <span className="text-neon-mint font-bold">
                    LUB (Join: <MathView math={`${safePair[0]} \\lor ${safePair[1]}`} />):
                  </span>
                  <span className="font-mono font-bold text-neon-mint text-sm">
                    {pairBounds.lub ?? 'None'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cosmic-950/80 border border-cosmic-750">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Lower Bounds of &#123;{safePair[0]}, {safePair[1]}&#125;
                </span>
                <span className="text-xs font-mono text-slate-200">
                  &#123;{pairBounds.lowerBounds.join(', ') || '∅'}&#125;
                </span>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-cosmic-750/70">
                  <span className="text-neon-gold font-bold">
                    GLB (Meet: <MathView math={`${safePair[0]} \\land ${safePair[1]}`} />):
                  </span>
                  <span className="font-mono font-bold text-neon-gold text-sm">
                    {pairBounds.glb ?? 'None'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
