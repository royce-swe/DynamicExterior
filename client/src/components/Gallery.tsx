import { motion } from "framer-motion";

const images = [
  {
    /* gallery clean house windows sunny day */
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    title: "Residential Windows",
  },
  {
    /* gallery commercial glass building cleaning */
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Commercial Facades",
  },
  {
    /* gallery clean driveway pressure washing */
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    title: "Pressure Washing",
  },
  {
    /* gallery modern home clean exterior */
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    title: "Exterior Detailing",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
            <p className="text-slate-600 text-lg">
              Browse our recent projects and see how we've transformed homes and businesses in the area. 
              The proof is in the clarity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-bold text-xl">{img.title}</h3>
                <p className="text-slate-300 text-sm mt-1">Immaculate Results</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
