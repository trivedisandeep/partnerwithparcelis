import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MessageCircle, Package, ShieldCheck, Clock, Users, AlertTriangle } from "lucide-react";
import parcelisLogo from "@/assets/parcelis-logo.png";

const Hero = () => {
  const handleLinkedIn = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/sandeepntrivedi/", "_blank", "noopener,noreferrer");
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:sandeep.t@myparcelis.com";
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://wa.me/919208711616", "_blank", "noopener,noreferrer");
  };

  const painPoints = [
    {
      icon: AlertTriangle,
      title: "Lost & Damaged Packages",
      description: "Customers blame merchants for carrier failures, leading to negative reviews and refund demands"
    },
    {
      icon: Clock,
      title: "Support Team Overload",
      description: "Hours wasted handling 'Where is my order?' queries and disputes draining resources"
    },
    {
      icon: Users,
      title: "Customer Trust Issues",
      description: "Shoppers hesitate at checkout without protection, reducing conversions and lifetime value"
    }
  ];

  const usps = [
    { icon: ShieldCheck, text: "Comprehensive coverage: loss, damage, porch piracy" },
    { icon: Package, text: "Zero merchant involvement in claims" },
    { icon: Clock, text: "5-7 day claim resolution vs 30-60 days with carriers" },
    { icon: Users, text: "99% customer satisfaction rate" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="animate-fade-up mb-8">
          <img src={parcelisLogo} alt="Parcelis" className="h-16 md:h-20 mx-auto" />
        </div>

        <div className="animate-fade-up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
            Partner Program
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

        {/* Pain Points Section */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <h3 className="text-lg font-semibold text-foreground/80 mb-6">Pain Points We Solve</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {painPoints.map((point, i) => (
              <div key={i} className="glass-card p-5 text-left border-destructive/20 hover:border-destructive/40 transition-colors">
                <point.icon className="w-6 h-6 text-destructive mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{point.title}</h4>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* USP Section */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-semibold text-foreground/80 mb-6">Why Parcelis?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {usps.map((usp, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <usp.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{usp.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleLinkedIn}
            className="cursor-pointer"
          >
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
          </Button>
          <Button 
            variant="glass" 
            size="lg" 
            onClick={handleEmail}
            className="cursor-pointer"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </Button>
          <Button 
            variant="success" 
            size="lg" 
            onClick={handleWhatsApp}
            className="cursor-pointer"
          >
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
