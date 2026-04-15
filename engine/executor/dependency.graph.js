export class DependencyGraph {
  constructor() {
    console.log('[DependencyGraph] Module mounted.');
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(nodeId, data) {
    this.nodes.set(nodeId, { id: nodeId, ...data });
    if (!this.edges.has(nodeId)) {
        this.edges.set(nodeId, []);
    }
  }

  addDependency(nodeId, dependentOnId) {
    if (!this.nodes.has(nodeId) || !this.nodes.has(dependentOnId)) {
      throw new Error('Both nodes must exist in the graph before adding a dependency.');
    }
    this.edges.get(nodeId).push(dependentOnId);
  }

  /**
   * Topological sort to get execution order
   */
  getExecutionOrder() {
    const order = [];
    const visited = new Set();
    const temp = new Set();

    const visit = (nodeId) => {
      if (temp.has(nodeId)) throw new Error('Circular dependency detected');
      if (!visited.has(nodeId)) {
        temp.add(nodeId);
        const deps = this.edges.get(nodeId) || [];
        for (const dep of deps) {
          visit(dep);
        }
        temp.delete(nodeId);
        visited.add(nodeId);
        order.push(nodeId);
      }
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        visit(nodeId);
      }
    }

    return order; // returns an array of nodeIds in order of execution
  }
}