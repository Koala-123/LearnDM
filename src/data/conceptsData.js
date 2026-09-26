export const CONCEPTS_DATA = {
  "relations": {
    "title": "Sets, Relations, Functions & Partitions",
    "summary": "**Starting from Scratch: Relations, Partitions & Functions**\n• **Set**: A collection of distinct objects (like numbers, students, or web pages).\n• **Pair**: An ordered connection $(a, b)$ meaning \"$a$ connects to $b$\".\n• **Cartesian Product ($A \\times B$)**: The list of *all possible* pairs between set $A$ and set $B$.\n• **Binary Relation ($R$)**: Any chosen subset of those pairs representing connections that actually exist.\n• **Equivalence Relation**: A relation that acts like a \"sameness detector\" by being Reflexive, Symmetric, and Transitive.\n• **Equivalence Class ($[a]$)**: The bundle of all items equivalent to $a$, slicing the set into non-overlapping partition blocks.\n• **Function ($f: A \\to B$)**: A restricted relation where *every* input in $A$ points to *exactly one* output in $B$.",
    "intuition": [
      {
        "heading": "Visualizing Relations: Three Simple Ways",
        "tag": "Visual Models",
        "intro": "A binary relation is a collection of connections between objects. Before analyzing abstract algebraic properties, mathematicians and computer scientists visualize these connections using three equivalent models depending on whether they need intuition, graphical pathways, or fast computational execution.",
        "subsections": [
          {
            "title": "Roster Notation (List of Ordered Pairs)",
            "badge": "Model 1",
            "content": "The simplest way to define a relation is by explicitly listing every pair that is connected. For example, if element $1$ connects to $2$, we record $(1, 2)$. If no connection exists, the pair is omitted from the list.\n\nWhile this roster format is mathematically precise, it quickly becomes difficult for humans to read and understand when sets grow large."
          },
          {
            "title": "Directed Graph (Arrow Diagram)",
            "badge": "Model 2",
            "content": "We represent every element in the set as a dot, known as a vertex. Whenever element $u$ connects to element $v$, we draw a directed arrow pointing from $u$ straight to $v$.\n\nDirected graphs provide an immediate visual picture of network flow. Loops indicate elements that connect to themselves, while two-way arrows indicate reciprocal connections."
          },
          {
            "title": "Boolean Adjacency Matrix (The Computational Grid)",
            "badge": "Model 3",
            "content": "We arrange the elements along the rows and columns of a two-dimensional grid. If row $i$ connects to column $j$, we place a $1$ in that cell. If they do not connect, we record a $0$.\n\nComputers favor the adjacency matrix because checking whether two nodes connect takes a single lookup operation in constant time, and path composition maps directly to boolean matrix multiplication."
          }
        ]
      },
      {
        "heading": "The 4 Core Properties (The Personality of a Relation)",
        "tag": "Core Axioms",
        "intro": "Binary relations can exhibit distinct fundamental behaviors that dictate their algebraic properties. Rather than arbitrary rules, these four conditions act as a personality test classifying how elements interact within a system.",
        "subsections": [
          {
            "title": "Reflexive Property (Self-Loops)",
            "badge": "Property 1",
            "content": "Every single element in the domain must connect to itself without exception. Formally, for all $a \\in A$, the ordered pair $(a, a)$ belongs to relation $R$.\n\nIn an arrow diagram, every dot has a self-loop pointing back to itself. On a boolean adjacency matrix, this manifests as a solid diagonal of ones stretching from the top-left corner to the bottom-right corner."
          },
          {
            "title": "Symmetric Property (Two-Way Streets)",
            "badge": "Property 2",
            "content": "Whenever an element $a$ relates to an element $b$, then $b$ is required to relate back to $a$ with equal standing. Formally, $(a, b) \\in R$ guarantees that $(b, a) \\in R$.\n\nIn network graphs, this represents a bidirectional two-way street where communication travels symmetrically. On the adjacency matrix, the grid exhibits perfect bilateral symmetry across the main diagonal: reflecting the matrix over its diagonal produces the identical grid."
          },
          {
            "title": "Antisymmetric Property (One-Way Connections Between Distinct Elements)",
            "badge": "Property 3",
            "content": "Distinct elements are forbidden from pointing to each other in both directions simultaneously. If $(a, b) \\in R$ and $(b, a) \\in R$, then $a$ and $b$ must be the exact same element ($a = b$).\n\nA classic example is the less-than-or-equal relation ($\\le$) on real numbers. If $x \\le y$ and $y \\le x$, then $x$ must equal $y$. Notice that antisymmetric does not mean the opposite of symmetric: a relation can satisfy both, neither, or one without the other."
          },
          {
            "title": "Transitive Property (Shortcut Rule)",
            "badge": "Property 4",
            "content": "If a connection exists from $a$ to $b$, and another connection exists from $b$ to $c$, there must exist a direct shortcut connecting $a$ directly to $c$. Formally, $(a, b) \\in R$ and $(b, c) \\in R$ implies $(a, c) \\in R$.\n\nIn transit networks, transitivity ensures that if you can travel from city $A$ to city $B$ and then transfer to city $C$, there exists a valid itinerary taking you from $A$ to $C$."
          }
        ]
      },
      {
        "heading": "Counting Transitive Relations: Why No Simple Formula Exists",
        "tag": "Combinatorial Counting",
        "intro": "While calculating the number of reflexive or symmetric relations requires straightforward combinatorics, counting transitive relations is a notoriously difficult mathematical challenge that lacks a simple closed form.",
        "subsections": [
          {
            "title": "The Conditional Dependency Dilemma",
            "badge": "Theoretical Barrier",
            "content": "In reflexive or symmetric relations, each pair can be chosen independently like flipping separate coins. Transitivity, however, introduces strict conditional dependencies: selecting $(a, b)$ and $(b, c)$ forces $(a, c)$ to be selected as well.\n\nBecause every choice cascades through the set and influences future valid choices, no simple closed-form formula exists for the number of transitive relations on an $n$-element set."
          },
          {
            "title": "Hand Derivation for Two Elements on Set ${1, 2}$",
            "badge": "Hand Derivation",
            "content": "On a two-element set, the total number of possible binary relations is $2^{2^2} = 2^4 = 16$. The only non-trivial transitive condition occurs when both $(1, 2)$ and $(2, 1)$ belong to the relation, which forces $(1, 1)$ and $(2, 2)$ to belong as well.\n\nTransitivity is violated if and only if both $(1, 2)$ and $(2, 1)$ are present, but at least one diagonal element is omitted. Exactly three relations fail this test: the pair ${(1, 2), (2, 1)}$ alone, the triplet missing $(2, 2)$, and the triplet missing $(1, 1)$. Subtracting these three failures from the sixteen possible relations leaves exactly thirteen transitive relations."
          },
          {
            "title": "Exact Values for Small Sets",
            "badge": "Exact Counts",
            "content": "For sets of very small size, exact counts have been calculated through exhaustive computational enumeration. A set with $0$ elements has $1$ transitive relation. A set with $1$ element has $2$ transitive relations.\n\nAs the set size grows, the counts escalate rapidly: $2$ elements yield $13$ transitive relations; $3$ elements yield $171$ relations; $4$ elements yield $3,994$ relations; and $5$ elements yield $154,303$ transitive relations."
          },
          {
            "title": "Asymptotic Growth (The Kleitman-Rothschild Bound)",
            "badge": "Asymptotic Theorem",
            "content": "For large values of $n$, the number of transitive relations $T(n)$ grows according to the asymptotic formula $T(n) = 2^{n^2/4 + O(n)}$.\n\nThis deep theorem demonstrates that almost every transitive relation corresponds to a partially ordered set whose elements are organized into three stratified horizontal layers."
          }
        ]
      },
      {
        "heading": "Equivalence Classes, Partitions & Bell Numbers",
        "tag": "Partitions & Cosets",
        "intro": "Equivalence relations serve as generalized sameness detectors, grouping elements that share a common trait and dividing the universe into neat, non-overlapping compartments.",
        "subsections": [
          {
            "title": "The Equivalence Relation Concept",
            "badge": "Definition",
            "content": "An equivalence relation is any relation that is simultaneously reflexive, symmetric, and transitive. Common examples include sharing the same remainder when divided by a number, having the same major in college, or sharing the same birth year."
          },
          {
            "title": "The Equivalence Class $[a]$",
            "badge": "Core Concept",
            "content": "The equivalence class of an element $a$, denoted $[a]$, consists of the entire collection of elements that are related to $a$. Formally, $[a] = \\{x \\in A \\mid (x, a) \\in R\\}$.\n\nEvery element inside the class acts as an ambassador or representative for the entire group. Knowing one member allows you to identify all other members sharing the same property."
          },
          {
            "title": "The Three Foundational Class Invariants",
            "badge": "Key Invariants",
            "content": "Equivalence classes satisfy three rigid geometric invariants. First, every element belongs to its own equivalence class ($a \\in [a]$) due to reflexivity, ensuring that no class is ever empty.\n\nSecond, two elements share the exact same equivalence class ($[a] = [b]$) if and only if they are related to each other. Third, any two equivalence classes are either completely identical or completely disjoint ($[a] \\cap [b] = \\emptyset$). Equivalence classes never partially overlap."
          },
          {
            "title": "Partitions and the Quotient Set ($A / R$)",
            "badge": "Geometric Model",
            "content": "Because equivalence classes are mutually disjoint and their union covers the entire universe, they partition the set into distinct blocks, much like slicing a pizza into non-overlapping slices.\n\nThe set containing all of these individual equivalence classes as elements is called the quotient set, written $A / R$."
          },
          {
            "title": "Counting Equivalence Relations (Bell Numbers $B_n$)",
            "badge": "Counting Formula",
            "content": "There is a one-to-one correspondence between equivalence relations on a set and valid partitions of that set. The total count of distinct equivalence relations on an $n$-element set is given by the Bell number, denoted $B_n$.\n\nBell numbers are calculated by summing the Stirling numbers of the second kind, $S(n, k)$, which count partitions into exactly $k$ non-empty parts: $B_n = \\sum_{k=1}^n S(n, k)$. For sets of sizes $1, 2, 3, 4,$ and $5$, the Bell numbers evaluate to $1, 2, 5, 15,$ and $52$ respectively."
          }
        ]
      },
      {
        "heading": "Functions: Injections, Surjections, Bijections & Composition",
        "tag": "Mappings & Transformations",
        "intro": "A function is a specialized type of relation where every input possesses a well-defined, unambiguous output. Functions form the primary vocabulary of mapping, computation, and transformation.",
        "subsections": [
          {
            "title": "The Formal Anatomy of a Function",
            "badge": "Definition",
            "content": "A function $f: A \\to B$ from domain $A$ to codomain $B$ assigns to every element $a \\in A$ exactly one corresponding element $b \\in B$, written $f(a) = b$.\n\nTwo conditions are essential: totality (no input in $A$ is left without an assignment) and well-definedness (no input in $A$ points to multiple outputs simultaneously)."
          },
          {
            "title": "Total versus Partial Functions",
            "badge": "Classification",
            "content": "A total function is defined for every element in the domain, yielding a total count of $|B|^{|A|} = n^m$ possible functions when $|A| = m$ and $|B| = n$.\n\nIn contrast, a partial function may be undefined for certain inputs. In Computer Science (CS), partial functions model algorithms that may run into infinite loops or divide by zero. Since every input has $n + 1$ choices (any of the $n$ codomain targets, or remaining undefined), the total number of partial functions is $(n + 1)^m$."
          },
          {
            "title": "Injective Functions (One-to-One / Injections)",
            "badge": "Function Type 1",
            "content": "An injective function maps distinct inputs to distinct outputs: if $f(a_1) = f(a_2)$, then $a_1$ must equal $a_2$. Injections preserve uniqueness and produce zero collisions.\n\nAn injection requires the codomain to have at least as many elements as the domain ($m \\le n$). By the Pigeonhole Principle (PHP), if $m > n$, collisions are unavoidable and zero injections exist. When $m \\le n$, the total number of injective functions is given by the permutation formula $P(n, m) = \\frac{n!}{(n - m)!}$."
          },
          {
            "title": "Surjective Functions (Onto / Surjections)",
            "badge": "Function Type 2",
            "content": "A surjective function guarantees that every target in codomain $B$ is reached by at least one arrow from domain $A$. In other words, the range of the function is equal to the entire codomain ($f(A) = B$).\n\nA surjection requires the domain to be at least as large as the codomain ($m \\ge n$). The total number of surjective functions is calculated using Stirling numbers of the second kind as $n! \\cdot S(m, n)$, which expands via the Principle of Inclusion-Exclusion (PIE) to $\\sum_{k=0}^n (-1)^k \\binom{n}{k} (n - k)^m$."
          },
          {
            "title": "Bijective Functions (One-to-One Correspondence)",
            "badge": "Function Type 3",
            "content": "A function is bijective if it is simultaneously injective and surjective. Every element in the domain matches with exactly one unique element in the codomain, and no element is left unmatched.\n\nA bijection requires both sets to have identical cardinality ($|A| = |B| = n$). The total number of bijections on an $n$-element set is $n!$."
          },
          {
            "title": "The Bijective Invertibility Theorem",
            "badge": "Core Theorem",
            "content": "A total function $f: A \\to B$ possesses a two-sided inverse function $f^{-1}: B \\to A$ if and only if $f$ is strictly bijective.\n\nIf the function were not injective, the inverse relation would assign multiple outputs to a single input, violating the function definition. If it were not surjective, the inverse would be undefined on untouched codomain elements."
          },
          {
            "title": "Function Composition and Directional Rules",
            "badge": "Algebraic Operation",
            "content": "The composite function $g \\circ f$ applies function $f$ first and then feeds the result into function $g$, evaluating as $(g \\circ f)(x) = g(f(x))$. Function composition is associative but generally non-commutative ($g \\circ f \\ne f \\circ g$).\n\nComposition satisfies directional preservation invariants: if the composite function $g \\circ f$ is injective, then the inner function $f$ is guaranteed to be injective. If the composite function $g \\circ f$ is surjective, then the outer function $g$ is guaranteed to be surjective."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Fundamental Theorem of Equivalence Relations & Partitions",
        "statement": "Let $R$ be an equivalence relation on set $A$. The set of equivalence classes $A / R$ cleanly partitions $A$ into buckets that:\n1. Are non-empty: $\\forall [a] \\in A/R, [a] \\ne \\emptyset$.\n2. Cover the whole set: The union of all classes equals $A$.\n3. Never partially overlap: For any two classes, either $[a] = [b]$ or $[a] \\cap [b] = \\emptyset$.\nConversely, every partition of $A$ creates a unique equivalence relation where $(a, b) \\in R \\iff a$ and $b$ share the same partition block.",
        "category": "Equivalence Relations",
        "proofSketch": "• **Step 1 (Non-empty & Cover)**: By reflexivity, $a \\in [a]$, so every element lives in its own class, ensuring no class is empty and their union is all of $A$.\n• **Step 2 (Disjointness)**: If two classes share an element $x \\in [a] \\cap [b]$, then $(x, a) \\in R$ and $(x, b) \\in R$. By symmetry and transitivity, $(a, b) \\in R$. Any item in $[a]$ must therefore also belong to $[b]$, meaning $[a] = [b]$. Classes are either identical or completely disjoint!"
      },
      {
        "name": "Counting Formulas for Relations on Set of Size n",
        "statement": "For a finite set $A$ with $n$ elements:\n• **Total Binary Relations**: $2^{n^2}$\n• **Reflexive Relations**: $2^{n(n-1)}$ (all $n$ diagonal self-loops are locked to $1$)\n• **Symmetric Relations**: $2^{n(n+1)/2}$ (choose diagonal and upper triangle independently)\n• **Antisymmetric Relations**: $2^n \\cdot 3^{n(n-1)/2}$ (each off-diagonal pair has 3 valid choices)\n• **Equivalence Relations**: Given by the Bell number $B_n = \\sum_{k=1}^n S(n, k)$ ($B_1=1, B_2=2, B_3=5, B_4=15, B_5=52$)\n• **Transitive Relations**: No closed form! $T(1)=2, T(2)=13, T(3)=171, T(4)=3994, T(5)=154303$.",
        "category": "Combinatorial Counting",
        "proofSketch": "• An $n \\times n$ grid has $n^2$ cells. Each cell can independently be $0$ or $1$, giving $2^{n^2}$ total relations.\n• For antisymmetric relations, each off-diagonal pair of cells $\\{(i,j), (j,i)\\}$ can be $(0,0)$, $(1,0)$, or $(0,1)$—only $(1,1)$ is forbidden. That gives 3 choices for each of the $n(n-1)/2$ pairs, times 2 choices for each of the $n$ diagonal cells.\n• For transitive relations with $n=2$: out of $2^4 = 16$ relations, only the 3 containing ${(1, 2), (2, 1)}$ without both $(1, 1)$ and $(2, 2)$ fail transitivity, leaving $16 - 3 = 13$."
      },
      {
        "name": "Function Counting & Invertibility Theorem",
        "statement": "Let $A$ and $B$ be finite sets with $|A| = m$ and $|B| = n$:\n• **Total Functions**: $n^m = |B|^{|A|}$\n• **Partial Functions**: $(n + 1)^m$\n• **Injections (One-to-One)**: $P(n, m) = \\frac{n!}{(n-m)!}$ if $m \\le n$, and $0$ if $m > n$\n• **Surjections (Onto)**: $n! \\cdot S(m, n)$ if $m \\ge n$, and $0$ if $m < n$\n• **Bijections**: $n!$ if $m = n$, and $0$ otherwise\n• **Invertibility**: A total function $f: A \\to B$ possesses a two-sided inverse $f^{-1}: B \\to A$ if and only if $f$ is bijective.",
        "category": "Function Theory",
        "proofSketch": "• **Total functions**: Each of the $m$ elements in $A$ has $n$ independent choices in $B$, yielding $n \\times n \\times \\dots \\times n = n^m$.\n• **Injections**: The first element has $n$ choices, second has $n-1$, up to $n - m + 1$, yielding $P(n, m)$. If $m > n$, by the Pigeonhole Principle two inputs must share an output, making injection impossible.\n• **Inverses**: If $f$ is bijective, each $b \\in B$ has a unique pre-image $a \\in A$, defining a valid total function $f^{-1}(b) = a$. If $f$ were not injective, $f^{-1}$ would assign multiple outputs to one input (violating function definition). If $f$ were not surjective, $f^{-1}$ would be undefined on some elements of $B$."
      },
      {
        "name": "Warshall’s Transitive Closure Algorithm",
        "statement": "Given an $n \\times n$ boolean adjacency grid $W$ for relation $R$, Warshall's algorithm calculates all indirect paths (the transitive closure $R^+$) in $O(n^3)$ operations by checking waypoints one by one: $W^{(k)}[i, j] = W^{(k-1)}[i, j] \\lor (W^{(k-1)}[i, k] \\land W^{(k-1)}[k, j])$.",
        "category": "Algorithmic Closure",
        "proofSketch": "• **Waypoint Logic**: At round $k$, we ask: \"Can we travel from $i$ to $j$ either directly, or by stopping at waypoint $k$?\"\n• **Induction**: If there is a path from $i$ to $k$ and a path from $k$ to $j$ using only earlier waypoints, we connect $i$ directly to $j$. After considering all $n$ waypoints, all reachable connections are found."
      }
    ],
    "pitfalls": [
      "**Antisymmetric is NOT \"Not Symmetric\"**: A relation can be both (like equality $\\{(1,1)\\}$), neither, or one without the other.",
      "**The Empty Relation Trap**: The empty set $\\emptyset$ on a non-empty set is vacuously symmetric, antisymmetric, and transitive, but is NOT reflexive because $(a, a)$ is missing.",
      "**Transitive Relations Have No Simple Closed Form**: Do not confuse transitive relations with reflexive ($2^{n(n-1)}$) or symmetric ($2^{n(n+1)/2}$). For $n = 2$, exactly 13 are transitive (out of 16).",
      "**Codomain versus Range / Image**: The codomain is the target set $B$. The range $f(A) \\subseteq B$ is the actual subset of outputs hit by $f$. A function is surjective if and only if its range equals its codomain.",
      "**Composition Direction Trap**: In $g \\circ f$, the function $f$ executes FIRST and $g$ executes SECOND: $(g \\circ f)(x) = g(f(x))$. If $g \\circ f$ is injective, only $f$ is guaranteed to be injective (not necessarily $g$).",
      "**Invertible Functions Require Bijective**: A function has an inverse if and only if it is strictly bijective (both one-to-one / injective and onto / surjective)."
    ]
  },
  "proofs": {
    "title": "Proof Techniques, Induction & Recursion",
    "summary": "**What is a Mathematical Proof? (Starting from Scratch)**\n• In science, an experiment provides strong evidence. But in Computer Science (CS) and mathematics, a **proof** is an airtight guarantee that a rule works for *infinite* cases with zero exceptions!\n• Instead of testing numbers one by one forever, we use deductive reasoning so that no doubt remains.",
    "intuition": [
      {
        "heading": "The 3 Main Proof Methods Explained Simply",
        "tag": "Proof Strategies",
        "intro": "A mathematical proof provides an airtight guarantee that holds across infinite cases without exception. Depending on the structure of the proposition, mathematicians rely on three primary deductive strategies.",
        "subsections": [
          {
            "title": "Direct Proof (Forward Deductive Reasoning)",
            "badge": "Method 1",
            "content": "A direct proof begins by assuming that the given hypotheses are completely True. Through a chain of established algebraic rules and logical deductions, you move step-by-step until reaching the conclusion.\n\nFor example, to prove that the sum of two even integers $a$ and $b$ is always even, write $a = 2k$ and $b = 2m$. Factoring out two yields $a + b = 2(k + m)$, which is an explicit multiple of two by definition."
          },
          {
            "title": "Contrapositive Proof (Indirect Implication)",
            "badge": "Method 2",
            "content": "The conditional statement \"If $P$, then $Q$\" is logically identical to its contrapositive \"If not $Q$, then not $P$\". When the conclusion $Q$ is difficult to analyze directly, negating it often provides much more useful algebraic information.\n\nFor instance, proving that \"If $n^2$ is even, then $n$ is even\" directly is difficult because taking square roots is algebraically ambiguous. By assuming the contrapositive—that $n$ is odd ($n = 2k + 1$)—we can easily square the expression to show $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, proving $n^2$ is odd."
          },
          {
            "title": "Proof by Contradiction (Reductio Ad Absurdum)",
            "badge": "Method 3",
            "content": "In a proof by contradiction, you assume that your target statement is completely False. You then follow rigorous logical deductions until you encounter an impossible contradiction, such as $1 = 0$ or an integer being both even and odd simultaneously.\n\nSince sound logic cannot produce impossible statements, the initial assumption of falsehood must have been wrong, leaving the target statement irrevocably True."
          }
        ]
      },
      {
        "heading": "Mathematical Induction: The Falling Domino Cascade",
        "tag": "Inductive Proofs",
        "intro": "Mathematical induction is an engine for proving that a property holds for an infinite sequence of natural numbers using only two finite steps.",
        "subsections": [
          {
            "title": "The Domino Mental Model",
            "badge": "Analogy",
            "content": "Picture an infinite row of upright dominoes labeled $1, 2, 3,$ and onward. If you knock down the first domino, and each domino is spaced close enough to knock down the next, the entire infinite line will fall automatically."
          },
          {
            "title": "Step 1: The Base Case ($P(n_0)$)",
            "badge": "Foundation",
            "content": "The base case verifies that the formula holds for the very first starting number, typically $n = 0$ or $n = 1$. This corresponds to physically pushing over the first domino in line."
          },
          {
            "title": "Step 2: The Inductive Hypothesis and Step",
            "badge": "Inductive Engine",
            "content": "You assume that the property holds for some arbitrary integer $k$, written $P(k)$. Using this assumption as leverage, you algebraically prove that the next statement $P(k + 1)$ must also be True.\n\nThis single algebraic bridge guarantees that the momentum transfers from domino $k$ to domino $k + 1$ without breaking the chain."
          },
          {
            "title": "The Universal Conclusion",
            "badge": "Guarantee",
            "content": "Having verified both the initial base push and the transfer mechanism, the Principle of Mathematical Induction (PMI) establishes that the formula holds for all natural numbers $n \\ge n_0$."
          }
        ]
      },
      {
        "heading": "Weak versus Strong Induction",
        "tag": "Induction Variants",
        "intro": "While both forms of induction are logically equivalent to the Well-Ordering Principle (WOP), they differ in how much historical information is available during the induction step.",
        "subsections": [
          {
            "title": "Weak Induction (Immediate Single-Step Dependency)",
            "badge": "Single Step",
            "content": "In weak induction, proving statement $k + 1$ relies solely on the truth of the single immediately preceding statement $P(k)$. It resembles a runner handing off a baton directly to the next runner."
          },
          {
            "title": "Strong Induction (Cumulative Multi-Step History)",
            "badge": "Cumulative History",
            "content": "In strong induction, proving statement $k + 1$ is allowed to utilize the combined truth of all previous cases: $P(1), P(2), \\dots, P(k)$.\n\nStrong induction is indispensable whenever a mathematical object decomposes into arbitrary smaller sub-pieces rather than shrinking by exactly one unit, such as factoring an integer into primes or dividing a polygon into triangles."
          },
          {
            "title": "Axiomatic Equivalence to the Well-Ordering Principle (WOP)",
            "badge": "Foundational Axiom",
            "content": "Every non-empty set of non-negative integers contains a unique smallest element. The Well-Ordering Principle (WOP), weak induction, and strong induction can each be derived from one another, forming the axiomatic bedrock of discrete mathematics."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Principle of Mathematical Induction (Weak)",
        "statement": "Let $P(n)$ be a statement about integer $n \\ge n_0$. If:\n1. **Base Case**: $P(n_0)$ is True.\n2. **Inductive Step**: Whenever $P(k)$ is True for $k \\ge n_0$, then $P(k+1)$ must also be True.\nThen $P(n)$ is True for every integer $n \\ge n_0$.",
        "category": "Induction Principle",
        "proofSketch": "• **Proof by Contradiction using Well-Ordering**: Suppose the theorem failed for some integers. Let $S$ be the set of failed integers.\n• By the Well-Ordering Principle (WOP), $S$ must have a smallest element, call it $m$.\n• Since $P(n_0)$ is True, $m > n_0$. Thus $m - 1$ is outside $S$, so $P(m-1)$ is True.\n• But by the Inductive Step, $P(m-1) \\implies P(m)$, which means $P(m)$ is True! This contradicts that $m$ was a failure."
      },
      {
        "name": "Well-Ordering Principle of the Natural Numbers (WOP)",
        "statement": "Every non-empty set of non-negative integers contains a unique smallest element: $\\exists m \\in S$ such that $\\forall s \\in S, m \\le s$.",
        "category": "Axiomatic Foundation",
        "proofSketch": "• The Well-Ordering Principle (WOP), the Principle of Mathematical Induction (PMI), and the Principle of Strong Mathematical Induction are all mathematically equivalent to one another."
      },
      {
        "name": "Homogeneous Recurrence Characteristic Theorem",
        "statement": "For a second-order linear recurrence $a_n = c_1 a_{n-1} + c_2 a_{n-2}$, we solve the characteristic quadratic equation $r^2 - c_1 r - c_2 = 0$:\n• **Distinct Roots ($r_1 \\ne r_2$)**: General solution is $a_n = A r_1^n + B r_2^n$.\n• **Repeated Root ($r_1 = r_2 = r$)**: General solution is $a_n = (A + B n) r^n$.\nConstants $A$ and $B$ are calculated using the starting values $a_0$ and $a_1$.",
        "category": "Recurrence Relations",
        "proofSketch": "• We test the exponential guess $a_n = r^n$. Dividing by $r^{n-2}$ yields the quadratic equation $r^2 - c_1 r - c_2 = 0$.\n• Because the recurrence is linear, any sum of solutions is also a solution. The two initial conditions give two linear equations that uniquely fix constants $A$ and $B$."
      }
    ],
    "pitfalls": [
      "**Negating Implications in Contradiction**: The negation of \"If $P$, then $Q$\" is \"$P$ and NOT $Q$\" ($P \\land \\neg Q$). Do not write \"If not $P$, then not $Q$\".",
      "**The Horse Color Fallacy**: In the famous fallacy \"all horses are the same color\", the step from $k = 1$ to $k = 2$ fails because two single-horse groups do not share an overlap.",
      "**Strong Induction Base Cases**: If your recurrence formula looks back $2$ steps, you must physically verify $2$ initial base cases ($a_0$ and $a_1$), not just $1$."
    ]
  },
  "logic": {
    "title": "Propositional Logic & Truth Tables",
    "summary": "**What is Propositional Logic? (Starting from Scratch)**\n• A **proposition** is any declarative statement that is either strictly **True (T)** or strictly **False (F)**, never both, and never an opinion.\n• Examples: \"7 is a prime number\" (True). \"Computers run on steam\" (False).\n• We combine simple propositions using logical connectives to build circuits, write software conditions, and verify system safety.",
    "intuition": [
      {
        "heading": "The 5 Core Connectives Explained",
        "tag": "Logical Operators",
        "intro": "Propositional logic builds complex truth conditions out of simple declarative statements using five fundamental connectives.",
        "subsections": [
          {
            "title": "Negation ($\\neg p$, NOT)",
            "badge": "Connective 1",
            "content": "Negation inverts the truth value of a proposition. If proposition $p$ is True, then its negation $\\neg p$ is False. If $p$ is False, then $\\neg p$ is True."
          },
          {
            "title": "Conjunction ($p \\land q$, AND)",
            "badge": "Connective 2",
            "content": "A conjunction is True if and only if both statements $p$ and $q$ are simultaneously True. If either component is False, the entire conjunction evaluates to False."
          },
          {
            "title": "Disjunction ($p \\lor q$, Inclusive OR)",
            "badge": "Connective 3",
            "content": "A disjunction is True whenever at least one of the component propositions is True. It is False in only one circumstance: when both $p$ and $q$ are False together."
          },
          {
            "title": "Exclusive-OR ($p \\oplus q$, XOR)",
            "badge": "Connective 4",
            "content": "An Exclusive-OR evaluates to True when exactly one of the inputs is True, but evaluates to False when both inputs share the same truth value."
          },
          {
            "title": "Conditional Implication ($p \\to q$, IF-THEN)",
            "badge": "Connective 5",
            "content": "A conditional statement acts as a formal contract or promise. It is broken in exactly one scenario: when the hypothesis $p$ is True, but the promised conclusion $q$ fails to occur."
          }
        ]
      },
      {
        "heading": "The Secret of Vacuous Truth in Implications",
        "tag": "Conditional Logic",
        "intro": "A frequent point of confusion in logic is why a conditional statement $p \\to q$ is considered True whenever hypothesis $p$ is False.",
        "subsections": [
          {
            "title": "The Contract Analogy",
            "badge": "Mental Model",
            "content": "Imagine a professor promises: \"If you score 100 on the final exam, you will receive an A in the course.\"\n\nWhat happens if a student scores 85? The professor did not break their promise, because the triggering condition was never met. The professor cannot be accused of lying."
          },
          {
            "title": "The Principle of Vacuous Truth",
            "badge": "Formal Principle",
            "content": "Whenever the premise $p$ is False, the conditional statement $p \\to q$ is designated as vacuously True by default. This convention ensures that logical rules remain completely consistent across all mathematical deductions without requiring unnecessary special cases."
          }
        ]
      },
      {
        "heading": "Tautology, Contradiction & Contingency",
        "tag": "Proposition Classes",
        "intro": "Propositions are classified into three distinct categories according to whether their truth depends on circumstance or holds universally.",
        "subsections": [
          {
            "title": "Tautologies (Universally True)",
            "badge": "Category 1",
            "content": "A tautology is a compound proposition that evaluates to True under every possible assignment of truth values to its variables. A classic example is the law of excluded middle, $p \\lor \\neg p$, which asserts that an event must either occur or not occur."
          },
          {
            "title": "Contradictions (Universally False)",
            "badge": "Category 2",
            "content": "A contradiction is a compound proposition that evaluates to False under every possible universe. The statement $p \\land \\neg p$ is a contradiction because a claim cannot be both True and False at the same time."
          },
          {
            "title": "Contingencies (Context-Dependent)",
            "badge": "Category 3",
            "content": "A contingency is a proposition that is True under some variable assignments and False under others. Most statements in everyday software engineering and natural language are contingencies."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "De Morgan’s Laws for Logic",
        "statement": "Negating combinations flips the connective:\n1. $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$ (\"Not both\" means at least one is false)\n2. $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$ (\"Neither\" means both are false)",
        "category": "Propositional Equivalence",
        "proofSketch": "• We verify both sides under all 4 combinations of True and False for $p$ and $q$.\n• For $\\neg(p \\land q)$, the only time $p \\land q$ is True is when both are True. Its negation is therefore True in the other 3 cases, which matches $\\neg p \\lor \\neg q$ row for row."
      },
      {
        "name": "Equivalence of Implication",
        "statement": "A conditional implication can be rewritten without the arrow:\n$p \\to q \\equiv \\neg p \\lor q \\equiv \\neg q \\to \\neg p$ (the Contrapositive).",
        "category": "Conditional Equivalence",
        "proofSketch": "• $p \\to q$ is False only when $p = \\text{True}$ and $q = \\text{False}$.\n• Similarly, $\\neg p \\lor q$ is False only when $\\neg p = \\text{False}$ (meaning $p = \\text{True}$) and $q = \\text{False}$. Their truth tables are 100% identical."
      },
      {
        "name": "Soundness of Modus Ponens & Modus Tollens",
        "statement": "Two gold-standard rules of logical deduction:\n• **Modus Ponens (Affirming the Antecedent)**: $((p \\to q) \\land p) \\implies q$.\n• **Modus Tollens (Denying the Consequent)**: $((p \\to q) \\land \\neg q) \\implies \\neg p$.",
        "category": "Inference Rule",
        "proofSketch": "• **Modus Ponens**: If $p$ is True, and the rule $p \\to q$ holds, $q$ cannot be False without breaking the rule. So $q$ must be True.\n• **Modus Tollens**: If $q$ is False, but $p \\to q$ holds, $p$ could not have been True, because a True premise would have forced $q$ to be True. Thus $p$ must be False."
      }
    ],
    "pitfalls": [
      "**Fallacy of Affirming the Consequent**: Knowing $p \\to q$ and $q$ does NOT mean $p$ is true! (If it rains, roads are wet. Roads are wet, but that could be from a street cleaner, not rain).",
      "**Fallacy of Denying the Antecedent**: Knowing $p \\to q$ and $\\neg p$ does NOT mean $\\neg q$ is true! (If you are in Rome, you are in Italy. You are not in Rome, but you could be in Milan).",
      "**Vacuous Truth Surprise**: The statement \"If $2 + 2 = 5$, then pigs can fly\" is 100% mathematically True because the premise is False."
    ]
  },
  "posets": {
    "title": "Partial Orders, Lattices & Boolean Algebras",
    "summary": "**What is a Partial Order? (Starting from Scratch)**\n• In standard numbers, any two numbers can be compared: either $3 \\le 5$ or $5 \\le 3$. This is a **Total Order**.\n• But in everyday life, some things cannot be directly ranked (for example, is rock music \"greater than\" jazz? Does $4$ divide $6$?).\n• A **Partially Ordered Set (Poset)** is a mathematical system that allows some items to be incomparable, while keeping three natural ordering rules: Reflexive, Antisymmetric, and Transitive.",
    "intuition": [
      {
        "heading": "Why \"Partial\" Order? (Incomparable Elements)",
        "tag": "Poset Foundations",
        "intro": "In standard arithmetic, any two real numbers can be compared: either $a \\le b$ or $b \\le a$. In real life and computer science, many structures contain items that cannot be ranked against each other.",
        "subsections": [
          {
            "title": "Total Orders versus Partial Orders",
            "badge": "Distinction",
            "content": "A total order ranks every single pair of elements in the domain without exception. In contrast, a partially ordered set (poset) satisfies reflexivity, antisymmetry, and transitivity, but relaxes the requirement that every pair must be comparable."
          },
          {
            "title": "Incomparable Elements ($a \\parallel b$)",
            "badge": "Poset Feature",
            "content": "When neither $a \\le b$ nor $b \\le a$ holds, the elements are termed incomparable, written $a \\parallel b$.\n\nIn a software dependency graph, two independent libraries can both be required to build a project, yet neither library depends on the other. They are incomparable tasks that can be compiled in parallel."
          },
          {
            "title": "The Divisibility Poset Example",
            "badge": "Concrete Example",
            "content": "Consider the positive integers ordered by divisibility ($a \\mid b$). In this poset, $2$ divides $6$ and $3$ divides $6$, establishing ordering. However, $2$ does not divide $3$, and $3$ does not divide $2$. Thus, $2$ and $3$ are completely incomparable."
          }
        ]
      },
      {
        "heading": "Hasse Diagrams: Minimalist Visual Maps",
        "tag": "Visual Posets",
        "intro": "Drawing every arrow in a partially ordered set results in an overwhelming tangle of lines. A Hasse diagram applies three reduction rules to produce an uncluttered visual representation.",
        "subsections": [
          {
            "title": "Rule 1: Eliminating Reflexive Loops",
            "badge": "Reduction 1",
            "content": "Since every element is reflexive and relates to itself by definition, self-loops are omitted from the diagram."
          },
          {
            "title": "Rule 2: Eliminating Transitive Redundancies",
            "badge": "Reduction 2",
            "content": "If $a < b$ and $b < c$, transitivity already guarantees that $a < c$. Drawing an explicit edge from $a$ to $c$ would be redundant, so all indirect transitive shortcuts are stripped away."
          },
          {
            "title": "Rule 3: Upward Orientation and Cover Relations",
            "badge": "Reduction 3",
            "content": "If $a < b$, element $b$ is drawn physically higher on the page than $a$. A line segment is drawn between them if and only if $b$ immediately covers $a$ with no intermediate elements between them."
          }
        ]
      },
      {
        "heading": "Lattices and Boolean Algebras",
        "tag": "Algebraic Lattices",
        "intro": "Special partially ordered sets exhibit algebraic properties that turn ordering into formal computation.",
        "subsections": [
          {
            "title": "Lattices (Unique Meet and Join)",
            "badge": "Algebraic Structure",
            "content": "A lattice is a poset in which every two elements $a$ and $b$ possess both a unique Greatest Lower Bound (GLB, called Meet, denoted $a \\land b$) and a unique Least Upper Bound (LUB, called Join, denoted $a \\lor b$).\n\nIn the divisibility poset, Meet corresponds to the Greatest Common Divisor ($\\gcd$), while Join corresponds to the Least Common Multiple ($\\text{lcm}$)."
          },
          {
            "title": "Distributive Lattices",
            "badge": "Linearity Property",
            "content": "A lattice is distributive when its Meet and Join operations distribute over each other, mirroring how multiplication distributes over addition in elementary algebra: $a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c)$."
          },
          {
            "title": "Boolean Algebras (Distributive & Complemented)",
            "badge": "Digital Logic Foundation",
            "content": "A Boolean algebra is a bounded distributive lattice where every element $a$ possesses a unique complement $a'$ such that $a \\lor a' = 1$ and $a \\land a' = 0$.\n\nEvery finite Boolean algebra is structurally identical to the power set of its atomic elements, meaning its total cardinality is always an exact power of two ($2^k$)."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Birkhoff’s Characterization of Distributive Lattices",
        "statement": "A lattice is distributive if and only if it does NOT contain the pentagon lattice ($N_5$) or the diamond lattice ($M_3$) as a forbidden sub-structure.",
        "category": "Lattice Theory",
        "proofSketch": "• In both $N_5$ and $M_3$, you can pick 3 elements where the distributive rule $a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c)$ fails.\n• Birkhoff proved that these two small shapes are the *only* minimal ways distributivity can break."
      },
      {
        "name": "Uniqueness of Complements in Distributive Lattices",
        "statement": "In a bounded distributive lattice, if an element $a$ has a complement $a'$, that complement is strictly unique.",
        "category": "Boolean Algebra",
        "proofSketch": "• Suppose $a$ had two complements, $b$ and $c$. Then $a \\land b = 0$, $a \\lor b = 1$, $a \\land c = 0$, and $a \\lor c = 1$.\n• By distributivity: $b = b \\land 1 = b \\land (a \\lor c) = (b \\land a) \\lor (b \\land c) = 0 \\lor (b \\land c) = (a \\land c) \\lor (b \\land c) = (a \\lor b) \\land c = 1 \\land c = c$. Thus $b = c$!"
      },
      {
        "name": "Structure Theorem for Finite Boolean Algebras",
        "statement": "Every finite Boolean algebra $B$ is structurally identical (isomorphic) to the power set Boolean algebra $(\\mathcal{P}(A), \\subseteq)$ of its atoms. Consequently, its total size is always a power of two: $|B| = 2^{|A|}$.",
        "category": "Algebraic Structure",
        "proofSketch": "• An atom is an element directly sitting right above the bottom element $0$.\n• Every element in the Boolean algebra can be written uniquely as a combination (Join) of the atoms beneath it, exactly like a subset of atoms."
      }
    ],
    "pitfalls": [
      "**Maximal versus Greatest**: A poset can have several \"maximal\" elements (nobody is above them), but at most ONE \"greatest\" element (which must be above EVERYONE).",
      "**Divisibility Poset Boolean Trap**: The divisibility poset $D_n$ is a Boolean algebra if and only if $n$ has no repeated prime factors (square-free). $D_{12}$ is NOT a Boolean algebra because $12 = 2^2 \\times 3$.",
      "**Sublattice Requirement**: A subset that forms a lattice on its own might fail to be a true sublattice if its Meet or Join operations do not match the parent lattice."
    ]
  },
  "modular": {
    "title": "Modular Arithmetic & Number Theory",
    "summary": "**What is Modular Arithmetic? (Starting from Scratch)**\n• Modular arithmetic is simply **clock arithmetic**.\n• On a standard 12-hour wall clock, if it is 9:00 now, what time will it be in 5 hours? $9 + 5 = 14$, but the clock wraps around and shows $2:00$!\n• In mathematics, we say $14$ is congruent to $2$ modulo $12$, written $14 \\equiv 2 \\pmod{12}$.\n• The modulus $m$ acts like the clock size: all numbers wrap around into the remainder range $\\{0, 1, \\dots, m-1\\}$.",
    "intuition": [
      {
        "heading": "Why Congruence Classes Work Like Regular Numbers",
        "tag": "Clock Arithmetic",
        "intro": "Modular arithmetic investigates numbers that wrap around after reaching a fixed threshold called the modulus, functioning like a cyclic clock.",
        "subsections": [
          {
            "title": "The Clock Arithmetic Mental Model",
            "badge": "Everyday Analogy",
            "content": "On a standard twelve-hour wall clock, advancing five hours past nine o'clock does not produce fourteen o'clock; instead, the hand wraps around to show two o'clock. We express this in mathematics by writing $14 \\equiv 2 \\pmod{12}$."
          },
          {
            "title": "Formal Congruence Definition ($a \\equiv b \\pmod m$)",
            "badge": "Formal Definition",
            "content": "Two integers $a$ and $b$ are congruent modulo $m$ if and only if their difference $a - b$ is an exact multiple of the modulus $m$. Equivalently, $a$ and $b$ leave identical remainders when divided by $m$."
          },
          {
            "title": "Arithmetic Compatibility",
            "badge": "Algebraic Property",
            "content": "Congruence preserves addition, subtraction, and multiplication. You can reduce intermediate terms modulo $m$ at any step during a large computation without altering the final remainder. Modulo $7$, adding $5 + 4 = 9 \\equiv 2 \\pmod 7$ and multiplying $5 \\times 4 = 20 \\equiv 6 \\pmod 7$ are completely valid."
          }
        ]
      },
      {
        "heading": "Why Modular Division Requires Coprime Inverses",
        "tag": "Modular Inverses",
        "intro": "In ordinary arithmetic, division is accomplished by multiplying by a fraction. In discrete modular arithmetic, fractions do not exist, so division requires modular multiplicative inverses.",
        "subsections": [
          {
            "title": "The Modular Multiplicative Inverse ($a^{-1}$)",
            "badge": "Core Concept",
            "content": "To divide by an integer $a$ modulo $m$, we find an integer $x$ satisfying $a \\cdot x \\equiv 1 \\pmod m$. This value $x$ is called the modular multiplicative inverse of $a$.\n\nOnce $x$ is found, dividing by $a$ is performed simply by multiplying by $x$."
          },
          {
            "title": "The Coprime Condition ($\\gcd(a, m) = 1$)",
            "badge": "Existence Criterion",
            "content": "A modular inverse exists if and only if the number $a$ and modulus $m$ share no common factors other than one, meaning they are coprime ($\\gcd(a, m) = 1$).\n\nIf $\\gcd(a, m) = d > 1$, every multiple of $a$ modulo $m$ must be a multiple of $d$, making it mathematically impossible to ever land on the remainder one."
          }
        ]
      },
      {
        "heading": "The Extended Euclidean Algorithm: Running Division in Reverse",
        "tag": "Euclidean Algorithm",
        "intro": "The Euclidean algorithm efficiently computes the Greatest Common Divisor ($\\gcd$) of two numbers, while its extended variant tracks the division steps backward to construct modular inverses.",
        "subsections": [
          {
            "title": "Bézout’s Identity",
            "badge": "Linear Combination",
            "content": "For any two integers $a$ and $b$, their Greatest Common Divisor can always be expressed as an integer linear combination: $\\gcd(a, b) = s \\cdot a + t \\cdot b$ for some integers $s$ and $t$."
          },
          {
            "title": "Extracting Modular Inverses",
            "badge": "Inverse Extraction",
            "content": "When $a$ and $m$ are coprime, Bézout's identity produces $s \\cdot a + t \\cdot m = 1$. Taking this equation modulo $m$ causes the term $t \\cdot m$ to vanish, leaving $s \\cdot a \\equiv 1 \\pmod m$.\n\nThe integer coefficient $s$ obtained by running the Euclidean divisions backward is the exact modular inverse of $a$."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Bézout’s Identity",
        "statement": "For any integers $a$ and $b$ (not both zero), their Greatest Common Divisor ($\\gcd(a, b)$) can always be written as an integer combination: $\\gcd(a, b) = s \\cdot a + t \\cdot b$ for some integers $s$ and $t$.",
        "category": "Linear Diophantine Equations",
        "proofSketch": "• Consider the set of all positive combinations $S = \\{x \\cdot a + y \\cdot b > 0\\}$.\n• By the Well-Ordering Principle (WOP), $S$ has a smallest positive value, call it $d = s \\cdot a + t \\cdot b$.\n• Using the division algorithm, any other combination leaves a remainder smaller than $d$, which must be $0$. Both $a$ and $b$ are in $S$, so $d$ divides both, proving $d = \\gcd(a, b)$."
      },
      {
        "name": "Euler’s Totient Theorem & Fermat’s Little Theorem",
        "statement": "• **Euler’s Totient Function $\\phi(n)$**: Counts how many numbers from $1$ to $n$ share no common factors with $n$ (coprime).\n• **Euler’s Theorem**: If $\\gcd(a, n) = 1$, then $a^{\\phi(n)} \\equiv 1 \\pmod n$.\n• **Fermat’s Little Theorem (Special Case)**: When the modulus is a prime number $p$, then $\\phi(p) = p - 1$, so $a^{p-1} \\equiv 1 \\pmod p$ for any $a$ not divisible by $p$.",
        "category": "Modular Exponentiation",
        "proofSketch": "• Take all numbers coprime to $n$ and multiply each by $a$. Modulo $n$, this simply reshuffles the same list of numbers.\n• Multiplying the whole list together: $a^{\\phi(n)} \\cdot (\\text{product}) \\equiv (\\text{product}) \\pmod n$. Since the product is coprime to $n$, we cancel it to get $a^{\\phi(n)} \\equiv 1 \\pmod n$."
      },
      {
        "name": "Chinese Remainder Theorem (CRT)",
        "statement": "Suppose you have a system of congruences $x \\equiv a_1 \\pmod{m_1}, x \\equiv a_2 \\pmod{m_2}, \\dots$ where the moduli $m_i$ are pairwise coprime (no two share common factors). There is always a unique solution modulo the total product $M = m_1 \\cdot m_2 \\dots m_k$.",
        "category": "System of Congruences",
        "proofSketch": "• For each equation, we construct a term that equals $a_i$ modulo $m_i$, but equals $0$ modulo all other $m_j$.\n• Summing these terms produces an answer that satisfies all equations simultaneously. Any two solutions differ by a multiple of the total product $M$."
      }
    ],
    "pitfalls": [
      "**Dividing Across Congruences**: In normal math, if $2x = 2y$, then $x = y$. In clock math, $2x \\equiv 2y \\pmod 6$ does NOT mean $x \\equiv y \\pmod 6$! You can only cancel numbers if their $\\gcd$ with the modulus is $1$.",
      "**Negative Modular Inverses**: If the Extended Euclidean algorithm gives $s = -3$ modulo $11$, you must add $11$ to convert it to the positive range: $-3 + 11 = 8$.",
      "**Pairwise Coprime Requirement for CRT**: The Chinese Remainder Theorem requires that every pair of moduli share no common factors ($\\gcd(m_i, m_j) = 1$)."
    ]
  },
  "groups": {
    "title": "Basic Algebraic Structures",
    "summary": "**What is an Algebraic Structure? (Starting from Scratch)**\n• Think of a game with two things: (1) A set of pieces, and (2) A rule for combining two pieces into another piece (called an operation $*$).\n• Depending on how well-behaved the operation is, mathematicians classify systems into a ladder of structures:\n  • **Groupoid**: Closure only (results stay in the set).\n  • **Semigroup**: Closure + Associativity (grouping does not change the result: $(a * b) * c = a * (b * c)$).\n  • **Monoid**: Semigroup + Identity element (a \"do nothing\" element like 0 for addition, or 1 for multiplication).\n  • **Group**: Monoid + Inverses (every single move can be undone!).\n  • **Abelian Group**: Group + Commutativity (order does not matter: $a * b = b * a$).",
    "intuition": [
      {
        "heading": "The 4 Golden Rules of a Group Explained Simply",
        "tag": "Group Axioms",
        "intro": "An abstract group is a mathematical system consisting of a set and a binary operation that governs transformations, symmetries, and reversible actions.",
        "subsections": [
          {
            "title": "Axiom 1: Closure (Preservation Within the Set)",
            "badge": "Axiom 1",
            "content": "Combining any two elements in the set using the group operation must produce a result that remains strictly within the same set. The operation never escapes its universe: for all $a, b \\in G$, the product $a * b \\in G$."
          },
          {
            "title": "Axiom 2: Associativity (Grouping Invariance)",
            "badge": "Axiom 2",
            "content": "When combining three elements in sequence, grouping them with parentheses does not affect the final outcome: $(a * b) * c = a * (b * c)$. You can safely evaluate multi-step chains without ambiguity."
          },
          {
            "title": "Axiom 3: Identity Element (The Neutral Transformation)",
            "badge": "Axiom 3",
            "content": "The set must contain a unique neutral element, denoted $e$, that leaves any element unchanged when combined: $a * e = e * a = a$. For ordinary addition, zero is the identity; for multiplication, one is the identity."
          },
          {
            "title": "Axiom 4: Inverse Element (The Reversible Operation)",
            "badge": "Axiom 4",
            "content": "Every element $a$ must possess an inverse partner, denoted $a^{-1}$, that cancels its effect and returns the system directly to the neutral identity: $a * a^{-1} = a^{-1} * a = e$. In a group, every transformation can be completely undone."
          },
          {
            "title": "The Abelian Group Extension (Commutativity)",
            "badge": "Commutative Extension",
            "content": "If the operation also allows elements to swap positions without altering the result ($a * b = b * a$), the group is designated as an Abelian group."
          }
        ]
      },
      {
        "heading": "Cayley Tables and The Sudoku Rule",
        "tag": "Group Multiplications",
        "intro": "A Cayley table presents the entire multiplication matrix for a finite algebraic group, laying out all possible combinations in a grid.",
        "subsections": [
          {
            "title": "The Latin Square Principle",
            "badge": "Sudoku Invariant",
            "content": "In every valid group Cayley table, every element in the group appears exactly once in each row and exactly once in each column. This property mirrors the placement rule in Sudoku puzzles."
          },
          {
            "title": "Cancellation Law Justification",
            "badge": "Proof Intuition",
            "content": "If an element were to appear twice in the same row $g$, we would have $g * a = g * b$ for distinct elements $a$ and $b$. Multiplying both sides by the group inverse $g^{-1}$ cancels $g$, forcing $a = b$.\n\nBecause distinct elements cannot be equal, duplicate entries in a row or column are strictly impossible."
          }
        ]
      },
      {
        "heading": "Lagrange’s Theorem: The Subgroup Size Rule",
        "tag": "Subgroup Constraints",
        "intro": "Lagrange's theorem is the central structural constraint of finite group theory, dictating what subgroup sizes are mathematically permitted.",
        "subsections": [
          {
            "title": "What is a Subgroup ($H \\le G$)?",
            "badge": "Definition",
            "content": "A subgroup $H$ is a subset of a group $G$ that forms a complete, self-contained group in its own right under the exact same operation."
          },
          {
            "title": "The Divisibility Invariant ($|H|$ divides $|G|$)",
            "badge": "Theorem Statement",
            "content": "Lagrange's theorem proves that the size of any subgroup must divide the total size of the parent group with zero remainder: $|G| = [G : H] \\cdot |H|$.\n\nThis follows because the group can be partitioned into equal-sized chunks called cosets, each containing exactly $|H|$ elements."
          },
          {
            "title": "Consequences for Prime-Order Groups",
            "badge": "Immediate Consequence",
            "content": "If a group has a prime number of elements, its only possible divisors are one and the prime size itself. Consequently, prime-sized groups have zero non-trivial subgroups and are strictly cyclic."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Lagrange’s Subgroup Theorem",
        "statement": "If $H$ is a subgroup of a finite group $G$, then the order (size) of $H$ divides the order of $G$: $|G| = [G : H] \\cdot |H|$, where $[G : H]$ is the number of distinct left cosets.",
        "category": "Cosets & Subgroups",
        "proofSketch": "• We group elements into chunks called left cosets: $gH = \\{g * h \\mid h \\in H\\}$.\n• Every coset has the exact same number of elements as $H$, and any two cosets are either identical or completely disjoint.\n• Since these equal-sized cosets partition the whole group $G$, the size $|G|$ must equal the number of cosets multiplied by $|H|$."
      },
      {
        "name": "Classification of Groups of Prime Order",
        "statement": "Every group $G$ whose size is a prime number $p$ is strictly cyclic and isomorphic to $(\\mathbb{Z}_p, +_p)$. Any non-identity element generates the entire group.",
        "category": "Cyclic Groups",
        "proofSketch": "• Pick any element $g \\ne e$. The subgroup generated by $g$, $\\langle g \\rangle = \\{e, g, g^2, \\dots\\}$, has some size $k > 1$.\n• By Lagrange’s theorem, $k$ must divide the prime size $p$. The only divisors of prime $p$ are $1$ and $p$.\n• Since $k > 1$, $k$ must equal $p$. Thus $\\langle g \\rangle$ is the entire group $G$!"
      },
      {
        "name": "Cayley’s Representation Theorem",
        "statement": "Every group $G$ is isomorphic to a subgroup of the symmetric group $\\operatorname{Sym}(G)$ of permutations on its own elements.",
        "category": "Permutation Groups",
        "proofSketch": "• Every element $g \\in G$ acts by shuffling the group elements: $\\lambda_g(x) = g * x$.\n• This shuffle is a one-to-one permutation. The map assigning each element $g$ to its permutation $\\lambda_g$ preserves group multiplication, proving every abstract group is simply a group of permutations."
      }
    ],
    "pitfalls": [
      "**Converse of Lagrange is FALSE**: Just because a number $d$ divides $|G|$, that does NOT guarantee a subgroup of size $d$ exists! (The alternating group $A_4$ has size $12$, and $6$ divides $12$, but $A_4$ has NO subgroup of size $6$).",
      "**The Latin Square Trap**: The Sudoku property (every item appears once per row/column) is necessary for a group, but NOT sufficient—it might still fail the associativity rule!",
      "**Multiplication Modulo n is NOT always a Group**: $(\\mathbb{Z}_n, \\times)$ is never a group because $0$ has no inverse. Only the units coprime to $n$, $(\\mathbb{Z}_n^\\times, \\times)$, form a group."
    ]
  },
  "combinatorics": {
    "title": "Combinatorics & Counting Principles",
    "summary": "**What is Combinatorics? (Starting from Scratch)**\n• Combinatorics is the mathematical science of **counting without actually counting**.\n• If a password has 8 letters, you do not want to write down all 200 billion possibilities one by one!\n• Instead, we use systematic algebraic rules (Permutations, Combinations, Stars & Bars, and Inclusion-Exclusion) to calculate the exact number instantly.",
    "intuition": [
      {
        "heading": "Permutations versus Combinations (Does Order Matter?)",
        "tag": "Selection Principles",
        "intro": "Systematic counting relies on distinguishing whether the sequence of selected items carries unique meaning or can be disregarded.",
        "subsections": [
          {
            "title": "Permutations (Order Matters)",
            "badge": "Ordered Sequences",
            "content": "In a permutation, the specific arrangement of elements is consequential. Examples include awarding gold, silver, and bronze medals in a race, dialing a four-digit bank PIN passcode, or queueing passengers.\n\nThe number of ways to arrange $r$ elements selected from $n$ distinct candidates is given by $P(n, r) = \\frac{n!}{(n - r)!}$."
          },
          {
            "title": "Combinations (Order Does Not Matter)",
            "badge": "Unordered Subsets",
            "content": "In a combination, only the membership of the chosen collection matters, regardless of which element was selected first. Examples include selecting toppings on a pizza or picking a five-person study group.\n\nThe number of combinations is obtained by dividing the permutation count by $r!$ to cancel out internal rearrangements: $\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$."
          }
        ]
      },
      {
        "heading": "Stars & Bars: Distributing Identical Items into Distinct Bins",
        "tag": "Partitioning Items",
        "intro": "When identical items are allocated among distinct recipients, the problem is converted into arranging identical stars and divider bars.",
        "subsections": [
          {
            "title": "The Divider Representation",
            "badge": "Visual Model",
            "content": "To distribute ten identical candies among four children, represent the candies as ten stars ($\\bigstar$) and use three divider bars ($|$) to demarcate the four recipient bins.\n\nEvery unique arrangement of stars and bars corresponds to an exact allocation outcome."
          },
          {
            "title": "Non-Negative Integer Solutions ($x_i \\ge 0$)",
            "badge": "Standard Formula",
            "content": "The total number of non-negative integer solutions to $x_1 + x_2 + \\dots + x_k = n$ corresponds to placing $k - 1$ dividers into $n + k - 1$ total positions, yielding $\\binom{n + k - 1}{k - 1}$ configurations."
          },
          {
            "title": "Positive Integer Solutions ($x_i \\ge 1$)",
            "badge": "At-Least-One Variant",
            "content": "When every bin must receive at least one item, we pre-assign one item to each of the $k$ bins in advance. This leaves $n - k$ items to distribute freely, giving $\\binom{n - 1}{k - 1}$ valid distributions."
          }
        ]
      },
      {
        "heading": "The Principle of Inclusion-Exclusion (PIE) & Pigeonhole Principle",
        "tag": "Extremal Counting",
        "intro": "These two combinatorial pillars handle overlapping sets and guarantee the existence of shared outcomes.",
        "subsections": [
          {
            "title": "The Principle of Inclusion-Exclusion (PIE)",
            "badge": "Set Union Counting",
            "content": "When counting items across overlapping sets, adding individual set sizes overcounts elements residing in shared intersections. We systematically correct this error by subtracting pairwise intersections, re-adding three-way overlaps, and continuing this alternating sequence until every element in the union is counted exactly once."
          },
          {
            "title": "The Pigeonhole Principle (PHP)",
            "badge": "Existence Principle",
            "content": "If you place $N$ items into $k$ bins and $N > k$, at least one bin must hold at least two items. In its generalized form, at least one bin must hold at least $\\lceil N / k \\rceil$ items.\n\nThis simple observation provides non-constructive guarantees for collision detection in hash tables, compression limits, and geometry."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Stars & Bars Theorem",
        "statement": "• **Non-Negative Integer Solutions ($x_i \\ge 0$)**: The number of ways to solve $x_1 + x_2 + \\dots + x_k = n$ is $\\binom{n + k - 1}{k - 1} = \\binom{n + k - 1}{n}$.\n• **Positive Integer Solutions ($x_i \\ge 1$)**: When every variable must be at least $1$, the number of solutions is $\\binom{n - 1}{k - 1}$.",
        "category": "Divider Methods",
        "proofSketch": "• Placing $n$ identical stars and $k - 1$ identical divider bars requires choosing $n$ positions out of $n + k - 1$ total positions.\n• If every bin needs at least 1 item, pre-give 1 item to each of the $k$ bins first, leaving $n - k$ items to distribute freely."
      },
      {
        "name": "Principle of Inclusion-Exclusion (PIE)",
        "statement": "To find the total size of the union of overlapping sets, alternately add and subtract intersection sizes:\n$|A_1 \\cup A_2 \\cup \\dots \\cup A_n| = \\sum |A_i| - \\sum |A_i \\cap A_j| + \\sum |A_i \\cap A_j \\cap A_k| - \\dots + (-1)^{n-1} |A_1 \\cap \\dots \\cap A_n|$.",
        "category": "Extremal Counting",
        "proofSketch": "• Consider an element that belongs to exactly $r$ of the sets.\n• In the alternating sum, it is counted $\\binom{r}{1} - \\binom{r}{2} + \\binom{r}{3} - \\dots = 1 - (1 - 1)^r = 1$ time. Every element in the union is counted exactly once!"
      },
      {
        "name": "Derangements Formula & Asymptotics",
        "statement": "A **derangement** is a permutation where no element ends up in its original spot (nobody gets their own hat back). The count of derangements of $n$ items is:\n$D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = (n-1)(D_{n-1} + D_{n-2})$.\nAs $n$ grows, the probability approaches $D_n / n! \\approx 1/e \\approx 0.3679$.",
        "category": "Fixed-Point-Free Permutations",
        "proofSketch": "• Let $A_i$ be the set of permutations where item $i$ stays in its original spot.\n• By the Principle of Inclusion-Exclusion (PIE), the number of permutations where at least one item stays in place is calculated, and subtracted from total permutations $n!$."
      }
    ],
    "pitfalls": [
      "**Distinguishable versus Indistinguishable**: Putting 3 distinct labeled balls into 2 distinct boxes has $2^3 = 8$ ways. Putting 3 identical unlabeled balls into 2 boxes is Stars & Bars: $\\binom{3+2-1}{3} = 4$ ways.",
      "**Forgetting Lower Bounds**: If a problem says $x_i \\ge 2$, subtract 2 from each variable *before* applying Stars & Bars.",
      "**Double Counting in Overlapping Cases**: Summing cases that share overlap without subtracting the intersection will artificially inflate your count."
    ]
  },
  "graphs": {
    "title": "Graph Theory, Trees & Planarity",
    "summary": "**What is a Graph? (Starting from Scratch)**\n• A graph is the simplest way to draw any network:\n  • **Vertices (Nodes)**: Dots representing entities (like computers, cities, people, or web pages).\n  • **Edges**: Lines connecting pairs of dots (representing network cables, flights, friendships, or hyperlinks).\n• In graph theory, physical distances and curving lines do not matter—only **which dots are connected to which dots**!",
    "intuition": [
      {
        "heading": "The Handshaking Lemma: Why Odd Degrees Come in Pairs",
        "tag": "Degree Sums",
        "intro": "Graph theory abstracts complex systems into dots (vertices) and lines (edges), ignoring physical coordinates to focus strictly on topological connections.",
        "subsections": [
          {
            "title": "The Handshake Analogy",
            "badge": "Visual Analogy",
            "content": "Picture a room full of people shaking hands. Every single handshake involves exactly two hands, one from each participant."
          },
          {
            "title": "The Degree-Edge Equality ($\\sum \\deg(v) = 2|E|$)",
            "badge": "Conservation Law",
            "content": "If every person announces how many hands they shook (their vertex degree) and you sum these numbers together, the total must equal exactly twice the number of edges: $\\sum_{v \\in V} \\deg(v) = 2|E|$."
          },
          {
            "title": "The Parity Invariant for Odd-Degree Vertices",
            "badge": "Direct Corollary",
            "content": "Because the sum of degrees equals $2|E|$, it is always an even integer. Even-degree vertices contribute an even amount to this total, which mathematically forces the count of odd-degree vertices to always be an even number."
          }
        ]
      },
      {
        "heading": "Eulerian Circuits versus Hamiltonian Cycles",
        "tag": "Network Traversal",
        "intro": "Traversal problems explore whether a network can be toured by covering every connection or visiting every location.",
        "subsections": [
          {
            "title": "Eulerian Circuits (The Complete Edge Tour)",
            "badge": "Edge Traversal",
            "content": "An Eulerian circuit traverses every single edge in the graph exactly once and returns to the initial vertex without lifting the pen.\n\nEuler proved that a connected graph possesses an Eulerian circuit if and only if every single vertex has an even degree, because entering a vertex requires an unused exit edge."
          },
          {
            "title": "Hamiltonian Cycles (The Complete Vertex Visit)",
            "badge": "Vertex Traversal",
            "content": "A Hamiltonian cycle visits every single vertex in the graph exactly once and returns to the start.\n\nUnlike Eulerian circuits, there is no simple degree condition for Hamiltonian cycles. Finding them is an NP-Complete problem in Computer Science (CS), requiring search heuristics."
          }
        ]
      },
      {
        "heading": "Planar Graphs: Drawing with Zero Crossing Lines",
        "tag": "Planar Geometry",
        "intro": "Planarity analyzes whether a network can be embedded on a flat two-dimensional surface without overlapping edges.",
        "subsections": [
          {
            "title": "Planar Embeddings",
            "badge": "Geometric Definition",
            "content": "A graph is planar if it can be drawn on a plane in such a way that edges intersect only at their shared endpoints. Planar graphs model printed circuit board wiring where traces must not cross."
          },
          {
            "title": "Euler’s Polyhedral Formula ($V - E + F = 2$)",
            "badge": "Topological Invariant",
            "content": "For any connected planar graph drawn without edge crossings, the number of vertices $V$, edges $E$, and bounded faces $F$ (including the unbounded exterior region) always satisfies $V - E + F = 2$."
          },
          {
            "title": "The Strict Planar Edge Bound ($E \\le 3V - 6$)",
            "badge": "Planar Boundary",
            "content": "Because every face in a simple planar graph must be enclosed by at least three edges, substituting into Euler's formula proves that simple planar graphs with three or more vertices cannot exceed $E \\le 3V - 6$ edges."
          }
        ]
      }
    ],
    "theorems": [
      {
        "name": "Euler’s Handshaking Lemma",
        "statement": "For any undirected graph $G = (V, E)$, the sum of all vertex degrees is exactly twice the number of edges: $\\sum_{v \\in V} \\deg(v) = 2|E|$. Consequently, the count of vertices with odd degree is always an even integer.",
        "category": "Degree Sequences",
        "proofSketch": "• Every edge connects two endpoints. Each edge contributes $+1$ to the degree of its first endpoint and $+1$ to its second endpoint, adding exactly $2$ to the total degree sum."
      },
      {
        "name": "Euler’s Theorem for Eulerian Graphs",
        "statement": "• A connected graph has a closed Eulerian Circuit (visits every edge once and returns to start) if and only if **every vertex has an even degree**.\n• It has an open Eulerian Trail (starts and ends at different vertices) if and only if **exactly two vertices have odd degree**.",
        "category": "Eulerian Traversal",
        "proofSketch": "• Every time an edge tour enters a vertex, it must exit along another edge, using up degrees in pairs of $2$. Thus degrees must be even.\n• Hierholzer’s algorithm constructively splices smaller cycles together to prove sufficiency."
      },
      {
        "name": "Euler’s Planar Polyhedral Formula & Edge Bounds",
        "statement": "For any connected planar graph drawn without crossings with $V$ vertices, $E$ edges, and $F$ faces: $V - E + F = 2$. For simple graphs with $V \\ge 3$, this proves the strict upper bound $E \\le 3V - 6$.",
        "category": "Planarity Formula",
        "proofSketch": "• **Base Case (Tree)**: A tree has no cycles, so $F = 1$ face, and $E = V - 1$. Then $V - (V - 1) + 1 = 2$. Formula holds!\n• **Adding Edges**: Every additional edge added to a tree completes a cycle, increasing both edges $E$ and faces $F$ by $1$, leaving $V - E + F$ unchanged at $2$.\n• Since every face is bounded by at least $3$ edges, $2E \\ge 3F$. Substituting $F = 2 - V + E$ gives $E \\le 3V - 6$."
      },
      {
        "name": "Kuratowski’s Theorem",
        "statement": "A graph is planar if and only if it does not contain a subdivision of $K_5$ (the complete graph on 5 vertices) or $K_{3,3}$ (the complete bipartite utility graph on 3 and 3 vertices).",
        "category": "Planar Characterization",
        "proofSketch": "• $K_5$ has $V = 5$ and $E = 10$, but the planar bound requires $E \\le 3(5) - 6 = 9$. Since $10 > 9$, $K_5$ cannot be planar!\n• $K_{3,3}$ has no triangles, so it requires $E \\le 2V - 4 = 2(6) - 4 = 8$. But $K_{3,3}$ has $9$ edges ($9 > 8$), so it cannot be planar either."
      }
    ],
    "pitfalls": [
      "**Eulerian Trail versus Circuit**: 0 odd-degree vertices = Eulerian Circuit (starts and ends at same vertex). Exactly 2 odd-degree vertices = Eulerian Trail (starts and ends at different vertices). More than 2 odd-degree vertices = Neither!",
      "**The Planar Bound Converse Trap**: $E \\le 3V - 6$ is a NECESSARY condition, NOT a sufficient one! $K_{3,3}$ satisfies $9 \\le 3(6) - 6 = 12$, but $K_{3,3}$ is still non-planar.",
      "**Tree Characterization Rule**: For a graph with $V$ vertices, any two of the following guarantees the third: (1) Connected, (2) Acyclic (no cycles), (3) Exactly $|E| = |V| - 1$ edges."
    ]
  }
};
