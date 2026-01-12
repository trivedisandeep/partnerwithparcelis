import { Button } from "@/components/ui/button";
import { Linkedin, Calendar, ShoppingBag, Shield, Package, Zap } from "lucide-react";
import parcelisLogo from "@/assets/parcelis-logo.png";

const Footer = () => {
  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/company/myparcelis", "_blank", "noopener,noreferrer");
  };

  const handleBookCall = () => {
    window.open("https://calendar.app.google/fdR9BaCzE23cVwVj6", "_blank", "noopener,noreferrer");
  };

  const handleShopify = () => {
    window.open("https://apps.shopify.com/parcelis?search_id=8fdbf485-cf4d-4f9e-95f9-708c4cabd805&surface_detail=parcelis&surface_inter_position=1&surface_intra_position=2&surface_type=search", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="relative py-20 px-4 bg-primary/90 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px]" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Start <span className="text-white">Earning?</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Let's schedule a quick 10-minute walkthrough of the partner dashboard and get you set up.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={handleLinkedIn}>
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </Button>
            <Button variant="outline" size="lg" onClick={handleBookCall}>
              <Calendar className="w-5 h-5" />
              Book a Call
            </Button>
            <Button variant="outline" size="lg" onClick={handleShopify}>
              <ShoppingBag className="w-5 h-5" />
              Checkout on Shopify
            </Button>
          </div>
        </div>

        {/* Features row */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-white">Comprehensive Coverage</h4>
              <p className="text-sm text-white/70">Loss, damage, and porch piracy protection</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-white">Zero Hassle Claims</h4>
              <p className="text-sm text-white/70">Customers claim directly, no merchant involvement</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 border border-white/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-white">Fast Resolution</h4>
              <p className="text-sm text-white/70">5-7 days vs 30-60 days with carrier insurance</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={parcelisLogo} alt="Parcelis" className="h-10" />
            <div className="text-left">
              <p className="text-sm text-white/80">Post-Purchase Protection for E-commerce</p>
              <p className="text-xs text-white/50 mt-1">Powered by InsureShip</p>
            </div>
          </div>
          
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Parcelis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
