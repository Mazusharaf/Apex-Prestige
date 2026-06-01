import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const SUBJECTS = [
  "General Enquiry",
  "Booking Request",
  "Pricing & Availability",
  "Corporate / Event Rental",
  "Wedding Package",
  "Photoshoot Rental",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "(404) 555-0192",
    sub: "Mon–Sun, 8am–10pm EST",
    href: "tel:+14045550192",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@apexprestige.shop",
    sub: "We reply within 2 hours",
    href: "mailto:hello@apexprestige.shop",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Atlanta, Georgia",
    sub: "Metro-wide delivery available",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "8:00 AM – 10:00 PM",
    sub: "7 days a week",
    href: null,
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Contact() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  function onSubmit() {
    setSent(true);
    toast({ title: "Message Sent!", description: "We'll get back to you within 2 hours." });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="text-center space-y-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-red-500">Get in Touch</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Have a question or ready to book? Our team is available 7 days a week to help you find the perfect vehicle.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
              {CONTACT_INFO.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div key={item.label} className="flex items-start gap-4 bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-white/15 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="font-semibold text-white">{item.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                );
                return item.href ? <a key={i} href={item.href}>{inner}</a> : <div key={i}>{inner}</div>;
              })}
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-[#111] border border-white/5 rounded-2xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Follow Us</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/apex.prestige" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 text-sm hover:border-white/30 hover:text-white transition-all text-gray-400">
                  <Instagram className="w-4 h-4" /> @apex.prestige
                </a>
                <a href="#" className="flex items-center gap-2.5 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 text-sm hover:border-white/30 hover:text-white transition-all text-gray-400">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="rounded-2xl overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800"
                alt="Atlanta"
                className="w-full h-52 object-cover"
              />
              <div className="bg-[#111] px-5 py-4 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Serving Metro Atlanta</p>
                  <p className="text-xs text-gray-500">Delivery across the entire Atlanta metro area</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3">
            <Card className="bg-[#111] border-white/10 rounded-3xl p-8 shadow-2xl">
              {sent ? (
                <div className="py-16 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Thanks for reaching out. A member of our team will respond within 2 hours.
                    </p>
                  </div>
                  <Button onClick={() => { setSent(false); form.reset(); }} className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white rounded-xl px-8">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-1">Send a Message</h2>
                    <p className="text-gray-500 text-sm">We typically respond within 2 hours during operating hours.</p>
                  </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Phone (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" className="bg-[#1a1a1a] border-white/10 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-red-500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="subject" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Subject *</FormLabel>
                            <FormControl>
                              <select {...field} className="w-full bg-[#1a1a1a] border border-white/10 h-11 rounded-xl px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500">
                                <option value="">Select subject...</option>
                                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 text-xs uppercase tracking-wide">Message *</FormLabel>
                          <FormControl>
                            <textarea
                              rows={5}
                              placeholder="Tell us about your rental needs, preferred vehicle, dates, or any other questions..."
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-base flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </Button>

                      <p className="text-xs text-center text-gray-600">
                        By submitting you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a>.
                      </p>
                    </form>
                  </Form>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
