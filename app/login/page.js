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
  ShieldCheck,
  Stethoscope,
  HeartPulse,
} from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
  setIsLoading(true);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Invalid email or password");
      return;
    }

    alert("Login successful!");

    if (result.user.role === "patient") {
      window.location.href = "/patient/dashboard";
    } else if (result.user.role === "doctor") {
      window.location.href = "/doctor/dashboard";
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#f5f7f6] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(15,35,31,0.08)] lg:min-h-[calc(100vh-40px)] lg:rounded-[36px]">
        
        {/* LEFT SIDE */}
        <section className="relative hidden w-[48%] overflow-hidden bg-[#112A27] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          
          {/* Background glow */}
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1F4842] blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[#21463F] blur-3xl" />

          {/* Decorative lines */}
          <div className="absolute right-12 top-32 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute right-28 top-48 h-28 w-28 rounded-full border border-white/5" />

          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
              <HeartPulse size={23} className="text-[#9FC8BA]" />
            </div>

            <span className="text-xl font-semibold tracking-tight text-white">
              Care<span className="text-[#9FC8BA]">Connect</span>
            </span>
          </Link>

          {/* Main Content */}
          <div className="relative z-10 max-w-md">
            <div className="mb-7 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8FC7B5]" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#9ABAB0]">
                Digital Healthcare
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white xl:text-6xl">
              Healthcare,
              <br />
              made{" "}
              <span className="font-serif font-normal italic text-[#9FC8BA]">
                simpler.
              </span>
            </h1>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#B8CBC5] xl:text-base">
              Manage appointments, discover trusted specialists and keep your
              healthcare journey organised in one secure place.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: Stethoscope,
                  text: "Connect with trusted specialists",
                },
                {
                  icon: Activity,
                  text: "Manage appointments effortlessly",
                },
                {
                  icon: ShieldCheck,
                  text: "Your information stays secure",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-sm text-[#D4E1DD]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon size={17} className="text-[#9FC8BA]" />
                    </div>

                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center gap-3 text-xs text-[#87A79D]">
            <span className="h-px w-10 bg-[#41645C]" />
            Your health, thoughtfully connected.
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-[420px]">
            
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-14 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F0EC]">
                <HeartPulse size={22} className="text-[#286354]" />
              </div>

              <span className="text-xl font-semibold tracking-tight text-[#1A2E2A]">
                Care<span className="text-[#4B8474]">Connect</span>
              </span>
            </Link>

            {/* Heading */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D9388]">
                Welcome back
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1B2C29] sm:text-4xl">
                Sign in to continue
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#7B8885]">
                Enter your account details to access your healthcare dashboard.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-5"
            >
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#34433F]">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A09C]"
                  />

                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={`w-full rounded-xl border bg-[#FCFDFC] py-3.5 pl-11 pr-4 text-sm text-[#263531] outline-none transition-all placeholder:text-[#B0BAB7] focus:ring-4 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-100"
                        : "border-[#E2E8E5] focus:border-[#5B8D7F] focus:ring-[#E5F0EC]"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#34433F]">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#4F8173] transition hover:text-[#24594C]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A09C]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`w-full rounded-xl border bg-[#FCFDFC] py-3.5 pl-11 pr-12 text-sm text-[#263531] outline-none transition-all placeholder:text-[#B0BAB7] focus:ring-4 ${
                      errors.password
                        ? "border-red-400 focus:ring-red-100"
                        : "border-[#E2E8E5] focus:border-[#5B8D7F] focus:ring-[#E5F0EC]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84918E] transition hover:text-[#3C504B]"
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

              {/* Remember */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#697773]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#CBD6D2] accent-[#4F8173]"
                  />
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173B34] py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#245348] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E7ECEA]" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#A4AEAB]">
                OR
              </span>
              <div className="h-px flex-1 bg-[#E7ECEA]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#E0E7E4] bg-white py-3.5 text-sm font-medium text-[#44514D] transition hover:bg-[#F8FAF9]"
            >
              <span className="text-base font-bold text-[#4285F4]">G</span>
              Continue with Google
            </button>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-[#7A8783]">
              New to CareConnect?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#397564] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}