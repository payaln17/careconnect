"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowLeft,
  MapPin,
  BriefcaseMedical,
  GraduationCap,
  Building2,
  CalendarDays,
  Clock3,
  IndianRupee,
  Star,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch("/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Unable to load doctor");
        }

        const foundDoctor = result.doctors.find(
          (item) => item._id === params.id
        );

        if (!foundDoctor) {
          setError("Doctor not found.");
          return;
        }

        setDoctor(foundDoctor);
      } catch (error) {
        console.error("Doctor profile error:", error);
        setError("Unable to load doctor profile.");
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.id) {
      fetchDoctor();
    }
  }, [params?.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FCFBF9]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <LoaderCircle
              size={38}
              className="mx-auto animate-spin text-[#5D86A6]"
            />

            <p className="mt-4 text-sm text-[#7E7772]">
              Loading doctor profile...
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !doctor) {
    return (
      <main className="min-h-screen bg-[#FCFBF9]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF2F8]">
              <BriefcaseMedical
                size={32}
                className="text-[#5D86A6]"
              />
            </div>

            <h1 className="mt-6 font-serif text-3xl text-[#473C36]">
              Doctor not found
            </h1>

            <p className="mt-2 text-sm text-[#8C847E]">
              We couldn't find this doctor profile.
            </p>

            <button
              type="button"
              onClick={() => router.push("/doctors")}
              className="mt-6 rounded-2xl bg-[#527D6C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#446B5D]"
            >
              Back to Doctors
            </button>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />

      {/* TOP */}
      <section className="px-4 pb-8 pt-8 sm:px-6 md:px-8 md:pb-12 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#668394] transition hover:text-[#3F6678]"
          >
            <ArrowLeft size={17} />
            Back to doctors
          </Link>
        </div>
      </section>

      {/* PROFILE HERO */}
      <section className="px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-[#E9E5DF] bg-white shadow-sm">
          <div className="h-32 bg-[#EAF2F8] sm:h-40 md:h-48" />

          <div className="px-5 pb-8 sm:px-8 md:px-12 md:pb-10">
            <div className="-mt-16 flex flex-col gap-6 sm:-mt-20 md:flex-row md:items-end md:justify-between">
              
              {/* Profile image */}
              <div className="flex items-end gap-5">
                <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-[28px] border-4 border-white bg-[#E5F1EB] shadow-md sm:h-40 sm:w-40">
                  {doctor.profileImage ? (
                    <img
                      src={doctor.profileImage}
                      alt={doctor.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-serif text-5xl font-semibold text-[#527D6C]">
                      {doctor.fullName
                        .replace("Dr. ", "")
                        .charAt(0)}
                    </span>
                  )}
                </div>

                <div className="pb-1 md:hidden">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4F3E8] px-3 py-1.5 text-xs font-semibold text-[#568167]">
                    <ShieldCheck size={14} />
                    Verified
                  </span>
                </div>
              </div>

              {/* Desktop verified */}
              <div className="hidden md:block">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4F3E8] px-4 py-2 text-sm font-semibold text-[#568167]">
                  <ShieldCheck size={16} />
                  Verified Doctor
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-semibold text-[#3E4747] sm:text-4xl md:text-5xl">
                    {doctor.fullName}
                  </h1>

                  <p className="mt-2 text-base font-medium text-[#6E9387] sm:text-lg">
                    {doctor.specialization}
                  </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-full bg-[#FFF4D9] px-4 py-2 text-sm font-semibold text-[#B78531]">
                  <Star size={17} fill="currentColor" />
                  {doctor.rating || "4.8"}
                  <span className="font-normal text-[#B99D6B]">
                    / 5
                  </span>
                </div>
              </div>
            </div>

            {/* Quick information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[#F8F8F6] p-4">
                <div className="flex items-center gap-3">
                  <BriefcaseMedical
                    size={20}
                    className="text-[#6E9387]"
                  />

                  <div>
                    <p className="text-xs text-[#99938D]">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                      {doctor.experience} Years
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F8F8F6] p-4">
                <div className="flex items-center gap-3">
                  <GraduationCap
                    size={20}
                    className="text-[#6E9387]"
                  />

                  <div>
                    <p className="text-xs text-[#99938D]">
                      Qualification
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                      {doctor.qualification}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F8F8F6] p-4">
                <div className="flex items-center gap-3">
                  <Building2
                    size={20}
                    className="text-[#6E9387]"
                  />

                  <div>
                    <p className="text-xs text-[#99938D]">
                      Hospital
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                      {doctor.hospital}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F8F8F6] p-4">
                <div className="flex items-center gap-3">
                  <IndianRupee
                    size={20}
                    className="text-[#6E9387]"
                  />

                  <div>
                    <p className="text-xs text-[#99938D]">
                      Consultation
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                      ₹{doctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-4 pb-16 sm:px-6 md:px-8 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
          
          {/* About */}
          <div className="rounded-[28px] border border-[#E9E5DF] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47658]">
              About the doctor
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#473C36]">
              Professional profile
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#74706C] sm:text-base">
              {doctor.about ||
                "This doctor provides professional healthcare services with a focus on quality patient care."}
            </p>

            {/* Location */}
            <div className="mt-8 border-t border-[#EEEAE5] pt-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2F8]">
                  <MapPin
                    size={20}
                    className="text-[#5D86A6]"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-[#99938D]">
                    Clinic / Hospital Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                    {doctor.hospital}
                  </p>

                  <p className="mt-1 text-sm text-[#7E7772]">
                    {doctor.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="h-fit rounded-[28px] border border-[#E9E5DF] bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7B9A92]">
              Availability
            </p>

            <h2 className="mt-3 font-serif text-2xl font-medium text-[#473C36]">
              Consultation hours
            </h2>

            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E4F1EB]">
                <CalendarDays
                  size={20}
                  className="text-[#527D6C]"
                />
              </div>

              <div>
                <p className="text-xs text-[#99938D]">
                  Available days
                </p>

                <p className="mt-1 text-sm font-semibold leading-6 text-[#4D5757]">
                  {doctor.availableDays?.length
                    ? doctor.availableDays.join(", ")
                    : "Schedule not available"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F8EDE3]">
                <Clock3
                  size={20}
                  className="text-[#A47658]"
                />
              </div>

              <div>
                <p className="text-xs text-[#99938D]">
                  Consultation time
                </p>

                <p className="mt-1 text-sm font-semibold text-[#4D5757]">
                  {doctor.availableTime ||
                    "Time schedule not available"}
                </p>
              </div>
            </div>

            {/* Book */}
            <Link
              href={`/appointment?doctor=${doctor._id}`}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#527D6C] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#446B5D] hover:shadow-lg"
            >
              <CalendarDays size={18} />
              Book Appointment
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-[#99938D]">
              Choose your preferred date and time on the next step.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}