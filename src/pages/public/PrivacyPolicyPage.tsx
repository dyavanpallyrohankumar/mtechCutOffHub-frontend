import { Shield, Mail } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">

        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Last updated: January 2026
          </p>
        </div>

        <div className="glass-card p-8 space-y-6 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              1. Introduction
            </h2>
            <p>
              MTech Cutoff Hub provides analytics and historical cutoff data
              for educational purposes. We respect your privacy and are
              committed to protecting any information you provide while using
              this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Basic usage data (pages visited, time spent)</li>
              <li>Device and browser information</li>
              <li>IP address (for security and analytics)</li>
              <li>Admin login credentials (for authorized access only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              3. Cookies & Advertising
            </h2>
            <p>
              This website may use Google AdSense to display advertisements.
              Google may use cookies to serve ads based on your prior visits to
              this or other websites.
            </p>
            <p className="mt-2">
              You may opt out of personalized advertising by visiting:
              <br />
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.google.com/settings/ads
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              4. Data Usage
            </h2>
            <p>
              Collected data is used to improve user experience, analyze
              traffic trends, enhance performance, and maintain security.
              We do not sell or trade personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              5. Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your
              information. However, no online system can guarantee 100%
              security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              6. Third-Party Links
            </h2>
            <p>
              This website may contain links to external sites. We are not
              responsible for the privacy practices of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <a href="mailto:serviceconnect360+mtechCutOffHub@gmail.com?subject=Privacy Policy Inquiry">
              <div className="flex items-center gap-2 mt-2 text-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>serviceconnect360+mtechCutOffHub@gmail.com</span>
              </div>
            </a>

          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;