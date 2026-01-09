import { Button } from "@/components/ui/button";
import { Linkedin, Calendar, ShoppingBag, Package, ShieldCheck, Clock, Users, AlertTriangle } from "lucide-react";
import parcelisLogo from "@/assets/parcelis-logo.png";

const Hero = () => {
  const handleLinkedIn = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/company/myparcelis", "_blank", "noopener,noreferrer");
  };

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://calendar.app.google/fdR9BaCzE23cVwVj6", "_blank", "noopener,noreferrer");
  };

  const handleShopify = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://apps.shopify.com/parcelis?search_id=8fdbf485-cf4d-4f9e-95f9-708c4cabd805&surface_detail=parcelis&surface_inter_position=1&surface_intra_position=2&surface_type=search", "_blank", "noopener,noreferrer");
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
          by adding a trust layer to their checkout. Earn $0.05-0.08 per insured order.
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
        <div className="flex flex-col items-center gap-6 mb-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              onClick={handleBookCall}
              className="cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book a Call
            </Button>
            <Button 
              variant="success" 
              size="lg" 
              onClick={handleShopify}
              className="cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              Checkout on Shopify
            </Button>
          </div>
          
          {/* Pricing Block */}
          <div className="bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl px-8 py-5 text-center shadow-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">$0.05–0.08</div>
            <div className="text-sm text-muted-foreground">Per Insured Order</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "$0.05-0.08", label: "Per Insured Order" },
            { value: "40-60%", label: "Customer Opt-in Rate" },
            { value: "3 Min", label: "Setup Time" },
            { value: "0", label: "Maintenance Required" },
          ].map((stat, i) => (
            <div key={i} className="bg-card/90 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
