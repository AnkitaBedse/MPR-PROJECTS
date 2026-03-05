import { Link } from "react-router-dom";
import { FileText, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">GSTFile</span>
            </Link>
            <p className="text-background/80 max-w-md leading-relaxed">
              Simplifying GST compliance for businesses across India. 
              Trusted by thousands of companies for accurate, secure, and timely GST filing.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80">+91 1800-GST-FILE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80">support@gstfile.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-background/80">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/features" className="block text-background/80 hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="block text-background/80 hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/about" className="block text-background/80 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-background/80 hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="block text-background/80 hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-3">
              <Link to="/privacy" className="block text-background/80 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-background/80 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/security" className="block text-background/80 hover:text-primary transition-colors">
                Security
              </Link>
              <Link to="/compliance" className="block text-background/80 hover:text-primary transition-colors">
                Compliance
              </Link>
              <Link to="/help" className="block text-background/80 hover:text-primary transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-background/20 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="text-background/60 text-sm">
            © 2024 GSTFile. All rights reserved. | Made with ❤️ for Indian businesses
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-background/80 hover:text-primary transition-colors text-sm">
              Login
            </Link>
            <Link to="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}