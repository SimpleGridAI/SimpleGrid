export function PrivacyPolicy() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <h1 className="mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective Date: March 3, 2026</p>
          <p className="text-sm text-muted-foreground">
            SimpleGrid Technologies Pvt. Ltd.
            <br />
            22nd Cross Road, 23rd Main Road, HSR Layout, Bengaluru, Karnataka
            560102
            <br />
            hello@simplegrid.ai &middot; +91 96499 33000
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* Introduction */}
          <div>
            <h2 className="text-foreground mb-4">Introduction</h2>
            <p>
              SimpleGrid Technologies Pvt. Ltd. ("SimpleGrid," "we," "our," or
              "us") operates the SimpleGrid platform and related services
              (collectively, the "Platform"). This Privacy Policy explains how
              we collect, use, store, and protect your information. By accessing
              or using SimpleGrid, you agree to the practices described here.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div>
            <h2 className="text-foreground mb-4">1. Information We Collect</h2>

            <h3 className="text-foreground mb-3">
              1.1 Information You Provide
            </h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>
                Business name, contact details, and operational structure during
                onboarding
              </li>
              <li>
                User account information (names, emails, phone numbers, roles)
              </li>
              <li>
                Uploaded files (Excel sheets, PDFs, invoices, purchase orders,
                scanned records)
              </li>
              <li>
                Natural language inputs, commands, and operational instructions
              </li>
              <li>
                Workflow configurations, approval rules, and policies you define
              </li>
              <li>Communications with our team</li>
            </ul>

            <h3 className="text-foreground mb-3">
              1.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>
                Device and browser information (IP address, browser type, OS)
              </li>
              <li>Usage data (features used, time spent, actions taken)</li>
              <li>Log data (access times, error logs, API requests)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-foreground mb-3">
              1.3 Business and Operational Data
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Financial transaction records, inventory data, and workflows
              </li>
              <li>
                Employee and vendor information recorded in the Platform
              </li>
              <li>Approval histories and audit trails</li>
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div>
            <h2 className="text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Provide, operate, and maintain the Platform</li>
              <li>
                Configure and personalise your workflows and system structure
              </li>
              <li>Process uploaded documents using AI/ML models</li>
              <li>
                Enable real-time updates, approvals, and status tracking
              </li>
              <li>
                Communicate about your account, onboarding, and support
              </li>
              <li>Improve Platform features and capabilities</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your data to third parties. We do not use your
              operational data to train generalised AI models shared across
              customers without your explicit consent.
            </p>
          </div>

          {/* 3. Data Storage and Security */}
          <div>
            <h2 className="text-foreground mb-4">
              3. Data Storage and Security
            </h2>
            <div className="space-y-4">
              <p>
                <span className="text-foreground">3.1 Storage:</span> Data is
                primarily stored on secure cloud infrastructure located in
                India, in compliance with applicable Indian data protection
                laws.
              </p>
              <p>
                <span className="text-foreground">3.2 Security Measures:</span>{" "}
                We use encryption in transit (TLS/SSL) and at rest, role-based
                access controls, regular security assessments, and audit trails
                for all Platform activity. No system is completely secure; we
                cannot guarantee absolute security.
              </p>
              <p>
                <span className="text-foreground">3.3 Retention:</span> Data is
                retained while your account is active. Upon termination, data
                is held for 90 days for export/recovery requests, then deleted
                or anonymised unless law requires otherwise.
              </p>
            </div>
          </div>

          {/* 4. Sharing of Information */}
          <div>
            <h2 className="text-foreground mb-4">
              4. Sharing of Information
            </h2>
            <p className="mb-4">We may share information with:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>
                Service providers (cloud hosting, email, analytics) bound by
                confidentiality obligations
              </li>
              <li>
                AI/ML model providers processing inputs solely to deliver
                services to you
              </li>
              <li>Legal authorities when required by law or court order</li>
              <li>
                Successor entities in a merger or acquisition, with advance
                notice
              </li>
            </ul>
            <p>
              We do not share data with advertisers or marketing platforms.
            </p>
          </div>

          {/* 5. Your Rights */}
          <div>
            <h2 className="text-foreground mb-4">5. Your Rights</h2>
            <p>
              You may have the right to: access, correct, or delete your
              personal data; withdraw consent; object to or restrict
              processing; and request data portability. Contact{" "}
              <a
                href="mailto:hello@simplegrid.ai"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                hello@simplegrid.ai
              </a>{" "}
              to exercise these rights.
            </p>
          </div>

          {/* 6. Cookies */}
          <div>
            <h2 className="text-foreground mb-4">6. Cookies</h2>
            <p>
              The Platform uses cookies to maintain sessions and gather
              analytics. You may control cookies via your browser settings;
              disabling some may affect functionality.
            </p>
          </div>

          {/* 7. Children's Privacy */}
          <div>
            <h2 className="text-foreground mb-4">7. Children's Privacy</h2>
            <p>
              The Platform is for businesses and not directed at individuals
              under 18. We do not knowingly collect data from minors.
            </p>
          </div>

          {/* 8. Changes to This Policy */}
          <div>
            <h2 className="text-foreground mb-4">
              8. Changes to This Policy
            </h2>
            <p>
              Material changes will be notified by email or Platform notice.
              Continued use after the effective date of a revised policy
              constitutes acceptance.
            </p>
          </div>

          {/* 9. Contact */}
          <div>
            <h2 className="text-foreground mb-4">9. Contact</h2>
            <p>
              SimpleGrid Technologies Pvt. Ltd.
              <br />
              22nd Cross Road, 23rd Main Road, HSR Layout, Bengaluru, Karnataka
              560102
              <br />
              Email:{" "}
              <a
                href="mailto:hello@simplegrid.ai"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                hello@simplegrid.ai
              </a>{" "}
              &middot; Phone:{" "}
              <a
                href="tel:+919649933000"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                +91 96499 33000
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
