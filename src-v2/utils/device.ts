/**
 * Studio Icons v2.0 - Device Detection Utility
 */

import { PERFORMANCE } from '../constants';
import type { RendererType } from '../types';

interface DeviceCapabilities {
  isLowPower: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  hardwareConcurrency: number;
  supportsWebGL: boolean;
  touchEnabled: boolean;
  recommendedRenderer: RendererType;
}

class DeviceDetector {
  private capabilities: DeviceCapabilities | null = null;
  private reducedMotionQuery: MediaQueryList | null = null;
  private callbacks: Set<(prefersReducedMotion: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotionQuery.addEventListener('change', this.handleReducedMotionChange.bind(this));
    }
  }

  private handleReducedMotionChange(event: MediaQueryListEvent): void {
    // Update cached capabilities
    if (this.capabilities) {
      this.capabilities.prefersReducedMotion = event.matches;
    }
    // Notify all callbacks
    this.callbacks.forEach(cb => cb(event.matches));
  }

  detect(): DeviceCapabilities {
    if (this.capabilities) {
      return this.capabilities;
    }

    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isMobile = this.detectMobile();
    const isLowPower = hardwareConcurrency <= PERFORMANCE.LOW_HARDWARE_CONCURRENCY || isMobile;
    const prefersReducedMotion = this.reducedMotionQuery?.matches ?? false;
    const supportsWebGL = this.detectWebGL();
    const touchEnabled = this.detectTouch();

    // Determine best renderer
    let recommendedRenderer: RendererType = 'svg';
    if (isLowPower && supportsWebGL) {
      recommendedRenderer = 'canvas';
    }

    this.capabilities = {
      isLowPower,
      isMobile,
      prefersReducedMotion,
      hardwareConcurrency,
      supportsWebGL,
      touchEnabled,
      recommendedRenderer
    };

    return this.capabilities;
  }

  private detectMobile(): boolean {
    if (typeof navigator === 'undefined') return false;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  private detectWebGL(): boolean {
    if (typeof document === 'undefined') return false;

    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }

  private detectTouch(): boolean {
    if (typeof window === 'undefined') return false;

    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }

  get isLowPowerDevice(): boolean {
    return this.detect().isLowPower;
  }

  get prefersReducedMotion(): boolean {
    return this.detect().prefersReducedMotion;
  }

  get isMobileDevice(): boolean {
    return this.detect().isMobile;
  }

  get recommendedRenderer(): RendererType {
    return this.detect().recommendedRenderer;
  }

  onReducedMotionChange(callback: (prefersReducedMotion: boolean) => void): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  // Force refresh capabilities (useful after orientation change)
  refresh(): DeviceCapabilities {
    this.capabilities = null;
    return this.detect();
  }
}

export const deviceDetector = new DeviceDetector();
