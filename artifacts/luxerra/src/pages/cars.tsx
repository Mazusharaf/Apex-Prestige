import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

const CARS = [
  { name: "Porsche 911 GT3 RS", price: 1300, img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200", specs: ["320 km/h", "3.2 sec", "620 hp"] },
  { name: "Mercedes-AMG GT", price: 800, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200", specs: ["318 km/h", "3.8 sec", "530 hp"] },
  { name: "Audi R8", price: 1300, img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200", specs: ["330 km/h", "3.1 sec", "610 hp"] },
  { name: "Aston Martin Vantage", price: 800, img: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1200", specs: ["314 km/h", "3.6 sec", "503 hp"] },
  { name: "McLaren 650S", price: 1200, img: "https://images.unsplash.com/photo-1620882814836-98a44b1c7ab7?auto=format&fit=crop&q=80&w=1200", specs: ["333 km/h", "3.0 sec", "641 hp"] },
  { name: "Lamborghini Huracán", price: 1300, img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200", specs: ["325 km/h", "3.2 sec", "602 hp"] },
  { name: "Ferrari 488 GTB", price: 1300, img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200", specs: ["330 km/h", "3.0 sec", "661 hp"] },
  { name: "Chevrolet Corvette", price: 800, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200", specs: ["312 km/h", "2.9 sec", "495 hp"] },
];

export default function Cars() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Cars</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Brand', 'Car Type', 'Transmission', 'Most Relevant'].map((filter) => (
              <button key={filter} className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                {filter} <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARS.map((car, i) => (
            <Link key={i} href="/booking" className="block group">
              <Card className="bg-[#121212] border-white/5 overflow-hidden rounded-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.specs.map(spec => (
                      <span key={spec} className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{car.name}</h3>
                      <p className="text-gray-300 text-lg">from <span className="text-white font-semibold">${car.price}/day</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}