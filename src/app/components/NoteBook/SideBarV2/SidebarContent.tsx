import { SidebarTab } from "./types";
import { FilesTab } from "./tabs/FilesTab";
import { TocTab } from "./tabs/TocTab";
import { SnippetsTab } from "./tabs/SnippetsTab";
import { VariablesTab } from "./tabs/VariablesTab";

export function SidebarContent(props: {
  activeTab: SidebarTab;
  expandedFolders: Set<string>;
  setExpandedFolders: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 px-1">
      {props.activeTab === "files" && <FilesTab {...props} />}
      {props.activeTab === "toc" && <TocTab />}
      {props.activeTab === "snippets" && <SnippetsTab />}
      {props.activeTab === "variables" && <VariablesTab />}
    </div>
  );
}
