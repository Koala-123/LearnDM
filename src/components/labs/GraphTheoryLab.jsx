import React, { useState, useMemo } from 'react';
import MathView from '../MathView';
import {
  analyzeGraph,
  runKruskal,
  getGraphPreset,
} from '../../engines/graphEngine';
import { Share2, Check, X, Sparkles, RefreshCw, Plus, Play } from 'lucide-react';

const PRESET_MAP = {
  petersen: 'Petersen',
  k5: 'K5',
  k33: 'K33',
  tree: 'Tree',
  cycle: 'Petersen',
};

export default function GraphTheoryLab({ initialData }) {
  const initialPresetKey = initialData?.preset ? (PRESET_MAP[initialData.preset.toLowerCase()] || 'Petersen') : 'Petersen';
  const [preset, setPreset] = useState(initialPresetKey);

  const defaultGraph = useMemo(() => {
    return getGraphPreset(preset) || getGraphPreset('Petersen');
  }, [preset]);

  const [vertices, setVertices] = useState(defaultGraph.vertices);
  const [edges, setEdges] = useState(defaultGraph.edges);
  const [selectedVertex, setSelectedVertex] = useState(null);

  React.useEffect(() => {
    const g = getGraphPreset(preset);
    if (g) {
      setVertices(g.vertices);
      setEdges(g.edges);
      setSelectedVertex(null);
    }
  }, [preset]);

  const analysis = useMemo(() => {
    return analyzeGraph(vertices, edges, false);
  }, [vertices, edges]);

  const kruskalResult = useMemo(() => {
    return runKruskal(vertices, edges);
  }, [vertices, edges]);

  // Click on canvas to add vertex
  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newId = String(vertices.length + 1);
    setVertices([...vertices, { id: newId, x, y }]);
  };

  // Click on vertex to start or complete edge
  const handleVertexClick = (e, vId) => {
    e.stopPropagation();
    if (!selectedVertex) {
      setSelectedVertex(vId);
    } else if (selectedVertex === vId) {
      setSelectedVertex(null);
    } else {
      const exists = edges.some(
        (ed) =>
          (ed.source === selectedVertex && ed.target === vId) ||
          (ed.source === vId && ed.target === selectedVertex)
      );
      if (!exists) {
        setEdges([...edges, { source: selectedVertex, target: vId, weight: 1 }]);
      }
      setSelectedVertex(null);
    }
  };

  const clearCanvas = () => {
    setVertices([]);
    setEdges([]);
    setSelectedVertex(null);
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">Presets:</span>
          {[
            { id: 'Petersen', label: 'Petersen Graph' },
            { id: 'K5', label: 'K₅ (Complete 5)' },
            { id: 'K33', label: 'K₃,₃ (Utility)' },
            { id: 'Tree', label: 'Spanning Tree' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`btn-arcade px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                preset === p.id
                  ? 'bg-neon-mint text-cosmic-950 font-extrabold shadow-glow-mint border border-neon-mint'
                  : 'bg-cosmic-950/80 border-cosmic-750 text-slate-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={clearCanvas}
          className="btn-arcade px-3.5 py-1.5 text-xs sm:text-sm rounded-full bg-cosmic-950 border border-cosmic-750 text-neon-pink hover:border-neon-pink transition font-semibold"
        >
          Clear Canvas
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 block">
            <MathView text="Vertices $|V|$ & Edges $|E|$" />
          </span>
          <span className="text-sm sm:text-base font-mono font-bold text-neon-cyan mt-1 block">
            <MathView math={`|V| = ${analysis.vertexCount}, \\; |E| = ${analysis.edgeCount}`} />
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 block">
            Handshaking Sum
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-neon-mint mt-1 block">
            <MathView math={`\\sum \\deg(v) = ${analysis.totalDegree} = 2(${analysis.edgeCount})`} />
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 block">
            Bipartite Status
          </span>
          <span
            className={`text-xs sm:text-sm font-bold flex items-center justify-center gap-1 mt-0.5 ${
              analysis.isBipartite ? 'text-neon-mint' : 'text-neon-pink'
            }`}
          >
            {analysis.isBipartite ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {analysis.isBipartite ? '2-Colorable Bipartite' : 'Contains Odd Cycle'}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 block">
            Tree Status
          </span>
          <span
            className={`text-xs sm:text-sm font-bold flex items-center justify-center gap-1 mt-0.5 ${
              analysis.isTree ? 'text-neon-mint' : 'text-neon-gold'
            }`}
          >
            {analysis.isTree ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {analysis.isTree ? (
              <MathView text="Is a Tree ($|E| = |V| - 1$)" />
            ) : (
              'Not a Tree'
            )}
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas & Invariants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas Card */}
        <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan">
              Interactive Canvas
            </span>
            <span className="text-xs text-slate-400">
              Click blank space to add node • Click 2 nodes to draw edge
            </span>
          </div>

          <svg
            viewBox="0 0 500 380"
            onClick={handleCanvasClick}
            className="w-full h-80 bg-cosmic-950/80 rounded-2xl border border-cosmic-750 cursor-crosshair select-none"
          >
            {/* Edges */}
            {edges.map((e, idx) => {
              const u = vertices.find((v) => String(v.id) === String(e.source));
              const v = vertices.find((v) => String(v.id) === String(e.target));
              if (!u || !v) return null;

              const isMst = kruskalResult.mstEdges.some(
                (m) =>
                  (m.source === e.source && m.target === e.target) ||
                  (m.source === e.target && m.target === e.source)
              );

              return (
                <line
                  key={idx}
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={isMst ? '#10e598' : '#334155'}
                  strokeWidth={isMst ? '3' : '2'}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Vertices */}
            {vertices.map((v) => {
              const isSelected = selectedVertex === v.id;
              const vIdx = vertices.findIndex((vert) => vert.id === v.id);
              const colorIdx = analysis.vertexColorMap[vIdx] || 0;
              const palette = ['#a855f7', '#10e598', '#fbbf24', '#ff4b72', '#38bdf8'];
              const fill = isSelected ? '#ff4b72' : palette[colorIdx % palette.length];

              return (
                <g key={v.id} onClick={(e) => handleVertexClick(e, v.id)} className="cursor-pointer">
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r={isSelected ? 18 : 14}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? '3' : '1.5'}
                    className="transition-all duration-150"
                  />
                  <text
                    x={v.x}
                    y={v.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="Space Mono"
                    fontWeight="bold"
                  >
                    {v.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Invariants & Analysis Panel */}
        <div className="space-y-4">
          {/* Degree Sequence & Eulerian */}
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-purple">
              Degree Sequence & Eulerian Classification
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs sm:text-sm font-mono">
              {analysis.degreeSequence.map((d) => (
                <span
                  key={d.id}
                  className="px-3 py-1.5 rounded-xl bg-cosmic-950 border border-cosmic-750 text-slate-300"
                >
                  <MathView math={`v_{${d.id}}: \\deg = ${d.deg}`} />
                </span>
              ))}
            </div>
            <div className="p-3.5 rounded-2xl bg-cosmic-950/80 border border-cosmic-750 text-xs sm:text-sm">
              <span className="font-bold text-slate-400 block mb-0.5">Eulerian Result:</span>
              <span className="text-neon-mint font-mono font-bold">{analysis.eulerianStatus}</span>
            </div>
          </div>

          {/* Planarity Diagnostics */}
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-2">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-cyan">
              <MathView text="Planar Formula & Bounds (Euler: $V - E + F = 2$)" />
            </h4>
            <div className="text-xs sm:text-sm text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold">Faces:</span>
                <MathView math={`F = E - V + 2 = ${analysis.planarFaces}`} />
              </div>
              {analysis.planarViolated ? (
                <div className="p-3.5 rounded-2xl bg-neon-pink/15 border border-neon-pink/40 text-neon-pink text-xs sm:text-sm mt-1">
                  <MathView text={`⚠️ ${analysis.planarReason}`} />
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-neon-mint">
                  Satisfies planar necessary edge bound <MathView math="E \le 3V - 6" />.
                </p>
              )}
            </div>
          </div>

          {/* Kruskal MST Result */}
          <div className="bg-cosmic-900/90 p-5 rounded-3xl border border-cosmic-750 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neon-mint">
                Kruskal's Minimum Spanning Tree
              </h4>
              <span className="text-sm font-mono font-bold text-neon-mint">
                MST Weight = {kruskalResult.totalWeight}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Edges highlighted in <span className="text-neon-mint font-bold">mint green</span> on the canvas form the minimum spanning tree.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
