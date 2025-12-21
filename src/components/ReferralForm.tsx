import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Gift, Send, CheckCircle } from "lucide-react";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
    toast.success("Referral submitted successfully! We'll reach out soon.");
  };

  if (isSubmitted) {
    return (
      <section id="referral" className="py-24 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full success-gradient flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Referral Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your referral. We'll contact them shortly and keep you updated on the $50 reward.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Refer Another Person
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="referral" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-accent bg-accent/10 rounded-full border border-accent/20">
              <Gift className="w-4 h-4" />
              Earn $50 Per Referral
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Know Someone Who Fits?<br />
              <span className="text-gradient">Refer & Earn</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Refer someone who enrolls stores with at least 1,000 insured orders per month and 
              earn <strong className="text-accent">$50</strong> once they receive their first payout.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
                <span>Submit the referral form below</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</div>
                <span>We reach out and onboard them</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">$</div>
                <span>You get $50 after their first payout</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6">Referral Details</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter referral's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Referral
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralForm;
