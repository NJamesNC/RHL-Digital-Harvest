import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, ArrowRight, DollarSign } from "lucide-react";

export default function PricingSection() {
  const [missedCalls, setMissedCalls] = useState([20]);
  const avgJobValue = 250;

  const stats = useMemo(() => {
    const calls = missedCalls[0];
    const monthlyLost = calls * avgJobValue;
    const yearlyLost = monthlyLost * 12;
    const monthlyCost = 97;
    const monthlyROI = monthlyLost - monthlyCost;
    return { calls, monthlyLost, yearlyLost, monthlyCost, monthlyROI };
  }, [missedCalls]);

  const plans = [
    {
      name: "Starter",
      price: 97,
      description: "Perfect for getting started",
      features: [
        "AI Voice Receptionist",
        "Up to 100 calls/month",
        "Lead capture & notifications",
        "Business hours customization",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: 197,
      description: "Most popular for growing businesses",
      features: [
        "Everything in Starter",
        "Unlimited calls/month",
        "Smart Website included",
        "Online scheduling",
        "Custom AI training",
        "Priority support",
        "Analytics dashboard",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: 397,
      description: "For established businesses",
      features: [
        "Everything in Growth",
        "Multiple phone lines",
        "Advanced analytics & reporting",
        "CRM integration",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28" data-testid="section-pricing">
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
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            See How Much You're{" "}
            <span className="text-gold">Losing Right Now</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drag the slider below to see how missed calls are costing your business — then check out our plans.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-20 p-8 lg:p-10 rounded-2xl border border-border/50 bg-card"
          data-testid="pricing-calculator"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">Revenue Loss Calculator</h3>
            <p className="text-sm text-muted-foreground">How many calls does your business miss per month?</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Missed Calls Per Month</span>
              <span className="text-2xl font-bold text-gold" data-testid="text-missed-calls">{stats.calls}</span>
            </div>
            <Slider
              value={missedCalls}
              onValueChange={setMissedCalls}
              min={1}
              max={100}
              step={1}
              className="mb-2"
              data-testid="slider-missed-calls"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 call</span>
              <span>100 calls</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "rgba(239, 68, 68, 0.06)" }}>
              <p className="text-xs text-muted-foreground mb-1">Monthly Loss</p>
              <p className="text-2xl font-bold" style={{ color: "#ef4444" }} data-testid="text-monthly-loss">
                ${stats.monthlyLost.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "rgba(239, 68, 68, 0.06)" }}>
              <p className="text-xs text-muted-foreground mb-1">Yearly Loss</p>
              <p className="text-2xl font-bold" style={{ color: "#ef4444" }} data-testid="text-yearly-loss">
                ${stats.yearlyLost.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "rgba(34, 197, 94, 0.06)" }}>
              <p className="text-xs text-muted-foreground mb-1">Monthly ROI</p>
              <p className="text-2xl font-bold" style={{ color: "#22c55e" }} data-testid="text-monthly-roi">
                +${stats.monthlyROI.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Based on an average job value of ${avgJobValue}. Your actual results may vary.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                plan.popular
                  ? "border-[#d4af37] bg-card"
                  : "border-border/50 bg-card"
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold text-white gold-gradient">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground mb-1">/mo</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#trial" style={{ textDecoration: "none" }}>
                <Button
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "gold-gradient text-white"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-plan-${plan.name.toLowerCase()}`}
                >
                  Start 7-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 7-day free trial. No credit card required to start.
          Sign up before your trial ends and get 15% off your first 3 months.
        </p>
      </div>
    </section>
  );
}
