import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Normalizes text containing unwrapped LaTeX commands so they render properly.
 */
function normalizeMixedMath(content) {
  if (!content) return '';
  let str = String(content);

  // If text has no $ delimiters but has LaTeX commands
  if (!str.includes('$') && /\\[a-zA-Z]+/.test(str)) {
    // Check if starts with a label like "Name: \command..."
    const colonMatch = str.match(/^([^:\n]+:\s*)([\s\S]+)$/);
    if (colonMatch && /\\[a-zA-Z]+/.test(colonMatch[2])) {
      str = colonMatch[1] + '$' + colonMatch[2].trim() + '$';
    } else if (str.trim().startsWith('\\')) {
      // Starts with a backslash command (pure LaTeX)
      str = '$' + str.trim() + '$';
    }
  }

  return str;
}

/**
 * Renders LaTeX math with KaTeX.
 * Props:
 * - math: string of pure LaTeX code
 * - display: boolean (true for block/display math, false for inline)
 * - text: string containing mixed text and inline $...$ or display $$...$$ math
 * - children: string fallback for text or math
 * - className: additional CSS classes
 */
export default function MathView({ math, display = false, text, children, className = '' }) {
  const renderedHtml = useMemo(() => {
    // 1. Explicit math prop: render directly with KaTeX
    if (math !== undefined && math !== null) {
      try {
        return katex.renderToString(String(math), {
          displayMode: display,
          throwOnError: false,
        });
      } catch (err) {
        console.error('KaTeX error:', err);
        return `<span class="text-rose-400 font-mono">${math}</span>`;
      }
    }

    // 2. Mixed text or children
    const rawContent = text !== undefined && text !== null ? text : children;
    if (rawContent !== undefined && rawContent !== null) {
      const content = normalizeMixedMath(rawContent);

      // Split on $$...$$, $...$, \[...\], \(...\)
      const delimiterRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g;
      const parts = content.split(delimiterRegex);

      return parts
        .map((part) => {
          if (!part) return '';

          // Display math: $$...$$ or \[...\]
          if ((part.startsWith('$$') && part.endsWith('$$')) || (part.startsWith('\\[') && part.endsWith('\\]'))) {
            const rawMath = part.slice(2, -2).trim();
            try {
              return katex.renderToString(rawMath, { displayMode: true, throwOnError: false });
            } catch {
              return `<span class="text-rose-400 font-mono">${rawMath}</span>`;
            }
          }

          // Inline math: $...$ or \(...\)
          if ((part.startsWith('$') && part.endsWith('$')) || (part.startsWith('\\(') && part.endsWith('\\)'))) {
            const rawMath = part.slice(part.startsWith('$') ? 1 : 2, part.endsWith('$') ? -1 : -2).trim();
            try {
              return katex.renderToString(rawMath, { displayMode: false, throwOnError: false });
            } catch {
              return `<span class="text-rose-400 font-mono">${rawMath}</span>`;
            }
          }

          // Plain text segment: basic markdown bold/italics and HTML escaping
          let formatted = part
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
            .replace(/`([^`\n]+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-cosmic-950/80 text-neon-cyan font-mono text-xs font-semibold">$1</code>')
            .replace(/\n/g, '<br/>');

          return formatted;
        })
        .join('');
    }

    return '';
  }, [math, display, text, children]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
