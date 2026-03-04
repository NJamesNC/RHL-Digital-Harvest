import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/55670_1772641327314.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0f2847]/90 backdrop-blur-md border-b border-border/50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 shrink-0" data-testid="link-home">
            <img src={logoPath} alt="RHL Digital" className="h-10 sm:h-12 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight" style={{ color: "#1e3a5f" }}>RHL Digital</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Innovation with Integrity</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors rounded-md"
                style={{ textDecoration: "none" }}
                data-testid={`link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#trial" style={{ textDecoration: "none" }}>
              <Button
                className="gold-gradient text-white font-semibold shadow-lg"
                data-testid="button-start-trial-nav"
              >
                Start Free Trial
              </Button>
            </a>
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0f2847] border-t border-border/50 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-foreground/80 border-b border-border/30 last:border-0"
              style={{ textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
              data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
