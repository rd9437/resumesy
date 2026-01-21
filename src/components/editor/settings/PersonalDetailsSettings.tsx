import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { 
  PersonalDetailsSettings, 
  PersonalDetailsAlign, 
  PersonalDetailsArrangement, 
  IconFrameStyle,
  NameSize,
  TitlePosition,
  TitleStyle,
  HeadingSize,
  PhotoShape
} from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AlignLeft, AlignCenter, AlignRight, Circle, Square, RectangleHorizontal } from 'lucide-react';

export const PersonalDetailsSettingsPanel: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const personalDetails = settings.personalDetails;

  const updatePersonalDetails = (updates: Partial<PersonalDetailsSettings>) => {
    updateResume({
      settings: {
        ...settings,
        personalDetails: { ...personalDetails, ...updates }
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Alignment */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Header Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: 'left', icon: <AlignLeft className="w-4 h-4" /> },
            { value: 'center', icon: <AlignCenter className="w-4 h-4" /> },
            { value: 'right', icon: <AlignRight className="w-4 h-4" /> },
          ] as { value: PersonalDetailsAlign; icon: React.ReactNode }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updatePersonalDetails({ align: option.value })}
              className={`
                py-2 px-3 rounded-lg border-2 flex items-center justify-center gap-2 text-sm font-medium transition-all capitalize
                ${personalDetails.align === option.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
            >
              {option.icon}
              {option.value}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Arrangement */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Contact Info Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([
            { value: 'icon', label: '📧 Icon' },
            { value: 'bullet', label: '• Bullet' },
            { value: 'bar', label: '| Bar' },
            { value: 'comma', label: ', Comma' },
          ] as { value: PersonalDetailsArrangement; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updatePersonalDetails({ arrangement: option.value })}
              className={`
                py-2 px-2 rounded-lg border-2 text-xs font-medium transition-all
                ${personalDetails.arrangement === option.value 
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

      {/* Icon Frame Style (only show if arrangement is 'icon') */}
      {personalDetails.arrangement === 'icon' && (
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Icon Frame</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {([
              { value: 'none', label: 'None' },
              { value: 'circle-filled', label: '●' },
              { value: 'circle-outline', label: '○' },
              { value: 'square-filled', label: '■' },
            ] as { value: IconFrameStyle; label: string }[]).map((option) => (
              <button
                key={option.value}
                onClick={() => updatePersonalDetails({ iconFrameStyle: option.value })}
                className={`
                  py-2 px-2 rounded-lg border-2 text-sm font-medium transition-all
                  ${personalDetails.iconFrameStyle === option.value 
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
      )}

      {/* Name Size */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Name Size</label>
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {(['xs', 's', 'm', 'l', 'xl'] as NameSize[]).map((size) => (
            <button
              key={size}
              onClick={() => updatePersonalDetails({ nameSize: size })}
              className={`
                py-2 px-1 sm:px-2 rounded-lg border-2 text-xs font-medium transition-all uppercase
                ${personalDetails.nameSize === size 
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

      {/* Name Bold */}
      <div className="flex items-center justify-between py-2">
        <Label htmlFor="name-bold" className="text-sm font-medium text-foreground cursor-pointer">
          Bold Name
        </Label>
        <Switch
          id="name-bold"
          checked={personalDetails.nameBold}
          onCheckedChange={(checked) => updatePersonalDetails({ nameBold: checked })}
        />
      </div>

      {/* Title Size */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Job Title Size</label>
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {(['s', 'm', 'l', 'xl'] as HeadingSize[]).map((size) => (
            <button
              key={size}
              onClick={() => updatePersonalDetails({ titleSize: size })}
              className={`
                py-2 px-1 sm:px-2 rounded-lg border-2 text-xs font-medium transition-all uppercase
                ${personalDetails.titleSize === size 
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

      {/* Title Style */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Job Title Style</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: 'normal', label: 'Normal' },
            { value: 'italic', label: 'Italic' },
            { value: 'bold', label: 'Bold' },
          ] as { value: TitleStyle; label: string }[]).map((option) => (
            <button
              key={option.value}
              onClick={() => updatePersonalDetails({ titleStyle: option.value })}
              className={`
                py-2 px-3 rounded-lg border-2 text-sm transition-all
                ${personalDetails.titleStyle === option.value 
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

      {/* Photo Settings */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="show-photo" className="text-sm font-medium text-foreground cursor-pointer">
            Show Photo
          </Label>
          <Switch
            id="show-photo"
            checked={personalDetails.showPhoto}
            onCheckedChange={(checked) => updatePersonalDetails({ showPhoto: checked })}
          />
        </div>

        {personalDetails.showPhoto && (
          <div className="space-y-4 pl-0">
            {/* Photo Shape */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Photo Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'circle', icon: <Circle className="w-5 h-5" /> },
                  { value: 'rounded', icon: <RectangleHorizontal className="w-5 h-5 rounded" /> },
                  { value: 'square', icon: <Square className="w-5 h-5" /> },
                ] as { value: PhotoShape; icon: React.ReactNode }[]).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updatePersonalDetails({ photoShape: option.value })}
                    className={`
                      py-2 px-3 rounded-lg border-2 flex items-center justify-center gap-2 text-sm font-medium transition-all capitalize
                      ${personalDetails.photoShape === option.value 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                      }
                    `}
                  >
                    {option.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">Photo Size</label>
                <span className="text-sm font-mono text-primary">{personalDetails.photoSize}px</span>
              </div>
              <Slider
                value={[personalDetails.photoSize]}
                onValueChange={([value]) => updatePersonalDetails({ photoSize: value })}
                min={60}
                max={150}
                step={5}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
