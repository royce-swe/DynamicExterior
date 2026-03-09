import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* landing page hero modern house exterior with clean windows */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80"
          alt="Modern home exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Top Rated Window Cleaning Service</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
              Crystal Clear Views, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Guaranteed.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Elevate your home's curb appeal with our professional window, gutter, and pressure washing services. We bring the shine back to your dynamic exterior.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="text-base h-14 px-8 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <a href="#contact">Get Your Free Quote</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-14 px-8 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                <a href="#services">Explore Services</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Fully Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">On-Time Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
