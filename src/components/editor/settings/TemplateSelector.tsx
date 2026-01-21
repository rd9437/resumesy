import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { RESUME_TEMPLATES, applyTemplateSettings, ResumeTemplate } from '@/types/templates';
import { Check, Layout, Sidebar, Sparkles, Minus, Image } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const categoryLabels: Record<ResumeTemplate['category'], string> = {
  classic: 'Classic',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
  sidebar: 'Sidebar',
};

const categoryIcons: Record<ResumeTemplate['category'], React.ReactNode> = {
  classic: <Layout className="w-3 h-3" />,
  modern: <Sparkles className="w-3 h-3" />,
  creative: <Sparkles className="w-3 h-3" />,
  minimal: <Minus className="w-3 h-3" />,
  sidebar: <Sidebar className="w-3 h-3" />,
};

export const TemplateSelector: React.FC = () => {
  const { currentResume, updateResume } = useResume();
  const [selectedCategory, setSelectedCategory] = useState<ResumeTemplate['category'] | 'all'>('all');

  if (!currentResume) return null;

  const currentTemplate = currentResume.settings.template;

  const handleSelectTemplate = (template: ResumeTemplate) => {
    const newSettings = applyTemplateSettings(currentResume.settings, template);
    updateResume({ settings: newSettings });
  };

  const categories: (ResumeTemplate['category'] | 'all')[] = ['all', 'classic', 'modern', 'creative', 'minimal', 'sidebar'];

  const filteredTemplates = selectedCategory === 'all'
    ? RESUME_TEMPLATES
    : RESUME_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat !== 'all' && categoryIcons[cat]}
              {cat === 'all' ? 'All Templates' : categoryLabels[cat]}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Template Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`relative group rounded-lg border-2 overflow-hidden transition-all ${
              currentTemplate === template.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Template Preview */}
            <div
              className="aspect-[3/4] relative"
              style={{ backgroundColor: '#f8fafc' }}
            >
              {/* Mini Resume Preview */}
              <div className="absolute inset-2 rounded bg-white shadow-sm flex overflow-hidden">
                {template.hasSidebar && (
                  <div
                    className="w-1/3 flex flex-col items-center pt-3 gap-1"
                    style={{ backgroundColor: template.previewColor }}
                  >
                    {template.hasPhoto && (
                      <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                        <Image className="w-3 h-3 text-white/70" />
                      </div>
                    )}
                    <div className="w-4/5 space-y-0.5 mt-1">
                      <div className="h-0.5 bg-white/40 rounded w-full" />
                      <div className="h-0.5 bg-white/30 rounded w-3/4" />
                      <div className="h-0.5 bg-white/30 rounded w-2/3" />
                    </div>
                  </div>
                )}
                <div className={`flex-1 p-2 ${template.hasSidebar ? '' : ''}`}>
                  {/* Header */}
                  <div className={`mb-1.5 ${!template.hasSidebar && template.hasPhoto ? 'flex items-start gap-2' : ''}`}>
                    {!template.hasSidebar && template.hasPhoto && (
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div
                        className="h-1.5 rounded w-3/4 mb-0.5"
                        style={{ backgroundColor: template.previewColor }}
                      />
                      <div className="h-1 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  
                  {/* Content Lines */}
                  <div className="space-y-1.5 mt-2">
                    <div
                      className="h-0.5 rounded w-1/2"
                      style={{ backgroundColor: template.previewColor }}
                    />
                    <div className="space-y-0.5">
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                      <div className="h-0.5 bg-gray-200 rounded w-5/6" />
                      <div className="h-0.5 bg-gray-200 rounded w-4/6" />
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div
                      className="h-0.5 rounded w-1/3"
                      style={{ backgroundColor: template.previewColor }}
                    />
                    <div className="space-y-0.5">
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                      <div className="h-0.5 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Check */}
              {currentTemplate === template.id && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>

            {/* Template Name */}
            <div className="p-2 bg-background border-t border-border">
              <p className="text-xs font-medium text-foreground truncate">{template.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {template.hasSidebar && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Sidebar className="w-2.5 h-2.5" /> Sidebar
                  </span>
                )}
                {template.hasPhoto && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Image className="w-2.5 h-2.5" /> Photo
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
