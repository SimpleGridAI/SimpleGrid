import { Mail } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Deploy in 7 Days. Decide in 30.
          </h2>
          <div className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto space-y-4">
            <p>
              SimpleGrid is onboarding a limited number of businesses in private beta.
            </p>
            <p>
              Run it live for 30 days in your real environment.<br />
              If it doesn't improve execution, you walk away.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div>• No long-term commitment</div>
              <div>• Migration support included</div>
              <div>• Direct founder-led onboarding</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>Shoot an Email to{" "}
              <a href="mailto:hello@simplegrid.ai" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                hello@simplegrid.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}