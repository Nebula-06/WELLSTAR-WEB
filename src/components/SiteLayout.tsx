import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import logoImage from "@/assets/wellstar-logo.jpg";
import { navItems, PHONE_URL, whatsappLink } from "@/data/site";

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Wellstar Polyclinic & Diagnostic Centre home">
            <img
              src={logoImage}
              alt="Wellstar Polyclinic and Diagnostic Centre"
              className="h-11 w-auto max-w-[220px] object-contain object-left sm:h-12"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative text-sm transition-colors hover:text-primary ${
                    isActive
                      ? "font-semibold text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                      : "text-foreground/75"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-sm"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>

            <Button asChild variant="default" className="hidden min-h-11 rounded-sm px-5 sm:inline-flex">
              <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                Book appointment <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-sm lg:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border bg-background/95 px-5 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `min-h-11 py-3 text-sm ${isActive ? "font-semibold text-primary" : "text-foreground"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild className="mt-2 min-h-11 justify-center rounded-sm">
                <a href={whatsappLink("Hello, I would like to book an appointment.")} target="_blank" rel="noreferrer">
                  Book appointment <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <Outlet />

      <footer className="relative overflow-hidden border-t border-border bg-foreground px-5 py-12 text-background sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,191,149,0.18),transparent_40%)]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link to="/" className="font-display text-3xl tracking-tight">Wellstar</Link>
            <p className="mt-2 text-sm text-background/70">Polyclinic & Diagnostic Centre · Hebbal, Bengaluru</p>
            <p className="mt-1 text-xs text-background/50">wellstar polyclinic and diagnostic centre © | all rights reserved</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-background/80">
            <Link to="/about" className="hover:text-background">About</Link>
            <Link to="/services" className="hover:text-background">Services</Link>
            <Link to="/doctors" className="hover:text-background">Doctors</Link>
            <Link to="/lab" className="hover:text-background">Lab</Link>
            <Link to="/contact" className="hover:text-background">Contact</Link>
            <a href={PHONE_URL} className="inline-flex items-center gap-2 hover:text-background">
              <Phone aria-hidden="true" className="size-4" /> +91 63620 64109
            </a>
          </div>
        </div>
      </footer>

      <Button asChild size="icon" aria-label="Chat with Wellstar on WhatsApp" className="fixed bottom-5 right-5 z-40 min-h-12 min-w-12 rounded-full shadow-[0_12px_30px_-10px_rgba(22,90,64,0.65)] sm:bottom-7 sm:right-7">
        <a href={whatsappLink("Hello, I would like to contact Wellstar.")} target="_blank" rel="noreferrer">
          <Phone aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}
