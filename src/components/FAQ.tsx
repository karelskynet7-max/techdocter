import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes, I offer a 3-month warranty on the specific repair I performed.",
  },
  {
    question: "What if you can't fix it?",
    answer:
      "No cure, no pay! If I can't fix it, you don't pay for the repair.",
  },
  {
    question: "How long does a repair take?",
    answer:
      "Most phones are done within 24 hours. Computers and heaters may take 1-3 days depending on parts.",
  },
  {
    question: "Can I get an invoice?",
    answer:
      "Yes, I can provide a digital invoice for your administration.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? I've got answers. Here are the most common ones.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional CTA */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a
                href="#contact"
                className="text-primary font-semibold hover:text-accent transition-colors"
              >
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
