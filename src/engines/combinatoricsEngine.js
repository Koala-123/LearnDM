/**
 * Combinatorics & Counting Principles Engine
 * Implements:
 * - Factorials, Permutations, Combinations
 * - Stars & Bars (with / without repetition)
 * - Derangements
 * - Principle of Inclusion-Exclusion (2 & 3 sets)
 * - Pigeonhole Principle bounds
 */

export function factorial(n) {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function permutations(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= n - i;
  }
  return res;
}

export function combinations(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return Math.round(res);
}

export function starsAndBars(nBins, rItems, atLeastOneEach = false) {
  // If each bin needs at least one item:
  // Give 1 to each bin, remaining r - n items distributed freely
  if (atLeastOneEach) {
    if (rItems < nBins) return 0;
    return combinations(rItems - 1, nBins - 1);
  }
  // Standard non-negative integers: C(n + r - 1, r)
  return combinations(nBins + rItems - 1, rItems);
}

export function derangements(n) {
  if (n === 0) return 1;
  if (n === 1) return 0;
  let d0 = 1;
  let d1 = 0;
  for (let i = 2; i <= n; i++) {
    const d2 = (i - 1) * (d1 + d0);
    d0 = d1;
    d1 = d2;
  }
  return d1;
}

export function solvePIE3Sets({
  setA = 0,
  setB = 0,
  setC = 0,
  ab = 0,
  ac = 0,
  bc = 0,
  abc = 0,
  universal = 0,
}) {
  const sumSingles = setA + setB + setC;
  const sumPairs = ab + ac + bc;
  const triple = abc;
  const union = sumSingles - sumPairs + triple;
  const outside = Math.max(0, universal - union);

  // Region breakdowns for 3-way Venn diagram
  // Only ABC = abc
  // Only AB = ab - abc
  // Only AC = ac - abc
  // Only BC = bc - abc
  // Only A = setA - (Only AB + Only AC + abc)
  const onlyABC = abc;
  const onlyAB = Math.max(0, ab - abc);
  const onlyAC = Math.max(0, ac - abc);
  const onlyBC = Math.max(0, bc - abc);

  const onlyA = Math.max(0, setA - onlyAB - onlyAC - onlyABC);
  const onlyB = Math.max(0, setB - onlyAB - onlyBC - onlyABC);
  const onlyC = Math.max(0, setC - onlyAC - onlyBC - onlyABC);

  return {
    sumSingles,
    sumPairs,
    triple,
    union,
    outside,
    vennRegions: {
      onlyA,
      onlyB,
      onlyC,
      onlyAB,
      onlyAC,
      onlyBC,
      onlyABC,
      outside,
    },
    formula: `|A \\cup B \\cup C| = (${setA} + ${setB} + ${setC}) - (${ab} + ${ac} + ${bc}) + ${abc} = ${union}`,
  };
}

export function pigeonholePrinciple(items, bins) {
  if (bins <= 0) return null;
  const ceilVal = Math.ceil(items / bins);
  const floorVal = Math.floor(items / bins);
  return {
    minMaxInABin: ceilVal,
    guarantee: `By the Generalized Pigeonhole Principle, putting ${items} items into ${bins} bins guarantees at least one bin has \\ge \\lceil ${items} / ${bins} \\rceil = ${ceilVal} items.`,
  };
}
