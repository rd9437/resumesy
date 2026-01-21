import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { FooterSettings, LinkIconStyle } from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Link2, ExternalLink, Eye } from 'lucide-react';

const LINK_ICON_OPTIONS: { value: LinkIconStyle; label: string; icon: React.ReactNode }[] = [
  { value: 'none', label: 'None', icon: <span className="text-xs text-muted-foreground">—</span> },
  { value: 'external', label: 'Arrow', icon: <ExternalLink className="w-3.5 h-3.5" /> },
  { value: 'chain', label: 'Chain', icon: <Link2 className="w-3.5 h-3.5" /> },
];

export const AdvancedSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const footer = settings.footer;
  const linkIconStyle = settings.linkIconStyle || 'none';

  const updateFooter = (updates: Partial<FooterSettings>) => {
    updateResume({
      settings: {
        ...settings,
        footer: { ...footer, ...updates }
      }
    });
  };

  const updateLinkIconStyle = (style: LinkIconStyle) => {
    updateResume({
      settings: {
        ...settings,
        linkIconStyle: style
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Link Icon Style */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Link Icon</label>
        <div className="grid grid-cols-3 gap-2">
          {LINK_ICON_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateLinkIconStyle(option.value)}
              className={`
                py-2 px-3 rounded-lg border-2 flex flex-col items-center gap-1.5 transition-all
                ${linkIconStyle === option.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
            >
              {option.icon}
              <span className="text-[10px] font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date and Location Opacity */}
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="reduce-opacity" className="text-sm text-foreground cursor-pointer">
            Reduce dates/locations opacity
          </Label>
        </div>
        <Switch
          id="reduce-opacity"
          checked={footer.reduceDateOpacity}
          onCheckedChange={(checked) => updateFooter({ reduceDateOpacity: checked })}
        />
      </div>

      {/* Show Link Icon in Header */}
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="show-link-icon" className="text-sm text-foreground cursor-pointer">
            Show link icons in header
          </Label>
        </div>
        <Switch
          id="show-link-icon"
          checked={footer.showLinkIcon}
          onCheckedChange={(checked) => updateFooter({ showLinkIcon: checked })}
        />
      </div>
    </div>
  );
};
