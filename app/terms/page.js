import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  ShieldCheck,
  HeartPulse,
  UserCheck,
  CalendarCheck,
  AlertCircle,
  Scale,
} from "lucide-react";

const sections = [
  {
    icon: UserCheck,
    title: "1. Using CareConnect",
    content: [
      "CareConnect is a digital healthcare management platform that helps users discover healthcare professionals, manage appointments and access general healthcare-related information.",
      "By using CareConnect, you agree to use the platform responsibly and provide accurate information when creating or managing your account.",
      "You are responsible for maintaining the confidentiality of your account credentials and for activities performed through your account.",
    ],
  },
  {
    icon: CalendarCheck,
    title: "2. Appointments & Bookings",
    content: [
      "CareConnect allows patients to request appointments with available healthcare professionals through the platform.",
      "An appointment request may remain pending until it is confirmed by the healthcare professional.",
      "Appointment availability, timing and status may change. Users should check their appointment details before visiting a healthcare facility.",
      "CareConnect does not guarantee that every appointment request will be accepted or that a healthcare professional will always be available.",
    ],
  },
  {
    icon: HeartPulse,
    title: "3. Healthcare Information",
    content: [
      "Information provided through CareConnect is intended for general informational and healthcare-navigation purposes.",
      "The Smart Health Navigator provides general guidance based on the information entered by the user. It is not a medical diagnosis and should not replace professional medical advice.",
      "Always consult a qualified healthcare professional for diagnosis, treatment and medical decisions.",
    ],
  },
  {
    icon: AlertCircle,
    title: "4. Emergency Situations",
    content: [
      "CareConnect is not an emergency medical service.",
      "If you experience a serious or life-threatening emergency, contact your local emergency services or visit the nearest emergency department immediately.",
      "Do not rely solely on the Smart Health Navigator or any information displayed on the platform during a medical emergency.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "5. Privacy & Account Information",
    content: [
      "CareConnect may collect information necessary to provide account, appointment and healthcare-management functionality.",
      "Users should provide accurate information and should not share their account credentials with other people.",
      "We aim to handle user information responsibly and use appropriate security practices for the platform.",
    ],
  },
  {
    icon: Scale,
    title: "6. Responsible Use",
    content: [
      "Users must not misuse the platform, attempt to access another person's account, interfere with platform functionality or submit intentionally false information.",
      "CareConnect may restrict or suspend access where necessary to protect the platform, its users or healthcare professionals.",
    ],
  },
  {
    icon: FileText,
    title: "7. Platform Availability",
    content: [
      "We aim to keep CareConnect available and functional, but temporary interruptions may occur because of maintenance, technical issues or circumstances outside our control.",
      "Features may be updated, modified or improved as the platform develops.",
    ],
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#344B5E]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#E3F0FF]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#FCEAE3]/60 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E3F0FF]">
            <FileText
              size={26}
              strokeWidth={1.8}
              className="text-[#5B8CB8]"
            />
          </div>

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#5B8CB8]">
            CareConnect
          </p>

          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-[#344B5E] md:text-6xl">
            Terms &
            <span className="italic text-[#5B8CB8]">
              {" "}Conditions
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#71808C] md:text-base">
            Please read these terms carefully before using CareConnect.
            They explain the basic rules and responsibilities associated
            with using our platform.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#E7ECEF] bg-white px-4 py-2 text-xs text-[#7A8790] shadow-sm">
            <ShieldCheck
              size={14}
              className="text-[#82A98D]"
            />
            Last updated: September 2026
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-5xl">

          {/* Intro Card */}
          <div className="mb-6 rounded-[28px] border border-[#EAEFF2] bg-white p-6 shadow-sm md:p-8">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FCEAE3]">
                <HeartPulse
                  size={21}
                  className="text-[#C97963]"
                />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#344B5E]">
                  Welcome to CareConnect
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#71808C]">
                  CareConnect is designed to make everyday healthcare
                  management simpler and more organised. By accessing
                  or using the platform, you acknowledge that you have
                  read and understood these Terms & Conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  key={section.title}
                  className="rounded-[28px] border border-[#EAEFF2] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8"
                >
                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F6F9FA]">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#5B8CB8]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-xl font-semibold text-[#344B5E] md:text-2xl">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-3">
                        {section.content.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm leading-7 text-[#71808C]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Acceptance */}
          <div className="mt-6 rounded-[28px] bg-[#405E5A] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck
                  size={23}
                  className="text-[#BFD8CE]"
                />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold">
                  Your agreement
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#D7E5DF]">
                  By creating an account or continuing to use CareConnect,
                  you agree to follow these Terms & Conditions and use the
                  platform responsibly.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-[24px] border border-[#F0E3D8] bg-[#FFF9F4] p-5">
            <div className="flex gap-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-[#C4875D]"
              />

              <p className="text-xs leading-6 text-[#806E65]">
                <span className="font-semibold text-[#665047]">
                  Important:
                </span>{" "}
                CareConnect is a digital healthcare management platform.
                It does not replace professional medical consultation,
                diagnosis or emergency medical services.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;