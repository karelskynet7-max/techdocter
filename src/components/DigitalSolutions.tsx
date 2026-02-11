import { Code, Server, Globe, Cog, Shield, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DigitalService {
  icon: LucideIcon;
  title: string;
  features: string[];
}

const digitalServices: DigitalService[] = [
  {
    icon: Globe,
    title: "Web Development",
    features: ["Custom Websites", "React Applications", "Landing Pages"],
  },
  {
    icon: Code,
    title: "Software Development",
    features: ["Custom Tools", "Automation Scripts", "Business Logic"],
  },
  {
    icon: Server,
    title: "Hosting Services",
    features: ["Secure Server Setup", "Domain Management", "24/7 Uptime Monitoring"],
  },
];

const DigitalSolutions = () => {
  return (
    <section id="digital-solutions" className="py-20 md:py-32">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
            <Code className="w-4 h-4" />
            Digital Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Software & <span className="gradient-text">Web Development</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Custom digital solutions to power your business — from websites to full-stack applications and hosting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalServices.map((service, index) => (
            <div
              key={service.title}
              className="service-card group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>

              <ul className="space-y-1.5 mb-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            Start your project
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DigitalSolutions;
