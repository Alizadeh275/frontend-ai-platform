interface Props {
  isVisible: boolean;
  onAddBelowCode?: () => void;
  onAddBelowText?: () => void;
}

export function CodeCellAddButtons({
  isVisible,
  onAddBelowCode,
  onAddBelowText,
}: Props) {
  return (
    <div className="relative h-8">
      <div
        className={`absolute inset-x-0 top-1/4 -translate-y-1/2 flex justify-center transition-all duration-200
          ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-lg border border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddBelowText?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            افزودن متن
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400" />
          </button>
          <div className="w-px h-4 bg-gray-300" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddBelowCode?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            افزودن کد
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
