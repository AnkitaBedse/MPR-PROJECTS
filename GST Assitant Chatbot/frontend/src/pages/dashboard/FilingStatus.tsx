import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { 
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText
} from "lucide-react";

type Filing = {
  id: string;
  period: string;
  dueDate: string;
  submittedDate?: string;
  status: "pending" | "submitted" | "approved" | "rejected";
  amount: string;
  type: "GSTR-1" | "GSTR-3B" | "GSTR-9";
};

export default function FilingStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [filings] = useState<Filing[]>([
    {
      id: "GST2024001",
      period: "October 2024",
      dueDate: "2024-11-20",
      submittedDate: "2024-11-18",
      status: "approved",
      amount: "₹45,200",
      type: "GSTR-3B"
    },
    {
      id: "GST2024002",
      period: "September 2024",
      dueDate: "2024-10-20",
      submittedDate: "2024-10-19",
      status: "approved",
      amount: "₹52,800",
      type: "GSTR-3B"
    },
    {
      id: "GST2024003",
      period: "August 2024",
      dueDate: "2024-09-20",
      submittedDate: "2024-09-18",
      status: "approved",
      amount: "₹38,900",
      type: "GSTR-3B"
    },
    {
      id: "GST2024004",
      period: "November 2024",
      dueDate: "2024-12-20",
      status: "pending",
      amount: "₹48,500",
      type: "GSTR-3B"
    },
    {
      id: "GST2024005",
      period: "October 2024",
      dueDate: "2024-12-11",
      submittedDate: "2024-12-10",
      status: "submitted",
      amount: "₹156,700",
      type: "GSTR-1"
    }
  ]);

  const getStatusIcon = (status: Filing["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "submitted":
        return <Clock className="h-4 w-4 text-primary" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Filing["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "submitted":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Submitted</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
    }
  };

  const getTypeColor = (type: Filing["type"]) => {
    switch (type) {
      case "GSTR-1":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "GSTR-3B":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "GSTR-9":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    }
  };

  const filteredFilings = filings.filter(filing => {
    const matchesSearch = filing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         filing.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || filing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filings.length,
    approved: filings.filter(f => f.status === "approved").length,
    pending: filings.filter(f => f.status === "pending").length,
    submitted: filings.filter(f => f.status === "submitted").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Filing Status</h1>
              <p className="text-muted-foreground">
                Track all your GST return filings and their current status.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Filings</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{stats.approved}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Submitted</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.submitted}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by Filing ID or Period..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Filings Table */}
            <Card>
              <CardHeader>
                <CardTitle>Filing History ({filteredFilings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredFilings.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No filings found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFilings.map((filing) => (
                      <div key={filing.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-foreground">{filing.id}</h3>
                              <Badge className={getTypeColor(filing.type)}>{filing.type}</Badge>
                              {getStatusBadge(filing.status)}
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Period</p>
                                <p className="font-medium text-foreground">{filing.period}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Due Date</p>
                                <p className="font-medium text-foreground">
                                  <Calendar className="inline h-4 w-4 mr-1" />
                                  {filing.dueDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p className="font-medium text-foreground">{filing.amount}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  {filing.submittedDate ? "Submitted" : "Status"}
                                </p>
                                <p className="font-medium text-foreground">
                                  {filing.submittedDate || "Not submitted"}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            {filing.status === "approved" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}