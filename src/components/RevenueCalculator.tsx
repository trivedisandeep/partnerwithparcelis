import { useState, useEffect, useRef } from "react";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Currency = "USD" | "EUR" | "GBP";

const currencyConfig: Record<Currency, { symbol: string; locale: string; rate: number }> = {
  USD: { symbol: "$", locale: "en-US", rate: 1 },
  EUR: { symbol: "€", locale: "de-DE", rate: 0.92 },
  GBP: { symbol: "£", locale: "en-GB", rate: 0.79 },
};

const RevenueCalculator = () => {
  const [stores, setStores] = useState(10);
  const [ordersPerDay, setOrdersPerDay] = useState(50);
  const [storesInput, setStoresInput] = useState("10");
  const [ordersInput, setOrdersInput] = useState("50");

  const handleStoresChange = (value: number) => {
    setStores(value);
    setStoresInput(value.toString());
  };

  const handleOrdersChange = (value: number) => {
    setOrdersPerDay(value);
    setOrdersInput(value.toString());
  };

  const handleStoresInputChange = (value: string) => {
    setStoresInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 999999) {
      setStores(num);
    }
  };

  const handleOrdersInputChange = (value: string) => {
    setOrdersInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 999999) {
      setOrdersPerDay(num);
    }
  };
  const [optInRate, setOptInRate] = useState(40);
  const [commission, setCommission] = useState(0.05); // USD base rate
  const [currency, setCurrency] = useState<Currency>("USD");

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [annualRevenue, setAnnualRevenue] = useState(0);
  
  // Animated display values
  const animatedMonthly = useAnimatedCounter(monthlyRevenue, { duration: 400 });
  const animatedAnnual = useAnimatedCounter(annualRevenue, { duration: 400 });

  useEffect(() => {
    // Calculate in USD, then convert to selected currency
    // Orders per day × 30 days × stores × opt-in rate × commission
    const monthlyUSD = stores * (ordersPerDay * 30) * (optInRate / 100) * commission;
    const config = currencyConfig[currency];
    const monthly = Math.round(monthlyUSD * config.rate);
    setMonthlyRevenue(monthly);
    setAnnualRevenue(monthly * 12);
  }, [stores, ordersPerDay, optInRate, commission, currency]);

  const formatCurrency = (value: number) => {
    const config = currencyConfig[currency];
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCommission = (value: number) => {
    const config = currencyConfig[currency];
    const convertedValue = value * config.rate;
    return `${config.symbol}${convertedValue.toFixed(2)}`;
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
          {/* Currency Selector */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Currency:</span>
              <Select value={currency} onValueChange={(val) => setCurrency(val as Currency)}>
                <SelectTrigger className="w-[100px] h-9 bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="USD">$ USD</SelectItem>
                  <SelectItem value="EUR">€ EUR</SelectItem>
                  <SelectItem value="GBP">£ GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Active Stores</label>
                  <Input
                    type="number"
                    value={storesInput}
                    onChange={(e) => handleStoresInputChange(e.target.value)}
                    className="w-28 h-8 text-right text-lg font-bold text-primary bg-secondary/50 border-border"
                    min={1}
                    max={999999}
                  />
                </div>
                <Slider
                  value={[Math.min(stores, 1000)]}
                  onValueChange={(v) => handleStoresChange(v[0])}
                  max={1000}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">Slider: 1-1000 • Input: up to 999,999</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Orders per Store/Day</label>
                  <Input
                    type="number"
                    value={ordersInput}
                    onChange={(e) => handleOrdersInputChange(e.target.value)}
                    className="w-28 h-8 text-right text-lg font-bold text-primary bg-secondary/50 border-border"
                    min={1}
                    max={999999}
                  />
                </div>
                <Slider
                  value={[Math.min(ordersPerDay, 500)]}
                  onValueChange={(v) => handleOrdersChange(v[0])}
                  max={500}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">Slider: 1-500 • Input: up to 999,999</p>
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
                  <label className="text-sm font-medium text-muted-foreground">Commission per Order*</label>
                  <span className="text-lg font-bold text-primary">{formatCommission(commission)}</span>
                </div>
                <Slider
                  value={[commission]}
                  onValueChange={(v) => setCommission(v[0])}
                  max={0.10}
                  min={0.05}
                  step={0.01}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatCommission(0.05)}</span>
                  <span>{formatCommission(0.10)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">*Based on volumetric orders</p>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center">
              <div className="bg-secondary/50 rounded-2xl p-8 text-center space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Estimated Monthly
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-accent transition-all duration-200">
                    {formatCurrency(animatedMonthly)}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Annual Revenue
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-foreground transition-all duration-200">
                    {formatCurrency(animatedAnnual)}
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Based on {stores} stores × {ordersPerDay.toLocaleString()} orders/day × 30 days × {optInRate}% opt-in × {formatCommission(commission)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculator;