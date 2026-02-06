import { Handle, Position } from "@xyflow/react";
import { MessageSquareText } from "lucide-react";

export default function QuestionNode({ data }) {
  return (
    <div className="question-node">
      <Handle type="target" position={Position.Top} />
      <div className="question-node-header">
        <MessageSquareText size={18} />
        <span className="question-node-label">Question</span>
      </div>
      <p className="question-node-text">{data.question}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
