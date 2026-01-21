import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Download, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingModalProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: Shield,
    title: 'Your privacy comes first',
    description: 'All your data stays on your device. We never upload or store your personal information on any server.',
    highlight: 'No account needed • No tracking • Works offline',
  },
  {
    icon: FileText,
    title: 'Build beautiful resumes',
    description: 'Create professional, ATS-friendly resumes with our intuitive editor. Drag and drop sections, customize fonts and colors.',
    highlight: 'Multiple templates • Real-time preview • Easy export',
  },
  {
    icon: Download,
    title: 'Export anywhere',
    description: 'Download your resume as a print-quality PDF, or save as JSON to backup and restore your data anytime.',
    highlight: 'PDF export • JSON backup • Multiple versions',
  },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/5 p-8 text-center">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {currentStepData.title}
            </h2>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-muted-foreground text-center mb-4">
                {currentStepData.description}
              </p>
              <p className="text-sm text-primary font-medium text-center">
                {currentStepData.highlight}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-6 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-primary w-6'
                    : 'bg-border hover:bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onComplete}
            >
              Skip
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
