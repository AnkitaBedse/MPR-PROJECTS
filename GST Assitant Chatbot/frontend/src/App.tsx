import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Chatbot from "./pages/Chatbot";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Schemes from "./pages/Schemes";
import Info from "./pages/Info";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import UploadDocuments from "./pages/dashboard/UploadDocuments";
import FilingStatus from "./pages/dashboard/FilingStatus";
import DashboardChatbot from "./pages/dashboard/Chatbot";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Public Pages */}
          <Route path="/features" element={<Features />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/info" element={<Info />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schemes" element={<Schemes />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<UploadDocuments />} />
          <Route path="/dashboard/status" element={<FilingStatus />} />
          <Route path="/dashboard/chat" element={<DashboardChatbot />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
