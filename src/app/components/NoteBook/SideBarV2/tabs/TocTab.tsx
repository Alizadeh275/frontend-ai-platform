export function TocTab() {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-800 pr-2 py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-white border border-emerald-100/50">
        تحلیل داده‌ها
      </div>

      <div className="text-sm text-gray-700 pr-4 py-1.5 px-3 hover:bg-gradient-to-l hover:from-gray-50 hover:to-white rounded-lg cursor-pointer">
        بارگذاری کتابخانه‌ها
      </div>

      <div className="text-sm text-gray-700 pr-4 py-1.5 px-3 hover:bg-gradient-to-l hover:from-gray-50 hover:to-white rounded-lg cursor-pointer">
        پیش‌پردازش
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-800 pr-2 py-2 px-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-white border border-purple-100/50">
          نتایج
        </div>
      </div>

      <div className="text-sm text-gray-700 pr-4 py-1.5 px-3 hover:bg-gradient-to-l hover:from-gray-50 hover:to-white rounded-lg cursor-pointer">
        نمودارها
      </div>
    </div>
  );
}
