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
          output: 'htmlAndMathml',
        });
      } catch (err) {
        console.error('KaTeX error:', err);
        return `<span class="text-rose-400 font-mono">${math}</span>`;
      }
    }

    // 2. Mixed text or children
    const rawContent = text !== undefined && text !== null ? text : children;
    if (rawContent !== undefined && rawContent !== null) {
      let str = normalizeMixedMath(rawContent);

      // Extract all math delimiters into placeholders so math doesn't split markdown tags
      const mathTokens = [];
      const tokenPrefix = 'XKMATHX';
      const tokenSuffix = 'XENDKMATHX';

      // Delimiters: $$...$$, $...$, \[...\], \(...\)
      const delimiterRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g;

      str = str.replace(delimiterRegex, (match) => {
        const index = mathTokens.length;
        let rawMath = '';
        let isBlockMath = false;

        if (match.startsWith('$$') && match.endsWith('$$')) {
          rawMath = match.slice(2, -2).trim();
          isBlockMath = true;
        } else if (match.startsWith('\\[') && match.endsWith('\\]')) {
          rawMath = match.slice(2, -2).trim();
          isBlockMath = true;
        } else if (match.startsWith('$') && match.endsWith('$')) {
          rawMath = match.slice(1, -1).trim();
          isBlockMath = false;
        } else if (match.startsWith('\\(') && match.endsWith('\\)')) {
          rawMath = match.slice(2, -2).trim();
          isBlockMath = false;
        }

        try {
          const rendered = katex.renderToString(rawMath, {
            displayMode: isBlockMath || display,
            throwOnError: false,
            output: 'htmlAndMathml',
          });
          mathTokens.push(rendered);
        } catch {
          mathTokens.push(`<span class="text-rose-400 font-mono">${rawMath}</span>`);
        }

        return `${tokenPrefix}${index}${tokenSuffix}`;
      });

      // Escape HTML entities in text (safe because placeholders are purely alphanumeric)
      str = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Process Markdown on the string with intact tokens:
      // Bold: **text** or __text__
      str = str.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
      str = str.replace(/__([^_]+?)__/g, '<strong>$1</strong>');

      // Italic: *text* or _text_ (using negative lookbehind and lookahead to avoid bold collisions)
      str = str.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
      str = str.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>');

      // Strikethrough: ~~text~~
      str = str.replace(/~~([^~]+?)~~/g, '<del>$1</del>');

      // Inline code: `code`
      str = str.replace(/`([^`\n]+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-cosmic-950/80 text-neon-cyan font-mono text-xs font-semibold">$1</code>');

      // Process list bullets and numbers at line start while preserving indentation
      const lines = str.split('\n');
      const formattedLines = lines.map((line) => {
        // Leading indentation
        const indentMatch = line.match(/^(\s+)(.*)$/);
        let leadingSpaces = 0;
        let restOfLine = line;
        if (indentMatch) {
          leadingSpaces = indentMatch[1].length;
          restOfLine = indentMatch[2];
        }

        const indentHtml = leadingSpaces > 0 ? '&nbsp;'.repeat(leadingSpaces * 2) : '';

        // Bullet points: • or - or *
        const bulletMatch = restOfLine.match(/^(•|-|\*)\s+(.*)$/);
        if (bulletMatch) {
          return `${indentHtml}<span class="text-neon-cyan font-bold mr-1.5">•</span>${bulletMatch[2]}`;
        }

        // Numbered list items: e.g. 1. or 2.
        const numMatch = restOfLine.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return `${indentHtml}<span class="font-mono text-neon-cyan font-bold mr-1.5">${numMatch[1]}.</span>${numMatch[2]}`;
        }

        return indentHtml + restOfLine;
      });

      str = formattedLines.join('<br/>');

      // Restore all math tokens back into the HTML
      const tokenRestoreRegex = new RegExp(`${tokenPrefix}(\\d+)${tokenSuffix}`, 'g');
      str = str.replace(tokenRestoreRegex, (_, indexStr) => {
        const idx = parseInt(indexStr, 10);
        return mathTokens[idx] || '';
      });

      return str;
    }

    return '';
  }, [math, display, text, children]);

  const Component = display ? 'div' : 'span';

  return (
    <Component
      className={`${display ? 'block w-full' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
