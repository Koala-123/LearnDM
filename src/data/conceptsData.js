export const CONCEPTS_DATA = {
  relations: {
    title: 'Sets, Relations, Functions & Partitions',
    summary:
      'A relation R from set A to set B is formally defined as a subset of the Cartesian product A × B. When A = B, R is a binary relation on A. Relations model connections between entities, whether web hyperlinks, social network friendships, database foreign keys, or orderings.',
    intuition: [
      {
        heading: 'Thinking of Relations as Directed Graphs & Matrices',
        body: 'Any relation R on a finite set A = {a1, a2, ..., an} can be represented simultaneously in three ways: (1) As a set of ordered pairs, (2) As a directed graph where nodes are elements and directed edges represent pairs (u, v) ∈ R, and (3) As an n × n boolean adjacency matrix M_R where M_R[i, j] = 1 if (ai, aj) ∈ R, and 0 otherwise. This matrix representation transforms relational queries into matrix algebra!',
      },
      {
        heading: 'The 4 Core Properties That Define Structure',
        body: '• Reflexive: Every element is related to itself: ∀a ∈ A, (a, a) ∈ R. In the matrix, the main diagonal is all 1s. In the graph, every vertex has a self-loop.\n• Symmetric: Arrows are bidirectional: ∀a, b ∈ A, (a, b) ∈ R ⟹ (b, a) ∈ R. The matrix is symmetric about the main diagonal (M = Mᵀ).\n• Antisymmetric: No two distinct elements point to each other: ∀a, b ∈ A, (a, b) ∈ R ∧ (b, a) ∈ R ⟹ a = b. Off-diagonal 1s never have a mirrored 1 across the diagonal.\n• Transitive: Shortcuts must exist: ∀a, b, c ∈ A, (a, b) ∈ R ∧ (b, c) ∈ R ⟹ (a, c) ∈ R. If there is a 2-step path from a to c, there is a direct 1-step edge.',
      },
      {
        heading: 'Equivalence Relations & The Quotient Set Partition',
        body: 'A relation R is an Equivalence Relation if and only if it is Reflexive, Symmetric, and Transitive. The remarkable Fundamental Theorem of Equivalence Relations states that any equivalence relation cleanly partitions the set A into disjoint, non-empty equivalence classes [a] = {x ∈ A | (x, a) ∈ R}. No element is left unassigned, and no two different classes share any element! Example: congruence modulo m partitions the integers ℤ into m residue classes { [0], [1], ..., [m-1] }.',
      },
    ],
    theorems: [
      {
        name: 'Fundamental Theorem of Equivalence Relations',
        statement:
          'Let R be an equivalence relation on set A. The collection of equivalence classes A / R = {[a] \\mid a \\in A} forms a partition of A. That is: (1) \\forall [a] \\in A/R, [a] \\ne \\emptyset, (2) \\bigcup_{[a] \\in A/R} [a] = A, and (3) \\forall [a], [b] \\in A/R, \\text{ either } [a] = [b] \\text{ or } [a] \\cap [b] = \\emptyset. Conversely, every partition of A induces a unique equivalence relation.',
        reference: 'Grimaldi §7.4, O\'Regan §2.4',
        proofSketch:
          'Proof: Reflexivity ensures a ∈ [a], so no class is empty and their union is all of A. If [a] ∩ [b] ≠ ∅, let x ∈ [a] ∩ [b]. Then (x, a) ∈ R and (x, b) ∈ R. By symmetry and transitivity, (a, b) ∈ R. If y ∈ [a], (y, a) ∈ R, so (y, b) ∈ R, proving [a] ⊆ [b]. By symmetry, [b] ⊆ [a], hence [a] = [b].',
      },
      {
        name: 'Warshall’s Transitive Closure Algorithm',
        statement:
          'Given an n × n boolean adjacency matrix W representing relation R, Warshall\'s algorithm computes the transitive closure W^{(n)} in O(n^3) boolean operations via the dynamic recurrence: W^{(k)}[i, j] = W^{(k-1)}[i, j] \\lor (W^{(k-1)}[i, k] \\land W^{(k-1)}[k, j]).',
        reference: 'Grimaldi §7.4',
        proofSketch:
          'At step k, W^{(k)}[i, j] = 1 if and only if there exists a directed path from vertex i to vertex j using only intermediate vertices from the prefix set {1, 2, ..., k}. When k = n, all possible intermediate vertices have been considered.',
      },
      {
        name: 'Counting Formulas for Relations on Set of Size n',
        statement:
          'On a set A with |A| = n:\n• Total relations: 2^{n^2}\n• Reflexive relations: 2^{n(n-1)}\n• Symmetric relations: 2^{n(n+1)/2}\n• Antisymmetric relations: 2^n \\cdot 3^{n(n-1)/2}\n• Reflexive & Symmetric: 2^{n(n-1)/2}',
        reference: 'Grimaldi §5.1–5.4',
        proofSketch:
          'The matrix has n diagonal entries and n(n-1)/2 pairs of symmetric off-diagonal entries { (i, j), (j, i) }. For antisymmetric relations, each diagonal entry has 2 choices (0 or 1), while each off-diagonal pair has 3 choices: (0,0), (1,0), or (0,1) — the forbidden choice is (1,1).',
      },
    ],
    pitfalls: [
      'Antisymmetric is NOT the opposite of Symmetric. A relation can be both (e.g. equality R = {(a,a)}), neither, or one without the other.',
      'The empty relation ∅ on a non-empty set A is vacuously symmetric, antisymmetric, and transitive, but NOT reflexive (since (a,a) ∉ ∅).',
      'For a function f: A → B to be invertible, it must be strictly BIJECTIVE (both injective/one-to-one and surjective/onto).',
    ],
  },

  proofs: {
    title: 'Proof Techniques, Induction & Recursion',
    summary:
      'Rigorous mathematical proof guarantees that a theorem holds across infinite cases without exception. Key techniques include Direct Proof, Contrapositive, Proof by Contradiction (Reductio ad Absurdum), and the Principle of Mathematical Induction.',
    intuition: [
      {
        heading: 'Direct Proof vs Contrapositive vs Contradiction',
        body: '• Direct Proof: Assume P is True, logically deduce step-by-step until Q is shown.\n• Contrapositive Proof: Prove the logically equivalent statement ¬Q ⟹ ¬P. Extremely powerful when negating Q provides a cleaner algebraic starting point (e.g. proving "If n² is even, then n is even" by assuming n is odd: n = 2k + 1 ⟹ n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd!).\n• Proof by Contradiction: Assume P is True AND Q is False (P ∧ ¬Q). Deduce until you reach an impossible contradiction (e.g. 1 = 0, or an integer is both even and odd).',
      },
      {
        heading: 'Weak vs Strong Mathematical Induction',
        body: 'Weak Induction assumes only the immediate predecessor P(k) to prove P(k+1). Strong Induction assumes all predecessors P(n0), P(n0+1), ..., P(k) to prove P(k+1). While they are mathematically equivalent to each other and to the Well-Ordering Principle of ℕ, Strong Induction is essential when an element breaks down into smaller sub-pieces rather than just stepping down by 1 (e.g. prime factorization, trees, divide-and-conquer recurrences).',
      },
      {
        heading: 'Solving 2nd-Order Linear Recurrences',
        body: 'For an = c1 a_{n-1} + c2 a_{n-2}, we hypothesize an exponential solution of the form an = rⁿ. Substituting gives r² - c1 r - c2 = 0 (the characteristic equation). If roots r1 ≠ r2 are distinct, the general solution is an = A r1ⁿ + B r2ⁿ, where constants A and B are determined by the initial conditions a0 and a1.',
      },
    ],
    theorems: [
      {
        name: 'Principle of Mathematical Induction (Weak)',
        statement:
          'Let P(n) be a predicate indexed by integers n \\ge n_0. If:\n1. P(n_0) is True (Base Case)\n2. \\forall k \\ge n_0, P(k) \\implies P(k+1) (Inductive Step)\nThen P(n) is True for all integers n \\ge n_0.',
        reference: 'Grimaldi §4.1, O\'Regan §4.2',
        proofSketch:
          'Proved via Well-Ordering: If the statement were false for some n, the set of counterexamples S = {n ≥ n0 | ¬P(n)} would be non-empty and must possess a least element m. Since m > n0 (base case holds), m - 1 is true. But P(m-1) ⟹ P(m), contradicting that m is a counterexample!',
      },
      {
        name: 'Well-Ordering Principle of the Natural Numbers',
        statement:
          'Every non-empty subset S of non-negative integers \\mathbb{N} contains a smallest element: \\exists m \\in S \\text{ such that } \\forall s \\in S, m \\le s.',
        reference: 'Grimaldi §4.1',
        proofSketch:
          'The Well-Ordering Principle, the Principle of Mathematical Induction, and the Principle of Strong Induction are all logically equivalent.',
      },
      {
        name: 'Homogeneous Recurrence Characteristic Theorem',
        statement:
          'Let a_n = c_1 a_{n-1} + c_2 a_{n-2} with characteristic equation r^2 - c_1 r - c_2 = 0.\n• If distinct roots r_1 \\ne r_2: a_n = A r_1^n + B r_2^n.\n• If repeated root r_1 = r_2: a_n = (A + B n) r_1^n.',
        reference: 'Grimaldi §10.1–10.2, O\'Regan §4.5',
        proofSketch:
          'Linearity of the difference operator implies that any linear combination of solutions is also a solution. The initial conditions fix the 2 free parameters uniquely.',
      },
    ],
    pitfalls: [
      'In proof by contradiction, remember to negate the entire proposition: the negation of P ⇒ Q is P ∧ ¬Q (NOT ¬P ⇒ ¬Q).',
      'In the infamous "All horses are the same color" fallacy, the inductive step fails at k = 1 → k = 2 because the two single-horse subsets do not overlap!',
      'When using Strong Induction on an order-k recurrence, you must verify k independent base cases, not just 1.',
    ],
  },

  logic: {
    title: 'Propositional Logic & Truth Tables',
    summary:
      'Propositional logic models declarative truth values using formal connectives: Negation (¬), Conjunction (∧), Disjunction (∨), Exclusive-OR (⊕), Conditional Implication (→), and Biconditional (↔). Truth tables evaluate propositions across all 2ⁿ possible valuations.',
    intuition: [
      {
        heading: 'Truth Values and The Implication Operator',
        body: 'The conditional implication p → q is often misunderstood in English. In mathematical logic, p → q is False in EXACTLY ONE case: when hypothesis p is True, but conclusion q is False. If the hypothesis p is False, the implication is automatically TRUE (Vacuous Truth). Example: "If 1 + 1 = 5, then the moon is made of green cheese" is 100% mathematically True!',
      },
      {
        heading: 'Tautology, Contradiction, and Contingency',
        body: '• Tautology: A compound proposition that evaluates to True under every possible truth valuation (e.g. p ∨ ¬p, or ((p → q) ∧ p) → q).\n• Contradiction: Evaluates to False under every possible valuation (e.g. p ∧ ¬p).\n• Contingency: Evaluates to True under some valuations and False under others (e.g. p → q).',
      },
      {
        heading: 'Rules of Valid Inference (Modus Ponens & Modus Tollens)',
        body: 'An argument with premises P1, P2, ..., Pk and conclusion C is valid if and only if (P1 ∧ P2 ∧ ... ∧ Pk) → C is a Tautology.\n• Modus Ponens: From p and p → q, infer q.\n• Modus Tollens: From ¬q and p → q, infer ¬p.\n• Resolution Principle: From (p ∨ q) and (¬p ∨ r), infer (q ∨ r). This is the core engine of automated SAT solvers!',
      },
    ],
    theorems: [
      {
        name: 'De Morgan’s Laws for Logic',
        statement:
          '\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q \\quad \\text{and} \\quad \\neg(p \\lor q) \\equiv \\neg p \\land \\neg q.',
        reference: 'Grimaldi §2.1–2.2, O\'Regan §15.2',
        proofSketch:
          'Verified by checking all 4 combinations of truth values for p and q. The negation of an AND condition requires only one term to fail.',
      },
      {
        name: 'Equivalence of Implication',
        statement:
          'p \\to q \\equiv \\neg p \\lor q \\equiv \\neg q \\to \\neg p.',
        reference: 'Grimaldi §2.2',
        proofSketch:
          'Both p → q and ¬p ∨ q are False only when p = T and q = F, and True in all other 3 cases.',
      },
      {
        name: 'Soundness of Modus Ponens & Modus Tollens',
        statement:
          '((p \\to q) \\land p) \\implies q \\quad \\text{and} \\quad ((p \\to q) \\land \\neg q) \\implies \\neg p \\text{ are Tautologies.}',
        reference: 'Grimaldi §2.3, O\'Regan §15.3',
        proofSketch:
          'If p → q is True and p is True, q cannot be False, hence q must be True. If q is False, p cannot be True, hence p must be False.',
      },
    ],
    pitfalls: [
      'Fallacy of Affirming the Consequent: ((p → q) ∧ q) does NOT imply p.',
      'Fallacy of Denying the Antecedent: ((p → q) ∧ ¬p) does NOT imply ¬q.',
      'Vacuous Truth: When p is False, the conditional p → q is automatically True regardless of q.',
    ],
  },

  posets: {
    title: 'Partial Orders, Lattices & Boolean Algebras',
    summary:
      'A Partially Ordered Set (Poset) is a set endowed with a relation that is Reflexive, Antisymmetric, and Transitive. Hasse diagrams provide a concise visual representation by omitting self-loops and transitive shortcuts.',
    intuition: [
      {
        heading: 'Why "Partial" Order?',
        body: 'In total orders (like real numbers with ≤), every two elements can be compared: either a ≤ b or b ≤ a. In partial orders, some elements are incomparable (written a ∥ b). In the divisibility poset (D12, |), neither 4 divides 6 nor 6 divides 4, so 4 and 6 are incomparable!',
      },
      {
        heading: 'Hasse Diagrams: The Art of Minimalist Graphs',
        body: 'Drawing all pairs in a poset creates an illegible web of edges. A Hasse diagram applies two reduction rules: (1) Omit all reflexive self-loops (a ≤ a is understood), and (2) Omit all transitive edges (if a < b and b < c, omit the edge a → c). Furthermore, draw elements higher on the page if they are greater: edge from a up to b means b covers a (b > a with no element strictly in between).',
      },
      {
        heading: 'Lattices and Complemented Distributive Boolean Algebras',
        body: 'A poset (L, ≤) is a Lattice if every pair of elements {a, b} has a unique Greatest Lower Bound (GLB / Meet: a ∧ b) and a unique Least Upper Bound (LUB / Join: a ∨ b). A lattice is Distributive if meet distributes over join and vice-versa. A Boolean algebra is a complemented distributive lattice with 0 and 1. Finite Boolean algebras always have size 2ᵏ and are isomorphic to power set lattices (P(S), ⊆)!',
      },
    ],
    theorems: [
      {
        name: 'Birkhoff’s Characterization of Distributive Lattices',
        statement:
          'A lattice L is distributive if and only if it does NOT contain a sublattice isomorphic to the pentagon lattice N_5 or the diamond lattice M_3.',
        reference: 'Grimaldi §15.2, O\'Regan §14.5',
        proofSketch:
          'In both N5 and M3, one can explicitly construct 3 elements where a ∧ (b ∨ c) ≠ (a ∧ b) ∨ (a ∧ c). Any non-distributive lattice must embed one of these two minimal counter-structures.',
      },
      {
        name: 'Uniqueness of Complements in Distributive Lattices',
        statement:
          'In a bounded distributive lattice (L, \\land, \\lor, 0, 1), if an element a has a complement a\', then that complement is strictly unique.',
        reference: 'Grimaldi §15.4',
        proofSketch:
          'Suppose both b and c are complements of a. Then a ∧ b = 0, a ∨ b = 1, a ∧ c = 0, a ∨ c = 1. Then b = b ∧ 1 = b ∧ (a ∨ c) = (b ∧ a) ∨ (b ∧ c) = 0 ∨ (b ∧ c) = (a ∧ c) ∨ (b ∧ c) = (a ∨ b) ∧ c = 1 ∧ c = c.',
      },
      {
        name: 'Structure Theorem for Finite Boolean Algebras',
        statement:
          'Every finite Boolean algebra B is isomorphic to the power set Boolean algebra (\\mathcal{P}(A), \\subseteq) of its set of atoms A. In particular, |B| = 2^{|A|} is always a power of 2.',
        reference: 'Grimaldi §15.4–15.5',
        proofSketch:
          'An atom is an element directly covering 0. Every element in a finite Boolean algebra can be uniquely expressed as the join of atoms below it.',
      },
    ],
    pitfalls: [
      'Maximal vs Greatest: A poset can have multiple maximal elements, but at most ONE greatest element (which must dominate ALL elements).',
      'D_n is a Boolean algebra if and only if n is square-free (no repeated prime factors). D_12 is NOT a Boolean algebra because 12 = 2² × 3.',
      'Sublattices must preserve meets and joins! A subset that is itself a lattice under inherited order might not be a sublattice if its meets/joins differ from the parent lattice.',
    ],
  },

  modular: {
    title: 'Modular Arithmetic & Number Theory',
    summary:
      'Number theory forms the mathematical core of modern cryptography and computational algorithms. Key pillars include the Division Algorithm, Greatest Common Divisors, the Extended Euclidean Algorithm (Bézout’s Identity), Modular Inverses, Fermat’s Little Theorem, Euler’s Totient Theorem, and the Chinese Remainder Theorem.',
    intuition: [
      {
        heading: 'Clock Arithmetic & Congruence Classes',
        body: 'We say a ≡ b (mod m) if and only if m divides (a - b). This is an equivalence relation on ℤ, partitioning all integers into m residue classes ℤ/mℤ = { [0], [1], ..., [m-1] }. Addition and multiplication are well-defined on residue classes: [a] + [b] = [a + b] and [a] × [b] = [a × b].',
      },
      {
        heading: 'Why Do Inverses Require Coprimality?',
        body: 'In ordinary arithmetic, every non-zero number has a reciprocal (1/x). In modular arithmetic, division is defined as multiplying by the modular inverse: ax ≡ 1 (mod m). By Bézout’s identity, ax + my = 1 is solvable if and only if gcd(a, m) divides 1, meaning gcd(a, m) = 1! If gcd(a, m) > 1, a is a zero-divisor and can never have an inverse.',
      },
      {
        heading: 'The Extended Euclidean Algorithm: A Backward Ladder',
        body: 'The standard Euclidean algorithm finds gcd(a, b) by repeated division: r_{k-2} = q_k r_{k-1} + r_k. The Extended version tracks integer coefficients s and t such that s·a + t·b = r_k at every single step! When the remainder reaches gcd(a, b) = 1, the coefficient s gives the exact modular inverse a⁻¹ mod b.',
      },
    ],
    theorems: [
      {
        name: 'Bézout’s Identity',
        statement:
          'For any integers a and b (not both zero), \\gcd(a, b) is the smallest positive integer that can be written as an integer linear combination: \\gcd(a, b) = s \\cdot a + t \\cdot b \\text{ for some } s, t \\in \\mathbb{Z}.',
        reference: 'Grimaldi §4.3, O\'Regan §3.2',
        proofSketch:
          'Consider the set S = {xa + yb > 0 | x, y ∈ ℤ}. By the Well-Ordering Principle, S has a smallest element d = sa + tb. Using the division algorithm, any element in S is divisible by d, and both a and b are in S, proving d = gcd(a, b).',
      },
      {
        name: 'Euler’s Totient Theorem & Fermat’s Little Theorem',
        statement:
          'If \\gcd(a, n) = 1, then a^{\\phi(n)} \\equiv 1 \\pmod n, where \\phi(n) = n \\prod_{p \\mid n} (1 - 1/p). As a corollary, for any prime p and p \\nmid a: a^{p-1} \\equiv 1 \\pmod p.',
        reference: 'Grimaldi §14.3, O\'Regan §3.4',
        proofSketch:
          'Consider the set of units U = {r1, r2, ..., r_φ(n)} coprime to n. Multiplying each by a permutes U modulo n because gcd(a, n) = 1. Thus ∏ (a r_i) ≡ ∏ r_i (mod n) ⟹ a^{φ(n)} ∏ r_i ≡ ∏ r_i (mod n). Since ∏ r_i is coprime to n, we can cancel it to obtain a^{φ(n)} ≡ 1 (mod n).',
      },
      {
        name: 'Chinese Remainder Theorem (CRT)',
        statement:
          'Let m_1, m_2, ..., m_k be pairwise coprime positive integers, and let M = \\prod m_i. Then the system of congruences x \\equiv a_i \\pmod{m_i} has a unique simultaneous solution modulo M, given by: x \\equiv \\sum_{i=1}^k a_i M_i y_i \\pmod M, \\text{ where } M_i = M / m_i \\text{ and } y_i = M_i^{-1} \\pmod{m_i}.',
        reference: 'Grimaldi §4.6, O\'Regan §3.5',
        proofSketch:
          'Each term M_i y_i is congruent to 1 mod m_i and congruent to 0 mod m_j for all j ≠ i. Thus, the sum satisfies x ≡ a_i (mod m_i) for every equation simultaneously.',
      },
    ],
    pitfalls: [
      'Dividing across congruences: ax ≡ ay (mod m) implies x ≡ y ONLY if gcd(a, m) = 1. In general, x ≡ y (mod m / gcd(a, m)).',
      'Negative modular inverses: If Bézout gives s = -3 for mod 11, the canonical positive inverse is -3 + 11 = 8.',
      'CRT moduli must be PAIRWISE coprime: gcd(m_i, m_j) = 1 for all i ≠ j.',
    ],
  },

  groups: {
    title: 'Basic Algebraic Structures',
    summary:
      'Abstract algebra studies sets equipped with operations satisfying structural axioms. The fundamental hierarchy ascends: Groupoid (Closure) ⊂ Semigroup (Associativity) ⊂ Monoid (Identity) ⊂ Group (Inverses) ⊂ Abelian Group (Commutativity).',
    intuition: [
      {
        heading: 'The 4 Group Axioms',
        body: 'A group (G, ∗) satisfies:\n1. Closure: ∀a, b ∈ G, a ∗ b ∈ G.\n2. Associativity: ∀a, b, c ∈ G, (a ∗ b) ∗ c = a ∗ (b ∗ c).\n3. Identity: ∃e ∈ G such that ∀a ∈ G, a ∗ e = e ∗ a = a.\n4. Inverses: ∀a ∈ G, ∃a⁻¹ ∈ G such that a ∗ a⁻¹ = a⁻¹ ∗ a = e.\nIf additionally a ∗ b = b ∗ a for all a, b, G is an Abelian (commutative) group.',
      },
      {
        heading: 'Cayley Tables and The Sudoku Latin Square Property',
        body: 'A Cayley table is the operation multiplication table for a finite group. In any group Cayley table, every element appears EXACTLY ONCE in every row and every column (the Latin Square property). Why? Because left-multiplication by any element g is a bijection: if ga = gb, cancellation gives a = b!',
      },
      {
        heading: 'Lagrange’s Theorem: The Prime Arbiter of Subgroups',
        body: 'Lagrange’s Theorem states that for any finite group G and subgroup H, the order |H| must divide |G|. As an immediate consequence, the order of every element ord(g) must divide |G|, because the cyclic subgroup generated by g, ⟨g⟩ = {e, g, g², ..., g^{k-1}}, has order equal to ord(g). Groups of prime order p are always cyclic and have no non-trivial subgroups!',
      },
    ],
    theorems: [
      {
        name: 'Lagrange’s Subgroup Theorem',
        statement:
          'If H is a subgroup of a finite group G, then the order of H divides the order of G: |G| = [G : H] \\cdot |H|, where [G : H] is the index of H (number of distinct left cosets of H in G).',
        reference: 'Grimaldi §16.2, O\'Regan §6.4',
        proofSketch:
          'The left cosets gH = {gh | h ∈ H} partition G into disjoint sets, and each coset has exactly |H| elements because left multiplication is a bijection.',
      },
      {
        name: 'Classification of Groups of Prime Order',
        statement:
          'Every group G of prime order p is cyclic and isomorphic to (\\mathbb{Z}_p, +_p). In particular, every element other than the identity generates the entire group.',
        reference: 'Grimaldi §16.2',
        proofSketch:
          'Let g ∈ G with g ≠ e. By Lagrange, ord(g) divides p. Since p is prime and g ≠ e, ord(g) = p. Thus ⟨g⟩ has p elements and must be all of G.',
      },
      {
        name: 'Cayley’s Representation Theorem',
        statement:
          'Every group G is isomorphic to a subgroup of the symmetric group \\operatorname{Sym}(G) of permutations of its underlying set.',
        reference: 'Grimaldi §16.3',
        proofSketch:
          'Map each element g ∈ G to the permutation λ_g: G → G defined by λ_g(x) = gx. The map g ↦ λ_g is an injective group homomorphism.',
      },
    ],
    pitfalls: [
      'The converse of Lagrange’s Theorem is FALSE: If d divides |G|, there is NOT necessarily a subgroup of order d (e.g. A₄ has order 12, 6 divides 12, but A₄ has no subgroup of order 6).',
      'The Latin Square (Sudoku) property is NECESSARY for a Cayley table to be a group, but NOT SUFFICIENT (it might fail associativity!).',
      '(ℤ_n, ×) is NEVER a group because 0 has no inverse. Only the group of units (ℤ_n*, ×) is a group.',
    ],
  },

  combinatorics: {
    title: 'Combinatorics & Counting Principles',
    summary:
      'Combinatorics provides mathematical techniques to enumerate finite configurations without exhaustive listing. Core principles include the Rule of Sum/Product, Permutations, Combinations, Combinations with Repetition (Stars & Bars), the Principle of Inclusion-Exclusion (PIE), Derangements, and the Pigeonhole Principle.',
    intuition: [
      {
        heading: 'Permutations vs Combinations vs Repetition',
        body: '• Permutations P(n, r) = n! / (n - r)!: Order MATTERS (e.g. race finishes, passwords).\n• Combinations C(n, r) = n! / (r! (n - r)!): Order DOES NOT matter (e.g. poker hands, committee selection).\n• Stars & Bars C(n + r - 1, r): Distributing r identical objects into n distinct containers, or finding non-negative integer solutions to x1 + x2 + ... + xn = r.',
      },
      {
        heading: 'The Geometry of Stars & Bars',
        body: 'Imagine placing r identical stars (★) in a line. To divide them into n distinct categories, you need n - 1 divider bars (|). Total slots = r stars + (n - 1) bars = n + r - 1 slots. Choosing where to place the r stars among these slots gives C(n + r - 1, r). If every category must receive at least 1 item (positive integers xi ≥ 1), substitute yi = xi - 1 to distribute r - n items among n bins: C((r - n) + n - 1, r - n) = C(r - 1, n - 1)!',
      },
      {
        heading: 'Principle of Inclusion-Exclusion (PIE) & Derangements',
        body: 'To count the union of overlapping sets, add the individual sizes, subtract pairwise intersections, add 3-way intersections, and so on. A classic application is Derangements Dn (permutations with NO fixed points, σ(i) ≠ i). Using PIE, Dn = n! ∑_{k=0}^n (-1)ᵏ / k!. As n grows, Dn / n! converges astonishingly rapidly to 1/e ≈ 0.367879!',
      },
    ],
    theorems: [
      {
        name: 'Stars & Bars Theorem',
        statement:
          'The number of non-negative integer solutions to x_1 + x_2 + \\dots + x_k = n (where x_i \\ge 0) is \\binom{n + k - 1}{n} = \\binom{n + k - 1}{k - 1}. The number of strictly positive integer solutions (x_i \\ge 1) is \\binom{n - 1}{k - 1}.',
        reference: 'Grimaldi §1.4, O\'Regan §5.3',
        proofSketch:
          'Placing n identical stars and k - 1 identical divider bars requires choosing n positions out of n + k - 1 total positions.',
      },
      {
        name: 'Principle of Inclusion-Exclusion (PIE)',
        statement:
          '|A_1 \\cup A_2 \\cup \\dots \\cup A_n| = \\sum_{i} |A_i| - \\sum_{i < j} |A_i \\cap A_j| + \\sum_{i < j < k} |A_i \\cap A_j \\cap A_k| - \\dots + (-1)^{n-1} |A_1 \\cap \\dots \\cap A_n|.',
        reference: 'Grimaldi §8.1',
        proofSketch:
          'An element belonging to exactly r of the sets is counted ∑_{k=1}^r (-1)^{k-1} C(r, k) = 1 - (1 - 1)^r = 1 time.',
      },
      {
        name: 'Derangements Formula & Asymptotics',
        statement:
          'The number of derangements of n elements is D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = (n-1)(D_{n-1} + D_{n-2}). Furthermore, D_n = \\left[ \\frac{n!}{e} \\right] \\text{ (rounded to nearest integer for } n \\ge 1).',
        reference: 'Grimaldi §8.3',
        proofSketch:
          'Let Ai be the set of permutations where element i is in its original position. Then Dn = n! - |A1 ∪ ... ∪ An|. By PIE, each k-way intersection has (n - k)! permutations.',
      },
    ],
    pitfalls: [
      'Confusing distinguishable vs indistinguishable items: distributing distinct balls into distinct boxes is n^r; identical balls into distinct boxes is Stars & Bars C(n + r - 1, r).',
      'Forgetting lower bounds: If xi ≥ 2, subtract 2 from each variable before using Stars & Bars.',
      'Double counting: Summing cases that overlap without subtracting intersections.',
    ],
  },

  graphs: {
    title: 'Graph Theory, Trees & Planarity',
    summary:
      'Graph theory models networks of pairwise relationships. Fundamental concepts include degree sequences, the Handshaking Lemma, Eulerian circuits, Hamiltonian paths, bipartite graphs, trees, and planar graph embeddings.',
    intuition: [
      {
        heading: 'The Handshaking Lemma & Degree Parity',
        body: 'Every edge has two endpoints. When we sum the degrees of all vertices, every edge is counted exactly twice: ∑ deg(v) = 2|E|. An immediate consequence is that the number of vertices with ODD degree must always be EVEN! You can never have a graph with 3 vertices of degree 3.',
      },
      {
        heading: 'Eulerian Circuits vs Hamiltonian Cycles',
        body: '• Eulerian Circuit: A closed walk visiting every EDGE exactly once. Exists if and only if the graph is connected and EVERY vertex has EVEN degree (Euler, 1736).\n• Hamiltonian Cycle: A closed cycle visiting every VERTEX exactly once. Determining whether a graph has a Hamiltonian cycle is NP-Complete (no known efficient polynomial-time characterization).',
      },
      {
        heading: 'Euler’s Planar Formula & Kuratowski’s Theorem',
        body: 'A graph is planar if it can be drawn in the plane without crossing edges. Any connected planar graph satisfies V - E + F = 2, where F is the number of faces (including the unbounded outer face). For simple planar graphs with V ≥ 3, every face has at least 3 boundary edges, leading to the strict upper bound E ≤ 3V - 6. Kuratowski showed that a graph is planar if and only if it does not contain a subdivision of K5 or K3,3.',
      },
    ],
    theorems: [
      {
        name: 'Euler’s Handshaking Lemma',
        statement:
          'For any undirected graph G = (V, E): \\sum_{v \\in V} \\deg(v) = 2|E|. As a consequence, the number of vertices of odd degree is always even.',
        reference: 'Grimaldi §11.1, O\'Regan §9.2',
        proofSketch:
          'Each edge e = {u, v} contributes 1 to deg(u) and 1 to deg(v), adding exactly 2 to the sum of degrees.',
      },
      {
        name: 'Euler’s Theorem for Eulerian Graphs',
        statement:
          'A connected undirected multigraph has an Eulerian circuit if and only if every vertex has even degree. It has an open Eulerian trail if and only if exactly 2 vertices have odd degree.',
        reference: 'Grimaldi §11.3',
        proofSketch:
          'Every visit to a vertex enters along one edge and leaves along another, requiring degrees to be even. Sufficiency is proved by Hierholzer’s cycle-splicing algorithm.',
      },
      {
        name: 'Euler’s Planar Polyhedral Formula & Edge Bounds',
        statement:
          'For any connected planar graph drawn with V vertices, E edges, and F faces: V - E + F = 2. If V \\ge 3, then E \\le 3V - 6. If G is triangle-free (like bipartite graphs), then E \\le 2V - 4.',
        reference: 'Grimaldi §11.4, O\'Regan §9.5',
        proofSketch:
          'Induction on E: Base tree has E = V - 1, F = 1, so V - (V - 1) + 1 = 2. Each additional edge creates a cycle, incrementing both E and F by 1 while maintaining V - E + F = 2.',
      },
      {
        name: 'Kuratowski’s Theorem',
        statement:
          'A finite graph is planar if and only if it does not contain a subgraph that is a subdivision of K_5 (complete graph on 5 vertices) or K_{3,3} (complete bipartite graph on 3 and 3 vertices).',
        reference: 'Grimaldi §11.4',
        proofSketch:
          'K5 has V=5, E=10 > 3(5)-6 = 9 (violates planar bound). K3,3 is bipartite (triangle-free) with V=6, E=9 > 2(6)-4 = 8 (violates triangle-free bound).',
      },
    ],
    pitfalls: [
      'Eulerian Trail vs Circuit: 0 odd vertices = Eulerian Circuit (starts and ends at same vertex). 2 odd vertices = Eulerian Trail (starts and ends at different vertices). >2 odd vertices = Neither!',
      'Planar bound converse trap: E ≤ 3V - 6 is a NECESSARY condition, NOT sufficient. K3,3 satisfies 9 ≤ 3(6) - 6 = 12, but is non-planar!',
      'Tree characterizations: For a graph with V vertices, any two of the following implies the third: (1) Connected, (2) Acyclic, (3) |E| = |V| - 1.',
    ],
  },
};
