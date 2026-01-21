import React, { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { Resume, migrateResumeSettings } from '@/types/resume';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface MultiPageResumePreviewProps {
  resume: Resume;
  scale?: number;
}

const INCH_TO_PX = 96;
const MM_TO_INCH = 0.0393701;

// Shared helpers
const getPlatformIcon = (platform: string, className: string = 'w-4 h-4'): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    email: <Mail className={className} />,
    phone: <Phone className={className} />,
    location: <MapPin className={className} />,
    website: <Globe className={className} />,
    linkedin: <Linkedin className={className} />,
    github: <Github className={className} />,
  };
  return icons[platform] || <Globe className={className} />;
};

const buildContactItems = (personalDetails: any) => {
  const profileLinks = personalDetails.profileLinks || [];
  const legacyContacts = [
    { platform: 'email', value: personalDetails.email, displayText: personalDetails.email },
    { platform: 'phone', value: personalDetails.phone, displayText: personalDetails.phone },
    { platform: 'location', value: personalDetails.location, displayText: personalDetails.location },
    { platform: 'website', value: personalDetails.website, displayText: personalDetails.website },
    { platform: 'linkedin', value: personalDetails.linkedin, displayText: personalDetails.linkedin },
    { platform: 'github', value: personalDetails.github, displayText: personalDetails.github },
  ].filter((item) => item.value);

  return [
    ...legacyContacts,
    ...profileLinks.filter((l: any) => l.enabled && l.url).map((l: any) => ({ platform: l.platform, value: l.url, displayText: l.displayText || l.url })),
  ];
};

