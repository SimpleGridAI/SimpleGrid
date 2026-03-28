export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">AI-Powered Real-Time Operations Platform for Physical Businesses</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl tracking-tight mb-6 max-w-4xl mx-auto">
          For operators, not accountants.<br />
          For execution, not data entry.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your business moves fast.<br />
          Your software shouldn't slow it down.<br />
          <br />
          SimpleGrid gives you real-time control over operations - without long migrations or rigid systems.<br />
          <br />
          Here, you don't adapt to the system.<br />
          The system adapts to you - and goes live within a week.
        </p>
      </div>
    </section>
  );
}
