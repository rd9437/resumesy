import React, { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { Resume, migrateResumeSettings, CompactSeparatorStyle, LevelIndicatorStyle, SubinfoStyle } from '@/types/resume';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, BookOpen, Palette, GitBranch, Facebook, Instagram, Youtube, Video, Send, MessageCircle, MessageSquare, Hash, CircleDot, Music, Tv, Package, Database, Code2, Terminal, ShoppingBag, Calendar, Link2, Briefcase, GraduationCap, Link, Image, Layout } from 'lucide-react';

interface MultiPageResumePreviewProps {
  resume: Resume;
  scale?: number;
}

const INCH_TO_PX = 96;
const MM_TO_INCH = 0.0393701;

// Shared helpers
const getPlatformIcon = (platform: string, className: string = 'w-4 h-4'): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    // Basic contact types
    email: <Mail className={className} />,
    phone: <Phone className={className} />,
    location: <MapPin className={className} />,
    website: <Globe className={className} />,

    // Major social / professional
    linkedin: <Linkedin className={className} />,
    github: <Github className={className} />,
    gitlab: <GitBranch className={className} />,
    bitbucket: <GitBranch className={className} />,

    // Developer / code platforms
    leetcode: <Code2 className={className} />,
    kaggle: <Database className={className} />,
    stackoverflow: <Code2 className={className} />,
    codepen: <Code2 className={className} />,
    codeforces: <Code2 className={className} />,
    git: <GitBranch className={className} />,
    npm: <Package className={className} />,
    npmjs: <Package className={className} />,

    // Social networks
    twitter: <Twitter className={className} />,
    x: <Twitter className={className} />,
    facebook: <Facebook className={className} />,
    instagram: <Instagram className={className} />,
    youtube: <Youtube className={className} />,
    tiktok: <Video className={className} />,
    snapchat: <Tv className={className} />,
    twitch: <Tv className={className} />,
    tumblr: <BookOpen className={className} />,

    // Creative / design
    dribbble: <Palette className={className} />,
    behance: <Palette className={className} />,
    figma: <Palette className={className} />,
    artstation: <Palette className={className} />,
    deviantart: <Palette className={className} />,
    unsplash: <Image className={className} />,

    // Media / audio
    spotify: <Music className={className} />,
    soundcloud: <Music className={className} />,
    vimeo: <Tv className={className} />,
    audioboom: <Music className={className} />,
    deezer: <Music className={className} />,

    // Messaging / chat
    discord: <MessageSquare className={className} />,
    telegram: <Send className={className} />,
    whatsapp: <MessageCircle className={className} />,
    signal: <MessageSquare className={className} />,
    kakaotalk: <MessageCircle className={className} />,
    wechat: <MessageSquare className={className} />,

    // Communities / blogs / publishing
    medium: <BookOpen className={className} />,
    hashnode: <BookOpen className={className} />,
    devto: <BookOpen className={className} />,
    substack: <BookOpen className={className} />,
    blogger: <BookOpen className={className} />,
    quora: <BookOpen className={className} />,

    // Research / academia
    googlescholar: <GraduationCap className={className} />,
    researchgate: <BookOpen className={className} />,
    orcid: <Link2 className={className} />,

    // Marketplaces / freelancing
    upwork: <Briefcase className={className} />,
    fiverr: <ShoppingBag className={className} />,
    freelancer: <ShoppingBag className={className} />,
    toptal: <ShoppingBag className={className} />,

    // Education / learning
    coursera: <BookOpen className={className} />,
    udemy: <BookOpen className={className} />,
    udacity: <BookOpen className={className} />,
    khanacademy: <BookOpen className={className} />,

    // Professional / misc
    calendly: <Calendar className={className} />,
    angel: <Briefcase className={className} />,
    angellist: <Briefcase className={className} />,
    linkedinlearning: <BookOpen className={className} />,

    // Generic / links
    linktree: <Link className={className} />,
    link: <Link2 className={className} />,
    portfolio: <Globe className={className} />,

    // Payments / crypto
    bitcoin: <Package className={className} />,
    ethereum: <Package className={className} />,

    // Misc fallbacks mapped to generic icons
    producthunt: <Link2 className={className} />,
    pinterest: <Link className={className} />,
    reddit: <CircleDot className={className} />,
    imdb: <Tv className={className} />,
    steam: <Tv className={className} />,
    slack: <Hash className={className} />,
    trello: <Layout className={className} />,
    zoom: <Video className={className} />,
    spotifyuri: <Music className={className} />,
    youtubechannel: <Youtube className={className} />,
    research: <BookOpen className={className} />,
    custom: <Link2 className={className} />,
    // many others will fall back to globe/link when not explicitly available
  };
  return icons[platform] || <Globe className={className} />;
};

