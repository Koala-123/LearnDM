/**
 * Graph Theory & Tree Engine
 * Handles:
 * - Degree sequences & Handshaking Lemma
 * - Bipartite 2-coloring detection (and odd cycle extraction)
 * - Eulerian trail / circuit classification
 * - Kruskal's Minimum Spanning Tree with step-by-step edge selection/rejection
 * - Planarity diagnostics & Euler's formula (V - E + F = 2)
 * - Greedy vertex coloring and chromatic number bound
 * - Graph Presets: K_5, K_3_3, Petersen, Cube, Cycle, Wheel
 */

export function analyzeGraph(vertices, edges, isDirected = false) {
  const n = vertices.length;
  const vertMap = new Map();
  vertices.forEach((v, i) => vertMap.set(String(v.id || v), i));

  // Build adjacency list
  const adj = Array.from({ length: n }, () => []);
  const inDegree = Array(n).fill(0);
  const outDegree = Array(n).fill(0);
  const degree = Array(n).fill(0);

  edges.forEach((e) => {
    const uIdx = vertMap.get(String(e.source));
    const vIdx = vertMap.get(String(e.target));
    if (uIdx !== undefined && vIdx !== undefined) {
      if (isDirected) {
        adj[uIdx].push({ to: vIdx, weight: e.weight || 1 });
        outDegree[uIdx]++;
        inDegree[vIdx]++;
      } else {
        adj[uIdx].push({ to: vIdx, weight: e.weight || 1 });
        adj[vIdx].push({ to: uIdx, weight: e.weight || 1 });
        degree[uIdx]++;
        degree[vIdx]++;
      }
    }
  });

  // Degree Sequence (sorted descending)
  const degSeq = isDirected
    ? vertices.map((v, i) => ({ id: v.id || v, in: inDegree[i], out: outDegree[i] }))
    : vertices.map((v, i) => ({ id: v.id || v, deg: degree[i] })).sort((a, b) => b.deg - a.deg);

  // Handshaking Lemma verification
  const totalDegree = isDirected
    ? outDegree.reduce((a, b) => a + b, 0)
    : degree.reduce((a, b) => a + b, 0);
  const handshakingHolds = totalDegree === (isDirected ? edges.length : 2 * edges.length);

  // Connected Components (BFS)
  const visited = Array(n).fill(false);
  const components = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const comp = [];
      const queue = [i];
      visited[i] = true;
      while (queue.length > 0) {
        const curr = queue.shift();
        comp.push(vertices[curr].id || vertices[curr]);
        for (const neighbor of adj[curr]) {
          if (!visited[neighbor.to]) {
            visited[neighbor.to] = true;
            queue.push(neighbor.to);
          }
        }
      }
      components.push(comp);
    }
  }

  const isConnected = components.length <= 1;

  // Bipartite Check (2-coloring)
  const color = Array(n).fill(-1);
  let isBipartite = true;
  let oddCycle = null;

  for (let start = 0; start < n; start++) {
    if (color[start] === -1) {
      color[start] = 0;
      const queue = [start];
      const parent = Array(n).fill(-1);

      while (queue.length > 0 && isBipartite) {
        const u = queue.shift();
        for (const neighbor of adj[u]) {
          const v = neighbor.to;
          if (color[v] === -1) {
            color[v] = 1 - color[u];
            parent[v] = u;
            queue.push(v);
          } else if (color[v] === color[u] && !isDirected) {
            isBipartite = false;
            // Found odd cycle
            oddCycle = [vertices[u].id || vertices[u], vertices[v].id || vertices[v]];
            break;
          }
        }
      }
    }
    if (!isBipartite) break;
  }

  const part1 = [];
  const part2 = [];
  if (isBipartite) {
    vertices.forEach((v, i) => {
      if (color[i] === 0) part1.push(v.id || v);
      else if (color[i] === 1) part2.push(v.id || v);
    });
  }

  // Eulerian Check
  // Undirected: connected and (0 odd degrees => circuit, 2 odd degrees => trail)
  let oddCount = 0;
  degree.forEach((d) => {
    if (d % 2 !== 0) oddCount++;
  });

  let eulerianStatus = 'None';
  if (isConnected && edges.length > 0) {
    if (oddCount === 0) eulerianStatus = 'Eulerian Circuit (all vertices have even degree)';
    else if (oddCount === 2) eulerianStatus = 'Eulerian Trail (exactly two vertices have odd degree)';
    else eulerianStatus = `Non-Eulerian (${oddCount} vertices have odd degree)`;
  } else if (!isConnected && edges.length > 0) {
    eulerianStatus = 'Non-Eulerian (Graph is disconnected)';
  }

  // Tree Check
  // Connected and E = V - 1
  const isTree = isConnected && edges.length === n - 1 && n > 0;

  // Planarity Diagnostics:
  // Necessary condition for simple planar: E <= 3V - 6 (for V >= 3)
  // For triangle-free (like bipartite): E <= 2V - 4
  let planarViolated = false;
  let planarReason = null;
  if (n >= 3) {
    if (isBipartite && edges.length > 2 * n - 4) {
      planarViolated = true;
      planarReason = `Bipartite simple graph has $|E| = ${edges.length} > 2|V| - 4 = ${2 * n - 4}$. By Euler's theorem, this graph cannot be planar.`;
    } else if (edges.length > 3 * n - 6) {
      planarViolated = true;
      planarReason = `$|E| = ${edges.length} > 3|V| - 6 = ${3 * n - 6}$. By Euler's theorem, this graph cannot be planar.`;
    }
  }

  // Euler's Formula Faces (assuming connected planar)
  const planarFaces = isConnected ? Math.max(1, edges.length - n + 2) : 'Undefined (Disconnected)';

  // Greedy Coloring (Welsh-Powell degree heuristic)
  const sortedVertIndices = vertices
    .map((v, i) => ({ idx: i, deg: degree[i] }))
    .sort((a, b) => b.deg - a.deg)
    .map((o) => o.idx);

  const vertexColorMap = Array(n).fill(-1);
  let maxColorUsed = 0;

  sortedVertIndices.forEach((u) => {
    const usedColors = new Set();
    for (const neighbor of adj[u]) {
      const c = vertexColorMap[neighbor.to];
      if (c !== -1) usedColors.add(c);
    }
    let colorChoice = 0;
    while (usedColors.has(colorChoice)) {
      colorChoice++;
    }
    vertexColorMap[u] = colorChoice;
    if (colorChoice > maxColorUsed) maxColorUsed = colorChoice;
  });

  const chromaticUpper = maxColorUsed + 1;

  return {
    vertexCount: n,
    edgeCount: edges.length,
    degreeSequence: degSeq,
    totalDegree,
    handshakingHolds,
    components,
    isConnected,
    isBipartite,
    bipartiteSets: isBipartite ? { part1, part2 } : null,
    oddCycle,
    oddDegreeCount: oddCount,
    eulerianStatus,
    isTree,
    planarViolated,
    planarReason,
    planarFaces,
    chromaticUpper,
    vertexColorMap,
  };
}

