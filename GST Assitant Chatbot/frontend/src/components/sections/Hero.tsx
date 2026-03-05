import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Clock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-gst.jpg";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Trusted by 10,000+ businesses
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Simplify Your{" "}
                <span className="text-primary">GST Filing</span>{" "}
                Process
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                File your GST returns with confidence. Our automated platform makes compliance easy, 
                fast, and error-free. Get started in minutes.
              </p>
            </div>

            {/* Features highlights */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Auto Calculations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Filing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/features")}
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5⭐</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="GST Filing Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-success text-success-foreground rounded-xl p-4 shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg">
              <Zap className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}