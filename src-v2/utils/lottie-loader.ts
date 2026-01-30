/**
 * Studio Icons v2.0 - Lottie Loader Utility
 */

import { LOTTIE_CDN_URL } from '../constants';
import type { LottieAnimationData, LottiePlayer, RendererType } from '../types';
import { iconCache } from './cache';
import { logger } from './logger';

interface LottieLoadOptions {
  container: HTMLElement;
  animationData?: LottieAnimationData;
  path?: string;
  renderer?: RendererType;
  loop?: boolean;
  autoplay?: boolean;
  name?: string;
}

type LottieModule = {
  loadAnimation(params: LottieLoadOptions): LottiePlayer;
  setQuality(quality: string | number): void;
  setLocationHref(href: string): void;
};

class LottieLoader {
  private lottieModule: LottieModule | null = null;
  private loadPromise: Promise<LottieModule> | null = null;
  private activeAnimations = new Map<string, LottiePlayer>();

  async ensureLottieLoaded(): Promise<LottieModule> {
    // Already loaded
    if (this.lottieModule) {
      return this.lottieModule;
    }

    // Loading in progress
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Check if already available globally
    if (window.lottie || window.bodymovin) {
      this.lottieModule = (window.lottie || window.bodymovin) as LottieModule;
      return this.lottieModule;
    }

    // Load from CDN
    this.loadPromise = this.loadLottieFromCDN();
    return this.loadPromise;
  }

  private async loadLottieFromCDN(): Promise<LottieModule> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = LOTTIE_CDN_URL;
      script.async = true;

      script.onload = () => {
        if (window.lottie || window.bodymovin) {
          this.lottieModule = (window.lottie || window.bodymovin) as LottieModule;
          logger.info('Lottie loaded from CDN');
          resolve(this.lottieModule);
        } else {
          reject(new Error('Lottie loaded but not available'));
        }
      };

      script.onerror = () => {
        reject(new Error('Failed to load Lottie from CDN'));
      };

      document.head.appendChild(script);
    });
  }

  async loadAnimation(options: LottieLoadOptions): Promise<LottiePlayer> {
    const lottie = await this.ensureLottieLoaded();

    const animation = lottie.loadAnimation({
      container: options.container,
      renderer: options.renderer || 'svg',
      loop: options.loop ?? true,
      autoplay: options.autoplay ?? false,
      animationData: options.animationData,
      path: options.path,
      name: options.name
    });

    // Track active animations
    if (options.name) {
      this.activeAnimations.set(options.name, animation);
    }

    return animation;
  }

  async loadIconData(iconName: string, iconTemplates: Record<string, LottieAnimationData>): Promise<LottieAnimationData | null> {
    // Check inline templates first
    if (iconTemplates[iconName]) {
      return iconTemplates[iconName];
    }

    // Check cache
    const cached = await iconCache.get(iconName);
    if (cached) {
      return cached;
    }

    // Try to load from external file (for future .lottie support)
    try {
      const response = await fetch(`/local/studio-icons/${iconName}.json`);
      if (response.ok) {
        const data = await response.json();
        await iconCache.set(iconName, data);
        return data;
      }
    } catch (error) {
      logger.debug(`External icon not found: ${iconName}`, error);
    }

    return null;
  }

  destroyAnimation(name: string): void {
    const animation = this.activeAnimations.get(name);
    if (animation) {
      animation.stop();
      animation.destroy();
      this.activeAnimations.delete(name);
      logger.debug(`Animation destroyed: ${name}`);
    }
  }

  destroyAll(): void {
    this.activeAnimations.forEach((animation, name) => {
      animation.stop();
      animation.destroy();
      logger.debug(`Animation destroyed: ${name}`);
    });
    this.activeAnimations.clear();
  }

  getActiveAnimations(): Map<string, LottiePlayer> {
    return new Map(this.activeAnimations);
  }

  getActiveCount(): number {
    return this.activeAnimations.size;
  }

  setGlobalQuality(quality: 'high' | 'medium' | 'low' | number): void {
    if (this.lottieModule) {
      this.lottieModule.setQuality(quality);
      logger.info(`Lottie quality set to: ${quality}`);
    }
  }
}

export const lottieLoader = new LottieLoader();
