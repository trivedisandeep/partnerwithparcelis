import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

const RevenueCalculator = () => {
  const [stores, setStores] = useState(5);
  const [ordersPerStore, setOrdersPerStore] = useState(1000);
  const [optInRate, setOptInRate] = useState(40);
  const [commission, setCommission] = useState(5);

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [annualRevenue, setAnnualRevenue] = useState(0);

  useEffect(() => {
    const monthly = Math.round(stores * ordersPerStore * (optInRate / 100) * commission);
    setMonthlyRevenue(monthly);
    setAnnualRevenue(monthly * 12);
  }, [stores, ordersPerStore, optInRate, commission]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Calculate Your <span className="text-gradient">Revenue</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See how much you could earn with the Parcelis Partner Program
          </p>
        </div>

        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Active Stores</label>
                  <span className="text-lg font-bold text-primary">{stores}</span>
                </div>
                <Slider
                  value={[stores]}
                  onValueChange={(v) => setStores(v[0])}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Orders per Store/Month</label>
                  <span className="text-lg font-bold text-primary">{ordersPerStore.toLocaleString()}</span>
                </div>
                <Slider
                  value={[ordersPerStore]}
                  onValueChange={(v) => setOrdersPerStore(v[0])}
                  max={10000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Customer Opt-in Rate</label>
                  <span className="text-lg font-bold text-primary">{optInRate}%</span>
                </div>
                <Slider
                  value={[optInRate]}
                  onValueChange={(v) => setOptInRate(v[0])}
                  max={70}
                  min={20}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Commission per Order (₹)</label>
                  <span className="text-lg font-bold text-primary">₹{commission}</span>
                </div>
                <Slider
                  value={[commission]}
                  onValueChange={(v) => setCommission(v[0])}
                  max={10}
                  min={3}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center">
              <div className="bg-secondary/50 rounded-2xl p-8 text-center space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Estimated Monthly
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-accent">
                    {formatCurrency(monthlyRevenue)}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Annual Revenue
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {formatCurrency(annualRevenue)}
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Based on {stores} stores × {ordersPerStore.toLocaleString()} orders × {optInRate}% opt-in × ₹{commission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculator;
