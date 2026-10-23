import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Specialties from "@/components/Specialties";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Specialties />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}