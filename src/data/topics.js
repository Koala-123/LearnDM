export const TOPICS = [
  {
    id: 'relations',
    week: 'Weeks 1–2',
    unitNumber: 1,
    title: 'Sets, Relations & Functions',
    subtitle: 'Equivalence Relations, Closures & Partitions',
    readings: {
      grimaldi: 'Ch. 3.1–3.2, 5.1–5.4, 7.4',
      oregan: 'Ch. 2 (Sets, Relations & Functions)',
    },
    examCategory: 'test1',
    badge: 'Core Foundation',
    icon: 'Network',
    accentColor: 'neon-purple',
    labId: 'relations',
    keyFormulas: [
      '|\\mathcal{P}(A)| = 2^{|A|}',
      'R \\text{ is Equivalence} \\iff \\text{Reflexive} \\land \\text{Symmetric} \\land \\text{Transitive}',
      'A / R = \\{ [a] \\mid a \\in A \\} \\text{ is a partition of } A',
      '\\text{Reflexive Relations: } 2^{n(n-1)}, \\quad \\text{Symmetric: } 2^{n(n+1)/2}',
    ],
    labGuide: {
      mission: 'Master binary relations, graph closures (Warshall algorithm), and quotient set partitions A/R.',
      invariant: 'Partition Invariant: \\bigcup [a] = A \\quad \\text{and} \\quad [a] \\cap [b] = \\emptyset \\text{ if } [a] \\ne [b]',
      step1: {
        title: 'Define Domain Set & Pairs',
        desc: 'Choose set size n and toggle matrix cells (a, b) or click graph nodes to add/remove directed edges.',
      },
      step2: {
        title: 'Run 1-Click Closure Engines',
        desc: 'Click Reflexive, Symmetric, or Warshall Transitive closure to automatically complete missing relational pairs.',
      },
      step3: {
        title: 'Audit Equivalence & Quotient Classes',
        desc: 'Inspect live property checks (Reflexive, Symmetric, Antisymmetric, Transitive) and view partition blocks [a].',
      },
    },
    quickQuest: {
      question: 'Let A = {1, 2, 3, 4}. How many relations on A are both symmetric and antisymmetric?',
      options: ['1 (empty relation)', '16 (2⁴)', '64 (2⁶)', '256 (2⁸)'],
      correctIndex: 1,
      explanation: 'If R is both symmetric and antisymmetric, it cannot contain any off-diagonal pairs (a,b) with a ≠ b. The only allowed pairs are diagonal pairs (a,a). With 4 elements, there are 2⁴ = 16 such relations.',
      loadPayload: {
        type: 'relation',
        elements: ['1', '2', '3', '4'],
        pairs: [['1', '1'], ['2', '2'], ['3', '3']],
      },
    },
    story: {
      hook: 'How do relational databases (SQL JOINs), permission systems, and Git branch histories actually work under the hood?',
      csApp: 'Relational Database Management Systems (RDBMS) are built directly on Codd’s relational algebra. Equivalence relations define clustering, database equivalence, and type equality in compilers.',
      keyIntuition: 'A binary relation is simply a set of directed arrows connecting elements. Closures answer: "What is the minimal set of arrows needed to guarantee self-loops (reflexive), bidirectional paths (symmetric), or shortcut paths (transitive)?"',
    },
    cheatSheet: {
      formulas: [
        { name: 'Power Set Size', latex: '|\\mathcal{P}(A)| = 2^{|A|}', notes: 'Number of subsets of A' },
        { name: 'Total Binary Relations', latex: '2^{n^2}', notes: 'Subsets of A × A for |A| = n' },
        { name: 'Reflexive Relations', latex: '2^{n(n-1)}', notes: 'All n diagonal pairs must be present' },
        { name: 'Symmetric Relations', latex: '2^{n(n+1)/2}', notes: 'Independent choices for diagonal & upper triangle' },
        { name: 'Antisymmetric Relations', latex: '2^n \\cdot 3^{n(n-1)/2}', notes: 'Diagonal has 2 choices; off-diagonal pair (a,b)/(b,a) has 3 choices' },
        { name: 'Equivalence Classes', latex: '[a] = \\{ x \\in A \\mid (x, a) \\in R \\}', notes: 'Non-empty, disjoint, and cover set A' },
      ],
      traps: [
        {
          title: 'Antisymmetric vs Not Symmetric',
          trap: 'Assuming antisymmetric is the opposite of symmetric.',
          counterexample: 'Equality relation R = {(1,1), (2,2)} is BOTH symmetric and antisymmetric! The relation {(1,2), (2,1), (2,3)} is NEITHER.',
          examTip: 'Antisymmetric means: if (a, b) ∈ R and (b, a) ∈ R, then a = b. It never forbids diagonal pairs!',
        },
        {
          title: 'The Empty Relation Trap',
          trap: 'Claiming the empty relation ∅ on a non-empty set A is reflexive.',
          counterexample: 'For A = {1}, ∅ does not contain (1,1). Hence ∅ is NOT reflexive. However, ∅ is vacuously symmetric, antisymmetric, and transitive!',
          examTip: 'Check whether the underlying set A is non-empty before declaring reflexivity.',
        },
        {
          title: 'Equivalence Closure Order',
          trap: 'Applying Transitive closure BEFORE Symmetric closure to find Equivalence closure.',
          counterexample: 'If R = {(1,2)}, trans closure is {(1,2)}, sym closure is {(1,2), (2,1)}, but it is still missing (1,1) and (2,2)!',
          examTip: 'Equivalence closure is (R ∪ R⁻¹ ∪ I_A)⁺ — add reflexive and symmetric pairs FIRST, then compute transitive closure.',
        },
      ],
    },
  },

  {
    id: 'proofs',
    week: 'Weeks 3–4',
    unitNumber: 2,
    title: 'Proof Techniques & Induction',
    subtitle: 'Contradiction, Contrapositive, Strong Induction & Recursion',
    readings: {
      grimaldi: 'Ch. 4.1–4.2',
      oregan: 'Ch. 4 (Induction & Recursion)',
    },
    examCategory: 'test1',
    badge: 'Core Foundation',
    icon: 'BrainCircuit',
    accentColor: 'neon-gold',
    labId: 'proofs',
    keyFormulas: [
      'P \\implies Q \\equiv \\neg Q \\implies \\neg P \\text{ (Contrapositive)}',
      'P \\implies Q \\equiv \\neg(P \\land \\neg Q) \\text{ (Contradiction)}',
      'P(n_0) \\land [\\forall k \\ge n_0, P(k) \\implies P(k+1)] \\implies \\forall n \\ge n_0, P(n)',
      'a_n = c_1 a_{n-1} + c_2 a_{n-2} \\implies r^2 - c_1 r - c_2 = 0',
    ],
    labGuide: {
      mission: 'Visualize Mathematical Induction domino cascades and solve 2nd-order linear homogeneous recurrence relations.',
      invariant: 'Induction Invariant: P(k) \\implies P(k+1) \\text{ domino chain validates } \\forall n \\ge n_0',
      step1: {
        title: 'Choose Proof Mode',
        desc: 'Select Mathematical Induction Domino visualizer or Recurrence Characteristic Equation solver.',
      },
      step2: {
        title: 'Configure Recurrence Coefficients',
        desc: 'Set c1, c2, and initial conditions a0, a1 to find characteristic roots r1, r2 and closed-form an.',
      },
      step3: {
        title: 'Simulate Step Evolution',
        desc: 'Compare closed-form formula prediction against recursive stepping to verify 100% agreement.',
      },
    },
    quickQuest: {
      question: 'What is the characteristic equation and roots for Fibonacci recurrence F_n = F_{n-1} + F_{n-2}?',
      options: ['r² - r - 1 = 0, roots (1 ± √5)/2', 'r² + r - 1 = 0, roots (-1 ± √5)/2', 'r² - 2r + 1 = 0, root 1', 'r² - 1 = 0, roots ±1'],
      correctIndex: 0,
      explanation: 'F_n - F_{n-1} - F_{n-2} = 0 gives r² - r - 1 = 0. By quadratic formula, roots are r = (1 ± √5)/2 (the Golden Ratio φ and -1/φ).',
      loadPayload: {
        type: 'recurrence',
        c1: 1,
        c2: 1,
        a0: 0,
        a1: 1,
      },
    },
    story: {
      hook: 'How do software engineers mathematically guarantee that an algorithm like MergeSort or Dijkstra terminates and produces the exact correct result?',
      csApp: 'Loop invariants in software verification and formal methods (TLA+, Coq, Rust borrow checker) are direct applications of mathematical induction.',
      keyIntuition: 'Induction is an infinite line of falling dominoes. If the first domino falls (Base Case) and whenever any domino falls the next one must fall (Inductive Step), all infinitely many dominoes will fall.',
    },
    cheatSheet: {
      formulas: [
        { name: 'Weak Induction', latex: 'P(n_0) \\land [\\forall k \\ge n_0, P(k) \\implies P(k+1)]', notes: 'Assume only k-th step' },
        { name: 'Strong Induction', latex: 'P(n_0) \\land [\\forall k, (\\forall i \\le k, P(i)) \\implies P(k+1)]', notes: 'Assume all steps up to k' },
        { name: 'Well-Ordering Principle', latex: '\\forall S \\subseteq \\mathbb{N}, S \\ne \\emptyset \\implies \\exists m \\in S, \\forall s \\in S, m \\le s', notes: 'Every non-empty set of ℕ has a least element' },
        { name: 'Characteristic Equation', latex: 'r^2 - c_1 r - c_2 = 0', notes: 'For a_n = c_1 a_{n-1} + c_2 a_{n-2}' },
        { name: 'Distinct Roots Solution', latex: 'a_n = A r_1^n + B r_2^n', notes: 'When r_1 \\ne r_2' },
        { name: 'Repeated Root Solution', latex: 'a_n = (A + B n) r_1^n', notes: 'When r_1 = r_2' },
      ],
      traps: [
        {
          title: 'The "All Horses Are Same Color" Fallacy',
          trap: 'Flawed inductive step where subsets fail to overlap.',
          counterexample: 'At k = 1 → k = 2: Set {H1, H2}. Removing H2 gives {H1} (same color), removing H1 gives {H2} (same color). BUT {H1} ∩ {H2} = ∅! There is no common horse to link their colors.',
          examTip: 'Always check if the inductive step argument holds for k = 1 → 2 as well as general k.',
        },
        {
          title: 'Negating Implication for Contradiction',
          trap: 'Thinking the negation of P ⇒ Q is ¬P ⇒ ¬Q.',
          counterexample: 'The statement "If it rains, streets are wet" is negated by "It rains AND streets are not wet" (P ∧ ¬Q).',
          examTip: 'To prove P ⇒ Q by contradiction, assume P AND ¬Q, then derive a false statement (e.g. 0 = 1).',
        },
        {
          title: 'Forgetting Multiple Base Cases in Strong Induction',
          trap: 'Using Strong Induction for a 2-step recurrence but only proving one base case.',
          counterexample: 'For a_n = a_{n-1} + a_{n-2}, computing a2 requires both a1 and a0. Proving only P(0) crashes the inductive step at n = 1.',
          examTip: 'If your recurrence references k previous terms, you must verify k initial base cases!',
        },
      ],
    },
  },

  {
    id: 'logic',
    week: 'Week 5',
    unitNumber: 3,
    title: 'Propositional Logic & Truth Tables',
    subtitle: 'Connectives, Tautologies, Equivalences & Rules of Inference',
    readings: {
      grimaldi: 'Ch. 2.1–2.3',
      oregan: 'Ch. 15.1–15.2.2 (Logic & Truth Tables)',
    },
    examCategory: 'test1',
    badge: 'Test 1 Milestone (20%)',
    icon: 'Binary',
    accentColor: 'neon-mint',
    labId: 'logic',
    keyFormulas: [
      'p \\to q \\equiv \\neg p \\lor q',
      '\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q \\text{ (De Morgan)}',
      'p \\oplus q \\equiv (p \\land \\neg q) \\lor (\\neg p \\land q)',
      '((p \\to q) \\land p) \\implies q \\text{ (Modus Ponens)}',
    ],
    labGuide: {
      mission: 'Parse custom Boolean propositional formulas, generate 2ⁿ truth tables, and detect tautologies/equivalences.',
      invariant: 'Logical Soundness: Formula \\varphi \\text{ is a Tautology } \\iff \\forall \\text{ valuations } v, v(\\varphi) = \\text{True}',
      step1: {
        title: 'Input or Select Expression',
        desc: 'Type an expression like (p -> q) & (~q -> ~p) or select a textbook preset (De Morgan, Modus Tollens, XOR).',
      },
      step2: {
        title: 'Inspect 2ⁿ Truth Table',
        desc: 'Review intermediate columns evaluating sub-expressions under all 2ⁿ variable truth assignments.',
      },
      step3: {
        title: 'Check Tautology & Equivalence',
        desc: 'Inspect automated audit pills: Tautology, Contradiction, or Contingency, plus logical equivalence proof.',
      },
    },
    quickQuest: {
      question: 'Which of the following compound propositions is a TAUTOLOGY (always True)?',
      options: ['p ∧ ¬p', '(p → q) ∧ p', '((p → q) ∧ ¬q) → ¬p', 'p ∨ q → p ∧ q'],
      correctIndex: 2,
      explanation: '((p → q) ∧ ¬q) → ¬p is the formal rule of Modus Tollens. In any truth valuation, if p → q is True and q is False, p must be False.',
      loadPayload: {
        type: 'logic',
        expression: '((p -> q) & ~q) -> ~p',
      },
    },
    story: {
      hook: 'How do SAT solvers check billions of circuit gates in AMD/Intel CPUs before they are physically etched onto silicon?',
      csApp: 'Propositional logic is the bedrock of hardware synthesis, digital logic gates, boolean satisfiability (SAT / SMT solvers), and database query filtering (WHERE clauses).',
      keyIntuition: 'Truth tables systematically test every parallel universe of True and False. If a statement survives every single universe without a scratch, it is a mathematical Tautology.',
    },
    cheatSheet: {
      formulas: [
        { name: 'Conditional Equivalence', latex: 'p \\to q \\equiv \\neg p \\lor q', notes: 'Crucial for eliminating implication' },
        { name: 'Biconditional Equivalence', latex: 'p \\leftrightarrow q \\equiv (p \\to q) \\land (q \\to p)', notes: 'True when p and q share truth value' },
        { name: 'De Morgan 1', latex: '\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q', notes: 'Negation distributes and flips AND to OR' },
        { name: 'De Morgan 2', latex: '\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q', notes: 'Negation distributes and flips OR to AND' },
        { name: 'Modus Ponens', latex: '((p \\to q) \\land p) \\implies q', notes: 'Valid inference rule' },
        { name: 'Modus Tollens', latex: '((p \\to q) \\land \\neg q) \\implies \\neg p', notes: 'Denying the conclusion denies the hypothesis' },
      ],
      traps: [
        {
          title: 'Fallacy of Affirming the Consequent',
          trap: 'Assuming that ((p → q) ∧ q) implies p.',
          counterexample: 'If it rains (p), streets are wet (q). Streets are wet (q). Does that mean it rained? No! A sprinkler could have caused it.',
          examTip: 'p → q tells you what happens if p is true, NOT that p is the only reason q can be true.',
        },
        {
          title: 'Fallacy of Denying the Antecedent',
          trap: 'Assuming that ((p → q) ∧ ¬p) implies ¬q.',
          counterexample: 'If you are in Paris (p), you are in France (q). You are not in Paris (¬p). Does that mean you are not in France? No, you could be in Nice.',
          examTip: '¬p does not force ¬q. Implication is strictly one-directional.',
        },
        {
          title: 'Vacuous Truth Trap',
          trap: 'Thinking False → Anything must be False.',
          counterexample: 'When p is False, the statement p → q is ALWAYS True! "If pigs fly, then 2 + 2 = 5" is mathematically TRUE.',
          examTip: 'A promise cannot be broken if the precondition never occurs.',
        },
      ],
    },
  },

  {
    id: 'posets',
    week: 'Week 6',
    unitNumber: 4,
    title: 'Partial Orders, Lattices & Boolean Algebras',
    subtitle: 'Hasse Diagrams, Bounds, Meets, Joins & Complementation',
    readings: {
      grimaldi: 'Ch. 15',
      oregan: 'Ch. 14.5–14.6 (Lattices & Boolean Algebras)',
    },
    examCategory: 'midterm',
    badge: 'Midterm Core',
    icon: 'Layers',
    accentColor: 'neon-purple',
    labId: 'posets',
    keyFormulas: [
      '\\text{Poset: Reflexive, Antisymmetric, Transitive}',
      'a \\land b = \\text{GLB}(a, b), \\quad a \\lor b = \\text{LUB}(a, b)',
      '\\text{Lattice is Distributive} \\iff \\text{No } N_5 \\text{ or } M_3 \\text{ sublattices}',
      'a \\lor a\' = \\top, \\quad a \\land a\' = \\bot \\text{ (Complemented Lattice)}',
    ],
    labGuide: {
      mission: 'Construct Hasse diagrams for divisibility posets D_n and power sets P(S), compute LUB/GLB, and audit lattice distributivity.',
      invariant: 'Lattice Invariant: \\forall a, b \\in L, \\exists! \\text{ unique } a \\land b \\text{ (GLB)} \\land \\exists! \\text{ unique } a \\lor b \\text{ (LUB)}',
      step1: {
        title: 'Select Poset Type & Parameters',
        desc: 'Choose Divisibility Poset D_n (e.g. n=12, 24, 30, 36) or Power Set P(S) on elements {a, b, c}.',
      },
      step2: {
        title: 'Inspect Hasse Diagram & Levels',
        desc: 'Nodes are placed in topological levels. Redundant reflexive loops and transitive edges are automatically pruned.',
      },
      step3: {
        title: 'Calculate Meets, Joins & Test Lattice',
        desc: 'Pick any two elements to compute their GLB (greatest lower bound / gcd) and LUB (least upper bound / lcm).',
      },
    },
    quickQuest: {
      question: 'In the divisibility poset (D₃₆, |), what are the GLB and LUB of elements 12 and 18?',
      options: ['GLB = 6, LUB = 36', 'GLB = 2, LUB = 36', 'GLB = 6, LUB = 24', 'No GLB exists'],
      correctIndex: 0,
      explanation: 'In a divisibility poset, GLB(a, b) = gcd(a, b) = gcd(12, 18) = 6. LUB(a, b) = lcm(a, b) = lcm(12, 18) = 36. Both 6 and 36 belong to D₃₆.',
      loadPayload: {
        type: 'poset',
        posetType: 'divisors',
        n: 36,
      },
    },
    story: {
      hook: 'How does Git merge two branches without losing work, and how does Java/TypeScript resolve complex multiple interface inheritance?',
      csApp: 'Git commit graphs are partially ordered sets. Lowest Common Ancestor (LCA) in version control is literally the GLB (Meet) in a poset! Type systems compute Upper and Lower type bounds using Lattices.',
      keyIntuition: 'A poset is a hierarchy where not every pair can be directly compared. A Hasse diagram strips away all redundant clutter: draw only direct upward links!',
    },
    cheatSheet: {
      formulas: [
        { name: 'Divisibility Poset Meet', latex: 'a \\land b = \\gcd(a, b)', notes: 'Greatest Lower Bound in (D_n, |)' },
        { name: 'Divisibility Poset Join', latex: 'a \\lor b = \\operatorname{lcm}(a, b)', notes: 'Least Upper Bound in (D_n, |)' },
        { name: 'Power Set Meet & Join', latex: 'A \\land B = A \\cap B, \\quad A \\lor B = A \\cup B', notes: 'In (\\mathcal{P}(S), \\subseteq)' },
        { name: 'Distributive Law', latex: 'a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c)', notes: 'Holds for both meet and join' },
        { name: 'Boolean Algebra Size', latex: '|B| = 2^k \\text{ for some integer } k \\ge 0', notes: 'Every finite Boolean algebra has power-of-2 size' },
      ],
      traps: [
        {
          title: 'Maximal vs Greatest Element',
          trap: 'Confusing a maximal element with the greatest (maximum) element.',
          counterexample: 'A poset can have MULTIPLE maximal elements (no element is above them), but at most ONE greatest element (which must be above EVERY element).',
          examTip: 'Top of a Hasse diagram has maximal elements. If there are two unconnected tops, there is NO greatest element.',
        },
        {
          title: 'The N5 and M3 Forbidden Sublattices',
          trap: 'Assuming every lattice is distributive.',
          counterexample: 'The pentagon lattice N5 and diamond lattice M3 are NOT distributive. If a lattice contains N5 or M3 as a sublattice, it cannot be distributive.',
          examTip: 'To disprove distributivity, find 3 elements where a ∧ (b ∨ c) ≠ (a ∧ b) ∨ (a ∧ c).',
        },
        {
          title: 'Square-free Requirement for Boolean Algebras in D_n',
          trap: 'Assuming D_n is always a Boolean algebra for any n.',
          counterexample: 'D_12 is NOT a Boolean algebra because 12 has a repeated prime factor (2² × 3). D_n is a Boolean algebra if and only if n is square-free (e.g. 30 = 2 × 3 × 5).',
          examTip: 'Check prime factorization: exponents must all be 1 for D_n to be isomorphic to a power set Boolean algebra.',
        },
      ],
    },
  },

  {
    id: 'modular',
    week: 'Week 7',
    unitNumber: 5,
    title: 'Modular Arithmetic & Number Theory',
    subtitle: 'Bézout Coefficients, Modular Inverses & Chinese Remainder Theorem',
    readings: {
      grimaldi: 'Ch. 4.3–4.6, 14.3',
      oregan: 'Ch. 3 (Number Theory & Cryptography)',
    },
    examCategory: 'midterm',
    badge: 'Midterm Core',
    icon: 'Calculator',
    accentColor: 'neon-pink',
    labId: 'modular',
    keyFormulas: [
      '\\gcd(a, b) = s \\cdot a + t \\cdot b \\text{ (Bézout Identity)}',
      'a x \\equiv 1 \\pmod m \\iff \\gcd(a, m) = 1',
      'a^{\\phi(n)} \\equiv 1 \\pmod n \\text{ (Euler\'s Totient Theorem)}',
      'x \\equiv \\sum a_i M_i y_i \\pmod M \\text{ (Chinese Remainder Theorem)}',
    ],
    labGuide: {
      mission: 'Spin the circular residue clock (ℤ/nℤ), execute the Extended Euclidean Algorithm ladder, and solve linear congruences.',
      invariant: 'Bézout Invariant: s \\cdot a + t \\cdot b = \\gcd(a, b) \\quad \\text{at every step}',
      step1: {
        title: 'Configure Modulo & Operand',
        desc: 'Set modulus n (e.g. 12, 31) and integer a. Watch the circular clock dial highlight the residue [a mod n].',
      },
      step2: {
        title: 'Run Extended Euclidean Engine',
        desc: 'Watch the step-by-step table calculate quotients q, remainders r, and Bézout coefficients (s, t).',
      },
      step3: {
        title: 'Extract Modular Inverse & Solve Congruence',
        desc: 'If gcd(a, n) = 1, retrieve unique modular inverse a⁻¹ mod n and solve congruences like ax ≡ b (mod n).',
      },
    },
    quickQuest: {
      question: 'Find the unique modular inverse of 7 modulo 31 (i.e. 7x ≡ 1 mod 31).',
      options: ['x = 4', 'x = 9', 'x = 18', 'No inverse exists'],
      correctIndex: 1,
      explanation: 'Using the Extended Euclidean Algorithm: 31 = 4(7) + 3, and 7 = 2(3) + 1. Back-substituting: 1 = 7 - 2(31 - 4(7)) = 9(7) - 2(31). Thus 7 × 9 = 63 = 2(31) + 1 ≡ 1 (mod 31). The inverse is 9.',
      loadPayload: {
        type: 'modular',
        a: 7,
        n: 31,
      },
    },
    story: {
      hook: 'How does every HTTPS website protect your credit card from hackers without sharing a secret password beforehand?',
      csApp: 'RSA public-key encryption and Diffie-Hellman key exchanges are 100% powered by modular exponentiation, Euler’s totient function, and modular inverses computed via Extended Euclid.',
      keyIntuition: 'Modular arithmetic is arithmetic on a circle (like a 12-hour clock). Numbers loop endlessly. The Extended Euclidean Algorithm is the magic wrench that lets us undo multiplication on the circle.',
    },
    cheatSheet: {
      formulas: [
        { name: 'Division Algorithm', latex: 'a = q \\cdot n + r, \\quad 0 \\le r < n', notes: 'Quotient q and unique remainder r' },
        { name: 'Bézout’s Identity', latex: 's \\cdot a + t \\cdot b = \\gcd(a, b)', notes: 'Coefficients s, t ∈ ℤ found via Extended Euclidean' },
        { name: 'Modular Inverse Condition', latex: 'a^{-1} \\pmod n \\text{ exists} \\iff \\gcd(a, n) = 1', notes: 'Must be strictly coprime' },
        { name: 'Euler’s Totient Formula', latex: '\\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)', notes: 'Count of integers 1 ≤ k ≤ n coprime to n' },
        { name: 'Fermat’s Little Theorem', latex: 'a^{p-1} \\equiv 1 \\pmod p \\text{ for prime } p, p \\nmid a', notes: 'Special case of Euler when n is prime' },
        { name: 'CRT Unique Solution', latex: 'x \\equiv \\sum_{i=1}^k a_i M_i y_i \\pmod M', notes: 'Where M = \\prod m_i, M_i = M/m_i, y_i = M_i^{-1} \\pmod{m_i}' },
      ],
      traps: [
        {
          title: 'Dividing Across Congruences',
          trap: 'Assuming ax ≡ ay (mod m) implies x ≡ y (mod m).',
          counterexample: '2 × 1 ≡ 2 × 4 (mod 6) because 2 ≡ 8 (mod 6). But 1 ≢ 4 (mod 6)!',
          examTip: 'You can only divide by a if gcd(a, m) = 1. Otherwise, you must divide the modulus as well: x ≡ y (mod m/gcd(a, m)).',
        },
        {
          title: 'Negative Modular Inverses',
          trap: 'Leaving a negative Bézout coefficient as the modular inverse answer on an exam.',
          counterexample: 'If Extended Euclid yields s = -22 for mod 31, the canonical positive inverse is -22 + 31 = 9.',
          examTip: 'Always convert negative remainders to the canonical range [0, n-1] by adding n.',
        },
        {
          title: 'Pairwise Coprime in CRT',
          trap: 'Applying the standard Chinese Remainder Theorem when moduli are not pairwise coprime.',
          counterexample: 'x ≡ 1 (mod 4) and x ≡ 2 (mod 6) cannot be solved directly with CRT formula because gcd(4, 6) = 2 ≠ 1.',
          examTip: 'Always verify gcd(m_i, m_j) = 1 for all i ≠ j before applying Chinese Remainder Theorem.',
        },
      ],
    },
  },

  {
    id: 'groups',
    week: 'Week 8',
    unitNumber: 6,
    title: 'Basic Algebraic Structures',
    subtitle: 'Semigroups, Monoids, Groups, Cayley Tables & Subgroups',
    readings: {
      grimaldi: 'Ch. 14.1–14.2, 16.1–16.2, 17.1–17.2',
      oregan: 'Ch. 6 (Algebra & Abstract Structures)',
    },
    examCategory: 'midterm',
    badge: 'Midterm Milestone (30%)',
    icon: 'Boxes',
    accentColor: 'neon-cyan',
    labId: 'groups',
    keyFormulas: [
      '\\text{Group: Closure, Associativity, Identity, Inverses}',
      '|H| \\text{ divides } |G| \\text{ (Lagrange\'s Theorem)}',
      '\\text{ord}(g) = \\min \\{ k > 0 \\mid g^k = e \\}',
      '\\mathbb{Z}_n^* = \\{ a \\in \\mathbb{Z}_n \\mid \\gcd(a, n) = 1 \\} \\text{ is abelian group under } \\times_n',
    ],
    labGuide: {
      mission: 'Generate Cayley tables for cyclic groups ℤ_n, units ℤ_n*, and Klein 4-group; audit group axioms and element orders.',
      invariant: 'Sudoku Property: In a valid group Cayley table, every element appears exactly once in every row and column.',
      step1: {
        title: 'Choose Group Structure',
        desc: 'Select Additive (ℤ_n, +), Multiplicative Units (ℤ_n*, ×), or Klein 4-group (V₄).',
      },
      step2: {
        title: 'Analyze Cayley Matrix',
        desc: 'Hover over table cells to verify closure, identity element row/column match, and inverse pairs.',
      },
      step3: {
        title: 'Examine Subgroups & Element Orders',
        desc: 'Inspect element order table ord(g) and verify Lagrange’s theorem: ord(g) must divide |G|.',
      },
    },
    quickQuest: {
      question: 'What is the order of the multiplicative group of units (ℤ₈*, ×₈) and what is the order of element 3?',
      options: ['Order of group = 4; ord(3) = 2', 'Order of group = 8; ord(3) = 4', 'Order of group = 4; ord(3) = 4', 'Order of group = 7; ord(3) = 2'],
      correctIndex: 0,
      explanation: 'ℤ₈* = {1, 3, 5, 7} since these are coprime to 8. |ℤ₈*| = φ(8) = 4. Computing powers of 3: 3¹ = 3, 3² = 9 ≡ 1 (mod 8). Hence ord(3) = 2.',
      loadPayload: {
        type: 'group',
        groupType: 'units',
        n: 8,
      },
    },
    story: {
      hook: 'How do Rubik’s cube solvers, quantum physics symmetries, and AES-256 state encryption share the exact same algebraic engine?',
      csApp: 'Group theory models symmetries, error-correcting codes (Reed-Solomon, Hamming), cryptographic permutation groups (AES S-box), and functional programming monoids.',
      keyIntuition: 'A group is a set of actions that can be combined, has a "do nothing" action (identity), and where every action can be completely undone (inverse).',
    },
    cheatSheet: {
      formulas: [
        { name: 'Lagrange’s Theorem', latex: '|H| \\text{ divides } |G|', notes: 'Order of any subgroup H divides group order |G|' },
        { name: 'Element Order Divisibility', latex: '\\text{ord}(g) \\text{ divides } |G|', notes: 'Follows directly from cyclic subgroup \\langle g \\rangle' },
        { name: 'Euler’s Totient via Lagrange', latex: 'g^{|G|} = e \\implies a^{\\phi(n)} \\equiv 1 \\pmod n', notes: 'Lagrange implies Fermat/Euler theorems' },
        { name: 'Cyclic Group Criterion', latex: 'G \\text{ is cyclic} \\iff \\exists g \\in G, \\text{ord}(g) = |G|', notes: 'g is called a generator of G' },
        { name: 'Number of Generators of ℤ_n', latex: '\\phi(n)', notes: 'Elements k where gcd(k, n) = 1' },
      ],
      traps: [
        {
          title: 'Converse of Lagrange is FALSE',
          trap: 'Believing that if d divides |G|, there MUST exist a subgroup of order d.',
          counterexample: 'The alternating group A₄ has order 12. 6 divides 12, but A₄ has NO subgroup of order 6!',
          examTip: 'Lagrange guarantees only that subgroup orders divide |G|, NOT that every divisor has a corresponding subgroup.',
        },
        {
          title: 'Sudoku Property Does Not Guarantee Group',
          trap: 'Assuming a Cayley table that is a Latin square (every element once per row/col) is automatically a group.',
          counterexample: 'A Latin square satisfies cancellation, but it might fail ASSOCIATIVITY! (e.g. Quasigroups).',
          examTip: 'You must verify all 4 axioms: Closure, Associativity, Identity, and Inverses.',
        },
        {
          title: 'Multiplicative Group Modulo Composite n',
          trap: 'Treating (ℤ_n, ×) as a group.',
          counterexample: 'In (ℤ_6, ×), 0 has no inverse, and 2 × 3 = 0 (zero divisors). (ℤ_n, ×) is NEVER a group. Only the units ℤ_n* under × forms a group!',
          examTip: 'Always exclude zero and non-coprime elements when forming multiplicative groups.',
        },
      ],
    },
  },

  {
    id: 'combinatorics',
    week: 'Weeks 9–10',
    unitNumber: 7,
    title: 'Combinatorics & Counting Principles',
    subtitle: 'Permutations, Combinations, Stars & Bars, PIE & Pigeonhole',
    readings: {
      grimaldi: 'Ch. 1, Ch. 8',
      oregan: 'Ch. 5 (Sequences, Series & Combinatorics)',
    },
    examCategory: 'test2',
    badge: 'Test 2 Core',
    icon: 'Sparkles',
    accentColor: 'neon-gold',
    labId: 'combinatorics',
    keyFormulas: [
      'P(n, r) = \\frac{n!}{(n-r)!}, \\quad \\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
      '\\binom{n + r - 1}{r} \\text{ (Stars and Bars with repetition)}',
      '|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C| \\text{ (PIE)}',
      'D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} \\approx \\left[ \\frac{n!}{e} \\right] \\text{ (Derangements)}',
    ],
    labGuide: {
      mission: 'Master combinatorial counting: Stars & Bars divider placement, 3-set PIE Venn diagrams, and Derangements.',
      invariant: 'PIE Invariant: Total distinct items in union equals alternating sum of intersection sizes.',
      step1: {
        title: 'Choose Counting Model',
        desc: 'Select Permutations/Combinations Wizard, Stars & Bars (non-negative integer solutions), or 3-Set PIE.',
      },
      step2: {
        title: 'Adjust Parameters n and r',
        desc: 'Observe real-time animation of star tokens and divider bars x₁ + x₂ + ... + xₖ = n.',
      },
      step3: {
        title: 'Inspect Exact Formulations & Derivations',
        desc: 'Review exact combinatorial formulas, factorials, and asymptotic approximations (e.g. D_n ≈ n!/e).',
      },
    },
    quickQuest: {
      question: 'How many non-negative integer solutions exist for x₁ + x₂ + x₃ + x₄ = 10?',
      options: ['286', '220', '120', '715'],
      correctIndex: 0,
      explanation: 'Using Stars & Bars: distributing n = 10 identical items into k = 4 distinct bins has C(n + k - 1, k - 1) = C(10 + 4 - 1, 4 - 1) = C(13, 3) = (13 × 12 × 11)/(3 × 2 × 1) = 286 solutions.',
      loadPayload: {
        type: 'combinatorics',
        model: 'starsAndBars',
        n: 10,
        k: 4,
      },
    },
    story: {
      hook: 'How many possible IPv6 addresses exist, and what are the exact odds of a hash collision in a SHA-256 blockchain block?',
      csApp: 'Combinatorics dictates the algorithmic time complexity of search algorithms, memory layout permutations, randomized algorithm analysis, and network packet capacity.',
      keyIntuition: 'Combinatorics is the science of counting without actually counting. Instead of enumerating millions of cases, we map the problem onto canonical structures like bins, dividers, or set intersections.',
    },
    cheatSheet: {
      formulas: [
        { name: 'Combinations with Repetition', latex: '\\binom{n + r - 1}{r}', notes: 'Distributing r identical items into n distinct bins' },
        { name: 'Positive Integer Solutions', latex: '\\binom{m - 1}{k - 1}', notes: 'Solutions to x_1 + ... + x_k = m with x_i \\ge 1' },
        { name: 'Principle of Inclusion-Exclusion (3 sets)', latex: '|A \\cup B \\cup C| = S_1 - S_2 + S_3', notes: 'Alternating sum of subset intersections' },
        { name: 'Derangements Formula', latex: 'D_n = (n-1)(D_{n-1} + D_{n-2})', notes: 'Permutations with no fixed points (\\sigma(i) \\ne i)' },
        { name: 'Pigeonhole Principle (Generalized)', latex: '\\left\\lceil \\frac{N}{k} \\right\\rceil', notes: 'If N objects are placed into k boxes, at least one box contains this many' },
      ],
      traps: [
        {
          title: 'Distinguishable vs Indistinguishable Items',
          trap: 'Using combinations C(n, r) when items are distinguishable, or powers n^r when order does not matter.',
          counterexample: 'Putting 3 distinct balls into 2 distinct boxes has 2³ = 8 ways. Putting 3 identical balls into 2 distinct boxes has C(3+2-1, 3) = 4 ways.',
          examTip: 'Always write down explicitly: Are items distinct? Are bins distinct? Can bins be empty?',
        },
        {
          title: 'Non-negative vs Positive Integer Solutions',
          trap: 'Using the wrong Stars & Bars formula when variables have lower bounds (x_i ≥ 1 vs x_i ≥ 0).',
          counterexample: 'x₁ + x₂ = 4 with x_i ≥ 0 has C(4+2-1, 4) = 5 solutions. With x_i ≥ 1, substitute y_i = x_i - 1 to get C(2+2-1, 2) = 3 solutions.',
          examTip: 'Pre-allocate required minimum items first, then distribute the remaining items with standard Stars & Bars.',
        },
        {
          title: 'Double Counting in Overlapping Cases',
          trap: 'Summing overlapping sets without subtracting intersections.',
          counterexample: 'Numbers ≤ 100 divisible by 2 (50) or 3 (33). The sum 50 + 33 = 83 double-counts numbers divisible by 6 (16). Correct: 50 + 33 - 16 = 67.',
          examTip: 'Whenever you see "or", immediately check whether the events are mutually exclusive. If not, apply PIE!',
        },
      ],
    },
  },

  {
    id: 'graphs',
    week: 'Weeks 11–15',
    unitNumber: 8,
    title: 'Graph Theory, Trees & Planarity',
    subtitle: 'Handshaking, Bipartite, Eulerian, Spanning Trees, Coloring',
    readings: {
      grimaldi: 'Ch. 11–13',
      oregan: 'Ch. 9 (Graph Theory & Trees)',
    },
    examCategory: 'final',
    badge: 'Final Exam Milestone (40%)',
    icon: 'Share2',
    accentColor: 'neon-mint',
    labId: 'graphs',
    keyFormulas: [
      '\\sum_{v \\in V} \\deg(v) = 2|E| \\text{ (Handshaking Lemma)}',
      'G \\text{ is Eulerian} \\iff \\text{Connected and all degrees are even}',
      '|E| = |V| - 1 \\text{ (Tree Characterization)}',
      'V - E + F = 2 \\text{ (Euler\'s Planar Formula)}',
      'E \\le 3V - 6 \\text{ (Planar Simple Graph bound for } V \\ge 3)',
    ],
    labGuide: {
      mission: 'Analyze graph degree sequences, verify the Handshaking Lemma, test 2-coloring bipartiteness, and run Kruskal’s MST.',
      invariant: 'Handshaking Invariant: \\sum_{v \\in V} \\deg(v) = 2|E| \\quad \\text{holds unconditionally for all graphs}',
      step1: {
        title: 'Design or Load Graph Topology',
        desc: 'Click on the canvas to place vertices, drag between vertices to draw edges, or pick presets (K₅, K₃,₃, Peterson, Tree).',
      },
      step2: {
        title: 'Run Algorithmic Audits',
        desc: 'Execute real-time checks: Eulerian circuit/trail existence, Bipartite 2-coloring (BFS), and Planarity bounds.',
      },
      step3: {
        title: 'Compute Minimum Spanning Tree',
        desc: 'Run Kruskal’s greedy algorithm with Union-Find to find the MST and verify |E| = |V| - 1.',
      },
    },
    quickQuest: {
      question: 'A simple connected planar graph has 10 vertices, each of degree 3. How many faces does it have?',
      options: ['F = 5', 'F = 6', 'F = 7', 'F = 8'],
      correctIndex: 2,
      explanation: 'By Handshaking Lemma: sum of degrees = 10 × 3 = 30 = 2|E| ==> |E| = 15. By Euler\'s Formula for planar graphs: V - E + F = 2 ==> 10 - 15 + F = 2 ==> F = 7 faces.',
      loadPayload: {
        type: 'graph',
        preset: 'petersen',
      },
    },
    story: {
      hook: 'How does Google Maps compute the fastest route through millions of road segments in 12 milliseconds?',
      csApp: 'Graphs represent social networks, internet routing protocols (BGP), dependency resolution in package managers (npm, pip), garbage collection mark-and-sweep, and neural network computation graphs.',
      keyIntuition: 'A graph is simply a set of dots (vertices) connected by lines (edges). Euler proved in 1736 that deep structural properties depend only on connections, not physical geometry.',
    },
    cheatSheet: {
      formulas: [
        { name: 'Handshaking Lemma', latex: '\\sum_{v \\in V} \\deg(v) = 2|E|', notes: 'Number of odd-degree vertices must be EVEN' },
        { name: 'Euler’s Planar Formula', latex: 'V - E + F = 2', notes: 'For any connected planar graph' },
        { name: 'Planar Edge Upper Bound', latex: 'E \\le 3V - 6 \\text{ for } V \\ge 3', notes: 'If triangle-free (like bipartite), E \\le 2V - 4' },
        { name: 'Kuratowski’s Theorem', latex: 'G \\text{ is planar} \\iff \\text{No subdivision of } K_5 \\text{ or } K_{3,3}', notes: 'Complete characterization of planarity' },
        { name: 'Bipartite Characterization', latex: 'G \\text{ is bipartite} \\iff \\text{No odd cycles}', notes: 'Equivalent to 2-colorable' },
        { name: 'Tree Characterization', latex: 'G \\text{ is a tree} \\iff \\text{Connected and } |E| = |V| - 1', notes: 'Any two vertices connected by unique simple path' },
      ],
      traps: [
        {
          title: 'Eulerian Trail vs Circuit',
          trap: 'Thinking an Eulerian circuit exists when there are 2 odd-degree vertices.',
          counterexample: 'A connected graph with EXACTLY 2 odd-degree vertices has an Eulerian TRAIL (starts at one odd vertex, ends at the other), NOT an Eulerian CIRCUIT (which requires ALL degrees to be even).',
          examTip: 'Circuit = starts and ends at the same vertex (0 odd degrees). Trail = open path visiting all edges (2 odd degrees).',
        },
        {
          title: 'Planar Bound Converse Trap',
          trap: 'Assuming that if E ≤ 3V - 6, the graph MUST be planar.',
          counterexample: 'K₃,₃ has V = 6, E = 9. 9 ≤ 3(6) - 6 = 12 is TRUE, yet K₃,₃ is NON-PLANAR! (Since K₃,₃ is bipartite, bound is E ≤ 2V - 4 = 8, which fails).',
          examTip: 'E ≤ 3V - 6 is a NECESSARY condition for planarity, NOT a sufficient condition!',
        },
        {
          title: 'Hamiltonian vs Eulerian Confusion',
          trap: 'Confusing Eulerian (visits every EDGE once) with Hamiltonian (visits every VERTEX once).',
          counterexample: 'Checking Eulerian is easy (check even degrees in O(V+E)). Checking Hamiltonian is NP-complete!',
          examTip: 'Eulerian = Edges (Euler/Edges). Hamiltonian = Vertices.',
        },
      ],
    },
  },
];
