import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's schedule a quick 10-minute walkthrough of the partner dashboard and get you set up.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="hero"
                onClick={() => window.open("https://www.linkedin.com/in/sandeepntrivedi/", "_blank")}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "mailto:sandeep.t@myparcelis.com"}
              >
                <Mail className="w-4 h-4" />
                sandeep.t@myparcelis.com
              </Button>
              <Button
                variant="success"
                onClick={() => window.open("https://wa.me/919208711616", "_blank")}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-3xl font-bold text-gradient mb-2">Parcelis</div>
            <p className="text-sm text-muted-foreground">
              Post-Purchase Protection for E-commerce
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              © {new Date().getFullYear()} Parcelis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
