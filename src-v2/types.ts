/**
 * Studio Icons v2.0 - Type Definitions
 */

// Lottie animation data structure
export interface LottieAnimationData {
  v: string;           // Version
  fr: number;          // Frame rate
  ip: number;          // In point (start frame)
  op: number;          // Out point (end frame)
  w: number;           // Width
  h: number;           // Height
  nm?: string;         // Name
  ddd?: number;        // 3D flag
  assets?: LottieAsset[];
  layers: LottieLayer[];
}

export interface LottieAsset {
  id: string;
  w?: number;
  h?: number;
  u?: string;
  p?: string;
  e?: number;
  layers?: LottieLayer[];
}

export interface LottieLayer {
  ddd?: number;
  ind?: number;
  ty: number;
  nm?: string;
  sr?: number;
  ks?: object;
  ao?: number;
  shapes?: object[];
  ip: number;
  op: number;
  st: number;
  bm?: number;
}

// Lottie player instance interface
export interface LottiePlayer {
  play(): void;
  pause(): void;
  stop(): void;
  destroy(): void;
  setSpeed(speed: number): void;
  setDirection(direction: 1 | -1): void;
  goToAndStop(frame: number, isFrame?: boolean): void;
  goToAndPlay(frame: number, isFrame?: boolean): void;
  playSegments(segments: [number, number] | [number, number][], forceFlag?: boolean): void;
  getDuration(inFrames?: boolean): number;
  totalFrames: number;
  currentFrame: number;
  isPaused: boolean;
  isLoaded: boolean;
}

// Animation trigger types
export type AnimationTrigger =
  | 'always'    // Continuously animate (SIL behavior)
  | 'hover'     // Animate on mouse hover (SIS behavior)
  | 'state'     // Animate on state change
  | 'once'      // Animate once on load
  | 'click'     // Animate on click
  | 'none';     // Static, no animation

// Icon type prefixes
export type IconType = 'sil' | 'sis';

// Renderer types
export type RendererType = 'svg' | 'canvas' | 'html';

// Icon configuration
export interface StudioIconConfig {
  icon: string;
  trigger?: AnimationTrigger;
  speed?: number;
  direction?: 1 | -1;
  loop?: boolean;
  autoplay?: boolean;
  renderer?: RendererType;
  segment?: [number, number];
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

// Icon metadata for listing
export interface IconMetadata {
  name: string;
  type: IconType;
  category?: string;
  keywords?: string[];
  path?: string;
  viewBox?: string;
}

// Cache entry
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Home Assistant icon interfaces
export interface HAIcon extends HTMLElement {
  icon?: string;
  __icon?: string;
  _path?: string;
  _loadIcon?: () => Promise<void>;
  _studioIconReplaced?: boolean;
}

export interface HAStateIcon extends HTMLElement {
  icon?: string;
  __icon?: string;
  stateObj?: HAStateObject;
  shadowRoot: ShadowRoot;
}

export interface HAStateObject {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// Global window extensions for Home Assistant
declare global {
  interface Window {
    customIconsets?: Record<string, (name: string) => Promise<IconResult>>;
    customIcons?: Record<string, {
      getIcon: (name: string) => Promise<IconResult>;
      getIconList: () => Promise<IconMetadata[]>;
    }>;
    bodymovin?: typeof import('lottie-web').default;
    lottie?: typeof import('lottie-web').default;
  }
}

// Icon result for HA integration
export interface IconResult {
  path: string;
  viewBox: string;
}

// Event detail types
export interface StudioIconEventDetail {
  icon: string;
  state?: string;
  frame?: number;
}

// Custom events
export interface StudioIconEventMap {
  'studio-icon-loaded': CustomEvent<StudioIconEventDetail>;
  'studio-icon-complete': CustomEvent<StudioIconEventDetail>;
  'studio-icon-loop': CustomEvent<StudioIconEventDetail>;
  'studio-icon-error': CustomEvent<{ icon: string; error: Error }>;
}
