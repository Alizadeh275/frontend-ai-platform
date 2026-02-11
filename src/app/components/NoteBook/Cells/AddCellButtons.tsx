interface AddCellButtonsProps {
  isSelected?: boolean;
  onAddBelowCode?: () => void;
  onAddBelowText?: () => void;
}

export function AddCellButtons({
  isSelected = false,
  onAddBelowCode,
  onAddBelowText,
}: AddCellButtonsProps) {
  return (
    <div
      dir="ltr"
      className="
        absolute -bottom-4 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        z-10
      "
    >
      <div
        className={`flex items-center gap-2 rounded-full border bg-white px-2 py-1 shadow-sm
          ${isSelected ? "border-blue-500" : "border-gray-300"}
        `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddBelowCode?.();
          }}
          className="flex items-center gap-1 text-xs text-gray-700 hover:text-blue-600"
        >
          <span className="text-sm leading-none">＋</span>
          کد
        </button>

        <div className="h-4 w-px bg-gray-300" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddBelowText?.();
          }}
          className="flex items-center gap-1 text-xs text-gray-700 hover:text-green-600"
        >
          <span className="text-sm leading-none">＋</span>
          متن
        </button>
      </div>
    </div>
  );
}
