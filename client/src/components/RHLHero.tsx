import { useEffect, useRef, useState } from "react";

type HeadlineSeg = { t: string; gold?: boolean };

type RHLHeroProps = {
  videoMp4?: string;
  videoWebm?: string;
  poster?: string;
  mobileMp4?: string;
  mobileWebm?: string;
  mobilePoster?: string;
  logoSrc?: string;
  headline?: HeadlineSeg[];
  sublineEn?: string;
  sublineEs?: string;
  ctaText?: string;
  ctaHref?: string;
};

/**
 * RHLHero — animated 3D hero section for RHL Digital
 * --------------------------------------------------
 * Drop-in React component.
 * Auto-swaps a widescreen loop on desktop and a portrait loop on phones.
 *
 * SETUP: place these 7 files in /public (served at site root):
 *   hero-desktop.mp4 / .webm / .jpg
 *   hero-mobile.mp4 / .webm / .jpg
 *   rhl-logo-light.png
 */
export default function RHLHero({
  // Desktop (16:9) loop
  videoMp4 = "/hero-desktop.mp4",
  videoWebm = "/hero-desktop.webm",
  poster = "/hero-desktop.jpg",
  // Mobile (9:16) loop
  mobileMp4 = "/hero-mobile.mp4",
  mobileWebm = "/hero-mobile.webm",
  mobilePoster = "/hero-mobile.jpg",
  logoSrc = "/rhl-logo-light.png",
  // Headline is an array of segments; { gold:true } renders that word(s) in gold.
  headline = [
    { t: "AI that runs your " },
    { t: "front desk", gold: true },
    { t: ", your " },
    { t: "website", gold: true },
    { t: ", and your " },
    { t: "busywork", gold: true },
    { t: "." },
  ],
  sublineEn = "Built for San Antonio business.",
  sublineEs = "Hecho para tu negocio.",
  ctaText = "Book a free consultation",
  ctaHref = "https://calendly.com/james-rhldigital",
}: RHLHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Load Poppins once (idempotent) so the component is truly drop-in.
  useEffect(() => {
    if (!document.getElementById("rhl-poppins")) {
      const l = document.createElement("link");
      l.id = "rhl-poppins";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;0,800;1,500&display=swap";
      document.head.appendChild(l);
    }
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Pick the portrait loop on phones / portrait screens, widescreen otherwise.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener
      ? mq.addEventListener("change", set)
      : (mq as MediaQueryList).addListener(set);
    return () =>
      mq.removeEventListener
        ? mq.removeEventListener("change", set)
        : (mq as MediaQueryList).removeListener(set);
  }, []);

  // Cursor parallax — fine pointers only, respects reduced-motion. rAF-throttled.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx;
      ty = ny;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      root.style.setProperty("--px", (tx * -16).toFixed(2) + "px");
      root.style.setProperty("--py", (ty * -11).toFixed(2) + "px");
      root.style.setProperty("--cx", (tx * 8).toFixed(2) + "px");
      root.style.setProperty("--cy", (ty * 6).toFixed(2) + "px");
    };
    const onLeave = () => {
      root.style.setProperty("--px", "0px");
      root.style.setProperty("--py", "0px");
      root.style.setProperty("--cx", "0px");
      root.style.setProperty("--cy", "0px");
    };
    root.addEventListener("mousemove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Pause the video when the hero is offscreen (battery / perf).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [isMobile]);

  const srcMp4 = isMobile ? mobileMp4 : videoMp4;
  const srcWebm = isMobile ? mobileWebm : videoWebm;
  const srcPoster = isMobile ? mobilePoster : poster;

  return (
    <section
      ref={rootRef}
      className={`rhl-hero${mounted ? " is-in" : ""}`}
      aria-label="RHL Digital"
      data-testid="hero-rhl"
    >
      <style>{CSS}</style>

      <div className="rhl-hero__bg">
        <video
          key={isMobile ? "m" : "d"}
          ref={videoRef}
          className="rhl-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster={srcPoster}
          aria-hidden="true"
        >
          <source src={srcWebm} type="video/webm" />
          <source src={srcMp4} type="video/mp4" />
        </video>
        <div className="rhl-hero__scrim" aria-hidden="true" />
        <div className="rhl-hero__grain" aria-hidden="true" />
      </div>

      <div className="rhl-hero__content">
        <div
          className="rhl-hero__logo rhl-rise"
          style={{ "--d": "0.10s" } as React.CSSProperties}
        >
          <img src={logoSrc} alt="RHL Digital" draggable="false" />
          <span className="rhl-hero__shine" aria-hidden="true" />
        </div>

        <h1
          className="rhl-hero__title rhl-rise"
          style={{ "--d": "0.34s" } as React.CSSProperties}
        >
          {headline.map((seg, i) => (
            <span key={i} className={seg.gold ? "g" : undefined}>
              {seg.t}
            </span>
          ))}
        </h1>

        <p
          className="rhl-hero__sub rhl-rise"
          style={{ "--d": "0.58s" } as React.CSSProperties}
        >
          {sublineEn} <span className="es">{sublineEs}</span>
        </p>

        <a
          href={ctaHref}
          className="rhl-hero__cta rhl-rise"
          style={{ "--d": "0.80s" } as React.CSSProperties}
          data-testid="button-hero-cta"
        >
          {ctaText}
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

const CSS = `
.rhl-hero{
  --navy:#1B3A8C; --gold:#C9B45A; --ink:#0a1228;
  --px:0px; --py:0px; --cx:0px; --cy:0px;
  position:relative; width:100%; min-height:600px; height:100svh;
  overflow:hidden; background:var(--ink); isolation:isolate;
  font-family:'Poppins',ui-sans-serif,system-ui,sans-serif;
}
.rhl-hero__bg{position:absolute; inset:0; z-index:0;}
.rhl-hero__video{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  transform:translate3d(var(--px),var(--py),0) scale(1.1);
  transition:transform .25s cubic-bezier(.2,.7,.2,1); will-change:transform;
}
.rhl-hero__scrim{
  position:absolute; inset:0;
  background:
    radial-gradient(120% 90% at 50% 42%, transparent 38%, rgba(6,12,30,.62) 100%),
    linear-gradient(180deg, rgba(6,12,30,.55) 0%, transparent 26%, transparent 64%, rgba(6,12,30,.78) 100%);
}
.rhl-hero__grain{
  position:absolute; inset:0; opacity:.05; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.rhl-hero__content{
  position:relative; z-index:2; height:100%;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; gap:clamp(16px,2.4vw,26px);
  padding:clamp(28px,5vw,72px);
  transform:translate3d(var(--cx),var(--cy),0);
  transition:transform .3s cubic-bezier(.2,.7,.2,1);
}
.rhl-hero__logo{position:relative; display:inline-block; overflow:hidden; border-radius:8px;}
.rhl-hero__logo img{
  display:block; width:clamp(150px,21vw,260px); height:auto;
  filter:drop-shadow(0 6px 22px rgba(0,0,0,.45)); user-select:none;
}
/* gold shimmer sweep across the logo on entrance */
.rhl-hero__shine{
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.55) 48%,rgba(201,180,90,.65) 52%,transparent 62%);
  transform:translateX(-130%);
}
.rhl-hero.is-in .rhl-hero__shine{animation:rhl-shine 1.5s ease 1.05s 1;}
@keyframes rhl-shine{0%{transform:translateX(-130%)}100%{transform:translateX(130%)}}

.rhl-hero__title{
  margin:0; color:#fff; font-weight:800;
  font-size:clamp(28px,5.1vw,62px); line-height:1.07; letter-spacing:-.02em;
  max-width:17ch; text-shadow:0 2px 10px rgba(0,0,0,.9),0 1px 28px rgba(0,0,0,.55);
}
.rhl-hero__title .g{color:#fff;background:none;-webkit-text-fill-color:#fff;}
.rhl-hero__sub{
  margin:0; color:rgba(255,255,255,.82); font-weight:500;
  font-size:clamp(15px,2.1vw,20px); letter-spacing:.01em;
}
.rhl-hero__sub .es{color:var(--gold); font-style:italic; font-weight:500;}
.rhl-hero__cta{
  display:inline-flex; align-items:center; gap:.6em; text-decoration:none;
  margin-top:clamp(4px,1vw,10px);
  padding:clamp(13px,1.4vw,17px) clamp(24px,2.6vw,34px);
  color:#13245c; font-weight:700; font-size:clamp(15px,1.7vw,18px);
  border-radius:999px;
  background:linear-gradient(180deg,#E4CF77 0%,#C9B45A 100%);
  box-shadow:0 10px 30px rgba(201,180,90,.32), inset 0 1px 0 rgba(255,255,255,.5);
  transition:transform .2s ease, box-shadow .2s ease, filter .2s ease;
}
.rhl-hero__cta svg{transition:transform .2s ease;}
.rhl-hero__cta:hover{transform:translateY(-2px); box-shadow:0 16px 40px rgba(201,180,90,.45); filter:brightness(1.04);}
.rhl-hero__cta:hover svg{transform:translateX(4px);}

/* staggered entrance */
.rhl-rise{opacity:0; transform:translateY(20px); filter:blur(6px);}
.rhl-hero.is-in .rhl-rise{
  animation:rhl-rise .9s cubic-bezier(.2,.75,.2,1) forwards; animation-delay:var(--d,0s);
}
@keyframes rhl-rise{to{opacity:1; transform:translateY(0); filter:blur(0);}}

@media (max-width:768px){
  .rhl-hero{height:90svh; min-height:540px;}
  .rhl-hero__video{transform:scale(1.04);}     /* parallax disabled on touch */
}
@media (prefers-reduced-motion:reduce){
  .rhl-hero__video{transform:scale(1.04); transition:none;}
  .rhl-hero__content{transform:none;}
  .rhl-rise{opacity:1; transform:none; filter:none; animation:none;}
  .rhl-hero.is-in .rhl-hero__shine{animation:none;}
}
`;
