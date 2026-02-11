export function VariablesTab() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-medium text-gray-500 mb-3 px-1">
        متغیرهای فعال
      </div>

      <div className="p-3 rounded-lg bg-gradient-to-l from-emerald-50/50 to-white border border-emerald-100/50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-emerald-700">df</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-600">
            DataFrame
          </span>
        </div>
        <div className="text-xs text-gray-500">(100, 5) • 56.7KB</div>
      </div>

      <div className="p-3 rounded-lg bg-gradient-to-l from-purple-50/50 to-white border border-purple-100/50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-purple-700">x</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-600">
            int
          </span>
        </div>
        <div className="text-xs text-gray-500">Value: 42</div>
      </div>
    </div>
  );
}
