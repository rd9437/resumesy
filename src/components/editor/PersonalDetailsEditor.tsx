import React, { useState, useMemo } from 'react';
import { PersonalDetails, ProfileLink, SOCIAL_PLATFORMS, COMMON_PLATFORMS, SocialPlatformId } from '@/types/resume';
import { 
  User, Mail, Phone, MapPin, Globe, Plus, X, Search, Link2,
  Linkedin, Github, Code, Terminal, Database, GitBranch, ExternalLink,
  BookOpen, Palette, Facebook, Instagram, Youtube, Video, Send, 
  MessageCircle, MessageSquare, Hash, Music, Tv, Package, Code2, 
  Briefcase, ShoppingBag, GraduationCap, Calendar, Link, Twitter,
  CircleDot, Gamepad2, Podcast, Cloud, Wallet, Award, Newspaper,
  Camera, Building, FileCode, Play, Headphones, Globe2, Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PersonalDetailsEditorProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

// Custom Film icon component (defined before PLATFORM_ICONS to avoid forward reference)
const FilmIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

// Map platform IDs to icon components - comprehensive mapping
const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  // Common Quick-Select
  linkedin: <Linkedin className="w-4 h-4" />,
  github: <Github className="w-4 h-4" />,
  hackerrank: <Terminal className="w-4 h-4" />,
  leetcode: <Code2 className="w-4 h-4" />,
  codechef: <Code className="w-4 h-4" />,
  geeksforgeeks: <FileCode className="w-4 h-4" />,
  kaggle: <Database className="w-4 h-4" />,
  gitlab: <GitBranch className="w-4 h-4" />,
  website: <Globe className="w-4 h-4" />,
  
  // Contact
  email: <Mail className="w-4 h-4" />,
  phone: <Phone className="w-4 h-4" />,
  location: <MapPin className="w-4 h-4" />,
  gmail: <Mail className="w-4 h-4" />,
  protonmail: <Mail className="w-4 h-4" />,
  
  // Social
  twitter: <Twitter className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  threads: <MessageCircle className="w-4 h-4" />,
  bluesky: <Cloud className="w-4 h-4" />,
  reddit: <CircleDot className="w-4 h-4" />,
  pinterest: <Link className="w-4 h-4" />,
  tumblr: <Newspaper className="w-4 h-4" />,
  snapchat: <Camera className="w-4 h-4" />,
  mastodon: <Globe2 className="w-4 h-4" />,
  quora: <MessageSquare className="w-4 h-4" />,
  
  // Video/Streaming
  youtube: <Youtube className="w-4 h-4" />,
  tiktok: <Video className="w-4 h-4" />,
  twitch: <Tv className="w-4 h-4" />,
  vimeo: <Play className="w-4 h-4" />,
  
  // Communication
  telegram: <Send className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  discord: <MessageSquare className="w-4 h-4" />,
  slack: <Hash className="w-4 h-4" />,
  skype: <Phone className="w-4 h-4" />,
  signal: <MessageCircle className="w-4 h-4" />,
  zoom: <Monitor className="w-4 h-4" />,
  wechat: <MessageCircle className="w-4 h-4" />,
  line: <MessageCircle className="w-4 h-4" />,
  kakaotalk: <MessageCircle className="w-4 h-4" />,
  tencentqq: <MessageCircle className="w-4 h-4" />,
  
  // Design
  dribbble: <Palette className="w-4 h-4" />,
  behance: <Palette className="w-4 h-4" />,
  figma: <Palette className="w-4 h-4" />,
  canva: <Palette className="w-4 h-4" />,
  artstation: <Palette className="w-4 h-4" />,
  deviantart: <Palette className="w-4 h-4" />,
  
  // Dev
  stackoverflow: <Code className="w-4 h-4" />,
  codepen: <Code className="w-4 h-4" />,
  npm: <Package className="w-4 h-4" />,
  gitbook: <BookOpen className="w-4 h-4" />,
  bitbucket: <GitBranch className="w-4 h-4" />,
  gitea: <GitBranch className="w-4 h-4" />,
  replit: <Code className="w-4 h-4" />,
  devto: <Code className="w-4 h-4" />,
  
  // Competitive Programming
  codeforces: <Code className="w-4 h-4" />,
  hackerearth: <Terminal className="w-4 h-4" />,
  codewars: <Code className="w-4 h-4" />,
  stopstalk: <Code className="w-4 h-4" />,
  codingame: <Gamepad2 className="w-4 h-4" />,
  
  // Learning
  coursera: <GraduationCap className="w-4 h-4" />,
  udemy: <GraduationCap className="w-4 h-4" />,
  udacity: <GraduationCap className="w-4 h-4" />,
  pluralsight: <GraduationCap className="w-4 h-4" />,
  codecademy: <GraduationCap className="w-4 h-4" />,
  datacamp: <GraduationCap className="w-4 h-4" />,
  sololearn: <GraduationCap className="w-4 h-4" />,
  khanacademy: <GraduationCap className="w-4 h-4" />,
  codingninjas: <GraduationCap className="w-4 h-4" />,
  qwiklabs: <Cloud className="w-4 h-4" />,
  
  // Writing
  medium: <BookOpen className="w-4 h-4" />,
  hashnode: <Newspaper className="w-4 h-4" />,
  substack: <Newspaper className="w-4 h-4" />,
  blogger: <Newspaper className="w-4 h-4" />,
  wordpress: <Newspaper className="w-4 h-4" />,
  
  // Academic
  orcid: <User className="w-4 h-4" />,
  researchgate: <BookOpen className="w-4 h-4" />,
  googlescholar: <GraduationCap className="w-4 h-4" />,
  scopus: <BookOpen className="w-4 h-4" />,
  
  // Freelance
  upwork: <Briefcase className="w-4 h-4" />,
  fiverr: <ShoppingBag className="w-4 h-4" />,
  freelancer: <Briefcase className="w-4 h-4" />,
  toptal: <Briefcase className="w-4 h-4" />,
  
  // Professional
  xing: <Briefcase className="w-4 h-4" />,
  polywork: <Briefcase className="w-4 h-4" />,
  angellist: <Building className="w-4 h-4" />,
  
  // Security
  tryhackme: <Terminal className="w-4 h-4" />,
  hackthebox: <Terminal className="w-4 h-4" />,
  hackerone: <Terminal className="w-4 h-4" />,
  
  // Music
  spotify: <Music className="w-4 h-4" />,
  soundcloud: <Music className="w-4 h-4" />,
  bandcamp: <Music className="w-4 h-4" />,
  deezer: <Music className="w-4 h-4" />,
  tidal: <Music className="w-4 h-4" />,
  amazonmusic: <Music className="w-4 h-4" />,
  youtubemusic: <Music className="w-4 h-4" />,
  pandora: <Music className="w-4 h-4" />,
  iheartradio: <Headphones className="w-4 h-4" />,
  reverbnation: <Music className="w-4 h-4" />,
  soundcharts: <Music className="w-4 h-4" />,
  tunein: <Headphones className="w-4 h-4" />,
  
  // Podcast
  applepodcasts: <Podcast className="w-4 h-4" />,
  googlepodcasts: <Podcast className="w-4 h-4" />,
  stitcher: <Podcast className="w-4 h-4" />,
  pocketcasts: <Podcast className="w-4 h-4" />,
  audioboom: <Podcast className="w-4 h-4" />,
  
  // Photography
  flickr: <Camera className="w-4 h-4" />,
  '500px': <Camera className="w-4 h-4" />,
  vsco: <Camera className="w-4 h-4" />,
  unsplash: <Camera className="w-4 h-4" />,
  
  // Gaming
  steam: <Gamepad2 className="w-4 h-4" />,
  itchio: <Gamepad2 className="w-4 h-4" />,
  
  // Finance/Crypto
  paypal: <Wallet className="w-4 h-4" />,
  bitcoin: <Wallet className="w-4 h-4" />,
  ethereum: <Wallet className="w-4 h-4" />,
  opensea: <Wallet className="w-4 h-4" />,
  
  // Jobs
  indeed: <Briefcase className="w-4 h-4" />,
  handshake: <Briefcase className="w-4 h-4" />,
  
  // AI/Data
  huggingface: <Database className="w-4 h-4" />,
  tableau: <Database className="w-4 h-4" />,
  
  // Other
  calendly: <Calendar className="w-4 h-4" />,
  linktree: <Link className="w-4 h-4" />,
  credly: <Award className="w-4 h-4" />,
  devpost: <Code className="w-4 h-4" />,
  producthunt: <ExternalLink className="w-4 h-4" />,
  googleplay: <Play className="w-4 h-4" />,
  appstore: <Play className="w-4 h-4" />,
  etsy: <ShoppingBag className="w-4 h-4" />,
  tripadvisor: <MapPin className="w-4 h-4" />,
  yelp: <MapPin className="w-4 h-4" />,
  imdb: <FilmIcon className="w-4 h-4" />,
  letterboxd: <FilmIcon className="w-4 h-4" />,
  googlemaps: <MapPin className="w-4 h-4" />,
  google: <Globe className="w-4 h-4" />,
  salesforce: <Building className="w-4 h-4" />,
  trello: <Monitor className="w-4 h-4" />,
  evernote: <Newspaper className="w-4 h-4" />,
  flowcv: <FileCode className="w-4 h-4" />,
  links: <Link className="w-4 h-4" />,
  search: <Search className="w-4 h-4" />,
  custom: <Link2 className="w-4 h-4" />,
};

