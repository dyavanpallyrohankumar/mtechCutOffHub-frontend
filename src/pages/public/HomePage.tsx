import { Link } from "react-router-dom";
import { GraduationCap, BarChart3, Search, Shield, ArrowRight, TrendingUp, Building2 } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Cutoff Analytics",
    description: "Explore detailed opening and closing ranks across years, categories, and phases.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find colleges and branches instantly with powerful search and filters.",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Track how cutoffs change year over year for informed decision-making.",
  },
  {
    icon: Shield,
    title: "Verified Data",
    description: "All data sourced from official KEA allotment results, verified for accuracy.",
  },
];

const stats = [
  { value: "200+", label: "Colleges" },
  { value: "1000+", label: "Branches" },
  { value: "50K+", label: "Cutoff Records" },
  { value: "5+", label: "Years of Data" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36 px-4">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(234 89% 64% / 0.3)" }} />
        
        <div className="relative container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">GATE & PGCET Analytics</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Your MTech{" "}
            <span className="gradient-text">Cutoff</span>{" "}
            Intelligence Hub
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Explore comprehensive cutoff data across Karnataka's engineering colleges. 
            Make data-driven decisions for your MTech admissions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/colleges"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl btn-gradient text-sm"
            >
              Explore Cutoffs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for{" "}
              <span className="gradient-accent-text">smart admissions</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Powerful tools to analyze, compare, and understand MTech cutoff trends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card-hover p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="glass-card p-10 animate-pulse-glow">
            <Building2 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Ready to explore?</h2>
            <p className="text-muted-foreground mb-6">
              Browse colleges, compare cutoffs, and plan your MTech journey.
            </p>
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl btn-gradient text-sm"
            >
              Browse Colleges
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 MTech Cutoff Hub. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
