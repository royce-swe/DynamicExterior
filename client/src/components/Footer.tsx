import { Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 text-primary p-2 rounded-xl">
              <Droplets size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              thedynamic<span className="text-primary">exterior</span>
            </span>
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} The Dynamic Exterior. All rights reserved.</p>
          <p>Professional Window & Exterior Cleaning</p>
        </div>
      </div>
    </footer>
  );
}
