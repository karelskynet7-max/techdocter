import { TrendingUp, Briefcase, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TradingService {
  icon: LucideIcon;
  title: string;
  features: string[];
}

const tradingServices: TradingService[] = [
  {
    icon: TrendingUp,
    title: "Forex Trading",
    features: ["Market Analysis", "Currency Pair Strategies", "Technical Indicators"],
  },
  {
    icon: Briefcase,
    title: "Account Management",
    features: ["Professional Portfolio Oversight", "Risk Management", "Performance Reporting"],
  },
  {
    icon: Users,
    title: "Trading Consultation",
    features: ["1-on-1 Strategy Sessions", "Market Education", "Custom Trading Plans"],
  },
];

const FinancialMarkets = () => {
  return (
    <section id="trading" className="py-20 md:py-32 bg-[hsl(220_40%_13%)] text-[hsl(0_0%_95%)]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(45_80%_50%/0.15)] rounded-full text-[hsl(45_80%_60%)] text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Financial Markets
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trading & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(45_80%_55%)] to-[hsl(30_90%_55%)]">Account Management</span>
          </h2>
          <p className="text-lg text-[hsl(220_20%_70%)]">
            Navigate the financial markets with confidence. Expert guidance and professional account management.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradingServices.map((service, index) => (
            <div
              key={service.title}
              className="bg-[hsl(220_35%_18%)] rounded-xl p-6 border border-[hsl(220_30%_25%)] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[hsl(45_80%_50%/0.3)] group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 bg-[hsl(45_80%_50%/0.1)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[hsl(45_80%_50%)] group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-[hsl(45_80%_55%)] group-hover:text-[hsl(220_40%_13%)] transition-colors" />
              </div>

              <h3 className="text-lg font-bold mb-2">{service.title}</h3>

              <ul className="space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[hsl(220_20%_70%)]">
                    <span className="w-1.5 h-1.5 bg-[hsl(45_80%_55%)] rounded-full flex-shrink-0" />
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
            className="inline-flex items-center gap-2 text-[hsl(45_80%_55%)] font-semibold hover:text-[hsl(45_80%_70%)] transition-colors"
          >
            Get started with trading
            <span className="text-xl">→</span>
          </a>
        </div>

        <p className="text-center mt-8 text-xs text-[hsl(220_15%_50%)]">
          Trading involves risk. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
};

export default FinancialMarkets;
