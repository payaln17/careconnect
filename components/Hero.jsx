import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pt-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[32px] bg-[#F7F5F1] px-6 py-10 md:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">

        {/* LEFT CONTENT */}
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#5F8F8B] shadow-sm">
            <HeartPulse size={16} />
            Simple. Secure. Connected Healthcare.
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-[#2F3E46] md:text-5xl lg:text-6xl">
            Healthcare that feels
            <span className="block text-[#5F8F8B]">more connected.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#68757A] md:text-lg">
            Find trusted doctors, book appointments effortlessly, and manage
            your healthcare journey through one simple digital platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/doctors"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5F8F8B] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#4E7C78] hover:shadow-md"
            >
              Find a Doctor
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D7DED9] bg-white px-6 py-3.5 text-sm font-medium text-[#2F3E46] transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <CalendarDays size={18} />
              Book Appointment
            </Link>
          </div>

          {/* MINI TRUST ITEMS */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#59656A]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#5F8F8B]" />
              Secure platform
            </div>

            <div className="flex items-center gap-2">
              <Stethoscope size={18} className="text-[#5F8F8B]" />
              Trusted specialists
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative min-h-[430px]">

          {/* Decorative background */}
          <div className="absolute right-0 top-4 h-72 w-72 rounded-full bg-[#DCEAF7]" />
          <div className="absolute bottom-0 left-4 h-52 w-52 rounded-full bg-[#E3EDE7]" />
          <div className="absolute right-12 top-20 h-28 w-28 rounded-full bg-[#F3DDD2]" />

          {/* Main doctor visual */}
          <div className="absolute left-1/2 top-1/2 flex h-[360px] w-[280px] -translate-x-1/2 -translate-y-1/2 items-end justify-center overflow-hidden rounded-[36px] bg-white shadow-lg md:h-[390px] md:w-[310px]">

            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#EEF5F2] to-[#DCEBE4] px-6 text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                <Stethoscope size={44} className="text-[#5F8F8B]" />
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#7C918C]">
                CareConnect
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-[#2F3E46]">
                Better care starts with better connection.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6C777B]">
                Discover doctors and manage appointments from one place.
              </p>
            </div>
          </div>

          {/* Floating card 1 */}
          <div className="absolute left-0 top-12 w-48 rounded-2xl bg-white p-4 shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4EFEA]">
              <Stethoscope size={19} className="text-[#5F8F8B]" />
            </div>

            <p className="text-sm font-semibold text-[#2F3E46]">
              Trusted Doctors
            </p>

            <p className="mt-1 text-xs leading-5 text-[#7B878B]">
              Find the right specialist for your healthcare needs.
            </p>
          </div>

          {/* Floating card 2 */}
          <div className="absolute bottom-10 right-0 w-52 rounded-2xl bg-white p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8E5DC]">
                <CalendarDays size={20} className="text-[#B77B69]" />
              </div>

              <div>
                <p className="text-xs text-[#8B9395]">Next Appointment</p>
                <p className="text-sm font-semibold text-[#2F3E46]">
                  Today, 4:30 PM
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;