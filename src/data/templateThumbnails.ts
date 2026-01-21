// Template thumbnail imports
import professionalThumb from '@/assets/templates/professional.png';
import executiveThumb from '@/assets/templates/executive.png';
import harvardThumb from '@/assets/templates/harvard.png';
import modernCleanThumb from '@/assets/templates/modern-clean.png';
import techProThumb from '@/assets/templates/tech-pro.png';
import consultantThumb from '@/assets/templates/consultant.png';
import sidebarDarkThumb from '@/assets/templates/sidebar-dark.png';
import sidebarNavyThumb from '@/assets/templates/sidebar-navy.png';
import sidebarTealThumb from '@/assets/templates/sidebar-teal.png';
import sidebarLightThumb from '@/assets/templates/sidebar-light.png';
import creativeBoldThumb from '@/assets/templates/creative-bold.png';
import minimalThumb from '@/assets/templates/minimal.png';
import minimalLinesThumb from '@/assets/templates/minimal-lines.png';
import mixedModernThumb from '@/assets/templates/mixed-modern.png';
import atlanticThumb from '@/assets/templates/atlantic-blue.png';
import emeraldThumb from '@/assets/templates/emerald.png';
import roseThumb from '@/assets/templates/rose.png';
import slateThumb from '@/assets/templates/slate.png';
import amberThumb from '@/assets/templates/amber.png';
import corporateThumb from '@/assets/templates/corporate.png';

// Map template IDs to their thumbnail images
export const templateThumbnails: Record<string, string> = {
  'professional': professionalThumb,
  'executive': executiveThumb,
  'harvard': harvardThumb,
  'modern-clean': modernCleanThumb,
  'tech-pro': techProThumb,
  'consultant-edge': consultantThumb,
  'sidebar-dark': sidebarDarkThumb,
  'sidebar-navy': sidebarNavyThumb,
  'sidebar-teal': sidebarTealThumb,
  'sidebar-light': sidebarLightThumb,
  'creative-bold': creativeBoldThumb,
  'minimal': minimalThumb,
  'minimal-lines': minimalLinesThumb,
  'mixed-modern': mixedModernThumb,
  'mixed-corporate': corporateThumb,
  'atlantic-blue': atlanticThumb,
  'emerald': emeraldThumb,
  'rose': roseThumb,
  'slate': slateThumb,
  'amber': amberThumb,
};

// Get thumbnail for a template, with fallback
export const getTemplateThumbnail = (templateId: string): string | null => {
  return templateThumbnails[templateId] || null;
};
