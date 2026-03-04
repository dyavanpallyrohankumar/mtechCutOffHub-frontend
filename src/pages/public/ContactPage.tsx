import { Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl">

        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            We'd love to hear from you
          </p>
        </div>

        <div className="glass-card p-8 space-y-6 text-sm text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              General Inquiries
            </h2>
            <p>
              For questions about cutoff data, features, or corrections,
              please email us at:
            </p>
            <a href="mailto:serviceconnect360+mtechCutOffHub@gmail.com?subject=General Inquiry">
              <p className="mt-2 text-primary font-medium">
                serviceconnect360+mtechCutOffHub@gmail.com
              </p>
            </a>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Report Data Issue
            </h2>
            <p>
              If you find incorrect cutoff information, please mention:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>College Name</li>
              <li>Branch</li>
              <li>Year</li>
              <li>Exam & Category</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Location
            </h2>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>India</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;