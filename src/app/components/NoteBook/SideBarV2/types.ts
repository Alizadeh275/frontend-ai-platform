export type SidebarTab = "files" | "toc" | "snippets" | "variables";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
