import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText } from 'lucide-react';
import { DateFormatType, PageFormat, RegionalSettings as RegionalSettingsType, DEFAULT_REGIONAL_SETTINGS } from '@/types/resume';

const DATE_FORMAT_OPTIONS = [
  { value: 'MM/YYYY', label: 'MM/YYYY (01/2024)' },
  { value: 'MMM YYYY', label: 'MMM YYYY (Jan 2024)' },
  { value: 'MMMM YYYY', label: 'MMMM YYYY (January 2024)' },
  { value: 'YYYY-MM', label: 'YYYY-MM (2024-01)' },
  { value: 'YYYY', label: 'YYYY (2024)' },
];

const PAGE_FORMAT_OPTIONS = [
  { value: 'a4', label: 'A4 (210 × 297 mm)' },
  { value: 'letter', label: 'Letter (8.5 × 11 in)' },
];

export const RegionalSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const regional = settings.regional || DEFAULT_REGIONAL_SETTINGS;

  const updateRegional = (updates: Partial<RegionalSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        regional: { ...regional, ...updates }
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Date Format */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Date Format</label>
        </div>
        <Select value={regional.dateFormat} onValueChange={(value: DateFormatType) => updateRegional({ dateFormat: value })}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select date format" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {DATE_FORMAT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page Format */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Page Format</label>
        </div>
        <Select value={regional.pageFormat} onValueChange={(value: PageFormat) => updateRegional({ pageFormat: value })}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select page format" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {PAGE_FORMAT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};