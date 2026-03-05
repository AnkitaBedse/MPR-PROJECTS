
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Upload, FileText, Zap } from "lucide-react";
import React, { useState, useRef } from "react";
import axios from "axios";


export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const API_BASE = (import.meta as any).env?.VITE_API_BASE || "/api";

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${API_BASE}/chatbot/chat`,
        {
          prompt: input,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.response }]);
    } catch (err: any) {
      setError("Failed to get response from chatbot.");
    } finally {
      setLoading(false);
      setInput("");
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              GST AI Chatbot
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get instant answers to your GST queries with our intelligent AI assistant
            </p>
          </div>

          {/* Chatbot UI */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-muted-foreground/20 bg-muted/10">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Chat with GST AI</CardTitle>
                <CardDescription className="text-lg">
                  Type your GST question below and get instant answers!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto bg-background rounded-lg border border-border p-4 mb-4" style={{ maxHeight: 320 }}>
                  {messages.length === 0 && (
                    <div className="text-muted-foreground text-center mt-16">No messages yet. Start the conversation!</div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    className="flex-1 border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    placeholder="Type your GST question..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading || !input.trim()}>
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instant Responses</h3>
                <p className="text-sm text-muted-foreground">
                  Get immediate answers to GST questions 24/7
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Document Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Upload documents for instant GST compliance checking
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Form Assistance</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance for filling GST forms
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Smart Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered recommendations for GST optimization
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sample Queries */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Queries You Can Ask</CardTitle>
              <CardDescription>
                Try these common GST questions with our AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Filing & Returns</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "How do I file GSTR-1?"</li>
                    <li>• "What is the due date for GSTR-3B?"</li>
                    <li>• "How to correct errors in filed returns?"</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Compliance & Rates</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "What GST rate applies to my product?"</li>
                    <li>• "How to claim Input Tax Credit?"</li>
                    <li>• "GST registration process steps"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}