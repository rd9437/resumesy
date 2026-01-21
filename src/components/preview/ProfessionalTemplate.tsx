import React from 'react';
import { 
  Resume, 
  migrateResumeSettings, 
  HeadingSize, 
  NameSize, 
  formatDate, 
  SOCIAL_PLATFORMS,
  LevelIndicatorStyle,
  CompactSeparatorStyle,
  SubinfoStyle,
} from '@/types/resume';
import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, 
  Code, Award, Languages, FolderOpen, ExternalLink, Link2, User,
  Twitter, BookOpen, Palette, GitBranch, Facebook, Instagram, Youtube,
  Video, Send, MessageCircle, MessageSquare, Hash, CircleDot, Music, Tv,
  Package, Database, Code2, Terminal, ShoppingBag, Calendar, Link
} from 'lucide-react';

interface ProfessionalTemplateProps {
  resume: Resume;
}

const getSizeMultiplier = (size: HeadingSize | NameSize): number => {
  const multipliers: Record<string, number> = { xs: 0.75, s: 0.85, m: 1, l: 1.15, xl: 1.3 };
  return multipliers[size] || 1;
};

const getSectionIcon = (type: string, filled: boolean) => {
  const className = `w-3.5 h-3.5 ${filled ? 'fill-current' : ''}`;
  const icons: Record<string, React.ReactNode> = {
    summary: <User className={className} />,
    experience: <Briefcase className={className} />,
    education: <GraduationCap className={className} />,
    skills: <Code className={className} />,
    projects: <FolderOpen className={className} />,
    certifications: <Award className={className} />,
    languages: <Languages className={className} />,
  };
  return icons[type] || null;
};

// Platform icon mapping
const getPlatformIcon = (platform: string, className: string = "w-3 h-3"): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    email: <Mail className={className} />,
    phone: <Phone className={className} />,
    location: <MapPin className={className} />,
    website: <Globe className={className} />,
    linkedin: <Linkedin className={className} />,
    github: <Github className={className} />,
    twitter: <Twitter className={className} />,
    medium: <BookOpen className={className} />,
    dribbble: <Palette className={className} />,
    behance: <Palette className={className} />,
    stackoverflow: <Code className={className} />,
    gitlab: <GitBranch className={className} />,
    facebook: <Facebook className={className} />,
    instagram: <Instagram className={className} />,
    youtube: <Youtube className={className} />,
    tiktok: <Video className={className} />,
    telegram: <Send className={className} />,
    whatsapp: <MessageCircle className={className} />,
    discord: <MessageSquare className={className} />,
    slack: <Hash className={className} />,
    reddit: <CircleDot className={className} />,
    pinterest: <Link className={className} />,
    spotify: <Music className={className} />,
    twitch: <Tv className={className} />,
    figma: <Palette className={className} />,
    codepen: <Code className={className} />,
    npm: <Package className={className} />,
    kaggle: <Database className={className} />,
    leetcode: <Code2 className={className} />,
    hackerrank: <Terminal className={className} />,
    upwork: <Briefcase className={className} />,
    fiverr: <ShoppingBag className={className} />,
    googlescholar: <GraduationCap className={className} />,
    orcid: <User className={className} />,
    researchgate: <BookOpen className={className} />,
    calendly: <Calendar className={className} />,
    linktree: <Link className={className} />,
    custom: <Link2 className={className} />,
  };
  return icons[platform] || <Link2 className={className} />;
};

// Link icon component
const LinkIcon: React.FC<{ style: 'none' | 'external' | 'chain'; color?: string }> = ({ style, color }) => {
  if (style === 'none') return null;
  const className = "w-2.5 h-2.5 ml-0.5 inline-block";
  if (style === 'external') return <ExternalLink className={className} style={{ color }} />;
  if (style === 'chain') return <Link2 className={className} style={{ color }} />;
  return null;
};

type LanguageEntry = Resume['languages'][number];
type CertificationEntry = Resume['certifications'][number];

const proficiencyScale: Record<string, number> = {
  basic: 1,
  conversational: 2,
  proficient: 3,
  fluent: 4,
  native: 5,
};

const getLanguageLevelValue = (value: LanguageEntry['proficiency']): number => {
  return proficiencyScale[value] || 3;
};

const getProficiencyLabel = (value?: LanguageEntry['proficiency']): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const renderSubinfoNode = (value?: string, style: SubinfoStyle = 'dash', color?: string) => {
  if (!value) return null;
  const formatted =
    style === 'colon'
      ? `: ${value}`
      : style === 'bracket'
      ? ` (${value})`
      : ` – ${value}`;

  return (
    <span
      className="text-[11px] font-normal"
      style={{ color, marginLeft: style === 'bracket' ? 2 : 4 }}
    >
      {formatted}
    </span>
  );
};

