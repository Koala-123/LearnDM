/**
 * Poset, Hasse Diagram & Lattice Engine
 * Handles:
 * - Divisibility posets (e.g. D_n), power sets, or custom partial orders
 * - Transitive reduction (Hasse diagram edges)
 * - Topological level assignment
 * - Maximal, Minimal, Greatest (top), Least (bottom)
 * - Bounds, LUB (join) and GLB (meet) for any pair
 * - Lattice classification: Distributive, Complemented, Boolean Algebra
 */

export function getDivisors(n) {
  const divs = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

export function buildDivisibilityPoset(n) {
  const elements = getDivisors(n);
  const leq = (a, b) => b % a === 0;
  return analyzePoset(elements, leq, `D_{${n}} \\text{ (Divisors of ${n})}`);
}

export function buildPowerSetPoset(items) {
  const n = items.length;
  const elements = [];
  const total = Math.pow(2, n);

  for (let mask = 0; mask < total; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) subset.push(items[i]);
    }
    elements.push(subset.length === 0 ? '∅' : `{${subset.join(',')}}`);
  }

  // leq: subset A <= subset B
  const leq = (a, b) => {
    if (a === '∅') return true;
    if (b === '∅') return a === '∅';
    const setA = a.slice(1, -1).split(',');
    const setB = new Set(b.slice(1, -1).split(','));
    return setA.every((x) => setB.has(x));
  };

  return analyzePoset(elements, leq, `\\mathcal{P}(\\{${items.join(',')}\\})`);
}

