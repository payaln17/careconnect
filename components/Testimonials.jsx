"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CareConnect Patient",
    text: "Booking an appointment was surprisingly easy. The entire process felt simple, clean and stress-free.",
    color: "bg-[#FCE8EE]",
    accent: "text-[#B86B82]",
  },
  {
    name: "Rahul Mehta",
    role: "Regular Patient",
    text: "I love how everything is organised in one place. Finding the right doctor is much easier now.",
    color: "bg-[#EAE7FA]",
    accent: "text-[#7768A8]",
  },
  {
    name: "Ananya Kulkarni",
    role: "CareConnect User",
    text: "A simple platform with a beautiful experience. It makes managing appointments feel effortless.",
    color: "bg-[#E4F1FA]",
    accent: "text-[#5B8CB8]",
  },
  {
    name: "Riya Deshmukh",
    role: "CareConnect Patient",
    text: "The clean interface makes everything feel much less overwhelming. I can find what I need quickly.",
    color: "bg-[#FCEBDD]",
    accent: "text-[#C4875D]",
  },
  {
    name: "Aarav Joshi",
    role: "Regular Patient",
    text: "Finding doctors and checking appointment details in one place makes the whole process much easier.",
    color: "bg-[#E7F3ED]",
    accent: "text-[#67927E]",
  },
];

const Testimonials = () => {
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="overflow-hidden bg-[#FFFDFC] px-4 py-16 md:px-8 md:py-20">

      {/* Heading */}
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B86B82]">
            Patient Stories
          </p>

          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-[#4A3940] md:text-5xl">
            A little care can make
            <span className="block italic text-[#B86B82]">
              a big difference.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#7D6B72]">
            Hear from people who made their healthcare journey simpler
            with CareConnect.
          </p>
        </div>

        {/* Moving Testimonials */}
        <div className="relative mt-12">

          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#FFFDFC] to-transparent md:w-24" />

          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#FFFDFC] to-transparent md:w-24" />

          <div className="overflow-hidden">
            <div
              className="testimonial-track flex w-max gap-4"
              
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className={`w-[285px] shrink-0 rounded-[26px] ${testimonial.color} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:w-[310px] md:p-6`}
                >

                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <Quote
                      size={27}
                      strokeWidth={1.5}
                      className={testimonial.accent}
                    />

                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill="currentColor"
                          className={testimonial.accent}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <p className="mt-5 min-h-[105px] font-serif text-[17px] leading-7 text-[#4A3940]">
                    “{testimonial.text}”
                  </p>

                  {/* User */}
                  <div className="mt-5 flex items-center gap-3 border-t border-white/70 pt-4">

                    {/* Avatar */}
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 font-serif text-sm font-semibold ${testimonial.accent}`}
                    >
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#4A3940]">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-[#806E75]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Small bottom indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-1.5 w-7 rounded-full bg-[#B86B82]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#DCCED3]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#DCCED3]" />
        </div>
      </div>

     
    </section>
  );
};

export default Testimonials;