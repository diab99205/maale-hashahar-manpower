export type Language = 'he' | 'ar' | 'en';

export interface Translation {
  nav_home: string;
  nav_about: string;
  nav_services: string;
  nav_projects: string;
  nav_contact: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  about_title: string;
  about_desc: string;
  services_title: string;
  projects_title: string;
  why_us_title: string;
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
  access_title: string; // Keep for backward compat or button tooltip
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
}

export interface ServiceItem {
  icon: string;
  titleKey: string; 
}

export interface ProjectItem {
  image: string;
  // We replace single name/location/desc with language-specific ones
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
  // We keep this for the legacy App code structure if needed, 
  // but the new component manages state internally.
  largeText: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  dyslexicFont: boolean;
}