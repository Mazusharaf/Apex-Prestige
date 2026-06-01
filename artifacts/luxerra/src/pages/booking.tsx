import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  vehicle: z.string().min(1, "Please select a vehicle"),
  pickupDate: z.string().min(1, "Pick-up date is required"),
  dropoffDate: z.string().min(1, "Drop-off date is required"),
});

const CAR_OPTIONS = [
  "Porsche 911 GT3 RS",
  "Mercedes-AMG GT",
  "Audi R8",
  "Aston Martin Vantage",
  "McLaren 650S",
  "Lamborghini Huracán",
  "Ferrari 488 GTB",
  "Chevrolet Corvette"
];

export default function Booking() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      vehicle: "",
      pickupDate: "",
      dropoffDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Booking Request Received",
      description: `We'll contact you shortly to confirm your ${values.vehicle}.`,
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="pt-32 pb-24">
        
        {/* Header Area */}
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">Book Your Premium Car Today</h1>
            
            <div className="flex items-center gap-4 bg-[#121212] border border-white/5 p-4 rounded-full max-w-md mx-auto md:mx-0">
              <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Michael Carter" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">Michael Carter</p>
                <p className="text-xs text-gray-400 truncate">Your Personal Rental Assistant</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-full h-12 px-8 font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call Us Now
          </Button>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto px-6 mb-24 relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden z-0 hidden md:block">
            <img src="https://images.unsplash.com/photo-1600705722908-bab1e6191b29?auto=format&fit=crop&q=80&w=2000" alt="Lambo Lineup" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-xl">
            <Card className="bg-[#121212]/95 backdrop-blur-xl border-white/10 p-8 rounded-3xl shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" className="bg-[#1a1a1a] border-white/10 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" className="bg-[#1a1a1a] border-white/10 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Choose Your Vehicle</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1a1a] border-white/10 h-12 rounded-xl focus:ring-1 focus:ring-white">
                              <SelectValue placeholder="Select a car..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                            {CAR_OPTIONS.map(car => (
                              <SelectItem key={car} value={car}>{car}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Pick-up Date</FormLabel>
                          <FormControl>
                            <Input type="date" className="bg-[#1a1a1a] border-white/10 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white [color-scheme:dark]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dropoffDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Drop-off Date</FormLabel>
                          <FormControl>
                            <Input type="date" className="bg-[#1a1a1a] border-white/10 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white [color-scheme:dark]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 space-y-4">
                    <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-gray-200 text-lg font-bold rounded-xl">
                      Book Now
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      By clicking Book Now, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a> and Rental Terms.
                    </p>
                  </div>

                </form>
              </Form>
            </Card>
          </div>
        </div>

        {/* FAQ section */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight sticky top-32">
                Frequently <br/>Asked Questions
              </h2>
            </div>
            <div className="md:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  "What are the terms and conditions for using the car?",
                  "Can I drive the car outside the city?",
                  "What is your fuel policy?",
                  "Can the car be decorated for the wedding?",
                  "Do you offer a driver service?",
                  "What happens if I return the car late?"
                ].map((q, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10 bg-[#121212] px-6 rounded-xl overflow-hidden data-[state=open]:bg-[#1a1a1a] transition-colors">
                    <AccordionTrigger className="hover:no-underline text-left font-medium py-6 text-lg">{q}</AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
                      Our policies are designed to ensure the highest quality experience. For specific details regarding this question, please contact our concierge team directly or refer to the comprehensive rental agreement provided during booking.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}