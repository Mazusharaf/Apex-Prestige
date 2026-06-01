import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import rollsImg from "@assets/10973330-a988-4d17-b05e-25d9fa6d91d6_1780237795691.png";
import bentleyImg from "@assets/14bba46b-e1e9-4b2f-a6cd-48e4651acd8a_1780237795691.png";
import lamboImg from "@assets/fb99b118-25ef-4d7a-b914-0123d5cd80b8_1780237795692.png";
import corvetteWhiteImg from "@assets/43f64441-0f26-44a4-8c48-9f3118d8dd83_1780237795691.jpeg";
import corvetteRedImg from "@assets/6ef759e3-d2d2-4e46-a717-64c658d900cb_1780237795690.png";
import cadillacImg from "@assets/37059462-06d4-4b62-b282-76abd7d8615e_1780237795692.jpeg";
import heroImg1 from "@assets/09ebe51e-b3b8-4d41-abda-0beda49c3c85_1780238549515.jpeg";
import heroImg2 from "@assets/2024-Cadillac-Escalade-V-823-1_1780238549515.jpg";
import heroImg3 from "@assets/ac4ee7a8-53ff-4231-9e6b-d4d9865b7573_1780238549516.jpeg";
import heroImg4 from "@assets/f66b8cd5-185e-45bc-9087-09de2073c9c1_1780238549516.jpeg";
import servicesApexImg from "@assets/generated-image-74-qpYqElaNEzMETHe7_1780241171342.avif";
import servicesPrestigeImg from "@assets/generated-image-76-MwXqIe9kqkDq0xuk_1780241158200.avif";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Shield,
  Truck,
  Phone,
  CheckCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HERO_SLIDES = [
  {
    url: heroImg1,
    label: "Corvette Interior",
  },
  {
    url: heroImg2,
    label: "Cadillac Escalade",
  },
  {
    url: heroImg3,
    label: "Bentley Bentayga",
  },
  {
    url: heroImg4,
    label: "Corvette Red",
  },
];

const FLEET = [
  { make: "Rolls-Royce", model: "Cullinan", img: rollsImg, slug: "rolls-royce-cullinan" },
  { make: "Bentley", model: "Bentayga", img: bentleyImg, slug: "bentley-bentayga" },
  { make: "Lamborghini", model: "Huracán", img: lamboImg, slug: "lamborghini-huracan" },
  { make: "Corvette", model: "C8 White", img: corvetteWhiteImg, slug: "corvette-c8-white" },
  { make: "Corvette", model: "C8 Red", img: corvetteRedImg, slug: "corvette-c8-red" },
  { make: "Cadillac", model: "Escalade", img: cadillacImg, slug: "cadillac-escalade" },
];

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    role: "CEO, Springfield",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Rented the Cullinan for a weekend — absolutely flawless. Delivery was on time, the car was spotless, and the team was incredibly professional.",
  },
  {
    name: "Jasmine R.",
    role: "Content Creator",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Used Apex for a photoshoot and they could not have been more accommodating. The Rolls-Royce was in perfect condition. Will be back every time.",
  },
  {
    name: "Devon K.",
    role: "Professional Athlete",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "Nobody compares to Apex. The concierge service alone is worth it — they brought the Ferrari right to my hotel. Unreal experience.",
  },
  {
    name: "Aaliyah M.",
    role: "Real Estate Agent",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Apex made my clients' property tour unforgettable. I pulled up in a Bentley and closed the deal on the spot. Worth every single penny.",
  },
  {
    name: "Brandon S.",
    role: "Entrepreneur",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    quote:
      "I've rented exotics before but nothing like this. The Lambo was immaculate, the service was seamless, and there was zero stress from start to finish.",
  },
  {
    name: "Priya N.",
    role: "Wedding Planner",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    quote:
      "Used Apex for a wedding weekend and the entire bridal party was blown away. The fleet looked incredible in every photo.",
  },
  {
    name: "Jordan W.",
    role: "Music Producer",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    quote:
      "Booked a Rolls for a video shoot — delivered early, spotless, and the concierge checked in throughout the whole day. Five stars doesn't cover it.",
  },
  {
    name: "Simone D.",
    role: "Fashion Designer",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    quote:
      "As someone with very specific taste, I appreciated how knowledgeable the team was. They knew every detail about the car. Flawless service.",
  },
];

