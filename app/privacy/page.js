import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  UserRound,
  Cookie,
  Share2,
  Eye,
  HeartPulse,
  Mail,
  AlertCircle,
} from "lucide-react";

const privacySections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: [
      "When you create or use a CareConnect account, we may collect information such as your name, email address, phone number, account role and other information you choose to provide.",
      "When patients use appointment-related features, information such as selected doctor, appointment date, appointment time and appointment reason may be stored to provide the requested service.",
      "We may also collect basic technical information required for the platform to function properly.",
    ],
  },
  {
    icon: UserRound,
    title: "2. How We Use Your Information",
    content: [
      "Information may be used to create and manage your CareConnect account and provide the features available on the platform.",
      "We may use information to facilitate doctor discovery, appointment booking, appointment management and healthcare-navigation features.",
      "Information may also be used to maintain platform security, troubleshoot technical issues and improve the user experience.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "3. Password & Account Security",
    content: [
      "CareConnect is designed to protect account credentials using appropriate security practices.",
      "Passwords are not intended to be stored as plain text. Account passwords are securely processed before being stored.",
      "Users are responsible for keeping their login credentials confidential and should immediately take appropriate action if they believe their account has been accessed without permission.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "4. Protecting Your Information",
    content: [
      "We aim to use reasonable technical and organisational measures to protect information handled by the platform.",
      "Access to information should be limited to what is necessary for providing and maintaining CareConnect functionality.",
      "However, no internet-based platform can guarantee absolute security.",
    ],
  },
  {
    icon: Share2,
    title: "5. Information Sharing",
    content: [
      "CareConnect does not intend to sell users' personal information.",
      "Information may be made available within the platform where necessary to provide requested functionality. For example, appointment-related information may be used to connect a patient with the selected healthcare professional.",
      "Information may also need to be disclosed where required by applicable law or to protect the security and integrity of the platform.",
    ],
  },
  {
    icon: Cookie,
    title: "6. Cookies & Technical Information",
    content: [
      "CareConnect may use cookies or similar browser-based technologies required for authentication, session management and essential platform functionality.",
      "Technical information may be processed to maintain security, understand technical problems and improve platform performance.",
    ],
  },
  {
    icon: HeartPulse,
    title: "7. Healthcare Information",
    content: [
      "CareConnect may process information entered by users when they use healthcare-related features such as appointment booking or the Smart Health Navigator.",
      "The Smart Health Navigator is a rule-based guidance feature. It does not provide a medical diagnosis and should not be treated as a substitute for professional medical advice.",
      "Users should avoid relying on the platform alone when dealing with serious or emergency medical situations.",
    ],
  },
  {
    icon: Eye,
    title: "8. Your Choices",
    content: [
      "Users should provide accurate information when creating and managing their accounts.",
      "Where applicable, users may request correction of inaccurate account information or choose to stop using the platform.",
      "Certain information may need to be retained where it is necessary for legitimate platform operations, security or legal requirements.",
    ],
  },
  {
    icon: Mail,
    title: "9. Contact & Questions",
    content: [
      "If you have questions about this Privacy Policy or how information is handled within CareConnect, please contact the project or platform administrator through the contact details provided by CareConnect.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#344B5E]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#E3F0FF]/60 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#E4F3EE]/70 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E4F3EE]">
            <ShieldCheck
              size={27}
              strokeWidth={1.8}
              className="text-[#5B927D]"
            />
          </div>

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#5B927D]">
            CareConnect
          </p>

          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-[#344B5E] md:text-6xl">
            Privacy
            <span className="italic text-[#5B927D]">
              {" "}Policy
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#71808C] md:text-base">
            Your privacy matters to us. This policy explains what
            information CareConnect may collect, how it may be used,
            and the steps we take to protect it.
          </p>

          {/* Updated badge */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#E5ECE8] bg-white px-4 py-2 text-xs text-[#7A8790] shadow-sm">
            <LockKeyhole
              size={14}
              className="text-[#82A98D]"
            />
            Last updated: September 2026
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-5xl">

          {/* INTRO */}
          <div className="mb-6 rounded-[28px] border border-[#E7EEEA] bg-white p-6 shadow-sm md:p-8">
            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E4F3EE]">
                <ShieldCheck
                  size={21}
                  className="text-[#5B927D]"
                />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#344B5E]">
                  Your privacy at a glance
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#71808C]">
                  CareConnect is designed to provide healthcare-management
                  functionality while treating user information responsibly.
                  By using the platform, you acknowledge the practices
                  described in this Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* PRIVACY SECTIONS */}
          <div className="space-y-4">
            {privacySections.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  key={section.title}
                  className="rounded-[28px] border border-[#E7EEEA] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8"
                >
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F4F8F6]">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#5B927D]"
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

          {/* SECURITY CARD */}
          <div className="mt-6 overflow-hidden rounded-[30px] bg-[#405E5A] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <LockKeyhole
                  size={23}
                  className="text-[#BFD8CE]"
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#BFD8CE]">
                  Privacy by design
                </p>

                <h2 className="mt-2 font-serif text-xl font-semibold">
                  We take responsible data handling seriously.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#D7E5DF]">
                  CareConnect is built with account security, controlled
                  access and responsible information handling in mind.
                </p>
              </div>
            </div>
          </div>

          {/* IMPORTANT NOTICE */}
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
                This Privacy Policy is intended for the CareConnect
                project/platform and describes its intended information
                handling practices. If CareConnect is deployed as a
                real-world healthcare service, this policy should be
                reviewed and adapted to applicable privacy and healthcare
                regulations before use.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;