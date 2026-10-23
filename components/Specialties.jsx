"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  ArrowUpRight,
  X,
  Search,
} from "lucide-react";

const specialties = [
  {
    name: "Cardiology",
    icon: Heart,
    bg: "bg-[#FFE8E5]",
    color: "text-[#D87870]",
    description:
      "Cardiology focuses on the heart and circulatory system. Cardiologists help with heart-related concerns such as chest discomfort, blood pressure, irregular heartbeat and other cardiovascular conditions.",
    care: [
      "Heart health",
      "Blood pressure",
      "Irregular heartbeat",
      "Chest discomfort",
    ],
  },
  {
    name: "Neurology",
    icon: Brain,
    bg: "bg-[#EAE7FF]",
    color: "text-[#786AB8]",
    description:
      "Neurology focuses on the brain, spinal cord and nerves. Neurologists evaluate concerns such as headaches, migraine, dizziness, memory problems and nerve-related conditions.",
    care: [
      "Headaches & migraine",
      "Dizziness",
      "Memory concerns",
      "Nerve-related problems",
    ],
  },
  {
    name: "Orthopedics",
    icon: Bone,
    bg: "bg-[#E4F3EE]",
    color: "text-[#5B927D]",
    description:
      "Orthopedics focuses on the bones, joints, muscles and movement. Orthopedic specialists help with injuries, joint pain, back problems and musculoskeletal concerns.",
    care: [
      "Joint pain",
      "Back & neck pain",
      "Sports injuries",
      "Bone & muscle problems",
    ],
  },
  {
    name: "Pediatrics",
    icon: Baby,
    bg: "bg-[#FFF2D9]",
    color: "text-[#C4934B]",
    description:
      "Pediatrics provides healthcare for infants, children and teenagers, including routine health concerns, growth and development and common childhood illnesses.",
    care: [
      "Child health",
      "Growth & development",
      "Common childhood illnesses",
      "Routine checkups",
    ],
  },
  {
    name: "Ophthalmology",
    icon: Eye,
    bg: "bg-[#E3F0FF]",
    color: "text-[#5B8CB8]",
    description:
      "Ophthalmology focuses on eye health and vision. Eye specialists evaluate vision problems, eye discomfort and various eye-related conditions.",
    care: [
      "Vision problems",
      "Eye discomfort",
      "Eye examinations",
      "Eye health",
    ],
  },
  {
    name: "General Care",
    icon: Stethoscope,
    bg: "bg-[#FBE5EF]",
    color: "text-[#B56A8B]",
    description:
      "General care is a good starting point for common health concerns. General physicians can assess symptoms and guide patients toward appropriate care or specialist consultation.",
    care: [
      "Fever & weakness",
      "Cough & cold",
      "General health concerns",
      "Initial health assessment",
    ],
  },
];

const Specialties = () => {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const handleFindDoctors = (specialty) => {
    setSelectedSpecialty(null);

    router.push(
      `/doctors?specialization=${encodeURIComponent(
        specialty.name
      )}`
    );
  };

  return (
    <>
      <section className="bg-[#FCFBF9] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5B8CB8]">
                Explore Care
              </p>

              <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-[#344B5E] md:text-5xl">
                Find the care you
                <span className="block italic text-[#5B8CB8]">
                  are looking for.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#71808C] md:text-base">
                Explore different areas of healthcare and find the right
                specialist for your needs.
              </p>
            </div>

            <button
              onClick={() => router.push("/doctors")}
              className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#344B5E]"
            >
              View all doctors

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F0FF] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#D7E9F8]">
                <ArrowUpRight
                  size={17}
                  className="text-[#5B8CB8]"
                />
              </span>
            </button>
          </div>

          {/* Specialty Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;

              return (
                <button
                  key={specialty.name}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className="group flex min-h-[195px] cursor-pointer flex-col justify-between rounded-[28px] border border-[#EEF0F2] bg-white p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:border-[#D8E5EE] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#BFD7E8]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${specialty.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      size={23}
                      className={specialty.color}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#344B5E]">
                      {specialty.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#8A969F]">
                      Explore specialty
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="h-[2px] w-8 rounded-full bg-[#DDEAF4] transition-all duration-300 group-hover:w-14" />

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F6F8FA] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        <ArrowUpRight
                          size={14}
                          className="text-[#5B8CB8]"
                        />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialty Information Modal */}
      {selectedSpecialty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E293B]/40 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedSpecialty(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedSpecialty(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F6F7] text-[#65737E] transition hover:bg-[#E9EDF0]"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${selectedSpecialty.bg}`}
            >
              <selectedSpecialty.icon
                size={29}
                className={selectedSpecialty.color}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#5B8CB8]">
              Specialty
            </p>

            <h3 className="mt-2 font-serif text-3xl font-semibold text-[#344B5E]">
              {selectedSpecialty.name}
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#71808C]">
              {selectedSpecialty.description}
            </p>

            {/* Common care */}
            <div className="mt-7">
              <h4 className="text-sm font-bold text-[#344B5E]">
                Common areas of care
              </h4>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedSpecialty.care.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#F8FAFB] px-4 py-3 text-sm text-[#596A76]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleFindDoctors(selectedSpecialty)}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#344B5E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#2A3D4D]"
            >
              <Search size={17} />
              Find {selectedSpecialty.name} Doctors
              <ArrowUpRight size={17} />
            </button>

            <p className="mt-3 text-center text-[11px] leading-5 text-[#9AA4AA]">
              This information is for general guidance and does not replace
              professional medical advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Specialties;