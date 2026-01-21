// ============= PROFILE LINKS =============

// Complete list of 150+ social platforms with icons
export const SOCIAL_PLATFORMS = [
  // Common Quick-Select Platforms (shown as tabs)
  { id: 'linkedin', name: 'LinkedIn', category: 'common' },
  { id: 'github', name: 'GitHub', category: 'common' },
  { id: 'hackerrank', name: 'HackerRank', category: 'common' },
  { id: 'leetcode', name: 'LeetCode', category: 'common' },
  { id: 'codechef', name: 'CodeChef', category: 'common' },
  { id: 'geeksforgeeks', name: 'GeeksforGeeks', category: 'common' },
  { id: 'kaggle', name: 'Kaggle', category: 'common' },
  { id: 'gitlab', name: 'GitLab', category: 'common' },
  { id: 'website', name: 'Portfolio / Website', category: 'common' },
  
  // Full Platform List
  { id: 'email', name: 'Email', category: 'contact' },
  { id: 'phone', name: 'Phone', category: 'contact' },
  { id: 'location', name: 'Location', category: 'contact' },
  { id: 'links', name: 'Links', category: 'general' },
  { id: 'search', name: 'Search', category: 'general' },
  { id: 'gitbook', name: 'GitBook', category: 'dev' },
  { id: 'medium', name: 'Medium', category: 'writing' },
  { id: 'orcid', name: 'ORCID', category: 'academic' },
  { id: 'skype', name: 'Skype', category: 'communication' },
  { id: 'bluesky', name: 'Bluesky', category: 'social' },
  { id: 'threads', name: 'Threads', category: 'social' },
  { id: 'twitter', name: 'X (Twitter)', category: 'social' },
  { id: 'discord', name: 'Discord', category: 'communication' },
  { id: 'dribbble', name: 'Dribbble', category: 'design' },
  { id: 'behance', name: 'Behance', category: 'design' },
  { id: 'stackoverflow', name: 'Stack Overflow', category: 'dev' },
  { id: 'quora', name: 'Quora', category: 'social' },
  { id: 'facebook', name: 'Facebook', category: 'social' },
  { id: 'instagram', name: 'Instagram', category: 'social' },
  { id: 'wechat', name: 'WeChat', category: 'communication' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai' },
  { id: 'youtube', name: 'YouTube', category: 'video' },
  { id: 'tiktok', name: 'TikTok', category: 'video' },
  { id: 'signal', name: 'Signal', category: 'communication' },
  { id: 'telegram', name: 'Telegram', category: 'communication' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'communication' },
  { id: 'paypal', name: 'PayPal', category: 'finance' },
  { id: 'producthunt', name: 'Product Hunt', category: 'startup' },
  { id: 'artstation', name: 'ArtStation', category: 'design' },
  { id: 'codepen', name: 'CodePen', category: 'dev' },
  { id: 'fiverr', name: 'Fiverr', category: 'freelance' },
  { id: 'hashnode', name: 'Hashnode', category: 'writing' },
  { id: 'pluralsight', name: 'Pluralsight', category: 'learning' },
  { id: 'researchgate', name: 'ResearchGate', category: 'academic' },
  { id: 'imdb', name: 'IMDb', category: 'entertainment' },
  { id: 'qwiklabs', name: 'Qwiklabs', category: 'learning' },
  { id: 'googleplay', name: 'Google Play', category: 'apps' },
  { id: 'tumblr', name: 'Tumblr', category: 'social' },
  { id: 'tripadvisor', name: 'Tripadvisor', category: 'travel' },
  { id: 'yelp', name: 'Yelp', category: 'reviews' },
  { id: 'slack', name: 'Slack', category: 'communication' },
  { id: 'flickr', name: 'Flickr', category: 'photography' },
  { id: 'reverbnation', name: 'ReverbNation', category: 'music' },
  { id: 'deviantart', name: 'DeviantArt', category: 'design' },
  { id: 'vimeo', name: 'Vimeo', category: 'video' },
  { id: 'reddit', name: 'Reddit', category: 'social' },
  { id: 'pinterest', name: 'Pinterest', category: 'social' },
  { id: 'blogger', name: 'Blogger', category: 'writing' },
  { id: 'spotify', name: 'Spotify', category: 'music' },
  { id: 'bitcoin', name: 'Bitcoin', category: 'crypto' },
  { id: 'appstore', name: 'App Store', category: 'apps' },
  { id: 'wordpress', name: 'WordPress', category: 'writing' },
  { id: 'codecademy', name: 'Codecademy', category: 'learning' },
  { id: 'codeforces', name: 'Codeforces', category: 'competitive' },
  { id: 'vsco', name: 'VSCO', category: 'photography' },
  { id: 'snapchat', name: 'Snapchat', category: 'social' },
  { id: 'upwork', name: 'Upwork', category: 'freelance' },
  { id: 'googlescholar', name: 'Google Scholar', category: 'academic' },
  { id: 'line', name: 'LINE', category: 'communication' },
  { id: 'tryhackme', name: 'TryHackMe', category: 'security' },
  { id: 'coursera', name: 'Coursera', category: 'learning' },
  { id: 'protonmail', name: 'Proton Mail', category: 'contact' },
  { id: 'hackerearth', name: 'HackerEarth', category: 'competitive' },
  { id: 'codewars', name: 'Codewars', category: 'competitive' },
  { id: 'hackthebox', name: 'Hack The Box', category: 'security' },
  { id: 'bitbucket', name: 'Bitbucket', category: 'dev' },
  { id: 'gitea', name: 'Gitea', category: 'dev' },
  { id: 'xing', name: 'Xing', category: 'professional' },
  { id: '500px', name: '500px', category: 'photography' },
  { id: 'devto', name: 'dev.to', category: 'writing' },
  { id: 'tencentqq', name: 'Tencent QQ', category: 'communication' },
  { id: 'ethereum', name: 'Ethereum', category: 'crypto' },
  { id: 'stopstalk', name: 'StopStalk', category: 'competitive' },
  { id: 'substack', name: 'Substack', category: 'writing' },
  { id: 'toptal', name: 'Toptal', category: 'freelance' },
  { id: 'polywork', name: 'Polywork', category: 'professional' },
  { id: 'replit', name: 'Replit', category: 'dev' },
  { id: 'credly', name: 'Credly', category: 'credentials' },
  { id: 'figma', name: 'Figma', category: 'design' },
  { id: 'gmail', name: 'Gmail', category: 'contact' },
  { id: 'tableau', name: 'Tableau', category: 'data' },
  { id: 'npm', name: 'npm', category: 'dev' },
  { id: 'hackerone', name: 'HackerOne', category: 'security' },
  { id: 'freelancer', name: 'Freelancer', category: 'freelance' },
  { id: 'datacamp', name: 'DataCamp', category: 'learning' },
  { id: 'mastodon', name: 'Mastodon', category: 'social' },
  { id: 'letterboxd', name: 'Letterboxd', category: 'entertainment' },
  { id: 'zoom', name: 'Zoom', category: 'communication' },
  { id: 'audioboom', name: 'Audioboom', category: 'podcast' },
  { id: 'soundcloud', name: 'SoundCloud', category: 'music' },
  { id: 'soundcharts', name: 'Soundcharts', category: 'music' },
  { id: 'kakaotalk', name: 'KakaoTalk', category: 'communication' },
  { id: 'salesforce', name: 'Salesforce', category: 'business' },
  { id: 'itchio', name: 'Itch.io', category: 'games' },
  { id: 'sololearn', name: 'Sololearn', category: 'learning' },
  { id: 'opensea', name: 'OpenSea', category: 'crypto' },
  { id: 'devpost', name: 'Devpost', category: 'hackathon' },
  { id: 'linktree', name: 'Linktree', category: 'general' },
  { id: 'codingame', name: 'CodinGame', category: 'competitive' },
  { id: 'codingninjas', name: 'Coding Ninjas', category: 'learning' },
  { id: 'unsplash', name: 'Unsplash', category: 'photography' },
  { id: 'indeed', name: 'Indeed', category: 'jobs' },
  { id: 'handshake', name: 'Handshake', category: 'jobs' },
  { id: 'steam', name: 'Steam', category: 'games' },
  { id: 'google', name: 'Google', category: 'general' },
  { id: 'calendly', name: 'Calendly', category: 'scheduling' },
  { id: 'angellist', name: 'AngelList', category: 'startup' },
  { id: 'deezer', name: 'Deezer', category: 'music' },
  { id: 'flowcv', name: 'FlowCV', category: 'general' },
  { id: 'khanacademy', name: 'Khan Academy', category: 'learning' },
  { id: 'udemy', name: 'Udemy', category: 'learning' },
  { id: 'udacity', name: 'Udacity', category: 'learning' },
  { id: 'twitch', name: 'Twitch', category: 'streaming' },
  { id: 'trello', name: 'Trello', category: 'productivity' },
  { id: 'evernote', name: 'Evernote', category: 'productivity' },
  { id: 'canva', name: 'Canva', category: 'design' },
  { id: 'etsy', name: 'Etsy', category: 'ecommerce' },
  { id: 'googlemaps', name: 'Google Maps', category: 'location' },
  { id: 'googlepodcasts', name: 'Google Podcasts', category: 'podcast' },
  { id: 'applepodcasts', name: 'Apple Podcasts', category: 'podcast' },
  { id: 'stitcher', name: 'Stitcher', category: 'podcast' },
  { id: 'amazonmusic', name: 'Amazon Music', category: 'music' },
  { id: 'iheartradio', name: 'iHeartRadio', category: 'music' },
  { id: 'tunein', name: 'TuneIn', category: 'music' },
  { id: 'pocketcasts', name: 'Pocket Casts', category: 'podcast' },
  { id: 'pandora', name: 'Pandora', category: 'music' },
  { id: 'youtubemusic', name: 'YouTube Music', category: 'music' },
  { id: 'tidal', name: 'Tidal', category: 'music' },
  { id: 'bandcamp', name: 'Bandcamp', category: 'music' },
  { id: 'scopus', name: 'Scopus', category: 'academic' },
  { id: 'custom', name: 'Custom Link', category: 'general' },
] as const;

export const COMMON_PLATFORMS = ['linkedin', 'github', 'hackerrank', 'leetcode', 'codechef', 'geeksforgeeks', 'kaggle', 'gitlab', 'website'] as const;

export type SocialPlatformId = typeof SOCIAL_PLATFORMS[number]['id'];

export interface ProfileLink {
  id: string;
  platform: SocialPlatformId;
  displayText: string;
  url: string;
  enabled: boolean;
}

export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo?: string;
  profileLinks: ProfileLink[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  group?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'proficient' | 'fluent' | 'native';
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export type SectionType = 
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
}

// ============= EXTENDED SETTINGS TYPES =============

export type LayoutType = 'single' | 'two-column';
export type ColorMode = 'basic' | 'advanced' | 'border';
export type HeadingStyle = 'simple' | 'boxed' | 'line-above' | 'line-below' | 'accent-line' | 'accent-bg' | 'dotted' | 'modern';
export type HeadingCapitalization = 'capitalize' | 'uppercase' | 'lowercase' | 'normal';
export type HeadingSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type HeadingIconStyle = 'none' | 'outline' | 'filled';
export type FontCategory = 'serif' | 'sans' | 'mono';
export type EntryTitleSize = 's' | 'm' | 'l';
export type SubtitleStyle = 'normal' | 'bold' | 'italic';
export type SubtitlePlacement = 'same-line' | 'next-line';
export type ListStyle = 'bullet' | 'hyphen' | 'arrow' | 'none';
export type PersonalDetailsAlign = 'left' | 'center' | 'right';
export type PersonalDetailsArrangement = 'icon' | 'bullet' | 'bar' | 'comma';
export type IconFrameStyle = 'none' | 'circle-filled' | 'circle-outline' | 'rounded-filled' | 'rounded-outline' | 'square-filled' | 'square-outline';
export type NameSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type TitlePosition = 'same-line' | 'below';
export type TitleStyle = 'normal' | 'italic' | 'bold';
export type SkillDisplayStyle = 'tags' | 'grid' | 'level' | 'compact' | 'bubble';
export type LanguageDisplayStyle = 'grid' | 'level' | 'compact' | 'bubble';
export type LevelIndicatorStyle = 'text' | 'dots' | 'bar';
export type CompactSeparatorStyle = 'bullet' | 'pipe' | 'newline' | 'comma';
export type SubinfoStyle = 'dash' | 'colon' | 'bracket';
export type PhotoShape = 'circle' | 'rounded' | 'square';
export type PhotoPosition = 'left' | 'right' | 'top';
export type ExperienceOrder = 'position-company' | 'company-position';
export type EducationOrder = 'degree-school' | 'school-degree';
export type LinkIconStyle = 'none' | 'external' | 'chain';
export type DateFormatType = 'MM/YYYY' | 'MMM YYYY' | 'MMMM YYYY' | 'YYYY-MM' | 'YYYY';
export type PageFormat = 'a4' | 'letter';

export interface RegionalSettings {
  dateFormat: DateFormatType;
  pageFormat: PageFormat;
}

export interface SpacingSettings {
  fontSize: number;
  lineHeight: number;
  leftRightMargin: number;
  topBottomMargin: number;
  sectionSpacing: number;
  entrySpacing: number;
}

export interface ColorSettings {
  mode: ColorMode;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  applyAccentTo: {
    name: boolean;
    jobTitle: boolean;
    headings: boolean;
    headingLine: boolean;
    headerIcons: boolean;
    levelIndicators: boolean;
    dates: boolean;
    linkIcons: boolean;
  };
}

export interface FontSettings {
  category: FontCategory;
  fontFamily: string;
  headingFontFamily: string;
  useCreativeHeadingFont: boolean;
}

export interface HeadingSettings {
  style: HeadingStyle;
  capitalization: HeadingCapitalization;
  size: HeadingSize;
  iconStyle: HeadingIconStyle;
}

export interface EntryLayoutSettings {
  titleSize: EntryTitleSize;
  subtitleStyle: SubtitleStyle;
  subtitlePlacement: SubtitlePlacement;
  indentDescription: boolean;
  listStyle: ListStyle;
}

export interface FooterSettings {
  showPageNumbers: boolean;
  showEmail: boolean;
  showName: boolean;
  showLinkIcon: boolean;
  reduceDateOpacity: boolean;
}

export interface PersonalDetailsSettings {
  align: PersonalDetailsAlign;
  arrangement: PersonalDetailsArrangement;
  iconFrameStyle: IconFrameStyle;
  nameSize: NameSize;
  nameBold: boolean;
  useCreativeFont: boolean;
  titleSize: HeadingSize;
  titlePosition: TitlePosition;
  titleStyle: TitleStyle;
  showPhoto: boolean;
  photoShape: PhotoShape;
  photoSize: number;
  photoPosition: PhotoPosition;
}

export interface SkillsSettings {
  displayStyle: SkillDisplayStyle;
  showLevel: boolean;
  columns: number;
  enableGrouping: boolean;
  levelStyle?: LevelIndicatorStyle;
  compactSeparator?: CompactSeparatorStyle;
  subinfoStyle?: SubinfoStyle;
}

export interface LanguagesSettings {
  displayStyle: LanguageDisplayStyle;
  showLevel: boolean;
  columns: number;
  levelStyle?: LevelIndicatorStyle;
  compactSeparator?: CompactSeparatorStyle;
  subinfoStyle?: SubinfoStyle;
}

export interface InterestsSettings {
  displayStyle: 'grid' | 'compact' | 'bubble';
  columns: number;
}

export type CertificatesDisplayStyle = 'grid' | 'level' | 'compact' | 'bubble';

export interface CertificatesSettings {
  displayStyle: CertificatesDisplayStyle;
  columns: number;
  compactSeparator?: CompactSeparatorStyle;
  subinfoStyle?: SubinfoStyle;
}

export interface ProfileSettings {
  showProfileHeading: boolean;
}

export interface ExperienceSettings {
  titleOrder: ExperienceOrder;
  groupPromotions: boolean;
}

export interface EducationSettings {
  titleOrder: EducationOrder;
}

export interface ResumeSettings {
  layout: LayoutType;
  template: string;
  spacing: SpacingSettings;
  colors: ColorSettings;
  font: FontSettings;
  headings: HeadingSettings;
  entryLayout: EntryLayoutSettings;
  footer: FooterSettings;
  personalDetails: PersonalDetailsSettings;
  skills: SkillsSettings;
  languages: LanguagesSettings;
  interests: InterestsSettings;
  certificates: CertificatesSettings;
  profile: ProfileSettings;
  experience: ExperienceSettings;
  education: EducationSettings;
  regional: RegionalSettings;
  linkIconStyle: LinkIconStyle;
  fontFamily?: string;
  fontSize?: number;
  lineSpacing?: number;
  accentColor?: string;
  sectionSpacing?: number;
  pageMargins?: number;
}

export interface Resume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  personalDetails: PersonalDetails;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  sections: ResumeSection[];
  settings: ResumeSettings;
}

