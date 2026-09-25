/**
 * Number Theory & Modular Arithmetic Engine
 * Implements:
 * - Euclidean Algorithm with step-by-step division
 * - Extended Euclidean Algorithm with Bézout coefficients (s*a + t*b = gcd)
 * - Modular Inverse
 * - Linear Congruence Solver (ax = b mod m)
 * - Chinese Remainder Theorem (CRT) system solver
 * - Fast Modular Exponentiation (a^b mod m) with binary ladder
 * - Prime Factorization & Euler's Totient phi(n)
 */

export function euclideanAlgorithm(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  const steps = [];

  while (y > 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push({ a: x, b: y, q, r });
    x = y;
    y = r;
  }

  return {
    gcd: x,
    steps,
  };
}

export function extendedEuclidean(a, b) {
  let old_r = a, r = b;
  let old_s = 1, s = 0;
  let old_t = 0, t = 1;

  const table = [
    { step: 0, r: old_r, q: '-', s: old_s, t: old_t },
    { step: 1, r: r, q: '-', s: s, t: t },
  ];

  let stepCount = 2;
  while (r !== 0) {
    const quotient = Math.floor(old_r / r);

    const temp_r = old_r - quotient * r;
    old_r = r;
    r = temp_r;

    const temp_s = old_s - quotient * s;
    old_s = s;
    s = temp_s;

    const temp_t = old_t - quotient * t;
    old_t = t;
    t = temp_t;

    table.push({
      step: stepCount++,
      r: old_r,
      q: quotient,
      s: old_s,
      t: old_t,
    });
  }

  return {
    gcd: old_r,
    s: old_s,
    t: old_t,
    table,
    identity: `${old_s} \\cdot (${a}) + ${old_t} \\cdot (${b}) = ${old_r}`,
  };
}

export function modularInverse(a, m) {
  const ext = extendedEuclidean(a, m);
  if (ext.gcd !== 1) {
    return {
      exists: false,
      reason: `\\gcd(${a}, ${m}) = ${ext.gcd} \\ne 1. Inverse does not exist.`,
    };
  }
  // Make sure result is in [0, m-1]
  const inv = ((ext.s % m) + m) % m;
  return {
    exists: true,
    inverse: inv,
    ext,
  };
}

export function solveLinearCongruence(a, b, m) {
  const g = extendedEuclidean(a, m);
  const gcd = g.gcd;

  if (b % gcd !== 0) {
    return {
      solvable: false,
      reason: `\\gcd(${a}, ${m}) = ${gcd}, which does not divide ${b}. No solutions exist.`,
    };
  }

  // Reduce equation: (a/gcd)*x = (b/gcd) mod (m/gcd)
  const a_prime = a / gcd;
  const b_prime = b / gcd;
  const m_prime = m / gcd;

  const invObj = modularInverse(a_prime, m_prime);
  const x0 = ((b_prime * invObj.inverse) % m_prime + m_prime) % m_prime;

  const solutions = [];
  for (let k = 0; k < gcd; k++) {
    solutions.push(x0 + k * m_prime);
  }

  return {
    solvable: true,
    gcd,
    solutions,
    generalForm: `x \\equiv ${x0} \\pmod{${m_prime}}`,
  };
}

export function solveCRT(congruences) {
  // congruences: array of { a, m }
  // Check pairwise coprimality
  const k = congruences.length;
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const g = euclideanAlgorithm(congruences[i].m, congruences[j].m).gcd;
      if (g !== 1) {
        return {
          valid: false,
          error: `Moduli m_${i+1}=${congruences[i].m} and m_${j+1}=${congruences[j].m} are not coprime (gcd = ${g}).`,
        };
      }
    }
  }

  let M = 1;
  congruences.forEach((c) => {
    M *= c.m;
  });

  const steps = [];
  let totalSum = 0;

  for (let i = 0; i < k; i++) {
    const ai = ((congruences[i].a % congruences[i].m) + congruences[i].m) % congruences[i].m;
    const mi = congruences[i].m;
    const Mi = M / mi;
    const invObj = modularInverse(Mi, mi);
    const yi = invObj.inverse;
    const term = ai * Mi * yi;
    totalSum += term;

    steps.push({
      index: i + 1,
      ai,
      mi,
      Mi,
      yi,
      term,
    });
  }

  const solution = ((totalSum % M) + M) % M;

  return {
    valid: true,
    M,
    solution,
    steps,
  };
}

export function fastModularExponentiation(base, exp, mod) {
  let b = base % mod;
  let e = exp;
  let result = 1;
  const steps = [];

  const binaryExp = exp.toString(2);

  for (let i = binaryExp.length - 1; i >= 0; i--) {
    const bit = binaryExp[i];
    const prevResult = result;
    if (bit === '1') {
      result = (result * b) % mod;
    }
    steps.push({
      bit,
      power: binaryExp.length - 1 - i,
      basePower: b,
      calculatedResult: result,
      action: bit === '1' ? `Multiply: (${prevResult} * ${b}) mod ${mod} = ${result}` : `Bit 0: skip multiply`,
    });
    b = (b * b) % mod;
  }

  return {
    result,
    binaryExp,
    steps,
  };
}

export function primeFactors(n) {
  let num = Math.abs(n);
  const factors = {};
  for (let i = 2; i * i <= num; i++) {
    while (num % i === 0) {
      factors[i] = (factors[i] || 0) + 1;
      num /= i;
    }
  }
  if (num > 1) {
    factors[num] = (factors[num] || 0) + 1;
  }
  return factors;
}

export function eulerTotient(n) {
  let result = n;
  let p = 2;
  let temp = n;
  while (p * p <= temp) {
    if (temp % p === 0) {
      while (temp % p === 0) temp /= p;
      result -= Math.floor(result / p);
    }
    p++;
  }
  if (temp > 1) {
    result -= Math.floor(result / temp);
  }
  return result;
}
