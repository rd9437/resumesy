import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeTemplate } from '@/types/templates';
import { getTemplateThumbnail } from '@/data/templateThumbnails';

interface TemplatePreviewModalProps {
  template: ResumeTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (template: ResumeTemplate) => void;
}

// Generate complementary colors based on the preview color
const generateColorPalette = (baseColor: string): string[] => {
  // Simple approach: return the base color plus some complementary shades
  const colors = [baseColor];
  
  // Convert hex to RGB
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Generate a complementary warm color (orange/yellow family)
  const warmColor = `#${Math.min(255, r + 80).toString(16).padStart(2, '0')}${Math.min(255, g + 40).toString(16).padStart(2, '0')}${Math.max(0, b - 60).toString(16).padStart(2, '0')}`;
  colors.push(warmColor);
  
  // Generate a coral/red accent
  const accentColor = `#${Math.min(255, r + 60).toString(16).padStart(2, '0')}${Math.max(0, g - 40).toString(16).padStart(2, '0')}${Math.max(0, b - 30).toString(16).padStart(2, '0')}`;
  colors.push(accentColor);
  
  return colors;
};

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onApply,
}) => {
  if (!template) return null;

  const thumbnail = getTemplateThumbnail(template.id);

  // Get layout label
  const getLayoutLabel = () => {
    return template.settings.layout === 'two-column' ? 'two-column' : 'single-column';
  };

  // Get font family from settings
  const getFontFamily = () => {
    return template.settings.font?.fontFamily || 'Default';
  };

  // Build features list (text only, as bullet points)
  const features = [
    'Bold sections',
    'Modern typography',
    'Color accents',
    'Fully customizable',
  ];

  const colorPalette = generateColorPalette(template.previewColor);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal container ensures perfect centering */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50
                         w-full max-w-5xl max-h-[calc(100vh-48px)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* (close button removed as per UI request) */}

              {/* Content wrapper - scrollable on mobile */}
              <div className="flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-h-0 flex-1">
                {/* Preview Image - Left side (image fills the left tab) */}
                <div className="w-full lg:w-1/2 bg-slate-800/50 p-4 sm:p-6 lg:p-8 flex items-stretch justify-center shrink-0">
                  <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-600/30 flex items-center justify-center">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={`${template.name} template preview`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      /* Fallback mockup */
                      <div className="w-full h-full relative bg-white">
                        {template.hasSidebar ? (
                          <div className="flex h-full">
                            <div 
                              className="w-1/3 h-full" 
                              style={{ backgroundColor: template.previewColor }}
                            >
                              <div className="p-3 space-y-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mx-auto mt-4" />
                                <div className="h-2 bg-white/30 rounded w-3/4 mx-auto" />
                                <div className="h-1.5 bg-white/20 rounded w-1/2 mx-auto" />
                              </div>
                            </div>
                            <div className="flex-1 p-3 sm:p-4 space-y-3">
                              <div className="h-3 bg-gray-200 rounded w-1/2" />
                              <div className="h-2 bg-gray-100 rounded w-3/4" />
                              <div className="h-2 bg-gray-100 rounded w-2/3" />
                              <div className="pt-3 space-y-2">
                                <div 
                                  className="h-2 rounded w-1/4" 
                                  style={{ backgroundColor: template.previewColor }}
                                />
                                <div className="h-1.5 bg-gray-100 rounded w-full" />
                                <div className="h-1.5 bg-gray-100 rounded w-5/6" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div 
                              className="h-12 sm:h-16" 
                              style={{ backgroundColor: template.previewColor }}
                            />
                            <div className="p-3 sm:p-4 space-y-3">
                              <div className="h-3 bg-gray-200 rounded w-1/2" />
                              <div className="h-2 bg-gray-100 rounded w-3/4" />
                              <div className="h-2 bg-gray-100 rounded w-2/3" />
                              <div className="pt-3 space-y-2">
                                <div 
                                  className="h-2 rounded w-1/4" 
                                  style={{ backgroundColor: template.previewColor }}
                                />
                                <div className="h-1.5 bg-gray-100 rounded w-full" />
                                <div className="h-1.5 bg-gray-100 rounded w-5/6" />
                              </div>
                              <div className="pt-3 space-y-2">
                                <div 
                                  className="h-2 rounded w-1/3" 
                                  style={{ backgroundColor: template.previewColor }}
                                />
                                <div className="h-1.5 bg-gray-100 rounded w-full" />
                                <div className="h-1.5 bg-gray-100 rounded w-3/4" />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details - Right side */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col min-h-0 overflow-y-auto lg:overflow-y-auto">
                  {/* Header */}
                  <div className="mb-4 sm:mb-6 pr-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {template.name}
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-4 sm:mb-6">
                    <p className="text-sm text-slate-500 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-xs sm:text-sm font-medium capitalize border border-slate-700">
                        {template.category}
                      </span>
                      <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-xs sm:text-sm font-medium border border-slate-700">
                        {getLayoutLabel()}
                      </span>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-4 sm:mb-6">
                    <p className="text-sm text-slate-500 mb-2">Colors:</p>
                    <div className="flex items-center gap-2">
                      {colorPalette.map((color, index) => (
                        <div 
                          key={index}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg ring-2 ring-slate-700"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <p className="text-sm text-slate-500 mb-2">Features:</p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {features.map((feature, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-2 text-sm sm:text-base text-white"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Font family */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                      <Type className="w-4 h-4" />
                      <span>Font family:</span>
                    </div>
                    <span 
                      className="text-white font-medium text-sm sm:text-base"
                      style={{ fontFamily: getFontFamily() }}
                    >
                      {getFontFamily()}
                    </span>
                  </div>

                  {/* Actions - sticky at bottom on mobile */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-700">
                    <Button
                      size="lg"
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 h-11 sm:h-12 text-sm sm:text-base"
                      onClick={() => onApply(template)}
                    >
                      Use Template
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 h-11 sm:h-12 text-sm sm:text-base"
                      onClick={onClose}
                    >
                      Show all templates
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplatePreviewModal;
