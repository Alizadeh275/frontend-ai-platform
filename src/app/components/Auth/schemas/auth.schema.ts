import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("ایمیل نامعتبر است"),
  password: z.string().min(6, "پسورد باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "نام کامل باید حداقل ۲ کاراکتر باشد"),
    email: z.email("ایمیل نامعتبر است"),
    phone: z.string().min(8, "شماره تماس نامعتبر است"),
    password: z.string().min(6, "پسورد باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تکرار پسورد لازم است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "پسوردها یکسان نیستند",
    path: ["confirmPassword"],
  });