const renderSeparatedItems = (
  items: React.ReactNode[],
  separator: CompactSeparatorStyle,
  color: string,
  separatorColor: string
) => {
  if (items.length === 0) return null;

  if (separator === 'newline') {
    return (
      <div className="text-xs space-y-1" style={{ color }}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-xs flex flex-wrap items-center" style={{ color }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index < items.length - 1 && (
            <span className="mx-1" style={{ color: separatorColor }}>
              {separator === 'pipe' ? '|' : separator === 'comma' ? ',' : '•'}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const renderLanguageLevelIndicator = (
  language: LanguageEntry,
  style: LevelIndicatorStyle,
  filledColor: string,
  emptyColor: string
) => {
  const levelValue = getLanguageLevelValue(language.proficiency);

  if (style === 'bar') {
    return (
      <div
        className="w-full h-1.5 rounded-full overflow-hidden mt-1"
        style={{ backgroundColor: emptyColor }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(levelValue / 5) * 100}%`, backgroundColor: filledColor }}
        />
      </div>
    );
  }

  if (style === 'text') {
    return (
      <span className="text-xs font-medium" style={{ color: filledColor }}>
        {getProficiencyLabel(language.proficiency)}
      </span>
    );
  }

  return (
    <div className="flex gap-0.5 mt-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: idx < levelValue ? filledColor : emptyColor }}
        />
      ))}
    </div>
  );
};

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resume }) => {
  const { personalDetails, summary, experience, education, skills, projects, certifications, languages, sections } = resume;
  
  // Migrate settings if needed
  const settings = migrateResumeSettings(resume.settings);
  const { 
    spacing, colors, font, headings, entryLayout, personalDetails: pdSettings, 
    skills: skillsSettings, languages: langSettings, certificates: certSettings, experience: expSettings, 
    education: eduSettings, layout, regional, linkIconStyle, footer, profile 
  } = settings;
  const templateId = settings.template || 'professional';
  const isEdgeProfileTemplate = templateId === 'consultant-edge';

  const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  const accentColor = colors.accentColor;
  const textColor = colors.mode === 'advanced' ? colors.textColor : '#1a1a1a';
  const bgColor = colors.mode === 'advanced' ? colors.backgroundColor : '#ffffff';
  const dateFormat = regional?.dateFormat || 'MMM YYYY';
  const reduceDateOpacity = footer?.reduceDateOpacity || false;

  const fontSize = spacing.fontSize;
  const lineHeight = spacing.lineHeight;
  
  // Apply font family from settings
  const fontFamily = font.fontFamily;
  const headingFont = font.useCreativeHeadingFont ? font.headingFontFamily : font.fontFamily;

  const mmToPx = (mm: number) => mm * 3.78;
  const pagePaddingX = mmToPx(spacing.leftRightMargin);
  const pagePaddingY = mmToPx(spacing.topBottomMargin);

  const isSidebarLayout = layout === 'two-column';
  
  // Sidebar sections (for two-column layout)
  const sidebarSectionTypes = ['skills', 'languages', 'certifications'];
  const sidebarSections = isSidebarLayout ? enabledSections.filter(s => sidebarSectionTypes.includes(s.type)) : [];
  const mainSections = isSidebarLayout ? enabledSections.filter(s => !sidebarSectionTypes.includes(s.type) && s.type !== 'personal') : enabledSections;

  // Format date helper
  const fmtDate = (dateStr: string): string => {
    if (!dateStr) return '';
    return formatDate(dateStr, dateFormat);
  };

  const getHeadingStyles = (forSidebar: boolean = false): React.CSSProperties => {
    const size = fontSize * getSizeMultiplier(headings.size) * 1.1;
    const base: React.CSSProperties = {
      fontSize: `${size}pt`,
      fontFamily: headingFont,
      fontWeight: 600,
      textTransform: headings.capitalization === 'uppercase' ? 'uppercase' : headings.capitalization === 'capitalize' ? 'capitalize' : 'none',
      color: forSidebar ? '#ffffff' : (colors.applyAccentTo.headings ? accentColor : textColor),
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    };
    return base;
  };

  const getHeadingDecoration = (forSidebar: boolean = false) => {
    const lineColor = forSidebar ? 'rgba(255,255,255,0.3)' : (colors.applyAccentTo.headingLine ? accentColor : '#e5e5e5');
    
    switch (headings.style) {
      case 'accent-line':
        return <div className="flex-1 h-px ml-2" style={{ backgroundColor: lineColor }} />;
      case 'line-below':
        return null; // Rendered separately
      case 'line-above':
        return null; // Rendered separately
      case 'dotted':
        return <div className="flex-1 ml-2 border-t-2 border-dotted" style={{ borderColor: lineColor }} />;
      case 'modern':
        return null;
      default:
        return null;
    }
  };

  const renderHeading = (title: string, type: string, forSidebar: boolean = false) => {
    if (isEdgeProfileTemplate && !forSidebar) {
      return (
        <div className="mb-3">
          <div
            style={{
              backgroundColor: '#e9e5df',
              color: '#4c4742',
              textTransform: 'uppercase',
              fontSize: `${fontSize * 0.9}pt`,
              letterSpacing: '0.1em',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '4px',
            }}
          >
            {title}
          </div>
        </div>
      );
    }

    const showIcon = headings.iconStyle !== 'none';
    const iconFilled = headings.iconStyle === 'filled';
    const lineColor = forSidebar ? 'rgba(255,255,255,0.3)' : (colors.applyAccentTo.headingLine ? accentColor : '#e5e5e5');
    
    const headingContent = (
      <h2 style={getHeadingStyles(forSidebar)}>
        {headings.style === 'modern' && (
          <div className="w-1 h-4 rounded mr-1" style={{ backgroundColor: forSidebar ? '#ffffff' : accentColor }} />
        )}
        {showIcon && <span style={{ color: forSidebar ? '#ffffff' : (colors.applyAccentTo.headerIcons ? accentColor : textColor) }}>{getSectionIcon(type, iconFilled)}</span>}
        <span>{title}</span>
        {getHeadingDecoration(forSidebar)}
      </h2>
    );
    
    return (
      <div className="mb-2">
        {headings.style === 'line-above' && (
          <div className="h-px w-full mb-2" style={{ backgroundColor: lineColor }} />
        )}
        {headings.style === 'boxed' && (
          <div className="border-2 px-2 py-1 rounded inline-block mb-2" style={{ borderColor: lineColor }}>
            {headingContent}
          </div>
        )}
        {headings.style === 'accent-bg' && (
          <div className="px-2 py-1 rounded mb-2" style={{ backgroundColor: forSidebar ? 'rgba(255,255,255,0.1)' : `${accentColor}15` }}>
            {headingContent}
          </div>
        )}
        {!['boxed', 'accent-bg'].includes(headings.style) && headingContent}
        {headings.style === 'line-below' && (
          <div className="h-px w-full" style={{ backgroundColor: lineColor }} />
        )}
      </div>
    );
  };

  const getListMarker = () => {
    const markers = { bullet: '•', hyphen: '–', arrow: '→', none: '' };
    return markers[entryLayout.listStyle] || '•';
  };

  const nameSize = fontSize * getSizeMultiplier(pdSettings.nameSize) * 2;
  const titleSize = fontSize * getSizeMultiplier(pdSettings.titleSize) * 1.1;
  const entryTitleSize = fontSize * getSizeMultiplier(entryLayout.titleSize);

  const getContactSeparator = () => {
    const seps = { icon: '', bullet: ' • ', bar: ' | ', comma: ', ' };
    return seps[pdSettings.arrangement] || '';
  };

  // Build contact items from both legacy fields and profile links
  const profileLinks = personalDetails.profileLinks || [];
  const legacyContacts = [
    { platform: 'email', value: personalDetails.email, displayText: personalDetails.email },
    { platform: 'phone', value: personalDetails.phone, displayText: personalDetails.phone },
    { platform: 'location', value: personalDetails.location, displayText: personalDetails.location },
    { platform: 'website', value: personalDetails.website, displayText: personalDetails.website },
    { platform: 'linkedin', value: personalDetails.linkedin, displayText: personalDetails.linkedin },
    { platform: 'github', value: personalDetails.github, displayText: personalDetails.github },
  ].filter(item => item.value);

  const allContactItems = [
    ...legacyContacts,
    ...profileLinks.filter(l => l.enabled && l.url).map(l => ({
      platform: l.platform,
      value: l.url,
      displayText: l.displayText || l.url,
    })),
  ];
  const headerContactItems = isEdgeProfileTemplate ? allContactItems.slice(0, 5) : allContactItems;

  const renderContactItem = (platform: string, displayText: string, showIcon: boolean, url?: string, forSidebar: boolean = false) => {
    if (!displayText) return null;
    const iconColor = forSidebar ? 'rgba(255,255,255,0.7)' : (colors.applyAccentTo.headerIcons ? accentColor : undefined);
    const linkIconColor = colors.applyAccentTo.linkIcons ? accentColor : iconColor;
    
    const shouldShowLinkIcon = Boolean(url && linkIconStyle !== 'none' && platform !== 'location');

    const content = (
      <span className="flex items-center gap-1" style={{ color: forSidebar ? 'rgba(255,255,255,0.9)' : undefined }}>
        {showIcon && <span style={{ color: iconColor }}>{getPlatformIcon(platform, "w-3 h-3")}</span>}
        <span>{displayText}</span>
        {shouldShowLinkIcon && <LinkIcon style={linkIconStyle} color={linkIconColor} />}
      </span>
    );

    if (url && ['website', 'linkedin', 'github', 'custom'].includes(platform)) {
      return content;
    }
    return content;
  };

  const textAlign = pdSettings.align;
  const showIcons = pdSettings.arrangement === 'icon';

  // Photo rendering
  const renderPhoto = (size: number = pdSettings.photoSize, inSidebar: boolean = false) => {
    if (!pdSettings.showPhoto || !personalDetails.photo) return null;
    
    const borderRadius = pdSettings.photoShape === 'circle' ? '50%' : pdSettings.photoShape === 'rounded' ? '12px' : '4px';
    
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius,
          overflow: 'hidden',
          flexShrink: 0,
          border: inSidebar ? '3px solid rgba(255,255,255,0.3)' : undefined,
        }}
      >
        <img
          src={personalDetails.photo}
          alt={personalDetails.fullName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  };

  const getInitials = () => {
    const words = (personalDetails.fullName || '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return 'YOU';
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
  };

  const renderPhotoWithFallback = (size?: number) => {
    if (!pdSettings.showPhoto) return null;
    if (personalDetails.photo) {
      return renderPhoto(size);
    }

    if (!isEdgeProfileTemplate) return null;

    const finalSize = size || pdSettings.photoSize;
    const initials = getInitials();

    return (
      <div
        style={{
          width: finalSize,
          height: finalSize,
          borderRadius: '9999px',
          backgroundColor: '#e8dfd6',
          border: '3px solid #f6f0ea',
          color: '#6b635c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: `${Math.max(finalSize / 3, 14)}px`,
        }}
      >
        {initials}
      </div>
    );
  };

  // Skills rendering with grouping support
  const renderSkills = (forSidebar: boolean = false) => {
    if (skills.length === 0) return null;
    
    const textColorStyle = forSidebar ? 'rgba(255,255,255,0.9)' : textColor;
    const bgColorStyle = forSidebar ? 'rgba(255,255,255,0.15)' : `${accentColor}15`;
    const enableGrouping = skillsSettings.enableGrouping;
    
    // Group skills if grouping is enabled
    const groups = Array.from(new Set(skills.filter(s => s.group).map(s => s.group)));
    const ungroupedSkills = skills.filter(s => !s.group);
    
    if (enableGrouping && groups.length > 0) {
      return (
        <div className="space-y-2">
          {groups.map(group => (
            <div key={group}>
              <p className="text-xs font-medium mb-1" style={{ color: forSidebar ? 'rgba(255,255,255,0.7)' : `${textColor}99` }}>
                {group}:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.filter(s => s.group === group).map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ backgroundColor: bgColorStyle, color: forSidebar ? textColorStyle : (colors.applyAccentTo.levelIndicators ? accentColor : textColor) }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {ungroupedSkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {ungroupedSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: bgColorStyle, color: forSidebar ? textColorStyle : (colors.applyAccentTo.levelIndicators ? accentColor : textColor) }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    // Grid display
    const gridCols = skillsSettings.columns || 3;
    if (skillsSettings.displayStyle === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '4px' }}>
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="text-xs"
              style={{ color: forSidebar ? textColorStyle : textColor }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      );
    }

    // Compact display
    if (skillsSettings.displayStyle === 'compact') {
      return (
        <p className="text-xs" style={{ color: forSidebar ? textColorStyle : textColor }}>
          {skills.map(s => s.name).join(' • ')}
        </p>
      );
    }

    // Bubble/Tags display (default)
    return (
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="px-2 py-0.5 rounded text-xs"
            style={{ backgroundColor: bgColorStyle, color: forSidebar ? textColorStyle : (colors.applyAccentTo.levelIndicators ? accentColor : textColor) }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    );
  };

  const renderLanguages = (forSidebar: boolean = false) => {
    if (languages.length === 0) return null;

    const separatorStyle: CompactSeparatorStyle = langSettings.compactSeparator || 'bullet';
    const subinfoStyle: SubinfoStyle = langSettings.subinfoStyle || 'dash';
    const levelStyle: LevelIndicatorStyle = langSettings.levelStyle || 'dots';
    const textColorStyle = forSidebar ? 'rgba(255,255,255,0.95)' : textColor;
    const secondaryColor = forSidebar ? 'rgba(255,255,255,0.75)' : '#475569';
    const chipBg = forSidebar ? 'rgba(255,255,255,0.12)' : `${accentColor}15`;
    const filledLevelColor = forSidebar ? 'rgba(255,255,255,0.95)' : (colors.applyAccentTo.levelIndicators ? accentColor : textColor);
    const emptyLevelColor = forSidebar ? 'rgba(255,255,255,0.25)' : '#e5e7eb';
    const separatorColor = forSidebar ? 'rgba(255,255,255,0.5)' : '#94a3b8';
    const columns = Math.max(1, langSettings.columns || 2);

    const compactItems = languages.map((lang) => (
      <span key={lang.id} className="font-medium">
        {lang.name}
        {langSettings.showLevel && renderSubinfoNode(getProficiencyLabel(lang.proficiency), subinfoStyle, secondaryColor)}
      </span>
    ));

    if (langSettings.displayStyle === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: '6px' }}>
          {languages.map((lang) => (
            <div key={lang.id} className="text-xs font-medium" style={{ color: textColorStyle }}>
              {lang.name}
              {langSettings.showLevel && renderSubinfoNode(getProficiencyLabel(lang.proficiency), subinfoStyle, secondaryColor)}
            </div>
          ))}
        </div>
      );
    }

    if (langSettings.displayStyle === 'level') {
      return (
        <div className="space-y-2">
          {languages.map((lang) => {
            const indicator = langSettings.showLevel
              ? renderLanguageLevelIndicator(lang, levelStyle, filledLevelColor, emptyLevelColor)
              : null;

            return (
              <div key={lang.id}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium" style={{ color: textColorStyle }}>
                    {lang.name}
                  </span>
                  {langSettings.showLevel && levelStyle !== 'text' && (
                    <span className="text-xs" style={{ color: secondaryColor }}>
                      {getProficiencyLabel(lang.proficiency)}
                    </span>
                  )}
                </div>
                {indicator && <div className="mt-0.5">{indicator}</div>}
              </div>
            );
          })}
        </div>
      );
    }

    if (langSettings.displayStyle === 'compact') {
      return renderSeparatedItems(compactItems, separatorStyle, textColorStyle, separatorColor);
    }

    if (langSettings.displayStyle === 'bubble') {
      return (
        <div className="flex flex-wrap gap-1.5">
          {languages.map((lang) => (
            <span
              key={lang.id}
              className="px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: chipBg, color: textColorStyle }}
            >
              {lang.name}
              {langSettings.showLevel && renderSubinfoNode(getProficiencyLabel(lang.proficiency), subinfoStyle, secondaryColor)}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-1.5">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-2">
            <span className="font-medium" style={{ color: textColorStyle }}>
              {lang.name}
            </span>
            {langSettings.showLevel && renderLanguageLevelIndicator(lang, levelStyle, filledLevelColor, emptyLevelColor)}
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = (forSidebar: boolean = false) => {
    if (certifications.length === 0) return null;

    const displayStyle = certSettings.displayStyle || 'compact';
    const separatorStyle: CompactSeparatorStyle = certSettings.compactSeparator || 'bullet';
    const subinfoStyle: SubinfoStyle = certSettings.subinfoStyle || 'dash';
    const columns = Math.max(1, certSettings.columns || 2);
    const textColorStyle = forSidebar ? 'rgba(255,255,255,0.95)' : textColor;
    const secondaryColor = forSidebar ? 'rgba(255,255,255,0.75)' : '#475569';
    const chipBg = forSidebar ? 'rgba(255,255,255,0.12)' : `${accentColor}20`;
    const separatorColor = forSidebar ? 'rgba(255,255,255,0.5)' : '#94a3b8';
    const borderColor = forSidebar ? 'rgba(255,255,255,0.25)' : '#e5e7eb';
    const timelineColor = forSidebar ? 'rgba(255,255,255,0.3)' : '#e5e7eb';

    const buildCertMeta = (cert: CertificationEntry) => {
      const parts = [cert.issuer, cert.date ? fmtDate(cert.date) : undefined].filter(Boolean);
      return parts.join(' • ');
    };

    const compactItems = certifications.map((cert) => (
      <span key={cert.id} className="font-medium">
        {cert.name}
        {renderSubinfoNode(buildCertMeta(cert), subinfoStyle, secondaryColor)}
      </span>
    ));

    if (displayStyle === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: '8px' }}>
          {certifications.map((cert) => {
            const meta = buildCertMeta(cert);
            return (
              <div
                key={cert.id}
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ borderColor, backgroundColor: forSidebar ? 'rgba(255,255,255,0.05)' : 'transparent' }}
              >
                <p className="font-semibold" style={{ color: textColorStyle }}>{cert.name}</p>
                {meta && (
                  <p className="mt-0.5 text-[11px]" style={{ color: secondaryColor }}>
                    {meta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (displayStyle === 'level') {
      return (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                {index !== certifications.length - 1 && (
                  <span className="flex-1 w-px mt-1" style={{ backgroundColor: timelineColor }} />
                )}
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold" style={{ color: textColorStyle }}>{cert.name}</span>
                  {cert.date && (
                    <span style={{ color: secondaryColor }}>{fmtDate(cert.date)}</span>
                  )}
                </div>
                {cert.issuer && (
                  <p className="mt-0.5 text-[11px]" style={{ color: secondaryColor }}>{cert.issuer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (displayStyle === 'compact') {
      return renderSeparatedItems(compactItems, separatorStyle, textColorStyle, separatorColor);
    }

    if (displayStyle === 'bubble') {
      return (
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((cert) => (
            <span
              key={cert.id}
              className="px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: chipBg, color: textColorStyle }}
            >
              {cert.name}
              {renderSubinfoNode(buildCertMeta(cert), subinfoStyle, secondaryColor)}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
        {certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between">
            <div>
              <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600, color: forSidebar ? '#ffffff' : textColor }}>
                {cert.name}
              </h3>
              {cert.issuer && (
                <p className="text-xs" style={{ opacity: reduceDateOpacity ? 0.6 : 0.8, color: secondaryColor }}>
                  {cert.issuer}
                </p>
              )}
            </div>
            {cert.date && (
              <span className="text-xs" style={{ opacity: reduceDateOpacity ? 0.5 : 0.7, color: secondaryColor }}>
                {fmtDate(cert.date)}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render entry with subtitle placement handling
  const renderEntry = (
    title: string, 
    subtitle: string, 
    date: string, 
    location?: string, 
    description?: string,
    forSidebar: boolean = false
  ) => {
    const dateOpacity = reduceDateOpacity ? 0.5 : 0.7;
    const subtitleOnSameLine = entryLayout.subtitlePlacement === 'same-line';
    
    return (
      <div>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {subtitleOnSameLine ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600, color: forSidebar ? '#ffffff' : undefined }}>
                  {title}
                </h3>
                {subtitle && (
                  <span 
                    className="text-xs"
                    style={{ 
                      fontStyle: entryLayout.subtitleStyle === 'italic' ? 'italic' : 'normal',
                      fontWeight: entryLayout.subtitleStyle === 'bold' ? 600 : 400,
                      color: forSidebar ? 'rgba(255,255,255,0.8)' : undefined 
                    }}
                  >
                    | {subtitle}
                  </span>
                )}
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600, color: forSidebar ? '#ffffff' : undefined }}>
                  {title}
                </h3>
                {subtitle && (
                  <p 
                    className="text-xs mt-0.5"
                    style={{ 
                      fontStyle: entryLayout.subtitleStyle === 'italic' ? 'italic' : 'normal',
                      fontWeight: entryLayout.subtitleStyle === 'bold' ? 600 : 400,
                      color: forSidebar ? 'rgba(255,255,255,0.8)' : undefined 
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </>
            )}
            {location && (
              <p className="text-xs" style={{ opacity: 0.7, color: forSidebar ? 'rgba(255,255,255,0.7)' : undefined }}>
                {location}
              </p>
            )}
          </div>
          {date && (
            <span 
              className="text-xs whitespace-nowrap ml-2" 
              style={{ 
                opacity: dateOpacity,
                color: forSidebar ? 'rgba(255,255,255,0.7)' : (colors.applyAccentTo.dates ? accentColor : undefined)
              }}
            >
              {date}
            </span>
          )}
        </div>
        {description && (
          <div 
            className="mt-1.5 text-xs"
            style={{ 
              paddingLeft: entryLayout.indentDescription ? '12px' : 0,
              color: forSidebar ? 'rgba(255,255,255,0.9)' : undefined 
            }}
          >
            {description.split('\n').filter(line => line.trim()).map((line, i) => (
              <p key={i} className="flex items-start gap-1.5 mb-0.5">
                {getListMarker() && <span className="flex-shrink-0">{getListMarker()}</span>}
                <span>{line.replace(/^[•\-–→]\s*/, '')}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getSectionContainerStyle = (forSidebar: boolean = false): React.CSSProperties => {
    const style: React.CSSProperties = {
      marginBottom: `${spacing.sectionSpacing}px`,
    };

    if (isEdgeProfileTemplate && !forSidebar) {
      style.paddingBottom = '12px';
      style.borderBottom = '1px solid #ece7e1';
    }

    return style;
  };

  const renderSectionContent = (section: typeof enabledSections[0], forSidebar: boolean = false) => {
    const sectionTitle = section.title;
    
    switch (section.type) {
      case 'summary':
        if (!summary) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            <p className="text-xs leading-relaxed" style={{ color: forSidebar ? 'rgba(255,255,255,0.9)' : undefined }}>{summary}</p>
          </div>
        );
      
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
              {experience.map((exp) => {
                const title = expSettings?.titleOrder === 'company-position' ? exp.company : exp.position;
                const subtitle = expSettings?.titleOrder === 'company-position' ? exp.position : exp.company;
                const dateStr = exp.current ? `${fmtDate(exp.startDate)} – Present` : `${fmtDate(exp.startDate)} – ${fmtDate(exp.endDate)}`;
                return (
                  <div key={exp.id}>
                    {renderEntry(title, subtitle, dateStr, exp.location, exp.description, forSidebar)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'education':
        if (education.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
              {education.map((edu) => {
                const title = eduSettings?.titleOrder === 'school-degree' ? edu.institution : `${edu.degree} in ${edu.field}`;
                const subtitle = eduSettings?.titleOrder === 'school-degree' ? `${edu.degree} in ${edu.field}` : edu.institution;
                const dateStr = edu.current ? `${fmtDate(edu.startDate)} – Present` : `${fmtDate(edu.startDate)} – ${fmtDate(edu.endDate)}`;
                return (
                  <div key={edu.id}>
                    {renderEntry(title, subtitle, dateStr, edu.location, edu.description, forSidebar)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            {renderSkills(forSidebar)}
          </div>
        );
      
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
              {projects.map((proj) => {
                const dateStr = proj.startDate && proj.endDate ? `${fmtDate(proj.startDate)} – ${fmtDate(proj.endDate)}` : '';
                return (
                  <div key={proj.id}>
                    {renderEntry(proj.name, '', dateStr, undefined, proj.description, forSidebar)}
                    {proj.url && (
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: forSidebar ? 'rgba(255,255,255,0.7)' : accentColor }}>
                        <Globe className="w-3 h-3" />
                        {proj.url}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            {renderCertifications(forSidebar)}
          </div>
        );
      
      case 'languages':
        if (languages.length === 0) return null;
        return (
          <div style={getSectionContainerStyle(forSidebar)}>
            {renderHeading(sectionTitle, section.type, forSidebar)}
            {renderLanguages(forSidebar)}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStandardHeader = () => (
    <div
      className="mb-4"
      style={{
        textAlign,
        display: pdSettings.showPhoto && personalDetails.photo && pdSettings.photoPosition !== 'top' ? 'flex' : 'block',
        alignItems: 'flex-start',
        gap: '16px',
        flexDirection: pdSettings.photoPosition === 'left' ? 'row' : 'row-reverse',
      }}
    >
      {pdSettings.photoPosition !== 'top' && renderPhoto()}
      
      <div className="flex-1">
        {pdSettings.photoPosition === 'top' && (
          <div className="flex justify-center mb-3">
            {renderPhoto()}
          </div>
        )}
        
        <h1
          style={{
            fontSize: `${nameSize}pt`,
            fontWeight: pdSettings.nameBold ? 700 : 600,
            fontFamily: headingFont,
            color: colors.applyAccentTo.name ? accentColor : textColor,
          }}
        >
          {personalDetails.fullName || 'Your Name'}
        </h1>
        
        {personalDetails.jobTitle && pdSettings.titlePosition === 'same-line' && (
          <span
            className="ml-2"
            style={{
              fontSize: `${titleSize}pt`,
              fontStyle: pdSettings.titleStyle === 'italic' ? 'italic' : 'normal',
              fontWeight: pdSettings.titleStyle === 'bold' ? 600 : 400,
              color: colors.applyAccentTo.jobTitle ? accentColor : `${textColor}99`,
            }}
          >
            | {personalDetails.jobTitle}
          </span>
        )}
        
        {personalDetails.jobTitle && pdSettings.titlePosition === 'below' && (
          <p
            style={{
              fontSize: `${titleSize}pt`,
              fontStyle: pdSettings.titleStyle === 'italic' ? 'italic' : 'normal',
              fontWeight: pdSettings.titleStyle === 'bold' ? 600 : 400,
              color: colors.applyAccentTo.jobTitle ? accentColor : `${textColor}99`,
              marginTop: '2px',
            }}
          >
            {personalDetails.jobTitle}
          </p>
        )}

        {/* Contact Info */}
        <div
          className="mt-2 flex flex-wrap gap-x-3 gap-y-1"
          style={{ justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start' }}
        >
          {headerContactItems.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && !showIcons && (
                <span className="text-xs opacity-50">{getContactSeparator()}</span>
              )}
              <span className="text-xs">
                {renderContactItem(item.platform, item.displayText, showIcons, item.value)}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEdgeHeader = () => {
    const headerVerticalPadding = Math.max(pagePaddingY * 0.9, 28);
    const photoSize = pdSettings.photoSize + 20;
    const photoNode = renderPhotoWithFallback(photoSize);

    return (
      <div
        className="mb-6"
        style={{
          margin: `-${pagePaddingY}px -${pagePaddingX}px ${spacing.sectionSpacing}px`,
          padding: `${headerVerticalPadding}px ${pagePaddingX}px`,
          backgroundColor: '#f5f0eb',
          borderBottom: '1px solid #e2dcd4',
        }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-start gap-4 flex-1 min-w-[260px]">
            {photoNode && <div className="flex-shrink-0">{photoNode}</div>}
            <div>
              <h1
                style={{
                  fontSize: `${nameSize * 0.95}pt`,
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  color: '#2f2a26',
                  fontFamily: headingFont,
                  marginBottom: '4px',
                }}
              >
                {personalDetails.fullName || 'Brian T. Wayne'}
              </h1>
              {personalDetails.jobTitle && (
                <p
                  style={{
                    fontSize: `${titleSize * 1.05}pt`,
                    color: '#5f5a54',
                    fontWeight: 500,
                    marginBottom: '4px',
                  }}
                >
                  {personalDetails.jobTitle}
                </p>
              )}
              {personalDetails.location && (
                <p
                  style={{
                    fontSize: `${fontSize * 0.85}pt`,
                    color: '#6b655f',
                  }}
                >
                  {personalDetails.location}
                </p>
              )}
            </div>
          </div>

          {headerContactItems.length > 0 && (
            <div className="flex flex-col gap-1 min-w-[220px] flex-none" style={{ textAlign: 'right' }}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8c847c] mb-1">
                Contact
              </span>
              {headerContactItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-end text-xs font-medium"
                  style={{ color: '#5c5852' }}
                >
                  {renderContactItem(item.platform, item.displayText, true, item.value)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Two-column layout
  if (isSidebarLayout) {
    return (
      <div
        className="w-full h-full flex"
        style={{
          fontFamily,
          fontSize: `${fontSize}pt`,
          lineHeight,
          color: textColor,
          backgroundColor: bgColor,
        }}
      >
        {/* Sidebar */}
        <div
          className="flex flex-col"
          style={{
            width: '35%',
            backgroundColor: accentColor,
            padding: `${mmToPx(spacing.topBottomMargin)}px ${mmToPx(spacing.leftRightMargin * 0.8)}px`,
          }}
        >
          {/* Photo, Name, and Job Title centered in Sidebar (always shown) */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex justify-center w-full">
              {renderPhoto(70, true)}
            </div>
            <div className="flex flex-col items-center mt-3 w-full">
              <h1
                className="text-center"
                style={{
                  fontSize: `${nameSize * 0.8}pt`,
                  fontWeight: pdSettings.nameBold ? 700 : 600,
                  fontFamily: headingFont,
                  color: '#ffffff',
                  wordBreak: 'break-word',
                }}
              >
                {personalDetails.fullName || 'Your Name'}
              </h1>
              {personalDetails.jobTitle && (
                <p
                  className="text-center"
                  style={{
                    fontSize: `${titleSize * 0.9}pt`,
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: '4px',
                    wordBreak: 'break-word',
                  }}
                >
                  {personalDetails.jobTitle}
                </p>
              )}
            </div>
          </div>

          {/* Contact in Sidebar */}
          <div className="mb-6">
            <div className="space-y-1.5">
              {allContactItems.map((item, i) => (
                <div key={i}>
                  {renderContactItem(item.platform, item.displayText, true, item.value, true)}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Sections */}
          {sidebarSections.map((section) => renderSectionContent(section, true))}
        </div>

        {/* Main Content */}
        <div
          className="flex-1"
          style={{
            padding: `${mmToPx(spacing.topBottomMargin)}px ${mmToPx(spacing.leftRightMargin)}px`,
          }}
        >
          {/* Remove name and job title from main content in sidebar layout */}
          {mainSections.map((section) =>
            section.type === 'personal' ? null : renderSectionContent(section, false)
          )}
        </div>
      </div>
    );
  }

  // Single column layout
  return (
    <div
      className="w-full h-full"
      style={{
        fontFamily,
        fontSize: `${fontSize}pt`,
        lineHeight,
        color: textColor,
        backgroundColor: bgColor,
        padding: `${pagePaddingY}px ${pagePaddingX}px`,
      }}
    >
      {/* Header / Personal Details */}
      {isEdgeProfileTemplate ? renderEdgeHeader() : renderStandardHeader()}

      {/* Sections */}
      {enabledSections.filter(s => s.type !== 'personal').map((section) => renderSectionContent(section, false))}
    </div>
  );
};
