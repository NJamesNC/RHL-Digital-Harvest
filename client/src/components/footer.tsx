import logoPath from "@assets/55670_1772641327314.png";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 lg:py-16 navy-gradient" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoPath} alt="RHL Digital" className="h-10 w-auto" />
              <div>
                <p className="text-white font-bold">RHL Digital</p>
                <p className="text-white/50 text-xs">Innovation with Integrity</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Helping small businesses never miss another customer with AI-powered voice assistants and smart websites.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {["AI Voice Receptionist", "Smart Websites", "Lead Capture", "Online Scheduling"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60" style={{ textDecoration: "none" }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-2">
              {["HVAC & Plumbing", "Lawn Care", "Legal Firms", "Coaching", "Home Services", "Medical"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} RHL Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Innovation with Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
