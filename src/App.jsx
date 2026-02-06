import { useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import QuestionNode from "./QuestionNode";
import questions from "./questions";
import "./App.css";

const nodeTypes = { question: QuestionNode };

const defaultEdgeOptions = {
  type: "smoothstep",
  style: { stroke: "#7C3AED", strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#7C3AED" },
};

const initialNodes = [
  {
    id: "node-1",
    type: "question",
    position: { x: 0, y: 0 },
    data: { question: questions[0] },
  },
];

const initialEdges = [];

export default function App() {
  var [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  var [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  var [nextId, setNextId] = useState(2);

  var onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, ...defaultEdgeOptions }, eds)),
    [setEdges]
  );

  var handleAddNode = useCallback(() => {
    var newId = `node-${nextId}`;
    var prevId = `node-${nextId - 1}`;
    var questionIndex = (nextId - 1) % questions.length;

    var newNode = {
      id: newId,
      type: "question",
      position: { x: 0, y: (nextId - 1) * 250 },
      data: { question: questions[questionIndex] },
    };

    var newEdge = {
      id: `edge-${nextId - 1}-${nextId}`,
      source: prevId,
      target: newId,
      ...defaultEdgeOptions,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNextId(nextId + 1);
  }, [nextId, setNodes, setEdges]);

  return (
    <div className="app">
      <header className="header">
        <span className="header-title">Workflow Builder</span>
        <button className="add-node-btn" onClick={handleAddNode}>
          <Plus size={16} />
          Add Node
        </button>
      </header>
      <div className="canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        />
      </div>
    </div>
  );
}
