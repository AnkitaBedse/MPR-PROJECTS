import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { 
  Bell, 
  FileText, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: "warning", message: "GST Return due on 20th November 2024", time: "2 hours ago" },
    { id: 2, type: "success", message: "October GST filing completed successfully", time: "1 day ago" },
    { id: 3, type: "info", message: "New GST rate changes effective from Dec 1st", time: "3 days ago" },
  ];

  const recentFilings = [
    { id: "GST001", date: "2024-10-20", status: "Completed", amount: "₹45,000" },
    { id: "GST002", date: "2024-09-20", status: "Completed", amount: "₹52,000" },
    { id: "GST003", date: "2024-08-20", status: "Completed", amount: "₹38,000" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <main className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your GST filings today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Filings</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tax Paid</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹5.2L</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Nov 20</div>
                  <p className="text-xs text-muted-foreground">
                    5 days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">100%</div>
                  <p className="text-xs text-muted-foreground">
                    All filings on time
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                        {notification.type === "warning" && (
                          <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                        )}
                        {notification.type === "success" && (
                          <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        )}
                        {notification.type === "info" && (
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Filings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Filings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentFilings.map((filing) => (
                        <div key={filing.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            <div>
                              <p className="font-medium text-foreground">{filing.id}</p>
                              <p className="text-sm text-muted-foreground">{filing.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{filing.amount}</p>
                            <Badge variant="outline" className="text-xs">
                              {filing.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full justify-start" 
                      onClick={() => navigate("/dashboard/upload")}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/dashboard/status")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Filing Status
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/dashboard/chat")}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ask AI Assistant
                    </Button>
                  </CardContent>
                </Card>

                {/* Help Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Our AI assistant is here to help with your GST queries 24/7.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate("/dashboard/chat")}
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}