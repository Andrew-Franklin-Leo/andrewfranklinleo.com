export type NodeType = 'enterprise' | 'agent' | 'decision' | 'workflow' | 'regulation' | 'risk_signal' | 'outcome' | 'product' | 'person' | 'engine' | 'policy';
export type EdgeType = 'depends_on' | 'decided_by' | 'produced' | 'governed_by' | 'triggered' | 'contradicts' | 'related_to' | 'owns' | 'monitors';

export interface GraphNode {
  id: string;
  type: NodeType;
  name: string;
  properties: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  confidence: number;
  source: string;
}

export interface GraphEdge {
  id: string;
  type: EdgeType;
  sourceNodeId: string;
  targetNodeId: string;
  properties: Record<string, unknown>;
  weight: number;
  createdAt: string;
  confidence: number;
}

export interface GraphQuery {
  startNodeId?: string;
  nodeType?: NodeType;
  edgeType?: EdgeType;
  maxDepth?: number;
  filters?: Record<string, unknown>;
  limit?: number;
}

export interface GraphQueryResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
  paths?: GraphNode[][];
}
