import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you use eco-friendly cleaning products?",
    answer: "Yes, we prioritize the environment and the safety of your landscaping. We use biodegradable, eco-friendly cleaning solutions that are tough on dirt but safe for your plants and pets.",
  },
  {
    question: "How often should I have my windows cleaned?",
    answer: "For residential properties, we recommend professional cleaning trimesterally (every 4 months). For commercial properties or homes near busy streets/pollen-heavy areas, quarterly cleanings might be necessary to maintain a pristine look.",
  },
  {
    question: "Do I need to be home for the service?",
    answer: "If we are only providing exterior services (like exterior window cleaning or screen cleaning), you do not need to be home as long as we have access to the property and water spigots. However, if screens require removal from the inside, someone will need to grant us access.",
  },
  {
    question: "Do you offer contracts?",
    answer: "Absolutely. We offer contracts for both residential and commercial properties for scheduled cleanings trimesterally or quarterly to ensure your property stays looking its best year-round.",
  },
  {
    question: "What happens if it rains on my scheduled day?",
    answer: "Light rain rarely affects window cleaning quality, as it's dirt—not rain—that makes windows spotty. However, in cases of heavy downpours or severe weather, we will proactively contact you to reschedule at your earliest convenience.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">
            Got questions? We've got answers. If you don't see what you're looking for, feel free to reach out.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-100 px-2">
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
