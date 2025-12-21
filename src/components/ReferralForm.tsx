import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Gift, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    // Referrer (person submitting)
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    // Referral (person being referred)
    referralName: "",
    referralEmail: "",
    referralPhone: "",
    referralLinkedin: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('referrals').insert({
        referrer_name: formData.referrerName.trim(),
        referrer_email: formData.referrerEmail.trim().toLowerCase(),
        referrer_phone: formData.referrerPhone.trim() || null,
        referral_name: formData.referralName.trim(),
        referral_email: formData.referralEmail.trim().toLowerCase(),
        referral_phone: formData.referralPhone.trim(),
        referral_linkedin: formData.referralLinkedin.trim() || null,
        referral_type: "partner",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Referral submitted successfully! We'll reach out soon.");
    } catch (error) {
      console.error("Referral submission error:", error);
      toast.error("Failed to submit referral. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Information Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referrerName">Your Full Name *</Label>
                    <Input
                      id="referrerName"
                      name="referrerName"
                      placeholder="Enter your full name"
                      value={formData.referrerName}
                      onChange={handleChange}
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referrerEmail">Your Email Address *</Label>
                    <Input
                      id="referrerEmail"
                      name="referrerEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.referrerEmail}
                      onChange={handleChange}
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referrerPhone">Your Phone Number</Label>
                    <Input
                      id="referrerPhone"
                      name="referrerPhone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.referrerPhone}
                      onChange={handleChange}
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Referral Information Section */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Referral's Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referralName">Referral's Full Name *</Label>
                    <Input
                      id="referralName"
                      name="referralName"
                      placeholder="Enter referral's full name"
                      value={formData.referralName}
                      onChange={handleChange}
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralEmail">Referral's Email Address *</Label>
                    <Input
                      id="referralEmail"
                      name="referralEmail"
                      type="email"
                      placeholder="referral@example.com"
                      value={formData.referralEmail}
                      onChange={handleChange}
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralPhone">Referral's Phone Number *</Label>
                    <Input
                      id="referralPhone"
                      name="referralPhone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.referralPhone}
                      onChange={handleChange}
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralLinkedin">Referral's LinkedIn Profile</Label>
                    <Input
                      id="referralLinkedin"
                      name="referralLinkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.referralLinkedin}
                      onChange={handleChange}
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>
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
