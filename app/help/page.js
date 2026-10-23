"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Search,
  CalendarCheck,
  UserRound,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  ChevronDown,
  MessageCircle,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    icon: UserRound,
    title: "Account & Login",
    description: "Manage your account, login and profile.",
    color: "bg-[#E3F0FF]",
    iconColor: "text-[#5B8CB8]",
  },
  {
    icon: CalendarCheck,
    title: "Appointments",
    description: "Booking, availability and appointment status.",
    color: "bg-[#FCEAE3]",
    iconColor: "text-[#C97963]",
  },
  {
    icon: Stethoscope,
    title: "Finding Doctors",
    description: "Search doctors and explore specialties.",
    color: "bg-[#E4F3EE]",
    iconColor: "text-[#5B927D]",
  },
  {
    icon: HeartPulse,
    title: "Health Navigator",
    description: "Understand how Smart Health Navigator works.",
    color: "bg-[#EAE7FA]",
    iconColor: "text-[#7768A8]",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description: "Learn about account and information security.",
    color: "bg-[#FFF2D9]",
    iconColor: "text-[#C4934B]",
  },
];

const faqs = [
  {
    category: "Account & Login",
    question: "How do I create a CareConnect account?",
    answer:
      "Click the Get Started or Register option and enter your required details such as your name, phone number, email address and password. Select the appropriate account role and complete the registration process.",
  },
  {
    category: "Account & Login",
    question: "I forgot my password. What should I do?",
    answer:
      "If you cannot remember your password, use the available account recovery option when provided. If password recovery is not available in the current version, contact the CareConnect administrator for assistance.",
  },
  {
    category: "Appointments",
    question: "How can I book an appointment?",
    answer:
      "Open the Find Doctors section, select a doctor, view their profile and choose Book Appointment. Select an available date and time, enter the reason for your visit and submit the appointment request.",
  },
  {
    category: "Appointments",
    question: "Why cannot I select a particular appointment slot?",
    answer:
      "A slot may be unavailable because the doctor is not available on that day or the selected time has already been booked. Try another available date or time.",
  },
  {
    category: "Appointments",
    question: "What does Pending appointment mean?",
    answer:
      "Pending means your appointment request has been submitted but has not yet been confirmed by the doctor.",
  },
  {
    category: "Appointments",
    question: "Where can I see my appointments?",
    answer:
      "After logging in as a patient, open My Appointments from your dashboard or navigation menu to view your appointment details and current status.",
  },
  {
    category: "Finding Doctors",
    question: "How can I find a doctor by specialty?",
    answer:
      "Go to Find Doctors and use the specialty filter or search options to find doctors based on their area of practice and other available information.",
  },
  {
    category: "Health Navigator",
    question: "Does Smart Health Navigator diagnose medical conditions?",
    answer:
      "No. Smart Health Navigator is a rule-based healthcare guidance feature. It provides general guidance based on the information entered by the user and is not a medical diagnosis.",
  },
  {
    category: "Health Navigator",
    question: "What should I do during a medical emergency?",
    answer:
      "Do not rely only on CareConnect during an emergency. Contact your local emergency services or visit the nearest emergency department immediately.",
  },
  {
    category: "Privacy & Security",
    question: "Is my password stored securely?",
    answer:
      "CareConnect is designed so that account passwords are processed securely rather than being stored as plain text.",
  },
  {
    category: "Privacy & Security",
    question: "Where can I read the Privacy Policy?",
    answer:
      "You can visit the Privacy Policy page from the website footer to learn more about how information is intended to be handled.",
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const categoriesWithAll = ["All", ...categories.map((item) => item.title)];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      faq.question.toLowerCase().includes(searchText) ||
      faq.answer.toLowerCase().includes(searchText) ||
      faq.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearch("");
    setOpenFaq(null);

    setTimeout(() => {
      document.getElementById("faq-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleFaqToggle = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setOpenFaq(null);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#344B5E]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F1F6F8] px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[#E3F0FF] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-24 h-72 w-72 rounded-full bg-[#E4F3EE] blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-white shadow-sm">
            <BookOpen size={26} strokeWidth={1.8} className="text-[#5B8CB8]" />
          </div>

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#5B8CB8]">
            CareConnect Support
          </p>

          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-[#344B5E] md:text-6xl">
            How can we{" "}
            <span className="italic text-[#5B8CB8]">help?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#71808C] md:text-base">
            Find answers about your account, appointments, doctors, health
            navigation and more.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-center rounded-[20px] border border-[#E1E8EC] bg-white px-4 py-2 shadow-[0_12px_35px_rgba(60,80,90,0.08)] focus-within:border-[#BFD7E7] focus-within:ring-4 focus-within:ring-[#E3F0FF]">
              <Search size={20} className="shrink-0 text-[#8B9AA4]" />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setOpenFaq(null);
                }}
                placeholder="Search for answers..."
                className="w-full bg-transparent px-3 py-3 text-sm text-[#344B5E] outline-none placeholder:text-[#A4AFB6]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-[#5B8CB8] hover:bg-[#F1F6F8]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#5B8CB8]">
              Browse Help
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#344B5E] md:text-4xl">
              What do you need help with?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.title;

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => handleCategoryClick(category.title)}
                  className={`group rounded-[26px] border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isActive
                      ? "border-[#BFD7E7] shadow-md"
                      : "border-[#EAEFF2]"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${category.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={21} className={category.iconColor} />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-[#344B5E]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#7C8992]">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#5B8CB8]">
                    Explore
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq-section"
        className="scroll-mt-20 bg-[#F7F9FA] px-4 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#C97963]">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#344B5E] md:text-4xl">
              Answers to common questions
            </h2>
          </div>

          {/* Filters */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categoriesWithAll.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenFaq(null);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#344B5E] text-white"
                      : "border border-[#E1E7EA] bg-white text-[#6F7E88] hover:bg-[#F1F5F6]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* FAQ List */}
          <div className="mt-6 space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[22px] border border-[#E6ECEF] bg-white transition-shadow hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9AA6AE]">
                          {faq.category}
                        </span>

                        <h3 className="mt-1 text-sm font-semibold text-[#344B5E] md:text-base">
                          {faq.question}
                        </h3>
                      </div>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F6F7] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown size={16} className="text-[#5B8CB8]" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-[#EEF1F3] px-5 pb-5 pt-4 text-sm leading-7 text-[#71808C] md:px-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-[24px] border border-[#E6ECEF] bg-white px-6 py-12 text-center">
                <Search size={28} className="mx-auto text-[#B0BBC2]" />

                <h3 className="mt-4 font-serif text-xl font-semibold text-[#344B5E]">
                  No answers found
                </h3>

                <p className="mt-2 text-sm text-[#7C8992]">
                  Try a different search term or browse another category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#344B5E] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#2A3D4D]"
                >
                  View all questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] bg-[#405E5A] px-6 py-12 text-center md:px-10 md:py-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#BFD8CE]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[#E2F0E8]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <MessageCircle size={23} className="text-[#BFD8CE]" />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-medium text-white md:text-4xl">
              Still need some help?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#D7E5DF]">
              If you cannot find the answer you are looking for, reach out to
              the CareConnect support team.
            </p>

            <a
              href="mailto:support@careconnect.com"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#405E5A] transition hover:-translate-y-1 hover:shadow-xl"
            >
              Contact Support
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}