import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Columns, Layout, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { RESUME_TEMPLATES, ResumeTemplate } from '@/types/templates';
import { getTemplateThumbnail } from '@/data/templateThumbnails';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from 'sonner';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';

// Category filter tabs
const categories = [
  { id: 'all', name: 'All Templates' },
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'sidebar', name: 'Sidebar' },
];

interface TemplateCardProps {
  template: ResumeTemplate;
  index: number;
  onClick: (template: ResumeTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, index, onClick }) => {
  const thumbnail = getTemplateThumbnail(template.id);
  
  // Get layout icon based on template layout
  const getLayoutIcon = () => {
    return template.settings.layout === 'two-column' ? <Columns className="w-3 h-3" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="group cursor-pointer"
      onClick={() => onClick(template)}
    >
      <div className="relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Template Preview */}
        <div className="aspect-[8.5/11] relative overflow-hidden bg-muted">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={`${template.name} template preview`}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            /* Fallback mini resume mockup */
            <div className="absolute inset-3 bg-white shadow-sm border border-border/50 rounded">
              {template.hasSidebar ? (
                /* Two-column mockup */
                <div className="flex h-full">
                  <div 
                    className="w-1/3 h-full" 
                    style={{ backgroundColor: template.previewColor }}
                  >
                    <div className="p-2 space-y-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mt-2" />
                      <div className="h-1.5 bg-white/30 rounded w-3/4 mx-auto" />
                      <div className="h-1 bg-white/20 rounded w-1/2 mx-auto" />
                    </div>
                  </div>
                  <div className="flex-1 p-2 space-y-2">
                    <div className="h-2 bg-gray-300 rounded w-1/2" />
                    <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                    <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                    <div className="pt-2 space-y-1">
                      <div 
                        className="h-1.5 rounded w-1/4" 
                        style={{ backgroundColor: template.previewColor }}
                      />
                      <div className="h-1 bg-gray-100 rounded w-full" />
                      <div className="h-1 bg-gray-100 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ) : (
                /* Single-column mockup */
                <>
                  <div 
                    className="h-10 sm:h-12" 
                    style={{ backgroundColor: template.previewColor }}
                  />
                  <div className="p-2 sm:p-3 space-y-2">
                    <div className="h-2 bg-gray-300 rounded w-1/2" />
                    <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                    <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                    
                    <div className="pt-2 space-y-1">
                      <div 
                        className="h-1.5 rounded w-1/4" 
                        style={{ backgroundColor: template.previewColor }}
                      />
                      <div className="h-1 bg-gray-100 rounded w-full" />
                      <div className="h-1 bg-gray-100 rounded w-5/6" />
                      <div className="h-1 bg-gray-100 rounded w-4/5" />
                    </div>
                    
                    <div className="pt-2 space-y-1">
                      <div 
                        className="h-1.5 rounded w-1/3" 
                        style={{ backgroundColor: template.previewColor }}
                      />
                      <div className="h-1 bg-gray-100 rounded w-full" />
                      <div className="h-1 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
              View Details
            </span>
          </div>
        </div>

        {/* Template Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{template.name}</h3>
            <span 
              className="w-4 h-4 rounded-full border-2 border-background shadow-sm"
              style={{ backgroundColor: template.previewColor }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground capitalize">{template.category}</span>
              {getLayoutIcon() && (
                <span className="text-muted-foreground">{getLayoutIcon()}</span>
              )}
            </div>
          </div>
          {/* Feature tags removed per request (displayed in preview modal only) */}
        </div>
      </div>
    </motion.div>
  );
};

const Templates: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [selectedTemplate, setSelectedTemplate] = React.useState<ResumeTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { currentResume, createResume, applyTemplate } = useResume();
  const navigate = useNavigate();

  const filteredTemplates = activeCategory === 'all' 
    ? RESUME_TEMPLATES 
    : RESUME_TEMPLATES.filter(t => t.category === activeCategory);

  const handleTemplateClick = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the template to allow exit animation
    setTimeout(() => setSelectedTemplate(null), 200);
  };

  const handleApplyTemplate = (template: ResumeTemplate) => {
    let resumeId = currentResume?.id;

    // If no resume exists, create one first and track its id
    if (!resumeId) {
      const newResume = createResume('My Resume');
      resumeId = newResume.id;
    }

    // Apply the template settings to the targeted resume
    applyTemplate(template, resumeId);
    
    // Show success message
    toast.success(`Applied "${template.name}" template`, {
      description: 'Your customizations have been updated. You can still modify them in the builder.',
    });
    
    // Close modal and navigate to builder
    setIsModalOpen(false);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 sm:py-20 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose from {RESUME_TEMPLATES.length} ATS-friendly, professionally designed templates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                All Templates Free
              </div>
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                ATS Optimized
              </div>
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                <Palette className="w-4 h-4" />
                Fully Customizable
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
          >
            {filteredTemplates.map((template, index) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                index={index}
                onClick={handleTemplateClick}
              />
            ))}
          </motion.div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No templates found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Create Your Resume?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Pick any template and start customizing. It only takes a few minutes.
          </p>
          <Link to="/builder">
            <Button 
              size="xl" 
              className="bg-background text-primary hover:bg-background/90 text-lg px-10"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="uppercase">RESUMESY</span>. All rights reserved.
        </div>
      </footer>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplyTemplate}
      />
    </div>
  );
};

export default Templates;
