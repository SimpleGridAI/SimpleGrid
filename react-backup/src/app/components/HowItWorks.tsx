import { MessageSquare, Sparkles, Zap, Database, Settings } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Settings,
      step: "Step 1",
      title: "Build Your Operating Structure - In 1-2 Days",
      description: "We map how your business runs and configure the system around it. Approvals, handoffs, dependencies, and conditions are built around your real workflow - not predefined modules. You can modify it anytime using natural language.",
      examples: [
        "\"Add Viktor's or Naina's approval for payments above 1 lakh without a PO.\"",
        "\"We've hired Jay for quality checks - add a quality check step after production and before dispatch.\""
      ],
      notes: [
        "If a new user needs to be created, the system prompts you.",
        "If manager approval is required, it routes automatically.",
        "The structure updates instantly.",
        "No redevelopment. No reimplementation cycles."
      ]
    },
    {
      icon: Database,
      step: "Step 2",
      title: "Import What You Already Have",
      description: "Upload Excel sheets, PDFs, exports, or scanned documents. AI reads inconsistent formats, extracts relevant data, and structures it automatically. We assist with validation during onboarding.",
      benefits: [
        "No rebuilding from scratch.",
        "No long migration cycles."
      ]
    },
    {
      icon: MessageSquare,
      step: "Step 3",
      title: "One Window. Anyone Can Use It.",
      description: "All actions enter through a single intake layer. Non-Technical users can upload documents, record transactions, or simply type in plain language:",
      actions: [
        "Upload purchase orders"
      ],
      useCases: [
        { role: "HR", example: "\"Paid 20,000 salary advance to Tara.\"" },
        { role: "D2C Ops", example: "\"Mark order #7643 as shipped.\"" },
        { role: "Supervisor", example: "\"I received 400 SKUs from Vendor A\"" }
      ]
    },
    {
      icon: Sparkles,
      step: "Step 4",
      title: "Rules Apply Automatically",
      description: "Before anything is committed:",
      checks: [
        "Approval limits are checked",
        "Duplicates are flagged",
        "Policies made by you are complied with",
        "Dependencies are validated"
      ],
      footer: "Routine work does not require manual maker-checker layers."
    },
    {
      icon: Zap,
      step: "Step 5",
      title: "The System Updates Instantly",
      description: "Once approved, the action becomes part of the live system.",
      updates: [
        "Dashboards update.",
        "Status updates.",
        "Responsibilities update.",
        "Balances update."
      ],
      benefits: [
        "No reconciliation.",
        "No parallel spreadsheets.",
        "No repeat entries."
      ]
    }
  ];

  return (
    <section className="py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider">THE SOLUTION</div>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Where Your Process Becomes the System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From intent to execution in days, not months.
          </p>
        </div>
        
        <div className="grid gap-12">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-2 font-mono tracking-wider">{step.step}</div>
                  <h3 className="text-2xl mb-4">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Examples */}
                  {step.examples && (
                    <div className="mb-6">
                      <div className="text-sm font-medium mb-3">Examples:</div>
                      <div className="space-y-2">
                        {step.examples.map((example, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground italic">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {step.notes && (
                    <div className="space-y-1 mb-4">
                      {step.notes.map((note, i) => (
                        <div key={i} className="text-sm text-muted-foreground">
                          {note}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  {step.actions && (
                    <div className="mb-6">
                      <div className="grid sm:grid-cols-2 gap-2 mb-4">
                        {step.actions.map((action, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Use Cases */}
                  {step.useCases && (
                    <div className="mb-6 space-y-2">
                      {step.useCases.map((useCase, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2">
                          <span className="text-sm font-medium min-w-[180px]">{useCase.role}:</span>
                          <span className="text-sm text-muted-foreground italic">{useCase.example}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Checks */}
                  {step.checks && (
                    <div className="mb-6 space-y-1">
                      {step.checks.map((check, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{check}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Updates */}
                  {step.updates && (
                    <div className="mb-4 space-y-1">
                      {step.updates.map((update, i) => (
                        <div key={i} className="text-sm text-muted-foreground">
                          {update}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Benefits */}
                  {step.benefits && (
                    <div className="space-y-1">
                      {step.benefits.map((benefit, i) => (
                        <div key={i} className="text-sm text-muted-foreground">
                          {benefit}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  {step.footer && (
                    <p className="text-sm text-muted-foreground mt-4">
                      {step.footer}
                    </p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="h-px bg-border mt-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}