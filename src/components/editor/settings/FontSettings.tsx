import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { FontSettings as FontSettingsType, FontCategory, FONT_OPTIONS } from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

export const FontSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const font = settings.font;

  const updateFont = (updates: Partial<FontSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        font: { ...font, ...updates }
      }
    });
  };

  const handleCategoryChange = (category: FontCategory) => {
    const firstFont = FONT_OPTIONS[category][0]?.value || 'Inter';
    updateFont({ 
      category, 
      fontFamily: firstFont,
      headingFontFamily: font.useCreativeHeadingFont ? font.headingFontFamily : firstFont
    });
  };

  const currentFontOptions = FONT_OPTIONS[font.category] || FONT_OPTIONS.sans;

  return (
    <div className="space-y-5">
      {/* Font Category */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Font Category</label>
        <div className="grid grid-cols-3 gap-2">
          {(['sans', 'serif', 'mono'] as FontCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                py-3 px-3 rounded-lg border-2 text-sm font-medium transition-all capitalize
                ${font.category === category 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }
              `}
              style={{ 
                fontFamily: category === 'serif' ? 'Georgia, serif' : 
                           category === 'mono' ? '"Fira Code", monospace' : 'Inter, sans-serif'
              }}
            >
              {category === 'sans' ? 'Sans Serif' : category === 'serif' ? 'Serif' : 'Monospace'}
            </button>
          ))}
        </div>
      </div>

      {/* Body Font - Visual Grid */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Body Font</label>
        <div className="grid grid-cols-2 gap-2">
          {currentFontOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => updateFont({ fontFamily: f.value })}
              className={`
                relative p-3 rounded-lg border-2 text-left transition-all
                ${font.fontFamily === f.value 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <span 
                className="block text-base font-medium truncate"
                style={{ fontFamily: f.value }}
              >
                {f.label}
              </span>
              <span 
                className="block text-xs text-muted-foreground mt-1"
                style={{ fontFamily: f.value }}
              >
                Aa Bb Cc 123
              </span>
              {font.fontFamily === f.value && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Creative Heading Font Toggle */}
      <div className="flex items-center justify-between py-2 border-t pt-4">
        <Label htmlFor="creative-font" className="text-sm font-medium text-foreground cursor-pointer">
          Use Different Heading Font
        </Label>
        <Switch
          id="creative-font"
          checked={font.useCreativeHeadingFont}
          onCheckedChange={(checked) => updateFont({ 
            useCreativeHeadingFont: checked,
            headingFontFamily: checked ? font.headingFontFamily : font.fontFamily
          })}
        />
      </div>

      {/* Heading Font (shown if creative font is enabled) */}
      {font.useCreativeHeadingFont && (
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Heading Font</label>
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {/* All fonts from all categories */}
            {[...FONT_OPTIONS.sans, ...FONT_OPTIONS.serif, ...FONT_OPTIONS.mono].map((f) => (
              <button
                key={f.value}
                onClick={() => updateFont({ headingFontFamily: f.value })}
                className={`
                  relative p-3 rounded-lg border-2 text-left transition-all
                  ${font.headingFontFamily === f.value 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <span 
                  className="block text-base font-semibold truncate"
                  style={{ fontFamily: f.value }}
                >
                  {f.label}
                </span>
                <span 
                  className="block text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: f.value }}
                >
                  Heading
                </span>
                {font.headingFontFamily === f.value && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Font Preview */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
        <h3 
          className="text-lg font-semibold mb-1"
          style={{ fontFamily: font.useCreativeHeadingFont ? font.headingFontFamily : font.fontFamily }}
        >
          Work Experience
        </h3>
        <p 
          className="text-sm text-muted-foreground"
          style={{ fontFamily: font.fontFamily }}
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
};
