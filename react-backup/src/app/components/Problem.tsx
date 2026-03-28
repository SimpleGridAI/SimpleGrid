import { TrendingDown, Building2, Clock } from "lucide-react";

export function Problem() {
  return (
    <section className="py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="text-sm font-medium text-blue-600 mb-4 tracking-wider">THE PROBLEM</div>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            When the System Slows the Business
          </h2>
          <div className="text-lg text-muted-foreground max-w-2xl space-y-6">
            <p>
              You started with basic tools.<br />
              They worked - until they didn't.
            </p>
            <div>
              <p className="mb-3">Now:</p>
              <ul className="space-y-2 ml-6">
                <li>Approvals take too long</li>
                <li>Workflows break across spreadsheets</li>
                <li>Data is updated late</li>
                <li>Simple tasks require multiple handoffs</li>
              </ul>
            </div>
            <p>
              Upgrading feels worse.<br />
              ERP means months of migration and disruption.
            </p>
            <p>
              You're stuck between tools that are too small<br />
              and systems that are too heavy.<br />
              Software shouldn't stall execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}