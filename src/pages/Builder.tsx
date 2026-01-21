import React, { useRef, useCallback, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '@/contexts/ResumeContext';
import { Header } from '@/components/layout/Header';
import { CollapsibleResumeSidebar } from '@/components/sidebar/CollapsibleResumeSidebar';
import { ContentEditor } from '@/components/editor/ContentEditor';
import { CustomizePanel } from '@/components/editor/CustomizePanel';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FileText, Palette, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResumeBuilderContent: React.FC = () => {
  const { currentResume } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'customize'>('content');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Preview is always at 100% zoom - locked
  const previewScale = 1;

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: currentResume?.name || 'Resume',
  });

  const handleExportPdf = useCallback(() => {
    // Preview is always at 100%, so just print directly
    handlePrint();
  }, [handlePrint]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onExportPdf={handleExportPdf} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible Sidebar */}
        <CollapsibleResumeSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel with Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-background"
          >
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as 'content' | 'customize')}
              className="flex flex-col h-full"
            >
              {/* Tab Headers */}
              <div className="border-b border-border px-4 pt-4">
                <div className="flex items-center gap-2">
                  <TabsList className="grid w-full max-w-[300px] grid-cols-2">
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="customize" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Customize
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* mobile download removed to avoid duplicate 'Download as PDF' option */}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
                <TabsContent value="content" className="mt-0 h-full">
                  {currentResume && <ContentEditor />}
                </TabsContent>

                <TabsContent value="customize" className="mt-0 h-full">
                  {currentResume && <CustomizePanel />}
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>

          {/* Preview Panel - Hidden on mobile, shown on larger screens */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex w-1/2 bg-muted/30 border-l border-border overflow-y-auto custom-scrollbar p-6 pb-8 flex-col"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Live Preview</h2>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
            
            {currentResume && (
              <ResumePreview
                ref={resumeRef}
                resume={currentResume}
                scale={previewScale}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Preview Toggle Button */}
      <div className="lg:hidden fixed bottom-20 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowMobilePreview(true)}
          className="rounded-full shadow-lg w-14 h-14"
        >
          <FileText className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <div className="h-full flex flex-col">
            <div className="h-14 border-b border-border flex items-center justify-between px-4">
              <h2 className="font-medium">Preview</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs w-12 text-center">100%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobilePreview(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 pb-24 bg-muted/30">
              {currentResume && (
                <ResumePreview
                  ref={resumeRef}
                  resume={currentResume}
                  scale={previewScale}
                />
              )}
            </div>
            
            {/* Floating Download Button - Fixed at bottom of preview */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4">
              <Button
                size="lg"
                onClick={handleExportPdf}
                className="shadow-lg px-8 gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* spacer above footer to ensure gap after preview/content */}
      <div className="h-4 lg:h-6" />

      {/* Footer */}
      <footer className="border-t border-border py-3 px-4 bg-background">
        <p className="text-xs text-muted-foreground text-center">
        © 2026 <span className="uppercase">RESUMESY</span>. All rights reserved.
      </p>
      </footer>

    </div>
  );
};

const Builder: React.FC = () => {
  return <ResumeBuilderContent />;
};

export default Builder;
