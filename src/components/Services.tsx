import { useState } from "react";
import {
  Laptop,
  Smartphone,
  Tv,
  Wifi,
  Cpu,
  HardDrive,
  Battery,
  Monitor,
  Thermometer,
  Zap,
  Settings,
  Network,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  category: string;
  icon: LucideIcon;
  title: string;
  problems: string[];
  price: string;
}

const services: Service[] = [
  // Computers
  {
    id: "os-install",
    category: "Computers",
    icon: Laptop,
    title: "OS Installation",
    problems: ["Windows/Linux Setup", "Driver Installation", "System Optimization"],
    price: "From €49",
  },
  {
    id: "hardware-replace",
    category: "Computers",
    icon: Cpu,
    title: "Hardware Replacement",
    problems: ["RAM Upgrade", "CPU Replacement", "GPU Installation"],
    price: "From €39 + parts",
  },
  {
    id: "cleaning",
    category: "Computers",
    icon: Sparkles,
    title: "Deep Cleaning",
    problems: ["Dust Removal", "Thermal Paste", "Fan Maintenance"],
    price: "From €35",
  },
  {
    id: "data-recovery",
    category: "Computers",
    icon: HardDrive,
    title: "Data Recovery",
    problems: ["Failed HDD/SSD", "Corrupted Files", "Backup Setup"],
    price: "From €59",
  },
  // Mobile Phones
  {
    id: "screen-replace",
    category: "Mobile Phones",
    icon: Smartphone,
    title: "Screen Replacement",
    problems: ["Cracked Screen", "Touch Issues", "Display Problems"],
    price: "From €69",
  },
  {
    id: "battery-swap",
    category: "Mobile Phones",
    icon: Battery,
    title: "Battery Swap",
    problems: ["Fast Drain", "Swelling Battery", "Charging Issues"],
    price: "From €39",
  },
  // Home Electronics
  {
    id: "tv-repair",
    category: "Home Electronics",
    icon: Tv,
    title: "TV Repair",
    problems: ["Power Board Issues", "No Picture", "Backlight Problems"],
    price: "From €59",
  },
  {
    id: "heater-fix",
    category: "Home Electronics",
    icon: Thermometer,
    title: "Heater Diagnostics",
    problems: ["Thermostat Issues", "No Heat", "Sensor Calibration"],
    price: "From €45",
  },
  {
    id: "power-issues",
    category: "Home Electronics",
    icon: Zap,
    title: "Power Electronics",
    problems: ["Surge Damage", "Capacitor Replace", "Power Supply Fix"],
    price: "From €55",
  },
  // Network Gear
  {
    id: "router-config",
    category: "Network Gear",
    icon: Wifi,
    title: "Router Configuration",
    problems: ["WiFi Setup", "Speed Optimization", "Security Hardening"],
    price: "From €35",
  },
  {
    id: "switch-trouble",
    category: "Network Gear",
    icon: Network,
    title: "Switch Troubleshooting",
    problems: ["Port Issues", "VLAN Setup", "Network Drops"],
    price: "From €45",
  },
  {
    id: "network-setup",
    category: "Network Gear",
    icon: Settings,
    title: "Home Network Setup",
    problems: ["Full Installation", "Mesh Systems", "Cable Management"],
    price: "From €79",
  },
];

const categories = ["All", "Computers", "Mobile Phones", "Home Electronics", "Network Gear"];

const categoryIcons: Record<string, LucideIcon> = {
  All: RotateCcw,
  Computers: Laptop,
  "Mobile Phones": Smartphone,
  "Home Electronics": Tv,
  "Network Gear": Wifi,
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Can I <span className="gradient-text">Fix</span> For You?
          </h2>
          <p className="text-lg text-muted-foreground">
            From laptops to heaters, I've got the tools and expertise to bring your devices back to life.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-tab flex items-center gap-2 ${
                  activeCategory === category ? "filter-tab-active" : "filter-tab-inactive"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="service-card group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>

              {/* Problems List */}
              <ul className="space-y-1.5 mb-4">
                {service.problems.map((problem) => (
                  <li key={problem} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mt-auto pt-4 border-t border-border">
                <span className="text-lg font-bold text-primary">{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see your device? I can probably still help!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            Contact me for a custom quote
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
