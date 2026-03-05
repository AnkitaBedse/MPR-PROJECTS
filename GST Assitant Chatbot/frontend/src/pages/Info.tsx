import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Download, BookOpen, Video, FileText, Users } from "lucide-react";

export default function Info() {
  const videoTutorials = [
    {
      title: "GST Registration Process - Complete Guide",
      duration: "12:45",
      category: "Beginner",
      description: "Step-by-step guide to register for GST online, required documents, and common mistakes to avoid.",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
      views: "25.3K"
    },
    {
      title: "GSTR-1 Filing Made Simple",
      duration: "18:30",
      category: "Intermediate",
      description: "Complete walkthrough of GSTR-1 filing, invoice upload, and error resolution techniques.",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
      views: "31.2K"
    },
    {
      title: "Input Tax Credit Rules & Regulations",
      duration: "22:15",
      category: "Advanced",
      description: "Understanding ITC eligibility, conditions, and how to maximize your input tax credit claims.",
      thumbnail: "https://images.unsplash.com/photo-1580894908361-967195033215?w=400&h=225&fit=crop",
      views: "18.7K"
    },
    {
      title: "GST Returns Filing Timeline",
      duration: "15:20",
      category: "Beginner",
      description: "Important dates, deadlines, and penalties for different GST return forms.",
      thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop",
      views: "42.1K"
    },
    {
      title: "E-way Bill Generation & Management",
      duration: "14:50",
      category: "Intermediate",
      description: "How to generate, manage, and cancel e-way bills for goods transportation.",
      thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=225&fit=crop",
      views: "19.8K"
    },
    {
      title: "GST Audit & Assessment Procedures",
      duration: "25:40",
      category: "Advanced",
      description: "Understanding GST audit process, assessment orders, and how to respond to notices.",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop",
      views: "12.4K"
    }
  ];

  const downloadableGuides = [
    {
      title: "GST Compliance Checklist 2024",
      description: "Complete checklist for monthly, quarterly, and annual GST compliance requirements.",
      type: "PDF",
      size: "2.3 MB",
      downloads: "15.2K"
    },
    {
      title: "HSN Code Directory",
      description: "Comprehensive list of HSN codes with descriptions for easy product classification.",
      type: "Excel",
      size: "5.1 MB",
      downloads: "8.7K"
    },
    {
      title: "GST Rate Chart 2024",
      description: "Updated GST rates for all categories of goods and services.",
      type: "PDF",
      size: "1.8 MB",
      downloads: "22.5K"
    },
    {
      title: "Input Tax Credit Calculation Template",
      description: "Excel template to calculate and track your input tax credit efficiently.",
      type: "Excel",
      size: "1.2 MB",
      downloads: "11.3K"
    }
  ];

  const webinars = [
    {
      title: "GST Updates for FY 2024-25",
      date: "March 25, 2024",
      time: "3:00 PM - 4:30 PM IST",
      speaker: "CA Rajesh Kumar",
      status: "upcoming",
      attendees: "Registration Open"
    },
    {
      title: "Advanced GST Reconciliation Techniques",
      date: "March 18, 2024",
      time: "2:00 PM - 3:30 PM IST",
      speaker: "CA Priya Sharma",
      status: "completed",
      attendees: "847 attended"
    },
    {
      title: "E-commerce GST Compliance",
      date: "March 12, 2024",
      time: "4:00 PM - 5:00 PM IST",
      speaker: "CA Amit Patel",
      status: "completed",
      attendees: "632 attended"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              GST Learning Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master GST compliance with our comprehensive video tutorials, guides, and expert-led webinars. 
              From basics to advanced concepts, we've got you covered.
            </p>
          </div>

          {/* Video Tutorials */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Video Tutorials</h2>
              <Button variant="outline">
                <Video className="h-4 w-4 mr-2" />
                View All Videos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoTutorials.map((video, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(video.category)}>
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.views} views</span>
                      <Button variant="ghost" size="sm">
                        Watch Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Downloadable Guides */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Downloadable Guides</h2>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View All Resources
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloadableGuides.map((guide, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {guide.type}
                          </span>
                          <span>{guide.size}</span>
                          <span>{guide.downloads} downloads</span>
                        </div>
                      </div>
                      <Button size="sm" className="ml-4">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Webinars */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Expert Webinars</h2>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        variant={webinar.status === 'upcoming' ? 'default' : 'secondary'}
                        className={webinar.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {webinar.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{webinar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Date & Time:</p>
                      <p className="text-foreground">{webinar.date}</p>
                      <p className="text-foreground">{webinar.time}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Speaker:</p>
                      <p className="text-foreground">{webinar.speaker}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">
                        {webinar.status === 'upcoming' ? 'Registration:' : 'Attendance:'}
                      </p>
                      <p className="text-foreground">{webinar.attendees}</p>
                    </div>
                    <Button 
                      className="w-full" 
                      variant={webinar.status === 'upcoming' ? 'default' : 'outline'}
                    >
                      {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our GST experts are here to help you 
                with personalized guidance and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Talk to Expert
                </Button>
                <Button variant="outline" className="border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  Browse FAQ
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