import { Link } from "wouter";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import logoSrc from "/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center" data-testid="footer-logo">
              <img src={logoSrc} alt="Apex Prestige" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Springfield's premier exotic car rental — delivering extraordinary vehicles to your door since 2018.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>697 Hilltop St, Springfield, MA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <a href="tel:+14045550192" className="hover:text-white transition-colors">(404) 555-0192</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <a href="mailto:hello@apexprestige.shop" className="hover:text-white transition-colors">hello@apexprestige.shop</a>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.instagram.com/apex.prestige" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all" data-testid="footer-instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all" data-testid="footer-facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {[
                { label: "Home", href: "/" },
                { label: "Our Fleet", href: "/fleet" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Services</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {[
                "Exotic Car Rental",
                "Luxury SUV Rental",
                "Wedding Packages",
                "Corporate Events",
                "Photoshoot Rentals",
                "FAQ",
                "Privacy Policy",
              ].map((s) => (
                <li key={s}>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white">Newsletter</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Join our VIP list for exclusive deals and new arrivals.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-[#111] border-white/8 text-white placeholder:text-gray-600 rounded-lg h-10 focus-visible:border-red-600 focus-visible:ring-0 text-sm"
                data-testid="footer-email"
              />
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg h-10 text-sm tracking-wide border-0"
                data-testid="footer-subscribe"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              By subscribing you agree to receive occasional emails from Apex Prestige. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© 2026 Apex Prestige. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
