import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RevenueCalculator from "@/components/RevenueCalculator";
import CaseStudy from "@/components/CaseStudy";
import ReferralForm from "@/components/ReferralForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <HowItWorks />
      <RevenueCalculator />
      <CaseStudy />
      <ReferralForm />
      <Footer />
    </main>
  );
};

export default Index;
