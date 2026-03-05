import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description: "To simplify GST compliance for businesses of all sizes through innovative technology and exceptional service."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description: "We prioritize our customers' success and continuously improve our platform based on their feedback and needs."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in security, accuracy, and reliability for all our GST filing services."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Innovation",
      description: "We leverage cutting-edge technology like AI and machine learning to make GST compliance effortless."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      description: "15+ years in tax consulting and fintech. Previously led digital transformation at major CA firms."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Expert in AI and machine learning with 12+ years in building scalable financial platforms."
    },
    {
      name: "Amit Patel",
      role: "Head of Compliance",
      description: "Chartered Accountant with deep expertise in GST regulations and government liaison."
    },
    {
      name: "Sneha Reddy",
      role: "Head of Customer Success",
      description: "Passionate about customer experience with 10+ years in support and success management."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About GSTFile
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to transform how businesses handle GST compliance in India. 
              Since 2020, we've helped over 50,000 businesses file their returns accurately and on time.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
              <div className="max-w-4xl mx-auto text-lg text-muted-foreground space-y-6">
                <p>
                  GSTFile was born out of frustration with the complex and time-consuming process of GST filing. 
                  Our founders, experienced chartered accountants and technology experts, witnessed countless 
                  businesses struggling with compliance, missing deadlines, and facing penalties.
                </p>
                <p>
                  We realized that technology could solve these problems. By combining deep tax expertise with 
                  cutting-edge AI and automation, we created a platform that makes GST filing as simple as 
                  sending an email. Today, we're proud to be India's fastest-growing GST compliance platform.
                </p>
                <p>
                  Our journey has just begun. We continue to innovate and expand our services to cover every 
                  aspect of business tax compliance, making it easier for entrepreneurs to focus on what they do best.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Businesses Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2M+</div>
                <div className="text-muted-foreground">Returns Filed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}