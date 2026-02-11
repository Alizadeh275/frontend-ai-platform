export interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
  output?: string;
  hasChart?: boolean;
  executionStatus?: "idle" | "running" | "success" | "error";
  executionTime?: string;
}
