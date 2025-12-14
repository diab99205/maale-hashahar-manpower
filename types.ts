import { LucideIcon } from 'lucide-react';

export type Language = 'he' | 'ar' | 'en';

export interface Translation {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_services: string;
  nav_projects: string;
  nav_contact: string;
  
  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  
  // Sections
  about_title: string;
  about_desc: string;
  services_title: string;
  projects_title: string;
  why_us_title: string;
  
  // Contact Form
  contact_title: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_city: string;
  contact_cv: string;
  contact_submit: string;
  contact_info_title: string;
  footer_rights: string;
  
  // Accessibility
  access_title: string;
  accessibility: string;
  accessibilityTools: string;
  customizeYourExperience: string;
  textSize: string;
  colorModes: string;
  grayscale: string;
  invertColors: string;
  lowSaturation: string;
  colorBlindFilter: string;
  none: string;
  redGreen: string;
  red: string;
  blueYellow: string;
  visualOptions: string;
  highContrast: string;
  largeText: string;
  highlightLinks: string;
  underlineLinks: string;
  hideImages: string;
  textOptions: string;
  readableFont: string;
  increaseLineSpacing: string;
  letterSpacing: string;
  textAlignment: string;
  navigationOptions: string;
  largeCursor: string;
  reduceMotion: string;
  stopAnimations: string;
  resetToDefault: string;
  needHelp: string;
  viewFullStatement: string;

  // Index signature to allow dynamic access if needed
  [key: string]: string;
}

// FIXED: Updated to match your App.tsx usage
export interface ServiceItem {
  icon: LucideIcon; // It's a component, not a string
  label_he: string;
  label_ar: string;
  label_en: string;
}

// CORRECT: matches your multilingual setup
export interface ProjectItem {
  image: string;
  name_he: string;
  name_ar: string;
  name_en: string;
  location_he: string;
  location_ar: string;
  location_en: string;
  description_he: string;
  description_ar: string;
  description_en: string;
}

export interface AccessibilityState {
  largeText: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  dyslexicFont: boolean;
}