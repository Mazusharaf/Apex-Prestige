import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useSearch } from "wouter";
import { getCarBySlug, type Car } from "@/data/cars";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Upload, Check, Calendar, User, FileText, Star, X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { id: 1, title: "Select Dates", icon: Calendar },
  { id: 2, title: "Your Details", icon: User },
  { id: 3, title: "Upload License", icon: FileText },
  { id: 4, title: "Confirm", icon: Star },
];

const PICKUP_LOCATIONS = [
  "Springfield Downtown (Delivery)",
  "Bradley International Airport",
  "West Springfield",
  "East Springfield",
  "Longmeadow",
  "Custom Address (Specify in notes)",
];

const step1Schema = z.object({
  pickupDate: z.string().min(1, "Pick-up date is required"),
  dropoffDate: z.string().min(1, "Drop-off date is required"),
  pickupLocation: z.string().min(1, "Delivery location is required"),
});

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  age: z.string().refine((v) => parseInt(v) >= 25, { message: "Must be 25 or older to rent" }),
});

const fullSchema = step1Schema.merge(step2Schema).extend({ licenseFile: z.any().optional() });
type FormValues = z.infer<typeof fullSchema>;

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Booking() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const slugFromQuery = params.get("car") ?? "";

  const car: Car | undefined = getCarBySlug(slugFromQuery);

  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(step <= 2 ? (step === 1 ? step1Schema : step2Schema) : fullSchema),
    defaultValues: { pickupDate: "", dropoffDate: "", pickupLocation: "", fullName: "", email: "", phone: "", age: "" },
    mode: "onTouched",
  });

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
    toast({ title: "Booking Request Sent!", description: `We'll confirm your ${car?.name ?? "rental"} within 2 hours.` });
  };

  const resetBooking = () => {
    setStep(1);
    setSubmitted(false);
    form.reset();
    setLicenseFile(null);
    setLicensePreview(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <Link href={car ? `/fleet/${car.slug}` : "/fleet"} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            {car ? `Back to ${car.name}` : "Back to Fleet"}
          </Link>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-2">Reservation</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Book Your Vehicle</h1>
            <p className="text-gray-400">Complete the steps below and we'll confirm your reservation within 2 hours.</p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Vehicle Summary */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 space-y-5">

            {/* Selected Vehicle */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Selected Vehicle</p>
                {car && (
                  <Link
                    href="/fleet"
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors inline-flex items-center gap-1"
                  >
                    Change <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
              {car ? (
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl h-11 px-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-white truncate">{car.name}</span>
                  <span className="text-sm text-red-400 font-semibold shrink-0 ml-3">${car.price}/day</span>
                </div>
              ) : (
                <Link
                  href="/fleet"
                  className="block bg-[#1a1a1a] border border-dashed border-white/15 rounded-xl h-11 px-4 flex items-center justify-between hover:border-red-500/40 hover:bg-red-500/5 transition-colors group"
                >
                  <span className="text-sm text-gray-500 group-hover:text-gray-300">No vehicle selected</span>
                  <span className="text-xs text-red-400 inline-flex items-center gap-1">
                    Browse fleet <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              )}
            </div>

            {/* Car Summary Card */}
            {car ? (
              <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-red-400 uppercase tracking-widest mb-0.5">{car.brand}</p>
                    <h2 className="text-xl font-bold">{car.name}</h2>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold">${car.price}<span className="text-xs text-gray-300">/day</span></span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-sm text-gray-400 italic">{car.tagline}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Top Speed", value: car.specs.topSpeed },
                      { label: "0–60 mph", value: car.specs.zeroToSixty },
                      { label: "Horsepower", value: car.specs.horsepower },
                      { label: "Seats", value: `${car.specs.seats} Seats` },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{s.label}</p>
                        <p className="text-sm font-semibold mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {totalDays && (
                    <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">${car.price}/day × {totalDays} {totalDays === 1 ? "day" : "days"}</span>
                        <span className="font-bold text-white">${car.price * totalDays}</span>
                      </div>
                      <p className="text-xs text-gray-600">+ $2,500 refundable security deposit</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-[#111] border border-white/5 border-dashed rounded-2xl h-48 flex items-center justify-center text-gray-600 text-sm">
                Select a vehicle above to see details
              </div>
            )}

            {/* Requirements */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Rental Requirements</p>
              {[
                "Valid driver's license required",
                "Minimum age: 25 years",
                "License must not be expired",
                "International licenses accepted",
                "$2,500 refundable security deposit",
              ].map((r) => (
                <div key={r} className="flex items-center gap-2.5 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {r}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-3">
            <div className="sticky top-28">
              <Card className="bg-[#111] border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {submitted ? (
                  <div className="p-10 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Booking Request Sent!</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Your reservation for the <strong className="text-white">{car?.name}</strong> has been received. Our team will contact you within 2 hours to confirm all details.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={resetBooking} className="bg-[#1a1a1a] hover:bg-[#222] text-white rounded-xl border border-white/10 px-6">
                        New Booking
                      </Button>
                      <Link href="/fleet">
                        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6">Browse Fleet</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Step Indicator */}
                    <div className="bg-[#0f0f0f] border-b border-white/5 px-7 pt-7 pb-5">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">Booking Steps</p>
                      <div className="flex items-center gap-1">
                        {STEPS.map((s, idx) => {
                          const Icon = s.icon;
                          const isActive = step === s.id;
                          const isDone = step > s.id;
                          return (
                            <div key={s.id} className="flex items-center flex-1">
                              <div className="flex flex-col items-center gap-1.5 flex-1">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDone ? "bg-green-500" : isActive ? "bg-red-600" : "bg-[#222] border border-white/10"}`}>
                                  {isDone ? <Check className="w-4 h-4 text-white" /> : <Icon className="w-4 h-4 text-white" />}
                                </div>
                                <span className={`text-[10px] font-medium tracking-wide text-center ${isActive ? "text-white" : isDone ? "text-green-400" : "text-gray-600"}`}>{s.title}</span>
                              </div>
                              {idx < STEPS.length - 1 && (
                                <div className={`h-px flex-1 mx-1 mb-5 transition-all ${step > s.id ? "bg-green-500" : "bg-white/5"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={(e) => { e.preventDefault(); if (step === 4) onSubmit(); }} className="p-7 space-y-5">
                        <AnimatePresence mode="wait">

                          {/* Step 1 */}
                          {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-xl">Select Your Dates</h3>
                              {!car && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-sm text-yellow-400">
                                  Please select a vehicle on the left before continuing.
                                </div>
                              )}
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
                                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                                    <FormControl>
                                      <SelectTrigger
                                        className="w-full bg-[#1a1a1a] border-white/10 h-11 rounded-xl px-3 text-sm text-white hover:bg-[#1f1f1f] focus:ring-1 focus:ring-red-500 focus:ring-offset-0 data-[placeholder]:text-gray-500 [&>svg]:text-gray-400"
                                        data-testid="select-location"
                                      >
                                        <SelectValue placeholder="Select location..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent
                                      className="bg-[#1a1a1a] border-white/10 text-white rounded-xl shadow-2xl"
                                      position="popper"
                                    >
                                      {PICKUP_LOCATIONS.map((l) => (
                                        <SelectItem
                                          key={l}
                                          value={l}
                                          className="text-sm text-gray-200 focus:bg-red-600/20 focus:text-white data-[state=checked]:text-red-400 rounded-lg cursor-pointer"
                                        >
                                          {l}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              {car && totalDays && (
                                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                                  <div className="flex justify-between text-sm text-gray-400">
                                    <span>${car.price}/day × {totalDays} days</span>
                                    <span className="text-white font-semibold">${car.price * totalDays}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">+ $2,500 refundable deposit</p>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Step 2 */}
                          {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-xl">Your Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Smith" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                                <FormField control={form.control} name="age" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Age</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Must be 25+" min="18" max="99" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                              </div>
                              <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 (555) 000-0000" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                          )}

                          {/* Step 3 */}
                          {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-xl mb-1">Driver's License</h3>
                                <p className="text-sm text-gray-400">Upload a clear photo of your valid driver's license. Both sides accepted.</p>
                              </div>
                              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                              {licensePreview ? (
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                  <img src={licensePreview} alt="License preview" className="w-full h-52 object-cover" />
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
                                  className="w-full h-52 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
                                >
                                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm font-medium text-gray-300">Click to upload license</p>
                                    <p className="text-xs text-gray-500 mt-0.5">PNG, JPG, PDF up to 10MB</p>
                                  </div>
                                </button>
                              )}
                              <p className="text-xs text-gray-600">License upload is optional at this stage. Our team will verify before confirming your reservation.</p>
                            </motion.div>
                          )}

                          {/* Step 4 */}
                          {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-4">
                              <h3 className="font-semibold text-xl">Review & Confirm</h3>
                              {car && (
                                <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                                  <div className="relative h-32 overflow-hidden">
                                    <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-3 left-4">
                                      <p className="font-bold text-lg">{car.name}</p>
                                      <p className="text-gray-300 text-sm">${car.price}/day</p>
                                    </div>
                                  </div>
                                  <div className="p-4 space-y-2.5 text-sm">
                                    {[
                                      { label: "Pick-up", value: form.getValues("pickupDate") },
                                      { label: "Drop-off", value: form.getValues("dropoffDate") },
                                      { label: "Location", value: form.getValues("pickupLocation") },
                                      { label: "Name", value: form.getValues("fullName") },
                                      { label: "Email", value: form.getValues("email") },
                                      { label: "Phone", value: form.getValues("phone") },
                                      { label: "License", value: licenseFile ? licenseFile.name : "To be provided" },
                                    ].map((row) => (
                                      <div key={row.label} className="flex justify-between">
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
                              )}
                              <p className="text-xs text-gray-600 leading-relaxed">
                                By confirming you agree to our <a href="#" className="underline hover:text-white">Rental Terms</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>. A refundable $2,500 security deposit is required at pickup.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex gap-3 pt-2">
                          {step > 1 && (
                            <Button type="button" onClick={() => setStep((s) => s - 1)} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl h-12">
                              Back
                            </Button>
                          )}
                          {step < 4 ? (
                            <Button
                              type="button"
                              onClick={validateAndNext}
                              disabled={step === 1 && !car}
                              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-semibold rounded-xl h-12"
                            >
                              Continue <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          ) : (
                            <Button type="button" onClick={onSubmit} className="flex-1 bg-white text-black hover:bg-gray-200 font-bold rounded-xl h-12 text-base">
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
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