export const PersonalDetailsEditor: React.FC<PersonalDetailsEditorProps> = ({ data, onChange }) => {
  const [showLinkPicker, setShowLinkPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const profileLinks = data.profileLinks || [];

  const addProfileLink = (platform: SocialPlatformId) => {
    const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
    const newLink: ProfileLink = {
      id: uuidv4(),
      platform,
      displayText: platformInfo?.name || 'Link',
      url: '',
      enabled: true,
    };
    onChange({ ...data, profileLinks: [...profileLinks, newLink] });
    setShowLinkPicker(false);
    setSearchQuery('');
  };

  const updateProfileLink = (id: string, field: keyof ProfileLink, value: string | boolean) => {
    const updated = profileLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    );
    onChange({ ...data, profileLinks: updated });
  };

  const removeProfileLink = (id: string) => {
    onChange({ ...data, profileLinks: profileLinks.filter(link => link.id !== id) });
  };

  // Get available platforms (not already added)
  const usedPlatforms = new Set(profileLinks.map(l => l.platform));
  const availablePlatforms = SOCIAL_PLATFORMS.filter(p => !usedPlatforms.has(p.id));
  
  // Filter platforms by search
  const filteredPlatforms = useMemo(() => {
    if (!searchQuery.trim()) return availablePlatforms;
    const query = searchQuery.toLowerCase();
    return availablePlatforms.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }, [availablePlatforms, searchQuery]);

  // Get common platforms that are still available
  const availableCommonPlatforms = COMMON_PLATFORMS.filter(id => !usedPlatforms.has(id));

  return (
    <div className="space-y-4">
      {/* Full Name & Job Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="editor-label">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              className="editor-input pl-10"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="editor-label">Job Title</label>
          <input
            type="text"
            className="editor-input"
            placeholder="Software Engineer"
            value={data.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="editor-label">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              className="editor-input pl-10"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="editor-label">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              className="editor-input pl-10"
              placeholder="+1 234 567 890"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="editor-label">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            className="editor-input pl-10"
            placeholder="New York, NY"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
      </div>

      {/* Profile Links Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="editor-label mb-0">Profile Links</label>
          <Dialog open={showLinkPicker} onOpenChange={setShowLinkPicker}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Profile Link</DialogTitle>
              </DialogHeader>
              
              {/* Quick Select - Common Platforms */}
              {availableCommonPlatforms.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Quick Select</p>
                  <div className="flex flex-wrap gap-2">
                    {availableCommonPlatforms.map((platformId) => {
                      const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
                      if (!platform) return null;
                      return (
                        <button
                          key={platformId}
                          onClick={() => addProfileLink(platformId as SocialPlatformId)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all text-sm"
                        >
                          <span className="text-primary">
                            {PLATFORM_ICONS[platformId] || <Link2 className="w-4 h-4" />}
                          </span>
                          <span>{platform.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search all platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* All Platforms List */}
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 gap-2 pr-4">
                  {filteredPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => addProfileLink(platform.id as SocialPlatformId)}
                      className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all text-sm text-left"
                    >
                      <span className="text-primary flex-shrink-0">
                        {PLATFORM_ICONS[platform.id] || <Link2 className="w-4 h-4" />}
                      </span>
                      <span className="truncate">{platform.name}</span>
                    </button>
                  ))}
                </div>
                {filteredPlatforms.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No platforms found for "{searchQuery}"
                  </p>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <AnimatePresence mode="popLayout">
          {profileLinks.map((link) => {
            const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 p-3 bg-muted/30 rounded-lg border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {PLATFORM_ICONS[link.platform] || <Link2 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Display Text</label>
                      <input
                        type="text"
                        className="editor-input text-sm"
                        placeholder={platformInfo?.name || 'Display text'}
                        value={link.displayText}
                        onChange={(e) => updateProfileLink(link.id, 'displayText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">URL</label>
                      <input
                        type="url"
                        className="editor-input text-sm"
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => updateProfileLink(link.id, 'url', e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeProfileLink(link.id)}
                    className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {profileLinks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4 bg-muted/20 rounded-lg">
            Add links to your LinkedIn, GitHub, portfolio, and other profiles.
          </p>
        )}
      </div>
    </div>
  );
};
