/**
 * Algebraic Structures & Cayley Table Engine
 * Audits algebraic properties:
 * - Closure
 * - Identity element
 * - Inverses
 * - Associativity
 * - Commutativity (Abelian)
 * - Element orders and cyclic subgroups
 * - Structure Classification: Groupoid -> Semigroup -> Monoid -> Group -> Abelian Group
 */

export function buildZModN(n) {
  const elements = Array.from({ length: n }, (_, i) => String(i));
  const table = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => String((i + j) % n))
  );
  return {
    name: `(\\mathbb{Z}_{${n}}, +)`,
    elements,
    table,
  };
}

export function buildZStarModN(n) {
  const elements = [];
  for (let i = 1; i < n; i++) {
    // gcd check
    let x = i, y = n;
    while (y > 0) {
      const r = x % y;
      x = y;
      y = r;
    }
    if (x === 1) elements.push(String(i));
  }

  const table = elements.map((a) =>
    elements.map((b) => String((parseInt(a, 10) * parseInt(b, 10)) % n))
  );

  return {
    name: `(\\mathbb{Z}_{${n}}^*, \\times)`,
    elements,
    table,
  };
}

export function buildKlein4() {
  const elements = ['e', 'a', 'b', 'c'];
  // Klein 4-group: every non-identity element has order 2
  const table = [
    ['e', 'a', 'b', 'c'],
    ['a', 'e', 'c', 'b'],
    ['b', 'c', 'e', 'a'],
    ['c', 'b', 'a', 'e'],
  ];
  return {
    name: 'V_4 \\text{ (Klein 4-Group)}',
    elements,
    table,
  };
}

export function auditCayleyTable(elements, table) {
  const n = elements.length;
  const elemSet = new Set(elements.map(String));
  const elemMap = new Map();
  elements.forEach((el, idx) => elemMap.set(String(el), idx));

  // 1. Closure Check
  let isClosed = true;
  const closureViolations = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = String(table[i][j]);
      if (!elemSet.has(val)) {
        isClosed = false;
        closureViolations.push({ a: elements[i], b: elements[j], result: val });
      }
    }
  }

  // 2. Identity Element Check
  // An element e is identity if row e matches elements and col e matches elements
  let identity = null;
  for (let i = 0; i < n; i++) {
    const candidate = elements[i];
    let isRowMatch = true;
    let isColMatch = true;
    for (let j = 0; j < n; j++) {
      if (String(table[i][j]) !== String(elements[j])) isRowMatch = false;
      if (String(table[j][i]) !== String(elements[j])) isColMatch = false;
    }
    if (isRowMatch && isColMatch) {
      identity = candidate;
      break;
    }
  }

  // 3. Inverses Check (requires identity)
  const inverses = {};
  let allHaveInverses = identity !== null;
  if (identity !== null) {
    for (let i = 0; i < n; i++) {
      const a = elements[i];
      let inv = null;
      for (let j = 0; j < n; j++) {
        const b = elements[j];
        if (
          String(table[i][j]) === String(identity) &&
          String(table[j][i]) === String(identity)
        ) {
          inv = b;
          break;
        }
      }
      if (inv !== null) {
        inverses[a] = inv;
      } else {
        allHaveInverses = false;
        inverses[a] = null;
      }
    }
  }

  // 4. Commutativity Check: table[i][j] === table[j][i]
  let isCommutative = true;
  const commutativityViolations = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (String(table[i][j]) !== String(table[j][i])) {
        isCommutative = false;
        commutativityViolations.push({
          a: elements[i],
          b: elements[j],
          ab: table[i][j],
          ba: table[j][i],
        });
      }
    }
  }

  // 5. Associativity Check: (a * b) * c === a * (b * c)
  let isAssociative = true;
  let associativityViolation = null;
  if (isClosed) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          const a = elements[i], b = elements[j], c = elements[k];
          const ab = String(table[i][j]);
          const bc = String(table[j][k]);

          const abIdx = elemMap.get(ab);
          const bcIdx = elemMap.get(bc);

          if (abIdx !== undefined && bcIdx !== undefined) {
            const left = String(table[abIdx][k]); // (a*b)*c
            const right = String(table[i][bcIdx]); // a*(b*c)
            if (left !== right) {
              isAssociative = false;
              associativityViolation = {
                a, b, c,
                ab, bc,
                left, right,
                explanation: `(${a} * ${b}) * ${c} = ${ab} * ${c} = ${left}, but ${a} * (${b} * ${c}) = ${a} * ${bc} = ${right}`,
              };
              break;
            }
          }
        }
        if (!isAssociative) break;
      }
      if (!isAssociative) break;
    }
  }

  // 6. Classification
  let classification = 'Groupoid (Magma)';
  if (isClosed && isAssociative) {
    classification = 'Semigroup';
    if (identity !== null) {
      classification = 'Monoid';
      if (allHaveInverses) {
        classification = isCommutative ? 'Abelian Group' : 'Group (Non-Abelian)';
      }
    }
  }

  // 7. Element Orders & Cyclic Subgroups (if group)
  const elementOrders = {};
  const cyclicSubgroups = {};
  if (identity !== null && isClosed && isAssociative) {
    elements.forEach((el) => {
      let curr = el;
      let order = 1;
      const subgroup = [String(identity)];
      const seen = new Set([String(identity)]);

      while (order <= n + 1) {
        if (!seen.has(String(curr))) {
          seen.add(String(curr));
          subgroup.push(String(curr));
        }
        if (String(curr) === String(identity)) {
          break;
        }
        const currIdx = elemMap.get(String(curr));
        const elIdx = elemMap.get(String(el));
        if (currIdx === undefined || elIdx === undefined) break;
        curr = table[currIdx][elIdx];
        order++;
      }

      elementOrders[el] = order <= n ? order : '∞ / Undefined';
      cyclicSubgroups[el] = subgroup;
    });
  }

  return {
    elements,
    table,
    isClosed,
    closureViolations,
    identity,
    inverses,
    allHaveInverses,
    isCommutative,
    commutativityViolations,
    isAssociative,
    associativityViolation,
    classification,
    elementOrders,
    cyclicSubgroups,
  };
}