export interface CoverLetter {
  id: string;
  name: string;
  resumeId?: string;
  createdAt: string;
  updatedAt: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  greeting: string;
  body: string;
  closing: string;
  senderName: string;
}

// ============= FONT OPTIONS =============

export const FONT_OPTIONS = {
  sans: [
    { value: 'Inter', label: 'Inter' },
    { value: 'Mulish', label: 'Mulish' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Titillium Web', label: 'Titillium Web' },
    { value: 'Work Sans', label: 'Work Sans' },
    { value: 'Barlow', label: 'Barlow' },
    { value: 'Jost', label: 'Jost' },
    { value: 'Fira Sans', label: 'Fira Sans' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Rubik', label: 'Rubik' },
    { value: 'Asap', label: 'Asap' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'IBM Plex Sans', label: 'IBM Plex Sans' },
  ],
  serif: [
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Crimson Pro', label: 'Crimson Pro' },
    { value: 'Lora', label: 'Lora' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Merriweather', label: 'Merriweather' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Libre Baskerville', label: 'Libre Baskerville' },
    { value: 'PT Serif', label: 'PT Serif' },
  ],
  mono: [
    { value: 'Fira Code', label: 'Fira Code' },
    { value: 'JetBrains Mono', label: 'JetBrains Mono' },
    { value: 'Source Code Pro', label: 'Source Code Pro' },
    { value: 'IBM Plex Mono', label: 'IBM Plex Mono' },
    { value: 'Roboto Mono', label: 'Roboto Mono' },
  ],
};

export const COLOR_PRESETS = [
  { value: 'none', label: 'None' },
  { value: '#1a1a2e', label: 'Dark Navy' },
  { value: '#16213e', label: 'Navy' },
  { value: '#00a8cc', label: 'Cyan' },
  { value: '#0d9488', label: 'Teal' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#3b82f6', label: 'Light Blue' },
  { value: '#06b6d4', label: 'Sky' },
  { value: '#7c3aed', label: 'Purple' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#a855f7', label: 'Orchid' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#f43f5e', label: 'Rose' },
  { value: 'rainbow', label: 'Rainbow' },
];

// ============= DEFAULTS =============

export const DEFAULT_SPACING_SETTINGS: SpacingSettings = {
  fontSize: 10,
  lineHeight: 1.1,
  leftRightMargin: 12,
  topBottomMargin: 10,
  sectionSpacing: 16,
  entrySpacing: 12,
};

export const DEFAULT_COLOR_SETTINGS: ColorSettings = {
  mode: 'basic',
  accentColor: '#0d9488',
  textColor: '#1a1a1a',
  backgroundColor: '#ffffff',
  applyAccentTo: {
    name: true,
    jobTitle: true,
    headings: true,
    headingLine: true,
    headerIcons: false,
    levelIndicators: false,
    dates: false,
    linkIcons: false,
  },
};

export const DEFAULT_FONT_SETTINGS: FontSettings = {
  category: 'sans',
  fontFamily: 'Lato',
  headingFontFamily: 'Lato',
  useCreativeHeadingFont: false,
};

export const DEFAULT_HEADING_SETTINGS: HeadingSettings = {
  style: 'accent-line',
  capitalization: 'uppercase',
  size: 'l',
  iconStyle: 'none',
};

export const DEFAULT_ENTRY_LAYOUT_SETTINGS: EntryLayoutSettings = {
  titleSize: 'm',
  subtitleStyle: 'bold',
  subtitlePlacement: 'next-line',
  indentDescription: true,
  listStyle: 'bullet',
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  showPageNumbers: false,
  showEmail: false,
  showName: false,
  showLinkIcon: false,
  reduceDateOpacity: false,
};

export const DEFAULT_PERSONAL_DETAILS_SETTINGS: PersonalDetailsSettings = {
  align: 'left',
  arrangement: 'icon',
  iconFrameStyle: 'none',
  nameSize: 'l',
  nameBold: true,
  useCreativeFont: false,
  titleSize: 'm',
  titlePosition: 'below',
  titleStyle: 'normal',
  showPhoto: false,
  photoShape: 'circle',
  photoSize: 80,
  photoPosition: 'right',
};

export const DEFAULT_SKILLS_SETTINGS: SkillsSettings = {
  displayStyle: 'tags',
  showLevel: false,
  columns: 3,
  enableGrouping: false,
  levelStyle: 'dots',
  compactSeparator: 'bullet',
  subinfoStyle: 'dash',
};

export const DEFAULT_LANGUAGES_SETTINGS: LanguagesSettings = {
  displayStyle: 'grid',
  showLevel: true,
  columns: 2,
  levelStyle: 'dots',
  compactSeparator: 'bullet',
  subinfoStyle: 'dash',
};

export const DEFAULT_INTERESTS_SETTINGS: InterestsSettings = {
  displayStyle: 'compact',
  columns: 3,
};

export const DEFAULT_CERTIFICATES_SETTINGS: CertificatesSettings = {
  displayStyle: 'compact',
  columns: 2,
  compactSeparator: 'bullet',
  subinfoStyle: 'dash',
};

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  showProfileHeading: true,
};

export const DEFAULT_EXPERIENCE_SETTINGS: ExperienceSettings = {
  titleOrder: 'position-company',
  groupPromotions: false,
};

export const DEFAULT_EDUCATION_SETTINGS: EducationSettings = {
  titleOrder: 'degree-school',
};

export const DEFAULT_REGIONAL_SETTINGS: RegionalSettings = {
  dateFormat: 'MMM YYYY',
  pageFormat: 'a4',
};

export const DEFAULT_RESUME_SETTINGS: ResumeSettings = {
  layout: 'single',
  template: 'professional',
  spacing: DEFAULT_SPACING_SETTINGS,
  colors: DEFAULT_COLOR_SETTINGS,
  font: DEFAULT_FONT_SETTINGS,
  headings: DEFAULT_HEADING_SETTINGS,
  entryLayout: DEFAULT_ENTRY_LAYOUT_SETTINGS,
  footer: DEFAULT_FOOTER_SETTINGS,
  personalDetails: DEFAULT_PERSONAL_DETAILS_SETTINGS,
  skills: DEFAULT_SKILLS_SETTINGS,
  languages: DEFAULT_LANGUAGES_SETTINGS,
  interests: DEFAULT_INTERESTS_SETTINGS,
  certificates: DEFAULT_CERTIFICATES_SETTINGS,
  profile: DEFAULT_PROFILE_SETTINGS,
  experience: DEFAULT_EXPERIENCE_SETTINGS,
  education: DEFAULT_EDUCATION_SETTINGS,
  regional: DEFAULT_REGIONAL_SETTINGS,
  linkIconStyle: 'external',
};

// ============= DATE FORMATTING =============

export const formatDate = (dateString: string, format: DateFormatType): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  switch (format) {
    case 'MM/YYYY':
      return `${String(month + 1).padStart(2, '0')}/${year}`;
    case 'MMM YYYY':
      return `${monthNames[month]} ${year}`;
    case 'MMMM YYYY':
      return `${fullMonthNames[month]} ${year}`;
    case 'YYYY-MM':
      return `${year}-${String(month + 1).padStart(2, '0')}`;
    case 'YYYY':
      return String(year);
    default:
      return `${monthNames[month]} ${year}`;
  }
};

// ============= MIGRATION & FACTORY FUNCTIONS =============

export const migrateResumeSettings = (settings: Partial<ResumeSettings>): ResumeSettings => {
  return {
    ...DEFAULT_RESUME_SETTINGS,
    ...settings,
    spacing: { ...DEFAULT_SPACING_SETTINGS, ...settings.spacing },
    colors: { 
      ...DEFAULT_COLOR_SETTINGS, 
      ...settings.colors,
      applyAccentTo: { ...DEFAULT_COLOR_SETTINGS.applyAccentTo, ...settings.colors?.applyAccentTo },
    },
    font: { ...DEFAULT_FONT_SETTINGS, ...settings.font },
    headings: { ...DEFAULT_HEADING_SETTINGS, ...settings.headings },
    entryLayout: { ...DEFAULT_ENTRY_LAYOUT_SETTINGS, ...settings.entryLayout },
    footer: { ...DEFAULT_FOOTER_SETTINGS, ...settings.footer },
    personalDetails: { ...DEFAULT_PERSONAL_DETAILS_SETTINGS, ...settings.personalDetails },
    skills: { ...DEFAULT_SKILLS_SETTINGS, ...settings.skills },
    languages: { ...DEFAULT_LANGUAGES_SETTINGS, ...settings.languages },
    interests: { ...DEFAULT_INTERESTS_SETTINGS, ...settings.interests },
    certificates: { ...DEFAULT_CERTIFICATES_SETTINGS, ...settings.certificates },
    profile: { ...DEFAULT_PROFILE_SETTINGS, ...settings.profile },
    experience: { ...DEFAULT_EXPERIENCE_SETTINGS, ...settings.experience },
    education: { ...DEFAULT_EDUCATION_SETTINGS, ...settings.education },
    regional: { ...DEFAULT_REGIONAL_SETTINGS, ...settings.regional },
  };
};

export const createEmptyResume = (): Resume => ({
  id: '',
  name: 'My Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalDetails: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: '',
    profileLinks: [],
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
  sections: [
    { id: 'personal', type: 'personal', title: 'Personal Details', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: 'Summary', enabled: true, order: 1 },
    { id: 'experience', type: 'experience', title: 'Experience', enabled: true, order: 2 },
    { id: 'education', type: 'education', title: 'Education', enabled: true, order: 3 },
    { id: 'skills', type: 'skills', title: 'Skills', enabled: true, order: 4 },
    { id: 'projects', type: 'projects', title: 'Projects', enabled: true, order: 5 },
    { id: 'certifications', type: 'certifications', title: 'Certifications', enabled: true, order: 6 },
    { id: 'languages', type: 'languages', title: 'Languages', enabled: true, order: 7 },
  ],
  settings: DEFAULT_RESUME_SETTINGS,
});
