"use client";

import {
  Clock3,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Check,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    icon: Clock3,
    title: "Save valuable time",
    description:
      "Discover doctors, check availability and manage appointments without unnecessary waiting.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy comes first",
    description:
      "CareConnect is designed with secure healthcare information management and privacy in mind.",
  },
  {
    icon: HeartHandshake,
    title: "Care that feels personal",
    description:
      "Keep your healthcare journey organised while staying connected with the right professionals.",
  },
];

const highlights = [
  "Easy doctor discovery",
  "Simple appointment booking",
  "Organised healthcare journey",
];

const WhyChoose = () => {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9] px-4 py-20 md:px-8 md:py-28">
      
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#FCEAE3]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E3F0FF]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* TOP LABEL */}
        <div className="mb-12 text-center md:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C97963]">
            Why CareConnect
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-[#344B5E] md:text-5xl lg:text-6xl">
            Healthcare that feels
            <span className="block italic text-[#C97963]">
              a little more human.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#71808C] md:text-base">
            From finding the right doctor to managing appointments,
            CareConnect keeps everyday healthcare simple, calm and organised.
          </p>
        </div>

        {/* MAIN FEATURE AREA */}
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT VISUAL */}
          <div className="relative min-h-[500px] overflow-hidden rounded-[38px] bg-[#F8D8CC] p-5 md:p-7">

            {/* Decorative circles */}
            <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#FFEFE9]" />

            <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#EFAF9D]/30" />

            <div className="absolute right-10 top-10 h-20 w-20 rounded-full border border-white/50" />

            {/* Floating mini badge */}
            <div className="absolute right-6 top-6 z-10 hidden items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#66504A] shadow-sm backdrop-blur md:flex">
              <span className="h-2 w-2 rounded-full bg-[#82A98D]" />
              Care made simple
            </div>

            {/* Main white card */}
            <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-white p-7 shadow-[0_25px_70px_rgba(90,60,50,0.14)] md:p-9">

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FCEAE3]">
                <Sparkles
                  size={25}
                  strokeWidth={1.8}
                  className="text-[#C97963]"
                />
              </div>

              <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C97963]">
                CARE, SIMPLIFIED
              </p>

              <h3 className="mt-3 max-w-md font-serif text-3xl font-semibold leading-tight text-[#553F3A] md:text-4xl">
                Less stress.
                <span className="block italic">
                  More care.
                </span>
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#806B65]">
                CareConnect brings essential healthcare services together
                in one calm and easy-to-use digital space.
              </p>

              {/* Highlights */}
              <div className="mt-7 space-y-3">
                {highlights.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FCEAE3]">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="text-[#C97963]"
                      />
                    </div>

                    <span className="text-sm font-medium text-[#664F49]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom decorative line */}
              <div className="mt-8 h-px w-full bg-[#F1E7E3]" />

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-[#9A8881]">
                  Your healthcare journey
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F4F2]">
                  <ArrowUpRight
                    size={16}
                    className="text-[#C97963]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center rounded-[38px] border border-[#EEF0F2] bg-white p-7 md:p-10 lg:p-14">

            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#5B8CB8]">
              Designed around you
            </p>

            <h3 className="mt-5 max-w-xl font-serif text-3xl font-medium leading-tight text-[#344B5E] md:text-4xl">
              A better way to manage
              <span className="block italic text-[#5B8CB8]">
                your healthcare.
              </span>
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#71808C] md:text-base">
              We believe healthcare technology should make life easier,
              not add another layer of complexity. That's why CareConnect
              keeps important healthcare tasks clear and accessible.
            </p>

            {/* Benefits */}
            <div className="mt-9 divide-y divide-[#EEF0F2]">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex gap-4 py-6 first:pt-0 last:pb-0"
                  >
                    {/* Number */}
                    <span className="mt-1 w-6 shrink-0 font-serif text-sm italic text-[#B9C2C8]">
                      0{index + 1}
                    </span>

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#F8FAFB] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#EAF3F9]">
                      <Icon
                        size={21}
                        strokeWidth={1.8}
                        className="text-[#5B8CB8]"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-[#344B5E]">
                        {benefit.title}
                      </h4>

                      <p className="mt-2 max-w-lg text-sm leading-6 text-[#7C8992]">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden h-8 w-8 items-center justify-center self-center rounded-full bg-[#F8FAFB] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:flex">
                      <ArrowUpRight
                        size={14}
                        className="text-[#5B8CB8]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom trust line */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#EEF0F2] pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-[#82A98D]"
                />
                <span className="text-xs font-medium text-[#65737E]">
                  Privacy focused
                </span>
              </div>

              <div className="h-1 w-1 rounded-full bg-[#CDD4D9]" />

              <div className="flex items-center gap-2">
                <HeartHandshake
                  size={17}
                  className="text-[#C97963]"
                />
                <span className="text-xs font-medium text-[#65737E]">
                  Patient centered
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;