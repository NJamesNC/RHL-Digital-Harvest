import { useState, useRef, useEffect } from "react";

const COLORS = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  gold: "#C9A030",
  goldLight: "#F0D080",
  blue: "#0096C7",
  blueLight: "#E0F4FA",
  gray: "#F5F5F5",
  grayMid: "#E0E0E0",
  grayText: "#666666",
};

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const globalStyle = `
  ${fonts}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${COLORS.white}; color: ${COLORS.black}; }
  h1,h2,h3 { font-family: 'Cormorant Garamond', serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);} }
  @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
  @keyframes shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
  .fade-up { animation: fadeUp 0.7s ease both; }
  .cta-primary {
    background: ${COLORS.gold};
    color: ${COLORS.black};
    border: none;
    padding: 16px 36px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .cta-primary:hover { background: ${COLORS.goldLight}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,160,48,0.3); }
  .cta-outline {
    background: transparent;
    color: ${COLORS.white};
    border: 2px solid ${COLORS.white};
    padding: 14px 34px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cta-outline:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
  .section { padding: 96px 24px; }
  .container { max-width: 1080px; margin: 0 auto; }
  .tag {
    display: inline-block;
    background: ${COLORS.blueLight};
    color: ${COLORS.blue};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 16px;
  }
`;

