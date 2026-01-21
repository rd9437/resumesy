import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { HeadingSettings as HeadingSettingsType, HeadingStyle, HeadingCapitalization, HeadingSize, HeadingIconStyle } from '@/types/resume';

const headingStyles: { value: HeadingStyle; preview: React.ReactNode }[] = [
  { 
    value: 'simple', 
    preview: (
      <div className="w-full h-8 flex items-center justify-center">
        <div className="w-12 h-1 bg-current rounded" />
      </div>
    )
  },
  { 
    value: 'boxed', 
    preview: (
      <div className="w-full h-8 flex items-center justify-center">
        <div className="w-14 h-5 border-2 border-current rounded flex items-center justify-center">
          <div className="w-8 h-0.5 bg-current" />
        </div>
      </div>
    )
  },
  { 
    value: 'line-above', 
    preview: (
      <div className="w-full h-8 flex flex-col items-center justify-center gap-1">
        <div className="w-full h-0.5 bg-muted-foreground/30" />
        <div className="w-10 h-1 bg-current rounded" />
      </div>
    )
  },
  { 
    value: 'line-below', 
    preview: (
      <div className="w-full h-8 flex flex-col items-center justify-center gap-1">
        <div className="w-10 h-1 bg-current rounded" />
        <div className="w-full h-0.5 bg-muted-foreground/30" />
      </div>
    )
  },
  { 
    value: 'accent-line', 
    preview: (
      <div className="w-full h-8 flex flex-col items-center justify-center gap-1">
        <div className="w-10 h-1 bg-current rounded" />
        <div className="w-full h-0.5 bg-primary" />
      </div>
    )
  },
  { 
    value: 'accent-bg', 
    preview: (
      <div className="w-full h-8 flex items-center justify-center">
        <div className="w-full h-5 bg-primary/20 flex items-center justify-center rounded">
          <div className="w-8 h-0.5 bg-current" />
        </div>
      </div>
    )
  },
  { 
    value: 'dotted', 
    preview: (
      <div className="w-full h-8 flex flex-col items-center justify-center gap-1">
        <div className="w-10 h-1 bg-current rounded" />
        <div className="w-full h-0.5 border-t-2 border-dotted border-muted-foreground/30" />
      </div>
    )
  },
  { 
    value: 'modern', 
    preview: (
      <div className="w-full h-8 flex items-center justify-start">
        <div className="w-1 h-5 bg-primary rounded mr-2" />
        <div className="w-10 h-1 bg-current rounded" />
      </div>
    )
  },
];

export const HeadingSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const headings = settings.headings;

  const updateHeadings = (updates: Partial<HeadingSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        headings: { ...headings, ...updates }
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Heading Style */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {headingStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => updateHeadings({ style: style.value })}
              className={`
                p-2 rounded-lg border-2 transition-all
                ${headings.style === style.value 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              {style.preview}
            </button>
          ))}
        </div>
      </div>

      {/* Capitalization */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Capitalization</label>
        <div className="grid grid-cols-2 gap-2">
          {(['capitalize', 'uppercase'] as HeadingCapitalization[]).map((cap) => (
            <button
              key={cap}
              onClick={() => updateHeadings({ capitalization: cap })}
              className={`
                py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all
                ${headings.capitalization === cap 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
              style={{ textTransform: cap === 'capitalize' ? 'capitalize' : 'uppercase' }}
            >
              {cap === 'capitalize' ? 'Capitalize' : 'UPPERCASE'}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {(['s', 'm', 'l', 'xl'] as HeadingSize[]).map((size) => (
            <button
              key={size}
              onClick={() => updateHeadings({ size })}
              className={`
                py-2 px-2 sm:px-3 rounded-lg border-2 text-sm font-medium transition-all uppercase
                ${headings.size === size 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Icon Style */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Section Icons</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: 'none', label: 'None' },
            { value: 'outline', label: 'Outline' },
            { value: 'filled', label: 'Filled' },
          ] as { value: HeadingIconStyle; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updateHeadings({ iconStyle: option.value })}
              className={`
                py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all
                ${headings.iconStyle === option.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
