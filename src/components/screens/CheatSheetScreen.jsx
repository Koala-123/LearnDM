import React, { useState } from 'react';
import MathView from '../MathView';
import {
  FileText,
  AlertTriangle,
  Zap,
  CheckCircle,
  Copy,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';

export default function CheatSheetScreen({ topic }) {
  const [copied, setCopied] = useState(false);
  const cheatSheet = topic.cheatSheet || { formulas: [], traps: [] };

  const handleCopyAll = () => {
    const textToCopy = [
      `=== ${topic.title} Cheat Sheet ===`,
      '',
      '--- Key Formulas ---',
      ...cheatSheet.formulas.map((f) => `• ${f.name}: ${f.latex} (${f.notes})`),
      '',
      '--- Secret Traps & Counterexamples ---',
      ...cheatSheet.traps.map((t) => `[TRAP] ${t.title}: ${t.trap}\nCOUNTEREXAMPLE: ${t.counterexample}\nEXAM TIP: ${t.examTip}\n`),
    ].join('\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-br from-cosmic-900 via-cosmic-850 to-cosmic-900 border border-neon-gold/30 shadow-xl shadow-black/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-gold/20 text-neon-gold border border-neon-gold/40">
              ⚡ Exam Revision
            </span>
            <span className="text-xs text-slate-400">Unit {topic.unitNumber}</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Cheat Sheet & Secret Traps
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Rapid reference formulas, common grading pitfalls, and counterexamples for open-notes exams.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="btn-arcade px-4 py-2 rounded-full text-xs font-bold bg-cosmic-950/80 border border-cosmic-750 text-slate-200 hover:text-white hover:border-neon-gold/50 flex items-center gap-2"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-neon-mint" />
              <span className="text-neon-mint">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              <span>Copy Cheat Sheet</span>
            </>
          )}
        </button>
      </div>

      {/* Formulas Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-neon-purple" />
          <h4 className="text-base font-bold text-white tracking-tight">
            High-Yield Mathematical Formulas
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cheatSheet.formulas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-cosmic-900/90 border border-cosmic-750 space-y-2 hover:border-neon-purple/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  #{idx + 1}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-cosmic-950/80 border border-cosmic-750/70 text-center font-mono text-neon-purple text-sm">
                <MathView math={item.latex} display={true} />
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Secret Traps & Counterexamples */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-neon-pink" />
          <h4 className="text-base font-bold text-white tracking-tight">
            Secret Traps & Counterexamples (Where Students Lose Marks)
          </h4>
        </div>

        <div className="space-y-4">
          {cheatSheet.traps.map((trap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-cosmic-900/90 border border-neon-pink/30 space-y-3.5 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-neon-pink/20 border border-neon-pink/40 text-neon-pink text-xs font-mono font-bold flex items-center justify-center">
                  !
                </span>
                <h5 className="text-sm font-bold text-white">
                  {trap.title}
                </h5>
              </div>

              {/* The Trap */}
              <div className="p-3.5 rounded-xl bg-neon-pink/10 border border-neon-pink/25 text-xs text-rose-200 leading-relaxed flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neon-pink font-semibold">The Trap: </strong>
                  <MathView text={trap.trap} />
                </div>
              </div>

              {/* The Counterexample */}
              <div className="p-3.5 rounded-xl bg-cosmic-950/90 border border-cosmic-750 text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="text-[10px] font-mono text-neon-cyan uppercase font-bold tracking-wider">
                  Mathematical Counterexample
                </div>
                <div>
                  <MathView text={trap.counterexample} />
                </div>
              </div>

              {/* Exam Tip */}
              <div className="p-3.5 rounded-xl bg-neon-mint/10 border border-neon-mint/25 text-xs text-emerald-200 leading-relaxed flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-neon-mint shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neon-mint font-semibold">Professor's Tip: </strong>
                  {trap.examTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
