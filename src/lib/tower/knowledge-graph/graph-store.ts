import { adminDb } from '@/lib/firebase/admin';
import { GraphNode, GraphEdge, GraphQuery, GraphQueryResult, NodeType, EdgeType } from './types';

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const graphStore = {
  // --- Nodes ---

  async addNode(node: Omit<GraphNode, 'id' | 'createdAt' | 'updatedAt'>): Promise<GraphNode> {
    const now = new Date().toISOString();
    const full: GraphNode = { ...node, id: generateId('node'), createdAt: now, updatedAt: now };
    await adminDb.collection('tower_graph_nodes').doc(full.id).set(full);
    return full;
  },

  async getNode(id: string): Promise<GraphNode | null> {
    const doc = await adminDb.collection('tower_graph_nodes').doc(id).get();
    return doc.exists ? (doc.data() as GraphNode) : null;
  },

  async updateNode(id: string, updates: Partial<GraphNode>): Promise<void> {
    await adminDb.collection('tower_graph_nodes').doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  async deleteNode(id: string): Promise<void> {
    // Delete node and all its edges
    const batch = adminDb.batch();
    batch.delete(adminDb.collection('tower_graph_nodes').doc(id));

    const outEdges = await adminDb.collection('tower_graph_edges')
      .where('sourceNodeId', '==', id).get();
    const inEdges = await adminDb.collection('tower_graph_edges')
      .where('targetNodeId', '==', id).get();

    outEdges.docs.forEach(d => batch.delete(d.ref));
    inEdges.docs.forEach(d => batch.delete(d.ref));

    await batch.commit();
  },

  async findNodes(type?: NodeType, limit = 100): Promise<GraphNode[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('tower_graph_nodes')
      .orderBy('updatedAt', 'desc')
      .limit(limit);
    if (type) query = query.where('type', '==', type);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as GraphNode);
  },

  async searchNodes(term: string, limit = 20): Promise<GraphNode[]> {
    // Simple name prefix search (Firestore limitation)
    const snap = await adminDb.collection('tower_graph_nodes')
      .where('name', '>=', term)
      .where('name', '<=', term + '\uf8ff')
      .limit(limit)
      .get();
    return snap.docs.map(d => d.data() as GraphNode);
  },

  // --- Edges ---

  async addEdge(edge: Omit<GraphEdge, 'id' | 'createdAt'>): Promise<GraphEdge> {
    const full: GraphEdge = { ...edge, id: generateId('edge'), createdAt: new Date().toISOString() };
    await adminDb.collection('tower_graph_edges').doc(full.id).set(full);
    return full;
  },

  async getEdgesFrom(nodeId: string, type?: EdgeType): Promise<GraphEdge[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('tower_graph_edges')
      .where('sourceNodeId', '==', nodeId);
    if (type) query = query.where('type', '==', type);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as GraphEdge);
  },

  async getEdgesTo(nodeId: string, type?: EdgeType): Promise<GraphEdge[]> {
    let query: FirebaseFirestore.Query = adminDb.collection('tower_graph_edges')
      .where('targetNodeId', '==', nodeId);
    if (type) query = query.where('type', '==', type);
    const snap = await query.get();
    return snap.docs.map(d => d.data() as GraphEdge);
  },

  async deleteEdge(id: string): Promise<void> {
    await adminDb.collection('tower_graph_edges').doc(id).delete();
  },

  // --- Traversal ---

  async query(q: GraphQuery): Promise<GraphQueryResult> {
    const nodes: Map<string, GraphNode> = new Map();
    const edges: GraphEdge[] = [];
    const limit = q.limit ?? 50;
    const maxDepth = q.maxDepth ?? 1;

    if (q.startNodeId) {
      const start = await this.getNode(q.startNodeId);
      if (start) {
        nodes.set(start.id, start);
        await this.traverse(start.id, maxDepth, nodes, edges, q.edgeType, limit);
      }
    } else if (q.nodeType) {
      const found = await this.findNodes(q.nodeType, limit);
      found.forEach(n => nodes.set(n.id, n));
    }

    return {
      nodes: Array.from(nodes.values()).slice(0, limit),
      edges: edges.slice(0, limit * 2),
    };
  },

  async traverse(
    nodeId: string,
    depth: number,
    nodes: Map<string, GraphNode>,
    edges: GraphEdge[],
    edgeType?: EdgeType,
    limit = 50,
  ): Promise<void> {
    if (depth <= 0 || nodes.size >= limit) return;

    const outEdges = await this.getEdgesFrom(nodeId, edgeType);
    for (const edge of outEdges) {
      if (nodes.size >= limit) break;
      edges.push(edge);
      if (!nodes.has(edge.targetNodeId)) {
        const target = await this.getNode(edge.targetNodeId);
        if (target) {
          nodes.set(target.id, target);
          await this.traverse(target.id, depth - 1, nodes, edges, edgeType, limit);
        }
      }
    }
  },

  // --- Stats ---

  async getStats(): Promise<{ nodeCount: number; edgeCount: number; nodesByType: Record<string, number> }> {
    const [nodeSnap, edgeSnap] = await Promise.all([
      adminDb.collection('tower_graph_nodes').get(),
      adminDb.collection('tower_graph_edges').get(),
    ]);

    const nodesByType: Record<string, number> = {};
    nodeSnap.docs.forEach(d => {
      const type = d.data().type as string;
      nodesByType[type] = (nodesByType[type] ?? 0) + 1;
    });

    return { nodeCount: nodeSnap.size, edgeCount: edgeSnap.size, nodesByType };
  },
};
