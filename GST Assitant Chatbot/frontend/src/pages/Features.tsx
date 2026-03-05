import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Clock, Bot, Calculator, Database, AlertCircle, TrendingUp, Globe, Archive } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "GSTR Forms Filing",
      description: "Complete support for GSTR-1, GSTR-3B, CMP-08, and GSTR-9 forms with automated validation and error detection."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Compliant",
      description: "Bank-grade security with 256-bit encryption. Fully compliant with government regulations and data protection laws."
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI-Powered Assistant",
      description: "Get instant answers to GST queries with our intelligent chatbot trained on latest tax regulations and guidelines."
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Reconciliation Facility",
      description: "Automated matching of purchase and sales data with GSTR-2A/2B for seamless reconciliation and compliance."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "HSN Code Management",
      description: "Comprehensive HSN code database with search functionality and automatic classification for your products."
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      title: "Error Detection",
      description: "Advanced algorithms detect and highlight potential errors before filing, reducing chances of rejection."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics & Reports",
      description: "Detailed sales and purchase reports with insights to help you make informed business decisions."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Automated Reminders",
      description: "Never miss a deadline with smart notifications for due dates, late fees, and important updates."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Import/Export Facility",
      description: "Specialized tools for import/export businesses with customs duty calculations and IGST management."
    },
    {
      icon: <Archive className="h-8 w-8" />,
      title: "Database Backup",
      description: "Automatic daily backups ensure your data is always safe and recoverable when you need it."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Powerful Features for Complete GST Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to handle GST filing, compliance, and business growth in one comprehensive platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your GST Filing Experience?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses who trust GSTFile for their tax compliance needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Free Trial
                </button>
                <button className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}