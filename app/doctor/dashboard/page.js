"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import {
  CalendarDays,
  Clock3,
  Users,
  ClipboardList,
  Stethoscope,
  Settings,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  XCircle,
  UserRound,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Activity,
  CalendarCheck2,
  CalendarClock,
  LoaderCircle,
  BriefcaseMedical,
} from "lucide-react";

export default function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingAppointments, setIsLoadingAppointments] =
    useState(true);

  const [appointmentAction, setAppointmentAction] =
    useState("");

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const response = await fetch("/api/me");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const result = await response.json();

        if (!result.success || result.user.role !== "doctor") {
          window.location.href = "/login";
          return;
        }

        setUser(result.user);

        await fetchAppointments();
      } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "/login";
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initializeDashboard();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/doctor/appointments");

      const result = await response.json();

      if (response.ok && result.success) {
        setAppointments(result.appointments || []);
      }
    } catch (error) {
      console.error("Appointments fetch error:", error);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const updateAppointmentStatus = async (
    appointmentId,
    status
  ) => {
    setAppointmentAction(appointmentId);

    try {
      const response = await fetch(
        `/api/doctor/appointments/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Unable to update appointment");
        return;
      }

      setAppointments((current) =>
        current.map((appointment) =>
          appointment._id === appointmentId
            ? {
                ...appointment,
                status,
              }
            : appointment
        )
      );
    } catch (error) {
      console.error("Update appointment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setAppointmentAction("");
    }
  };

  const todayString = new Date()
    .toISOString()
    .split("T")[0];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = useMemo(() => {
    const todayAppointments = appointments.filter(
      (appointment) =>
        appointment.appointmentDate === todayString
    );

    const pending = appointments.filter(
      (appointment) => appointment.status === "pending"
    );

    const confirmed = appointments.filter(
      (appointment) => appointment.status === "confirmed"
    );

    const completed = appointments.filter(
      (appointment) => appointment.status === "completed"
    );

    const uniquePatients = new Set(
      appointments
        .map((appointment) => appointment.patientId?._id)
        .filter(Boolean)
    );

    return {
      today: todayAppointments.length,
      pending: pending.length,
      confirmed: confirmed.length,
      completed: completed.length,
      patients: uniquePatients.size,
    };
  }, [appointments, todayString]);

  const filteredAppointments = useMemo(() => {
    if (activeTab === "pending") {
      return appointments.filter(
        (appointment) => appointment.status === "pending"
      );
    }

    if (activeTab === "confirmed") {
      return appointments.filter(
        (appointment) => appointment.status === "confirmed"
      );
    }

    if (activeTab === "completed") {
      return appointments.filter(
        (appointment) => appointment.status === "completed"
      );
    }

    return appointments;
  }, [appointments, activeTab]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const [year, month, day] = date.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F9F8]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <LoaderCircle
              size={27}
              className="animate-spin text-[#4F8173]"
            />
          </div>

          <p className="mt-4 text-sm text-[#77837F]">
            Preparing your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#253B37]">
      <Navbar />

      <div className="mx-auto flex max-w-[1500px]">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside className="hidden w-[250px] shrink-0 border-r border-[#E3EBE7] bg-white lg:block">
          <div className="sticky top-0 flex h-[calc(100vh-64px)] flex-col px-5 py-7">

            <div className="px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B9793]">
                Doctor portal
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#203B36]">
                CareConnect
              </h2>
            </div>

            {/* Doctor mini profile */}
            <div className="mt-8 rounded-3xl bg-[#F2F7F5] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DCECE6] text-[#4F8173]">
                  <Stethoscope size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#304540]">
                    {user.fullName}
                  </p>

                  <p className="mt-0.5 text-xs capitalize text-[#8A9692]">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            <nav className="mt-8 space-y-1.5">

              <Link
                href="/doctor/dashboard"
                className="flex items-center gap-3 rounded-2xl bg-[#1F5148] px-4 py-3.5 text-sm font-semibold text-white shadow-sm"
              >
                <Activity size={18} />
                Overview
              </Link>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("appointments")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm text-[#6F7D79] transition hover:bg-[#F3F7F5]"
              >
                <CalendarDays size={18} />
                Appointments
              </button>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("patients")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm text-[#6F7D79] transition hover:bg-[#F3F7F5]"
              >
                <Users size={18} />
                My Patients
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm text-[#6F7D79] transition hover:bg-[#F3F7F5]"
              >
                <MessageCircle size={18} />
                Messages
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm text-[#6F7D79] transition hover:bg-[#F3F7F5]"
              >
                <Settings size={18} />
                Settings
              </button>
            </nav>

            {/* Bottom card */}
            <div className="mt-auto rounded-3xl bg-[#203B36] p-5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BriefcaseMedical size={19} />
              </div>

              <p className="mt-4 font-serif text-lg leading-6">
                Care that connects.
              </p>

              <p className="mt-2 text-xs leading-5 text-[#BFD1CC]">
                Manage your schedule and stay connected with your
                patients.
              </p>
            </div>
          </div>
        </aside>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="min-w-0 flex-1">

          <main className="px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-9">

            {/* ================================================= */}
            {/* TOP BAR / WELCOME */}
            {/* ================================================= */}

            <section className="relative overflow-hidden rounded-[32px] bg-[#EAF3EF] px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">

              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D9EAE3]" />

              <div className="absolute -bottom-28 right-24 h-52 w-52 rounded-full bg-[#E2EEE9]" />

              <div className="relative flex flex-col justify-between gap-8 xl:flex-row xl:items-center">

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#4F8173]" />

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64877E]">
                      {today}
                    </p>
                  </div>

                  <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-[#203B36] sm:text-5xl">
                    Good to see you,
                    <span className="block italic text-[#4F8173]">
                      {user.fullName}
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6D7F7A] sm:text-base">
                    Here's your clinical overview for today. Review
                    patient requests, manage consultations and keep
                    your schedule organized.
                  </p>
                </div>

                {/* Profile */}
                <div className="relative flex w-full items-center gap-4 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur sm:w-fit sm:min-w-[280px]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DCECE6] text-[#3E7467]">
                    <UserRound size={24} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#29423D]">
                      {user.fullName}
                    </p>

                    <p className="mt-1 text-xs text-[#81908B]">
                      {user.email}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#4F8173]">
                      <CheckCircle2 size={13} />
                      Verified account
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Today */}
              <div className="rounded-[26px] border border-[#E3EBE7] bg-white p-5 shadow-[0_8px_30px_rgba(31,64,56,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#85918D]">
                      Today's schedule
                    </p>

                    <p className="mt-4 font-serif text-4xl font-semibold text-[#29413C]">
                      {stats.today}
                    </p>

                    <p className="mt-1 text-xs text-[#99A29F]">
                      Appointments today
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#E5F1EC] p-3 text-[#4F8173]">
                    <CalendarCheck2 size={20} />
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="rounded-[26px] border border-[#E3EBE7] bg-white p-5 shadow-[0_8px_30px_rgba(31,64,56,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#85918D]">
                      Pending requests
                    </p>

                    <p className="mt-4 font-serif text-4xl font-semibold text-[#29413C]">
                      {stats.pending}
                    </p>

                    <p className="mt-1 text-xs text-[#99A29F]">
                      Waiting for your action
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FFF3D9] p-3 text-[#B48738]">
                    <CalendarClock size={20} />
                  </div>
                </div>
              </div>

              {/* Patients */}
              <div className="rounded-[26px] border border-[#E3EBE7] bg-white p-5 shadow-[0_8px_30px_rgba(31,64,56,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#85918D]">
                      Patients
                    </p>

                    <p className="mt-4 font-serif text-4xl font-semibold text-[#29413C]">
                      {stats.patients}
                    </p>

                    <p className="mt-1 text-xs text-[#99A29F]">
                      Unique patients
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#EAF1F7] p-3 text-[#557A92]">
                    <Users size={20} />
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="rounded-[26px] border border-[#E3EBE7] bg-white p-5 shadow-[0_8px_30px_rgba(31,64,56,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#85918D]">
                      Completed
                    </p>

                    <p className="mt-4 font-serif text-4xl font-semibold text-[#29413C]">
                      {stats.completed}
                    </p>

                    <p className="mt-1 text-xs text-[#99A29F]">
                      Completed consultations
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#E7F2EA] p-3 text-[#588066]">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* APPOINTMENTS */}
            {/* ================================================= */}

            <section
              id="appointments"
              className="mt-8 rounded-[30px] border border-[#E3EBE7] bg-white shadow-[0_8px_30px_rgba(31,64,56,0.04)]"
            >
              <div className="border-b border-[#EAEFED] px-5 py-6 sm:px-7">

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6F52]">
                      Clinical schedule
                    </p>

                    <h2 className="mt-2 font-serif text-3xl font-medium text-[#29413C]">
                      Patient appointments
                    </h2>

                    <p className="mt-2 text-sm text-[#899490]">
                      Review requests and manage your consultation
                      schedule.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    {[
                      ["all", "All"],
                      ["pending", "Pending"],
                      ["confirmed", "Confirmed"],
                      ["completed", "Completed"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setActiveTab(value)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          activeTab === value
                            ? "bg-[#203B36] text-white"
                            : "bg-[#F3F6F4] text-[#74827D] hover:bg-[#EAF0ED]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">

                {isLoadingAppointments ? (
                  <div className="py-20 text-center">
                    <LoaderCircle
                      size={32}
                      className="mx-auto animate-spin text-[#4F8173]"
                    />

                    <p className="mt-4 text-sm text-[#87938F]">
                      Loading patient appointments...
                    </p>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="rounded-[26px] border border-dashed border-[#D4E1DC] bg-[#F9FBFA] px-5 py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#679087] shadow-sm">
                      <CalendarDays size={27} />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-medium text-[#354B46]">
                      No appointments here
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8A9692]">
                      Patient appointment requests will appear here
                      once they are booked.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map(
                      (appointment) => {

                        const patient =
                          appointment.patientId;

                        const isPending =
                          appointment.status === "pending";

                        const isConfirmed =
                          appointment.status === "confirmed";

                        const isCompleted =
                          appointment.status === "completed";

                        const isCancelled =
                          appointment.status === "cancelled";

                        return (
                          <article
                            key={appointment._id}
                            className="rounded-[26px] border border-[#E7EEEB] bg-[#FCFDFC] p-5 transition hover:border-[#D2E1DB] hover:shadow-sm sm:p-6"
                          >

                            {/* Appointment top */}
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                              <div className="flex items-start gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E2EFEA] text-[#4F8173]">
                                  <UserRound size={23} />
                                </div>

                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-serif text-xl font-semibold text-[#30443F]">
                                      {patient?.fullName ||
                                        "Patient"}
                                    </h3>

                                    {isPending && (
                                      <span className="rounded-full bg-[#FFF3D9] px-2.5 py-1 text-[10px] font-bold text-[#B48738]">
                                        Pending
                                      </span>
                                    )}

                                    {isConfirmed && (
                                      <span className="rounded-full bg-[#E4F2E9] px-2.5 py-1 text-[10px] font-bold text-[#5B8068]">
                                        Confirmed
                                      </span>
                                    )}

                                    {isCompleted && (
                                      <span className="rounded-full bg-[#E8EFF7] px-2.5 py-1 text-[10px] font-bold text-[#5B7892]">
                                        Completed
                                      </span>
                                    )}

                                    {isCancelled && (
                                      <span className="rounded-full bg-[#F8E8E6] px-2.5 py-1 text-[10px] font-bold text-[#AE6C64]">
                                        Cancelled
                                      </span>
                                    )}
                                  </div>

                                  <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                                    <span className="flex items-center gap-1.5 text-xs text-[#84918D]">
                                      <Mail size={13} />
                                      {patient?.email ||
                                        "Email unavailable"}
                                    </span>

                                    <span className="flex items-center gap-1.5 text-xs text-[#84918D]">
                                      <Phone size={13} />
                                      {patient?.phone ||
                                        "Phone unavailable"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
                                <CalendarDays
                                  size={17}
                                  className="text-[#4F8173]"
                                />

                                <div>
                                  <p className="text-[10px] uppercase tracking-wide text-[#9AA5A1]">
                                    Appointment
                                  </p>

                                  <p className="mt-0.5 text-xs font-semibold text-[#455751]">
                                    {formatDate(
                                      appointment.appointmentDate
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="mt-5 grid gap-3 border-t border-[#E8EEEB] pt-5 sm:grid-cols-3">

                              <div className="rounded-2xl bg-white p-4">
                                <div className="flex items-center gap-3">
                                  <Clock3
                                    size={18}
                                    className="text-[#A47759]"
                                  />

                                  <div>
                                    <p className="text-[10px] uppercase tracking-wide text-[#9AA5A1]">
                                      Time
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#485751]">
                                      {
                                        appointment.appointmentTime
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-2xl bg-white p-4">
                                <div className="flex items-center gap-3">
                                  <MapPin
                                    size={18}
                                    className="text-[#5C8198]"
                                  />

                                  <div>
                                    <p className="text-[10px] uppercase tracking-wide text-[#9AA5A1]">
                                      Consultation
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#485751]">
                                      Online / Clinic
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-2xl bg-white p-4">
                                <div className="flex items-center gap-3">
                                  <ClipboardList
                                    size={18}
                                    className="text-[#668C80]"
                                  />

                                  <div>
                                    <p className="text-[10px] uppercase tracking-wide text-[#9AA5A1]">
                                      Patient reason
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-[#485751]">
                                      {appointment.reason}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Reason */}
                            <div className="mt-3 rounded-2xl bg-[#F5F8F6] px-4 py-3.5">
                              <p className="text-[10px] font-bold uppercase tracking-wide text-[#98A39F]">
                                Reason for visit
                              </p>

                              <p className="mt-1 text-sm leading-6 text-[#62706B]">
                                {appointment.reason}
                              </p>
                            </div>

                            {/* Actions */}
                            {isPending && (
                              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">

                                <button
                                  type="button"
                                  disabled={
                                    appointmentAction ===
                                    appointment._id
                                  }
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment._id,
                                      "cancelled"
                                    )
                                  }
                                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#E8D8D5] bg-white px-5 py-3 text-sm font-semibold text-[#AD6C64] transition hover:bg-[#FFF7F5] disabled:opacity-50"
                                >
                                  <XCircle size={17} />
                                  Decline
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    appointmentAction ===
                                    appointment._id
                                  }
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment._id,
                                      "confirmed"
                                    )
                                  }
                                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#3F7567] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#315F54] disabled:opacity-50"
                                >
                                  {appointmentAction ===
                                  appointment._id ? (
                                    <LoaderCircle
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <CheckCircle2 size={17} />
                                  )}

                                  Confirm appointment
                                </button>
                              </div>
                            )}

                            {isConfirmed && (
                              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="flex items-center gap-2 text-xs text-[#698078]">
                                  <CheckCircle2
                                    size={16}
                                    className="text-[#5B8068]"
                                  />
                                  Appointment confirmed. Patient can
                                  now see the updated status.
                                </p>

                                <button
                                  type="button"
                                  disabled={
                                    appointmentAction ===
                                    appointment._id
                                  }
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment._id,
                                      "completed"
                                    )
                                  }
                                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#D8E4DF] bg-white px-5 py-3 text-xs font-semibold text-[#4F8173] transition hover:bg-[#F2F7F5] disabled:opacity-50"
                                >
                                  <CheckCircle2 size={16} />
                                  Mark completed
                                </button>
                              </div>
                            )}

                          </article>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* ================================================= */}
            {/* LOWER SECTION */}
            {/* ================================================= */}

            <section
              id="patients"
              className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"
            >

              {/* Patient snapshot */}
              <div className="rounded-[30px] border border-[#E3EBE7] bg-white p-6 shadow-[0_8px_30px_rgba(31,64,56,0.04)] sm:p-7">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6F52]">
                      Patient overview
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-medium text-[#29413C]">
                      Your patient activity
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-[#EAF3EF] p-3 text-[#4F8173]">
                    <Users size={20} />
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl bg-[#F6F9F7] p-5">
                    <p className="text-xs text-[#8A9692]">
                      Total
                    </p>

                    <p className="mt-2 font-serif text-3xl font-semibold text-[#30453F]">
                      {stats.patients}
                    </p>

                    <p className="mt-1 text-xs text-[#9AA5A1]">
                      Unique patients
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F5EC] p-5">
                    <p className="text-xs text-[#9A8C70]">
                      Confirmed
                    </p>

                    <p className="mt-2 font-serif text-3xl font-semibold text-[#665637]">
                      {stats.confirmed}
                    </p>

                    <p className="mt-1 text-xs text-[#A99E88]">
                      Active consultations
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F1F6F8] p-5">
                    <p className="text-xs text-[#8295A0]">
                      Completed
                    </p>

                    <p className="mt-2 font-serif text-3xl font-semibold text-[#4E6978]">
                      {stats.completed}
                    </p>

                    <p className="mt-1 text-xs text-[#93A1A8]">
                      Completed visits
                    </p>
                  </div>

                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-[30px] bg-[#203B36] p-6 text-white shadow-[0_12px_35px_rgba(32,59,54,0.12)] sm:p-7">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#AFC4BE]">
                  Quick access
                </p>

                <h2 className="mt-2 font-serif text-2xl font-medium">
                  Manage your practice
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#C3D2CE]">
                  Keep your schedule organized and stay connected
                  with your patients.
                </p>

                <div className="mt-7 space-y-3">

                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("appointments")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                    className="group flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-3.5 text-left transition hover:bg-white/15"
                  >
                    <span className="flex items-center gap-3">
                      <CalendarDays size={18} />
                      <span className="text-sm font-medium">
                        Manage appointments
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    className="group flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-3.5 text-left transition hover:bg-white/15"
                  >
                    <span className="flex items-center gap-3">
                      <MessageCircle size={18} />
                      <span className="text-sm font-medium">
                        Patient messages
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    className="group flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-3.5 text-left transition hover:bg-white/15"
                  >
                    <span className="flex items-center gap-3">
                      <Settings size={18} />
                      <span className="text-sm font-medium">
                        Account settings
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* SECURITY NOTE */}
            {/* ================================================= */}

            <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#DFE9E5] bg-white px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EF] text-[#4F8173]">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#53635E]">
                  Secure clinical workspace
                </p>

                <p className="mt-0.5 text-xs leading-5 text-[#8B9692]">
                  Patient information is available only to the
                  authenticated doctor associated with the appointment.
                </p>
              </div>
            </div>

          </main>
        </div>
      </div>
    </main>
  );
}