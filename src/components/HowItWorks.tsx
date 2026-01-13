import { ShieldCheck, Users, Wallet, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: ShieldCheck,
    title: "Checkout Protection",
    description: "Customer sees optional protection at checkout",
    highlight: "Optional",
  },
  {
    icon: Users,
    title: "Customer Opt-in",
    description: "40-60% of customers choose peace of mind protection",
    highlight: "40-60%",
  },
  {
    icon: Wallet,
    title: "You Earn Commission",
    description: "Earn $0.05-0.10 per insured order automatically",
    highlight: "$0.05-0.10/order",
  },
  {
    icon: HeadphonesIcon,
    title: "Parcelis Handles Claims",
    description: "We manage 100% of lost/damaged claims end-to-end",
    highlight: "Zero Support",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How It <span className="text-foreground">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple 4-step process that turns your client's orders into your passive income
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card p-8 relative group hover:border-white/30 transition-all duration-300"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-accent bg-accent/20 rounded-full">
                {step.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
