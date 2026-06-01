import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { getCarBySlug } from "@/data/cars";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, ArrowLeft, Shield, Clock, Star } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function FleetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const car = getCarBySlug(slug ?? "");
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
          <h1 className="text-4xl font-bold">Vehicle Not Found</h1>
          <p className="text-gray-400">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link href="/fleet">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">Browse Fleet</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const nextGallery = () => setGalleryIndex((i) => (i + 1) % car.gallery.length);
  const prevGallery = () => setGalleryIndex((i) => (i - 1 + car.gallery.length) % car.gallery.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Link>
        </div>

        {/* Hero Gallery */}
        <div className="max-w-7xl mx-auto px-6 mb-12 space-y-3">
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/7] bg-[#111] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIndex}
                src={car.gallery[galleryIndex]}
                alt={car.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {car.gallery.length > 1 && (
              <>
                <button onClick={prevGallery} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextGallery} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {car.gallery.length > 1 && (
            <div className="flex gap-2">
              {car.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`flex-1 aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all ${i === galleryIndex ? "border-red-500 opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content: Info + Booking CTA */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Car Info */}
          <div className="lg:col-span-3 space-y-10">
            {/* Title */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-red-500">{car.brand}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">{car.type}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{car.name}</h1>
              <p className="text-xl italic text-gray-400">{car.tagline}</p>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="text-gray-300 leading-relaxed text-lg">
              {car.description}
            </motion.p>

            {/* Specs */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Performance Specs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Top Speed", value: car.specs.topSpeed },
                  { label: "0–60 mph", value: car.specs.zeroToSixty },
                  { label: "Horsepower", value: car.specs.horsepower },
                  { label: "Engine", value: car.specs.engine },
                  { label: "Transmission", value: car.specs.transmission },
                  { label: "Seats", value: `${car.specs.seats} Seats` },
                ].map((s) => (
                  <div key={s.label} className="bg-[#121212] border border-white/5 rounded-2xl p-5">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
                    <p className="text-lg font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Included Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-red-500" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Booking CTA */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-4">

              {/* Pricing Card */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-[#121212] border border-white/8 rounded-3xl p-7 space-y-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Daily Rate</p>
                  <p className="text-5xl font-bold">${car.price}<span className="text-xl text-gray-400 font-normal ml-1">/day</span></p>
                </div>

                <div className="space-y-2.5 text-sm text-gray-400 border-t border-white/5 pt-5">
                  {[
                    { label: "Security deposit", value: "$2,500 refundable" },
                    { label: "Minimum rental", value: "1 day" },
                    { label: "Minimum age", value: "25 years" },
                    { label: "Delivery", value: "Springfield metro" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-gray-500">{r.label}</span>
                      <span className="text-white">{r.value}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/booking?car=${car.slug}`}>
                  <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-100 shadow-lg shadow-red-600/20">
                    Book Now
                  </Button>
                </Link>

                <p className="text-xs text-center text-gray-600 mt-2">
                  Free cancellation 48+ hours before pickup
                </p>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-[#121212] border border-white/5 rounded-2xl p-5 space-y-3">
                {[
                  { icon: Shield, label: "Fully Insured", sub: "Comprehensive coverage on every rental" },
                  { icon: Clock, label: "Fast Delivery", sub: "We bring the car to your location" },
                  { icon: Star, label: "White-Glove Service", sub: "Concierge team available 7 days" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
