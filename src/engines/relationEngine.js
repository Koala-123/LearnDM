/**
 * Relation & Equivalence Engine
 * Analyzes binary relations on a finite set A.
 * Computes:
 * - Reflexive, Irreflexive
 * - Symmetric, Antisymmetric, Asymmetric
 * - Transitive (and failing triples)
 * - Reflexive, Symmetric, Transitive (Warshall) closures
 * - Equivalence classes and quotient partition
 * - Function diagnostics (well-defined, injective, surjective, bijective)
 */

export function analyzeRelation(elements, pairs) {
  const n = elements.length;
  const elemMap = new Map();
  elements.forEach((el, idx) => elemMap.set(String(el), idx));

  // Construct adjacency matrix
  const matrix = Array.from({ length: n }, () => Array(n).fill(false));
  const pairSet = new Set();

  pairs.forEach(([u, v]) => {
    const su = String(u);
    const sv = String(v);
    if (elemMap.has(su) && elemMap.has(sv)) {
      const i = elemMap.get(su);
      const j = elemMap.get(sv);
      matrix[i][j] = true;
      pairSet.add(`${su},${sv}`);
    }
  });

  // Reflexive: for all a, (a, a) in R
  let reflexive = true;
  const missingReflexive = [];
  for (let i = 0; i < n; i++) {
    if (!matrix[i][i]) {
      reflexive = false;
      missingReflexive.push(elements[i]);
    }
  }

  // Irreflexive: for all a, (a, a) NOT in R
  let irreflexive = true;
  for (let i = 0; i < n; i++) {
    if (matrix[i][i]) irreflexive = false;
  }

  // Symmetric: (a, b) in R => (b, a) in R
  let symmetric = true;
  const failingSymmetric = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] && !matrix[j][i]) {
        symmetric = false;
        failingSymmetric.push([elements[i], elements[j]]);
      }
    }
  }

  // Antisymmetric: (a, b) in R and (b, a) in R => a = b
  let antisymmetric = true;
  const failingAntisymmetric = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (matrix[i][j] && matrix[j][i]) {
        antisymmetric = false;
        failingAntisymmetric.push([elements[i], elements[j]]);
      }
    }
  }

  // Transitive: (a, b) in R and (b, c) in R => (a, c) in R
  let transitive = true;
  const failingTransitive = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j]) {
        for (let k = 0; k < n; k++) {
          if (matrix[j][k] && !matrix[i][k]) {
            transitive = false;
            failingTransitive.push([elements[i], elements[j], elements[k]]);
          }
        }
      }
    }
  }

  const isEquivalence = reflexive && symmetric && transitive;
  const isPartialOrder = reflexive && antisymmetric && transitive;

  // Closures
  // 1. Reflexive closure: R U {(a,a)}
  const reflexiveClosurePairs = [...pairs];
  for (let i = 0; i < n; i++) {
    const el = elements[i];
    if (!pairSet.has(`${el},${el}`)) {
      reflexiveClosurePairs.push([el, el]);
    }
  }

  // 2. Symmetric closure: R U R^-1
  const symmetricClosurePairs = [...pairs];
  const symSet = new Set(pairSet);
  pairs.forEach(([u, v]) => {
    if (!symSet.has(`${v},${u}`)) {
      symmetricClosurePairs.push([v, u]);
      symSet.add(`${v},${u}`);
    }
  });

  // 3. Transitive closure using Warshall's Algorithm
  const wMatrix = matrix.map((row) => [...row]);
  const warshallSteps = [];
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!wMatrix[i][j] && wMatrix[i][k] && wMatrix[k][j]) {
          wMatrix[i][j] = true;
          warshallSteps.push({
            addedPair: [elements[i], elements[j]],
            via: elements[k],
          });
        }
      }
    }
  }

  const transitiveClosurePairs = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (wMatrix[i][j]) {
        transitiveClosurePairs.push([elements[i], elements[j]]);
      }
    }
  }

  // Equivalence classes (if equivalence relation, or connected components in symmetric closure)
  const visited = new Set();
  const equivalenceClasses = [];

  if (isEquivalence) {
    for (let i = 0; i < n; i++) {
      const el = elements[i];
      if (!visited.has(el)) {
        const eqClass = [];
        for (let j = 0; j < n; j++) {
          if (matrix[i][j]) {
            eqClass.push(elements[j]);
            visited.add(elements[j]);
          }
        }
        equivalenceClasses.push(eqClass);
      }
    }
  }

  return {
    elements,
    matrix,
    reflexive,
    missingReflexive,
    irreflexive,
    symmetric,
    failingSymmetric,
    antisymmetric,
    failingAntisymmetric,
    transitive,
    failingTransitive,
    isEquivalence,
    isPartialOrder,
    equivalenceClasses,
    reflexiveClosurePairs,
    symmetricClosurePairs,
    transitiveClosurePairs,
    warshallSteps,
  };
}

/**
 * Function Diagnostics
 * Given domain A, codomain B, and mapping pairs (a, b)
 */
export function analyzeFunction(domain, codomain, pairs) {
  const domSet = new Set(domain.map(String));
  const codomSet = new Set(codomain.map(String));

  const mapping = new Map();
  let isWellDefined = true;
  let violation = null;

  for (const [x, y] of pairs) {
    const sx = String(x);
    const sy = String(y);

    if (!domSet.has(sx) || !codomSet.has(sy)) {
      isWellDefined = false;
      violation = `Pair (${sx}, ${sy}) contains elements outside Domain or Codomain.`;
      break;
    }

    if (mapping.has(sx) && mapping.get(sx) !== sy) {
      isWellDefined = false;
      violation = `Element ${sx} is mapped to multiple targets: ${mapping.get(sx)} and ${sy}.`;
      break;
    }
    mapping.set(sx, sy);
  }

  if (mapping.size < domain.length && isWellDefined) {
    isWellDefined = false;
    violation = `Not all domain elements have an assigned image (partial mapping).`;
  }

  if (!isWellDefined) {
    return {
      isWellDefined: false,
      violation,
      isInjective: false,
      isSurjective: false,
      isBijective: false,
    };
  }

  // Injective (One-to-One): No two distinct domain elements map to same codomain element
  const usedImages = new Set();
  let isInjective = true;
  for (const [x, y] of mapping.entries()) {
    if (usedImages.has(y)) {
      isInjective = false;
      break;
    }
    usedImages.add(y);
  }

  // Surjective (Onto): Every element in codomain is an image
  const isSurjective = usedImages.size === codomain.length;
  const isBijective = isInjective && isSurjective;

  return {
    isWellDefined: true,
    mapping,
    isInjective,
    isSurjective,
    isBijective,
    range: Array.from(usedImages),
  };
}
