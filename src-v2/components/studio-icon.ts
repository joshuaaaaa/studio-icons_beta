/**
 * Studio Icons v2.0 - Main Component
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { studioIconStyles } from '../styles/studio-icon.styles';
import {
  COMPONENT_TAG,
  ICON_PREFIX_LOOP,
  ICON_PREFIX_STATE,
  ICON_ALTERNATIVES,
  FALLBACK_ICON,
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_HOVER_SPEED,
  INTERSECTION_OPTIONS
} from '../constants';
import type {
  AnimationTrigger,
  IconType,
  LottieAnimationData,
  LottiePlayer,
  RendererType
} from '../types';
import { lottieLoader } from '../utils/lottie-loader';
import { deviceDetector } from '../utils/device';
import { logger } from '../utils/logger';

// Import icon templates (will be injected during build)
import { iconTemplates } from '../icons';

@customElement(COMPONENT_TAG)
export class StudioIcon extends LitElement {
  static override styles = studioIconStyles;

  // Public properties (can be set via attributes)
  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'state' })
  iconState = '';

  @property({ type: String, attribute: 'trigger' })
  trigger: AnimationTrigger = 'always';

  @property({ type: Number })
  speed = DEFAULT_ANIMATION_SPEED;

  @property({ type: Number })
  direction: 1 | -1 = 1;

  @property({ type: Boolean })
  loop = true;

  @property({ type: String })
  renderer: RendererType = 'svg';

  @property({ type: String, attribute: 'primary-color' })
  primaryColor = '';

  @property({ type: String, attribute: 'secondary-color' })
  secondaryColor = '';

  @property({ type: String, attribute: 'accent-color' })
  accentColor = '';

  // Internal state
  @state()
  private _loading = false;

  @state()
  private _error = false;

  @state()
  private _reducedMotion = false;

  // Private members
  private _lottie: LottiePlayer | null = null;
  private _iconName = '';
  private _iconType: IconType = 'sil';
  private _initialized = false;
  private _intersectionObserver: IntersectionObserver | null = null;
  private _isVisible = true;
  private _boundMouseEnter: (() => void) | null = null;
  private _boundMouseLeave: (() => void) | null = null;
  private _boundClick: (() => void) | null = null;
  private _eventTarget: EventTarget | null = null;
  private _animationId = '';
  private _unsubscribeReducedMotion: (() => void) | null = null;

  // Lifecycle
  override connectedCallback(): void {
    super.connectedCallback();

    if (this._initialized) return;

    this._setupReducedMotionListener();
    this._parseIcon();
    this._setupIntersectionObserver();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanup();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('icon') && this._initialized) {
      this._parseIcon();
      this._initAnimation();
    }

    if (changedProperties.has('iconState')) {
      this._handleStateChange();
    }

    if (changedProperties.has('primaryColor')) {
      this.style.setProperty('--studio-icons-color', this.primaryColor);
    }

    if (changedProperties.has('secondaryColor')) {
      this.style.setProperty('--studio-icons-secondary-color', this.secondaryColor);
    }

    if (changedProperties.has('accentColor')) {
      this.style.setProperty('--studio-icons-accent-color', this.accentColor);
    }

    if (changedProperties.has('speed') && this._lottie) {
      this._lottie.setSpeed(this.speed);
    }

    if (changedProperties.has('direction') && this._lottie) {
      this._lottie.setDirection(this.direction);
    }
  }

  override render() {
    if (this._reducedMotion) {
      return this._renderStaticIcon();
    }

    return html`
      <div
        class="icon-wrapper"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleClick}
      ></div>
    `;
  }

  override firstUpdated(): void {
    this._initialized = true;
    this._initAnimation();
  }

  // Private methods
  private _parseIcon(): void {
    if (!this.icon) return;

    const prefix = this.icon.substring(0, 3);
    let name = this.icon.substring(4);

    // Determine icon type
    if (prefix === ICON_PREFIX_LOOP) {
      this._iconType = 'sil';
      this.trigger = this.trigger || 'always';
    } else if (prefix === ICON_PREFIX_STATE) {
      this._iconType = 'sis';
      this.trigger = this.trigger || 'hover';
    }

    // Check for alternatives
    if (ICON_ALTERNATIVES[name]) {
      name = ICON_ALTERNATIVES[name];
    }

    // Validate icon exists
    if (!iconTemplates[name]) {
      logger.warn(`Icon not found: ${name}, using fallback`);
      name = FALLBACK_ICON;
    }

    this._iconName = name;
    this._animationId = `${COMPONENT_TAG}-${name}-${Date.now()}`;
  }

  private async _initAnimation(): Promise<void> {
    if (!this._iconName || this._reducedMotion) return;

    this._loading = true;
    this.setAttribute('loading', '');

    try {
      const wrapper = this.shadowRoot?.querySelector('.icon-wrapper');
      if (!wrapper) return;

      // Cleanup existing animation
      if (this._lottie) {
        this._lottie.destroy();
        this._lottie = null;
      }

      // Clear wrapper
      wrapper.innerHTML = '';

      // Get animation data
      const animationData = await lottieLoader.loadIconData(this._iconName, iconTemplates);
      if (!animationData) {
        throw new Error(`Animation data not found: ${this._iconName}`);
      }

      // Determine autoplay and loop based on trigger
      const shouldAutoplay = this.trigger === 'always' || this.trigger === 'once';
      const shouldLoop = this.trigger !== 'once' && this.loop;

      // Load animation
      this._lottie = await lottieLoader.loadAnimation({
        container: wrapper as HTMLElement,
        animationData,
        renderer: this.renderer,
        loop: shouldLoop,
        autoplay: shouldAutoplay && this._isVisible,
        name: this._animationId
      });

      // Set speed and direction
      this._lottie.setSpeed(this.speed);
      this._lottie.setDirection(this.direction);

      // Setup event handlers
      this._setupEventListeners();

      // Dispatch loaded event
      this._dispatchEvent('studio-icon-loaded', { icon: this._iconName });

      this._loading = false;
      this._error = false;
      this.removeAttribute('loading');

      logger.debug(`Icon loaded: ${this._iconName}`);

    } catch (error) {
      this._loading = false;
      this._error = true;
      this.setAttribute('error', '');
      this.removeAttribute('loading');
      logger.error(`Failed to load icon: ${this._iconName}`, error);
      this._dispatchEvent('studio-icon-error', {
        icon: this._iconName,
        error: error as Error
      });
    }
  }

  private _renderStaticIcon() {
    // Render static SVG when reduced motion is preferred
    return html`
      <div class="icon-wrapper">
        <svg class="static-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    `;
  }

  private _setupReducedMotionListener(): void {
    this._reducedMotion = deviceDetector.prefersReducedMotion;
    this.toggleAttribute('reduced-motion', this._reducedMotion);

    this._unsubscribeReducedMotion = deviceDetector.onReducedMotionChange((prefersReduced) => {
      this._reducedMotion = prefersReduced;
      this.toggleAttribute('reduced-motion', prefersReduced);

      if (prefersReduced && this._lottie) {
        this._lottie.stop();
      } else if (!prefersReduced && this._isVisible) {
        this._initAnimation();
      }
    });
  }

  private _setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this._intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this._isVisible = entry.isIntersecting;
        this._handleVisibilityChange();
      });
    }, INTERSECTION_OPTIONS);

    this._intersectionObserver.observe(this);
  }

  private _handleVisibilityChange(): void {
    if (!this._lottie) return;

    if (this._isVisible) {
      if (this.trigger === 'always') {
        this._lottie.play();
      }
    } else {
      this._lottie.pause();
    }
  }

  private _setupEventListeners(): void {
    // For 'state' trigger, check parent HA-CARD
    if (this.trigger === 'hover' || this.trigger === 'state') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const parent = this.offsetParent;
          if (parent instanceof HTMLElement &&
              parent.tagName === 'HA-CARD' &&
              parent.getAttribute('role') === 'button') {
            this._eventTarget = parent;
            this._attachParentListeners(parent);
          }
        });
      });
    }
  }

  private _attachParentListeners(parent: HTMLElement): void {
    this._boundMouseEnter = () => this._handleMouseEnter();
    this._boundMouseLeave = () => this._handleMouseLeave();

    parent.addEventListener('mouseenter', this._boundMouseEnter);
    parent.addEventListener('mouseleave', this._boundMouseLeave);
  }

  private _handleMouseEnter(): void {
    if (!this._lottie || this._reducedMotion) return;
    if (this.trigger !== 'hover' && this.trigger !== 'state') return;

    this._lottie.setSpeed(DEFAULT_HOVER_SPEED);
    this._lottie.play();
  }

  private _handleMouseLeave(): void {
    if (!this._lottie || this._reducedMotion) return;
    if (this.trigger !== 'hover' && this.trigger !== 'state') return;

    this._lottie.setSpeed(this.speed);
    if (this.iconState === 'off' || this.trigger === 'hover') {
      this._lottie.stop();
    }
  }

  private _handleClick(): void {
    if (!this._lottie || this._reducedMotion) return;
    if (this.trigger !== 'click') return;

    this._lottie.stop();
    this._lottie.play();
  }

  private _handleStateChange(): void {
    if (!this._lottie || this.trigger !== 'state') return;

    if (this.iconState === 'on') {
      this._lottie.play();
    } else if (this.iconState === 'off') {
      this._lottie.stop();
    }
  }

  private _cleanup(): void {
    // Remove intersection observer
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }

    // Remove event listeners from parent
    if (this._eventTarget && this._boundMouseEnter) {
      this._eventTarget.removeEventListener('mouseenter', this._boundMouseEnter);
      this._eventTarget.removeEventListener('mouseleave', this._boundMouseLeave);
    }

    // Destroy Lottie animation
    if (this._lottie) {
      this._lottie.stop();
      this._lottie.destroy();
      this._lottie = null;
    }

    // Unsubscribe from reduced motion changes
    if (this._unsubscribeReducedMotion) {
      this._unsubscribeReducedMotion();
      this._unsubscribeReducedMotion = null;
    }

    // Reset state
    this._eventTarget = null;
    this._boundMouseEnter = null;
    this._boundMouseLeave = null;
    this._boundClick = null;
    this._initialized = false;

    logger.debug(`Icon cleanup: ${this._iconName}`);
  }

  private _dispatchEvent(name: string, detail: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  // Public API
  public play(): void {
    this._lottie?.play();
  }

  public pause(): void {
    this._lottie?.pause();
  }

  public stop(): void {
    this._lottie?.stop();
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
    this._lottie?.setSpeed(speed);
  }

  public setDirection(direction: 1 | -1): void {
    this.direction = direction;
    this._lottie?.setDirection(direction);
  }

  public goToFrame(frame: number): void {
    this._lottie?.goToAndStop(frame, true);
  }

  public get isPlaying(): boolean {
    return this._lottie ? !this._lottie.isPaused : false;
  }

  public get currentFrame(): number {
    return this._lottie?.currentFrame ?? 0;
  }

  public get totalFrames(): number {
    return this._lottie?.totalFrames ?? 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studio-icon': StudioIcon;
  }
}
