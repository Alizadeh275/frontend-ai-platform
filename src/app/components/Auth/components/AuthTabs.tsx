import { LogIn, UserPlus } from "lucide-react";

interface Props {
  isLogin: boolean;
  onChange: (v: boolean) => void;
}

export function AuthTabs({ isLogin, onChange }: Props) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
          isLogin
            ? "border-blue-500 text-blue-600 bg-blue-50"
            : "border-transparent text-gray-600 hover:bg-gray-50"
        }`}
      >
        <LogIn size={20} />
        ورود
      </button>

      <button
        onClick={() => onChange(false)}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
          !isLogin
            ? "border-blue-500 text-blue-600 bg-blue-50"
            : "border-transparent text-gray-600 hover:bg-gray-50"
        }`}
      >
        <UserPlus size={20} />
        ثبت‌نام
      </button>
    </div>
  );
}
