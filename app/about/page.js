"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

import {
  ArrowDownRight,
  ArrowUpRight,
  HeartPulse,
  MoveUpRight,
  Plus,
  Sparkles,
} from "lucide-react";

const principles = [
  {
    number: "01",
    title: "People before processes.",
    description:
      "Healthcare can already feel overwhelming. We believe the digital experience should feel clear, thoughtful, and easy to navigate.",
  },
  {
    number: "02",
    title: "Clarity creates confidence.",
    description:
      "From exploring doctors to managing appointments, we aim to make every step easier to understand.",
  },
  {
    number: "03",
    title: "Technology with purpose.",
    description:
      "We bring useful healthcare features together to create a more connected experience for patients and doctors.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#F7FAFC] text-[#001D39]">

      <Navbar />

      {/* Editorial Intro */}
      {/* Editorial Intro with Background Image */}
<section className="relative isolate overflow-hidden border-b border-[#001D39]/10">

  {/* Background Image */}
  <div
    aria-hidden="true"
    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/aboutbg.jpg')",
    }}
  />

  {/* Light Overlay for Readability */}
  <div
    aria-hidden="true"
    className="absolute inset-0 -z-10 bg-white/65"
  />

  <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-12">

    {/* Top Label */}
    <div className="flex items-center justify-between gap-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#49769F] sm:text-xs">
        CareConnect / Our Story
      </p>

      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#49769F] sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0A4174]" />
        About Us
      </span>
    </div>

    {/* Main Content */}
    <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12 md:items-end md:gap-5">

      <div className="md:col-span-9">
        <p className="mb-5 text-sm font-medium text-[#49769F] sm:text-base">
          A little more care. A little less complexity.
        </p>

        <h1 className="max-w-5xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#001D39] sm:text-5xl md:text-6xl lg:text-7xl">
          Healthcare,
          <br />
          <span className="text-[#49769F]">
            thoughtfully
          </span>{" "}
          connected.
        </h1>
      </div>

      <div className="md:col-span-3 md:pb-2">
        <div className="mb-5 h-px w-14 bg-[#49769F]" />

        <p className="max-w-xs text-sm leading-7 text-[#34556F] sm:text-base">
          We are building a simpler digital experience for people
          navigating their healthcare journey.
        </p>

        <a
          href="#our-story"
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#001D39] transition-all duration-300 hover:gap-4"
        >
          Get to know us
          <ArrowDownRight size={17} />
        </a>
      </div>
    </div>

    {/* Brand Signature */}
    <div className="mt-16 flex items-center gap-3 border-t border-[#001D39]/15 pt-5 sm:mt-24">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001D39] text-[#BDD8E9]">
        <HeartPulse size={19} />
      </div>

      <p className="text-xs tracking-wide text-[#34556F]">
        CareConnect — your health, our priority.
      </p>
    </div>
  </div>
</section>

      {/* Our Story — Asymmetrical Layout */}
      <section
        id="our-story"
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-12"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">

          <div className="md:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#49769F] sm:text-xs">
              01 / The Story
            </p>

            <h2 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Good healthcare starts with a better experience.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xl font-medium leading-relaxed tracking-tight text-[#001D39] sm:text-2xl sm:leading-relaxed">
              Finding the right doctor and keeping track of appointments
              should feel simple — not like another thing to worry about.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#526F7F] sm:text-base">
              That is the idea behind CareConnect. We bring doctor discovery,
              appointment management, and dedicated patient and doctor
              experiences into one digital platform.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#526F7F] sm:text-base">
              Our focus is on creating a platform that feels approachable,
              organised, and easy to use. Because the little details in a
              digital experience can make a meaningful difference in how
              people navigate their healthcare needs.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#49769F]/25 text-[#0A4174]">
                <Sparkles size={18} />
              </span>

              <p className="text-xs font-medium tracking-wide text-[#49769F]">
                Thoughtful technology. Human-centred experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-[#E7F1F8]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
          <div className="grid gap-8 md:grid-cols-12 md:items-start">

            <div className="md:col-span-2">
              <span className="font-serif text-7xl leading-none text-[#49769F]/60">
                “
              </span>
            </div>

            <div className="md:col-span-9">
              <blockquote className="max-w-4xl font-serif text-3xl italic leading-snug tracking-tight text-[#001D39] sm:text-4xl md:text-5xl">
                Healthcare technology should make life feel simpler, more
                connected, and a little less overwhelming.
              </blockquote>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-9 bg-[#49769F]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#49769F] sm:text-xs">
                  The CareConnect Philosophy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles — Editorial Rows, Not Cards */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">

          <div className="md:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#49769F] sm:text-xs">
              02 / What Guides Us
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
              Our way of thinking.
            </h2>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#526F7F]">
              The principles behind the experience we want to create.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="group border-t border-[#001D39]/15 py-7 transition-colors duration-300 hover:border-[#49769F]"
              >
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="pt-1 text-xs tracking-widest text-[#49769F]">
                    {principle.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:text-[#0A4174] sm:text-2xl">
                      {principle.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#526F7F]">
                      {principle.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="mt-1 shrink-0 text-[#49769F] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </article>
            ))}

            <div className="border-t border-[#001D39]/15" />
          </div>
        </div>
      </section>

      {/* Platform Features — Minimal Numbered Strip */}
      <section className="border-y border-[#BDD8E9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#49769F] sm:text-xs">
                03 / The Experience
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Made for your journey.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#526F7F]">
              Useful features, brought together in one easy-to-navigate
              healthcare platform.
            </p>
          </div>

          <div className="mt-12 grid gap-0 sm:grid-cols-3">
            <div className="border-t border-[#001D39]/15 py-7 sm:pr-7">
              <span className="text-xs tracking-widest text-[#49769F]">
                01
              </span>

              <h3 className="mt-4 text-lg font-semibold">
                Discover doctors
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#526F7F]">
                Explore available doctor profiles through a clear interface.
              </p>

              <Link
                href="/doctors"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A4174] hover:gap-3"
              >
                Explore
                <MoveUpRight size={15} />
              </Link>
            </div>

            <div className="border-t border-[#001D39]/15 py-7 sm:border-l sm:px-7">
              <span className="text-xs tracking-widest text-[#49769F]">
                02
              </span>

              <h3 className="mt-4 text-lg font-semibold">
                Manage appointments
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#526F7F]">
                Access the platform's appointment features in one place.
              </p>

              <Link
                href="/appointments"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A4174] hover:gap-3"
              >
                Get started
                <MoveUpRight size={15} />
              </Link>
            </div>

            <div className="border-t border-[#001D39]/15 py-7 sm:border-l sm:pl-7">
              <span className="text-xs tracking-widest text-[#49769F]">
                03
              </span>

              <h3 className="mt-4 text-lg font-semibold">
                Stay organised
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#526F7F]">
                Use dedicated dashboard experiences for patients and doctors.
              </p>

              <Link
                href="/login"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A4174] hover:gap-3"
              >
                Sign in
                <MoveUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
       <section className="relative overflow-hidden bg-white">
  {/* Subtle background accent */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#BDD8E9]/40 blur-3xl"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#EAF4FA]/70 blur-3xl"
  />

  <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
    <div className="flex flex-col gap-8 rounded-3xl border border-[#BDD8E9]/70 bg-[#F5F9FC] p-7 sm:p-10 md:flex-row md:items-center md:justify-between md:p-12">
      {/* Text */}
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#49769F] sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0A4174]" />
          A better experience begins here
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#001D39] sm:text-4xl md:text-5xl">
          Your healthcare journey,
          <span className="mt-1 block text-[#49769F]">
            your way.
          </span>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#526F7F] sm:text-base">
          Explore CareConnect and discover a simpler way to navigate
          doctor discovery and appointment management.
        </p>
      </div>

      {/* CTA Button */}
      <div className="shrink-0">
        <Link
          href="/doctors"
          className="group inline-flex items-center justify-center gap-4 rounded-xl bg-[#001D39] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0A4174] hover:shadow-lg"
        >
          Explore CareConnect

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition duration-300 group-hover:bg-white/20">
            <Plus size={18} className="transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </Link>
      </div>
    </div>

    {/* Minimal footer note */}
    <div className="mt-8 flex flex-col gap-3 border-t border-[#001D39]/10 pt-5 text-xs text-[#526F7F] sm:flex-row sm:items-center sm:justify-between">
      <span>CareConnect · Your health, our priority.</span>

      <Link
        href="/help"
        className="inline-flex w-fit items-center gap-2 font-medium text-[#0A4174] transition hover:text-[#49769F]"
      >
        Need help?
        <ArrowUpRight size={14} />
      </Link>
    </div>
  </div>

  <Footer />
</section>
      
    </main>
  );
}