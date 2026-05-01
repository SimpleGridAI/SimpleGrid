function TermsPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav onLoginClick={() => setShowLogin(true)} />
    <main id="main" className="legal-page">
      <div className="tag">LEGAL</div>
      <h1 className="h1" style={{margin:'4px 0 8px'}}>Terms of Service</h1>
      <div className="legal-meta">Effective Date: March 3, 2026 · Operated by Valaya AI Technologies Pvt. Ltd.</div>

      <h2>Introduction</h2>
      <p>These Terms of Service ("Terms") govern your access to and use of the SimpleGrid platform provided by Valaya AI Technologies Pvt Ltd. By using the Platform, you agree to these Terms. If using the Platform on behalf of a business, you confirm you have authority to bind that business.</p>

      <h2>1. Eligibility and Account Registration</h2>
      <ul>
        <li>You must be at least 18 years of age with legal capacity to contract.</li>
        <li>You must provide accurate, current business and account information.</li>
        <li>You are responsible for all activity under your account and the confidentiality of your credentials.</li>
        <li>Report suspected unauthorised access immediately to <a href="mailto:hello@simplegrid.ai" style={{color:'var(--sg-blue)'}}>hello@simplegrid.ai</a>.</li>
      </ul>

      <h2>2. Platform Access and Use</h2>
      <p><strong>2.1 License Grant:</strong> SimpleGrid grants you a limited, non-exclusive, non-transferable, revocable license to use the Platform for your internal business operations.</p>
      <p><strong>2.2 Permitted Use:</strong> Configure workflows, upload and manage documents, manage user accounts, and use AI-assisted features.</p>
      <p><strong>2.3 Prohibited Use:</strong> You agree not to:</p>
      <ul>
        <li>Use the Platform for any unlawful purpose</li>
        <li>Upload fraudulent or rights-infringing content</li>
        <li>Reverse-engineer or decompile any part of the Platform</li>
        <li>Use automated scraping tools without authorisation</li>
        <li>Share credentials with unauthorised parties</li>
        <li>Introduce malware or malicious code</li>
        <li>Interfere with Platform performance or security</li>
        <li>Resell or white-label the Platform without written consent</li>
      </ul>

      <h2>3. Selective Onboarding and Trial</h2>
      <ul>
        <li>Access is limited to invited and approved businesses.</li>
        <li>We offer a 30-day live trial on real operational data. If the Platform does not improve your execution, you may exit without penalty during the trial period.</li>
        <li>The Platform is actively developed. New features and updates may be released, modified, or deprecated without prior notice.</li>
        <li>Feedback you provide may be used by SimpleGrid to improve the Platform.</li>
      </ul>

      <h2>4. Onboarding and Implementation</h2>
      <p>Deployment timelines (e.g., 7 days) are estimates and may vary based on workflow complexity and your team's responsiveness. You are responsible for providing accurate workflow information and reviewing configurations before go-live.</p>

      <h2>5. Your Data</h2>
      <p><strong>5.1 Ownership:</strong> You retain full ownership of all data you upload or input ("Customer Data"). SimpleGrid claims no ownership over Customer Data.</p>
      <p><strong>5.2 License to Process:</strong> By uploading Customer Data, you grant SimpleGrid a limited license to process and store it solely to provide the Platform.</p>
      <p><strong>5.3 Accuracy:</strong> You are responsible for the accuracy of Customer Data. SimpleGrid is not liable for consequences arising from inaccurate data you provide.</p>
      <p><strong>5.4 Portability:</strong> Upon request, we will export your Customer Data in a standard format within a reasonable timeframe.</p>

      <h2>6. AI-Generated Outputs</h2>
      <ul>
        <li>AI outputs are suggestions or drafts requiring your review and approval before becoming operational records.</li>
        <li>AI outputs may contain errors. You are responsible for reviewing all outputs before acting on them.</li>
        <li>SimpleGrid does not guarantee the accuracy of AI-generated content.</li>
        <li>You retain final decision-making authority over all Platform actions.</li>
      </ul>

      <h2>7. Fees and Payment</h2>
      <p>Fees and billing terms will be set out in a separate order form or subscription agreement. Unless otherwise agreed: fees are due in advance; all fees are non-refundable except as expressly stated; we may suspend access for overdue payments after reasonable notice.</p>

      <h2>8. Intellectual Property</h2>
      <p>All rights to the Platform - software, algorithms, designs, trademarks, and documentation - belong to SimpleGrid or its licensors. These Terms transfer no intellectual property rights to you. Feedback you provide may be used by SimpleGrid without restriction or compensation.</p>

      <h2>9. Confidentiality</h2>
      <p>Each party agrees to keep the other's non-public confidential information private, use it only for the purpose of these Terms, and protect it with reasonable care. This does not apply to information that is publicly known, independently developed, or legally required to be disclosed.</p>

      <h2>10. Warranties and Disclaimers</h2>
      <p>SimpleGrid warrants it will provide the Platform with reasonable care and skill. Beyond this, THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>

      <h2>11. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>SimpleGrid is not liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or goodwill.</li>
        <li>SimpleGrid's total liability shall not exceed the total fees paid by you in the three (3) months preceding the claim.</li>
      </ul>

      <h2>12. Indemnification</h2>
      <p>You agree to indemnify SimpleGrid against claims, liabilities, damages, and legal fees arising from your use of the Platform, breach of these Terms, your Customer Data, or violation of applicable law.</p>

      <h2>13. Term and Termination</h2>
      <ul>
        <li>You may terminate at any time by notifying <a href="mailto:hello@simplegrid.ai" style={{color:'var(--sg-blue)'}}>hello@simplegrid.ai</a>.</li>
        <li>SimpleGrid may suspend or terminate for material breach, non-payment, or legal requirement.</li>
        <li>Upon termination, Customer Data is held for 90 days for export requests, then permanently deleted.</li>
        <li>Provisions on IP, confidentiality, liability, indemnification, and governing law survive termination.</li>
      </ul>

      <h2>14. Modifications</h2>
      <p>We will provide at least 14 days' notice of material changes. Continued use after the effective date constitutes acceptance.</p>

      <h2>15. Governing Law and Disputes</h2>
      <p>These Terms are governed by the laws of India. Disputes will first be addressed through good-faith negotiation (30 days). Unresolved disputes will go to arbitration under the Arbitration and Conciliation Act, 1996, seated in Bengaluru, Karnataka, in English. This does not prevent either party from seeking urgent court relief.</p>

      <h2>16. Miscellaneous</h2>
      <ul>
        <li><strong>Entire Agreement:</strong> These Terms plus any order form constitute the full agreement.</li>
        <li><strong>Severability:</strong> If any provision is unenforceable, the rest remain in effect.</li>
        <li><strong>Waiver:</strong> Failure to enforce a provision is not a waiver of future rights.</li>
        <li><strong>Assignment:</strong> You may not assign rights without consent. SimpleGrid may assign in a restructuring or acquisition.</li>
        <li><strong>Force Majeure:</strong> Neither party is liable for delays caused by events beyond reasonable control.</li>
      </ul>

      <h2>17. Contact</h2>
      <p>Email: <a href="mailto:hello@simplegrid.ai" style={{color:'var(--sg-blue)'}}>hello@simplegrid.ai</a></p>
      <p>See also: <a href="privacy.html" style={{color:'var(--sg-blue)'}}>Privacy Policy</a></p>
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<TermsPage />);
