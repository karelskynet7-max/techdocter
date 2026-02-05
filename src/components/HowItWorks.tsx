import { MessageCircle, MapPin, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Contact & Diagnose",
    description: "Send me a WhatsApp or email with your problem.",
  },
  {
    icon: MapPin,
    title: "Drop-off or Pickup",
    description: "Bring your device to me, or I can pick it up (Nijmegen area).",
  },
  {
    icon: Wrench,
    title: "The Fix",
    description: "I repair your device with care and high-quality parts.",
  },
  {
    icon: CheckCircle,
    title: "Test & Pay",
    description: "You verify it works, then pay easily via Tikkie or Cash.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your device fixed is simple. Just follow these four easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group"
            >
              {/* Connector Line (hidden on mobile, visible on lg) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              {/* Step Number Badge */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center z-10">
                {index + 1}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
