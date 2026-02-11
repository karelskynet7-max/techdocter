import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wrench, Code, TrendingUp, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    title: "Hardware & Local Repairs",
    icon: Wrench,
    faqs: [
      {
        question: "Do you offer a warranty on repairs?",
        answer:
          "Yes. All hardware repairs come with a standard 3-month warranty on the specific parts replaced and our labor. In accordance with Dutch consumer law, we ensure all repairs meet high-quality standards.",
      },
      {
        question: "What is your 'No Fix, No Fee' policy?",
        answer:
          "If we cannot diagnose or repair your device, you don't pay for the service. This excludes shipping costs (if applicable) and specialized data recovery attempts.",
      },
      {
        question: "Do I need an appointment for a repair?",
        answer:
          "While we accept walk-ins, we highly recommend booking via WhatsApp or the contact form below to ensure a 1-hour turnaround for common fixes like screens or batteries.",
      },
    ],
  },
  {
    title: "Software & Web Development",
    icon: Code,
    faqs: [
      {
        question: "Do you handle both frontend and backend development?",
        answer:
          "Yes. Our international team specializes in full-stack development, primarily using React, Node.js, and Python to build scalable, modern applications.",
      },
      {
        question: "Can you host my website after building it?",
        answer:
          "Absolutely. We provide secure, managed hosting services with 99.9% uptime and regular security updates so you can focus on your business while we handle the servers.",
      },
    ],
  },
  {
    title: "Trading & Finance",
    icon: TrendingUp,
    faqs: [
      {
        question: "How do I start with Account Management?",
        answer:
          "We begin with a free 15-minute consultation to understand your risk tolerance and financial goals. From there, we guide you through the secure account setup process.",
      },
      {
        question: "What platforms do you trade on?",
        answer:
          "We primarily work with major Forex platforms and MT4/MT5-compatible brokers, ensuring transparency and real-time tracking for all managed accounts.",
      },
      {
        question: "Is my capital guaranteed?",
        answer:
          "No. Trading involves significant risk. While we use advanced risk management strategies to protect capital, market fluctuations are unpredictable. We never recommend trading with money you cannot afford to lose.",
      },
    ],
  },
  {
    title: "General",
    icon: HelpCircle,
    faqs: [
      {
        question: "In which languages do you provide support?",
        answer:
          "We are a multilingual team! We provide full support in both English and Dutch (Nederlands).",
      },
      {
        question: "Are you based in the Netherlands?",
        answer:
          "Yes, our physical repair hub is located in the Netherlands, while our digital development and trading teams operate globally to provide 24/7 service.",
      },
    ],
  },
];

const FAQ = () => {
  let itemIndex = 0;

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

          {/* Categorized Accordions */}
          <div className="space-y-10">
            {faqCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {category.faqs.map((faq) => {
                      const currentIndex = itemIndex++;
                      return (
                        <AccordionItem
                          key={currentIndex}
                          value={`item-${currentIndex}`}
                          className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
                        >
                          <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-5">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              );
            })}
          </div>

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
