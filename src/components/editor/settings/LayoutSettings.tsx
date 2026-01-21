import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { LayoutType } from '@/types/resume';
const layoutOptions: { value: LayoutType; label: string; icon: React.ReactNode }[] = [
  { 
    value: 'single', 
    label: 'Single', 
    icon: <div className="w-8 h-10 border-2 border-current rounded" />,
  },
  { 
    value: 'two-column', 
    label: 'Two Column', 
    icon: (
      <div className="w-8 h-10 border-2 border-current rounded flex">
        <div className="w-1/3 bg-current/20 border-r border-current" />
        <div className="w-2/3" />
      </div>
    ),
  },
];

const layoutDescriptions: Record<LayoutType, string> = {
  'single': 'Traditional single column layout',
  'two-column': 'Sidebar with main content',
};

export const LayoutSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;

  const updateLayout = (layout: LayoutType) => {
    updateResume({ 
      settings: { 
        ...settings, 
        layout 
      } 
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-foreground">Layout Style</h4>
      
      <div className="grid grid-cols-2 gap-2">
        {layoutOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateLayout(option.value)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
              ${settings.layout === option.value 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {option.icon}
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {layoutDescriptions[settings.layout]}
      </p>
    </div>
  );
};
