/**
 * Studio Icons v2.0
 *
 * Animated Lottie icons for Home Assistant
 *
 * @author Studio Icons Team
 * @license MIT
 */

// Export version
export { VERSION } from './constants';

// Export types
export type {
  AnimationTrigger,
  IconType,
  RendererType,
  StudioIconConfig,
  IconMetadata,
  LottieAnimationData,
  LottiePlayer
} from './types';

// Export components
export { StudioIcon } from './components/studio-icon';

// Export utilities
export { iconCache } from './utils/cache';
export { deviceDetector } from './utils/device';
export { lottieLoader } from './utils/lottie-loader';
export { logger } from './utils/logger';

// Export icons
export { iconTemplates, iconMetadata, iconNames, iconCount } from './icons';

// Export HA integration
export { initHAIntegration, cleanupHAIntegration } from './utils/ha-integration';

// Auto-initialize
import { logger } from './utils/logger';
import { initHAIntegration } from './utils/ha-integration';
import { deviceDetector } from './utils/device';
import { lottieLoader } from './utils/lottie-loader';
import { PERFORMANCE } from './constants';

// Initialize on load
function init(): void {
  // Print banner
  logger.printBanner();

  // Detect device capabilities
  const capabilities = deviceDetector.detect();
  logger.debug('Device capabilities:', capabilities);

  // Set Lottie quality based on device
  if (capabilities.isLowPower) {
    lottieLoader.setGlobalQuality('medium');
    logger.info('Low-power device detected, using medium quality');
  }

  // Warn if too many icons might cause performance issues
  const checkAnimationCount = (): void => {
    const activeCount = lottieLoader.getActiveCount();
    if (activeCount > PERFORMANCE.MAX_CONCURRENT_ANIMATIONS) {
      logger.warn(
        `High animation count (${activeCount}), consider reducing visible icons`
      );
    }
  };

  // Check periodically
  setInterval(checkAnimationCount, 30000);

  // Initialize Home Assistant integration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHAIntegration);
  } else {
    initHAIntegration();
  }
}

// Run initialization
init();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).StudioIcons = {
    version: '2.0.0',
    logger,
    deviceDetector,
    lottieLoader,
    iconCache: () => import('./utils/cache').then(m => m.iconCache)
  };
}
