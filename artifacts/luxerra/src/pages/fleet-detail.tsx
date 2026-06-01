import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "wouter";
import { getCarBySlug } from "@/data/cars";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Upload, Check, Calendar, User, FileText, Star, X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { id: 1, title: "Select Dates", icon: Calendar },
  { id: 2, title: "Your Details", icon: User },
  { id: 3, title: "Upload License", icon: FileText },
  { id: 4, title: "Confirm", icon: Star },
];

const step1Schema = z.object({
  pickupDate: z.string().min(1, "Pick-up date is required"),
  dropoffDate: z.string().min(1, "Drop-off date is required"),
  pickupLocation: z.string().min(1, "Pick-up location is required"),
});

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  age: z.string().refine((v) => parseInt(v) >= 25, { message: "Must be 25 or older to rent" }),
});

const fullSchema = step1Schema.merge(step2Schema).extend({
  licenseFile: z.any().optional(),
});

type FormValues = z.infer<typeof fullSchema>;

const PICKUP_LOCATIONS = [
  "Atlanta Downtown (Delivery)",
  "Hartsfield-Jackson Airport",
  "Buckhead",
  "Midtown Atlanta",
  "Sandy Springs",
];

export default function FleetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const car = getCarBySlug(slug ?? "");
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(step <= 2 ? (step === 1 ? step1Schema : step2Schema) : fullSchema),
    defaultValues: {
      pickupDate: "",
      dropoffDate: "",
      pickupLocation: "",
      fullName: "",
      email: "",
      phone: "",
      age: "",
    },
    mode: "onTouched",
  });

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

  const pickupDate = form.watch("pickupDate");
  const dropoffDate = form.watch("dropoffDate");
  const totalDays = pickupDate && dropoffDate
    ? Math.max(1, Math.ceil((new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLicenseFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLicensePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const validateAndNext = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 1) fields = ["pickupDate", "dropoffDate", "pickupLocation"];
    if (step === 2) fields = ["fullName", "email", "phone", "age"];

    const valid = await form.trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = () => {
    setSubmitted(true);
    toast({
      title: "Booking Request Sent!",
      description: `We'll confirm your ${car.name} within 2 hours.`,
    });
  };

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
        <div className="max-w-7xl mx-auto px-6 mb-12">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {car.gallery.length > 1 && (
              <>
                <button onClick={prevGallery} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextGallery} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {car.gallery.map((_, i) => (
                    <button key={i} onClick={() => setGalleryIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === galleryIndex ? "bg-white w-4" : "bg-white/40"}`} />
                  ))}
                </div>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {car.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === galleryIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content: Info + Booking */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Car Info */}
          <div className="lg:col-span-3 space-y-10">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-red-500">{car.brand}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">{car.type}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{car.name}</h1>
              <p className="text-xl italic text-gray-400">{car.tagline}</p>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg">{car.description}</p>

            {/* Specs */}
            <div>
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
            </div>

            {/* Features */}
            <div>
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
            </div>

            {/* Pricing */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Daily Rate</p>
                <p className="text-4xl font-bold">${car.price}<span className="text-lg text-gray-400 font-normal">/day</span></p>
              </div>
              <div className="text-right text-sm text-gray-500 space-y-1">
                <p>Security deposit: $2,500</p>
                <p>Min. rental: 1 day</p>
                <p>Min. driver age: 25</p>
              </div>
            </div>
          </div>

          {/* Right: Booking */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <Card className="bg-[#121212] border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {submitted ? (
                  <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Your booking request for the <strong className="text-white">{car.name}</strong> has been received. Our team will contact you within 2 hours to confirm.
                      </p>
                    </div>
                    <Button onClick={() => { setStep(1); setSubmitted(false); form.reset(); setLicenseFile(null); setLicensePreview(null); }} className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white rounded-xl border border-white/10">
                      Make Another Booking
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Step indicator */}
                    <div className="bg-[#0f0f0f] border-b border-white/5 px-6 pt-6 pb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Book This Vehicle</p>
                      <div className="flex items-center gap-1">
                        {STEPS.map((s, idx) => {
                          const Icon = s.icon;
                          const isActive = step === s.id;
                          const isDone = step > s.id;
                          return (
                            <div key={s.id} className="flex items-center flex-1">
                              <div className={`flex flex-col items-center gap-1 flex-1 ${idx !== STEPS.length - 1 ? "" : ""}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDone ? "bg-green-500" : isActive ? "bg-red-600" : "bg-[#222] border border-white/10"}`}>
                                  {isDone ? <Check className="w-4 h-4 text-white" /> : <Icon className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className={`text-[10px] font-medium tracking-wide text-center ${isActive ? "text-white" : "text-gray-600"}`}>{s.title}</span>
                              </div>
                              {idx < STEPS.length - 1 && (
                                <div className={`h-px flex-1 mx-1 mb-4 transition-all ${step > s.id ? "bg-green-500" : "bg-white/5"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={(e) => { e.preventDefault(); if (step === 4) onSubmit(); }} className="p-6 space-y-5">

                        {/* Step 1: Dates & Location */}
                        <AnimatePresence mode="wait">
                          {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-lg">Select Your Dates</h3>
                              <FormField control={form.control} name="pickupDate" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Pick-up Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" min={new Date().toISOString().split("T")[0]} className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500 [color-scheme:dark]" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="dropoffDate" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Drop-off Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" min={form.watch("pickupDate") || new Date().toISOString().split("T")[0]} className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500 [color-scheme:dark]" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="pickupLocation" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Delivery Location</FormLabel>
                                  <FormControl>
                                    <select {...field} className="w-full bg-[#1a1a1a] border border-white/10 h-11 rounded-xl px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500">
                                      <option value="">Select location...</option>
                                      {PICKUP_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              {totalDays && (
                                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                                    <span>${car.price}/day × {totalDays} days</span>
                                    <span className="text-white font-semibold">${car.price * totalDays}</span>
                                  </div>
                                  <p className="text-xs text-gray-600">+ $2,500 refundable deposit</p>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Step 2: Personal Info */}
                          {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-lg">Your Details</h3>
                              <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Smith" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 (555) 000-0000" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="age" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Age</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Must be 25 or older" min="18" max="99" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                          )}

                          {/* Step 3: License Upload */}
                          {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">Driver's License</h3>
                                <p className="text-sm text-gray-400">Upload a clear photo of your valid driver's license. Both sides accepted.</p>
                              </div>

                              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />

                              {licensePreview ? (
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                  <img src={licensePreview} alt="License preview" className="w-full h-44 object-cover" />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <button type="button" onClick={() => { setLicenseFile(null); setLicensePreview(null); }} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                      <X className="w-4 h-4" /> Remove
                                    </button>
                                  </div>
                                  <div className="p-3 flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-green-400 font-medium">{licenseFile?.name}</span>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full h-44 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
                                >
                                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm font-medium text-gray-300">Click to upload</p>
                                    <p className="text-xs text-gray-500 mt-0.5">PNG, JPG, PDF up to 10MB</p>
                                  </div>
                                </button>
                              )}

                              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Requirements</p>
                                {["Valid driver's license", "Must be 25 or older", "License must not be expired", "International license accepted"].map((r) => (
                                  <div key={r} className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                                    {r}
                                  </div>
                                ))}
                              </div>

                              <p className="text-xs text-gray-600">License upload is optional at this stage. Our team will verify before confirming your reservation.</p>
                            </motion.div>
                          )}

                          {/* Step 4: Review */}
                          {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-lg">Review & Confirm</h3>
                              <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                                <div className="relative h-28 overflow-hidden">
                                  <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                  <div className="absolute bottom-3 left-4">
                                    <p className="font-bold text-lg">{car.name}</p>
                                    <p className="text-gray-300 text-sm">${car.price}/day</p>
                                  </div>
                                </div>
                                <div className="p-4 space-y-3 text-sm">
                                  {[
                                    { label: "Pick-up", value: form.getValues("pickupDate") },
                                    { label: "Drop-off", value: form.getValues("dropoffDate") },
                                    { label: "Location", value: form.getValues("pickupLocation") },
                                    { label: "Name", value: form.getValues("fullName") },
                                    { label: "Email", value: form.getValues("email") },
                                    { label: "Phone", value: form.getValues("phone") },
                                    { label: "License", value: licenseFile ? licenseFile.name : "To be provided" },
                                  ].map((row) => (
                                    <div key={row.label} className="flex justify-between text-gray-400">
                                      <span className="text-gray-500">{row.label}</span>
                                      <span className="text-white text-right max-w-[55%] truncate">{row.value}</span>
                                    </div>
                                  ))}
                                  {totalDays && (
                                    <div className="border-t border-white/5 pt-3 flex justify-between font-semibold text-base">
                                      <span>Estimated Total</span>
                                      <span className="text-red-400">${car.price * totalDays}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                By confirming you agree to our <a href="#" className="underline hover:text-white">Rental Terms</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>. A refundable $2,500 security deposit is required at pickup.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex gap-3 pt-2">
                          {step > 1 && (
                            <Button type="button" onClick={() => setStep((s) => s - 1)} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl h-11">
                              Back
                            </Button>
                          )}
                          {step < 4 ? (
                            <Button type="button" onClick={validateAndNext} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl h-11">
                              Continue <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          ) : (
                            <Button type="button" onClick={onSubmit} className="flex-1 bg-white text-black hover:bg-gray-200 font-bold rounded-xl h-11">
                              Confirm Booking
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
