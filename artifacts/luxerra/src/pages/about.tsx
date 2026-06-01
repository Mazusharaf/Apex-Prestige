import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Star, Clock, Award, Users, MapPin } from "lucide-react";

const TEAM = [
  {
    name: "Marcus Webb",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    bio: "Former motorsport engineer with a passion for connecting people with extraordinary machines.",
  },
  {
    name: "Serena Blake",
    role: "Head of Client Experience",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    bio: "Luxury hospitality veteran ensuring every client interaction exceeds the highest expectations.",
  },
  {
    name: "Dario Reyes",
    role: "Fleet & Logistics Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "Certified exotic car technician keeping every vehicle in show-room perfect condition.",
  },
];

const STATS = [
  { value: "500+", label: "Happy Clients" },
  { value: "8", label: "Years in Business" },
  { value: "18", label: "Vehicles in Fleet" },
  { value: "4.9★", label: "Average Rating" },
];

const VALUES = [
  { icon: Shield, title: "Fully Insured", desc: "Every vehicle and every driver is covered with comprehensive insurance from the moment you take the wheel." },
  { icon: Star, title: "White-Glove Service", desc: "We deliver the car to you, brief you on every feature, and remain on call for the duration of your rental." },
  { icon: Clock, title: "90-Minute Delivery", desc: "Select your vehicle, confirm your booking, and we'll have it at your door within 90 minutes anywhere in Springfield." },
  { icon: Award, title: "Show-Room Condition", desc: "Each vehicle is hand-detailed before every rental — inside, outside, and mechanically inspected." },
  { icon: Users, title: "Dedicated Concierge", desc: "A personal concierge is assigned to every booking to handle any request from first contact to return." },
  { icon: MapPin, title: "Springfield Coverage", desc: "We deliver across the entire Springfield metro area — and beyond. Metro-wide delivery available." },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />

      <main className="pt-32 pb-24 space-y-28">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-red-500">Our Story</p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Springfield's Premier<br />Exotic Car Experience
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Founded in 2018, Apex Prestige was born from a simple belief: extraordinary vehicles deserve extraordinary experiences. What started as a single Porsche and a passion for performance has grown into Springfield's most trusted exotic car rental company.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We're not just a rental company. We're curators of experiences — pairing you with the world's finest machines and wrapping the entire process in concierge-level service that removes every friction point. From first contact to final handoff, the entire experience is as premium as the vehicles themselves.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200"
                  alt="Our Fleet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-red-600 rounded-2xl p-5 shadow-2xl">
                <p className="text-3xl font-bold">2018</p>
                <p className="text-sm text-red-200">Founded in Springfield</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#0f0f0f] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-center space-y-2"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-3">What Sets Us Apart</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built Around You</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-white/15 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-3">The People</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Meet the Team</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">A small, dedicated team obsessed with delivering flawless experiences every single time.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-white/15 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-red-500 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission CTA */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000"
              alt="AMG GT"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-center">
              <div className="px-10 md:px-16 max-w-xl space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold leading-snug">Ready to Experience the Difference?</h2>
                <p className="text-gray-300">Browse our full fleet and reserve your dream car today. Delivery in 90 minutes.</p>
                <a href="/fleet" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                  Explore the Fleet
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
