import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock3, MapPin, Menu, MessageCircle, Moon, Phone, Sun, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EcgLine } from "@/components/EcgLine";
import { useTheme } from "@/hooks/useTheme";
import logoImage from "@/assets/wellstar-logo.jpg";
import { CLINIC_ADDRESS, MAPS_URL, navItems, PHARMACY_DELIVERY_URL, PHONE_URL, whatsappLink } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border px-2.5 py-2 transition-all duration-500 sm:px-3 ${
            scrolled || menuOpen
              ? "border-border/80 bg-card/80 shadow-[0_18px_40px_-24px_rgba(10,42,110,0.45)] backdrop-blur-xl"
              : "border-transparent bg-card/40 backdrop-blur-md"
          }`}
        >
          <Link
            to="/"
            className="flex min-w-0 items-center rounded-full bg-white px-3 py-1 ring-1 ring-black/5"
            aria-label="Wellstar Polyclinic & Diagnostic Centre home"
          >
            <img
              src={logoImage}
              alt="Wellstar Polyclinic and Diagnostic Centre"
              className="h-9 w-auto max-w-[170px] object-contain sm:h-10 sm:max-w-[200px]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-2.5 py-2 text-sm font-semibold xl:px-3.5 transition-colors ${
                    isActive ? "text-primary-foreground" : "text-foreground/75 hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </Button>

            <Button asChild variant="accent" className="hidden sm:inline-flex">
              <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                Book appointment <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE }}
              className="card-glass mx-auto mt-2 max-w-7xl p-3 lg:hidden"
            >
              <ul className="grid gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * index }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex min-h-12 items-center justify-between rounded-2xl px-4 font-display text-lg font-bold ${
                          isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                        }`
                      }
                    >
                      {item.label}
                      <ArrowUpRight aria-hidden="true" className="size-4 opacity-60" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Button asChild variant="accent" className="mt-3 w-full">
                <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                  Book appointment <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <motion.div
        key={pathname}
        id="main"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Outlet />
      </motion.div>

      <footer className="relative isolate overflow-hidden px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="bg-navy-mesh relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-white sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-80 animate-spin-slow rounded-full border border-dashed border-white/15"
            aria-hidden="true"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Multispecialty clinic. One roof. <span className="text-[#ff8a98]">Always near.</span>
              </p>
              <EcgLine className="mt-5 h-8 w-64" strokeClassName="stroke-[#3fd0da]" />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="light" size="lg">
                  <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                    Book appointment <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href={PHONE_URL}>
                    <Phone aria-hidden="true" /> +91 63620 64109
                  </a>
                </Button>
              </div>
            </div>
            <ul className="grid gap-5 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#3fd0da]" />
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="leading-6 hover:text-white">
                  {CLINIC_ADDRESS}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#3fd0da]" />
                <span className="leading-6">Mon–Sat 8 AM–10 PM · Sun 8 AM–1 PM</span>
              </li>
              <li className="flex gap-3">
                <Truck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#3fd0da]" />
                <span className="leading-6">
                  Pharmacy delivery:{" "}
                  <a href={PHARMACY_DELIVERY_URL} className="font-semibold text-white hover:underline">
                    +91 63637 78957
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="relative mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link to="/" className="font-display text-3xl font-black tracking-tight">
                Wellstar<span className="text-[#ff5a6e]">+</span>
              </Link>
              <p className="mt-2 text-sm text-white/70">Polyclinic & Diagnostic Centre · Hebbal, Bengaluru</p>
              <p className="mt-1 text-xs text-white/50">wellstar polyclinic and diagnostic centre © | all rights reserved</p>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              {navItems.slice(1).map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      <a
        href={whatsappLink("Hello, I would like to contact Wellstar.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Wellstar on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1faa59] text-white shadow-[0_16px_34px_-12px_rgba(31,170,89,0.8)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#1faa59]" aria-hidden="true" />
        <MessageCircle aria-hidden="true" className="relative size-6" />
      </a>
    </div>
  );
}
