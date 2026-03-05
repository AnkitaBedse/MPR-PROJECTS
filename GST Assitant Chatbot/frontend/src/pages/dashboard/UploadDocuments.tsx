import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "processing" | "completed" | "error";
};

export default function UploadDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "sales_invoice_october.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-11-15",
      status: "completed"
    },
    {
      id: "2", 
      name: "purchase_register.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadDate: "2024-11-14",
      status: "processing"
    }
  ]);

  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes("pdf") ? "PDF" : "Excel",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "processing"
      };

      setDocuments(prev => [newDoc, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? { ...doc, status: "completed" as const }
              : doc
          )
        );
        
        toast({
          title: "Upload completed!",
          description: `${file.name} has been processed successfully.`,
        });
      }, 3000);
    });

    toast({
      title: "Upload started",
      description: `${files.length} file(s) are being processed.`,
    });

    // Reset input
    event.target.value = "";
  }, [toast]);

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from your uploads.",
    });
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-warning animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "processing":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Processing</Badge>;
      case "error":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Documents</h1>
              <p className="text-muted-foreground">
                Upload your invoices, purchase registers, and other GST documents for processing.
              </p>
            </div>

            {/* Upload Area */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload New Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Supports PDF and Excel files up to 10MB each
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p><strong>Supported formats:</strong> PDF, Excel (.xlsx, .xls)</p>
                  <p><strong>Max file size:</strong> 10MB per file</p>
                  <p><strong>Recommended documents:</strong> Sales invoices, Purchase registers, Credit/Debit notes</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents ({documents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No documents uploaded</h3>
                    <p className="text-muted-foreground">Upload your first document to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{doc.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{doc.type}</span>
                              <span>{doc.size}</span>
                              <span>Uploaded {doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(doc.status)}
                            {getStatusBadge(doc.status)}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {doc.status === "completed" && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(doc.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Document Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Required Documents</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        Sales invoices for the period
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        Purchase registers with GSTIN
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        Credit/Debit note details
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        Bank statements (if applicable)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Processing Information</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Documents are processed using AI for accuracy</li>
                      <li>• Processing typically takes 2-5 minutes per file</li>
                      <li>• All data is encrypted and securely stored</li>
                      <li>• Automatic validation against GST rules</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}