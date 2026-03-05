import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Users, Building, Briefcase, Star } from "lucide-react";

export default function Schemes() {
  const schemes = [
    {
      title: "Composition Scheme",
      category: "Small Business",
      description: "Simplified tax compliance for small businesses with turnover up to ₹1.5 crore",
      benefits: [
        "Lower tax rates (1-6%)",
        "Quarterly return filing",
        "Simplified compliance",
        "No input tax credit"
      ],
      eligibility: "Turnover up to ₹1.5 crore",
      icon: <Building className="h-8 w-8" />,
      popular: true
    },
    {
      title: "GST Suvidha Provider (GSP)",
      category: "Service Provider",
      description: "Authorized intermediary to provide GST services to taxpayers",
      benefits: [
        "Technology services",
        "Return filing assistance",
        "Data processing",
        "Government approved"
      ],
      eligibility: "Technology companies with GSTN approval",
      icon: <Users className="h-8 w-8" />,
      popular: false
    },
    {
      title: "Input Service Distributor (ISD)",
      category: "Corporate",
      description: "Mechanism for distribution of input tax credit within corporate groups",
      benefits: [
        "Centralized services",
        "Credit distribution",
        "Cost optimization",
        "Simplified compliance"
      ],
      eligibility: "Corporate entities with multiple locations",
      icon: <Briefcase className="h-8 w-8" />,
      popular: false
    },
    {
      title: "E-commerce Operator",
      category: "Digital Business",
      description: "Special provisions for e-commerce platforms and marketplace operators",
      benefits: [
        "TCS collection",
        "Simplified returns",
        "Digital compliance",
        "Automated processes"
      ],
      eligibility: "E-commerce platforms facilitating supplies",
      icon: <FileText className="h-8 w-8" />,
      popular: true
    },
    {
      title: "Casual Taxable Person",
      category: "Temporary Business",
      description: "Registration for persons undertaking transactions occasionally",
      benefits: [
        "Temporary registration",
        "Advance tax deposit",
        "Limited period validity",
        "Simplified process"
      ],
      eligibility: "Occasional business activities",
      icon: <Users className="h-8 w-8" />,
      popular: false
    },
    {
      title: "Non-Resident Taxable Person",
      category: "International",
      description: "Special registration for non-resident persons making taxable supplies",
      benefits: [
        "International compliance",
        "Advance tax deposit",
        "Simplified procedures",
        "Time-bound registration"
      ],
      eligibility: "Non-resident persons making supplies in India",
      icon: <Building className="h-8 w-8" />,
      popular: false
    }
  ];

  const incentives = [
    {
      title: "Startup India GST Benefits",
      description: "Special benefits for startups recognized under Startup India program",
      details: [
        "Self-certification for first 3 years",
        "Reduced compliance burden",
        "Fast-track clearances",
        "Expert guidance support"
      ]
    },
    {
      title: "MSE Incentives",
      description: "Benefits for Micro and Small Enterprises under GST",
      details: [
        "Threshold exemption up to ₹40 lakh",
        "Composition scheme benefits",
        "Simplified return filing",
        "Priority dispute resolution"
      ]
    },
    {
      title: "Export Promotion",
      description: "GST benefits for export-oriented businesses",
      details: [
        "Zero-rated supplies",
        "Refund of input tax credit",
        "LUT facility",
        "Simplified export procedures"
      ]
    },
    {
      title: "Special Economic Zone (SEZ)",
      description: "Special GST provisions for SEZ units and developers",
      details: [
        "Zero-rated supplies",
        "Input tax credit benefits",
        "Simplified procedures",
        "Reduced compliance burden"
      ]
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
              GST Schemes & Benefits
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore various GST schemes and government incentives designed to simplify 
              compliance and support business growth across different sectors.
            </p>
          </div>

          {/* GST Schemes */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Available GST Schemes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schemes.map((scheme, index) => (
                <Card 
                  key={index} 
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    scheme.popular ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {scheme.popular && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-primary">
                        {scheme.icon}
                      </div>
                      <Badge variant="secondary">{scheme.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{scheme.title}</CardTitle>
                    <p className="text-muted-foreground">{scheme.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {scheme.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Eligibility:</h4>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Government Incentives */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Government Incentives & Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {incentives.map((incentive, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{incentive.title}</CardTitle>
                    <p className="text-muted-foreground">{incentive.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {incentive.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Need Help Choosing the Right Scheme?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our GST experts can help you identify the most suitable scheme for your business 
                and assist with the application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Consult Our Experts
                </Button>
                <Button variant="outline" className="border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  Download Scheme Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}