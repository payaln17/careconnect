"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  HeartPulse,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const CTA = () => {
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("/api/me");

        if (!response.ok) {
          setUser(null);
          return;
        }

        const result = await response.json();

        if (result.success) {
          setUser(result.user);
        }
      } catch (error) {
        console.error("CTA user check error:", error);
        setUser(null);
      } finally {
        setCheckingUser(false);
      }
    };

    checkUser();
  }, []);

  const getDashboardLink = () => {
    if (user?.role === "doctor") {
      return "/doctor/dashboard";
    }

    if (user?.role === "patient") {
      return "/patient/dashboard";
    }

    return "/register";
  };

  const getButtonText = () => {
    if (checkingUser) {
      return "Loading...";
    }

    if (user?.role === "doctor") {
      return "Open Doctor Dashboard";
    }

    if (user?.role === "patient") {
      return "Go to My Dashboard";
    }

    return "Get Started Today";
  };

  return (
    <section className="bg-[#FCFBF9] px-4 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[38px] bg-[#405E5A] px-6 py-14 text-center md:px-12 md:py-20">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#6E9289]/30 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#BFD8CE]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-[12%] top-[18%] h-16 w-16 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute bottom-[18%] left-[10%] h-8 w-8 rounded-full bg-white/5" />

        {/* Content */}
        <div className="relative z-10">

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/10 shadow-inner backdrop-blur-sm">
            <HeartPulse
              size={27}
              strokeWidth={1.8}
              className="text-[#E2F0E8]"
            />
          </div>

          {/* Label */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <Sparkles
              size={13}
              className="text-[#BFD8CE]"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#BFD8CE]">
              Your Health Matters
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            Your healthcare journey
            <span className="block italic text-[#BFD8CE]">
              starts here.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#D7E5DF] md:text-base">
            Find trusted doctors, manage appointments and take a simpler
            step towards better healthcare with CareConnect.
          </p>

          {/* CTA */}
          <div className="mt-9">
            <Link
              href={getDashboardLink()}
              className={`group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#405E5A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                checkingUser
                  ? "pointer-events-none opacity-70"
                  : ""
              }`}
            >
              {getButtonText()}

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF3EF] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-[#BFD8CE]"
              />
              <span className="text-xs text-[#C8DCD5]">
                Simple & secure
              </span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <div className="flex items-center gap-2">
              <HeartPulse
                size={15}
                className="text-[#BFD8CE]"
              />
              <span className="text-xs text-[#C8DCD5]">
                Patient focused
              </span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <span className="text-xs text-[#C8DCD5]">
              CareConnect
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;