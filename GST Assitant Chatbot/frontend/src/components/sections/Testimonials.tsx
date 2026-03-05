import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    company: "Sharma Textiles",
    content: "GSTFile has made my monthly GST filings so much easier. The automated calculations save me hours every month, and I never worry about missing deadlines anymore.",
    rating: 5,
    avatar: "PS"
  },
  {
    name: "Rajesh Kumar",
    role: "CA Firm Partner", 
    company: "Kumar & Associates",
    content: "We've been using GSTFile for our clients and the accuracy is impressive. The error detection feature has helped us avoid costly mistakes. Highly recommended!",
    rating: 5,
    avatar: "RK"
  },
  {
    name: "Meera Patel",
    role: "Finance Manager",
    company: "TechStart Solutions",
    content: "The AI chatbot is incredibly helpful for GST queries. It's like having a tax expert available 24/7. The platform is intuitive and saves us significant time.",
    rating: 5,
    avatar: "MP"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied businesses who trust GSTFile for their compliance needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="text-primary/20">
                    <Quote className="h-8 w-8" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🔒</div>
            <div>
              <div className="font-semibold text-foreground">ISO 27001 Certified</div>
              <div className="text-sm text-muted-foreground">Enterprise Security Standards</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🏆</div>
            <div>
              <div className="font-semibold text-foreground">Best GST Software 2024</div>
              <div className="text-sm text-muted-foreground">Industry Recognition</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">✅</div>
            <div>
              <div className="font-semibold text-foreground">Government Approved</div>
              <div className="text-sm text-muted-foreground">Official Certification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}