"use client";

import { MainHeader } from "./MainHeader";
import { SecondaryToolbar } from "./SecondaryToolbar";
import { useAuth } from "../../../stores/AuthContext";

interface TopBarProps {
  projectName: string;
  ramUsage: string;
  diskUsage: string;
  runtimeStatus: "connected" | "connecting" | "disconnected";
  onAddCodeCell?: () => void;
  onAddTextCell?: () => void;
  onRunAll?: () => void;
  onStopAll?: () => void;
  onRestartAll?: () => void;
}

export function TopBar(props: TopBarProps) {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100/80 shadow-sm">
      <MainHeader {...props} username={user} />
      <SecondaryToolbar
        onAddCodeCell={props.onAddCodeCell}
        onAddTextCell={props.onAddTextCell}
        onRunAll={props.onRunAll}
        onStopAll={props.onStopAll}
        onRestartAll={props.onRestartAll}
      />
    </div>
  );
}
