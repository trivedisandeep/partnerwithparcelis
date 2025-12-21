import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RevenueCalculator from "@/components/RevenueCalculator";
import CaseStudy from "@/components/CaseStudy";
import ReferralForm from "@/components/ReferralForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="calculator">
        <RevenueCalculator />
      </section>
      <section id="case-study">
        <CaseStudy />
      </section>
      <section id="referral">
        <ReferralForm />
      </section>
      <Footer />
    </main>
  );
};

export default Index;
