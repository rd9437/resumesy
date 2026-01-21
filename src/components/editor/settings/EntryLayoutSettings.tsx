import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { 
  EntryLayoutSettings as EntryLayoutSettingsType, 
  EntryTitleSize, 
  SubtitleStyle, 
  SubtitlePlacement, 
  ListStyle,
  ExperienceOrder,
  EducationOrder
} from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Visual preview components for subtitle placement
const SubtitlePlacementPreview: React.FC<{ placement: SubtitlePlacement; isActive: boolean }> = ({ placement, isActive }) => {
  const baseClass = "w-full h-12 flex flex-col items-start justify-center p-2";
  
  if (placement === 'same-line') {
    return (
      <div className={baseClass}>
        <div className="flex items-center gap-1 w-full">
          <div className={`h-2 w-12 rounded ${isActive ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
          <div className={`h-1.5 w-8 rounded ${isActive ? 'bg-primary/60' : 'bg-muted-foreground/25'}`} />
        </div>
        <div className="flex gap-0.5 mt-1.5">
          <div className="h-1 w-10 rounded bg-muted-foreground/20" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={baseClass}>
      <div className={`h-2 w-12 rounded ${isActive ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
      <div className={`h-1.5 w-8 rounded mt-1 ${isActive ? 'bg-primary/60' : 'bg-muted-foreground/25'}`} />
      <div className="flex gap-0.5 mt-1.5">
        <div className="h-1 w-10 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
};

// Visual preview for list styles
const ListStylePreview: React.FC<{ style: ListStyle; isActive: boolean }> = ({ style, isActive }) => {
  const bulletChar = style === 'bullet' ? '•' : style === 'hyphen' ? '—' : style === 'arrow' ? '→' : '';
  const itemClass = `text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`;
  
  return (
    <div className="flex flex-col gap-0.5 py-1">
      <div className={itemClass}>
        {bulletChar && <span className="mr-1">{bulletChar}</span>}
        <span className="text-muted-foreground/60">Item one</span>
      </div>
      <div className={itemClass}>
        {bulletChar && <span className="mr-1">{bulletChar}</span>}
        <span className="text-muted-foreground/60">Item two</span>
      </div>
    </div>
  );
};

export const EntryLayoutSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const entryLayout = settings.entryLayout;
  const experience = settings.experience;
  const education = settings.education;

  const updateEntryLayout = (updates: Partial<EntryLayoutSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        entryLayout: { ...entryLayout, ...updates }
      }
    });
  };

  const updateExperience = (titleOrder: ExperienceOrder) => {
    updateResume({
      settings: {
        ...settings,
        experience: { ...experience, titleOrder }
      }
    });
  };

  const updateEducation = (titleOrder: EducationOrder) => {
    updateResume({
      settings: {
        ...settings,
        education: { ...education, titleOrder }
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Title Size */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Title Size</label>
        <div className="grid grid-cols-3 gap-2">
          {(['s', 'm', 'l'] as EntryTitleSize[]).map((size) => (
            <button
              key={size}
              onClick={() => updateEntryLayout({ titleSize: size })}
              className={`
                py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all uppercase
                ${entryLayout.titleSize === size 
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

      {/* Subtitle Style */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Subtitle Style</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: 'normal', label: 'Normal' },
            { value: 'bold', label: 'Bold' },
            { value: 'italic', label: 'Italic' },
          ] as { value: SubtitleStyle; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updateEntryLayout({ subtitleStyle: option.value })}
              className={`
                py-2 px-3 rounded-lg border-2 text-sm transition-all
                ${entryLayout.subtitleStyle === option.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
              style={{ 
                fontWeight: option.value === 'bold' ? 'bold' : 'normal',
                fontStyle: option.value === 'italic' ? 'italic' : 'normal'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtitle Placement with Visual Previews */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Subtitle Placement</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: 'same-line', label: 'Same Line' },
            { value: 'next-line', label: 'Next Line' },
          ] as { value: SubtitlePlacement; label: string }[]).map((option) => {
            const isActive = entryLayout.subtitlePlacement === option.value;
            return (
              <button
                key={option.value}
                onClick={() => updateEntryLayout({ subtitlePlacement: option.value })}
                className={`
                  rounded-lg border-2 transition-all flex flex-col
                  ${isActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <SubtitlePlacementPreview placement={option.value} isActive={isActive} />
                <span className={`text-xs font-medium pb-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List Style with Visual Previews */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">List Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([
            { value: 'bullet', label: '• Bullet' },
            { value: 'hyphen', label: '— Hyphen' },
            { value: 'arrow', label: '→ Arrow' },
            { value: 'none', label: 'None' },
          ] as { value: ListStyle; label: string }[]).map((option) => {
            const isActive = entryLayout.listStyle === option.value;
            return (
              <button
                key={option.value}
                onClick={() => updateEntryLayout({ listStyle: option.value })}
                className={`
                  py-2 px-2 rounded-lg border-2 text-xs font-medium transition-all
                  ${isActive 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Indent Description */}
      <div className="flex items-center justify-between py-2">
        <Label htmlFor="indent-desc" className="text-sm font-medium text-foreground cursor-pointer">
          Indent Description
        </Label>
        <Switch
          id="indent-desc"
          checked={entryLayout.indentDescription}
          onCheckedChange={(checked) => updateEntryLayout({ indentDescription: checked })}
        />
      </div>

      {/* Divider */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Section-Specific</h4>
      </div>

      {/* Experience Order */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Work Experience Order</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: 'position-company', label: 'Position, Company' },
            { value: 'company-position', label: 'Company, Position' },
          ] as { value: ExperienceOrder; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updateExperience(option.value)}
              className={`
                py-2 px-2 rounded-lg border-2 text-xs font-medium transition-all
                ${experience.titleOrder === option.value 
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

      {/* Education Order */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Education Order</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: 'degree-school', label: 'Degree, School' },
            { value: 'school-degree', label: 'School, Degree' },
          ] as { value: EducationOrder; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updateEducation(option.value)}
              className={`
                py-2 px-2 rounded-lg border-2 text-xs font-medium transition-all
                ${education.titleOrder === option.value 
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
