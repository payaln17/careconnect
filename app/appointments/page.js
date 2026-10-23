"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseMedical,
  Star,
  LoaderCircle,
  CalendarPlus,
  FileText,
  CheckCircle2,
  Clock4,
  XCircle,
  RefreshCw,
  ArrowRight,
  HeartPulse,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchAppointments = async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError("");

    try {
      const response = await fetch("/api/appointments", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "Unable to load appointments"
        );
        return;
      }

      if (result.success) {
        setAppointments(result.appointments || []);
      } else {
        setError(
          result.message || "Unable to load appointments"
        );
      }
    } catch (error) {
      console.error("Appointments error:", error);

      setError(
        "Unable to load appointments. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* --------------------------------
     Status
  -------------------------------- */

  const getStatusStyle = (status) => {
    if (status === "confirmed") {
      return {
        label: "Confirmed",
        className: "bg-[#E4F3E8] text-[#568167]",
        icon: CheckCircle2,
      };
    }

    if (status === "completed") {
      return {
        label: "Completed",
        className: "bg-[#E8EEF9] text-[#5D7898]",
        icon: CheckCircle2,
      };
    }

    if (status === "cancelled") {
      return {
        label: "Cancelled",
        className: "bg-[#F7E7E5] text-[#B06D64]",
        icon: XCircle,
      };
    }

    return {
      label: "Pending",
      className: "bg-[#FFF4D9] text-[#B78531]",
      icon: Clock4,
    };
  };

  /* --------------------------------
     Date
  -------------------------------- */

  const formatDate = (date) => {
    if (!date) return "Date not available";

    const [year, month, day] = date.split("-");

    const formatted = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return formatted.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* --------------------------------
     Filter Counts
  -------------------------------- */

  const counts = useMemo(() => {
    return {
      all: appointments.length,

      pending: appointments.filter(
        (item) => item.status === "pending"
      ).length,

      confirmed: appointments.filter(
        (item) => item.status === "confirmed"
      ).length,

      completed: appointments.filter(
        (item) => item.status === "completed"
      ).length,

      cancelled: appointments.filter(
        (item) => item.status === "cancelled"
      ).length,
    };
  }, [appointments]);

  /* --------------------------------
     Filtered Appointments
  -------------------------------- */

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.status === activeFilter
    );
  }, [appointments, activeFilter]);

  /* --------------------------------
     Upcoming
  -------------------------------- */

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "pending" ||
      appointment.status === "confirmed"
  );

  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />

      {/* ================================
          HEADER
      ================================= */}

      <section className="px-4 pb-8 pt-10 sm:px-6 md:px-8 md:pb-10 md:pt-14">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47658]">
                My Healthcare
              </p>

              <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#473C36] sm:text-5xl">
                My Appointments
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#7E7772] sm:text-base">
                Keep track of your consultations, upcoming
                bookings and appointment history in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <button
                type="button"
                onClick={() => fetchAppointments(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E4DFD8] bg-white px-4 py-3 text-sm font-semibold text-[#5E6664] transition hover:bg-[#F8F5F1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={17}
                  className={
                    isRefreshing
                      ? "animate-spin"
                      : ""
                  }
                />
                Refresh
              </button>

              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#527D6C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#446B5D] hover:shadow-lg"
              >
                <CalendarPlus size={18} />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          SUMMARY
      ================================= */}

      <section className="px-4 sm:px-6 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

          <SummaryCard
            label="Total"
            value={counts.all}
            icon={<CalendarDays size={19} />}
            iconClass="bg-[#EAF2F8] text-[#5D7898]"
          />

          <SummaryCard
            label="Upcoming"
            value={upcomingAppointments.length}
            icon={<Clock3 size={19} />}
            iconClass="bg-[#FFF4D9] text-[#B78531]"
          />

          <SummaryCard
            label="Completed"
            value={counts.completed}
            icon={<CheckCircle2 size={19} />}
            iconClass="bg-[#E4F3E8] text-[#568167]"
          />

          <SummaryCard
            label="Cancelled"
            value={counts.cancelled}
            icon={<XCircle size={19} />}
            iconClass="bg-[#F7E7E5] text-[#B06D64]"
          />
        </div>
      </section>

      {/* ================================
          CONTENT
      ================================= */}

      <section className="px-4 pb-16 pt-8 sm:px-6 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">

          {/* LOADING */}

          {isLoading && (
            <div className="rounded-[30px] border border-[#E9E5DF] bg-white py-24 text-center shadow-sm">
              <LoaderCircle
                size={38}
                className="mx-auto animate-spin text-[#5D86A6]"
              />

              <p className="mt-4 text-sm text-[#7E7772]">
                Loading your appointments...
              </p>
            </div>
          )}

          {/* ERROR */}

          {!isLoading && error && (
            <div className="rounded-[30px] border border-[#F0D4D1] bg-[#FFF5F4] px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <XCircle
                  size={34}
                  className="text-[#B06D64]"
                />
              </div>

              <h2 className="mt-5 font-serif text-2xl text-[#574C45]">
                Unable to load appointments
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8C847E]">
                {error}
              </p>

              <button
                onClick={() => fetchAppointments()}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#527D6C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#446B5D]"
              >
                <RefreshCw size={17} />
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}

          {!isLoading &&
            !error &&
            appointments.length === 0 && (
              <div className="overflow-hidden rounded-[32px] border border-[#E9E5DF] bg-white shadow-sm">

                <div className="relative px-6 py-20 text-center sm:px-10">

                  <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#EAF2F8] blur-3xl" />

                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#EAF2F8]">
                    <CalendarDays
                      size={34}
                      className="text-[#5D86A6]"
                    />
                  </div>

                  <h2 className="relative mt-7 font-serif text-3xl text-[#473C36]">
                    No appointments yet
                  </h2>

                  <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-[#8C847E]">
                    You haven't booked any consultations yet.
                    Find a doctor and schedule your first
                    appointment.
                  </p>

                  <Link
                    href="/doctors"
                    className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#527D6C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#446B5D]"
                  >
                    <Stethoscope size={18} />
                    Find a Doctor
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="border-t border-[#EEEAE5] bg-[#FCFBF9] px-6 py-5 text-center">
                  <p className="text-xs text-[#99938D]">
                    CareConnect helps you connect with
                    healthcare professionals.
                  </p>
                </div>
              </div>
            )}

          {/* APPOINTMENTS */}

          {!isLoading &&
            !error &&
            appointments.length > 0 && (
              <>
                {/* FILTERS */}

                <div className="mb-6 overflow-x-auto">
                  <div className="flex min-w-max items-center gap-2 rounded-2xl border border-[#E9E5DF] bg-white p-2 shadow-sm">

                    <FilterButton
                      label="All"
                      count={counts.all}
                      active={activeFilter === "all"}
                      onClick={() =>
                        setActiveFilter("all")
                      }
                    />

                    <FilterButton
                      label="Pending"
                      count={counts.pending}
                      active={
                        activeFilter === "pending"
                      }
                      onClick={() =>
                        setActiveFilter("pending")
                      }
                    />

                    <FilterButton
                      label="Confirmed"
                      count={counts.confirmed}
                      active={
                        activeFilter === "confirmed"
                      }
                      onClick={() =>
                        setActiveFilter("confirmed")
                      }
                    />

                    <FilterButton
                      label="Completed"
                      count={counts.completed}
                      active={
                        activeFilter === "completed"
                      }
                      onClick={() =>
                        setActiveFilter("completed")
                      }
                    />

                    <FilterButton
                      label="Cancelled"
                      count={counts.cancelled}
                      active={
                        activeFilter === "cancelled"
                      }
                      onClick={() =>
                        setActiveFilter("cancelled")
                      }
                    />
                  </div>
                </div>

                {/* FILTER EMPTY */}

                {filteredAppointments.length === 0 && (
                  <div className="rounded-[28px] border border-[#E9E5DF] bg-white px-6 py-16 text-center shadow-sm">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F5F1]">
                      <CalendarDays
                        size={24}
                        className="text-[#A47658]"
                      />
                    </div>

                    <h2 className="mt-5 font-serif text-2xl text-[#473C36]">
                      No {activeFilter} appointments
                    </h2>

                    <p className="mt-2 text-sm text-[#8C847E]">
                      There are no appointments in this
                      category yet.
                    </p>
                  </div>
                )}

                {/* LIST */}

                <div className="space-y-5">
                  {filteredAppointments.map(
                    (appointment) => {
                      const doctor =
                        appointment.doctorId;

                      const status =
                        getStatusStyle(
                          appointment.status
                        );

                      const StatusIcon =
                        status.icon;

                      return (
                        <article
                          key={appointment._id}
                          className="overflow-hidden rounded-[30px] border border-[#E9E5DF] bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          {/* TOP ACCENT */}

                          <div
                            className={`h-1 ${
                              appointment.status ===
                              "confirmed"
                                ? "bg-[#6E9387]"
                                : appointment.status ===
                                  "completed"
                                ? "bg-[#7D99BC]"
                                : appointment.status ===
                                  "cancelled"
                                ? "bg-[#C4867D]"
                                : "bg-[#D7AD55]"
                            }`}
                          />

                          <div className="p-5 sm:p-7">

                            {/* Doctor */}

                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                              <div className="flex min-w-0 items-start gap-4">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#E5F1EB]">
                                  {doctor?.profileImage ? (
                                    <img
                                      src={
                                        doctor.profileImage
                                      }
                                      alt={
                                        doctor.fullName ||
                                        "Doctor"
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-serif text-2xl font-semibold text-[#527D6C]">
                                      {doctor?.fullName
                                        ?.replace(
                                          "Dr. ",
                                          ""
                                        )
                                        .charAt(0) ||
                                        "D"}
                                    </span>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <h2 className="truncate font-serif text-2xl font-semibold text-[#3E4747]">
                                    {doctor?.fullName ||
                                      "Doctor"}
                                  </h2>

                                  <p className="mt-1 text-sm font-medium text-[#6E9387]">
                                    {doctor?.specialization ||
                                      "Specialist"}
                                  </p>

                                  <div className="mt-2 flex items-center gap-1 text-xs text-[#B78531]">
                                    <Star
                                      size={13}
                                      fill="currentColor"
                                    />

                                    <span>
                                      {doctor?.rating ||
                                        "4.8"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Status */}

                              <div
                                className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold ${status.className}`}
                              >
                                <StatusIcon
                                  size={15}
                                />

                                {status.label}
                              </div>
                            </div>

                            {/* Appointment info */}

                            <div className="mt-7 grid gap-3 border-t border-[#EEEAE5] pt-6 sm:grid-cols-2 lg:grid-cols-4">

                              <InfoItem
                                icon={
                                  <CalendarDays
                                    size={18}
                                  />
                                }
                                iconClass="text-[#6E9387]"
                                label="Date"
                                value={formatDate(
                                  appointment.appointmentDate
                                )}
                              />

                              <InfoItem
                                icon={
                                  <Clock3
                                    size={18}
                                  />
                                }
                                iconClass="text-[#A47658]"
                                label="Time"
                                value={
                                  appointment.appointmentTime ||
                                  "Not available"
                                }
                              />

                              <InfoItem
                                icon={
                                  <MapPin
                                    size={18}
                                  />
                                }
                                iconClass="text-[#5D86A6]"
                                label="Location"
                                value={
                                  doctor?.hospital ||
                                  "Clinic"
                                }
                                subValue={
                                  doctor?.location || ""
                                }
                              />

                              <InfoItem
                                icon={
                                  <BriefcaseMedical
                                    size={18}
                                  />
                                }
                                iconClass="text-[#6E9387]"
                                label="Consultation"
                                value={
                                  doctor?.consultationFee
                                    ? `₹${doctor.consultationFee}`
                                    : "—"
                                }
                              />
                            </div>

                            {/* Reason */}

                            <div className="mt-6 rounded-[22px] bg-[#F8F5F1] p-4 sm:p-5">
                              <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                                  <FileText
                                    size={17}
                                    className="text-[#A47658]"
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-[#99938D]">
                                    Reason for visit
                                  </p>

                                  <p className="mt-1.5 text-sm leading-6 text-[#5F6563]">
                                    {appointment.reason ||
                                      "No reason provided"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Bottom */}

                            <div className="mt-5 flex flex-col gap-3 border-t border-[#EEEAE5] pt-5 sm:flex-row sm:items-center sm:justify-between">

                              <div className="flex items-center gap-2 text-xs text-[#8C847E]">
                                <HeartPulse
                                  size={15}
                                  className="text-[#6E9387]"
                                />

                                <span>
                                  Your appointment is securely
                                  managed by CareConnect.
                                </span>
                              </div>

                              <Link
                                href={
                                  doctor?._id
                                    ? `/doctor/${doctor._id}`
                                    : "/doctors"
                                }
                                className="inline-flex items-center gap-1 text-sm font-semibold text-[#527D6C] transition hover:text-[#446B5D]"
                              >
                                View Doctor
                                <ChevronRight
                                  size={16}
                                />
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              </>
            )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ==========================================
   SUMMARY CARD
========================================== */

function SummaryCard({
  label,
  value,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-[22px] border border-[#E9E5DF] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold tracking-tight text-[#473C36]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-[#4D5757]">
        {label}
      </p>
    </div>
  );
}

/* ==========================================
   FILTER BUTTON
========================================== */

function FilterButton({
  label,
  count,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[#527D6C] text-white shadow-sm"
          : "text-[#737B79] hover:bg-[#F8F5F1]"
      }`}
    >
      {label}

      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          active
            ? "bg-white/20 text-white"
            : "bg-[#F3F0EC] text-[#8C847E]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ==========================================
   INFO ITEM
========================================== */

function InfoItem({
  icon,
  iconClass,
  label,
  value,
  subValue,
}) {
  return (
    <div className="rounded-2xl bg-[#FCFBF9] p-4">
      <div className="flex items-start gap-3">

        <div className={`mt-0.5 shrink-0 ${iconClass}`}>
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#99938D]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-[#4D5757]">
            {value}
          </p>

          {subValue && (
            <p className="mt-0.5 truncate text-xs text-[#7E7772]">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}