import { Card, CardContent } from "@/components/ui/card";
import { Shield, Bell, Bot, BarChart3, FileCheck, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Filing",
    description: "Bank-level encryption ensures your financial data is always protected and compliant with government standards."
  },
  {
    icon: Bell,
    title: "Automated Reminders", 
    description: "Never miss a deadline again. Get smart notifications for upcoming due dates and filing requirements."
  },
  {
    icon: Bot,
    title: "AI Assistance",
    description: "Our intelligent chatbot helps you navigate complex GST rules and provides instant answers to your questions."
  },
  {
    icon: BarChart3,
    title: "Easy Tracking",
    description: "Monitor all your filings in one place with real-time status updates and comprehensive reporting."
  },
  {
    icon: FileCheck,
    title: "Error Detection",
    description: "Advanced validation catches errors before submission, ensuring 100% accurate and compliant filings."
  },
  {
    icon: Clock,
    title: "Quick Processing",
    description: "File your returns in minutes, not hours. Our streamlined process makes GST compliance effortless."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Why Choose <span className="text-primary">GSTFile</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your GST compliance efficiently and accurately
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-secondary/20 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-muted-foreground">Filings Processed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">5min</div>
            <div className="text-muted-foreground">Average Filing Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}