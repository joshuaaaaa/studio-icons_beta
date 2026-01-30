/**
 * Studio Icons v2.0 - Constants
 */

export const VERSION = '2.0.0';

// Component tag names
export const COMPONENT_TAG = 'studio-icon';
export const WRAPPER_TAG = 'studio-icon-svg';

// Icon type prefixes
export const ICON_PREFIX_LOOP = 'sil';      // Studio Icons Loop
export const ICON_PREFIX_STATE = 'sis';     // Studio Icons State

// Default values
export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_FRAME_RATE = 25;
export const DEFAULT_ANIMATION_SPEED = 1;
export const DEFAULT_HOVER_SPEED = 2;

// Animation segments (in frames at 25fps)
export const ANIMATION_SEGMENTS = {
  SHORT: 50,    // 2 seconds
  LONG: 100     // 4 seconds
} as const;

// Lottie CDN URL (fallback)
export const LOTTIE_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';

// Icon alternatives mapping (MDI compatibility)
export const ICON_ALTERNATIVES: Record<string, string> = {
  'weather-cloudy': 'cloud-outline',
  'weather-partlycloudy': 'weather-partly-cloudy'
};

// Default fallback icon
export const FALLBACK_ICON = 'alert-box-outline';

// CSS custom properties
export const CSS_VARS = {
  PRIMARY_COLOR: '--studio-icons-color',
  SECONDARY_COLOR: '--studio-icons-secondary-color',
  ACCENT_COLOR: '--studio-icons-accent-color',
  BACKGROUND: '--studio-icons-background',
  SIZE: '--mdc-icon-size'
} as const;

// Home Assistant CSS variables (for fallback)
export const HA_CSS_VARS = {
  PRIMARY_TEXT: '--primary-text-color',
  ICON_PRIMARY: '--icon-primary-color',
  CARD_BACKGROUND: '--ha-card-background',
  CARD_BG_COLOR: '--card-background-color'
} as const;

// Intersection Observer options
export const INTERSECTION_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

// Cache settings
export const CACHE_TTL = 24 * 60 * 60 * 1000;  // 24 hours in ms
export const CACHE_KEY_PREFIX = 'studio-icons-';

// Debug mode flag
export const DEBUG = typeof localStorage !== 'undefined'
  && localStorage.getItem('studio-icons-debug') === 'true';

// Log prefix
export const LOG_PREFIX = '[Studio Icons]';

// Animation events
export const LOTTIE_EVENTS = {
  COMPLETE: 'complete',
  LOOP_COMPLETE: 'loopComplete',
  ENTER_FRAME: 'enterFrame',
  SEGMENT_START: 'segmentStart',
  CONFIG_READY: 'config_ready',
  DATA_READY: 'data_ready',
  LOADED_IMAGES: 'loaded_images',
  DOM_LOADED: 'DOMLoaded',
  DESTROY: 'destroy',
  ERROR: 'error'
} as const;

// Performance thresholds
export const PERFORMANCE = {
  LOW_HARDWARE_CONCURRENCY: 2,
  MAX_CONCURRENT_ANIMATIONS: 10,
  ANIMATION_BUDGET_MS: 16  // 60fps target
} as const;

// Supported icon categories
export const ICON_CATEGORIES = [
  'weather',
  'alerts',
  'home',
  'devices',
  'nature',
  'misc'
] as const;

export type IconCategory = typeof ICON_CATEGORIES[number];
