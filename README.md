# LearnDM 🚀
### Interactive Discrete Mathematics Workbench & Question Solver
**Cosmic Cyber Pop Edition (Option B)**

An interactive, gamified, high-performance web application designed for mastering Discrete Mathematics through deep intuition, interactive visual labs, and comprehensive problem sets.

---

## 🌟 Key Architectural Changes & Highlights

### 1. Aesthetic: Cosmic Cyber Pop (Option B)
- **Deep Space Midnight Canvas**: Base surfaces `#0a0e1a` and `#111827`.
- **High-Voltage Pop Palette**:
  - 💜 **Electric Violet** (`#a855f7`) — Primary actions & brand glow
  - 🍉 **Hot Coral / Watermelon Pink** (`#ff4b72`) — Clock needle, challenge cards, error states
  - 🌿 **Mint Emerald** (`#10e598`) — Verified theorems, correct answers, success toasts
  - ☀️ **Sunny Gold** (`#fbbf24`) — XP counters, level badges, hints
  - 💎 **Sky Cyan** (`#38bdf8`) — Graph vertices, input borders, math links
- **Tactile Micro-Interactions**: Capsule pill shapes (`rounded-full`), glowing neon borders, arcade push buttons with compression states (`active:translate-y-0.5`), and XP confetti rewards.

### 2. Multi-Screen Navigation Architecture (Clean & Uncluttered)
Rather than cramming simulations, questions, and guides onto a single crowded page, each topic features **4 dedicated full-width screens**:

1. **📖 1. Story & Intuition**:
   - Real-World CS Engineering Impact: Why should computer scientists care? (RSA encryption, compilers, SAT solvers, Git DAGs, relational databases).
   - Intuitive Mental Models with step-by-step illustrations.
   - Core Theorems & Expandable Formal Proof Breakdowns (Bézout, Induction, Handshaking, Kuratowski, Lagrange, etc.).

2. **🕹️ 2. Interactive Lab**:
   - **Prominent Top Guide**: "Topic Mission & How to Interact" featuring a 3-step action plan (`[01] Input Setup`, `[02] Manipulate Simulator`, `[03] Inspect Invariants`) and live mathematical invariant verification.
   - **Dedicated Simulators**:
     - *Modular Arithmetic*: Interactive Circular Residue Clock Dial ($\mathbb{Z}/n\mathbb{Z}$) + Step-by-Step Bézout Ladder Table + CRT + Fast Exponentiation.
     - *Relations & Closures*: 0–1 Adjacency Matrix + 1-Click Closures (Reflexive, Symmetric, Warshall Transitive) + Quotient Set Partition $A/R$.
     - *Propositional Logic*: 2ⁿ Truth Table Generator + Tautology/Contradiction Audit + Semantic Equivalence Comparator ($A \equiv B$).
     - *Posets & Lattices*: SVG Layered Hasse Diagram + LUB/GLB Meets & Joins + Distributivity & Boolean Algebra Audit.
     - *Abstract Algebra*: Cayley Table Generator ($(\mathbb{Z}_n, +), (\mathbb{Z}_n^*, \times), V_4$) + Axiom Validation + Element Orders $\text{ord}(g)$.
     - *Combinatorics*: Stars & Bars Visualizer ($x_1 + \dots + x_k = n$) + Scenario Classifier Wizard + 3-Set PIE Venn Breakdown.
     - *Graph Theory*: Interactive Canvas + Degree Sequences + Handshaking Lemma + Kruskal's MST + Planarity Bounds ($E \le 3V - 6$).
     - *Proofs & Induction*: Characteristic Equation Recurrence Solver + Domino Cascade Step-by-Step Induction.
   - **Gamified Quick Quest**: Immediate concept check with instant feedback and "+50 XP".

3. **🎯 3. Practice Arena (120+ Challenges)**:
   - **15 comprehensive questions per unit** across 3 difficulty tiers:
     - 🟢 **Level 1: Core Understanding** (5 per unit)
     - 🟡 **Level 2: Exam Style** (6 per unit)
     - 🔴 **Level 3: Hard Traps & Edge Cases** (4 per unit)
   - Filter by Difficulty (All, Level 1, Level 2, Level 3).
   - Clean Pagination (5 questions per page) with page jump controls.
   - Full KaTeX mathematical derivations and explanations for every question.
   - **"🎮 Load into Lab"**: Automatically switches to the Lab screen with the exact question parameters preloaded!

4. **⚡ 4. Cheat Sheet & Secret Traps**:
   - Rapid-reference high-yield formula table for open-notes exams.
   - **Secret Traps & Counterexamples**: The classic traps where students lose marks (e.g., "Antisymmetric vs Not Symmetric", "Is $\emptyset$ reflexive?", "Dividing across congruences", "Converse of Lagrange is FALSE").
   - 1-Click "Copy Cheat Sheet" functionality.

### 3. Non-Linear Curriculum Navigation
- Freedom to jump directly to any topic anytime via the top pill bar.
- Exam milestone filters:
  - **All 16 Weeks**
  - **Test 1 Prep (Weeks 1–5)** (20% of Course Grade, Open Notes)
  - **Mid-Term Prep (Weeks 1–8)** (30% of Course Grade)
  - **Test 2 & Final Prep (Weeks 9–15)** (Test 2: 20%, Final: 30%)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
cd LearnDM
npm install
```

### Running Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

### Running Mathematical Engine Verification Tests
```bash
node test-engines.js
```
*All 21 unit tests verify mathematical soundness across Boolean Logic, Relation Closures, Number Theory, Posets, Groups, and Graph Theory.*

---

## 🛠️ Tech Stack
- **Framework**: React 18 with Vite
- **Theme**: Tailwind CSS (Cosmic Cyber Pop Dark Arcade)
- **Math Engine**: KaTeX (for fast, crisp client-side LaTeX equations)
- **Visuals**: SVG & Canvas engines
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti
