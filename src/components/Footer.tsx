import { Wrench, Heart } from "lucide-react";

interface FooterProps {
  brandName?: string;
}

const Footer = ({ brandName = "TechFix NL" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">{brandName}</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#services" className="hover:text-accent transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-background/70">
            <span>© {currentYear} {brandName}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent" /> in NL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
