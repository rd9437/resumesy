import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./contexts/ResumeContext";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import About from "./pages/About";
import Builder from "./pages/Builder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GlobalEmojicomCleanup() {
  const location = useLocation();
  useEffect(() => {
    // Remove emojicom widget on every route change
    document.querySelectorAll('script').forEach((el) => {
      const src = (el).src || '';
      if (src.includes('emojicom.io')) el.remove();
    });
    document.querySelectorAll('iframe').forEach((el) => {
      const src = (el).src || '';
      if (src.includes('emojicom.io') || (el).title?.toLowerCase().includes('emojicom')) el.remove();
    });
    document.querySelectorAll('[id*="emojicom"], [class*="emojicom"]').forEach(el => el.remove());
    document.querySelectorAll('[data-emojicom-injected], [data-widget*="emojicom"]').forEach(el => el.remove());
    try { delete (window as any).emojicom_widget; } catch (e) { (window as any).emojicom_widget = undefined; }
    try { delete (window as any).emojicom; } catch (e) { (window as any).emojicom = undefined; }
  }, [location]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ResumeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GlobalEmojicomCleanup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<About />} />
            <Route path="/builder" element={<Builder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
