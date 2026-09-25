import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Renders LaTeX math with KaTeX.
 * Props:
 * - math: string of LaTeX code
 * - display: boolean (true for block/display math, false for inline)
 * - text: string containing mixed text and inline $...$ or display $$...$$ math
 */
export default function MathView({ math, display = false, text, className = '' }) {
  const renderedHtml = useMemo(() => {
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

    if (text) {
      // Split on $$...$$ and $...$
      // Replace $$math$$ first, then $math$
      const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);
      return parts
        .map((part) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const rawMath = part.slice(2, -2).trim();
            try {
              return katex.renderToString(rawMath, { displayMode: true, throwOnError: false });
            } catch {
              return `<span class="text-rose-400 font-mono">${rawMath}</span>`;
            }
          } else if (part.startsWith('$') && part.endsWith('$')) {
            const rawMath = part.slice(1, -1).trim();
            try {
              return katex.renderToString(rawMath, { displayMode: false, throwOnError: false });
            } catch {
              return `<span class="text-rose-400 font-mono">${rawMath}</span>`;
            }
          } else {
            // Regular text: sanitize minimal HTML entities to avoid XSS
            return part
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/\n/g, '<br/>');
          }
        })
        .join('');
    }

    return '';
  }, [math, display, text]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
