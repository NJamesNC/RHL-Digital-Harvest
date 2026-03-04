import { motion } from "framer-motion";
import { Phone, Globe, Bot, Calendar, BarChart3, Zap, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Phone,
    title: "AI Voice Receptionist",
    description: "Your 24/7 virtual receptionist answers every call, captures leads, books appointments, and provides information — even at 2 AM on a Sunday.",
    features: [
      "Answers calls in seconds, 24/7/365",
      "Captures caller name, number, and needs",
      "Books appointments directly on your calendar",
      "Customized to sound like your business",
      "Transfers urgent calls to you instantly",
    ],
  },
  {
    icon: Globe,
    title: "Smart Websites",
    description: "Modern, mobile-first websites designed to convert visitors into paying customers with built-in lead capture, scheduling, and trust signals.",
    features: [
      "Professional, fast-loading design",
      "Built-in lead capture forms",
      "Online scheduling integration",
      "SEO optimized for local search",
      "Mobile-responsive on every device",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "rgba(30, 58, 95, 0.08)", color: "#1e3a5f" }}>
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Two Powerful Tools.{" "}
            <span className="text-gold">One Mission.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Never lose another customer. Our AI-powered solutions work around the clock
            so you can focus on what you do best — running your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="p-8 lg:p-10 h-full border-border/50 hover-elevate" data-testid={`card-service-${index}`}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: index === 0 ? "linear-gradient(135deg, #d4af37, #f2d06b)" : "linear-gradient(135deg, #1e3a5f, #2a4a72)" }}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          {[
            { icon: Bot, title: "AI-Powered", desc: "Smart responses that learn your business" },
            { icon: Calendar, title: "Auto-Scheduling", desc: "Appointments booked without lifting a finger" },
            { icon: BarChart3, title: "Analytics Dashboard", desc: "Track every call, lead, and conversion" },
          ].map((item, index) => (
            <div key={item.title} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50" data-testid={`card-feature-${index}`}>
              <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
