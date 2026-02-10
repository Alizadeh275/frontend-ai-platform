interface Props {
  label: string;
  labelIcon: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export function AuthInput({
  label,
  labelIcon,
  endIcon,
  error,
  inputProps,
}: Props) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <div className="p-1.5 bg-blue-100 rounded-lg">{labelIcon}</div>
        {label}
      </label>

      <div className="relative">
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
        <input
          {...inputProps}
          className="w-full px-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
