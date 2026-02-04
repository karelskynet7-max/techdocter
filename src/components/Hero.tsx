import { ArrowRight, Shield, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workbench.jpg";

interface HeroProps {
  brandName?: string;
}

const Hero = ({ brandName = "TechFix NL" }: HeroProps) => {
  const features = [
    { icon: Shield, text: "Trusted Service" },
    { icon: Clock, text: "Fast Turnaround" },
    { icon: ThumbsUp, text: "Fair Pricing" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Serving the Netherlands
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Expert Repair for Your{" "}
              <span className="gradient-text">Electronics</span> in the Netherlands
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              From Mobiles & Computers to TVs & Heaters. If it's broken, I can fix it.
              Professional repairs with a personal touch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground btn-glow animate-pulse-glow"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Book a Repair
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#services">View Services</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Professional electronics repair workbench with tools"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border hidden md:block animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Repairs Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
