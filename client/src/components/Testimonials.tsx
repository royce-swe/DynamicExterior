import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Jenkins",
    location: "Oakwood Estates",
    text: "Absolutely incredible service! I didn't realize how dirty my windows were until The Dynamic Exterior finished. The crew was polite, on time, and meticulous.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    location: "Downtown Retail Plaza",
    text: "We hired them for our storefronts and the difference is night and day. Having clean glass makes our business look infinitely more inviting. Highly recommend their commercial services.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    location: "Pine Hill",
    text: "They did our windows, gutters, and power washed the driveway all in one day. The house looks like it was just built. Professional equipment and great attention to detail.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
          <p className="text-slate-400 text-lg">
            Don't just take our word for it. Here is what your neighbors think about our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full hover:bg-slate-800 transition-colors duration-300">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary/40 mb-6" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-primary text-sm font-medium">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
