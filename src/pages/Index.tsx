import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import DigitalSolutions from "@/components/DigitalSolutions";
import FinancialMarkets from "@/components/FinancialMarkets";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Change this to customize your brand name
const BRAND_NAME = "Tech & Trade Solutions NL";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header brandName={BRAND_NAME} />
      <main>
        <Hero brandName={BRAND_NAME} />
        <Services />
        <DigitalSolutions />
        <FinancialMarkets />
        <HowItWorks />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer brandName={BRAND_NAME} />
    </div>
  );
};

export default Index;
