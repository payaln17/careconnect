"use client";

import Link from "next/link";
import {
  HeartPulse,
  MapPin,
  Mail,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Globe,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Appointments", href: "/appointments" },
    { name: "About Us", href: "/about" },
    { name: "Help Center", href: "/help" },
  ];

  const services = [
    { name: "Doctor Consultation", href: "/doctors" },
    { name: "Book an Appointment", href: "/appointments" },
    { name: "Patient Dashboard", href: "/patient/dashboard" },
    { name: "Doctor Dashboard", href: "/doctor/dashboard" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden bg-[#001D39] text-[#BDD8E9]">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0A4174]/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#49769F]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-14 sm:px-8 lg:pt-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-[#BDD8E9]/15 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">

          {/* Brand */}
          <div className="min-w-0">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#BDD8E9] text-[#001D39] shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-white">
                <HeartPulse size={27} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-white">
                  Care<span className="text-[#7BBDE8]">Connect</span>
                </p>

                <p className="mt-0.5 text-[11px] tracking-[0.14em] text-[#BDD8E9]/70">
                  YOUR HEALTH, OUR PRIORITY
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#BDD8E9]/75">
              Making healthcare simpler and more accessible. Find doctors,
              manage appointments, and take a confident step toward better
              healthcare with CareConnect.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#BDD8E9]/15 bg-white/[0.04] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A4174]">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Your health matters
                </p>

                <p className="mt-1 text-xs leading-5 text-[#BDD8E9]/65">
                  Your healthcare journey, designed with care.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[#BDD8E9]/75 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {link.name}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Our Services
            </h3>

            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1 text-sm text-[#BDD8E9]/75 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {service.name}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Get In Touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-[#BDD8E9]/75">
              Have a question? We are here to help you navigate your
              healthcare journey.
            </p>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:support@careconnect.com"
                className="group flex min-w-0 items-start gap-3 text-sm text-[#BDD8E9]/80 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A4174] transition group-hover:bg-[#49769F]">
                  <Mail size={17} />
                </span>

                <span className="break-all pt-2">
                  support@careconnect.com
                </span>
              </a>

              <div className="flex items-start gap-3 text-sm text-[#BDD8E9]/80">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A4174]">
                  <Clock size={17} />
                </span>

                <span className="pt-1 leading-6">
                  Healthcare access,
                  <br />
                  made simpler.
                </span>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#BDD8E9]/80">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A4174]">
                  <MapPin size={17} />
                </span>

                <span className="pt-1 leading-6">
                  Online healthcare platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs leading-6 text-[#BDD8E9]/60 md:text-left">
            © {new Date().getFullYear()} CareConnect. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-[#BDD8E9]/65 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;