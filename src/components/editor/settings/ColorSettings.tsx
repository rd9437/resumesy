import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ColorSettings as ColorSettingsType, COLOR_PRESETS } from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Palette, Sliders, Frame } from 'lucide-react';

type ColorModeExtended = 'basic' | 'advanced' | 'border';

const COLOR_MODES: { value: ColorModeExtended; label: string; icon: React.ReactNode }[] = [
  { value: 'basic', label: 'Basic', icon: <Palette className="w-4 h-4" /> },
  { value: 'advanced', label: 'Advanced', icon: <Sliders className="w-4 h-4" /> },
  { value: 'border', label: 'Border', icon: <Frame className="w-4 h-4" /> },
];

export const ColorSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const colors = settings.colors;
  const colorMode = (colors.mode as ColorModeExtended) || 'basic';

  const updateColors = (updates: Partial<ColorSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        colors: { ...colors, ...updates }
      }
    });
  };

  const updateApplyAccentTo = (key: keyof ColorSettingsType['applyAccentTo'], value: boolean) => {
    updateColors({
      applyAccentTo: {
        ...colors.applyAccentTo,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Color Mode Selector */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Color Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => updateColors({ mode: mode.value as 'basic' | 'advanced' })}
              className={`
                py-3 px-3 rounded-lg border-2 flex flex-col items-center gap-1.5 transition-all
                ${colorMode === mode.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-primary/50 text-muted-foreground'
                }
              `}
            >
              {mode.icon}
              <span className="text-xs font-medium">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Mode */}
      {colorMode === 'basic' && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateColors({ accentColor: color.value })}
                  className={`w-8 h-8 rounded-full transition-all ${
                    colors.accentColor === color.value
                      ? 'ring-2 ring-offset-2 ring-foreground scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="color"
                value={colors.accentColor}
                onChange={(e) => updateColors({ accentColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors.accentColor}
                onChange={(e) => updateColors({ accentColor: e.target.value })}
                className="editor-input flex-1 font-mono text-sm"
                placeholder="#0d9488"
              />
            </div>
          </div>
        </div>
      )}

      {/* Advanced Mode */}
      {colorMode === 'advanced' && (
        <div className="space-y-4">
          {/* Accent Color */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.accentColor}
                onChange={(e) => updateColors({ accentColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors.accentColor}
                onChange={(e) => updateColors({ accentColor: e.target.value })}
                className="editor-input flex-1 font-mono text-sm"
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.textColor}
                onChange={(e) => updateColors({ textColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors.textColor}
                onChange={(e) => updateColors({ textColor: e.target.value })}
                className="editor-input flex-1 font-mono text-sm"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.backgroundColor}
                onChange={(e) => updateColors({ backgroundColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors.backgroundColor}
                onChange={(e) => updateColors({ backgroundColor: e.target.value })}
                className="editor-input flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Border Mode */}
      {colorMode === 'border' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Add decorative borders to your resume sections.</p>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Border Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateColors({ accentColor: color.value })}
                  className={`w-8 h-8 rounded-full transition-all border-2 ${
                    colors.accentColor === color.value
                      ? 'ring-2 ring-offset-2 ring-foreground scale-110'
                      : 'hover:scale-105 border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Apply Accent To */}
      <div className="border-t pt-4">
        <label className="text-sm font-medium text-foreground mb-3 block">Apply Accent Color To</label>
        <div className="space-y-2">
          {[
            { key: 'name' as const, label: 'Name' },
            { key: 'jobTitle' as const, label: 'Job Title' },
            { key: 'headings' as const, label: 'Section Headings' },
            { key: 'headingLine' as const, label: 'Heading Lines' },
            { key: 'headerIcons' as const, label: 'Contact Icons' },
            { key: 'levelIndicators' as const, label: 'Skill/Language Levels' },
            { key: 'dates' as const, label: 'Dates' },
            { key: 'linkIcons' as const, label: 'Link Icons' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50">
              <Label htmlFor={`accent-${key}`} className="text-sm text-muted-foreground cursor-pointer">
                {label}
              </Label>
              <Switch
                id={`accent-${key}`}
                checked={colors.applyAccentTo[key]}
                onCheckedChange={(checked) => updateApplyAccentTo(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
