/* Toolbar Button */
export default function ToolbarButton({
  icon,
  title,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
    </button>
  );
}