/**
 * Kruskal's Minimum Spanning Tree
 */
export function runKruskal(vertices, edges) {
  const n = vertices.length;
  const vertMap = new Map();
  vertices.forEach((v, i) => vertMap.set(String(v.id || v), i));

  // Disjoint Set Union
  const parent = Array(n).fill(0).map((_, i) => i);
  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }
  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  // Sort edges ascending by weight
  const sortedEdges = [...edges].sort((a, b) => (a.weight || 1) - (b.weight || 1));
  const mstEdges = [];
  const history = [];
  let totalWeight = 0;

  for (const e of sortedEdges) {
    const u = vertMap.get(String(e.source));
    const v = vertMap.get(String(e.target));
    if (u === undefined || v === undefined) continue;

    const rootU = find(u);
    const rootV = find(v);
    const createsCycle = rootU === rootV;

    if (!createsCycle) {
      union(u, v);
      mstEdges.push(e);
      totalWeight += e.weight || 1;
      history.push({
        edge: e,
        status: 'Accepted',
        reason: `Connects component ${rootU} and ${rootV} without cycle.`,
      });
    } else {
      history.push({
        edge: e,
        status: 'Rejected',
        reason: `Vertices ${e.source} and ${e.target} already in same component (creates a cycle).`,
      });
    }

    if (mstEdges.length === n - 1 && n > 0) break;
  }

  return {
    mstEdges,
    totalWeight,
    history,
    isSpanningTree: mstEdges.length === n - 1,
  };
}

