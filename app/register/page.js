"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
  ShieldCheck,
  HeartPulse,
  UserRound,
  Stethoscope,
} from "lucide-react";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    role: z.enum(["patient", "doctor"]),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Add at least one uppercase letter")
      .regex(/[a-z]/, "Add at least one lowercase letter")
      .regex(/[0-9]/, "Add at least one number"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "patient",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
  setIsLoading(true);

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Registration failed");
      return;
    }

    alert("Account created successfully!");

    window.location.href = "/login";
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#f4f7f8] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(20,35,45,0.08)] lg:min-h-[calc(100vh-40px)] lg:rounded-[36px]">

        {/* LEFT SIDE - FORM */}
        <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-[520px]">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-12 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6EFF3]">
                <HeartPulse size={22} className="text-[#42677A]" />
              </div>

              <span className="text-xl font-semibold tracking-tight text-[#1D2D35]">
                Care<span className="text-[#5E8BA1]">Connect</span>
              </span>
            </Link>

            {/* Heading */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C92A5]">
                Get started
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D35] sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#78868D]">
                Join CareConnect and make managing your healthcare journey
                simpler and more organised.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-9 space-y-5"
            >
              {/* ROLE */}
              <div>
                <label className="mb-3 block text-sm font-medium text-[#33454E]">
                  I want to join as
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {/* Patient */}
                  <button
                    type="button"
                    onClick={() =>
                      setValue("role", "patient", {
                        shouldValidate: true,
                      })
                    }
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selectedRole === "patient"
                        ? "border-[#5B879C] bg-[#F1F7F8]"
                        : "border-[#E1E8EA] bg-white hover:border-[#AABFC7]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        selectedRole === "patient"
                          ? "bg-[#DCECF0] text-[#47778C]"
                          : "bg-[#F3F6F7] text-[#91A0A6]"
                      }`}
                    >
                      <UserRound size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#2B3B43]">
                        Patient
                      </p>

                      <p className="mt-0.5 text-xs text-[#849299]">
                        Book appointments
                      </p>
                    </div>
                  </button>

                  {/* Doctor */}
                  <button
                    type="button"
                    onClick={() =>
                      setValue("role", "doctor", {
                        shouldValidate: true,
                      })
                    }
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selectedRole === "doctor"
                        ? "border-[#5B879C] bg-[#F1F7F8]"
                        : "border-[#E1E8EA] bg-white hover:border-[#AABFC7]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        selectedRole === "doctor"
                          ? "bg-[#DCECF0] text-[#47778C]"
                          : "bg-[#F3F6F7] text-[#91A0A6]"
                      }`}
                    >
                      <Stethoscope size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#2B3B43]">
                        Doctor
                      </p>

                      <p className="mt-0.5 text-xs text-[#849299]">
                        Manage patients
                      </p>
                    </div>
                  </button>
                </div>

                {errors.role && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* NAME + PHONE */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#33454E]">
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A1A6]"
                    />

                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register("fullName")}
                      className={`w-full rounded-xl border bg-[#FCFDFD] py-3.5 pl-11 pr-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#AAB4B8] focus:ring-4 ${
                        errors.fullName
                          ? "border-red-400 focus:ring-red-100"
                          : "border-[#E0E7E9] focus:border-[#5B879C] focus:ring-[#E7F0F3]"
                      }`}
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#33454E]">
                    Phone number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A1A6]"
                    />

                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      {...register("phone")}
                      className={`w-full rounded-xl border bg-[#FCFDFD] py-3.5 pl-11 pr-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#AAB4B8] focus:ring-4 ${
                        errors.phone
                          ? "border-red-400 focus:ring-red-100"
                          : "border-[#E0E7E9] focus:border-[#5B879C] focus:ring-[#E7F0F3]"
                      }`}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#33454E]">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A1A6]"
                  />

                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={`w-full rounded-xl border bg-[#FCFDFD] py-3.5 pl-11 pr-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#AAB4B8] focus:ring-4 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-100"
                        : "border-[#E0E7E9] focus:border-[#5B879C] focus:ring-[#E7F0F3]"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORDS */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#33454E]">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A1A6]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      {...register("password")}
                      className={`w-full rounded-xl border bg-[#FCFDFD] py-3.5 pl-11 pr-12 text-sm text-[#111111] outline-none transition-all placeholder:text-[#AAB4B8] focus:ring-4 ${
                        errors.password
                          ? "border-red-400 focus:ring-red-100"
                          : "border-[#E0E7E9] focus:border-[#5B879C] focus:ring-[#E7F0F3]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84939A] hover:text-[#3F5964]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#33454E]">
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A1A6]"
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      className={`w-full rounded-xl border bg-[#FCFDFD] py-3.5 pl-11 pr-12 text-sm text-[#111111] outline-none transition-all placeholder:text-[#AAB4B8] focus:ring-4 ${
                        errors.confirmPassword
                          ? "border-red-400 focus:ring-red-100"
                          : "border-[#E0E7E9] focus:border-[#5B879C] focus:ring-[#E7F0F3]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84939A] hover:text-[#3F5964]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* TERMS */}
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#718087]">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#C8D4D7] accent-[#527E91]"
                  />

                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-[#4B778B]">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#4B778B]">
                      Privacy Policy
                    </span>
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C3440] py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#294B59] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* SIGN IN */}
            <p className="mt-8 text-center text-sm text-[#78868D]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#4B778B] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="relative hidden w-[44%] overflow-hidden bg-[#1C3440] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#294D5A] blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[#243F49] blur-3xl" />

          <div className="absolute left-12 top-32 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute left-28 top-48 h-28 w-28 rounded-full border border-white/5" />

          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
              <HeartPulse size={23} className="text-[#A9CBD5]" />
            </div>

            <span className="text-xl font-semibold tracking-tight text-white">
              Care<span className="text-[#A9CBD5]">Connect</span>
            </span>
          </Link>

          {/* Content */}
          <div className="relative z-10 max-w-md">
            <div className="mb-7 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#A9CBD5]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9EBAC4]">
                Start your journey
              </span>
            </div>

            <h2 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white xl:text-6xl">
              Better care,
              <br />
              starts with{" "}
              <span className="font-serif font-normal italic text-[#A9CBD5]">
                you.
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#BACBD0] xl:text-base">
              One secure platform to connect patients and healthcare
              professionals for a simpler healthcare experience.
            </p>

            <div className="mt-10 space-y-4">
              {[
                {
                  icon: UserRound,
                  text: "Create your personalised profile",
                },
                {
                  icon: Activity,
                  text: "Keep appointments organised",
                },
                {
                  icon: ShieldCheck,
                  text: "Secure and simple healthcare access",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-sm text-[#D4E0E4]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon size={17} className="text-[#A9CBD5]" />
                    </div>

                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs text-[#8EAAB3]">
            <span className="h-px w-10 bg-[#486671]" />
            Care that stays connected.
          </div>
        </section>
      </div>
    </main>
  );
}