import { Users, GitMerge, Rocket } from "lucide-react";

export function BuiltForOperators() {
  const features = [
    {
      icon: GitMerge,
      title: "Finance + operations in one system",
      description: "No more disconnected tools. Real-time connection between what you do and how it's recorded."
    },
    {
      icon: Users,
      title: "No accounting expertise required",
      description: "Built for operators, not accountants. Focus on running your business, not learning complex accounting software."
    },
    {
      icon: Rocket,
      title: "No painful migration cycles",
      description: "Start using SimpleGrid immediately. Gradual adoption, seamless data import, and minimal disruption to daily operations."
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              Built for Operators
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SimpleGrid is built for people who run businesses, not people who reconcile ledgers. Make decisions faster, execute with confidence, and maintain complete financial visibility.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20 p-8 aspect-square flex items-center justify-center">
            <WorkflowVisualization />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-xl border border-border bg-background">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowVisualization() {
  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Operations layer */}
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground font-mono">OPERATIONS</div>
        <div className="flex gap-2">
          {['Sales', 'Inventory', 'Procurement'].map((item) => (
            <div key={item} className="flex-1 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>
      
      {/* Connection */}
      <div className="flex items-center justify-center">
        <div className="w-px h-8 bg-border" />
      </div>
      
      {/* Intelligence layer */}
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground font-mono">INTELLIGENCE</div>
        <div className="h-16 rounded-lg bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-border flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">AI Validation & Routing</span>
          </div>
        </div>
      </div>
      
      {/* Connection */}
      <div className="flex items-center justify-center">
        <div className="w-px h-8 bg-border" />
      </div>
      
      {/* Finance layer */}
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground font-mono">FINANCE</div>
        <div className="flex gap-2">
          {['Ledger', 'Reports', 'Analytics'].map((item) => (
            <div key={item} className="flex-1 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}