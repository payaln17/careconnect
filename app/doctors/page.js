"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  BriefcaseMedical,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const cardColors = [
  "bg-[#FCE8EE]",
  "bg-[#E8EEF9]",
  "bg-[#F8EDE3]",
  "bg-[#E5F1EB]",
  "bg-[#F1EAF8]",
  "bg-[#E7F2F5]",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState("All Specialties");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const result = await response.json();

        if (result.success) {
          setDoctors(result.doctors);
        } else {
          setError(result.message || "Unable to load doctors");
        }
      } catch (error) {
        console.error("Fetch doctors error:", error);
        setError("Unable to load doctors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = [
    "All Specialties",
    ...Array.from(
      new Set(doctors.map((doctor) => doctor.specialization))
    ),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      doctor.fullName.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query) ||
      doctor.location.toLowerCase().includes(query);

    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialization === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  const getAvailability = (doctor) => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    return doctor.availableDays?.includes(today);
  };

  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />

      {/* HERO */}
      <section className="px-4 pb-12 pt-8 sm:px-6 md:px-8 md:pb-16 md:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] bg-[#EAF2F8] px-5 py-12 sm:px-8 md:rounded-[36px] md:px-12 md:py-20">

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D8E8F2] sm:h-52 sm:w-52" />

            <div className="absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-[#DCEBE3] sm:left-12 sm:h-52 sm:w-52" />

            <div className="relative mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5D86A6] sm:text-xs sm:tracking-[0.25em]">
                Find Your Specialist
              </p>

              <h1 className="mt-5 font-serif text-4xl font-medium leading-tight text-[#344B5E] sm:text-5xl md:text-6xl">
                The right care starts with
                <span className="block italic text-[#5D86A6]">
                  the right doctor.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#687C8B] sm:text-base">
                Browse experienced healthcare professionals and discover the
                right specialist for your healthcare needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTER */}
      <section className="px-4 pb-6 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[24px] border border-[#ECE9E4] bg-white p-4 shadow-sm sm:p-5 md:rounded-[28px]">

            <div className="flex flex-col gap-4 lg:flex-row">

              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9698]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor, specialty or location..."
                  className="w-full rounded-2xl bg-[#F8F8F6] py-4 pl-12 pr-4 text-sm text-[#344B5E] outline-none placeholder:text-[#9AA3A5] focus:ring-2 focus:ring-[#B9D3E5]"
                />
              </div>

              {/* Filter */}
              <div className="relative w-full lg:w-[290px]">
                <SlidersHorizontal
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6D8799]"
                />

                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-[#F8F8F6] py-4 pl-11 pr-11 text-sm text-[#506572] outline-none focus:ring-2 focus:ring-[#B9D3E5]"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6D8799]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="px-4 py-10 sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47658]">
                Our Specialists
              </p>

              <h2 className="mt-3 font-serif text-3xl font-medium text-[#473C36] sm:text-4xl">
                Meet our trusted doctors.
              </h2>
            </div>

            {!isLoading && !error && (
              <p className="text-sm text-[#7E7772]">
                {filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DCE9F1] border-t-[#5D86A6]" />

              <p className="mt-4 text-sm text-[#7E7772]">
                Finding trusted doctors...
              </p>
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div className="rounded-[28px] bg-[#F8F5F1] px-5 py-16 text-center">
              <Search
                size={36}
                className="mx-auto text-[#B4AAA2]"
              />

              <h3 className="mt-5 font-serif text-2xl text-[#574C45]">
                Unable to load doctors
              </h3>

              <p className="mt-2 text-sm text-[#8C847E]">
                {error}
              </p>
            </div>
          )}

          {/* Doctor Cards */}
          {!isLoading && !error && filteredDoctors.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor, index) => {
                const isAvailable = getAvailability(doctor);

                return (
                  <article
                    key={doctor._id}
                    className="group overflow-hidden rounded-[28px] border border-[#ECE9E4] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div
                      className={`relative h-[260px] overflow-hidden ${
                        cardColors[index % cardColors.length]
                      }`}
                    >
                      {doctor.profileImage ? (
                        <img
                          src={doctor.profileImage}
                          alt={doctor.fullName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-serif font-semibold text-[#5D86A6] shadow-sm">
                            {doctor.fullName
                              .replace("Dr. ", "")
                              .charAt(0)}
                          </div>
                        </div>
                      )}

                      <div className="absolute left-4 top-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                            isAvailable
                              ? "bg-[#E4F3E8] text-[#568167]"
                              : "bg-[#F7E7E5] text-[#B06D64]"
                          }`}
                        >
                          {isAvailable
                            ? "Available Today"
                            : "Unavailable Today"}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-serif text-xl font-semibold text-[#3E4747]">
                            {doctor.fullName}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-[#7B9A92]">
                            {doctor.specialization}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF4D9] px-2.5 py-1 text-xs font-semibold text-[#B78531]">
                          <Star size={13} fill="currentColor" />
                          {doctor.rating || "4.8"}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#7A8585]">
                          <BriefcaseMedical
                            size={16}
                            className="shrink-0 text-[#7B9A92]"
                          />

                          <span>
                            {doctor.experience} Years Experience
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[#7A8585]">
                          <MapPin
                            size={16}
                            className="shrink-0 text-[#7B9A92]"
                          />

                          <span>{doctor.location}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
  <Link
    href={`/doctor/${doctor._id}`}
    className="flex w-full items-center justify-center rounded-2xl border border-[#D9E4E0] bg-white py-3.5 text-sm font-semibold text-[#527D6C] transition-all duration-300 hover:bg-[#F4F8F6]"
  >
    View Profile
  </Link>

  {isAvailable ? (
    <Link
      href={`/appointment?doctor=${doctor._id}`}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E4F1EB] py-3.5 text-sm font-semibold text-[#527D6C] transition-all duration-300 hover:bg-[#5F8F8B] hover:text-white"
    >
      <CalendarDays size={17} />
      Book Appointment
    </Link>
  ) : (
    <button
      type="button"
      disabled
      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-[#F1F0EE] py-3.5 text-sm font-semibold text-[#A5A5A2]"
    >
      <CalendarDays size={17} />
      Currently Unavailable
    </button>
  )}
</div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* No doctors */}
          {!isLoading && !error && filteredDoctors.length === 0 && (
            <div className="rounded-[28px] bg-[#F8F5F1] px-5 py-16 text-center sm:py-20">
              <Search
                size={36}
                className="mx-auto text-[#B4AAA2]"
              />

              <h3 className="mt-5 font-serif text-2xl text-[#574C45]">
                No doctors found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8C847E]">
                Try a different doctor name, location or specialty.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedSpecialty("All Specialties");
                }}
                className="mt-6 rounded-xl bg-[#E8EEF2] px-5 py-2.5 text-sm font-semibold text-[#557487] transition hover:bg-[#DCE9F1]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}