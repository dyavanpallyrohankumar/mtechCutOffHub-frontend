import { Shield, Mail, Database, Lock, Globe, FileText } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}

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

        <div className="glass-card p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">

          {/* 1 Introduction */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              1. Introduction
            </h2>
            <p>
              MTech Cutoff Hub is an educational analytics platform designed to
              help students explore historical admission cutoff trends for
              postgraduate engineering programs. We respect your privacy and are
              committed to protecting the information you provide while using
              this website.
            </p>
          </section>

          {/* 2 Public Data Sources */}

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                2. Public Data Sources
              </h2>
            </div>

            <p>
              Some data displayed on MTech Cutoff Hub is collected from publicly
              available counseling portals operated by government authorities.
              Examples may include portals related to:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>TS PGECET counseling portals</li>
              <li>AP PGECET counseling portals</li>
              <li>Official university admission portals</li>
            </ul>

            <p className="mt-3">
              We do <strong>not claim ownership</strong> of this data. It is used
              strictly for educational, analytical, and informational purposes.
              The official counseling portals remain the authoritative source
              for admission decisions and official data.
            </p>
          </section>

          {/* 3 Information We Collect */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              3. Information We Collect
            </h2>

            <ul className="list-disc ml-6 space-y-1">
              <li>Basic usage data (pages visited, navigation patterns)</li>
              <li>Device and browser information</li>
              <li>IP address for analytics and security monitoring</li>
              <li>Admin authentication data for authorized administrative access</li>
            </ul>
          </section>

          {/* 4 How We Use Information */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              4. How We Use Information
            </h2>

            <p>
              The collected information may be used to:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Improve platform performance and usability</li>
              <li>Analyze user behavior and traffic trends</li>
              <li>Maintain platform security</li>
              <li>Improve search and analytics features</li>
            </ul>
          </section>

          {/* 5 Cookies and Advertising */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              5. Cookies & Advertising
            </h2>

            <p>
              This website may use third-party advertising services such as
              Google AdSense. These services may use cookies to display ads
              based on a user’s previous visits to this or other websites.
            </p>

            <p className="mt-2">
              Users can manage ad personalization settings at:
            </p>

            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://www.google.com/settings/ads
            </a>
          </section>

          {/* 6 Analytics & Log Files */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              6. Analytics and Log Files
            </h2>

            <p>
              Like many websites, MTech Cutoff Hub uses standard log files.
              These files log visitors when they visit websites.
            </p>

            <p className="mt-2">
              The information collected may include:
            </p>

            <ul className="list-disc ml-6 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Internet Service Provider (ISP)</li>
              <li>Date and time stamp</li>
              <li>Referring or exit pages</li>
            </ul>

            <p className="mt-2">
              This data is used for analyzing trends, administering the site,
              and improving user experience.
            </p>
          </section>

          {/* 7 Admin Authentication */}

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                7. Admin Authentication & Security
              </h2>
            </div>

            <p>
              Administrative access to the platform is protected using secure
              authentication mechanisms.
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Encrypted credential storage</li>
              <li>One-Time Password (OTP) verification</li>
              <li>Token-based authentication (JWT)</li>
              <li>Role-based access controls</li>
            </ul>
          </section>

          {/* 8 Data Retention */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              8. Data Retention
            </h2>

            <p>
              We retain analytics and usage data only for the period necessary
              to analyze platform performance and maintain system security.
            </p>

            <p className="mt-2">
              Administrative authentication logs may be retained for security
              monitoring purposes.
            </p>
          </section>

          {/* 9 Third Party Links */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              9. Third-Party Links
            </h2>

            <p>
              This website may contain links to external websites. We are not
              responsible for the privacy policies or content of third-party
              websites.
            </p>
          </section>

          {/* 10 Children */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              10. Children's Information
            </h2>

            <p>
              MTech Cutoff Hub does not knowingly collect personal information
              from children under the age of 13. If you believe a child has
              provided personal information on our website, please contact us
              and we will promptly remove such data.
            </p>
          </section>

          {/* 11 Privacy Rights */}

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                11. Your Privacy Rights
              </h2>
            </div>

            <p>
              Depending on applicable laws, users may have rights to:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Request access to their data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of personal information</li>
            </ul>
          </section>

          {/* 12 Data Accuracy */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              12. Data Accuracy Disclaimer
            </h2>

            <p>
              While we strive to ensure accuracy, MTech Cutoff Hub does not
              guarantee that all data displayed on the platform is complete,
              current, or error-free.
            </p>
          </section>

          {/* 13 Educational Disclaimer */}

          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                13. Educational Purpose Disclaimer
              </h2>
            </div>

            <p>
              The information provided on this platform is intended for
              educational and informational purposes only. Admission decisions
              should always be verified through official counseling authorities
              and university portals.
            </p>
          </section>

          {/* 14 Security */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              14. Security Measures
            </h2>

            <p>
              We implement industry-standard security practices including:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>HTTPS encrypted connections</li>
              <li>Secure authentication mechanisms</li>
              <li>Access control systems</li>
              <li>Server-side monitoring and logging</li>
            </ul>
          </section>

          {/* 15 Changes */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              15. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically. Any updates will
              be posted on this page with a revised "Last Updated" date.
            </p>
          </section>

          {/* 16 Governing Law */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              16. Governing Law
            </h2>

            <p>
              This Privacy Policy shall be governed by and interpreted in
              accordance with the laws of India.
            </p>
          </section>

          {/* 17 Contact */}

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              17. Contact Information
            </h2>

            <p>
              For privacy-related questions, reporting misuse, or requesting
              information regarding your data, please contact:
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