function PrivacyPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav onLoginClick={() => setShowLogin(true)} />
    <main id="main" className="legal-page">
      <div className="tag">LEGAL</div>
      <h1 className="h1" style={{margin:'4px 0 8px'}}>Privacy Policy</h1>
      <div className="legal-meta">Effective Date: March 3, 2026 · Operated by Valaya AI Technologies Pvt. Ltd. ("SimpleGrid", "we", "our", "us")</div>

      <h2>Introduction</h2>
      <p>Valaya AI Technologies Pvt Ltd. ("SimpleGrid," "we," "our," or "us") operates the SimpleGrid platform and related services (collectively, the "Platform"). This Privacy Policy explains how we collect, use, store, and protect your information. By accessing or using SimpleGrid, you agree to the practices described here.</p>

      <h2>1. Information We Collect</h2>
      <h3>1.1 Information You Provide</h3>
      <ul>
        <li>Business name, contact details, and operational structure during onboarding</li>
        <li>User account information (names, emails, phone numbers, roles)</li>
        <li>Uploaded files (Excel sheets, PDFs, invoices, purchase orders, scanned records)</li>
        <li>Natural language inputs, commands, and operational instructions, which may be processed by third-party AI providers (see Section 4)</li>
        <li>Workflow configurations, approval rules, and policies you define</li>
        <li>Communications with our team</li>
      </ul>
      <h3>1.2 Information Collected Automatically</h3>
      <ul>
        <li>Device and browser information (IP address, browser type, OS)</li>
        <li>Usage data (features used, time spent, actions taken)</li>
        <li>Log data (access times, error logs, API requests)</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>
      <h3>1.3 Business and Operational Data</h3>
      <ul>
        <li>Financial transaction records, inventory data, and workflows</li>
        <li>Employee and vendor information recorded in the Platform</li>
        <li>Approval histories and audit trails</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Provide, operate, and maintain the Platform</li>
        <li>Configure and personalize your workflows and system structure</li>
        <li>Process uploaded documents using AI/ML models</li>
        <li>Enable real-time updates, approvals, and status tracking</li>
        <li>Communicate about your account, onboarding, and support</li>
        <li>Improve Platform features and capabilities</li>
        <li>Ensure security and prevent fraud</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>We do not sell your data to third parties. We do not train shared AI models on your data.</p>

      <h2>3. Data Storage and Security</h2>
      <p><strong>3.1 Storage:</strong> Data is primarily stored on secure cloud infrastructure located in India, in compliance with applicable Indian data protection laws.</p>
      <p><strong>3.2 Security Measures:</strong> We use encryption in transit (TLS/SSL) and at rest, role-based access controls, regular security assessments, and audit trails for all Platform activity. No system is completely secure; we cannot guarantee absolute security.</p>
      <p><strong>3.3 Retention:</strong> Data is retained while your account is active. Upon termination, data is held for 90 days for export/recovery requests, then deleted or anonymized unless law requires otherwise.</p>

      <h2>4. Sharing of Information</h2>
      <p>We may share information with:</p>
      <ul>
        <li>Service providers (cloud hosting, email, analytics) bound by confidentiality obligations</li>
        <li>AI/ML model providers processing inputs solely to deliver services to you</li>
        <li>Legal authorities when required by law or court order</li>
        <li>Successor entities in a merger or acquisition, with advance notice</li>
      </ul>
      <p>We do not share data with advertisers or marketing platforms.</p>

      <h2>5. Your Rights</h2>
      <p>You may have the right to: access, correct, or delete your personal data; withdraw consent; object to or restrict processing; and request data portability. Contact <a href="mailto:hello@simplegrid.ai" style={{color:'var(--sg-blue)'}}>hello@simplegrid.ai</a> to exercise these rights.</p>

      <h2>6. Cookies</h2>
      <p>The Platform uses cookies to maintain sessions and gather analytics. You may control cookies via your browser settings; disabling some may affect functionality.</p>

      <h2>7. Children's Privacy</h2>
      <p>The Platform is for businesses and not directed at individuals under 18. We do not knowingly collect data from minors.</p>

      <h2>8. Changes to This Policy</h2>
      <p>Material changes will be notified by email or Platform notice. Continued use after the effective date of a revised policy constitutes acceptance.</p>

      <h2>9. Contact</h2>
      <p>Email: <a href="mailto:hello@simplegrid.ai" style={{color:'var(--sg-blue)'}}>hello@simplegrid.ai</a></p>
      <p>See also: <a href="terms.html" style={{color:'var(--sg-blue)'}}>Terms of Service</a></p>
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyPage />);
