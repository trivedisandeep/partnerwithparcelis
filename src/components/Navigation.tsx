import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import parcelisLogo from "@/assets/parcelis-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <img
            src={parcelisLogo}
            alt="Parcelis"
            className="h-8 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          />

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection("case-study")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Case Study
            </button>
            <button
              onClick={() => scrollToSection("referral")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Refer & Earn
            </button>
          </div>

          <Button
            variant="hero"
            size="sm"
            onClick={() => scrollToSection("referral")}
          >
            Partner With Us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
