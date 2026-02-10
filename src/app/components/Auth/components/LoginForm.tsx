import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/auth.schema";
import { LoginFormInputs } from "../types/auth.types";
import { AuthInput } from "./AuthInput";
import { useAuth } from "../../../stores/AuthContext";

import { Mail, Lock, AtSign, KeyRound, LogIn, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({ visible }: { visible: boolean }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (d: LoginFormInputs) => {
    if (loading) return;

    setLoading(true);
    toast.success(`ورود موفق: ${d.email}`);

    setTimeout(() => {
      login(d.email);
      setLoading(false);
      navigate("/", { replace: true }); // redirect to main app
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 absolute -translate-x-full pointer-events-none"
      }`}
    >
      <AuthInput
        label="ایمیل"
        labelIcon={<Mail size={18} className="text-blue-600" />}
        endIcon={<AtSign size={18} />}
        error={errors.email?.message}
        inputProps={{
          type: "email",
          placeholder: "example@email.com",
          disabled: loading,
          ...register("email"),
        }}
      />

      <AuthInput
        label="پسورد"
        labelIcon={<Lock size={18} className="text-blue-600" />}
        endIcon={<KeyRound size={18} />}
        error={errors.password?.message}
        inputProps={{
          type: "password",
          placeholder: "••••••••",
          disabled: loading,
          ...register("password"),
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg shadow-md flex items-center justify-center gap-2 transition
          ${
            loading
              ? "bg-gradient-to-r from-blue-700 to-purple-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          }
          text-white
        `}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            در حال ورود...
          </>
        ) : (
          <>
            <LogIn size={20} />
            ورود
          </>
        )}
      </button>
    </form>
  );
}
