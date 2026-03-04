import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, Globe, ArrowRight, Shield, Clock, TrendingUp } from "lucide-react";
import platformImage from "@assets/55590_(1)_1772641327313.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 navy-gradient" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-sm text-white/90 font-medium">Innovation with Integrity</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Stop Losing Customers to{" "}
              <span className="text-gold">Missed Calls</span>{" "}
              & Outdated Websites
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
              Your competitors are answering calls at 2 AM. Are you? RHL Digital gives you a 24/7 AI voice
              assistant and smart websites that capture every lead, so you never lose business again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#trial" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  className="gold-gradient text-white font-bold text-lg px-8 shadow-xl w-full sm:w-auto"
                  data-testid="button-hero-trial"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#how-it-works" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 w-full sm:w-auto"
                  data-testid="button-hero-learn"
                >
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Clock, label: "24/7 Coverage", desc: "Never miss a call" },
                { icon: TrendingUp, label: "More Leads", desc: "Capture every one" },
                { icon: Phone, label: "AI Powered", desc: "Smart responses" },
              ].map((item) => (
                <div key={item.label} className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 mb-2">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-xl" />
              <img
                src={platformImage}
                alt="RHL Digital All-in-One Platform"
                className="relative rounded-2xl shadow-2xl w-full"
                data-testid="img-hero-platform"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
