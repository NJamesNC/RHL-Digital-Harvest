import { motion } from "framer-motion";
import { PhoneOff, Clock, Users, DollarSign } from "lucide-react";

const problems = [
  {
    icon: PhoneOff,
    title: "Missing Calls = Missing Revenue",
    description: "62% of calls to small businesses go unanswered. Every missed call is a customer going to your competitor instead.",
  },
  {
    icon: Clock,
    title: "Customers Won't Wait",
    description: "78% of customers buy from the company that responds first. If you're busy on a job or closed for the day, they move on.",
  },
  {
    icon: Users,
    title: "Hiring Help Is Expensive",
    description: "A full-time receptionist costs $35,000+ per year. And they still can't work 24/7, weekends, or holidays.",
  },
  {
    icon: DollarSign,
    title: "Your Website Isn't Working For You",
    description: "An outdated website loses credibility instantly. If it doesn't capture leads and allow scheduling, you're leaving money on the table.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-background" data-testid="section-problem">
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
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Your Business Is{" "}
            <span className="text-gold">Bleeding Customers</span>
            <br />and You Might Not Even Know It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every day, small businesses lose thousands of dollars in potential revenue simply
            because they can't answer every call or their website doesn't convert visitors into leads.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 lg:p-8 rounded-xl bg-card border border-border/50 hover-elevate"
              data-testid={`card-problem-${index}`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                  <problem.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
