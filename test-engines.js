import { generateTruthTable, checkEquivalence } from './src/engines/logicEngine.js';
import { analyzeRelation } from './src/engines/relationEngine.js';
import { extendedEuclidean, modularInverse, solveCRT } from './src/engines/numberTheoryEngine.js';
import { buildDivisibilityPoset } from './src/engines/posetEngine.js';
import { buildZModN, auditCayleyTable } from './src/engines/groupEngine.js';
import { analyzeGraph, getGraphPreset } from './src/engines/graphEngine.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`✗ FAIL: ${message}`);
  }
}

console.log('--- Testing Logic Engine ---');
const ttTautology = generateTruthTable('p ∨ ¬p');
assert(ttTautology.isTautology, 'p ∨ ¬p is recognized as a Tautology');
const ttEquiv = checkEquivalence('p -> q', '¬p ∨ q');
assert(ttEquiv.equivalent, 'p -> q is logically equivalent to ¬p ∨ q');

console.log('\n--- Testing Relation Engine ---');
const relAnalysis = analyzeRelation(['1', '2', '3'], [['1', '1'], ['2', '2'], ['3', '3'], ['1', '2'], ['2', '3']]);
assert(relAnalysis.reflexive, 'Reflexivity holds when all (a, a) are present');
assert(!relAnalysis.symmetric, 'Symmetry correctly detected as failing for (1, 2) without (2, 1)');
assert(!relAnalysis.transitive, 'Transitivity correctly detected as failing for (1, 2) and (2, 3) without (1, 3)');

console.log('\n--- Testing Number Theory Engine ---');
const ext = extendedEuclidean(35, 15);
assert(ext.gcd === 5, 'gcd(35, 15) is 5');
assert(ext.s * 35 + ext.t * 15 === 5, `Bézout identity holds: ${ext.s}*(35) + ${ext.t}*(15) = 5`);

const inv = modularInverse(17, 43);
assert(inv.exists && (17 * inv.inverse) % 43 === 1, `Modular inverse of 17 mod 43 is correct (${inv.inverse})`);

const crt = solveCRT([{ a: 2, m: 3 }, { a: 3, m: 5 }, { a: 2, m: 7 }]);
assert(crt.solution === 23, `CRT solution for x=2(mod 3), 3(mod 5), 2(mod 7) is 23 (got ${crt.solution})`);

console.log('\n--- Testing Poset & Lattice Engine ---');
const d12 = buildDivisibilityPoset(12);
assert(d12.isLattice, 'D12 is a lattice');
assert(d12.greatest === 12, 'D12 top element is 12');
assert(d12.least === 1, 'D12 bottom element is 1');
const bounds = d12.getPairBounds(4, 6);
assert(bounds.glb === 2, 'GLB(4, 6) in D12 is 2 (gcd)');
assert(bounds.lub === 12, 'LUB(4, 6) in D12 is 12 (lcm)');

console.log('\n--- Testing Group Engine ---');
const z4 = buildZModN(4);
const z4Audit = auditCayleyTable(z4.elements, z4.table);
assert(z4Audit.classification === 'Abelian Group', 'Z4 is an Abelian Group');
assert(z4Audit.identity === '0', 'Z4 identity element is 0');

console.log('\n--- Testing Graph Theory Engine ---');
const petersen = getGraphPreset('Petersen');
const pAnalysis = analyzeGraph(petersen.vertices, petersen.edges, false);
assert(pAnalysis.handshakingHolds, 'Handshaking lemma holds for Petersen graph');
assert(pAnalysis.vertexCount === 10, 'Petersen has 10 vertices');
assert(pAnalysis.edgeCount === 15, 'Petersen has 15 edges');
assert(!pAnalysis.isBipartite, 'Petersen graph is not bipartite (has 5-cycles)');

const k5 = getGraphPreset('K5');
const k5Analysis = analyzeGraph(k5.vertices, k5.edges, false);
assert(k5Analysis.planarViolated, 'K5 violates planar simple edge bound E <= 3V - 6 (10 > 9)');

console.log('\n--- Testing Question Data Integrity (MCQ, MSQ, NAT) ---');
import('./src/data/questionsData.js').then(({ QUESTIONS_DATA }) => {
  assert(QUESTIONS_DATA.length >= 170, `Loaded ${QUESTIONS_DATA.length} comprehensive questions (>= 170)`);

  let invalidSchemaCount = 0;
  let mcqCount = 0;
  let msqCount = 0;
  let natCount = 0;

  QUESTIONS_DATA.forEach((q, idx) => {
    const qType = q.type || 'mcq';
    if (!q.id || !q.unitId || !q.title || !q.prompt || !q.explanation || !q.tier) {
      console.error(`Invalid question schema at index ${idx}:`, q);
      invalidSchemaCount++;
      return;
    }

    if (qType === 'mcq') {
      mcqCount++;
      if (!Array.isArray(q.options) || typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        console.error(`Invalid MCQ at id ${q.id}: options or correctIndex invalid`, q);
        invalidSchemaCount++;
      }
    } else if (qType === 'msq') {
      msqCount++;
      if (!Array.isArray(q.options) || !Array.isArray(q.correctIndices) || q.correctIndices.length === 0 || !q.correctIndices.every(i => i >= 0 && i < q.options.length)) {
        console.error(`Invalid MSQ at id ${q.id}: options or correctIndices invalid`, q);
        invalidSchemaCount++;
      }
    } else if (qType === 'nat') {
      natCount++;
      if (q.correctAnswer === undefined || q.correctAnswer === null || String(q.correctAnswer).trim() === '') {
        console.error(`Invalid NAT at id ${q.id}: correctAnswer missing`, q);
        invalidSchemaCount++;
      }
    } else {
      console.error(`Unknown question type ${qType} at id ${q.id}`);
      invalidSchemaCount++;
    }
  });

  assert(invalidSchemaCount === 0, `All questions passed schema verification (0 invalid)`);
  assert(mcqCount > 0, `MCQs present: ${mcqCount}`);
  assert(msqCount >= 24, `MSQs present: ${msqCount} (>= 24)`);
  assert(natCount >= 24, `NAT questions present: ${natCount} (>= 24)`);

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
});

