import { Cpu, Zap, Server } from 'lucide-react';

interface RuntimeSelectorProps {
  onSelect: (type: 'cpu' | 'gpu' | 'tpu') => void;
  currentType: 'cpu' | 'gpu' | 'tpu';
}

export function RuntimeSelector({ onSelect, currentType }: RuntimeSelectorProps) {
  const runtimes = [
    { type: 'cpu' as const, label: 'CPU', icon: Cpu, description: 'پردازنده معمولی' },
    { type: 'gpu' as const, label: 'GPU', icon: Zap, description: 'پردازنده گرافیکی' },
    { type: 'tpu' as const, label: 'TPU', icon: Server, description: 'پردازنده تانسور' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[280px]">
      <div className="text-sm text-gray-700 mb-3">انتخاب نوع زمان اجرا</div>
      <div className="space-y-2">
        {runtimes.map(runtime => {
          const Icon = runtime.icon;
          return (
            <button
              key={runtime.type}
              onClick={() => onSelect(runtime.type)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                currentType === runtime.type
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                currentType === runtime.type ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <div className="flex-1 text-right">
                <div className={`text-sm ${
                  currentType === runtime.type ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {runtime.label}
                </div>
                <div className="text-xs text-gray-500">{runtime.description}</div>
              </div>
              {currentType === runtime.type && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
