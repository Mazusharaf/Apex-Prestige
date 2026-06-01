export interface Car {
  slug: string;
  name: string;
  brand: string;
  type: "Sports" | "SUV" | "Supercar" | "Gran Turismo";
  price: number;
  img: string;
  gallery: string[];
  specs: { topSpeed: string; zeroToSixty: string; horsepower: string; engine: string; transmission: string; seats: number };
  features: string[];
  description: string;
  tagline: string;
}

export const CARS: Car[] = [
  {
    slug: "porsche-911-gt3-rs",
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    type: "Sports",
    price: 1300,
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "320 km/h", zeroToSixty: "3.2 sec", horsepower: "620 hp", engine: "4.0L Flat-6", transmission: "7-Speed PDK", seats: 2 },
    features: ["Carbon Ceramic Brakes", "Rear-Wheel Steering", "Active Aero Package", "Track Mode", "Bose Surround Sound", "Sport Chrono Package"],
    description: "The Porsche 911 GT3 RS is the pinnacle of naturally aspirated performance. Born from motorsport, it delivers an uncompromising driving experience that connects driver and machine like nothing else on the road.",
    tagline: "Born on the track. Built for the road.",
  },
  {
    slug: "mercedes-amg-gt",
    name: "Mercedes-AMG GT",
    brand: "Mercedes",
    type: "Sports",
    price: 800,
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "318 km/h", zeroToSixty: "3.8 sec", horsepower: "530 hp", engine: "4.0L AMG V8 Biturbo", transmission: "7-Speed AMG Speedshift", seats: 2 },
    features: ["AMG Performance Exhaust", "Adaptive Suspension", "Burmester Sound System", "AMG Track Pace", "Heated Leather Seats", "Panoramic Roof"],
    description: "A front-engine, rear-wheel-drive masterpiece. The Mercedes-AMG GT embodies the perfect balance of raw power and refined luxury, delivering a visceral driving experience wrapped in stunning German design.",
    tagline: "Power and elegance in perfect harmony.",
  },
  {
    slug: "audi-r8",
    name: "Audi R8",
    brand: "Audi",
    type: "Supercar",
    price: 1300,
    img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "330 km/h", zeroToSixty: "3.1 sec", horsepower: "610 hp", engine: "5.2L V10 FSI", transmission: "7-Speed S Tronic", seats: 2 },
    features: ["Quattro AWD", "Magnetic Ride Suspension", "Bang & Olufsen Sound", "Virtual Cockpit", "Carbon Fiber Package", "Laser Headlights"],
    description: "The Audi R8 V10 is a naturally-aspirated ten-cylinder screamer that puts mid-engine supercar performance within everyday reach. With Quattro all-wheel drive, it's as confidence-inspiring as it is breathtaking.",
    tagline: "A supercar for everyday legends.",
  },
  {
    slug: "aston-martin-vantage",
    name: "Aston Martin Vantage",
    brand: "Aston Martin",
    type: "Gran Turismo",
    price: 800,
    img: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "314 km/h", zeroToSixty: "3.6 sec", horsepower: "503 hp", engine: "4.0L Twin-Turbo V8", transmission: "8-Speed ZF Auto", seats: 2 },
    features: ["Sport Plus Seats", "Electronic Rear Diff", "Dynamic Torque Vectoring", "Aston Martin Connect", "Full Leather Interior", "Adaptive LED Headlights"],
    description: "The Aston Martin Vantage is quintessential British sports car craftsmanship. With its predatory stance and AMG-derived twin-turbo V8, it delivers performance with a distinctly elegant character all its own.",
    tagline: "Quintessentially British. Utterly thrilling.",
  },
  {
    slug: "mclaren-650s",
    name: "McLaren 650S",
    brand: "McLaren",
    type: "Supercar",
    price: 1200,
    img: "https://images.unsplash.com/photo-1620882814836-98a44b1c7ab7?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1620882814836-98a44b1c7ab7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "333 km/h", zeroToSixty: "3.0 sec", horsepower: "641 hp", engine: "3.8L Twin-Turbo V8", transmission: "7-Speed SSG", seats: 2 },
    features: ["Carbon Fiber MonoCell", "Proactive Chassis Control", "Alcantara Interior", "McLaren IRIS Infotainment", "Electric Dihedral Doors", "Variable Drift Control"],
    description: "The McLaren 650S is a relentless pursuit of pure performance. Built around a carbon fiber monocell chassis, it defies physics with razor-sharp handling and a twin-turbo V8 that never stops pulling.",
    tagline: "Physics was just a suggestion.",
  },
  {
    slug: "lamborghini-huracan",
    name: "Lamborghini Huracán",
    brand: "Lamborghini",
    type: "Supercar",
    price: 1300,
    img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "325 km/h", zeroToSixty: "3.2 sec", horsepower: "602 hp", engine: "5.2L V10", transmission: "7-Speed LDF", seats: 2 },
    features: ["All-Wheel Drive", "Magnetic Ride 2.0", "Alcantara & Carbon Interior", "Lamborghini Dynamic Steering", "ANIMA Drive Mode Selector", "Launch Control"],
    description: "The Lamborghini Huracán is pure Italian theatre. With a screaming naturally-aspirated V10, razor-sharp AWD handling, and jaw-dropping design, it transforms every drive into an unforgettable spectacle.",
    tagline: "Italian fury. Unleashed.",
  },
  {
    slug: "ferrari-488-gtb",
    name: "Ferrari 488 GTB",
    brand: "Ferrari",
    type: "Supercar",
    price: 1300,
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e4d7d3b?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "330 km/h", zeroToSixty: "3.0 sec", horsepower: "661 hp", engine: "3.9L Twin-Turbo V8", transmission: "7-Speed F1 DCT", seats: 2 },
    features: ["Side Slip Control 2", "E-Diff3", "F1-Trac", "Cavallino Rampante Interior", "Rosso Corsa Carbon Package", "Scuderia Ferrari Shields"],
    description: "The Ferrari 488 GTB is a landmark in Maranello's storied history. Every element of this twin-turbo masterpiece has been honed through decades of Formula 1 and endurance racing heritage.",
    tagline: "Maranello's twin-turbo masterpiece.",
  },
  {
    slug: "chevrolet-corvette",
    name: "Chevrolet Corvette C8",
    brand: "Chevrolet",
    type: "Sports",
    price: 800,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "312 km/h", zeroToSixty: "2.9 sec", horsepower: "495 hp", engine: "6.2L LT2 V8", transmission: "8-Speed DCT", seats: 2 },
    features: ["Mid-Engine Layout", "Performance Data Recorder", "Bose Premium Audio", "GT2 Sport Seats", "Electronic Limited Slip Diff", "Magnetic Selective Ride Control"],
    description: "America's sports car, reimagined. The C8 Corvette's mid-engine revolution delivers supercar performance at a price that defies all logic — and a soundtrack that demands attention at every intersection.",
    tagline: "America's mid-engine revolution.",
  },
];

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}
