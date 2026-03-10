import * as React from "react";
import { motion } from "framer-motion";
import { Building2, Home, Sparkles } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const services = [
  {
    title: "Residential Window Cleaning",
    description:
      "We leave your home's windows spotless and streak-free so you can enjoy crystal-clear views every day. Our trained technicians use professional-grade tools, including dionixed water and carbon fiber water brushes, to clean exterior glass, frames, and sills. Whether it's a single-story home or a multi-level property, we'll have your windows gleaming.",
    icon: Home,
  },
  {
    title: "Commercial Window Cleaning",
    description:
      "Make a powerful first impression with pristine, sparkling windows that reflect your business's professionalism. We serve storefronts, office buildings, and mid-rise properties on flexible schedules that won't disrupt your operations. Our team is fully insured and equipped to handle any commercial project safely and efficiently.",
    icon: Building2,
  },
  {
    title: "Screen Cleaning",
    description:
      "Restore full visibility and fresh airflow by removing built-up dust, pollen, and grime from your window screens. We carefully remove, hand-wash, and reinstall each screen so they look and perform like new. Regular screen cleaning also extends the life of your screens and keeps your home looking well-maintained.",
    icon: Sparkles,
  },
];

export function Services() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Professional Services
          </h2>
          <p className="text-slate-600 text-lg">
            Comprehensive exterior cleaning solutions tailored to keep your
            property looking its absolute best year-round.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative px-12 md:px-16">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {services.map((service, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:pl-6 basis-full md:basis-1/2"
                  >
                    <div className="h-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                      <div className="p-8 flex flex-col h-full">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <service.icon size={28} strokeWidth={2} />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                          {service.description}
                        </p>

                        {/* CTA Button */}
                        <div>
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            Get a Quote
                            <ChevronRight size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation arrows — positioned outside the carousel overflow */}
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-all duration-200 disabled:opacity-40"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-all duration-200 disabled:opacity-40"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 ${index === current
                  ? "w-8 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
