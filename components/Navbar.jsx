"use client";

import Link from "next/link";
import { HeartPulse, Menu, X, UserRound, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Appointments", href: "/appointments" },
    { name: "About", href: "/about" },
    
  ];

  useEffect(() => {
    const getCurrentUser = async () => {
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
        console.error("Navbar authentication error:", error);
        setUser(null);
      } finally {
        setIsCheckingUser(false);
      }
    };

    getCurrentUser();
  }, []);

  const getDashboardLink = () => {
    if (user?.role === "doctor") {
      return "/doctor/dashboard";
    }

    return "/patient/dashboard";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setUser(null);
        setIsOpen(false);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#49769F]/20 bg-[#BDD8E9]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#001D39] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0A4174]">
            <HeartPulse
              size={22}
              className="text-[#BDD8E9] transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <span className="text-xl font-semibold tracking-tight text-[#001D39]">
            Care
            <span className="text-[#0A4174] transition-colors duration-300 group-hover:text-[#49769F]">
              Connect
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-[#001D39]/75 transition-colors duration-300 hover:text-[#0A4174] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#0A4174] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* =========================
            DESKTOP RIGHT SIDE
        ========================== */}
        <div className="hidden items-center gap-4 lg:flex">

          {isCheckingUser ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-[#A8C9DD]/60" />
          ) : user ? (
            <>
              {/* Dashboard */}
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#001D39] transition hover:bg-white/40 hover:text-[#0A4174]"
              >
                <UserRound size={17} />
                Dashboard
              </Link>

              {/* User */}
              <div className="flex items-center gap-3 border-l border-[#49769F]/20 pl-4">
                <div className="text-right">
                  <p className="max-w-[130px] truncate text-sm font-semibold text-[#001D39]">
                    {user.fullName}
                  </p>

                  <p className="text-[11px] capitalize text-[#49769F]">
                    {user.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526F7F] transition hover:bg-[#F7EAEA] hover:text-[#A64C4C]"
                >
                  <LogOut size={17} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="text-sm font-semibold text-[#001D39] transition-colors duration-300 hover:text-[#0A4174]"
              >
                Log in
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="rounded-xl bg-[#001D39] px-5 py-2.5 text-sm font-medium text-[#BDD8E9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0A4174] hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#001D39] transition-all duration-300 hover:bg-[#7BBDE8]/40 hover:text-[#0A4174] lg:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        className={`overflow-hidden border-t border-[#49769F]/20 bg-[#BDD8E9] transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <div className="flex flex-col gap-1">

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#001D39]/80 transition-all duration-300 hover:bg-[#7BBDE8]/40 hover:text-[#0A4174]"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-3 h-px bg-[#49769F]/20" />

            {isCheckingUser ? (
              <div className="px-4 py-3 text-sm text-[#49769F]">
                Loading...
              </div>
            ) : user ? (
              <>
                {/* Mobile User */}
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/30 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001D39] text-[#BDD8E9]">
                    <UserRound size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#001D39]">
                      {user.fullName}
                    </p>

                    <p className="text-[11px] capitalize text-[#49769F]">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Dashboard */}
                <Link
                  href={getDashboardLink()}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#001D39] transition-all hover:bg-[#7BBDE8]/40 hover:text-[#0A4174]"
                >
                  Dashboard
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#A64C4C] transition-all hover:bg-[#F7EAEA]"
                >
                  <LogOut size={17} />
                  Log out
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#001D39] transition-all duration-300 hover:bg-[#7BBDE8]/40 hover:text-[#0A4174]"
                >
                  Log in
                </Link>

                {/* Register */}
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-xl bg-[#001D39] px-5 py-3 text-center text-sm font-medium text-[#BDD8E9] shadow-sm transition-all duration-300 hover:bg-[#0A4174]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;