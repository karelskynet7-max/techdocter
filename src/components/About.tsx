import { Globe, MapPin, Users, Puzzle, CircuitBoard, Code, TrendingUp } from "lucide-react";

const valuePoints = [
  {
    icon: MapPin,
    title: "Local Presence",
    description: "Fast, hands-on hardware repair and device maintenance in the Netherlands.",
  },
  {
    icon: Globe,
    title: "International Talent",
    description: "Access to top-tier developers and financial strategists from around the globe.",
  },
  {
    icon: Puzzle,
    title: "Unified Problem Solving",
    description: "One team handling your physical devices and your digital growth simultaneously.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual side — globe/map illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
              {/* Dotted world-map pattern */}
              <div className="absolute inset-0 opacity-[0.04]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
                    <circle cx="3" cy="3" r="0.8" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Globe className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Global Expertise, Local Solutions
                </h3>
                <p className="text-muted-foreground">Netherlands 🇳🇱 × Worldwide 🌍</p>

                {/* Floating icons */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg animate-fade-in">
                  <CircuitBoard className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              About Us
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Local Hands, Global <span className="gradient-text">Minds</span>
            </h2>

            <p className="text-lg font-medium text-foreground mb-4">
              Your Complete Technology Partner.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              We are a unique collective of local technicians and international experts working as
              one unit. By combining on-site craftsmanship in the Netherlands with a global network
              of specialized developers and financial analysts, we solve what others can't.
            </p>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Whether it's a physical hardware repair at your doorstep or complex software
              development managed across borders, our hybrid team covers the full spectrum of modern
              technology. From a broken heater to a high-frequency trading algorithm—if it involves
              electronics or code, we have the solution.
            </p>

            {/* Value Points */}
            <div className="space-y-6">
              {valuePoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{point.title}</h4>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