export const MultiPageResumePreview = forwardRef<HTMLDivElement, MultiPageResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const measureRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);
    
    const settings = migrateResumeSettings(resume.settings);
    const { spacing, regional } = settings;
    
    // Get page dimensions based on format
    const isLetter = regional.pageFormat === 'letter';
    const PAGE_WIDTH_INCHES = isLetter ? 8.5 : 8.27; 
    const PAGE_HEIGHT_INCHES = isLetter ? 11 : 11.69;
    
    // Convert mm margins to inches then to pixels
    const marginTopPx = spacing.topBottomMargin * MM_TO_INCH * INCH_TO_PX;
    const marginBottomPx = spacing.topBottomMargin * MM_TO_INCH * INCH_TO_PX;
    const marginLeftPx = spacing.leftRightMargin * MM_TO_INCH * INCH_TO_PX;
    const marginRightPx = spacing.leftRightMargin * MM_TO_INCH * INCH_TO_PX;
    
    const pageHeightPx = PAGE_HEIGHT_INCHES * INCH_TO_PX;
    const pageWidthPx = PAGE_WIDTH_INCHES * INCH_TO_PX;
    
    // When multi-page, bottom margin = top margin for consistency
    const effectiveBottomMargin = marginTopPx;
    const usableHeightPerPage = pageHeightPx - marginTopPx - effectiveBottomMargin;

    const calculatePages = useCallback(() => {
      if (!measureRef.current) return;
      
      const contentHeight = measureRef.current.scrollHeight;
      const newPageCount = Math.max(1, Math.ceil(contentHeight / usableHeightPerPage));
      
      if (newPageCount !== pageCount) {
        setPageCount(newPageCount);
      }
    }, [usableHeightPerPage, pageCount]);

    useEffect(() => {
      // Initial calculation with a small delay to ensure render is complete
      const timer = setTimeout(calculatePages, 50);
      
      const resizeObserver = new ResizeObserver(() => {
        calculatePages();
      });

      if (measureRef.current) {
        resizeObserver.observe(measureRef.current);
      }

      // Also observe mutations for content changes
      const mutationObserver = new MutationObserver(() => {
        setTimeout(calculatePages, 10);
      });

      if (measureRef.current) {
        mutationObserver.observe(measureRef.current, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }, [calculatePages]);

    const isSidebarLayout = settings.layout === 'two-column';
    const sidebarWidthPercent = 33.33;
    const sidebarWidthPx = isSidebarLayout ? (pageWidthPx * sidebarWidthPercent) / 100 : 0;

    return (
      <div className="flex flex-col items-center gap-8" ref={ref}>
        {/* Hidden measurement container - renders full content without clipping */}
        <div
          ref={measureRef}
          className="absolute opacity-0 pointer-events-none"
          style={{
            width: `${pageWidthPx}px`,
            left: '-9999px',
          }}
        >
          <ProfessionalTemplate resume={resume} />
        </div>

        {/* Render each page */}
        {Array.from({ length: pageCount }, (_, pageIndex) => (
          <div
            key={pageIndex}
            className="resume-page bg-white rounded-sm shadow-lg overflow-hidden origin-top relative"
            style={{
              width: `${pageWidthPx}px`,
              height: `${pageHeightPx}px`,
              transform: `scale(${scale})`,
              marginBottom: pageIndex < pageCount - 1 ? `${(scale - 1) * pageHeightPx + 16}px` : 0,
            }}
          >
            {/* Content viewport - clips to show only this page's content */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                paddingTop: `${marginTopPx}px`,
                paddingBottom: `${effectiveBottomMargin}px`,
                // Sidebar extends full height, so no left/right padding when sidebar is present
                paddingLeft: isSidebarLayout ? `${sidebarWidthPx}px` : `${marginLeftPx}px`,
                paddingRight: `${marginRightPx}px`,
              }}
            >
              {/* Full content, translated to show correct page section */}
              <div
                className="relative h-full overflow-hidden"
              >
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: `${-pageIndex * usableHeightPerPage}px`,
                    width: '100%',
                  }}
                >
                  {/* Render only main content without sidebar wrapper */}
                  <MainContentOnly resume={resume} />
                </div>
              </div>
            </div>

            {/* Sidebar overlay - extends full height with no margin on all pages */}
            {isSidebarLayout && (
              <div
                className="absolute top-0 bottom-0 left-0 overflow-hidden"
                style={{
                  width: `${sidebarWidthPx}px`,
                }}
              >
                <div
                  style={{
                    transform: `translateY(${-pageIndex * pageHeightPx}px)`,
                    height: `${pageCount * pageHeightPx}px`,
                  }}
                >
                  <SidebarContent 
                    resume={resume} 
                    pageHeightPx={pageHeightPx}
                    pageCount={pageCount}
                  />
                </div>
              </div>
            )}

            {/* Page number footer */}
            {pageCount > 1 && settings.footer.showPageNumbers && (
              <div 
                className="absolute bottom-2 right-4 text-xs"
                style={{ color: settings.colors.textColor || '#666' }}
              >
                {pageIndex + 1} / {pageCount}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

// Sidebar content component for consistent rendering across pages
const SidebarContent: React.FC<{ 
  resume: Resume; 
  pageHeightPx: number;
  pageCount: number;
}> = ({ resume, pageHeightPx, pageCount }) => {
  const settings = migrateResumeSettings(resume.settings);
  const { personalDetails, skills, languages, certifications, sections } = resume;
  const { colors, spacing, headings, skills: skillsSettings, languages: langSettings, personalDetails: pdSettings, font } = settings;
  const headingFont = font?.useCreativeHeadingFont ? font.headingFontFamily : font?.fontFamily;

  const mmToPx = (mm: number) => mm * 3.78;
  const pagePaddingY = mmToPx(spacing.topBottomMargin);
  const pagePaddingX = mmToPx(spacing.leftRightMargin);

  const sidebarSectionTypes = ['skills', 'languages', 'certifications'];
  const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  const sidebarSections = enabledSections.filter(s => sidebarSectionTypes.includes(s.type));

  const renderSidebarHeading = (title: string) => (
    <h3 
      className="text-sm font-semibold uppercase tracking-wider mb-3 border-b border-white/30 pb-2"
      style={{
        textTransform: headings.capitalization === 'uppercase' ? 'uppercase' : 
                       headings.capitalization === 'capitalize' ? 'capitalize' : 'none',
      }}
    >
      {title}
    </h3>
  );

  // Build contact items from legacy fields and profile links
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
    ...profileLinks.filter(l => l.enabled && l.url).map(l => ({ platform: l.platform, value: l.url, displayText: l.displayText || l.url })),
  ];

  

  return (
    <div 
      className="text-white h-full"
      style={{ 
        backgroundColor: colors.accentColor || '#1a365d',
        padding: `${pagePaddingY}px ${pagePaddingX}px`,
        minHeight: `${pageCount * pageHeightPx}px`,
      }}
    >
      {/* Photo */}
      {pdSettings.showPhoto && personalDetails.photo && (
        <div className="mb-6 flex justify-center">
          <img
            src={personalDetails.photo}
            alt={personalDetails.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-white/30"
            style={{
              borderRadius: pdSettings.photoShape === 'circle' ? '50%' : 
                           pdSettings.photoShape === 'rounded' ? '12px' : '4px',
              width: pdSettings.photoSize || 80,
              height: pdSettings.photoSize || 80,
            }}
          />
        </div>
      )}

      {/* Name & Job Title under photo */}
      <div className="mb-6 text-center">
        {personalDetails.fullName && (
          <h1
            className="mb-1"
            style={{
              fontSize: `${spacing.fontSize * (pdSettings.nameSize === 'xs' ? 0.75 : pdSettings.nameSize === 's' ? 0.85 : pdSettings.nameSize === 'l' ? 1.15 : pdSettings.nameSize === 'xl' ? 1.3 : 1) * 1.6}pt`,
              fontWeight: pdSettings.nameBold ? 700 : 600,
              color: '#ffffff',
              fontFamily: headingFont,
            }}
          >
            {personalDetails.fullName}
          </h1>
        )}

        {personalDetails.jobTitle && (
          <p style={{ fontSize: `${spacing.fontSize * (pdSettings.titleSize === 'xs' ? 0.75 : pdSettings.titleSize === 's' ? 0.85 : pdSettings.titleSize === 'l' ? 1.15 : pdSettings.titleSize === 'xl' ? 1.3 : 1) * 1}pt`, color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
            {personalDetails.jobTitle}
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        {renderSidebarHeading('Contact')}
        <div className="space-y-2 text-xs">
          {allContactItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 break-all">
              {pdSettings.arrangement === 'icon' && (
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>{getPlatformIcon(item.platform, 'w-4 h-4')}</span>
              )}
              {pdSettings.arrangement === 'bullet' && <span className="text-white">•</span>}
              <span>{item.displayText}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Render sidebar sections in order */}
      {sidebarSections.map((section) => {
        if (section.type === 'skills' && skills.length > 0) {
          return (
            <div key={section.id} className="mb-6">
              {renderSidebarHeading(section.title)}
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                    </div>
                    {skillsSettings.showLevel && (
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div
                          className="bg-white rounded-full h-1.5"
                          style={{ 
                            width: `${
                              skill.level === 'expert' ? 100 :
                              skill.level === 'advanced' ? 75 :
                              skill.level === 'intermediate' ? 50 : 25
                            }%` 
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === 'languages' && languages.length > 0) {
          return (
            <div key={section.id} className="mb-6">
              {renderSidebarHeading(section.title)}
              <div className="space-y-1 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="opacity-80 capitalize">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === 'certifications' && certifications.length > 0) {
          return (
            <div key={section.id} className="mb-6">
              {renderSidebarHeading(section.title)}
              <div className="space-y-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium">{cert.name}</div>
                    <div className="opacity-80">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

// Main content without sidebar wrapper for multi-page rendering
const MainContentOnly: React.FC<{ resume: Resume }> = ({ resume }) => {
  const settings = migrateResumeSettings(resume.settings);
  const { personalDetails, summary, experience, education, skills, projects, certifications, languages, sections } = resume;
  const { spacing, colors, font, headings, entryLayout, personalDetails: pdSettings, regional, experience: expSettings, education: eduSettings, footer } = settings;

  const isSidebarLayout = settings.layout === 'two-column';
  const fontSize = spacing.fontSize;
  const fontFamily = font.fontFamily;
  const headingFont = font.useCreativeHeadingFont ? font.headingFontFamily : font.fontFamily;
  const accentColor = colors.accentColor;
  const textColor = colors.mode === 'advanced' ? colors.textColor : '#1a1a1a';
  const reduceDateOpacity = footer?.reduceDateOpacity || false;

  const mmToPx = (mm: number) => mm * 3.78;
  const pagePaddingX = mmToPx(spacing.leftRightMargin);
  const pagePaddingY = mmToPx(spacing.topBottomMargin);

  const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  
  // For sidebar layout, main content excludes skills, languages, certifications
  const sidebarSectionTypes = ['skills', 'languages', 'certifications'];
  const mainSections = isSidebarLayout 
    ? enabledSections.filter(s => !sidebarSectionTypes.includes(s.type) && s.type !== 'personal')
    : enabledSections;

  const getSizeMultiplier = (size: string): number => {
    const multipliers: Record<string, number> = { xs: 0.75, s: 0.85, m: 1, l: 1.15, xl: 1.3 };
    return multipliers[size] || 1;
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const nameSize = fontSize * getSizeMultiplier(pdSettings.nameSize) * 2;
  const titleSize = fontSize * getSizeMultiplier(pdSettings.titleSize) * 1.1;
  const entryTitleSize = fontSize * getSizeMultiplier(entryLayout.titleSize);

  const renderHeading = (title: string) => {
    const size = fontSize * getSizeMultiplier(headings.size) * 1.1;
    const lineColor = colors.applyAccentTo.headingLine ? accentColor : '#e5e5e5';
    
    return (
      <div className="mb-3" style={{ marginTop: `${spacing.sectionSpacing}px` }}>
        <h2 
          className="flex items-center gap-2"
          style={{
            fontSize: `${size}pt`,
            fontFamily: headingFont,
            fontWeight: 600,
            textTransform: headings.capitalization === 'uppercase' ? 'uppercase' : 
                          headings.capitalization === 'capitalize' ? 'capitalize' : 'none',
            color: colors.applyAccentTo.headings ? accentColor : textColor,
          }}
        >
          <span>{title}</span>
          {headings.style === 'accent-line' && (
            <div className="flex-1 h-px ml-2" style={{ backgroundColor: lineColor }} />
          )}
        </h2>
        {headings.style === 'line-below' && (
          <div className="h-px w-full mt-1" style={{ backgroundColor: lineColor }} />
        )}
      </div>
    );
  };

  const getListMarker = () => {
    const markers: Record<string, string> = { bullet: '•', hyphen: '–', arrow: '→', none: '' };
    return markers[entryLayout.listStyle] || '•';
  };

  return (
    <div 
      style={{ 
        fontFamily, 
        fontSize: `${fontSize}pt`,
        lineHeight: spacing.lineHeight,
        color: textColor,
        padding: isSidebarLayout ? `${pagePaddingY}px ${pagePaddingX}px` : `${pagePaddingY}px ${pagePaddingX}px`,
      }}
    >
      {/* Header / Personal Details (only for non-sidebar layouts) */}
      {!isSidebarLayout && (
        <div className="mb-4" style={{ textAlign: pdSettings.align }}>
          <h1 
            style={{ 
              fontSize: `${nameSize}pt`,
              fontWeight: pdSettings.nameBold ? 700 : 400,
              color: colors.applyAccentTo.name ? accentColor : textColor,
              marginBottom: '4px',
            }}
          >
            {personalDetails.fullName || 'Your Name'}
          </h1>
          {personalDetails.jobTitle && (
            <p 
              style={{ 
                fontSize: `${titleSize}pt`,
                color: colors.applyAccentTo.jobTitle ? accentColor : textColor,
                fontStyle: pdSettings.titleStyle === 'italic' ? 'italic' : 'normal',
                fontWeight: pdSettings.titleStyle === 'bold' ? 600 : 400,
              }}
            >
              {personalDetails.jobTitle}
            </p>
          )}

          {/* Build contact items for header */}
          {(() => {
            const profileLinks = personalDetails.profileLinks || [];
            const legacyContacts = [
              { platform: 'email', value: personalDetails.email, displayText: personalDetails.email },
              { platform: 'phone', value: personalDetails.phone, displayText: personalDetails.phone },
              { platform: 'location', value: personalDetails.location, displayText: personalDetails.location },
              { platform: 'website', value: personalDetails.website, displayText: personalDetails.website },
            ].filter(item => item.value);

            const headerContactItems = [
              ...legacyContacts,
              ...profileLinks.filter(l => l.enabled && l.url).map(l => ({ platform: l.platform, value: l.url, displayText: l.displayText || l.url })),
            ];

            const sep = pdSettings.arrangement === 'bullet' ? ' • ' : pdSettings.arrangement === 'bar' ? ' | ' : pdSettings.arrangement === 'comma' ? ', ' : ' ';

            return (
              <div 
                className="flex flex-wrap gap-2 mt-2 text-xs"
                style={{ justifyContent: pdSettings.align === 'center' ? 'center' : pdSettings.align === 'right' ? 'flex-end' : 'flex-start' }}
              >
                {headerContactItems.map((item, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && pdSettings.arrangement !== 'icon' && <span>{sep}</span>}
                    <span className={pdSettings.arrangement === 'icon' ? 'flex items-center gap-1' : undefined}>
                      {pdSettings.arrangement === 'icon' && <span className="inline-block mr-1">{getPlatformIcon(item.platform, 'w-3 h-3')}</span>}
                      {item.displayText}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Render main sections */}
      {mainSections.map((section) => {
        if (section.type === 'summary' && summary) {
          const summaryShiftPx = isSidebarLayout ? -(pagePaddingY * 1.15) : 0;
          return (
            <div key={section.id} style={isSidebarLayout ? { marginTop: `${summaryShiftPx}px` } : undefined}>
              {renderHeading(section.title)}
              <p className="text-xs leading-relaxed">{summary}</p>
            </div>
          );
        }

        if (section.type === 'experience' && experience.length > 0) {
          return (
            <div key={section.id}>
              {renderHeading(section.title)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
                {experience.map((exp) => {
                  const isPositionFirst = expSettings.titleOrder === 'position-company';
                  const primary = isPositionFirst ? exp.position : exp.company;
                  const secondary = isPositionFirst ? exp.company : exp.position;
                  
                  return (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600 }}>{primary}</h3>
                          <p 
                            className="text-xs"
                            style={{ 
                              fontStyle: entryLayout.subtitleStyle === 'italic' ? 'italic' : 'normal',
                              fontWeight: entryLayout.subtitleStyle === 'bold' ? 600 : 400,
                            }}
                          >
                            {secondary}{exp.location && ` • ${exp.location}`}
                          </p>
                        </div>
                        <span 
                          className="text-xs whitespace-nowrap"
                          style={{ opacity: reduceDateOpacity ? 0.7 : 1 }}
                        >
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <div 
                          className="text-xs mt-1 whitespace-pre-wrap"
                          style={{ paddingLeft: entryLayout.indentDescription ? '12px' : 0 }}
                        >
                          {exp.description.split('\n').map((line, i) => (
                            <div key={i}>
                              {entryLayout.listStyle !== 'none' && line.trim() && (
                                <span className="mr-1">{getListMarker()}</span>
                              )}
                              {line}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (section.type === 'education' && education.length > 0) {
          return (
            <div key={section.id}>
              {renderHeading(section.title)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
                {education.map((edu) => {
                  const isDegreeFirst = eduSettings.titleOrder === 'degree-school';
                  const primary = isDegreeFirst ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}` : edu.institution;
                  const secondary = isDegreeFirst ? edu.institution : `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`;
                  
                  return (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600 }}>{primary}</h3>
                          <p className="text-xs">{secondary}</p>
                        </div>
                        <span 
                          className="text-xs whitespace-nowrap"
                          style={{ opacity: reduceDateOpacity ? 0.7 : 1 }}
                        >
                          {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-xs mt-1">{edu.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (section.type === 'projects' && projects.length > 0) {
          return (
            <div key={section.id}>
              {renderHeading(section.title)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start">
                      <h3 style={{ fontSize: `${entryTitleSize}pt`, fontWeight: 600 }}>{project.name}</h3>
                      {(project.startDate || project.endDate) && (
                        <span className="text-xs whitespace-nowrap" style={{ opacity: reduceDateOpacity ? 0.7 : 1 }}>
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </span>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-xs mt-1">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // For non-sidebar layouts, render skills, languages, certifications in main content
        if (!isSidebarLayout) {
          if (section.type === 'skills' && skills.length > 0) {
            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: `${accentColor}15`, color: textColor }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          if (section.type === 'languages' && languages.length > 0) {
            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                <div className="flex flex-wrap gap-4 text-xs">
                  {languages.map((lang) => (
                    <span key={lang.id}>
                      <strong>{lang.name}</strong> - <span className="capitalize">{lang.proficiency}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          if (section.type === 'certifications' && certifications.length > 0) {
            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <strong>{cert.name}</strong> - {cert.issuer}
                      {cert.date && <span className="ml-2 opacity-70">{formatDate(cert.date)}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        }

        return null;
      })}
    </div>
  );
};

MultiPageResumePreview.displayName = 'MultiPageResumePreview';