import { TrendingUp, Clock, Store } from "lucide-react";

const CaseStudy = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 rounded-full mb-6 w-fit">
                Agency Success Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                $1,880 Monthly Revenue
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                US-based eCommerce agency implemented Parcelis across 23 stores. 
                Total setup time: ~90 minutes.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Store className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-xs text-muted-foreground">Stores</div>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">90</div>
                  <div className="text-xs text-muted-foreground">Minutes Setup</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">$22.5K</div>
                  <div className="text-xs text-muted-foreground">Annual ARR</div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-primary p-10 md:p-14 flex flex-col justify-center text-white">
              <h3 className="text-2xl font-bold mb-6">Ideal Partner Profile</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/60 mt-2 shrink-0" />
                  <span>Target clients doing <strong>500+ orders/month</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/60 mt-2 shrink-0" />
                  <span>High AOV categories: <strong>Home, Electronics, Fashion</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/60 mt-2 shrink-0" />
                  <span>Perfect for <strong>Pan-India or International</strong> shipping</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/60 mt-2 shrink-0" />
                  <span><strong>100% free</strong> for the merchant, customers pay</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