export function analyzePoset(elements, leqFn, name = 'Custom Poset') {
  const n = elements.length;
  // Matrix of <=
  const rel = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rel[i][j] = leqFn(elements[i], elements[j]);
    }
  }

  // Transitive Reduction: Hasse Diagram Edges
  // Edge (i, j) exists in Hasse iff i < j and there is NO k with i < k < j
  const hasseEdges = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && rel[i][j]) {
        let intermediate = false;
        for (let k = 0; k < n; k++) {
          if (k !== i && k !== j && rel[i][k] && rel[k][j]) {
            intermediate = true;
            break;
          }
        }
        if (!intermediate) {
          hasseEdges.push([elements[i], elements[j]]);
        }
      }
    }
  }

  // Topological levels (longest distance from a minimal element)
  const levels = Array(n).fill(0);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [u, v] of hasseEdges) {
      const ui = elements.indexOf(u);
      const vi = elements.indexOf(v);
      if (levels[vi] < levels[ui] + 1) {
        levels[vi] = levels[ui] + 1;
        changed = true;
      }
    }
  }

  // Group elements by level
  const levelGroups = {};
  elements.forEach((el, idx) => {
    const lvl = levels[idx];
    if (!levelGroups[lvl]) levelGroups[lvl] = [];
    levelGroups[lvl].push(el);
  });

  // Maximal elements (no element strictly greater)
  const maximal = [];
  for (let i = 0; i < n; i++) {
    let hasGreater = false;
    for (let j = 0; j < n; j++) {
      if (i !== j && rel[i][j]) {
        hasGreater = true;
        break;
      }
    }
    if (!hasGreater) maximal.push(elements[i]);
  }

  // Minimal elements (no element strictly smaller)
  const minimal = [];
  for (let i = 0; i < n; i++) {
    let hasSmaller = false;
    for (let j = 0; j < n; j++) {
      if (i !== j && rel[j][i]) {
        hasSmaller = true;
        break;
      }
    }
    if (!hasSmaller) minimal.push(elements[i]);
  }

  // Greatest (Top) element: <= all elements
  let greatest = null;
  for (let i = 0; i < n; i++) {
    let dominatesAll = true;
    for (let j = 0; j < n; j++) {
      if (!rel[j][i]) {
        dominatesAll = false;
        break;
      }
    }
    if (dominatesAll) {
      greatest = elements[i];
      break;
    }
  }

  // Least (Bottom) element: <= all elements
  let least = null;
  for (let i = 0; i < n; i++) {
    let underAll = true;
    for (let j = 0; j < n; j++) {
      if (!rel[i][j]) {
        underAll = false;
        break;
      }
    }
    if (underAll) {
      least = elements[i];
      break;
    }
  }

  // Bounds & LUB / GLB for a pair (a, b)
  function getPairBounds(a, b) {
    const ai = elements.indexOf(a);
    const bi = elements.indexOf(b);
    if (ai === -1 || bi === -1) return null;

    // Upper bounds: u such that a <= u and b <= u
    const upperBounds = [];
    for (let u = 0; u < n; u++) {
      if (rel[ai][u] && rel[bi][u]) {
        upperBounds.push(elements[u]);
      }
    }

    // Lower bounds: v such that v <= a and v <= b
    const lowerBounds = [];
    for (let v = 0; v < n; v++) {
      if (rel[v][ai] && rel[v][bi]) {
        lowerBounds.push(elements[v]);
      }
    }

    // LUB (Least Upper Bound): an upper bound that is <= all other upper bounds
    let lub = null;
    for (const u of upperBounds) {
      const ui = elements.indexOf(u);
      let isLeast = true;
      for (const other of upperBounds) {
        const oi = elements.indexOf(other);
        if (!rel[ui][oi]) {
          isLeast = false;
          break;
        }
      }
      if (isLeast) {
        lub = u;
        break;
      }
    }

    // GLB (Greatest Lower Bound): a lower bound that is >= all other lower bounds
    let glb = null;
    for (const v of lowerBounds) {
      const vi = elements.indexOf(v);
      let isGreatest = true;
      for (const other of lowerBounds) {
        const oi = elements.indexOf(other);
        if (!rel[oi][vi]) {
          isGreatest = false;
          break;
        }
      }
      if (isGreatest) {
        glb = v;
        break;
      }
    }

    return { upperBounds, lowerBounds, lub, glb };
  }

  // Check if Lattice (every pair has unique LUB and GLB)
  let isLattice = true;
  let failingLatticePair = null;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const pb = getPairBounds(elements[i], elements[j]);
      if (!pb.lub || !pb.glb) {
        isLattice = false;
        failingLatticePair = [elements[i], elements[j]];
        break;
      }
    }
    if (!isLattice) break;
  }

  // Distributive check: a ∧ (b ∨ c) == (a ∧ b) ∨ (a ∧ c)
  let isDistributive = isLattice;
  let failingDistributiveTriplet = null;
  if (isLattice) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          const a = elements[i], b = elements[j], c = elements[k];
          const b_join_c = getPairBounds(b, c).lub;
          const lhs = getPairBounds(a, b_join_c).glb;

          const a_meet_b = getPairBounds(a, b).glb;
          const a_meet_c = getPairBounds(a, c).glb;
          const rhs = getPairBounds(a_meet_b, a_meet_c).lub;

          if (lhs !== rhs) {
            isDistributive = false;
            failingDistributiveTriplet = [a, b, c];
            break;
          }
        }
        if (!isDistributive) break;
      }
      if (!isDistributive) break;
    }
  }

  // Complemented Lattice check:
  // Requires least (bot) and greatest (top).
  // For each element x, there exists x' such that x ∨ x' = top and x ∧ x' = bot.
  let isComplemented = isLattice && greatest !== null && least !== null;
  const complementsMap = {};

  if (isComplemented) {
    for (let i = 0; i < n; i++) {
      const x = elements[i];
      complementsMap[x] = [];
      for (let j = 0; j < n; j++) {
        const y = elements[j];
        const pb = getPairBounds(x, y);
        if (pb.lub === greatest && pb.glb === least) {
          complementsMap[x].push(y);
        }
      }
      if (complementsMap[x].length === 0) {
        isComplemented = false;
      }
    }
  }

  const isBooleanAlgebra = isDistributive && isComplemented;

  return {
    name,
    elements,
    hasseEdges,
    levels,
    levelGroups,
    maximal,
    minimal,
    greatest,
    least,
    isLattice,
    failingLatticePair,
    isDistributive,
    failingDistributiveTriplet,
    isComplemented,
    complementsMap,
    isBooleanAlgebra,
    getPairBounds,
  };
}