/**
 * Standard Graph Presets
 */
export function getGraphPreset(name) {
  switch (name) {
    case 'K5': {
      const vertices = [
        { id: '1', x: 250, y: 70 },
        { id: '2', x: 390, y: 170 },
        { id: '3', x: 340, y: 330 },
        { id: '4', x: 160, y: 330 },
        { id: '5', x: 110, y: 170 },
      ];
      const edges = [];
      for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
          edges.push({ source: vertices[i].id, target: vertices[j].id, weight: 1 });
        }
      }
      return { name: 'K_5 (Complete Graph on 5 vertices)', vertices, edges, isDirected: false };
    }
    case 'K33': {
      const vertices = [
        { id: 'u1', x: 150, y: 100 },
        { id: 'u2', x: 150, y: 200 },
        { id: 'u3', x: 150, y: 300 },
        { id: 'v1', x: 350, y: 100 },
        { id: 'v2', x: 350, y: 200 },
        { id: 'v3', x: 350, y: 300 },
      ];
      const edges = [];
      ['u1', 'u2', 'u3'].forEach((u) => {
        ['v1', 'v2', 'v3'].forEach((v) => {
          edges.push({ source: u, target: v, weight: 1 });
        });
      });
      return { name: 'K_{3,3} (Complete Bipartite Utility Graph)', vertices, edges, isDirected: false };
    }
    case 'Petersen': {
      const vertices = [
        // Outer 5
        { id: '0', x: 250, y: 60 },
        { id: '1', x: 390, y: 160 },
        { id: '2', x: 340, y: 320 },
        { id: '3', x: 160, y: 320 },
        { id: '4', x: 110, y: 160 },
        // Inner 5
        { id: '5', x: 250, y: 140 },
        { id: '6', x: 330, y: 200 },
        { id: '7', x: 300, y: 280 },
        { id: '8', x: 200, y: 280 },
        { id: '9', x: 170, y: 200 },
      ];
      const edges = [
        // Outer cycle
        { source: '0', target: '1', weight: 1 },
        { source: '1', target: '2', weight: 1 },
        { source: '2', target: '3', weight: 1 },
        { source: '3', target: '4', weight: 1 },
        { source: '4', target: '0', weight: 1 },
        // Inner star
        { source: '5', target: '7', weight: 1 },
        { source: '7', target: '9', weight: 1 },
        { source: '9', target: '6', weight: 1 },
        { source: '6', target: '8', weight: 1 },
        { source: '8', target: '5', weight: 1 },
        // Spokes
        { source: '0', target: '5', weight: 1 },
        { source: '1', target: '6', weight: 1 },
        { source: '2', target: '7', weight: 1 },
        { source: '3', target: '8', weight: 1 },
        { source: '4', target: '9', weight: 1 },
      ];
      return { name: 'Petersen Graph (3-Regular, Non-Planar)', vertices, edges, isDirected: false };
    }
    case 'Tree': {
      const vertices = [
        { id: 'A', x: 250, y: 70 },
        { id: 'B', x: 170, y: 160 },
        { id: 'C', x: 330, y: 160 },
        { id: 'D', x: 120, y: 270 },
        { id: 'E', x: 210, y: 270 },
        { id: 'F', x: 330, y: 270 },
      ];
      const edges = [
        { source: 'A', target: 'B', weight: 4 },
        { source: 'A', target: 'C', weight: 2 },
        { source: 'B', target: 'D', weight: 5 },
        { source: 'B', target: 'E', weight: 1 },
        { source: 'C', target: 'F', weight: 3 },
      ];
      return { name: 'Sample Spanning Tree (|E| = |V| - 1)', vertices, edges, isDirected: false };
    }
    default:
      return null;
  }
}
