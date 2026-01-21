import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { Header } from '@/components/layout/Header';
import { ResumeSidebar } from '@/components/sidebar/ResumeSidebar';
import { ResumeEditor } from '@/components/editor/ResumeEditor';
import { SettingsPanel } from '@/components/editor/SettingsPanel';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { motion } from 'framer-motion';

const ResumeBuilderContent: React.FC = () => {
  const { currentResume, resumes, createResume } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);

  // Check if first time user
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('resumesy_onboarded');
    if (!hasSeenOnboarding && resumes.length === 0) {
      setShowOnboarding(true);
    }
  }, [resumes.length]);

  // Create first resume if none exist
  useEffect(() => {
    if (resumes.length === 0) {
      createResume('My First Resume');
    }
  }, [resumes.length, createResume]);

  // Responsive preview scaling
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 1200) {
        setPreviewScale(0.45);
      } else if (width < 1400) {
        setPreviewScale(0.55);
      } else {
        setPreviewScale(0.65);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: currentResume?.name || 'Resume',
  });

  const handleExportPdf = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('resumesy_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onExportPdf={handleExportPdf} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ResumeSidebar />

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 overflow-y-auto custom-scrollbar p-6 bg-background"
          >
            {currentResume && (
              <>
                <ResumeEditor />
                <div className="mt-4">
                  <SettingsPanel />
                </div>
              </>
            )}
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 bg-muted/30 border-l border-border overflow-y-auto custom-scrollbar p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Live Preview</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewScale(s => Math.max(0.3, s - 0.1))}
                  className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted"
                >
                  −
                </button>
                <span className="text-xs text-muted-foreground w-12 text-center">
                  {Math.round(previewScale * 100)}%
                </span>
                <button
                  onClick={() => setPreviewScale(s => Math.min(1, s + 0.1))}
                  className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted"
                >
                  +
                </button>
              </div>
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

      {/* Onboarding */}
      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default Index;