const STEPS = [
  { num: "01", title: "Choose Vehicle", desc: "Browse our fleet and select your dream car.", href: "/fleet" },
  { num: "02", title: "Book Online", desc: "Fill out our simple booking form in minutes.", href: "/fleet" },
  { num: "03", title: "Confirm & Pay", desc: "Secure your reservation with easy payment.", href: "/contact" },
  { num: "04", title: "Get Delivered", desc: "We bring the car to your door in 90 minutes.", href: null },
];

const FAQS = [
  {
    q: "What are the requirements to rent a vehicle?",
    a: "Renters must be at least 25 years old with a valid driver's license and a major credit card. Insurance coverage is required   we offer our own premium protection plan.",
  },
  {
    q: "Is there a mileage limit on rentals?",
    a: "Most vehicles include 100 miles per day. Additional miles are available at a flat per-mile rate. Unlimited mileage packages are available on select vehicles.",
  },
  {
    q: "Do you offer delivery and pickup?",
    a: "Yes. We deliver anywhere in the Springfield metro area. Delivery is complimentary within 20 miles; fees apply beyond that.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations 48+ hours before pickup receive a full refund. Within 24–48 hours incurs a 50% charge. No-shows are charged the full amount.",
  },
  {
    q: "Can the car be used for a wedding or event?",
    a: "Absolutely. We specialize in weddings, proms, corporate events, and photoshoots. Contact us for custom event packages and chauffeur services.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const inView = { once: true, amount: 0.2 };

export default function Home() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => { setSlide(i); resetTimer(); };
  const prev = () => { setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); resetTimer(); };
  const next = () => { setSlide((s) => (s + 1) % HERO_SLIDES.length); resetTimer(); };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden" data-testid="hero">
        {/* Preload all slides stacked, only show current */}
        {HERO_SLIDES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ opacity: i === slide ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.img
              src={s.url}
              alt={s.label}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              initial={i === 0 ? { scale: 1.08 } : false}
              animate={i === 0 ? { scale: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
          </motion.div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

        {/* Content */}
        <motion.div
          className="relative z-20 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } } }}
        >
          {/* Tag line */}
          <motion.p
            className="text-red-500 text-xs tracking-[0.35em] uppercase font-medium mb-5"
            variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Springfield's Premier Exotic Car Rental
          </motion.p>

          {/* Headline — line by line */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6 max-w-xl">
            <motion.span
              className="block"
              variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Premium Car
            </motion.span>
            <motion.span
              className="block"
              variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Rental in
            </motion.span>
            <motion.span
              className="block text-red-600"
              variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Springfield
            </motion.span>
          </h1>

          {/* Sub-text */}
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-md mb-10 leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Experience the thrill of driving the world's most extraordinary vehicles delivered to your door in 90 minutes.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 flex-wrap"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/fleet">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 h-12 text-sm tracking-wide border-0"
                data-testid="hero-explore"
              >
                Explore Fleet
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-lg px-8 h-12 text-sm tracking-wide border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50"
                data-testid="hero-book"
              >
                Book Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Slide controls */}
        <div className="absolute bottom-10 left-8 md:left-20 z-20 flex items-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-lg border border-white/25 flex items-center justify-center hover:border-red-600 hover:text-red-500 text-white/60 transition-colors"
            data-testid="hero-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2 items-center">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === slide ? "w-6 h-2 bg-red-600" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                data-testid={`hero-dot-${i}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-lg border border-white/25 flex items-center justify-center hover:border-red-600 hover:text-red-500 text-white/60 transition-colors"
            data-testid="hero-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Fleet ─────────────────────────────────────────────────────────── */}
      <section id="fleet" className="py-24 px-6" data-testid="fleet">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Choose Your Ride</h2>
            <Link
              href="/fleet"
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {FLEET.map((car, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-red-600/30 transition-all duration-300"
                data-testid={`fleet-car-${i}`}
              >
                {/* Square image */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={car.img}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{car.make}</h3>
                  <p className="text-sm text-gray-500 mb-4">{car.model}</p>
                  <Link href={`/fleet/${car.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-white/15 text-white bg-transparent hover:bg-red-600 hover:border-red-600 hover:text-white text-sm h-9 transition-all duration-200"
                      data-testid={`fleet-see-more-${i}`}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Rental Terms ──────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-y border-white/5 py-16 px-6">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {[
            { icon: <Clock className="w-5 h-5" />, title: "Flexible Scheduling", desc: "Pick up and drop off on your terms, any time." },
            { icon: <Shield className="w-5 h-5" />, title: "Premium Insurance", desc: "Comprehensive zero-deductible coverage included." },
            { icon: <Truck className="w-5 h-5" />, title: "Free Delivery", desc: "White-glove delivery within 20 miles, no charge." },
            { icon: <Phone className="w-5 h-5" />, title: "24/7 Concierge", desc: "Our team is on call around the clock for you." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-4"
              data-testid={`term-${i}`}
            >
              <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center text-red-500">
                {item.icon}
              </div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" data-testid="testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-500 text-xs tracking-[0.3em] uppercase mb-3">Client Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Read Testimonials,<br />Ride with confidence
            </h2>
          </motion.div>
          {/* Infinite marquee */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

            <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className="w-80 flex-shrink-0 bg-[#111] border border-white/5 rounded-xl p-7 space-y-5 hover:border-red-600/20 transition-colors"
                  data-testid={i < TESTIMONIALS.length ? `testimonial-${i}` : undefined}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-red-600 text-red-600" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="font-semibold text-sm text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Steps ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-y border-white/5 py-24 px-6" data-testid="steps">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            Get Rolling in 4 Steps
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/8 z-0" />
            {STEPS.map((step, i) => {
              const inner = (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className={`relative z-10 flex flex-col items-center text-center gap-4 group ${step.href ? "cursor-pointer" : ""}`}
                  data-testid={`step-${i}`}
                >
                  <div className={`w-16 h-16 rounded-full bg-[#1a1a1a] border border-red-600/30 flex items-center justify-center transition-all ${step.href ? "group-hover:bg-red-600/20 group-hover:border-red-500" : ""}`}>
                    <span className="text-red-500 font-bold text-lg">{step.num}</span>
                  </div>
                  <h3 className={`font-semibold text-white ${step.href ? "group-hover:text-red-400 transition-colors" : ""}`}>{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
              return step.href ? (
                <Link key={i} href={step.href}>{inner}</Link>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Banner ───────────────────────────────────────────────────────── */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000"
            alt="banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Premium service,<br />
            <span className="text-red-600">zero hassle.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/fleet">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-10 h-12 text-sm tracking-wide border-0">
                Browse the Fleet
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="rounded-full px-10 h-12 text-sm tracking-wide border-white/30 text-white bg-transparent hover:bg-white/10">
                Our Story
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-[#0f0f0f] border-y border-white/5 py-24 px-6" data-testid="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000"
              alt="Apex Prestige"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/50 to-transparent" />
            <div className="absolute bottom-5 left-5 bg-black/85 border border-red-600/30 rounded-xl px-6 py-4">
              <div className="text-3xl font-black text-red-600">8+</div>
              <div className="text-xs text-gray-300 tracking-wider uppercase">Years in Business</div>
            </div>
          </motion.div>
          <motion.div
            className="space-y-6"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.7 }}
          >
            <p className="text-red-500 text-xs tracking-[0.3em] uppercase">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Springfield's Most Trusted<br />Exotic Rental Experience
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Apex Prestige was founded on a simple belief: everyone deserves to experience what it feels like to drive the world's most extraordinary automobiles. We serve Springfield's most discerning clientele from executives and celebrities to enthusiasts and newlyweds.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              Every vehicle in our fleet is hand-selected and meticulously maintained. We don't just rent cars we curate unforgettable experiences, one drive at a time.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "Hand-selected exotic fleet",
                "Concierge delivery service",
                "Flexible rental terms",
                "Zero-hassle booking",
                "Background-checked drivers",
                "24/7 roadside support",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-white/20 text-white bg-transparent hover:bg-white/10 rounded-lg px-6 h-11 text-sm tracking-wide"
                >
                  Learn More
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 h-11 text-sm tracking-wide border-0"
                  data-testid="about-cta"
                >
                  Start Your Experience
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Welcome ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${heroImg3})` }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome to<br />Apex Prestige
            </h2>
            <p className="text-gray-400 text-sm italic">
              Experience luxury and performance like never before.
            </p>
            <div className="flex gap-16 pt-2">
              <div>
                <p className="text-5xl font-extrabold text-white">5+</p>
                <p className="text-gray-400 text-xs mt-2 tracking-wide">Prestige Cars</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-white">150+</p>
                <p className="text-gray-400 text-xs mt-2 tracking-wide">Trusted Customers</p>
              </div>
            </div>
          </motion.div>
          <motion.img
            src={servicesPrestigeImg}
            alt="Prestige – commanding position"
            className="w-full max-w-lg mx-auto rounded-xl shadow-2xl"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.7 }}
          />
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImg1})` }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Services</h2>
            <p className="text-gray-400 text-sm italic">Luxury car rentals in Springfield, MA.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.img
              src={servicesApexImg}
              alt="Apex – the highest point"
              className="w-full max-w-lg mx-auto rounded-xl shadow-2xl"
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="space-y-10"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              {[
                { title: "Performance Cars", desc: "Powerful vehicles for thrill-seekers." },
                { title: "Exotic Rentals", desc: "Drive the car of your dreams." },
                { title: "Luxury Experience", desc: "Unmatched elegance and comfort." },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-gray-400 text-sm italic">
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                      {s.desc}
                    </li>
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6" data-testid="faq">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            className="md:col-span-1"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-snug sticky top-28">
              Frequently<br />Asked<br />Questions
            </h2>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Still have questions?{" "}
              <Link href="/contact" className="text-red-500 hover:text-red-400 underline transition-colors">
                Reach out to our concierge team
              </Link>{" "}
              anytime.
            </p>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border border-white/5 bg-[#111] rounded-xl px-6 overflow-hidden data-[state=open]:border-red-600/25 transition-colors"
                    data-testid={`faq-${i}`}
                  >
                    <AccordionTrigger className="hover:no-underline text-left font-medium py-5 text-sm text-white hover:text-red-400 [&[data-state=open]]:text-red-500 transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-5 text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0f0f0f] border-t border-white/5 py-24 px-6" data-testid="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-red-500 text-xs tracking-[0.3em] uppercase mb-3">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book?<br />Let's Talk.</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Contact our concierge team to reserve a vehicle, ask questions, or plan a custom experience.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { icon: <Phone className="w-4 h-4" />, label: "Phone", val: "(404) 555-0192" },
                { icon: <Mail className="w-4 h-4" />, label: "Email", val: "hello@apexprestige.shop" },
                { icon: <MapPin className="w-4 h-4" />, label: "Location", val: "697 Hilltop St, Springfield, MA" },
                { icon: <Clock className="w-4 h-4" />, label: "Hours", val: "Mon–Sun, 8 AM – 10 PM" },
              ].map((info, i) => (
                <div key={i} className="flex items-center gap-4" data-testid={`contact-info-${i}`}>
                  <div className="w-9 h-9 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{info.label}</p>
                    <p className="text-sm text-white font-medium">{info.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 space-y-5">
            <h3 className="text-xl font-semibold">Send a Message</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Full Name</label>
                <Input
                  placeholder="Your name"
                  className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-gray-600 rounded-lg h-11 focus-visible:border-red-600 focus-visible:ring-0"
                  data-testid="contact-name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Phone</label>
                <Input
                  placeholder="(404) 000-0000"
                  className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-gray-600 rounded-lg h-11 focus-visible:border-red-600 focus-visible:ring-0"
                  data-testid="contact-phone"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">Email</label>
              <Input
                type="email"
                placeholder="you@email.com"
                className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-gray-600 rounded-lg h-11 focus-visible:border-red-600 focus-visible:ring-0"
                data-testid="contact-email"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">Vehicle of Interest</label>
              <select
                className="w-full bg-[#0a0a0a] border border-white/8 text-gray-400 rounded-lg h-11 px-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                data-testid="contact-vehicle"
              >
                <option value="">Select a vehicle</option>
                {FLEET.map((car) => (
                  <option key={`${car.make}-${car.model}`} value={`${car.make} ${car.model}`}>
                    {car.make} {car.model}
                  </option>
                ))}
                <option value="other">Other / Not Sure Yet</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">Message</label>
              <Textarea
                placeholder="Rental dates, special requests, event details..."
                rows={4}
                className="bg-[#0a0a0a] border-white/8 text-white placeholder:text-gray-600 rounded-lg focus-visible:border-red-600 focus-visible:ring-0 resize-none"
                data-testid="contact-message"
              />
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg h-11 text-sm tracking-wide border-0"
              data-testid="contact-submit"
            >
              Send Inquiry
            </Button>
            <p className="text-center text-xs text-gray-600">
              We typically respond within 15 minutes during business hours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
