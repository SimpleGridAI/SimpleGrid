export function Approach() {
  const steps = [
    {
      number: "1",
      title: "Define How You Work",
      description: "We understand your operational blueprint - how tasks move, who approves what, and how decisions are made."
    },
    {
      number: "2",
      title: "We Adapt to You",
      description: "Instead of forcing you into predefined modules, we configure around your existing workflows."
    },
    {
      number: "3",
      title: "Deploy in Days",
      points: [
        "We configure around active workflows and deploy fast.",
        "No long migrations.",
        "No operational freeze."
      ]
    },
    {
      number: "4",
      title: "AI does the work. You make the decisions.",
      points: [
        "AI prepares the entries and records operational movements.",
        "You review and approve.",
        "Control stays with you. Speed comes from us.",
        "Approvals, allocations, and updates happen in real time."
      ]
    }
  ];

  return (
    <section className="py-32 px-6" id="approach">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-20">
          <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider">HOW SIMPLEGRID WORKS</div>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Execution First, System Second
          </h2>
        </div>
        
        {/* Flow diagram */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col text-center">
                <div className="text-5xl font-medium text-muted-foreground/30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium mb-3">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                )}
                {step.points && (
                  <div className="space-y-2 mt-2">
                    {step.points.map((point, pointIndex) => (
                      <p key={pointIndex} className="text-sm text-muted-foreground leading-relaxed">
                        {point}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}