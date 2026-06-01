import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { CARS } from "@/data/cars";
import { motion } from "framer-motion";

const BRANDS = ["All", "Porsche", "Mercedes", "Audi", "Aston Martin", "McLaren", "Lamborghini", "Ferrari", "Chevrolet"];
const TYPES = ["All", "Sports", "Supercar", "Gran Turismo", "SUV"];
const SORT_OPTIONS = ["Most Relevant", "Price: Low to High", "Price: High to Low"];

export default function Fleet() {
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Most Relevant");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggle = (name: string) => setOpenDropdown(openDropdown === name ? null : name);

  let filtered = CARS.filter((c) => {
    if (brand !== "All" && c.brand !== brand) return false;
    if (type !== "All" && c.type !== type) return false;
    return true;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const Dropdown = ({ label, options, value, onChange, name }: { label: string; options: string[]; value: string; onChange: (v: string) => void; name: string }) => (
    <div className="relative">
      <button
        onClick={() => toggle(name)}
        className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
      >
        {value === "All" ? label : value}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === name ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === name && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[160px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpenDropdown(null); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${value === opt ? "text-white font-semibold" : "text-gray-400"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20" onClick={() => setOpenDropdown(null)}>
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-3">Our Collection</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">The Fleet</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Hand-selected exotic and luxury vehicles, each maintained to the highest standard and ready for your next unforgettable drive.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <Dropdown label="Brand" options={BRANDS} value={brand} onChange={setBrand} name="brand" />
            <Dropdown label="Car Type" options={TYPES} value={type} onChange={setType} name="type" />
            <Dropdown label="Sort By" options={SORT_OPTIONS} value={sort} onChange={setSort} name="sort" />
            {(brand !== "All" || type !== "All") && (
              <button
                onClick={() => { setBrand("All"); setType("All"); }}
                className="text-xs text-red-500 hover:text-red-400 underline transition-colors"
              >
                Clear filters
              </button>
            )}
            <span className="ml-auto text-sm text-gray-500">{filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-gray-500">
              <p className="text-lg">No vehicles match your filters.</p>
              <button onClick={() => { setBrand("All"); setType("All"); }} className="mt-4 text-red-500 underline text-sm">
                Clear all filters
              </button>
            </div>
          ) : (
            filtered.map((car, i) => (
              <motion.div
                key={car.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/fleet/${car.slug}`} className="block group">
                  <Card className="bg-[#121212] border-white/5 overflow-hidden rounded-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <div className="relative h-64 md:h-96 overflow-hidden">
                      <img
                        src={car.img}
                        alt={car.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Specs badges */}
                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                          {car.specs.topSpeed}
                        </span>
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                          {car.specs.zeroToSixty}
                        </span>
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                          {car.specs.horsepower}
                        </span>
                      </div>
                      {/* Type badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-red-600/80 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                          {car.type}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{car.name}</h3>
                          <p className="text-gray-300 text-lg">
                            from <span className="text-white font-semibold">${car.price}/day</span>
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                          <ChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
