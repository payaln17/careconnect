"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

export default function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [duration, setDuration] = useState("Today");
  const [analyzing, setAnalyzing] = useState(false);
  const [healthResult, setHealthResult] = useState(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    fetchUser();
    fetchAppointments();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/me");

      if (!response.ok) {
        window.location.href = "/login";
        return;
      }

      const result = await response.json();

      if (!result.success || result.user.role !== "patient") {
        window.location.href = "/login";
        return;
      }

      setUser(result.user);
    } catch (error) {
      console.error("User fetch error:", error);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (result.success) {
        setAppointments(result.appointments || []);
      }
    } catch (error) {
      console.error("Appointments fetch error:", error);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      setHealthResult({
        success: false,
        message: "Please describe your symptoms first.",
      });
      return;
    }

    setAnalyzing(true);
    setHealthResult(null);

    try {
      const response = await fetch("/api/health-navigator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          severity,
          duration,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setHealthResult({
          success: false,
          message: result.message || "Unable to analyze symptoms.",
        });
        return;
      }

      setHealthResult(result);
    } catch (error) {
      console.error("Health Navigator error:", error);

      setHealthResult({
        success: false,
        message: "Unable to analyze symptoms right now.",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:112";
  };

  const shareLocation = () => {
    setLocationLoading(true);
    setLocationMessage("");

    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        try {
          if (navigator.share) {
            await navigator.share({
              title: "My Emergency Location",
              text: "This is my current location.",
              url: locationUrl,
            });

            setLocationMessage("Location shared successfully.");
          } else {
            await navigator.clipboard.writeText(locationUrl);
            setLocationMessage("Location link copied to clipboard.");
          }
        } catch {
          setLocationMessage("Location sharing cancelled.");
        }

        setLocationLoading(false);
      },
      () => {
        setLocationMessage(
          "Unable to access your location. Please allow location permission."
        );
        setLocationLoading(false);
      }
    );
  };

  const findNearestHospital = () => {
    if (!navigator.geolocation) {
      window.open(
        "https://www.google.com/maps/search/hospitals+near+me",
        "_blank"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;

        window.open(url, "_blank");
      },
      () => {
        window.open(
          "https://www.google.com/maps/search/hospitals+near+me",
          "_blank"
        );
      }
    );
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    window.location.href = "/";
  };

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "pending" ||
      appointment.status === "confirmed"
  );

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const firstName = user?.fullName?.split(" ")[0] || "there";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAFC] text-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[82px] items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
              <HeartPulse size={21} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">
                CareConnect
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-600">
                Healthcare
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Main menu
          </p>

          <nav className="mt-3 space-y-1">
            <Link
              href="/patient/dashboard"
              className="flex items-center gap-3 rounded-2xl bg-teal-50 px-4 py-3.5 text-sm font-semibold text-teal-700"
              onClick={() => setSidebarOpen(false)}
            >
              <Home size={19} />
              Dashboard
            </Link>

            <Link
              href="/doctors"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setSidebarOpen(false)}
            >
              <Search size={19} />
              Find Doctors
            </Link>

            <Link
              href="/appointments"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setSidebarOpen(false)}
            >
              <CalendarDays size={19} />
              My Appointments
            </Link>
          </nav>

          <p className="mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Healthcare
          </p>

          <nav className="mt-3 space-y-1">
            <a
              href="#navigator"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setSidebarOpen(false)}
            >
              <Sparkles size={19} />
              Health Navigator
            </a>

            <a
              href="#emergency"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              onClick={() => setSidebarOpen(false)}
            >
              <AlertTriangle size={19} />
              Emergency SOS
            </a>
          </nav>
        </div>

        {/* User card */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
              {user?.fullName?.charAt(0)?.toUpperCase() || "P"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.fullName}
              </p>
              <p className="truncate text-xs text-slate-500">
                Patient
              </p>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="rounded-xl p-2 text-slate-400 transition hover:bg-white hover:text-red-500"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[270px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Patient Portal
              </p>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                My Health Dashboard
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/doctors"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              <Search size={16} />
              Find a Doctor
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
              {user?.fullName?.charAt(0)?.toUpperCase() || "P"}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* Welcome hero */}
          <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] px-6 py-7 text-white shadow-xl shadow-teal-900/10 sm:px-8 sm:py-9">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-28 right-20 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <ShieldCheck size={14} />
                Your health, connected
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Good evening, {firstName} 👋
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50 sm:text-base">
                Manage your appointments, understand your symptoms and
                connect with the right healthcare professional — all in one
                place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/doctors"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-teal-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-50"
                >
                  Find a Doctor
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  My Appointments
                </Link>
              </div>
            </div>

            <div className="absolute bottom-0 right-8 hidden lg:block">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <HeartPulse size={65} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<CalendarDays size={20} />}
              label="Total Appointments"
              value={appointments.length}
              description="All your bookings"
            />

            <StatCard
              icon={<Clock3 size={20} />}
              label="Upcoming"
              value={upcomingAppointments.length}
              description="Pending or confirmed"
            />

            <StatCard
              icon={<CheckCircle2 size={20} />}
              label="Confirmed"
              value={confirmedAppointments.length}
              description="Ready for consultation"
            />

            <StatCard
              icon={<Activity size={20} />}
              label="Completed"
              value={completedAppointments.length}
              description="Past consultations"
            />
          </section>

          {/* Main grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.55fr_0.85fr]">
            {/* Left */}
            <div className="space-y-8">
              {/* Smart Navigator */}
              <section
                id="navigator"
                className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                        <Sparkles size={23} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Smart Health Navigator
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          Describe how you feel and get general guidance on
                          your next step.
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-violet-600">
                      Decision support
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    What are you experiencing?
                  </label>

                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Example: I have fever and weakness since yesterday..."
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
                  />

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Severity
                      </label>

                      <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
                      >
                        <option>Mild</option>
                        <option>Moderate</option>
                        <option>Severe</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        How long?
                      </label>

                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
                      >
                        <option>Today</option>
                        <option>1-2 days</option>
                        <option>3-7 days</option>
                        <option>More than a week</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={analyzeSymptoms}
                    disabled={analyzing}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {analyzing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={17} />
                        Analyze Symptoms
                      </>
                    )}
                  </button>

                  {/* Result */}
                  {healthResult && (
                    <div className="mt-6">
                      {!healthResult.success ? (
                        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                          {healthResult.message}
                        </div>
                      ) : (
                        <div
                          className={`rounded-2xl border p-5 ${
                            healthResult.emergency
                              ? "border-red-200 bg-red-50"
                              : healthResult.priority === "Moderate"
                              ? "border-amber-200 bg-amber-50"
                              : "border-emerald-200 bg-emerald-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                healthResult.emergency
                                  ? "bg-red-100 text-red-600"
                                  : healthResult.priority === "Moderate"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-emerald-100 text-emerald-600"
                              }`}
                            >
                              {healthResult.emergency ? (
                                <AlertTriangle size={20} />
                              ) : (
                                <CheckCircle2 size={20} />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-bold text-slate-900">
                                  {healthResult.title}
                                </h4>

                                <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                                  {healthResult.priority} priority
                                </span>
                              </div>

                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {healthResult.message}
                              </p>

                              <div className="mt-4 rounded-xl bg-white/70 p-3.5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                  Suggested next step
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                  {healthResult.action}
                                </p>
                              </div>

                              {healthResult.guidance?.length > 0 && (
                                <div className="mt-4">
                                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    General guidance
                                  </p>

                                  <ul className="mt-2 space-y-2">
                                    {healthResult.guidance.map(
                                      (item, index) => (
                                        <li
                                          key={index}
                                          className="flex gap-2 text-sm leading-5 text-slate-600"
                                        >
                                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                              {healthResult.emergency && (
                                <button
                                  onClick={handleEmergencyCall}
                                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                                >
                                  <Phone size={17} />
                                  Call Emergency Services — 112
                                </button>
                              )}

                              <p className="mt-4 text-[11px] leading-4 text-slate-400">
                                {healthResult.disclaimer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* Appointments */}
              <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                      Your schedule
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Upcoming appointments
                    </h3>
                  </div>

                  <Link
                    href="/appointments"
                    className="hidden items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 sm:flex"
                  >
                    View all
                    <ChevronRight size={17} />
                  </Link>
                </div>

                <div className="p-5 sm:p-7">
                  {appointmentsLoading ? (
                    <div className="py-10 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
                      <p className="mt-3 text-sm text-slate-500">
                        Loading appointments...
                      </p>
                    </div>
                  ) : upcomingAppointments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                        <CalendarDays size={22} />
                      </div>

                      <h4 className="mt-4 font-bold text-slate-900">
                        No upcoming appointments
                      </h4>

                      <p className="mx-auto mt-1 max-w-sm text-sm leading-5 text-slate-500">
                        Find a doctor and book your next consultation in a few
                        clicks.
                      </p>

                      <Link
                        href="/doctors"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
                      >
                        Find Doctors
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingAppointments
                        .slice(0, 3)
                        .map((appointment) => (
                          <AppointmentRow
                            key={appointment._id}
                            appointment={appointment}
                          />
                        ))}
                    </div>
                  )}

                  <Link
                    href="/appointments"
                    className="mt-5 flex items-center justify-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 sm:hidden"
                  >
                    View all appointments
                    <ChevronRight size={17} />
                  </Link>
                </div>
              </section>
            </div>

            {/* Right */}
            <div className="space-y-8">
              {/* SOS */}
              <section
                id="emergency"
                className="scroll-mt-24 overflow-hidden rounded-[28px] border border-red-100 bg-white shadow-sm"
              >
                <div className="bg-gradient-to-br from-red-600 to-rose-500 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                        <AlertTriangle size={22} />
                      </div>

                      <h3 className="mt-5 text-xl font-bold">
                        Emergency SOS
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-red-50">
                        Get immediate assistance when every second matters.
                      </p>
                    </div>

                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      24/7
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  <button
                    onClick={handleEmergencyCall}
                    className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-4 text-left transition hover:bg-red-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                        <Phone size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Call Emergency Services
                        </p>
                        <p className="text-xs text-slate-500">
                          India emergency number — 112
                        </p>
                      </div>
                    </div>

                    <ArrowRight size={17} className="text-red-500" />
                  </button>

                  <button
                    onClick={shareLocation}
                    disabled={locationLoading}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Share My Location
                        </p>
                        <p className="text-xs text-slate-500">
                          Share or copy your current location
                        </p>
                      </div>
                    </div>

                    {locationLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                    ) : (
                      <ArrowRight
                        size={17}
                        className="text-slate-400"
                      />
                    )}
                  </button>

                  <button
                    onClick={findNearestHospital}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                        <Stethoscope size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Find Nearest Hospital
                        </p>
                        <p className="text-xs text-slate-500">
                          Open nearby hospitals on Maps
                        </p>
                      </div>
                    </div>

                    <ArrowRight size={17} className="text-slate-400" />
                  </button>

                  {locationMessage && (
                    <p className="rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-600">
                      {locationMessage}
                    </p>
                  )}

                  <p className="pt-1 text-center text-[11px] leading-4 text-slate-400">
                    For serious or life-threatening emergencies, contact
                    emergency services immediately.
                  </p>
                </div>
              </section>

              {/* Quick actions */}
              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Quick access
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Healthcare tools
                  </h3>
                </div>

                <div className="space-y-2">
                  <QuickAction
                    href="/doctors"
                    icon={<Stethoscope size={19} />}
                    title="Find a Doctor"
                    description="Browse healthcare specialists"
                    iconClass="bg-teal-50 text-teal-600"
                  />

                  <QuickAction
                    href="/appointments"
                    icon={<CalendarDays size={19} />}
                    title="My Appointments"
                    description="Track your consultations"
                    iconClass="bg-blue-50 text-blue-600"
                  />

                  <a
                    href="#navigator"
                    className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <Sparkles size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">
                        Smart Navigator
                      </p>
                      <p className="text-xs text-slate-500">
                        Get general health guidance
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="text-slate-300"
                    />
                  </a>

                  <a
                    href="#emergency"
                    className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-red-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <AlertTriangle size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">
                        Emergency SOS
                      </p>
                      <p className="text-xs text-slate-500">
                        Quick emergency assistance
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="text-slate-300"
                    />
                  </a>
                </div>
              </section>

              {/* Health note */}
              <div className="rounded-[26px] border border-teal-100 bg-teal-50 p-5">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm">
                    <MessageCircle size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-teal-900">
                      A little reminder
                    </p>

                    <p className="mt-1 text-xs leading-5 text-teal-700">
                      Keep your health information updated and consult a
                      qualified healthcare professional when needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-10 border-t border-slate-200 py-6 text-center">
            <p className="text-xs text-slate-400">
              CareConnect • Digital Healthcare Management Platform
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Smart Health Navigator provides general guidance and is not a
              medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ icon, label, value, description }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          {icon}
        </div>

        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-800">
        {label}
      </p>

      <p className="mt-0.5 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function AppointmentRow({ appointment }) {
  const doctor = appointment.doctorId;

  const status =
    appointment.status?.charAt(0).toUpperCase() +
    appointment.status?.slice(1);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-teal-100 hover:bg-teal-50/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
          {doctor?.fullName?.charAt(0)?.toUpperCase() || "D"}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">
            {doctor?.fullName || "Doctor"}
          </p>

          <p className="mt-0.5 truncate text-xs font-medium text-teal-600">
            {doctor?.specialization || "Healthcare Specialist"}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CalendarDays size={12} />
              {formatDate(appointment.appointmentDate)}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={12} />
              {appointment.appointmentTime}
            </span>
          </div>
        </div>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
          appointment.status === "confirmed"
            ? "bg-emerald-100 text-emerald-700"
            : appointment.status === "pending"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
  iconClass,
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="truncate text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight size={17} className="text-slate-300" />
    </Link>
  );
}

function formatDate(dateString) {
  if (!dateString) return "Date unavailable";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}