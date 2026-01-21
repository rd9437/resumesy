import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { FooterSettings as FooterSettingsType } from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Hash, Mail, User } from 'lucide-react';

export const FooterSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const footer = settings.footer;

  const updateFooter = (updates: Partial<FooterSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        footer: { ...footer, ...updates }
      }
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground mb-2">Show additional information in the page footer.</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="page-numbers" className="text-sm text-foreground cursor-pointer">
              Page Numbers
            </Label>
          </div>
          <Switch
            id="page-numbers"
            checked={footer.showPageNumbers}
            onCheckedChange={(checked) => updateFooter({ showPageNumbers: checked })}
          />
        </div>

        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="footer-email" className="text-sm text-foreground cursor-pointer">
              Email
            </Label>
          </div>
          <Switch
            id="footer-email"
            checked={footer.showEmail}
            onCheckedChange={(checked) => updateFooter({ showEmail: checked })}
          />
        </div>

        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="footer-name" className="text-sm text-foreground cursor-pointer">
              Name
            </Label>
          </div>
          <Switch
            id="footer-name"
            checked={footer.showName}
            onCheckedChange={(checked) => updateFooter({ showName: checked })}
          />
        </div>
      </div>
    </div>
  );
};