// Decode HTML entities produced by editors or storage (e.g. &lt;b&gt; -> <b>)
const decodeHtmlEntities = (s?: string) => {
  if (!s) return s || '';
  try {
    const txt = document.createElement('textarea');
    txt.innerHTML = s;
    return txt.value;
  } catch (e) {
    return s;
  }
};

// Helper to render compact-separated lists (bullet/pipe/comma/newline)
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

// Sanitize preview HTML by removing inline color styles and legacy color attributes
const sanitizePreviewHtml = (html?: string) => {
  if (!html) return html || '';
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('[style]').forEach((el) => {
      try { (el as HTMLElement).style.removeProperty('color'); } catch (e) {}
    });
    tmp.querySelectorAll('font').forEach((f) => {
      const parent = f.parentNode;
      if (!parent) return;
      while (f.firstChild) parent.insertBefore(f.firstChild, f);
      parent.removeChild(f);
    });
    tmp.querySelectorAll('[color]').forEach((el) => {
      try { (el as HTMLElement).removeAttribute('color'); } catch (e) {}
    });
    return tmp.innerHTML;
  } catch (e) {
    return html;
  }
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
          const enableGrouping = skillsSettings.enableGrouping;
          const showGroupNames = skillsSettings.showGroupNames ?? true;
          const groups = Array.from(new Set(skills.filter(s => s.group).map(s => s.group)));
          const ungroupedSkills = skills.filter(s => !s.group);

          return (
            <div key={section.id} className="mb-6">
              {renderSidebarHeading(section.title)}
              <div className="space-y-2">
                {enableGrouping && groups.length > 0 ? (
                  (() => {
                    const isGrid = skillsSettings.displayStyle === 'grid';
                    const gridCols = Math.max(1, Math.min(2, skillsSettings.columns || 2));
                    return (
                      <>
                                {skillsSettings.displayStyle === 'compact' ? (
                                  (() => {
                                    const separator = skillsSettings.compactSeparator || 'bullet';
                                    const separatorColor = 'rgba(255,255,255,0.5)';
                                    const groupNodes = groups.map(group => {
                                      const names = skills.filter(s => s.group === group).map(s => s.name).join(', ');
                                      const label = showGroupNames ? `${group}: ${names}` : names;
                                      return <span key={group} className="font-medium">{label}</span>;
                                    });
                                    if (ungroupedSkills.length > 0) {
                                      const otherNames = ungroupedSkills.map(s => s.name).join(', ');
                                      groupNodes.push(<span key="__other" className="font-medium">{showGroupNames ? `Other: ${otherNames}` : otherNames}</span>);
                                    }
                                    return renderSeparatedItems(groupNodes, separator, '#fff', separatorColor);
                                  })()
                                ) : (
                                  groups.map(group => (
                                    <div key={group} className="mb-2">
                                      {showGroupNames && (
                                        <p className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{group}:</p>
                                      )}
                                      {(() => {
                                        const groupSkills = skills.filter(s => s.group === group);
                                        const style = skillsSettings.displayStyle;
                                        const levelStyle = skillsSettings.levelStyle || 'dots';
                                        const filledColor = '#fff';
                                        const emptyColor = 'rgba(255,255,255,0.25)';

                                        if (style === 'grid') {
                                          return (
                                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, minmax(0,1fr))`, gap: '6px' }}>
                                              {groupSkills.map((skill) => (
                                                <div key={skill.id} className="text-xs" style={{ color: '#fff' }}>{skill.name}</div>
                                              ))}
                                            </div>
                                          );
                                        }

                                        if (style === 'level') {
                                          return (
                                            <div className="space-y-2">
                                              {groupSkills.map((skill) => {
                                                const val = skill.level === 'expert' ? 5 : skill.level === 'advanced' ? 4 : skill.level === 'intermediate' ? 3 : 1;
                                                if (levelStyle === 'bar') {
                                                  return (
                                                    <div key={skill.id}>
                                                      <div className="flex items-center justify-between">
                                                        <span className="text-white">{skill.name}</span>
                                                        <span className="text-xs text-white/80">{skill.level}</span>
                                                      </div>
                                                      <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: emptyColor }}>
                                                        <div className="h-full rounded-full" style={{ width: `${(val / 5) * 100}%`, backgroundColor: filledColor }} />
                                                      </div>
                                                    </div>
                                                  );
                                                }

                                                if (levelStyle === 'text') {
                                                  return (
                                                    <div key={skill.id} className="flex items-center justify-between">
                                                      <span className="text-white">{skill.name}</span>
                                                      <span className="text-xs text-white/80">{skill.level}</span>
                                                    </div>
                                                  );
                                                }

                                                return (
                                                  <div key={skill.id} className="flex items-center gap-2">
                                                    <span className="text-white">{skill.name}</span>
                                                    <div className="flex gap-0.5 mt-0.5">
                                                      {Array.from({ length: 5 }).map((_, idx) => (
                                                        <span key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: idx < val ? filledColor : emptyColor }} />
                                                      ))}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          );
                                        }

                                        return (
                                          <div className="flex flex-wrap gap-1.5">
                                            {groupSkills.map((skill) => (
                                              <div key={skill.id} className="text-xs text-white">{skill.name}</div>
                                            ))}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  ))
                                )}
                        {ungroupedSkills.length > 0 && (
                          <div>
                            {showGroupNames && <p className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Other:</p>}
                            {isGrid ? (
                              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, minmax(0,1fr))`, gap: '6px' }}>
                                {ungroupedSkills.map(skill => (
                                  <div key={skill.id} className="text-xs" style={{ color: '#fff' }}>{skill.name}</div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {ungroupedSkills.map((skill) => (
                                  <div key={skill.id} className="text-xs" style={{ color: '#fff' }}>{skill.name}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()
                ) : (
                  skills.map((skill) => (
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
                  ))
                )}
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
                    {(() => {
                      const safeSummary = decodeHtmlEntities(summary as string);
                      const sanitizedSummary = sanitizePreviewHtml(safeSummary);
                      const summaryColor = isSidebarLayout ? 'rgba(0,0,0,0.9)' : textColor;
                      return (/<[^>]+>/).test(sanitizedSummary) ? (
                        <div className="text-xs leading-relaxed" style={{ color: summaryColor }} dangerouslySetInnerHTML={{ __html: sanitizedSummary }} />
                      ) : (
                        <p className="text-xs leading-relaxed" style={{ color: summaryColor }}>{sanitizedSummary}</p>
                      );
                    })()}
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
                            {(() => {
                            const safeDesc = decodeHtmlEntities(exp.description as string);
                            const sanitizedDesc = sanitizePreviewHtml(safeDesc);
                            return (/<[^>]+>/).test(sanitizedDesc) ? (
                              <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                            ) : (
                              sanitizedDesc.split('\n').map((line, i) => (
                                <div key={i}>
                                  {entryLayout.listStyle !== 'none' && line.trim() && (
                                    <span className="mr-1">{getListMarker()}</span>
                                  )}
                                  {line}
                                </div>
                              ))
                            );
                          })()}
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
                        <div className="text-xs mt-1">
                          {(() => {
                            const safeDesc = decodeHtmlEntities(edu.description as string);
                            const sanitizedDesc = sanitizePreviewHtml(safeDesc);
                            return (/<[^>]+>/).test(sanitizedDesc) ? (
                              <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                            ) : (
                              <p>{sanitizedDesc}</p>
                            );
                          })()}
                        </div>
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
                      <div className="text-xs mt-1">
                        {(() => {
                          const safeDesc = decodeHtmlEntities(project.description as string);
                          const sanitizedDesc = sanitizePreviewHtml(safeDesc);
                          return (/<[^>]+>/).test(sanitizedDesc) ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                          ) : (
                            <p>{sanitizedDesc}</p>
                          );
                        })()}
                      </div>
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
            const skillsSettings = settings.skills;
            const enableGrouping = skillsSettings.enableGrouping;
            const groups = Array.from(new Set(skills.filter(s => s.group).map(s => s.group)));
            const ungroupedSkills = skills.filter(s => !s.group);

            const gridCols = Math.max(1, skillsSettings.columns || 3);

            const showGroupNames = skillsSettings.showGroupNames ?? true;
            const renderGrouped = () => {
              const style = skillsSettings.displayStyle;
              const gridCols = Math.max(1, skillsSettings.columns || 3);
              const levelStyle = skillsSettings.levelStyle || 'dots';
              const filledColor = settings.colors.applyAccentTo.levelIndicators ? settings.colors.accentColor : textColor;
              const emptyColor = '#e5e7eb';

              if (style === 'compact') {
                const separator = skillsSettings.compactSeparator || 'bullet';
                const separatorColor = '#94a3b8';
                const groupNodes = groups.map(group => {
                  const names = skills.filter(s => s.group === group).map(s => s.name).join(', ');
                  const label = showGroupNames ? `${group}: ${names}` : names;
                  return <span key={group} className="font-medium">{label}</span>;
                });
                if (ungroupedSkills.length > 0) {
                  const otherNames = ungroupedSkills.map(s => s.name).join(', ');
                  groupNodes.push(<span key="__other" className="font-medium">{showGroupNames ? `Other: ${otherNames}` : otherNames}</span>);
                }
                return renderSeparatedItems(groupNodes, separator, textColor, separatorColor);
              }

              return (
                <div className="space-y-2">
                  {groups.map(group => (
                    <div key={group}>
                      {showGroupNames && (
                        <p className="text-xs font-medium mb-1" style={{ color: `${textColor}99` }}>{group}:</p>
                      )}
                      {style === 'grid' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, minmax(0,1fr))`, gap: '6px' }}>
                          {skills.filter(s => s.group === group).map((skill) => (
                            <div key={skill.id} className="text-xs" style={{ color: textColor }}>{skill.name}</div>
                          ))}
                        </div>
                      ) : style === 'level' ? (
                        <div className="space-y-2">
                          {skills.filter(s => s.group === group).map((skill) => {
                            const val = skill.level === 'expert' ? 5 : skill.level === 'advanced' ? 4 : skill.level === 'intermediate' ? 3 : 1;
                            if (levelStyle === 'bar') {
                              return (
                                <div key={skill.id}>
                                  <div className="flex items-center justify-between">
                                    <span style={{ color: textColor }}>{skill.name}</span>
                                    <span className="text-xs" style={{ color: '#94a3b8' }}>{skill.level}</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: emptyColor }}>
                                    <div className="h-full rounded-full transition-all" style={{ width: `${(val / 5) * 100}%`, backgroundColor: filledColor }} />
                                  </div>
                                </div>
                              );
                            }

                            if (levelStyle === 'text') {
                              return (
                                <div key={skill.id} className="flex items-center justify-between">
                                  <span style={{ color: textColor }}>{skill.name}</span>
                                  <span className="text-xs" style={{ color: '#94a3b8' }}>{skill.level}</span>
                                </div>
                              );
                            }

                            return (
                              <div key={skill.id} className="flex items-center gap-2">
                                <span style={{ color: textColor }}>{skill.name}</span>
                                <div className="flex gap-0.5 mt-0.5">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <span key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: idx < val ? filledColor : emptyColor }} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {skills.filter(s => s.group === group).map((skill) => (
                            <span key={skill.id} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${accentColor}15`, color: textColor }}>{skill.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {ungroupedSkills.length > 0 && (
                    <div>
                      {showGroupNames && <p className="text-xs font-medium mb-1" style={{ color: `${textColor}99` }}>Other:</p>}
                      {style === 'grid' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, minmax(0,1fr))`, gap: '6px' }}>
                          {ungroupedSkills.map(skill => (
                            <div key={skill.id} className="text-xs" style={{ color: textColor }}>{skill.name}</div>
                          ))}
                        </div>
                      ) : style === 'level' ? (
                        <div className="space-y-2">
                          {ungroupedSkills.map((skill) => {
                            const val = skill.level === 'expert' ? 5 : skill.level === 'advanced' ? 4 : skill.level === 'intermediate' ? 3 : 1;
                            return (
                              <div key={skill.id} className="flex items-center justify-between">
                                <span style={{ color: textColor }}>{skill.name}</span>
                                <div className="flex gap-0.5 mt-0.5">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <span key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: idx < val ? filledColor : emptyColor }} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {ungroupedSkills.map((skill) => (
                            <span key={skill.id} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${accentColor}15`, color: textColor }}>{skill.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            };

            const renderGrid = () => (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '6px' }}>
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs" style={{ color: textColor }}>{skill.name}</div>
                ))}
              </div>
            );

            const renderCompact = () => {
              const compactItems = skills.map((s) => <span key={s.id} className="font-medium">{s.name}</span>);
              const separatorStyle = settings.skills.compactSeparator || 'bullet';
              const separatorColor = '#94a3b8';
              return renderSeparatedItems(compactItems, separatorStyle, textColor, separatorColor);
            };

            const renderBubble = () => (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 py-1 text-xs rounded" style={{ backgroundColor: `${accentColor}15`, color: textColor }}>{skill.name}</span>
                ))}
              </div>
            );

            const content = (() => {
              if (enableGrouping && groups.length > 0) return renderGrouped();
              switch (skillsSettings.displayStyle) {
                case 'grid':
                  return renderGrid();
                case 'compact':
                  return renderCompact();
                case 'level':
                  return renderBubble();
                default:
                  return renderBubble();
              }
            })();

            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                {content}
              </div>
            );
          }

          if (section.type === 'languages' && languages.length > 0) {
            const langSettings = settings.languages;
            const columns = Math.max(1, langSettings.columns || 2);
            const showLevel = langSettings.showLevel;
            const levelStyle = langSettings.levelStyle || 'dots';

            const getProficiencyLabel = (value?: string) => {
              if (!value) return '';
              return value.charAt(0).toUpperCase() + value.slice(1);
            };

            const renderLevelIndicator = (proficiency: string) => {
              const scale: Record<string, number> = { basic: 1, conversational: 2, proficient: 3, fluent: 4, native: 5 };
              const val = scale[proficiency] || 3;
              const filledColor = textColor;
              const emptyColor = '#e5e7eb';

              if (levelStyle === 'bar') {
                return (
                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: emptyColor }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${(val / 5) * 100}%`, backgroundColor: filledColor }} />
                  </div>
                );
              }

              if (levelStyle === 'text') {
                return <span className="text-xs font-medium" style={{ color: filledColor }}>{getProficiencyLabel(proficiency)}</span>;
              }

              return (
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: idx < val ? filledColor : emptyColor }} />
                  ))}
                </div>
              );
            };

            const renderGrid = () => (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: '6px' }}>
                {languages.map((lang) => (
                  <div key={lang.id} className="text-xs font-medium" style={{ color: textColor }}>
                    <div>{lang.name}</div>
                    {showLevel && <div className="mt-1">{renderLevelIndicator(lang.proficiency)}</div>}
                  </div>
                ))}
              </div>
            );

            const renderLevelList = () => (
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium" style={{ color: textColor }}>{lang.name}</span>
                      {showLevel && levelStyle !== 'text' && <span className="text-xs" style={{ color: '#94a3b8' }}>{getProficiencyLabel(lang.proficiency)}</span>}
                    </div>
                    {showLevel && <div className="mt-0.5">{renderLevelIndicator(lang.proficiency)}</div>}
                  </div>
                ))}
              </div>
            );

            const renderCompact = () => {
              const items = languages.map((l) => (
                <span key={l.id} className="font-medium">
                  {l.name}{showLevel ? ` (${getProficiencyLabel(l.proficiency)})` : ''}
                </span>
              ));
              const separatorStyle = langSettings.compactSeparator || 'bullet';
              const separatorColor = '#94a3b8';
              return renderSeparatedItems(items, separatorStyle, textColor, separatorColor);
            };

            const content = (() => {
              switch (langSettings.displayStyle) {
                case 'grid':
                  return renderGrid();
                case 'level':
                  return renderLevelList();
                case 'compact':
                  return renderCompact();
                default:
                  return renderGrid();
              }
            })();

            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                {content}
              </div>
            );
          }

          if (section.type === 'certifications' && certifications.length > 0) {
            const certSettings = settings.certificates;
            const cols = Math.max(1, certSettings.columns || 2);
            const separator = certSettings.compactSeparator || 'bullet';

            const renderGrid = () => (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: `${spacing.entrySpacing}px` }}>
                {certifications.map(cert => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-medium">{cert.name}</div>
                    <div className="opacity-80">{cert.issuer}{cert.date ? <span className="ml-2">{formatDate(cert.date)}</span> : null}</div>
                  </div>
                ))}
              </div>
            );

            const renderCompact = () => {
              const items = certifications.map((c) => <span key={c.id} className="font-medium">{c.name}</span>);
              const separatorStyle = certSettings.compactSeparator || 'bullet';
              const separatorColor = '#94a3b8';
              return renderSeparatedItems(items, separatorStyle, textColor, separatorColor);
            };

            const renderList = () => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.entrySpacing}px` }}>
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <strong>{cert.name}</strong> - {cert.issuer}{cert.date && <span className="ml-2 opacity-70">{formatDate(cert.date)}</span>}
                  </div>
                ))}
              </div>
            );

            const content = certSettings.displayStyle === 'grid' ? renderGrid() : certSettings.displayStyle === 'compact' ? renderCompact() : renderList();

            return (
              <div key={section.id}>
                {renderHeading(section.title)}
                {content}
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