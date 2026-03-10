import { motion } from "framer-motion";
import { Building2, Home, Droplets, SprayCan } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Residential Window Cleaning",
    description: "We leave your home's exterior windows spotless, streak-free, and gleaming for a brighter view.",
    icon: Home,
  },
  {
    title: "Commercial Window Cleaning",
    description: "Make a great first impression on your customers. We handle storefronts, offices, and mid-rise buildings.",
    icon: Building2,
  },
  {
    title: "Pressure Washing",
    description: "Restore your driveways, walkways, patios, and siding. We safely blast away years of dirt, grime, and algae.",
    icon: SprayCan,
  },
  {
    title: "Screen Cleaning",
    description: "Keep your screens crystal clear. We remove dust, pollen, and grime to improve visibility and airflow.",
    icon: Droplets,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
          <p className="text-slate-600 text-lg">
            Comprehensive exterior cleaning solutions tailored to keep your property looking its absolute best year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <service.icon size={28} strokeWidth={2} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
