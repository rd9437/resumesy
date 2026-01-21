import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutSettings } from './LayoutSettings';
import { SpacingSettings } from './SpacingSettings';
import { ColorSettings } from './ColorSettings';
import { FontSettings } from './FontSettings';
import { HeadingSettings } from './HeadingSettings';
import { EntryLayoutSettings } from './EntryLayoutSettings';
import { PersonalDetailsSettingsPanel } from './PersonalDetailsSettings';
import { SkillsLanguagesSettings } from './SkillsLanguagesSettings';
import { 
  Layout, 
  Maximize, 
  Palette, 
  Type, 
  Heading, 
  AlignLeft, 
  User,
  Sparkles
} from 'lucide-react';

export const SettingsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('layout');

  return (
    <div className="section-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 gap-1 h-auto p-1 mb-4">
          <TabsTrigger value="layout" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Layout className="w-4 h-4" />
            <span>Layout</span>
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Maximize className="w-4 h-4" />
            <span>Spacing</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Palette className="w-4 h-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="fonts" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Type className="w-4 h-4" />
            <span>Fonts</span>
          </TabsTrigger>
        </TabsList>

        <TabsList className="grid grid-cols-4 gap-1 h-auto p-1 mb-4">
          <TabsTrigger value="headings" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Heading className="w-4 h-4" />
            <span>Headings</span>
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <AlignLeft className="w-4 h-4" />
            <span>Entries</span>
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <User className="w-4 h-4" />
            <span>Header</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex flex-col gap-1 py-2 px-1 text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Skills</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="mt-0">
          <LayoutSettings />
        </TabsContent>

        <TabsContent value="spacing" className="mt-0">
          <SpacingSettings />
        </TabsContent>

        <TabsContent value="colors" className="mt-0">
          <ColorSettings />
        </TabsContent>

        <TabsContent value="fonts" className="mt-0">
          <FontSettings />
        </TabsContent>

        <TabsContent value="headings" className="mt-0">
          <HeadingSettings />
        </TabsContent>

        <TabsContent value="entries" className="mt-0">
          <EntryLayoutSettings />
        </TabsContent>

        <TabsContent value="personal" className="mt-0">
          <PersonalDetailsSettingsPanel />
        </TabsContent>

        <TabsContent value="skills" className="mt-0">
          <SkillsLanguagesSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
