import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

const Hero = () => {
  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/sandeepntrivedi/", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:sandeep.t@myparcelis.com";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919208711616", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto text-center">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
            Parcelis Partner Program
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Post-Purchase Monetization for{" "}
          <span className="text-gradient">Shopify Experts</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Generate consistent, zero-maintenance recurring revenue from your existing client base 
          by adding a trust layer to their checkout. Earn ₹5-8 per insured order.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero" size="xl" onClick={handleLinkedIn}>
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
          </Button>
          <Button variant="glass" size="lg" onClick={handleEmail}>
            <Mail className="w-5 h-5" />
            Email Me
          </Button>
          <Button variant="success" size="lg" onClick={handleWhatsApp}>
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "₹5-8", label: "Per Insured Order" },
            { value: "40-60%", label: "Customer Opt-in Rate" },
            { value: "3 Min", label: "Setup Time" },
            { value: "0", label: "Maintenance Required" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