function Nav() {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 40);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.grayMid}` : "none",
      transition: "all 0.3s",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 44,
            height: 50,
            background: "#F0EDE6",
            clipPath: "polygon(50% 0%, 100% 12%, 100% 62%, 50% 100%, 0% 62%, 0% 12%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <img src="/rhl-logo.png" alt="RHL Digital" style={{ height: 36, width: 36, objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: scrolled ? COLORS.black : COLORS.white }}>RHL Digital</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "Pricing", "Demo"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: scrolled ? COLORS.grayText : "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}>{l}</a>
          ))}
          <a href="tel:+12107917775" style={{ color: "#B89A3E", textDecoration: "none", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
            📞 (210) 791-7775
          </a>
          <a href="#trial">
            <button className="cta-primary" style={{ padding: "10px 22px", fontSize: 14 }}>Book My Free Demo</button>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${COLORS.black} 0%, #1a1a2e 60%, #0a1628 100%)`,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 320, height: 320, borderRadius: "50%", border: `1px solid rgba(201,160,48,0.15)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "15%", right: "12%", width: 200, height: 200, borderRadius: "50%", border: `1px solid rgba(0,150,199,0.2)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,160,48,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div className="container" style={{ paddingTop: 100 }}>
        <div className="fade-up" style={{ maxWidth: 680 }}>
          <div className="tag" style={{ background: "rgba(201,160,48,0.15)", color: COLORS.gold }}>
            Meet Aria — AI Voice Receptionist
          </div>
          <h1 style={{
            fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.08,
            marginBottom: 24,
          }}>
            Never Miss<br />
            <span style={{
              background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.blue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Another Customer.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 19, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            Aria, your AI receptionist, answers every call, books appointments, and captures leads — 24 hours a day, 7 days a week. Built for small businesses ready to grow without the overhead.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#trial"><button className="cta-primary" style={{ fontSize: 17, padding: "18px 42px" }}>Book My Free Demo →</button></a>
            <a href="#demo"><button className="cta-outline" style={{ fontSize: 17, padding: "16px 40px" }}>Hear Aria Live</button></a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Hear Aria answer for your business before you spend a single dollar.</p>
            <a href="tel:+12107917775" style={{ display: "flex", alignItems: "center", gap: 8, color: "#B89A3E", textDecoration: "none", fontSize: 15, fontWeight: 600, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 16 }}>📞</span> Call us: (210) 791-7775
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          {[["24/7", "Always answering"], ["Free", "Demo available"], ["< 60s", "Setup time"], ["$0", "Missed calls cost"]].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: COLORS.gold }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section" style={{ background: COLORS.gray }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="tag">The Problem</div>
        <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, marginBottom: 16 }}>
          Every Missed Call Is a<br />Missed Customer
        </h2>
        <p style={{ color: COLORS.grayText, fontSize: 17, maxWidth: 560, margin: "0 auto 64px", lineHeight: 1.7 }}>
          Small businesses lose thousands of dollars every month to unanswered calls — especially after hours, on weekends, and during peak season.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { icon: "📞", stat: "62%", desc: "of callers won't leave a voicemail — they call your competitor" },
            { icon: "🌙", stat: "40%", desc: "of service calls happen outside normal business hours" },
            { icon: "💸", stat: "$1,200+", desc: "average monthly revenue lost to missed calls for home service businesses" },
          ].map(({ icon, stat, desc }) => (
            <div key={stat} style={{ background: COLORS.white, borderRadius: 12, padding: "36px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: COLORS.blue }}>{stat}</div>
              <p style={{ color: COLORS.grayText, fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RevenueCalculator() {
  const MISSED_PER_MONTH = 4;
  const MONTHS_MIN = 1;
  const MONTHS_MAX = 36;

  const [callValueInput, setCallValueInput] = useState("150");
  const [months, setMonths] = useState(12);

  const callValue = Math.max(0, parseInt(callValueInput.replace(/\D/g, ""), 10) || 0);
  const monthlyLost = callValue * MISSED_PER_MONTH;
  const totalLost = monthlyLost * months;

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  const handleCallValue = (val: string) => {
    setCallValueInput(val.replace(/\D/g, ""));
  };

  return (
    <section className="section" style={{ background: `linear-gradient(160deg, #0d0d1a 0%, #0a1628 100%)` }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ background: "rgba(201,160,48,0.15)", color: COLORS.gold }}>Revenue Calculator</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>
            How Much Is This Costing You?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Enter what a typical call is worth, then drag to see how the losses compound over time.
          </p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "48px 40px" }}>

          {/* Per-call value input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 16 }}>
              Average revenue lost per missed call{" "}
              <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
                (estimate based on {MISSED_PER_MONTH} missed calls/month)
              </span>
            </label>
            <div style={{ position: "relative", maxWidth: 280 }}>
              <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: COLORS.gold, fontSize: 26, fontWeight: 700, pointerEvents: "none" }}>$</span>
              <input
                type="text"
                inputMode="numeric"
                value={callValueInput}
                onChange={e => handleCallValue(e.target.value)}
                placeholder="150"
                style={{
                  width: "100%",
                  padding: "14px 18px 14px 40px",
                  borderRadius: 8,
                  border: `1px solid rgba(201,160,48,0.5)`,
                  background: "rgba(255,255,255,0.07)",
                  color: COLORS.white,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 34,
                  fontWeight: 700,
                  outline: "none",
                }}
              />
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 10 }}>
              Monthly loss: {MISSED_PER_MONTH} calls × ${callValue || 0} = <strong style={{ color: COLORS.gold }}>${monthlyLost.toLocaleString()}/mo</strong>
            </p>
          </div>

          {/* Months slider */}
          <div style={{ marginBottom: 48, marginTop: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Over how many months?</label>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: COLORS.gold }}>
                {months} <span style={{ fontSize: 16, fontWeight: 400, opacity: 0.6 }}>mo</span>
              </span>
            </div>
            <input
              type="range"
              min={MONTHS_MIN}
              max={MONTHS_MAX}
              step={1}
              value={months}
              onChange={e => setMonths(Number(e.target.value))}
              style={{ width: "100%", accentColor: COLORS.gold, cursor: "pointer", height: 6 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>1 month</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>3 years</span>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "rgba(201,160,48,0.08)", border: `1px solid rgba(201,160,48,0.2)`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Lost per Month</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>{fmt(monthlyLost)}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 8 }}>{MISSED_PER_MONTH} missed calls × ${callValue || 0}</div>
            </div>
            <div style={{ background: "rgba(0,150,199,0.08)", border: `1px solid rgba(0,150,199,0.2)`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Lost over {months} Month{months !== 1 ? "s" : ""}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: COLORS.blue, lineHeight: 1 }}>{fmt(totalLost)}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 8 }}>walking out the door</div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 20 }}>
              Aria costs a fraction of that. Stop the leak today.
            </p>
            <a href="#trial">
              <button className="cta-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Book My Free Demo →</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "We Set Up Aria", desc: "We train your AI receptionist on your business — your services, pricing, schedule, and FAQs. Ready in under 24 hours." },
    { n: "02", title: "Aria Answers Every Call", desc: "Your customers hear a professional, friendly voice that knows your business cold. No voicemail, no wait, no missed opportunities." },
    { n: "03", title: "You Get Booked & Paid", desc: "Aria captures leads, books appointments to your calendar, and sends you a real-time summary of every call." },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag">How It Works</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 700 }}>Up and Running in 24 Hours</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {steps.map(({ n, title, desc }) => (
            <div key={n} style={{ borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 28 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: COLORS.grayMid, lineHeight: 1, marginBottom: 12 }}>{n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
              <p style={{ color: COLORS.grayText, lineHeight: 1.7, fontSize: 15 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const list = [
    { icon: "🌿", label: "Lawn & Landscaping" },
    { icon: "🔧", label: "HVAC & Plumbing" },
    { icon: "🦷", label: "Dental & Medical" },
    { icon: "🍽️", label: "Restaurants & Cafes" },
    { icon: "🏠", label: "Home Services" },
    { icon: "🧹", label: "Cleaning Services" },
    { icon: "⚡", label: "Electricians" },
    { icon: "🐾", label: "Pet Services" },
  ];
  return (
    <section className="section" style={{ background: COLORS.black }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="tag" style={{ background: "rgba(201,160,48,0.15)", color: COLORS.gold }}>Who We Serve</div>
        <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>Built for Any Local Business</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 56 }}>If your phone rings, Aria can answer it.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {list.map(({ icon, label }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 100,
              padding: "12px 24px",
              color: COLORS.white,
              fontSize: 15,
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.background = "rgba(201,160,48,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            >
              <span>{icon}</span> {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter", price: "$297", desc: "Aria answers every call, captures leads, and fills your calendar — 24/7.",
      features: ["AI Voice Receptionist (Aria) 24/7", "Bilingual English & Spanish", "Lead capture from every call", "Monthly leads report", "Automated Booking System", "Lead Management CRM", "Email follow-up sequences"],
      cta: "Book My Free Demo", highlight: false,
    },
    {
      name: "Growth", price: "$497", desc: "Everything in Starter, plus a custom website to complete your digital presence.",
      features: ["Everything in Starter", "Custom Professional Website", "Live call summaries to your phone", "Appointment booking via phone", "Mobile responsive design", "Priority support"],
      cta: "Most Popular — Book My Free Demo", highlight: true,
    },
    {
      name: "Done-For-You", price: "$997", desc: "Full-service setup, onboarding, and monthly reporting.",
      features: ["Everything in Growth", "White-glove onboarding", "Custom Aria training & scripting", "Monthly performance reports", "Quarterly strategy calls", "Dedicated account manager"],
      cta: "Let's Talk", highlight: false,
    },
  ];
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag">Pricing</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, marginBottom: 12 }}>Simple, Honest Pricing</h2>
          <p style={{ color: COLORS.grayText, fontSize: 16 }}>No long-term contracts. Cancel anytime.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
          {tiers.map(({ name, price, desc, features, cta, highlight }) => (
            <div key={name} style={{
              border: highlight ? `2px solid ${COLORS.gold}` : `1px solid ${COLORS.grayMid}`,
              borderRadius: 16,
              padding: "40px 32px",
              background: highlight ? COLORS.black : COLORS.white,
              position: "relative",
              boxShadow: highlight ? `0 16px 48px rgba(201,160,48,0.15)` : "0 2px 16px rgba(0,0,0,0.05)",
              transform: highlight ? "scale(1.03)" : "scale(1)",
            }}>
              {highlight && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: COLORS.gold, color: COLORS.black, fontSize: 12, fontWeight: 700, padding: "4px 16px", borderRadius: 100, whiteSpace: "nowrap", letterSpacing: "0.08em" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 600, color: highlight ? COLORS.gold : COLORS.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: highlight ? COLORS.white : COLORS.black, lineHeight: 1 }}>{price}<span style={{ fontSize: 18, fontWeight: 400, opacity: 0.6 }}>/mo</span></div>
              <p style={{ color: highlight ? "rgba(255,255,255,0.6)" : COLORS.grayText, fontSize: 14, marginTop: 8, marginBottom: 28, lineHeight: 1.6 }}>{desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.gold, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: highlight ? "rgba(255,255,255,0.8)" : COLORS.grayText, fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#trial" style={{ textDecoration: "none" }}>
                <button
                  className={highlight ? "cta-primary" : ""}
                  style={!highlight ? {
                    width: "100%", padding: "14px", border: `2px solid ${COLORS.black}`, background: "transparent",
                    borderRadius: 4, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer",
                    transition: "all 0.2s",
                  } : { width: "100%", padding: "16px", fontSize: 15 }}
                  onMouseEnter={e => { if (!highlight) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.black; (e.currentTarget as HTMLButtonElement).style.color = COLORS.white; } }}
                  onMouseLeave={e => { if (!highlight) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = COLORS.black; } }}
                >{cta}</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Aria, RHL Digital's AI receptionist demo. Ask me anything about our services, pricing, or how I work for businesses like yours!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      let convId = conversationId;

      if (!convId) {
        const convRes = await fetch("/api/chat/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId: `demo-${Date.now()}` }),
        });
        const convData = await convRes.json();
        convId = convData.id;
        setConversationId(convId);
      }

      const msgRes = await fetch(`/api/chat/conversations/${convId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "text/event-stream" },
        body: JSON.stringify({ content: input.trim() }),
      });

      const reader = msgRes.body?.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  reply += parsed.content;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "assistant", content: reply };
                    return updated;
                  });
                }
              } catch {}
            }
          }
        }
      }

      if (!reply) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "I'm having a moment! Try refreshing and chatting again." };
          return updated;
        });
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having a moment! Try refreshing and chatting again." }]);
    }

    setLoading(false);
  };

  return (
    <section className="section" id="demo" style={{ background: COLORS.blueLight }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="tag">Live Demo</div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, marginBottom: 16 }}>Chat with Aria Right Now</h2>
            <p style={{ color: COLORS.grayText, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              This is a live version of what your customers would experience. Ask Aria about pricing, services, or how to get started.
            </p>
            <div style={{ padding: "24px", background: COLORS.black, borderRadius: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 32 }}>📞</div>
              <div>
                <div style={{ color: COLORS.gold, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Prefer to call?</div>
                <div style={{ color: COLORS.white, fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>Demo line coming soon</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>Call & speak with Aria live</div>
              </div>
            </div>
          </div>

          <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 8px 48px rgba(0,0,0,0.12)", overflow: "hidden" }}>
            <div style={{ background: COLORS.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>A</div>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>Aria — RHL Digital</div>
                <div style={{ color: COLORS.gold, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  Online now
                </div>
              </div>
            </div>
            <div style={{ height: 320, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%",
                    background: m.role === "user" ? COLORS.blue : COLORS.gray,
                    color: m.role === "user" ? COLORS.white : COLORS.black,
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}>{m.content || <span style={{ opacity: 0.4 }}>•••</span>}</div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: COLORS.gray, padding: "10px 16px", borderRadius: "12px 12px 12px 2px", fontSize: 20, letterSpacing: 4 }}>•••</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.grayMid}`, display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask Aria anything..."
                style={{ flex: 1, border: `1px solid ${COLORS.grayMid}`, borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }}
              />
              <button onClick={send} disabled={loading} style={{ background: COLORS.blue, color: COLORS.white, border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14, opacity: loading ? 0.6 : 1 }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", phone: "", email: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.business) return;
    setLoading(true);
    try {
      await fetch("/api/trial-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.business,
          businessType: "General",
        }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="section" id="trial" style={{ background: COLORS.black }}>
      <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
        <div className="tag" style={{ background: "rgba(201,160,48,0.15)", color: COLORS.gold }}>No Risk. No Pressure.</div>
        <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: COLORS.white, marginBottom: 16, lineHeight: 1.2 }}>
          Book a Free Demo —<br />
          <span style={{ color: COLORS.gold }}>Hear Aria Answer for YOUR Business</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          Before you spend a single dollar, hear exactly how Aria would greet your customers, handle your most common questions, and book your appointments — customized to your business.
        </p>
        {!submitted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            {[["name", "Your Name", "text"], ["business", "Business Name", "text"], ["phone", "Your Phone Number", "tel"], ["email", "Email Address", "email"]].map(([key, ph, type]) => (
              <input key={key} type={type} placeholder={ph} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{ padding: "14px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none" }}
              />
            ))}
            <button className="cta-primary" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8, padding: "18px", fontSize: 17, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sending..." : "Book My Free Demo →"}
            </button>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, textAlign: "center" }}>By submitting, you agree to be contacted by RHL Digital. We respect your privacy.</p>
          </div>
        ) : (
          <div style={{ padding: "48px", background: "rgba(201,160,48,0.1)", borderRadius: 16, border: `1px solid ${COLORS.gold}` }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🙌</div>
            <h3 style={{ color: COLORS.gold, fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 8 }}>Demo Booked!</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>We'll be in touch within 24 hours to set up your personalized Aria demo.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="section" style={{ background: COLORS.gray }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <div className="tag">San Antonio, TX</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 24, lineHeight: 1.25 }}>
          Be One of Our First San Antonio Clients
        </h2>
        <p style={{ color: COLORS.grayText, fontSize: 18, lineHeight: 1.8, marginBottom: 48, maxWidth: 580, margin: "0 auto 48px" }}>
          Help shape the future of AI for local business. As a founding client, you'll get our personal attention, direct line to James, and pricing that won't last forever.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
          {[
            { icon: "🤝", text: "White-glove onboarding from James personally" },
            { icon: "🔒", text: "Founding client pricing locked in for life" },
            { icon: "🏙️", text: "Proudly serving San Antonio small businesses" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 220, textAlign: "left" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
              <span style={{ color: COLORS.grayText, fontSize: 14, lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>
        <a href="#trial">
          <button className="cta-primary" style={{ fontSize: 17, padding: "18px 48px" }}>Claim Your Spot →</button>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#050505", padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: COLORS.white, marginBottom: 8 }}>RHL Digital</div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 4 }}>Reflect His Light LLC · San Antonio, Texas</p>
      <p style={{ color: COLORS.gold, fontSize: 12, fontStyle: "italic", marginBottom: 24 }}>"Whatever you do, work at it with all your heart." — Col. 3:23</p>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 24 }}>
        {["Privacy Policy", "Terms of Service", "Contact"].map(l => (
          <a key={l} href="#" style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none" }}>{l}</a>
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>© 2026 Reflect His Light LLC. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{globalStyle}</style>
      <Nav />
      <Hero />
      <Problem />
      <RevenueCalculator />
      <HowItWorks />
      <Industries />
      <Pricing />
      <DemoSection />
      <SocialProof />
      <LeadCapture />
      <Footer />
    </>
  );
}
