import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be tech-savvy to use this?",
    answer: "Not at all. We handle all the setup and configuration for you. If you can answer a phone, you can use our platform. Plus, our support team is always available to help.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Your AI voice receptionist can be live within 24 hours of signing up. Smart websites typically take 3-5 business days for full custom design and launch.",
  },
  {
    question: "Will the AI sound robotic or unnatural?",
    answer: "Our AI uses the latest natural language technology to sound conversational and professional. Most callers can't tell they're speaking to an AI. We customize the voice and responses to match your business personality.",
  },
  {
    question: "What happens after my 7-day free trial?",
    answer: "After your trial, you can choose the plan that works best for you. No credit card is required to start. If you decide to continue and sign up before your trial ends, you'll get 15% off your first 3 months.",
  },
  {
    question: "Can the AI handle complex questions about my services?",
    answer: "Yes! We train the AI on your specific business, services, pricing, availability, and frequently asked questions. It can handle the vast majority of common inquiries and seamlessly transfers complex situations to you.",
  },
  {
    question: "What types of businesses does this work for?",
    answer: "Any business that takes phone calls or needs web traffic: HVAC, plumbing, lawn care, legal practices, coaching businesses, medical offices, real estate, cleaning services, and much more. If you miss calls, this is for you.",
  },
  {
    question: "Can I keep my existing phone number?",
    answer: "Absolutely. We set up call forwarding from your existing number. Your customers won't notice any change — they'll just get faster, more consistent service.",
  },
  {
    question: "What if I want to cancel?",
    answer: "You can cancel anytime with no penalties or long-term contracts. We believe in earning your business every month, not locking you in.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "rgba(30, 58, 95, 0.08)", color: "#1e3a5f" }}>
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Got Questions? <span className="text-gold">We've Got Answers.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-xl border border-border/50 bg-card px-6 data-[state=open]:border-[#d4af37]/30"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold text-sm py-4 [&[data-state=open]>svg]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
