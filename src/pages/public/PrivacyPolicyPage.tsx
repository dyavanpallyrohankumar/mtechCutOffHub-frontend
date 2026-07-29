import {
  Shield,
  Mail,
  Database,
  Lock,
  Globe,
  FileText,
  AlertTriangle,
  Cookie,
  Building2,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}

        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-4xl font-bold">
            Privacy <span className="gradient-text">Policy</span>
          </h1>

          <p className="text-muted-foreground mt-3">Last Updated: July 2026</p>

          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters to us. This Privacy Policy explains how
            CutoffHub collects, uses, protects, and processes information while
            providing educational resources related to engineering admissions,
            colleges, programs, entrance examinations, and historical cutoff
            data across India.
          </p>
        </div>

        <div className="glass-card p-8 space-y-10 text-sm leading-7 text-muted-foreground">
          {/* 1 Introduction */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Introduction
            </h2>

            <p>
              Welcome to <strong>CutoffHub</strong>.
            </p>

            <p className="mt-3">
              CutoffHub is a nationwide educational and informational platform
              designed to assist students in exploring historical admission
              cutoffs, entrance examinations, colleges, postgraduate engineering
              programs, counseling statistics, and admission-related insights
              across multiple Indian states.
            </p>

            <p className="mt-3">
              By accessing or using this platform, you acknowledge that you have
              read, understood, and agreed to this Privacy Policy.
            </p>

            <p className="mt-3">
              CutoffHub is an independent educational platform and is
              <strong>
                {" "}
                not affiliated with, endorsed by, sponsored by, or operated by
                any Government authority, counseling authority, university,
                examination board, or regulatory organization, unless explicitly
                stated.
              </strong>
            </p>
          </section>

          {/* 2 Public Data */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                2. Public Data Sources
              </h2>
            </div>

            <p>
              Information displayed on CutoffHub is compiled from publicly
              available sources including official counseling portals, admission
              authorities, universities, technical education departments, and
              publicly released government documents.
            </p>

            <p className="mt-3">Examples include, but are not limited to:</p>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>State PGECET Counseling Portals</li>
              <li>State ECET Counseling Authorities</li>
              <li>GATE Admission Portals</li>
              <li>University Admission Websites</li>
              <li>AICTE Approved Institution Data</li>
              <li>Official College Websites</li>
              <li>Government Technical Education Departments</li>
            </ul>

            <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10 p-4 mt-5">
              <div className="flex gap-3">
                <AlertTriangle className="text-yellow-600 mt-1 w-5 h-5" />

                <p className="text-yellow-800 dark:text-yellow-300">
                  CutoffHub does <strong>not claim ownership</strong> of
                  publicly available admission information. All trademarks,
                  logos, institutional names, counseling schedules, seat
                  matrices, and admission notifications remain the intellectual
                  property of their respective organizations.
                </p>
              </div>
            </div>

            <p className="mt-5">
              Historical cutoff information is provided solely for educational
              analysis and guidance. Official counseling authorities remain the
              sole authoritative source for admissions, eligibility,
              reservations, fee structures, seat availability, and final
              allotments.
            </p>
          </section>

          {/* 3 Information We Collect */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Information We Collect
            </h2>

            <p>
              Depending on how you interact with CutoffHub, we may collect
              certain information including:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>
                Device information (browser, operating system, screen resolution
                and device type)
              </li>

              <li>
                IP address and approximate geographical location for analytics
                and security.
              </li>

              <li>
                Pages visited, search queries, navigation behavior and referral
                information.
              </li>

              <li>
                Cookies and similar technologies used to improve user
                experience.
              </li>

              <li>
                Authentication details for authorized administrative users.
              </li>

              <li>
                Server logs generated during normal interaction with the
                platform.
              </li>
            </ul>

            <p className="mt-5">
              We do <strong>not intentionally collect</strong>
              sensitive personal information such as financial information,
              Aadhaar numbers, passport details, or biometric information.
            </p>
          </section>

          {/* 4 How We Use Information */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. How We Use Information
            </h2>

            <p>Information collected by CutoffHub may be used to:</p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Improve website performance and reliability.</li>

              <li>Provide accurate educational insights.</li>

              <li>Analyze traffic trends and usage patterns.</li>

              <li>Enhance search functionality.</li>

              <li>Maintain platform security.</li>

              <li>Prevent fraud, abuse, and unauthorized access.</li>

              <li>Respond to legal obligations where required.</li>

              <li>Improve future platform features.</li>
            </ul>

            <p className="mt-5">
              We do not sell or rent your personal information to third parties.
            </p>
          </section>

          {/* 5 Cookies */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Cookie className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                5. Cookies & Advertising
              </h2>
            </div>

            <p>
              CutoffHub uses cookies and similar technologies to improve
              performance, remember preferences, analyze website usage, and
              enhance user experience.
            </p>

            <p className="mt-4">
              We may also use trusted third-party services including:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Google Analytics</li>

              <li>Google AdSense</li>

              <li>Cloud Hosting Providers</li>

              <li>Content Delivery Networks (CDN)</li>
            </ul>

            <p className="mt-5">
              These services may place cookies in accordance with their own
              privacy policies.
            </p>

            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline block mt-3"
            >
              https://adssettings.google.com
            </a>
          </section>

          {/* 6 Analytics */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Analytics & Log Files
            </h2>

            <p>
              Like most modern websites, CutoffHub automatically records
              standard server logs whenever users access the platform.
            </p>

            <p className="mt-4">Logged information may include:</p>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>IP Address</li>

              <li>Browser Type</li>

              <li>Operating System</li>

              <li>Internet Service Provider (ISP)</li>

              <li>Date and Time of Access</li>

              <li>Visited Pages</li>

              <li>Referring Website</li>

              <li>Error Logs</li>

              <li>Performance Metrics</li>
            </ul>

            <p className="mt-5">
              This information is used solely for improving platform stability,
              identifying technical issues, detecting abuse, monitoring
              security, and understanding overall usage trends.
            </p>
          </section>
          {/* 7 Admin Authentication */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                7. Administrative Access & Security
              </h2>
            </div>

            <p>
              Administrative features of CutoffHub are restricted to authorized
              personnel only. Administrative accounts are protected using
              multiple security mechanisms to prevent unauthorized access and
              protect platform integrity.
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Encrypted password storage.</li>

              <li>JWT based authentication.</li>

              <li>Role-Based Access Control (RBAC).</li>

              <li>OTP verification where applicable.</li>

              <li>Secure session management.</li>

              <li>Authentication logging and monitoring.</li>

              <li>Automatic session expiration.</li>
            </ul>

            <p className="mt-5">
              Any attempt to gain unauthorized administrative access, exploit
              vulnerabilities, or interfere with platform operations may result
              in permanent access restrictions and legal action where
              applicable.
            </p>
          </section>

          {/* 8 Data Retention */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Data Retention
            </h2>

            <p>
              CutoffHub retains information only for as long as reasonably
              necessary to fulfill the purposes described in this Privacy Policy
              or as required by applicable law.
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Server logs for security monitoring.</li>

              <li>Authentication logs for authorized administrators.</li>

              <li>Anonymous analytics information.</li>

              <li>System error logs for troubleshooting.</li>
            </ul>

            <p className="mt-5">
              Once retention is no longer necessary, information is securely
              deleted, anonymized, or archived in accordance with operational
              and legal requirements.
            </p>
          </section>

          {/* 9 Third Party Services */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                9. Third-Party Services
              </h2>
            </div>

            <p>
              CutoffHub may integrate with trusted third-party service providers
              to improve functionality, performance, analytics, advertising,
              hosting, and security.
            </p>

            <p className="mt-4">These providers may include:</p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Google Analytics</li>

              <li>Google AdSense</li>

              <li>Cloud hosting providers</li>

              <li>Content Delivery Networks (CDNs)</li>

              <li>Email delivery services</li>

              <li>Domain and DNS providers</li>
            </ul>

            <p className="mt-5">
              These organizations operate under their own privacy policies.
              CutoffHub does not control the privacy practices of third-party
              websites or services.
            </p>
          </section>

          {/* 10 Children's Privacy */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              10. Children's Privacy
            </h2>

            <p>
              CutoffHub is intended for students, educational institutions,
              researchers, and the general public.
            </p>

            <p className="mt-4">
              We do not knowingly collect personal information from children
              under the age required by applicable law.
            </p>

            <p className="mt-4">
              If you believe that a child has provided personal information
              through this website, please contact us immediately so appropriate
              action can be taken.
            </p>
          </section>

          {/* 11 Your Privacy Rights */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                11. Your Privacy Rights
              </h2>
            </div>

            <p>
              Subject to applicable laws, users may have certain rights
              regarding their personal information.
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Request access to personal information.</li>

              <li>Request correction of inaccurate information.</li>

              <li>Request deletion where legally permissible.</li>

              <li>Withdraw consent where applicable.</li>

              <li>Object to certain processing activities.</li>

              <li>Request clarification regarding collected information.</li>
            </ul>

            <p className="mt-5">
              Requests may be reviewed and processed in accordance with
              applicable legal obligations and operational requirements.
            </p>
          </section>

          {/* 12 Data Accuracy Disclaimer */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                12. Data Accuracy Disclaimer
              </h2>
            </div>

            <p>
              While CutoffHub makes every reasonable effort to present accurate,
              reliable, and up-to-date educational information, we do not
              warrant or guarantee that all information displayed on the
              platform is complete, current, uninterrupted, or free from errors.
            </p>

            <p className="mt-4">
              Admission cutoffs, seat matrices, counseling schedules, fee
              structures, reservation policies, intake capacities, and
              institutional information may change without prior notice by the
              respective authorities.
            </p>

            <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/10 p-4 mt-5">
              <div className="flex gap-3">
                <AlertTriangle className="text-red-600 w-5 h-5 mt-1" />

                <p className="text-red-800 dark:text-red-300">
                  Users should always verify admission-related information
                  directly from the official counseling authority, university,
                  or government website before making academic, financial, or
                  admission decisions.
                </p>
              </div>
            </div>
          </section>
          {/* 13 Educational Purpose Disclaimer */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                13. Educational Purpose Disclaimer
              </h2>
            </div>

            <p>
              CutoffHub is an educational and informational platform created to
              help students explore historical admission statistics, colleges,
              entrance examinations, postgraduate engineering programs, and
              counseling trends.
            </p>

            <p className="mt-4">
              Information presented on this platform should never be considered
              official admission advice, legal advice, financial advice, or a
              guarantee of admission.
            </p>

            <p className="mt-4">
              Students must always verify admission notifications, counseling
              schedules, eligibility requirements, reservation policies, fee
              structures, and cutoff data through the respective official
              authorities before making any admission-related decision.
            </p>
          </section>

          {/* 14 Intellectual Property */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              14. Intellectual Property Rights
            </h2>

            <p>
              Unless otherwise stated, all original content, application design,
              source code, analytics, user interface, branding, graphics, logos,
              software architecture, and documentation of CutoffHub are
              protected under applicable intellectual property laws.
            </p>

            <p className="mt-4">
              Public admission information, university names, counseling
              schedules, institutional logos, and other publicly available
              records remain the property of their respective organizations.
            </p>

            <p className="mt-4">
              Users may not reproduce, redistribute, copy, scrape, commercially
              exploit, reverse engineer, or modify any proprietary portion of
              CutoffHub without prior written permission.
            </p>
          </section>

          {/* 15 Acceptable Use */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              15. Acceptable Use Policy
            </h2>

            <p>
              By using CutoffHub, you agree to use the platform only for lawful
              and educational purposes.
            </p>

            <p className="mt-4">You agree that you will not:</p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Attempt unauthorized access to any system.</li>

              <li>Use bots or automated scraping tools.</li>

              <li>Reverse engineer platform functionality.</li>

              <li>Upload malicious software or harmful code.</li>

              <li>Interfere with website performance.</li>

              <li>Copy or commercially redistribute platform data.</li>

              <li>Misrepresent affiliation with CutoffHub.</li>

              <li>Violate any applicable law while using the platform.</li>
            </ul>

            <p className="mt-5">
              Violation of these terms may result in suspension of access,
              permanent blocking, and legal action where applicable.
            </p>
          </section>

          {/* 16 Limitation of Liability */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              16. Limitation of Liability
            </h2>

            <p>
              CutoffHub provides educational information on an "as available"
              and "as is" basis.
            </p>

            <p className="mt-4">
              To the fullest extent permitted under applicable law, CutoffHub,
              its developers, contributors, affiliates, and administrators shall
              not be liable for any direct, indirect, incidental, consequential,
              or special damages arising from:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Reliance on historical cutoff data.</li>

              <li>Admission decisions made by users.</li>

              <li>Incorrect or outdated public information.</li>

              <li>Temporary website interruptions.</li>

              <li>Third-party websites or services.</li>

              <li>Technical failures beyond reasonable control.</li>
            </ul>
          </section>

          {/* 17 Security */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              17. Security Measures
            </h2>

            <p>
              CutoffHub implements reasonable administrative, technical, and
              organizational safeguards to protect platform infrastructure and
              available information.
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>HTTPS encrypted communication.</li>

              <li>Secure authentication mechanisms.</li>

              <li>Access control and authorization.</li>

              <li>Server-side monitoring.</li>

              <li>Security logging.</li>

              <li>Regular software updates.</li>

              <li>Vulnerability mitigation practices.</li>
            </ul>

            <p className="mt-5">
              Although reasonable security measures are implemented, no
              internet-based service can guarantee absolute security.
            </p>
          </section>

          {/* 18 Changes */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              18. Changes to this Privacy Policy
            </h2>

            <p>
              We reserve the right to modify, update, or revise this Privacy
              Policy at any time without prior notice.
            </p>

            <p className="mt-4">
              Material changes will become effective immediately after
              publication on this page. Continued use of CutoffHub constitutes
              acceptance of the revised policy.
            </p>
          </section>

          {/* 19 Governing Law */}

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              19. Governing Law
            </h2>

            <p>
              This Privacy Policy shall be governed by and interpreted in
              accordance with the laws of the Republic of India.
            </p>

            <p className="mt-4">
              Any disputes arising from the use of CutoffHub shall be subject to
              the jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* 20 Contact */}

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-primary" />

              <h2 className="text-xl font-semibold text-foreground">
                20. Contact Information
              </h2>
            </div>

            <p>
              If you have questions regarding this Privacy Policy, your privacy
              rights, data practices, or wish to report misuse of the platform,
              please contact us.
            </p>

            <a
              href="mailto:serviceconnect360+cutoffhub@gmail.com?subject=Privacy Policy Inquiry"
              className="inline-flex items-center gap-2 mt-5 text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>serviceconnect360+cutoffhub@gmail.com</span>
            </a>

            <p className="mt-6">
              Thank you for trusting <strong>CutoffHub</strong>. We remain
              committed to protecting user privacy while providing transparent,
              reliable, and accessible educational information for students
              across India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
