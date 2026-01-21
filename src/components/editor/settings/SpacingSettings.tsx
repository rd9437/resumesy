import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { SpacingSettings as SpacingSettingsType } from '@/types/resume';

interface SliderWithButtonsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

const SliderWithButtons: React.FC<SliderWithButtonsProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = ''
}) => {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-mono text-primary shrink-0">
          {Number.isInteger(value) ? value : value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="flex-1 min-w-0"
        />
        <div className="flex gap-1 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={decrement}
            disabled={value <= min}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={increment}
            disabled={value >= max}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SpacingSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const spacing = settings.spacing;

  const updateSpacing = (updates: Partial<SpacingSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        spacing: { ...spacing, ...updates }
      }
    });
  };

  return (
    <div className="space-y-5">
      <SliderWithButtons
        label="Font Size"
        value={spacing.fontSize}
        onChange={(fontSize) => updateSpacing({ fontSize })}
        min={8}
        max={14}
        step={0.5}
        unit="pt"
      />

      <SliderWithButtons
        label="Line Height"
        value={spacing.lineHeight}
        onChange={(lineHeight) => updateSpacing({ lineHeight })}
        min={1.0}
        max={2.0}
        step={0.1}
      />

      <SliderWithButtons
        label="Left & Right Margin"
        value={spacing.leftRightMargin}
        onChange={(leftRightMargin) => updateSpacing({ leftRightMargin })}
        min={5}
        max={25}
        step={1}
        unit="mm"
      />

      <SliderWithButtons
        label="Top & Bottom Margin"
        value={spacing.topBottomMargin}
        onChange={(topBottomMargin) => updateSpacing({ topBottomMargin })}
        min={5}
        max={25}
        step={1}
        unit="mm"
      />

      <SliderWithButtons
        label="Section Spacing"
        value={spacing.sectionSpacing}
        onChange={(sectionSpacing) => updateSpacing({ sectionSpacing })}
        min={8}
        max={32}
        step={2}
        unit="px"
      />

      <SliderWithButtons
        label="Entry Spacing"
        value={spacing.entrySpacing}
        onChange={(entrySpacing) => updateSpacing({ entrySpacing })}
        min={4}
        max={24}
        step={2}
        unit="px"
      />
    </div>
  );
};
