import { Heart, Eye, Coins, Wrench, CircuitBoard, Cpu } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Hand-Fixed with Care",
      description:
        "Every device is treated like my own. Careful diagnostics, quality parts, and meticulous reassembly.",
    },
    {
      icon: Eye,
      title: "Transparent Pricing",
      description:
        "No surprises. You'll always know the cost upfront before I start any repair work.",
    },
    {
      icon: Coins,
      title: "Fair & Honest",
      description:
        "If a repair isn't worth it, I'll tell you. Your money matters, and so does your trust.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Illustration area */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
              {/* Circuit pattern decoration */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="circuit" patternUnits="userSpaceOnUse" width="20" height="20">
                    <path
                      d="M10 0v10h10M0 10h10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
              </div>

              {/* Main visual */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Wrench className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Amateur Computer Engineer
                </h3>
                <p className="text-muted-foreground">Based in the Netherlands 🇳🇱</p>

                {/* Floating icons */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg animate-fade-in">
                  <CircuitBoard className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg animate-fade-in">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
              About the Engineer
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Geeky <span className="gradient-text">Passion</span> for Hardware
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm an amateur computer engineer with a deep love for hardware. What started as
              tinkering with old PCs has grown into a mission: helping people extend the life of
              their electronics instead of throwing them away.
            </p>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Whether it's reviving a laptop, fixing a router, or diagnosing why your heater
              won't work, I approach every repair with curiosity and care. Based in the
              Netherlands, I serve customers who appreciate personal service and technical
              expertise.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
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
