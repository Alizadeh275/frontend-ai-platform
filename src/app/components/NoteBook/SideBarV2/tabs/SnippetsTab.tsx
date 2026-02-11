export function SnippetsTab() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-medium text-gray-500 mb-3 px-1">
        کدهای آماده
      </div>

      <button className="w-full text-right p-3 rounded-lg bg-gradient-to-l from-purple-50/50 to-white border border-purple-100/50 hover:border-purple-200/50 hover:shadow-sm transition-all group">
        <div className="text-sm font-medium text-gray-800 group-hover:text-purple-600">
          بارگذاری داده
        </div>
        <div className="text-xs text-gray-500 mt-2 font-mono bg-gray-100/50 p-2 rounded-lg">
          import pandas as pd
        </div>
      </button>

      <button className="w-full text-right p-3 rounded-lg bg-gradient-to-l from-violet-50/50 to-white border border-violet-100/50 hover:border-violet-200/50 hover:shadow-sm transition-all group">
        <div className="text-sm font-medium text-gray-800 group-hover:text-violet-600">
          رسم نمودار
        </div>
        <div className="text-xs text-gray-500 mt-2 font-mono bg-gray-100/50 p-2 rounded-lg">
          import matplotlib.pyplot as plt
        </div>
      </button>
    </div>
  );
}
