/**
 * Propositional Logic Engine
 * Parses and evaluates propositional formulas with variables (p, q, r, s, etc.)
 * Connectives supported:
 * ¬, ~, ! (NOT)
 * ∧, &, * (AND)
 * ∨, |, + (OR)
 * →, -> (IMPLIES)
 * ↔, <-> (IFF / BICONDITIONAL)
 * ⊕, ^ (XOR)
 */

export function tokenize(expr) {
  const tokens = [];
  let i = 0;
  const s = expr.replace(/\s+/g, '');

  while (i < s.length) {
    const c = s[i];
    if (s.startsWith('<->', i) || s.startsWith('↔', i)) {
      tokens.push('↔');
      i += s.startsWith('<->', i) ? 3 : 1;
    } else if (s.startsWith('->', i) || s.startsWith('→', i)) {
      tokens.push('→');
      i += s.startsWith('->', i) ? 2 : 1;
    } else if (c === '¬' || c === '~' || c === '!') {
      tokens.push('¬');
      i++;
    } else if (c === '∧' || c === '&') {
      tokens.push('∧');
      i++;
    } else if (c === '∨' || c === '|') {
      tokens.push('∨');
      i++;
    } else if (c === '⊕' || c === '^') {
      tokens.push('⊕');
      i++;
    } else if (c === '(' || c === ')') {
      tokens.push(c);
      i++;
    } else if (/[a-zA-Z]/.test(c)) {
      tokens.push(c.toLowerCase());
      i++;
    } else {
      i++;
    }
  }
  return tokens;
}

// Precedence: ¬ (highest) -> ∧, ⊕ -> ∨ -> → -> ↔ (lowest)
const PRECEDENCE = {
  '¬': 5,
  '∧': 4,
  '⊕': 4,
  '∨': 3,
  '→': 2,
  '↔': 1,
};

export function toPostfix(tokens) {
  const output = [];
  const operators = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/[a-z]/.test(token)) {
      output.push(token);
    } else if (token === '¬') {
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop());
      }
      operators.pop(); // Pop '('
    } else if (PRECEDENCE[token]) {
      while (
        operators.length &&
        operators[operators.length - 1] !== '(' &&
        PRECEDENCE[operators[operators.length - 1]] >= PRECEDENCE[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

export function evaluatePostfix(postfix, assignment) {
  const stack = [];
  for (const token of postfix) {
    if (/[a-z]/.test(token)) {
      stack.push(Boolean(assignment[token]));
    } else if (token === '¬') {
      const a = stack.pop();
      stack.push(!a);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      if (token === '∧') stack.push(a && b);
      else if (token === '∨') stack.push(a || b);
      else if (token === '→') stack.push(!a || b);
      else if (token === '↔') stack.push(a === b);
      else if (token === '⊕') stack.push(a !== b);
    }
  }
  return stack[0];
}

export function extractVariables(tokens) {
  const vars = new Set();
  for (const t of tokens) {
    if (/[a-z]/.test(t)) {
      vars.add(t);
    }
  }
  return Array.from(vars).sort();
}

export function generateTruthTable(expr) {
  try {
    const tokens = tokenize(expr);
    const variables = extractVariables(tokens);
    if (variables.length === 0) {
      return { error: 'No variables found in expression' };
    }
    if (variables.length > 5) {
      return { error: 'Maximum 5 variables supported for truth tables' };
    }

    const postfix = toPostfix(tokens);
    const totalRows = Math.pow(2, variables.length);
    const rows = [];
    let trueCount = 0;

    for (let r = 0; r < totalRows; r++) {
      const assignment = {};
      const rowValues = [];
      for (let v = 0; v < variables.length; v++) {
        // High bit is first variable
        const bit = Boolean((r >> (variables.length - 1 - v)) & 1);
        assignment[variables[v]] = !bit; // Standard math: T first, then F
        rowValues.push(!bit);
      }

      const result = evaluatePostfix(postfix, assignment);
      if (result) trueCount++;
      rows.push({
        assignment,
        inputs: rowValues,
        result,
      });
    }

    let classification = 'Contingency';
    if (trueCount === totalRows) classification = 'Tautology (Always True)';
    else if (trueCount === 0) classification = 'Contradiction (Always False)';

    return {
      variables,
      rows,
      classification,
      isTautology: trueCount === totalRows,
      isContradiction: trueCount === 0,
      totalRows,
      trueCount,
    };
  } catch (err) {
    return { error: 'Invalid logic syntax: ' + err.message };
  }
}

export function checkEquivalence(exprA, exprB) {
  const tokensA = tokenize(exprA);
  const tokensB = tokenize(exprB);
  const varsA = extractVariables(tokensA);
  const varsB = extractVariables(tokensB);
  const allVars = Array.from(new Set([...varsA, ...varsB])).sort();

  if (allVars.length === 0) return { error: 'No variables found' };
  if (allVars.length > 5) return { error: 'Too many variables' };

  const postfixA = toPostfix(tokensA);
  const postfixB = toPostfix(tokensB);
  const totalRows = Math.pow(2, allVars.length);
  const rows = [];
  let equivalent = true;

  for (let r = 0; r < totalRows; r++) {
    const assignment = {};
    const rowValues = [];
    for (let v = 0; v < allVars.length; v++) {
      const bit = Boolean((r >> (allVars.length - 1 - v)) & 1);
      assignment[allVars[v]] = !bit;
      rowValues.push(!bit);
    }

    const resA = evaluatePostfix(postfixA, assignment);
    const resB = evaluatePostfix(postfixB, assignment);
    const match = resA === resB;
    if (!match) equivalent = false;

    rows.push({
      assignment,
      inputs: rowValues,
      resA,
      resB,
      match,
    });
  }

  return {
    variables: allVars,
    equivalent,
    rows,
  };
}
