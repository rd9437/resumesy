import { ResumeSettings, DEFAULT_RESUME_SETTINGS } from './resume';

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'modern' | 'creative' | 'minimal' | 'sidebar';
  hasSidebar: boolean;
  hasPhoto: boolean;
  previewColor: string;
  settings: Partial<ResumeSettings>;
}

// Template presets with sensible default styling
export const RESUME_TEMPLATES: ResumeTemplate[] = [
  // Classic Templates
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and classic single-column layout',
    category: 'classic',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#0d9488',
    settings: {
      layout: 'single',
      template: 'professional',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#0d9488',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'accent-line',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'center',
      },
    },
  },
  {
    id: 'consultant-edge',
    name: 'Consultant',
    description: 'Full-width profile header inspired by boutique firms',
    category: 'classic',
    hasSidebar: false,
    hasPhoto: true,
    previewColor: '#d7c8bb',
    settings: {
      layout: 'single',
      template: 'consultant-edge',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        mode: 'advanced',
        accentColor: '#c3b3a3',
        textColor: '#1f1f1f',
        backgroundColor: '#ffffff',
        applyAccentTo: {
          ...DEFAULT_RESUME_SETTINGS.colors.applyAccentTo,
          name: false,
          headings: false,
          headingLine: false,
        },
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'left',
        arrangement: 'icon',
        showPhoto: true,
        photoShape: 'circle',
        photoPosition: 'left',
        nameBold: true,
        titlePosition: 'below',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'line-below',
        capitalization: 'uppercase',
        size: 'm',
      },
      spacing: {
        ...DEFAULT_RESUME_SETTINGS.spacing,
        sectionSpacing: 18,
        entrySpacing: 10,
        topBottomMargin: 18,
        leftRightMargin: 18,
      },
      skills: {
        ...DEFAULT_RESUME_SETTINGS.skills,
        displayStyle: 'compact',
        columns: 2,
        compactSeparator: 'bullet',
      },
    },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior roles',
    category: 'classic',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#1e3a5f',
    settings: {
      layout: 'single',
      template: 'executive',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#1e3a5f',
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        category: 'serif',
        fontFamily: 'Georgia',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'line-below',
        capitalization: 'uppercase',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'left',
      },
    },
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'Traditional academic style layout',
    category: 'classic',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#8b0000',
    settings: {
      layout: 'single',
      template: 'harvard',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#8b0000',
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        fontFamily: 'Times New Roman',
        category: 'serif',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'simple',
        capitalization: 'uppercase',
        size: 'm',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'right',
        nameSize: 'xl',
      },
    },
  },
  
  // Modern Templates
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'Contemporary minimalist design',
    category: 'modern',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#2563eb',
    settings: {
      layout: 'single',
      template: 'modern-clean',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#2563eb',
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        fontFamily: 'Inter',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'modern',
        capitalization: 'capitalize',
        size: 'l',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'left',
        arrangement: 'bar',
      },
    },
  },
  {
    id: 'tech-pro',
    name: 'Tech Pro',
    description: 'Perfect for software & tech roles',
    category: 'modern',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#059669',
    settings: {
      layout: 'single',
      template: 'tech-pro',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#059669',
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        fontFamily: 'JetBrains Mono',
        category: 'mono',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'accent-bg',
      },
      skills: {
        ...DEFAULT_RESUME_SETTINGS.skills,
        displayStyle: 'tags',
      },
    },
  },
  
  // Sidebar Templates - Dark
  {
    id: 'sidebar-dark',
    name: 'Sidebar Dark',
    description: 'Two-column with dark sidebar',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#1e293b',
    settings: {
      layout: 'two-column',
      template: 'sidebar-dark',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        mode: 'advanced',
        accentColor: '#1e293b',
        textColor: '#1a1a1a',
        backgroundColor: '#ffffff',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'left',
        showPhoto: true,
        photoShape: 'circle',
        photoSize: 100,
      },
    },
  },
  {
    id: 'sidebar-navy',
    name: 'Sidebar Navy',
    description: 'Professional navy sidebar layout',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#0f172a',
    settings: {
      layout: 'two-column',
      template: 'sidebar-navy',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        mode: 'advanced',
        accentColor: '#0f172a',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'rounded',
        photoSize: 90,
      },
    },
  },
  {
    id: 'sidebar-teal',
    name: 'Sidebar Teal',
    description: 'Fresh teal accent sidebar',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#0d9488',
    settings: {
      layout: 'two-column',
      template: 'sidebar-teal',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#0d9488',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'circle',
      },
    },
  },
  
  // Sidebar Templates - Light
  {
    id: 'sidebar-light',
    name: 'Sidebar Light',
    description: 'Clean light gray sidebar',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#f1f5f9',
    settings: {
      layout: 'two-column',
      template: 'sidebar-light',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        mode: 'basic',
        accentColor: '#475569',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'square',
      },
    },
  },
  
  // Creative Templates
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Bold design for creative fields',
    category: 'creative',
    hasSidebar: false,
    hasPhoto: true,
    previewColor: '#dc2626',
    settings: {
      layout: 'single',
      template: 'creative-bold',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#dc2626',
        applyAccentTo: {
          ...DEFAULT_RESUME_SETTINGS.colors.applyAccentTo,
          name: true,
          headings: true,
        },
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        fontFamily: 'Playfair Display',
        category: 'serif',
        useCreativeHeadingFont: true,
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'rounded',
        nameSize: 'xl',
        nameBold: true,
      },
    },
  },
  
  // Minimal Templates
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean minimalist design',
    category: 'minimal',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#262626',
    settings: {
      layout: 'single',
      template: 'minimal',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#262626',
        applyAccentTo: {
          ...DEFAULT_RESUME_SETTINGS.colors.applyAccentTo,
          name: false,
          headings: false,
        },
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'simple',
        capitalization: 'uppercase',
        size: 's',
      },
      spacing: {
        ...DEFAULT_RESUME_SETTINGS.spacing,
        sectionSpacing: 20,
      },
    },
  },
  {
    id: 'minimal-lines',
    name: 'Minimal Lines',
    description: 'Clean with subtle line separators',
    category: 'minimal',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#71717a',
    settings: {
      layout: 'single',
      template: 'minimal-lines',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#71717a',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'line-below',
      },
    },
  },
  
  // Two-Column (Mixed) Templates
  {
    id: 'mixed-modern',
    name: 'Mixed Modern',
    description: 'Header + two-column body',
    category: 'modern',
    hasSidebar: false,
    hasPhoto: true,
    previewColor: '#0891b2',
    settings: {
      layout: 'single',
      template: 'mixed-modern',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#0891b2',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        align: 'center',
        showPhoto: true,
        photoShape: 'circle',
      },
    },
  },
  {
    id: 'mixed-corporate',
    name: 'Corporate',
    description: 'Professional corporate style',
    category: 'classic',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#334155',
    settings: {
      layout: 'single',
      template: 'mixed-corporate',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#334155',
      },
      font: {
        ...DEFAULT_RESUME_SETTINGS.font,
        fontFamily: 'IBM Plex Sans',
      },
      headings: {
        ...DEFAULT_RESUME_SETTINGS.headings,
        style: 'boxed',
        capitalization: 'uppercase',
      },
    },
  },
  
  // Additional Popular Templates
  {
    id: 'atlantic-blue',
    name: 'Atlantic Blue',
    description: 'Deep blue professional sidebar',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#1e40af',
    settings: {
      layout: 'two-column',
      template: 'atlantic-blue',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#1e40af',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'circle',
        photoSize: 100,
      },
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Fresh green sidebar design',
    category: 'sidebar',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#047857',
    settings: {
      layout: 'two-column',
      template: 'emerald',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#047857',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
      },
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Elegant rose accent design',
    category: 'creative',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#be185d',
    settings: {
      layout: 'two-column',
      template: 'rose',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#be185d',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
        photoShape: 'rounded',
      },
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Modern gray tones',
    category: 'modern',
    hasSidebar: false,
    hasPhoto: false,
    previewColor: '#475569',
    settings: {
      layout: 'single',
      template: 'slate',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#475569',
      },
    },
  },
  {
    id: 'amber',
    name: 'Amber',
    description: 'Warm amber sidebar accent',
    category: 'creative',
    hasSidebar: true,
    hasPhoto: true,
    previewColor: '#d97706',
    settings: {
      layout: 'two-column',
      template: 'amber',
      colors: {
        ...DEFAULT_RESUME_SETTINGS.colors,
        accentColor: '#d97706',
      },
      personalDetails: {
        ...DEFAULT_RESUME_SETTINGS.personalDetails,
        showPhoto: true,
      },
    },
  },
];

export const getTemplateById = (id: string): ResumeTemplate | undefined => {
  return RESUME_TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: ResumeTemplate['category']): ResumeTemplate[] => {
  return RESUME_TEMPLATES.filter(t => t.category === category);
};

export const applyTemplateSettings = (
  currentSettings: ResumeSettings,
  template: ResumeTemplate
): ResumeSettings => {
  return {
    ...currentSettings,
    ...template.settings,
    colors: {
      ...currentSettings.colors,
      ...template.settings.colors,
      applyAccentTo: {
        ...currentSettings.colors.applyAccentTo,
        ...template.settings.colors?.applyAccentTo,
      },
    },
    font: {
      ...currentSettings.font,
      ...template.settings.font,
    },
    headings: {
      ...currentSettings.headings,
      ...template.settings.headings,
    },
    personalDetails: {
      ...currentSettings.personalDetails,
      ...template.settings.personalDetails,
    },
    spacing: {
      ...currentSettings.spacing,
      ...template.settings.spacing,
    },
    skills: {
      ...currentSettings.skills,
      ...template.settings.skills,
    },
  };
};
