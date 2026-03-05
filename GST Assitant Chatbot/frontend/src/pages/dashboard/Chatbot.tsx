import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { 
  Send,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  FileText,
  Calculator,
  Clock
} from "lucide-react";

type Message = {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
};

const quickQuestions = [
  "What is the due date for GSTR-3B this month?",
  "How to calculate GST on reverse charge?",
  "What documents are required for GST registration?",
  "How to file NIL return in GSTR-3B?",
  "What is the penalty for late GST filing?",
  "How to claim ITC on business expenses?"
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your GST AI Assistant. I can help you with GST filing queries, tax calculations, compliance questions, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("due date") || input.includes("gstr-3b")) {
      return "For GSTR-3B, the due date is the 20th of the following month. For November 2024, the due date would be December 20th, 2024. Make sure to file before 11:30 PM to avoid late fees.";
    }
    
    if (input.includes("reverse charge")) {
      return "Reverse charge means the recipient of goods/services pays GST instead of the supplier. It applies in cases like: 1) Unregistered supplier to registered recipient, 2) Import of services, 3) Specific notified categories. The rate is usually the same as forward charge.";
    }
    
    if (input.includes("registration") || input.includes("documents")) {
      return "For GST registration, you need: 1) PAN card, 2) Aadhaar card, 3) Business registration certificate, 4) Bank account details, 5) Address proof of business premise, 6) Authorized signatory details, 7) Digital signature (if applicable).";
    }
    
    if (input.includes("nil return")) {
      return "To file NIL return in GSTR-3B: 1) Login to GST portal, 2) Go to Returns > GSTR-3B, 3) Select the relevant period, 4) All fields will show zero by default, 5) Verify details and submit, 6) Generate ARN for record keeping.";
    }
    
    if (input.includes("penalty") || input.includes("late filing")) {
      return "Late filing penalties for GST: 1) GSTR-1: ₹200 per day (₹100 for CGST + ₹100 for SGST), 2) GSTR-3B: ₹200 per day, 3) Maximum penalty is 0.25% of turnover in the state. File as soon as possible to minimize penalties.";
    }
    
    if (input.includes("itc") || input.includes("input tax credit")) {
      return "To claim ITC: 1) Ensure supplier has filed their returns, 2) Invoice should have your GSTIN, 3) Goods/services should be for business use, 4) Payment to supplier should be made within 180 days, 5) Add eligible ITC in GSTR-3B table 4A.";
    }

    return "I understand you're asking about GST matters. While I can help with general GST queries, for specific cases, I'd recommend consulting with a tax professional. You can also check the official GST portal at gst.gov.in for the most current information. Is there a specific GST topic I can help clarify?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <main className="p-6 max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">AI GST Assistant</h1>
              <p className="text-muted-foreground">
                Get instant answers to your GST questions with our intelligent chatbot.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="flex items-center">
                      <Bot className="mr-2 h-5 w-5 text-primary" />
                      GST Assistant
                      <Sparkles className="ml-2 h-4 w-4 text-yellow-500" />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${
                              message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.type === "user" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary text-foreground"
                            }`}>
                              {message.type === "user" ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                            <div className={`flex-1 max-w-[80%] ${
                              message.type === "user" ? "text-right" : ""
                            }`}>
                              <div className={`p-3 rounded-lg ${
                                message.type === "user"
                                  ? "bg-primary text-primary-foreground ml-auto"
                                  : "bg-secondary text-foreground"
                              }`}>
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div className="bg-secondary p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                    
                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="border-t border-border p-4">
                      <div className="flex space-x-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask me anything about GST..."
                          className="flex-1"
                          disabled={isTyping}
                        />
                        <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with quick questions and info */}
              <div className="space-y-6">
                {/* Quick Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Quick Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left h-auto whitespace-normal p-3 justify-start"
                        onClick={() => sendMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Assistant Capabilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>I can help with</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Filing Guidelines</p>
                        <p className="text-sm text-muted-foreground">GSTR forms and procedures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calculator className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Tax Calculations</p>
                        <p className="text-sm text-muted-foreground">GST rates and computations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Due Dates</p>
                        <p className="text-sm text-muted-foreground">Important deadlines</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Note */}
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong>Note:</strong> This AI assistant provides general GST guidance. 
                      For complex cases or official matters, please consult with a qualified 
                      tax professional or refer to the official GST portal.
                    </p>
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