import { Users, Stethoscope, CalendarCheck, Headphones } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "1K+",
    label: "Happy Patients",
    bg: "bg-[#E8F1F8]",
  },
  {
    icon: Stethoscope,
    number: "50+",
    label: "Expert Doctors",
    bg: "bg-[#E4EFEA]",
  },
  {
    icon: CalendarCheck,
    number: "500+",
    label: "Appointments",
    bg: "bg-[#F8E5DC]",
  },
  {
    icon: Headphones,
    number: "24/7",
    label: "Support Available",
    bg: "bg-[#F3EDE2]",
  },
];

const Stats = () => {
  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-3xl border border-[#EEEAE4] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md md:p-6"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}
              >
                <Icon size={22} className="text-[#5F8F8B]" />
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-[#2F3E46]">
                {stat.number}
              </h3>

              <p className="mt-1 text-sm text-[#7B878B]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;