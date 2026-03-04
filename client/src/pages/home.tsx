import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import ServicesSection from "@/components/services-section";
import HowItWorksSection from "@/components/how-it-works-section";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import TrialSignupSection from "@/components/trial-signup-section";
import ContactSection from "@/components/contact-section";
import ChatWidget from "@/components/chat-widget";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <TrialSignupSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </div>
  );
}
