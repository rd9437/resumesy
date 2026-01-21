import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '@/contexts/ResumeContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RegionalSettings } from './settings/RegionalSettings';
import { LayoutSettings } from './settings/LayoutSettings';
import { SectionLayoutSettings } from './settings/SectionLayoutSettings';
import { SpacingSettings } from './settings/SpacingSettings';
import { ColorSettings } from './settings/ColorSettings';
import { FontSettings } from './settings/FontSettings';
import { HeadingSettings } from './settings/HeadingSettings';
import { EntryLayoutSettings } from './settings/EntryLayoutSettings';
import { FooterSettings } from './settings/FooterSettings';
import { AdvancedSettings } from './settings/AdvancedSettings';
import { PersonalDetailsSettingsPanel } from './settings/PersonalDetailsSettings';
import { SkillsLanguagesSettings } from './settings/SkillsLanguagesSettings';
import { ProfileSettingsPanel } from './settings/ProfileSettings';
import { Layout } from 'lucide-react';

export const CustomizePanel: React.FC = () => {
  const { currentResume } = useResume();
  const navigate = useNavigate();

  if (!currentResume) return null;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 pb-8 px-1">
        {/* Language & Region */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Language & Region</h3>
          <RegionalSettings />
        </div>

        {/* Templates - Enhanced with preview background */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-1">Apply a design template</h3>
          <p className="text-sm text-muted-foreground mb-4">Your data stays put even when you change templates 🔄</p>
          
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4">
            {/* Template preview background effect */}
            <div className="absolute inset-0 opacity-30 flex items-center justify-center gap-2 overflow-hidden">
              <div className="w-16 h-24 bg-white dark:bg-slate-700 rounded shadow-sm transform -rotate-3 translate-y-2"></div>
              <div className="w-16 h-24 bg-white dark:bg-slate-700 rounded shadow-sm transform rotate-1"></div>
              <div className="w-16 h-24 bg-white dark:bg-slate-700 rounded shadow-sm transform -rotate-2 -translate-y-1"></div>
              <div className="w-16 h-24 bg-white dark:bg-slate-700 rounded shadow-sm transform rotate-3 translate-y-3"></div>
              <div className="w-16 h-24 bg-white dark:bg-slate-700 rounded shadow-sm transform -rotate-1"></div>
            </div>
            
            {/* Centered button */}
            <div className="relative flex justify-center py-6">
              <Button 
                onClick={() => navigate('/templates')}
                variant="outline"
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full px-6 py-2 font-medium shadow-md"
              >
                Browse Templates
              </Button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Layout</h3>
          <LayoutSettings />
        </div>

        {/* Section Layout (Reorder) */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Section Layout</h3>
          <SectionLayoutSettings />
        </div>

        {/* Spacing */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Spacing</h3>
          <SpacingSettings />
        </div>

        {/* Colors */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Colors</h3>
          <ColorSettings />
        </div>

        {/* Font */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Font</h3>
          <FontSettings />
        </div>

        {/* Section Headings */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Section Headings</h3>
          <HeadingSettings />
        </div>

        {/* Entry Layout */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Entry Layout</h3>
          <EntryLayoutSettings />
        </div>

        {/* Footer */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Footer</h3>
          <FooterSettings />
        </div>

        {/* Advanced */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Advanced</h3>
          <AdvancedSettings />
        </div>

        {/* Personal Details / Header */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Header Settings</h3>
          <PersonalDetailsSettingsPanel />
        </div>

        {/* Skills, Languages & Certifications */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Skills, Languages & Certifications</h3>
          <SkillsLanguagesSettings />
        </div>

        {/* Profile Section */}
        <div className="section-card overflow-hidden">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-3 sm:mb-4">Profile</h3>
          <ProfileSettingsPanel />
        </div>

        {/* Feedback | Report Section */}
        <div className="section-card mb-4">
          <h3 className="font-semibold text-base sm:text-lg text-primary mb-2">Feedback | Report</h3>
          <p className="text-sm text-muted-foreground mb-4">
            I would love to have your experiences, suggestions, or bug reports.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:rudransh9437@gmail.com"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              ✉️ Write to me
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://emojicom.io/feedback#os6X8clId3g6goVp6Y6J"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              🐞 Report
            </a>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
