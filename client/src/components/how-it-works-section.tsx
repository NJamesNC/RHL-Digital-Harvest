import { motion } from "framer-motion";
import { UserPlus, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up for Your Free Trial",
    description: "Start your 7-day free trial in under 2 minutes. No credit card required. Just tell us about your business and we'll set everything up.",
  },
  {
    number: "02",
    icon: Settings,
    title: "We Customize Everything",
    description: "Our team configures your AI voice assistant with your business details, hours, services, and FAQs. Your smart website is designed to match your brand.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Go Live Instantly",
    description: "Your AI receptionist starts answering calls immediately. Your new website begins capturing leads. It's that simple — no tech skills needed.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Watch Your Business Grow",
    description: "Track every captured lead, booked appointment, and answered call. See exactly how much revenue you're saving from missed opportunities.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-card" data-testid="section-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "rgba(212, 175, 55, 0.12)", color: "#d4af37" }}>
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Up and Running in{" "}
            <span className="text-gold">Minutes, Not Months</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We handle the heavy lifting. You focus on your business.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/40 to-[#d4af37]/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="text-center relative"
                data-testid={`step-${index}`}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ background: "linear-gradient(135deg, #1e3a5f, #2a4a72)" }}>
                  <step.icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
