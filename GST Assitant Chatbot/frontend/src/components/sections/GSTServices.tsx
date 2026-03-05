import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";

interface ServicePanelProps {
  title: string;
  href: string;
  icon: string;
}

function ServicePanel({ title, href, icon }: ServicePanelProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 hover:bg-card border-border/50 hover:border-primary/20">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-semibold text-sm text-foreground mb-3 min-h-[2.5rem] flex items-center justify-center">
          {title}
        </h3>
        <div className="flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-muted-foreground hover:text-primary group-hover:text-primary"
            onClick={() => {
              // Placeholder - you can replace with actual navigation
              console.log(`Navigate to ${href}`);
              window.open(href, '_blank');
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function GSTServices() {
  const handleDirectCall = () => {
    // Placeholder for direct calling functionality
    window.open("tel:+1234567890", "_self");
  };

  const handleWhatsApp = () => {
    // Placeholder for WhatsApp integration
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete GST Services Suite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for GST compliance in one comprehensive platform
          </p>
        </div>

        {/* GST Services Interactive Grid */}
        <div className="mb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Row 1 */}
            <ServicePanel 
              title="GSTR Forms - 1, 3B, CMP-08, 9"
              href="/gstr-forms"
              icon="📋"
            />
            <ServicePanel 
              title="GSTR 9C Self-certification Form"
              href="/gstr-9c"
              icon="✅"
            />
            <ServicePanel 
              title="HSN Code"
              href="/hsn-code"
              icon="🏷️"
            />
            <ServicePanel 
              title="Reconciliation Facility"
              href="/reconciliation"
              icon="⚖️"
            />
            <ServicePanel 
              title="GST Return Filing Status"
              href="/filing-status"
              icon="📊"
            />
            
            {/* Row 2 */}
            <ServicePanel 
              title="Sales & Purchase Report"
              href="/sales-purchase-report"
              icon="📈"
            />
            <ServicePanel 
              title="Match Mismatch Reporting"
              href="/match-mismatch"
              icon="🔍"
            />
            <ServicePanel 
              title="Errors Identification Facility"
              href="/error-identification"
              icon="⚠️"
            />
            <ServicePanel 
              title="Import/ Export Facility"
              href="/import-export"
              icon="🌐"
            />
            <ServicePanel 
              title="Database Backup"
              href="/database-backup"
              icon="💾"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleDirectCall}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            <Phone className="h-5 w-5" />
            Direct Call Support
          </Button>
          
          <Button 
            onClick={handleWhatsApp}
            variant="outline"
            className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Chat
          </Button>
        </div>
      </div>
    </section>
  );
}