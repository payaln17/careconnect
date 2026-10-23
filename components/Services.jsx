import {
  CalendarDays,
  FileHeart,
  MessageCircleHeart,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Find Doctors",
    description:
      "Discover trusted healthcare specialists based on your needs and preferences.",
    bg: "bg-[#E8F1F8]",
    iconColor: "text-[#5E8BA8]",
  },
  {
    icon: CalendarDays,
    title: "Easy Appointments",
    description:
      "Book appointments quickly and manage your schedule without the long wait.",
    bg: "bg-[#E4EFEA]",
    iconColor: "text-[#5F8F8B]",
  },
  {
    icon: FileHeart,
    title: "Health Records",
    description:
      "Keep your healthcare information organised and accessible in one place.",
    bg: "bg-[#F8E5DC]",
    iconColor: "text-[#B77B69]",
  },
  {
    icon: MessageCircleHeart,
    title: "Better Connection",
    description:
      "Stay connected with doctors and manage your healthcare journey with ease.",
    bg: "bg-[#F3EDE2]",
    iconColor: "text-[#9B7B55]",
  },
];

const Services = () => {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5F8F8B]">
            Our Services
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#2F3E46] md:text-5xl">
            Everything you need for
            <span className="block text-[#5F8F8B]">better care.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#748084]">
            CareConnect brings essential healthcare services together into one
            simple and convenient digital experience.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-[28px] border border-[#EEEAE4] bg-white p-6 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.bg}`}
                >
                  <Icon size={25} className={service.iconColor} />
                </div>

                <h3 className="mt-7 text-xl font-semibold text-[#2F3E46]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#748084]">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F5F1] transition group-hover:bg-[#5F8F8B]">
                  <ArrowUpRight
                    size={17}
                    className="text-[#5F8F8B] transition group-hover:text-white"
                  />
                </div>

                {/* Decorative circle */}
                <div
                  className={`absolute -bottom-12 -right-12 h-28 w-28 rounded-full ${service.bg} opacity-40`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;