"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseMedical,
  GraduationCap,
  IndianRupee,
  Star,
  FileText,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  AlertCircle,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";

function AppointmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctorId = searchParams.get("doctor");

  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [dateMessage, setDateMessage] = useState("");
  const [dateValid, setDateValid] = useState(true);

  const [bookedSlots, setBookedSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  /* --------------------------------
     Fetch Doctor
  -------------------------------- */

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) {
          setError("Doctor information is missing.");
          return;
        }

        const response = await fetch("/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Unable to load doctor"
          );
        }

        const foundDoctor = result.doctors.find(
          (item) => item._id === doctorId
        );

        if (!foundDoctor) {
          setError("Doctor not found.");
          return;
        }

        setDoctor(foundDoctor);
      } catch (error) {
        console.error("Appointment doctor error:", error);
        setError("Unable to load doctor details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  /* --------------------------------
     Check Date
  -------------------------------- */

  const checkDateAvailability = (selectedDate) => {
    if (!selectedDate || !doctor) {
      setDateMessage("");
      setDateValid(true);
      return false;
    }

    const date = new Date(`${selectedDate}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      setDateMessage("Please select a valid date.");
      setDateValid(false);
      return false;
    }

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availableDays = doctor.availableDays || [];

    if (availableDays.length === 0) {
      setDateValid(true);

      setDateMessage(
        "Doctor availability schedule is not specified."
      );

      return true;
    }

    if (!availableDays.includes(dayName)) {
      setDateValid(false);

      setDateMessage(
        `${doctor.fullName} is not available on ${dayName}. Please choose another day.`
      );

      return false;
    }

    setDateValid(true);

    setDateMessage(
      `Available ✓ — ${doctor.fullName} is available on ${dayName}.`
    );

    return true;
  };

  /* --------------------------------
     Fetch Booked Slots
  -------------------------------- */

  const fetchAvailability = async (selectedDate) => {
    if (!doctorId || !selectedDate) {
      setBookedSlots([]);
      return;
    }

    setCheckingAvailability(true);
    setBookedSlots([]);
    setAppointmentTime("");

    try {
      const response = await fetch(
        `/api/appointments/availability?doctorId=${encodeURIComponent(
          doctorId
        )}&date=${encodeURIComponent(selectedDate)}`
      );

      const result = await response.json();

      if (!response.ok) {
        setBookedSlots([]);

        setError(
          result.message ||
            "Unable to check appointment availability."
        );

        return;
      }

      if (!result.available) {
        setBookedSlots([]);

        setDateValid(false);

        setDateMessage(
          result.message ||
            "Doctor is not available on this date."
        );

        return;
      }

      setBookedSlots(result.bookedSlots || []);

      checkDateAvailability(selectedDate);
    } catch (error) {
      console.error(
        "Availability checking error:",
        error
      );

      setError(
        "Unable to check available appointment slots."
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  /* --------------------------------
     Date Change
  -------------------------------- */

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;

    setAppointmentDate(selectedDate);
    setAppointmentTime("");

    setError("");
    setSuccess("");

    const isDateValid =
      checkDateAvailability(selectedDate);

    if (isDateValid) {
      await fetchAvailability(selectedDate);
    } else {
      setBookedSlots([]);
    }
  };

  /* --------------------------------
     Time Selection
  -------------------------------- */

  const handleTimeSelect = (time) => {
    if (bookedSlots.includes(time)) {
      return;
    }

    if (!appointmentDate || !dateValid) {
      return;
    }

    setAppointmentTime(time);
    setError("");
    setSuccess("");
  };

  /* --------------------------------
     Reason
  -------------------------------- */

  const handleReasonChange = (event) => {
    setReason(event.target.value);

    setError("");
    setSuccess("");
  };

  /* --------------------------------
     Booking
  -------------------------------- */

  const handleBooking = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!dateValid) {
      setError(
        "Please select a date when the doctor is available."
      );
      return;
    }

    if (!appointmentTime) {
      setError("Please select an appointment time.");
      return;
    }

    if (bookedSlots.includes(appointmentTime)) {
      setError(
        "This time slot has already been booked. Please select another slot."
      );
      return;
    }

    if (!reason.trim()) {
      setError("Please enter the reason for your visit.");
      return;
    }

    if (reason.trim().length < 5) {
      setError(
        "Please provide a little more detail about your reason for visit."
      );
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          appointmentDate,
          appointmentTime,
          reason: reason.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "Unable to book appointment."
        );

        if (
          result.message
            ?.toLowerCase()
            .includes("already booked")
        ) {
          await fetchAvailability(appointmentDate);
        }

        return;
      }

      setSuccess(
        result.message ||
          "Appointment booked successfully!"
      );

      setAppointmentTime("");
      setReason("");

      setTimeout(() => {
        router.push("/appointments");
      }, 1500);
    } catch (error) {
      console.error("Booking error:", error);

      setError(
        "Something went wrong while booking. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  /* --------------------------------
     Loading
  -------------------------------- */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FCFBF9]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <LoaderCircle
              size={38}
              className="mx-auto animate-spin text-[#5D86A6]"
            />

            <p className="mt-4 text-sm text-[#7E7772]">
              Loading appointment details...
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* --------------------------------
     Doctor Error
  -------------------------------- */

  if (error && !doctor) {
    return (
      <main className="min-h-screen bg-[#FCFBF9]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F8EDE3]">
              <CalendarDays
                size={32}
                className="text-[#A47658]"
              />
            </div>

            <h1 className="mt-6 font-serif text-3xl text-[#473C36]">
              Unable to book appointment
            </h1>

            <p className="mt-2 text-sm text-[#8C847E]">
              {error}
            </p>

            <Link
              href="/doctors"
              className="mt-6 inline-flex rounded-2xl bg-[#527D6C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#446B5D]"
            >
              Back to Doctors
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* --------------------------------
     Main
  -------------------------------- */

  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />

      {/* Header */}
      <section className="px-4 pb-8 pt-8 sm:px-6 md:px-8 md:pb-10 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/doctor/${doctor._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#668394] transition hover:text-[#3F6678]"
          >
            <ArrowLeft size={17} />
            Back to doctor profile
          </Link>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47658]">
              Appointment
            </p>

            <h1 className="mt-3 font-serif text-3xl font-medium text-[#473C36] sm:text-4xl md:text-5xl">
              Book your consultation
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7E7772] sm:text-base">
              Choose a convenient date and time for your
              consultation with your selected doctor.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="px-4 pb-16 sm:px-6 md:px-8 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[380px_1fr]">

          {/* Doctor Summary */}
          <aside className="h-fit overflow-hidden rounded-[30px] border border-[#E9E5DF] bg-white shadow-sm">
            <div className="h-28 bg-[#EAF2F8]" />

            <div className="px-6 pb-7">
              <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[24px] border-4 border-white bg-[#E5F1EB] shadow-md">
                {doctor.profileImage ? (
                  <img
                    src={doctor.profileImage}
                    alt={doctor.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-4xl font-semibold text-[#527D6C]">
                    {doctor.fullName
                      .replace("Dr. ", "")
                      .charAt(0)}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-[#3E4747]">
                      {doctor.fullName}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-[#6E9387]">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF4D9] px-2.5 py-1 text-xs font-semibold text-[#B78531]">
                    <Star
                      size={13}
                      fill="currentColor"
                    />
                    {doctor.rating || "4.8"}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <BriefcaseMedical
                      size={18}
                      className="text-[#6E9387]"
                    />

                    <span className="text-sm text-[#666F6F]">
                      {doctor.experience} Years Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <GraduationCap
                      size={18}
                      className="text-[#6E9387]"
                    />

                    <span className="text-sm text-[#666F6F]">
                      {doctor.qualification}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-[#5D86A6]"
                    />

                    <span className="text-sm leading-5 text-[#666F6F]">
                      {doctor.hospital}
                      <br />
                      {doctor.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <IndianRupee
                      size={18}
                      className="text-[#A47658]"
                    />

                    <span className="text-sm font-semibold text-[#4D5757]">
                      ₹{doctor.consultationFee} consultation fee
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-7 rounded-2xl bg-[#F4F8F6] p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-[#527D6C]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#527D6C]">
                        Doctor Availability
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#7E8985]">
                        {doctor.availableDays?.length
                          ? doctor.availableDays.join(" • ")
                          : "Schedule not specified"}
                      </p>

                      {doctor.availableTime && (
                        <p className="mt-1 text-xs text-[#7E8985]">
                          Consultation hours:{" "}
                          {doctor.availableTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div className="mt-3 rounded-2xl bg-[#F8F5F1] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#A47658]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#6D5A4E]">
                        Verified Doctor
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#8C847E]">
                        Your appointment request will be
                        securely associated with this doctor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Booking Form */}
          <div className="rounded-[30px] border border-[#E9E5DF] bg-white p-6 shadow-sm sm:p-8 md:p-10">

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F1EB]">
                <CalendarDays
                  size={22}
                  className="text-[#527D6C]"
                />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-medium text-[#473C36]">
                  Appointment details
                </h2>

                <p className="mt-1 text-xs text-[#8C847E]">
                  Select your preferred consultation slot
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#F0D4D1] bg-[#FFF5F4] px-4 py-3 text-sm text-[#B0645C]">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#CFE4D5] bg-[#F1FAF3] px-4 py-3 text-sm font-medium text-[#4D8060]">
                <CheckCircle2 size={19} />
                {success}
              </div>
            )}

            <form
              onSubmit={handleBooking}
              className="mt-8 space-y-7"
            >
              {/* Date */}
              <div>
                <label
                  htmlFor="appointmentDate"
                  className="mb-2.5 block text-sm font-semibold text-[#4D5757]"
                >
                  Select appointment date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6E9387]"
                  />

                  <input
                    id="appointmentDate"
                    type="date"
                    min={today}
                    value={appointmentDate}
                    onChange={handleDateChange}
                    className={`w-full rounded-2xl border bg-[#FAFAF8] px-4 py-4 pl-12 text-sm text-[#344B5E] outline-none transition focus:ring-2 ${
                      dateValid
                        ? "border-[#E7E3DE] focus:border-[#B9D3E5] focus:ring-[#EAF2F8]"
                        : "border-[#E5A9A3] bg-[#FFF8F7] focus:border-[#D98C84] focus:ring-[#FFF0EE]"
                    }`}
                  />
                </div>

                {/* Available Days */}
                <div className="mt-3">
                  <p className="text-xs font-semibold text-[#7E7772]">
                    Doctor available on:
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {doctor.availableDays?.length ? (
                      doctor.availableDays.map((day) => (
                        <span
                          key={day}
                          className="rounded-full bg-[#F0F6F3] px-3 py-1.5 text-[11px] font-semibold text-[#527D6C]"
                        >
                          {day}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#99938D]">
                        Schedule not available
                      </span>
                    )}
                  </div>
                </div>

                {/* Date Message */}
                {dateMessage && (
                  <div
                    className={`mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ${
                      dateValid
                        ? "bg-[#F0F8F3] text-[#4D8060]"
                        : "bg-[#FFF3F1] text-[#B0645C]"
                    }`}
                  >
                    {dateValid ? (
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={15}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    <span>{dateMessage}</span>
                  </div>
                )}
              </div>

              {/* Time */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="mb-2.5 block text-sm font-semibold text-[#4D5757]">
                    Select appointment time
                  </label>

                  {checkingAvailability && (
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-[#7E8985]">
                      <RefreshCw
                        size={13}
                        className="animate-spin"
                      />
                      Checking slots...
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {timeSlots.map((time) => {
                    const isBooked =
                      bookedSlots.includes(time);

                    const isDisabled =
                      !appointmentDate ||
                      !dateValid ||
                      checkingAvailability ||
                      isBooked;

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          handleTimeSelect(time)
                        }
                        className={`relative flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border px-3 py-3.5 text-sm font-medium transition ${
                          isBooked
                            ? "cursor-not-allowed border-[#E7E3DE] bg-[#F1EFEC] text-[#AAA49D]"
                            : appointmentTime === time
                            ? "border-[#527D6C] bg-[#E4F1EB] text-[#527D6C] shadow-sm"
                            : "border-[#E7E3DE] bg-[#FAFAF8] text-[#687373] hover:border-[#BFD7CE] hover:bg-[#F4F8F6]"
                        } ${
                          !appointmentDate ||
                          !dateValid ||
                          checkingAvailability
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <LockKeyhole size={15} />
                            <span>Booked</span>
                          </>
                        ) : (
                          <>
                            <Clock3 size={16} />
                            <span>{time}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!appointmentDate && (
                  <p className="mt-3 text-xs text-[#99938D]">
                    Select a date first to see available time
                    slots.
                  </p>
                )}

                {appointmentDate &&
                  dateValid &&
                  !checkingAvailability &&
                  bookedSlots.length > 0 && (
                    <p className="mt-3 text-xs text-[#99938D]">
                      Grey slots are already booked. Please
                      choose another available time.
                    </p>
                  )}

                {appointmentDate &&
                  dateValid &&
                  !checkingAvailability &&
                  bookedSlots.length === timeSlots.length && (
                    <div className="mt-3 rounded-xl bg-[#FFF5F4] px-3 py-2.5 text-xs font-semibold text-[#B0645C]">
                      All available time slots are currently
                      booked for this date. Please choose
                      another date.
                    </div>
                  )}

                <p className="mt-2 text-xs text-[#99938D]">
                  Doctor's usual consultation time:{" "}
                  {doctor.availableTime || "Not specified"}
                </p>
              </div>

              {/* Reason */}
              <div>
                <label
                  htmlFor="reason"
                  className="mb-2.5 block text-sm font-semibold text-[#4D5757]"
                >
                  Reason for visit
                </label>

                <div className="relative">
                  <FileText
                    size={19}
                    className="pointer-events-none absolute left-4 top-4 text-[#8A9698]"
                  />

                  <textarea
                    id="reason"
                    value={reason}
                    onChange={handleReasonChange}
                    rows={5}
                    maxLength={500}
                    placeholder="Briefly describe why you want to consult the doctor..."
                    className="w-full resize-none rounded-2xl border border-[#E7E3DE] bg-[#FAFAF8] px-4 py-4 pl-12 text-sm leading-6 text-[#344B5E] outline-none placeholder:text-[#A2A7A5] focus:border-[#B9D3E5] focus:ring-2 focus:ring-[#EAF2F8]"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-[#99938D]">
                    Minimum 5 characters
                  </p>

                  <p className="text-xs text-[#99938D]">
                    {reason.length}/500
                  </p>
                </div>
              </div>

              {/* Fee */}
              <div className="rounded-2xl bg-[#F8F5F1] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#7E7772]">
                    Consultation fee
                  </span>

                  <span className="text-lg font-semibold text-[#473C36]">
                    ₹{doctor.consultationFee}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isBooking ||
                  !dateValid ||
                  !appointmentDate ||
                  !appointmentTime ||
                  checkingAvailability
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#527D6C] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#446B5D] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#527D6C] disabled:hover:shadow-none"
              >
                {isBooking ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Booking appointment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Confirm Appointment
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-[#99938D]">
                By confirming, you are requesting an appointment
                with the selected doctor. Final confirmation will
                depend on doctor availability.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* --------------------------------
   Suspense Wrapper
-------------------------------- */

export default function AppointmentPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FCFBF9]">
          <div className="text-center">
            <LoaderCircle
              size={38}
              className="mx-auto animate-spin text-[#5D86A6]"
            />

            <p className="mt-4 text-sm text-[#7E7772]">
              Loading appointment page...
            </p>
          </div>
        </main>
      }
    >
      <AppointmentPage />
    </Suspense>
  );
}