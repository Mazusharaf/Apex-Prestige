import rollsImg from "@assets/10973330-a988-4d17-b05e-25d9fa6d91d6_1780237795691.png";
import bentleyImg from "@assets/14bba46b-e1e9-4b2f-a6cd-48e4651acd8a_1780237795691.png";
import lamboImg from "@assets/fb99b118-25ef-4d7a-b914-0123d5cd80b8_1780237795692.png";
import corvetteWhiteImg from "@assets/43f64441-0f26-44a4-8c48-9f3118d8dd83_1780237795691.jpeg";
import corvetteRedImg from "@assets/6ef759e3-d2d2-4e46-a717-64c658d900cb_1780237795690.png";
import cadillacImg from "@assets/37059462-06d4-4b62-b282-76abd7d8615e_1780237795692.jpeg";
import cadillacImg2 from "@assets/2024-Cadillac-Escalade-V-823-1_1780238549515.jpg";
import bentleyImg2 from "@assets/ac4ee7a8-53ff-4231-9e6b-d4d9865b7573_1780238549516.jpeg";
import corvetteInteriorImg from "@assets/09ebe51e-b3b8-4d41-abda-0beda49c3c85_1780238549515.jpeg";
import corvetteRedImg2 from "@assets/f66b8cd5-185e-45bc-9087-09de2073c9c1_1780238549516.jpeg";

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
    slug: "rolls-royce-cullinan",
    name: "Rolls-Royce Cullinan",
    brand: "Rolls-Royce",
    type: "SUV",
    price: 1500,
    img: rollsImg,
    gallery: [
      rollsImg,
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "250 km/h", zeroToSixty: "5.0 sec", horsepower: "563 hp", engine: "6.75L Twin-Turbo V12", transmission: "8-Speed Auto", seats: 5 },
    features: ["Starlight Headliner", "Spirit of Ecstasy", "Magic Carpet Ride Air Suspension", "Night Vision Assist", "Bespoke Audio System", "Panoramic Glass Roof"],
    description: "The Rolls-Royce Cullinan is the pinnacle of luxury SUVs — the first and only Rolls-Royce to take its effortless luxury off-road. Commanding, refined, and utterly opulent, it redefines what an SUV can be.",
    tagline: "Effortless, everywhere.",
  },
  {
    slug: "bentley-bentayga",
    name: "Bentley Bentayga",
    brand: "Bentley",
    type: "SUV",
    price: 1200,
    img: bentleyImg,
    gallery: [
      bentleyImg,
      bentleyImg2,
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "291 km/h", zeroToSixty: "4.4 sec", horsepower: "542 hp", engine: "4.0L Twin-Turbo V8", transmission: "8-Speed DSG", seats: 5 },
    features: ["Hand-Stitched Leather", "Bentley Dynamic Ride", "Rotating Display", "Naim Audio System", "Four-Zone Climate", "Massage Seats"],
    description: "The Bentley Bentayga blends extraordinary performance with unparalleled craftsmanship. Every inch of its interior is hand-finished by master craftsmen in Crewe, England — true automotive artistry.",
    tagline: "The world's most extraordinary SUV.",
  },
  {
    slug: "lamborghini-huracan",
    name: "Lamborghini Huracán",
    brand: "Lamborghini",
    type: "Supercar",
    price: 1300,
    img: lamboImg,
    gallery: [
      lamboImg,
      "https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "325 km/h", zeroToSixty: "3.2 sec", horsepower: "602 hp", engine: "5.2L V10", transmission: "7-Speed LDF", seats: 2 },
    features: ["All-Wheel Drive", "Magnetic Ride 2.0", "Alcantara & Carbon Interior", "Lamborghini Dynamic Steering", "ANIMA Drive Mode Selector", "Launch Control"],
    description: "The Lamborghini Huracán is pure Italian theatre. With a screaming naturally-aspirated V10, razor-sharp AWD handling, and jaw-dropping design, it transforms every drive into an unforgettable spectacle.",
    tagline: "Italian fury. Unleashed.",
  },
  {
    slug: "corvette-c8-white",
    name: "Corvette C8 — White",
    brand: "Chevrolet",
    type: "Sports",
    price: 800,
    img: corvetteWhiteImg,
    gallery: [
      corvetteWhiteImg,
      corvetteInteriorImg,
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "312 km/h", zeroToSixty: "2.9 sec", horsepower: "495 hp", engine: "6.2L LT2 V8", transmission: "8-Speed DCT", seats: 2 },
    features: ["Mid-Engine Layout", "Performance Data Recorder", "Bose Premium Audio", "GT2 Sport Seats", "Electronic Limited Slip Diff", "Magnetic Selective Ride Control"],
    description: "America's supercar, reimagined in Arctic White. The mid-engine C8 Corvette is a revolution in American performance — delivering exotic-car thrills with an iconic silhouette that commands every street it drives down.",
    tagline: "America's mid-engine revolution.",
  },
  {
    slug: "corvette-c8-red",
    name: "Corvette C8 — Red",
    brand: "Chevrolet",
    type: "Sports",
    price: 850,
    img: corvetteRedImg,
    gallery: [
      corvetteRedImg,
      corvetteRedImg2,
      corvetteInteriorImg,
    ],
    specs: { topSpeed: "312 km/h", zeroToSixty: "2.9 sec", horsepower: "495 hp", engine: "6.2L LT2 V8 (Z51)", transmission: "8-Speed DCT", seats: 2 },
    features: ["Z51 Performance Package", "Mid-Engine Layout", "Carbon Fiber Splitter", "Bose Premium Audio", "Sport Bucket Seats", "Magnetic Selective Ride Control"],
    description: "The Torch Red C8 Corvette is a statement on wheels. With the Z51 performance package and mid-engine balance, it corners like nothing else wearing an American badge — aggressive, loud, and absolutely captivating.",
    tagline: "Red-hot American performance.",
  },
  {
    slug: "cadillac-escalade",
    name: "Cadillac Escalade",
    brand: "Cadillac",
    type: "SUV",
    price: 650,
    img: cadillacImg,
    gallery: [
      cadillacImg,
      cadillacImg2,
      "https://images.unsplash.com/photo-1512253786540-1f31fdda4c2d?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: { topSpeed: "210 km/h", zeroToSixty: "6.1 sec", horsepower: "420 hp", engine: "6.2L V8", transmission: "10-Speed Auto", seats: 7 },
    features: ["AKG Studio Reference Audio", "Super Cruise Hands-Free Driving", "Curved OLED Display", "Power Running Boards", "Air Ride Adaptive Suspension", "Rear Entertainment System"],
    description: "The Cadillac Escalade is the definitive American luxury SUV. Bold, commanding, and loaded with technology — including the world's first curved OLED display in an SUV — it makes every trip feel like a first-class experience.",
    tagline: "Command every road.",
  },
];

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}
