
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SkinCancerDetection from "./pages/SkinCancerDetection";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequestService from "./pages/RequestService";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import HealthPlan from "./pages/HealthPlan";
import Accessibility from "./pages/Accessibility";
import AIChatbot from "./pages/AIChatbot";
import NavBar from "./components/NavBar";
import'./App.css'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/dashboard" element={<SkinCancerDetection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/request-service" element={<RequestService />} />
              <Route path="/home" element={<SkinCancerDetection />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/health-plan" element={<HealthPlan />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/ai-chatbot" element={<AIChatbot />} />
              <Route path="/" element={<Home />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
