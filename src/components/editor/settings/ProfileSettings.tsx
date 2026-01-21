import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ProfileSettings as ProfileSettingsType } from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ProfileSettingsPanel: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const profile = settings.profile;

  const updateProfile = (updates: Partial<ProfileSettingsType>) => {
    updateResume({
      settings: {
        ...settings,
        profile: { ...profile, ...updates }
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <Label htmlFor="show-profile-heading" className="text-sm font-medium text-foreground cursor-pointer">
          Show Profile Heading
        </Label>
        <Switch
          id="show-profile-heading"
          checked={profile.showProfileHeading}
          onCheckedChange={(checked) => updateProfile({ showProfileHeading: checked })}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        When enabled, a "Profile" heading will be shown above the summary section.
      </p>
    </div>
  );
};
