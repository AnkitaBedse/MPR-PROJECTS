import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen, Video, Search } from "lucide-react";

export default function Documentation() {
  const documentCategories = [
    {
      title: "GST Forms & Templates",
      description: "Download ready-to-use GST forms and templates",
      icon: FileText,
      items: [
        "GSTR-1 Template",
        "GSTR-3B Template", 
        "GSTR-9 Template",
        "Invoice Templates",
        "Challan Templates"
      ]
    },
    {
      title: "Compliance Guides",
      description: "Step-by-step guides for GST compliance",
      icon: BookOpen,
      items: [
        "GST Registration Guide",
        "Return Filing Process",
        "Input Tax Credit Rules",
        "E-way Bill Process",
        "Annual Return Guide"
      ]
    },
    {
      title: "Rate Charts & Tables",
      description: "Updated GST rates and classification tables",
      icon: Search,
      items: [
        "HSN Code Directory",
        "GST Rate Schedule",
        "Service Classification",
        "Exemption Lists",
        "Reverse Charge Lists"
      ]
    },
    {
      title: "Video Tutorials",
      description: "Visual guides and tutorials",
      icon: Video,
      items: [
        "Filing GSTR-1 Tutorial",
        "Reconciliation Process",
        "Error Correction Guide",
        "Payment Process",
        "Refund Procedures"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              GST Documentation Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive documentation, templates, and guides for all your GST needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Documentation Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {documentCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-sm font-medium">{item}</span>
                        <Button size="sm" variant="ghost" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Links */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Access Links</CardTitle>
              <CardDescription>
                Frequently accessed documentation and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <span className="font-medium">Latest Notifications</span>
                  <span className="text-xs text-muted-foreground">Government updates</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="font-medium">FAQ Section</span>
                  <span className="text-xs text-muted-foreground">Common questions</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Video className="h-8 w-8 text-primary" />
                  <span className="font-medium">Video Library</span>
                  <span className="text-xs text-muted-foreground">Tutorial collection</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder Notice */}
          <div className="mt-12 text-center p-8 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
            <h3 className="text-lg font-semibold mb-2">Template Integration Area</h3>
            <p className="text-muted-foreground">
              This section is ready for your custom documentation templates and files.
              You can easily upload and organize your documents here.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}