import {
  UserRoundPlus,
  Search,
  CalendarCheck2,
  HeartPulse,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in just a few moments and create your personal CareConnect profile.",
    icon: UserRoundPlus,
    color: "bg-[#EEE8FA]",
    iconColor: "text-[#8064A2]",
  },
  {
    number: "02",
    title: "Find the right doctor",
    description:
      "Browse specialists and discover the healthcare professional that fits your needs.",
    icon: Search,
    color: "bg-[#E4F1FA]",
    iconColor: "text-[#5D86A6]",
  },
  {
    number: "03",
    title: "Book your appointment",
    description:
      "Choose a suitable date and time and confirm your appointment with ease.",
    icon: CalendarCheck2,
    color: "bg-[#FFF0E5]",
    iconColor: "text-[#B77B52]",
  },
  {
    number: "04",
    title: "Begin your care journey",
    description:
      "Stay organised and connected while managing your healthcare journey.",
    icon: HeartPulse,
    color: "bg-[#E5F2EB]",
    iconColor: "text-[#5F8F73]",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F7F4FC] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8064A2]">
              Simple Process
            </p>

            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#40354A] md:text-5xl">
              Healthcare made simple,
              <br />
              one step at a time.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#766D7C] md:text-right">
            From finding a doctor to managing your appointment, everything is
            designed to feel easy and effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-[30px] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Number */}
                <span className="text-5xl font-serif text-[#E7E0F1]">
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`mt-7 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}
                >
                  <Icon size={25} className={step.iconColor} />
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold text-[#40354A]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#766D7C]">
                  {step.description}
                </p>

                <div
                  className={`absolute -bottom-10 -right-10 h-28 w-28 rounded-full ${step.color} opacity-60`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;