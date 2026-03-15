import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
import type { ContactMessageInput } from "@shared/routes";

export function Contact() {
  const { toast } = useToast();
  const createMessage = useCreateContactMessage();

  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(api.contact.create.input),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactMessageInput) => {
    createMessage.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent Successfully!",
          description: "We've received your request and will contact you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Clearer View?</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Fill out the form to request a free, no-obligation estimate. We pride ourselves on quick response times and transparent pricing. Let's make your property shine.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Call Us</h4>
                  <p className="text-slate-600">Available Mon-Sun, 8am - 6pm</p>
                  <a href="tel:+18138208981" className="text-primary font-semibold hover:underline mt-1 inline-block">
                    +1 (813) 820-8981
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-600">We'll reply within 24 hours</p>
                  <a href="mailto:dynamicexterior@gmail.com" className="text-primary font-semibold hover:underline mt-1 inline-block">
                    dynamicexterior@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Service Area</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Proudly serving Lake Mary and the surround area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...form.register("name")}
                    className={`bg-white ${form.formState.errors.name ? "border-red-500" : ""}`}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    {...form.register("phone")}
                    className={`bg-white ${form.formState.errors.phone ? "border-red-500" : ""}`}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...form.register("email")}
                  className={`bg-white ${form.formState.errors.email ? "border-red-500" : ""}`}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Needed</Label>
                <Select onValueChange={(value) => form.setValue("service", value)}>
                  <SelectTrigger className={`bg-white ${form.formState.errors.service ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential Window Cleaning">Residential Window Cleaning</SelectItem>
                    <SelectItem value="Commercial Window Cleaning">Commercial Window Cleaning</SelectItem>
                    <SelectItem value="Screen Cleaning">Screen Cleaning</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.service && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message details (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us a bit about your property (e.g., number of stories, specific areas needing attention)..."
                  className="bg-white min-h-[120px] resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-14 rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-transform"
                disabled={createMessage.isPending}
              >
                {createMessage.isPending ? "Sending Request..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
