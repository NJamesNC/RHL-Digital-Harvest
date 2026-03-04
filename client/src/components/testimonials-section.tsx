import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Owner, Johnson HVAC Services",
    quote: "Before RHL Digital, I was missing 15-20 calls a week while on jobs. Now my AI receptionist handles everything. I've booked 40% more appointments since switching.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, Mitchell Law Group",
    quote: "The smart website and AI receptionist combination has transformed my practice. Potential clients get immediate responses at any hour. My intake has doubled.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Owner, GreenScape Lawn Care",
    quote: "I used to lose every weekend call to competitors. Now my AI assistant books jobs while I'm mowing lawns. Best investment I've made for my business.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-card" data-testid="section-testimonials">
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Businesses That{" "}
            <span className="text-gold">Stopped Losing Customers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what happens when you never miss another call or lead.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 lg:p-8 rounded-2xl bg-background border border-border/50 hover-elevate"
              data-testid={`card-testimonial-${index}`}
            >
              <Quote className="w-8 h-8 text-gold/30 mb-4" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6 text-foreground/90">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
