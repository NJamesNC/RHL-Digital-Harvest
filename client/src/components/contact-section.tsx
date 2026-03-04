import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";

const contactSchema = insertContactSubmissionSchema.extend({
  fullName: insertContactSubmissionSchema.shape.fullName.min(2, "Please enter your name"),
  email: insertContactSubmissionSchema.shape.email.email("Please enter a valid email"),
  message: insertContactSubmissionSchema.shape.message.min(10, "Please enter a message (at least 10 characters)"),
});

type ContactFormData = InsertContactSubmission;

export default function ContactSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      reset();
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    },
    onError: () => {
      toast({ title: "Failed to send", description: "Please try again.", variant: "destructive" });
    },
  });

  return (
    <section id="contact" className="py-20 lg:py-28 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(212, 175, 55, 0.12)", color: "#d4af37" }}>
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Have Questions? <span className="text-gold">Let's Talk.</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Not sure if RHL Digital is right for your business? Send us a message and
              we'll give you an honest assessment — no pressure, no hard sell.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@rhldigital.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="p-8 rounded-2xl bg-background border border-border/50 text-center">
                <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Received!</h3>
                <p className="text-muted-foreground mb-4">We'll respond within 24 hours.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)} data-testid="button-send-another">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className="p-6 sm:p-8 rounded-2xl bg-background border border-border/50"
                data-testid="form-contact"
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactName" className="text-sm font-medium mb-1.5 block">Full Name</Label>
                    <Input id="contactName" placeholder="Your name" {...register("fullName")} data-testid="input-contact-name" />
                    {errors.fullName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="text-sm font-medium mb-1.5 block">Email</Label>
                    <Input id="contactEmail" type="email" placeholder="you@email.com" {...register("email")} data-testid="input-contact-email" />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contactPhone" className="text-sm font-medium mb-1.5 block">Phone (optional)</Label>
                    <Input id="contactPhone" type="tel" placeholder="(555) 123-4567" {...register("phone")} data-testid="input-contact-phone" />
                  </div>
                  <div>
                    <Label htmlFor="contactMessage" className="text-sm font-medium mb-1.5 block">Message</Label>
                    <Textarea
                      id="contactMessage"
                      placeholder="Tell us about your business and what you're looking for..."
                      rows={4}
                      {...register("message")}
                      data-testid="input-contact-message"
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full gold-gradient text-white font-semibold"
                    disabled={mutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                    {!mutation.isPending && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
