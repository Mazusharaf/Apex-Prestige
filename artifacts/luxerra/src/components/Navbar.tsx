import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoSrc from "/logo.png";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Fleet", path: "#fleet" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center" data-testid="nav-logo">
          <img src={logoSrc} alt="Apex Prestige" className="h-10 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.path.startsWith("#") ? (
              <button
                key={link.name}
                onClick={() => scrollTo(link.path)}
                className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide"
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm tracking-wide transition-colors ${
                  location === link.path ? "text-white" : "text-gray-300 hover:text-white"
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+14045550192"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            data-testid="nav-phone"
          >
            <Phone className="w-4 h-4" />
            (404) 555-0192
          </a>
          <Button
            onClick={() => scrollTo("#contact")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 h-9 text-sm tracking-wide border-0"
            data-testid="nav-book-now"
          >
            Book Now
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) =>
            link.path.startsWith("#") ? (
              <button
                key={link.name}
                onClick={() => scrollTo(link.path)}
                className="text-left text-base text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
          <Button
            onClick={() => scrollTo("#contact")}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg w-full"
          >
            Book Now
          </Button>
        </div>
      )}
    </nav>
  );
}
