import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

const columns: { title: string; category: string; testimonials: Testimonial[] }[] = [
  {
    title: "Hardware Repairs",
    category: "🛠️",
    testimonials: [
      {
        name: "Mark V.",
        text: "Fixed my laptop overheating issue the same day. No Fix, No Fee promise kept — truly trustworthy.",
        rating: 5,
      },
      {
        name: "Sophie K.",
        text: "My TV was dead and they brought it back to life. Fast pickup and delivery in Nijmegen.",
        rating: 5,
      },
    ],
  },
  {
    title: "Software & Web",
    category: "💻",
    testimonials: [
      {
        name: "Jan B.",
        text: "They built a React dashboard for our logistics company. Clean code, on-time delivery, great communication.",
        rating: 5,
      },
      {
        name: "Fatima R.",
        text: "Professional hosting setup with 24/7 monitoring. Our site hasn't gone down once.",
        rating: 5,
      },
    ],
  },
  {
    title: "Trading & Finance",
    category: "📈",
    testimonials: [
      {
        name: "Thomas D.",
        text: "The 1-on-1 strategy sessions helped me understand risk management. Very knowledgeable team.",
        rating: 5,
      },
      {
        name: "Lena M.",
        text: "Transparent account management with regular performance reports. Professional and honest.",
        rating: 5,
      },
    ],
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
            What Our Clients Say
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted Across <span className="gradient-text">All Services</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title} className="space-y-6">
              <h3 className="text-lg font-bold text-foreground text-center">
                {col.category} {col.title}
              </h3>
              {col.testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "{t.text}"
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
