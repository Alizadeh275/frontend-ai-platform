import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  AtSign,
  Smartphone,
  KeyRound,
  UserPlus,
  Loader2,
} from "lucide-react";

import { registerSchema } from "../schemas/auth.schema";
import { RegisterFormInputs } from "../types/auth.types";
import { AuthInput } from "./AuthInput";

interface Props {
  visible: boolean;
  onSuccess?: () => void;
}

export function RegisterForm({ visible, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setLoading(true);

    // شبیه‌سازی ثبت‌نام با تاخیر
    setTimeout(() => {
      toast.success(`ثبت‌نام موفق: ${data.email}`);
      setLoading(false);

      if (onSuccess) onSuccess(); // بعد از موفقیت، Login فرم باز شود
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 transition-all duration-500 ease-in-out ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 absolute translate-x-full pointer-events-none"
      }`}
    >
      {/* Full Name */}
      <AuthInput
        label="نام کامل"
        labelIcon={<User size={18} className="text-blue-600" />}
        endIcon={<User size={18} />}
        error={errors.fullName?.message}
        inputProps={{
          type: "text",
          placeholder: "نام و نام خانوادگی",
          ...register("fullName"),
        }}
      />

      {/* Email */}
      <AuthInput
        label="ایمیل"
        labelIcon={<Mail size={18} className="text-blue-600" />}
        endIcon={<AtSign size={18} />}
        error={errors.email?.message}
        inputProps={{
          type: "email",
          placeholder: "example@email.com",
          ...register("email"),
        }}
      />

      {/* Phone */}
      <AuthInput
        label="شماره تماس"
        labelIcon={<Phone size={18} className="text-blue-600" />}
        endIcon={<Smartphone size={18} />}
        error={errors.phone?.message}
        inputProps={{
          type: "text",
          placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
          ...register("phone"),
        }}
      />

      {/* Password */}
      <AuthInput
        label="پسورد"
        labelIcon={<Lock size={18} className="text-blue-600" />}
        endIcon={<KeyRound size={18} />}
        error={errors.password?.message}
        inputProps={{
          type: "password",
          placeholder: "••••••••",
          ...register("password"),
        }}
      />

      {/* Confirm Password */}
      <AuthInput
        label="تکرار پسورد"
        labelIcon={<ShieldCheck size={18} className="text-blue-600" />}
        endIcon={<ShieldCheck size={18} />}
        error={errors.confirmPassword?.message}
        inputProps={{
          type: "password",
          placeholder: "••••••••",
          ...register("confirmPassword"),
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-medium
          ${
            loading
              ? "cursor-not-allowed opacity-70"
              : "hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
          }`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <UserPlus size={20} />
        )}
        {loading ? "در حال ثبت‌نام…" : "ایجاد حساب کاربری"}
      </button>
    </form>
  );
}
