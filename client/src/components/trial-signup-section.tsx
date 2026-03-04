import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, CheckCircle, Sparkles } from "lucide-react";
import { insertTrialSignupSchema, type InsertTrialSignup } from "@shared/schema";

const trialFormSchema = insertTrialSignupSchema.extend({
  fullName: insertTrialSignupSchema.shape.fullName.min(2, "Please enter your full name"),
  email: insertTrialSignupSchema.shape.email.email("Please enter a valid email address"),
  phone: insertTrialSignupSchema.shape.phone.min(10, "Please enter a valid phone number"),
  businessName: insertTrialSignupSchema.shape.businessName.min(2, "Please enter your business name"),
  businessType: insertTrialSignupSchema.shape.businessType.min(1, "Please select your business type"),
});

type TrialFormData = InsertTrialSignup;

const businessTypes = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Lawn Care / Landscaping",
  "Legal / Law Firm",
  "Medical / Dental",
  "Real Estate",
  "Coaching / Consulting",
  "Home Services",
  "Auto Repair",
  "Cleaning Services",
  "Construction",
  "Other",
];

export default function TrialSignupSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: TrialFormData) => {
      const res = await apiRequest("POST", "/api/trial-signups", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Welcome to RHL Digital!",
        description: "Your 7-day free trial has started. Check your email for next steps.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message.includes("409") ? "This email is already registered. Please use a different email or contact us for help." : "Please try again or contact us for assistance.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TrialFormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <section id="trial" className="py-20 lg:py-28" data-testid="section-trial-success">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">You're All Set!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your 7-day free trial has started. Check your email for setup instructions
              and your dedicated onboarding link.
            </p>
            <div className="p-4 rounded-xl bg-card border border-[#d4af37]/20">
              <p className="text-sm font-medium">
                <Sparkles className="w-4 h-4 inline mr-1 text-gold" />
                Sign up for a paid plan before your trial ends and get <span className="font-bold text-gold">15% off</span> your first 3 months!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="trial" className="py-20 lg:py-28 relative overflow-hidden" data-testid="section-trial">
      <div className="absolute inset-0 navy-gradient" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your{" "}
              <span className="text-gold">7-Day Free Trial</span>
              {" "}Today
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              No credit card required. No commitments. See for yourself how RHL Digital
              can transform your business in just one week.
            </p>

            <div className="space-y-4">
              {[
                "Your AI receptionist live within 24 hours",
                "Full access to all features during trial",
                "Dedicated onboarding support",
                "15% off if you subscribe before trial ends",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-8 text-white/60">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Your information is secure and never shared.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-card rounded-2xl p-6 sm:p-8 shadow-2xl"
              data-testid="form-trial-signup"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">Create Your Account</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium mb-1.5 block text-foreground">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    {...register("fullName")}
                    data-testid="input-full-name"
                    className="text-foreground"
                  />
                  {errors.fullName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.fullName.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-1.5 block text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@business.com"
                    {...register("email")}
                    data-testid="input-email"
                    className="text-foreground"
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...register("phone")}
                    data-testid="input-phone"
                    className="text-foreground"
                  />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.phone.message}</p>}
                </div>

                <div>
                  <Label htmlFor="businessName" className="text-sm font-medium mb-1.5 block text-foreground">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your Business Name"
                    {...register("businessName")}
                    data-testid="input-business-name"
                    className="text-foreground"
                  />
                  {errors.businessName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.businessName.message}</p>}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-1.5 block text-foreground">Business Type</Label>
                  <Select onValueChange={(val) => setValue("businessType", val)}>
                    <SelectTrigger data-testid="select-business-type" className="text-foreground">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.businessType.message}</p>}
                </div>

                <div>
                  <Label htmlFor="website" className="text-sm font-medium mb-1.5 block text-foreground">Current Website (optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourbusiness.com"
                    {...register("website")}
                    data-testid="input-website"
                    className="text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gold-gradient text-white font-bold text-lg mt-2"
                  disabled={mutation.isPending}
                  data-testid="button-submit-trial"
                >
                  {mutation.isPending ? "Creating your account..." : "Start Free Trial"}
                  {!mutation.isPending && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                7-day free trial. No credit card required. Cancel anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
