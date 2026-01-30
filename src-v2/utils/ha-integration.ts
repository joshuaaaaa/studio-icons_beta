/**
 * Studio Icons v2.0 - Home Assistant Integration
 *
 * This module handles integration with Home Assistant's frontend
 * using MutationObserver instead of monkey-patching for better stability.
 */

import {
  COMPONENT_TAG,
  ICON_PREFIX_LOOP,
  ICON_PREFIX_STATE
} from '../constants';
import type { HAIcon, HAStateIcon, IconMetadata, IconResult } from '../types';
import { iconTemplates, iconMetadata } from '../icons';
import { logger } from './logger';

// SVG paths cache for HA icon picker
const svgPaths: Record<string, string> = {};

/**
 * Initialize Home Assistant integration
 */
export function initHAIntegration(): void {
  registerCustomIconsets();
  setupMutationObserver();
  preloadSVGPaths();
  logger.info('Home Assistant integration initialized');
}

/**
 * Register custom iconsets with Home Assistant
 */
function registerCustomIconsets(): void {
  // Ensure global objects exist
  window.customIconsets = window.customIconsets || {};
  window.customIcons = window.customIcons || {};

  // Register SIL (Loop) icons
  window.customIconsets[ICON_PREFIX_LOOP] = getIcon;
  window.customIcons[ICON_PREFIX_LOOP] = {
    getIcon,
    getIconList
  };

  // Register SIS (State) icons
  window.customIconsets[ICON_PREFIX_STATE] = getIcon;
  window.customIcons[ICON_PREFIX_STATE] = {
    getIcon,
    getIconList
  };

  logger.debug('Custom iconsets registered');
}

/**
 * Get icon for HA icon picker
 */
async function getIcon(name: string): Promise<IconResult | string> {
  if (!(name in svgPaths)) {
    logger.warn(`Icon "${name}" not available in SVG paths`);
    return '';
  }

  return {
    path: svgPaths[name],
    viewBox: '0 0 24 24'
  };
}

/**
 * Get list of available icons for HA icon picker
 */
async function getIconList(): Promise<IconMetadata[]> {
  return iconMetadata.map(icon => ({
    name: icon.name,
    keywords: icon.keywords
  }));
}

/**
 * Preload SVG paths from ha-icon for icon picker compatibility
 */
async function preloadSVGPaths(): Promise<void> {
  // Wait for ha-icon to be defined
  await customElements.whenDefined('ha-icon');

  const iconNames = Object.keys(iconTemplates);

  for (const name of iconNames) {
    try {
      const tempIcon = document.createElement('ha-icon') as HAIcon;
      tempIcon.setAttribute('icon', `mdi:${name}`);
      tempIcon.style.display = 'none';
      document.body.appendChild(tempIcon);

      // Wait for icon to load
      if (tempIcon._loadIcon) {
        await tempIcon._loadIcon();
        if (tempIcon._path) {
          svgPaths[name] = tempIcon._path;
        }
      }

      document.body.removeChild(tempIcon);
    } catch (error) {
      logger.debug(`Could not preload SVG for: ${name}`, error);
    }
  }

  logger.debug(`Preloaded ${Object.keys(svgPaths).length} SVG paths`);
}

/**
 * Setup MutationObserver to watch for HA icons that need replacement
 */
function setupMutationObserver(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Check added nodes
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          processElement(node);
        }
      }

      // Check attribute changes
      if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
        processElement(mutation.target);
      }
    }
  });

  // Start observing once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      startObserving(observer);
    });
  } else {
    startObserving(observer);
  }
}

function startObserving(observer: MutationObserver): void {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['icon', 'data-state']
  });

  // Process existing elements
  document.querySelectorAll('ha-icon, ha-state-icon').forEach(el => {
    processElement(el as HTMLElement);
  });

  logger.debug('MutationObserver started');
}

/**
 * Process an element and replace with studio-icon if needed
 */
function processElement(element: HTMLElement): void {
  // Check ha-state-icon elements
  if (element.tagName === 'HA-STATE-ICON') {
    processStateIcon(element as unknown as HAStateIcon);
  }

  // Check ha-icon elements
  if (element.tagName === 'HA-ICON') {
    processIcon(element as unknown as HAIcon);
  }

  // Also check children
  element.querySelectorAll('ha-icon, ha-state-icon').forEach(child => {
    processElement(child as HTMLElement);
  });
}

/**
 * Process ha-state-icon element
 */
function processStateIcon(element: HAStateIcon): void {
  const icon = element.__icon || element.getAttribute('icon');
  if (!icon) return;

  const prefix = icon.substring(0, 3);
  if (prefix !== ICON_PREFIX_LOOP && prefix !== ICON_PREFIX_STATE) return;

  // Check if already processed
  const existingIcon = element.shadowRoot?.querySelector(COMPONENT_TAG);
  if (existingIcon && existingIcon.getAttribute('icon') === icon) {
    // Just update state if needed
    const state = element.getAttribute('data-state') || 'off';
    if (existingIcon.getAttribute('state') !== state) {
      existingIcon.setAttribute('state', state);
    }
    // Update color
    const cs = window.getComputedStyle(element);
    existingIcon.setAttribute('primary-color', cs.color);
    return;
  }

  // Create studio-icon
  const studioIcon = document.createElement(COMPONENT_TAG);
  studioIcon.setAttribute('icon', icon);

  // Set state
  const state = element.getAttribute('data-state') || 'off';
  studioIcon.setAttribute('state', state);

  // Set color
  const cs = window.getComputedStyle(element);
  studioIcon.setAttribute('primary-color', cs.color);

  // Replace content in shadow root
  if (element.shadowRoot) {
    element.shadowRoot.innerHTML = '';
    element.shadowRoot.appendChild(studioIcon);
  }

  logger.debug(`Replaced ha-state-icon with ${icon}`);
}

/**
 * Process ha-icon element
 */
function processIcon(element: HAIcon): void {
  const icon = element.__icon || element.getAttribute('icon');
  if (!icon) return;

  const prefix = icon.substring(0, 3);
  if (prefix !== ICON_PREFIX_LOOP && prefix !== ICON_PREFIX_STATE) return;

  // Check if already replaced
  if (element._studioIconReplaced) return;

  // Check if visible
  if (!element.offsetParent) return;

  // Skip if has slot attribute (used in specific contexts)
  if (element.hasAttribute('slot')) return;

  // Check if next sibling is already a studio-icon
  const nextSibling = element.nextElementSibling;
  if (nextSibling?.tagName === COMPONENT_TAG.toUpperCase() &&
      nextSibling.getAttribute('icon') === icon) {
    element.style.display = 'none';
    element._studioIconReplaced = true;
    return;
  }

  // Mark as replaced
  element._studioIconReplaced = true;

  // Create studio-icon
  const studioIcon = document.createElement(COMPONENT_TAG);
  studioIcon.setAttribute('icon', icon);

  // Copy slot if present
  const slot = element.getAttribute('slot');
  if (slot) {
    studioIcon.setAttribute('slot', slot);
  }

  // Insert after and remove original
  element.after(studioIcon);
  element.remove();

  logger.debug(`Replaced ha-icon with ${icon}`);
}

/**
 * Cleanup function (for testing/development)
 */
export function cleanupHAIntegration(): void {
  // Remove all studio-icons
  document.querySelectorAll(COMPONENT_TAG).forEach(el => el.remove());

  // Reset iconsets
  if (window.customIconsets) {
    delete window.customIconsets[ICON_PREFIX_LOOP];
    delete window.customIconsets[ICON_PREFIX_STATE];
  }
  if (window.customIcons) {
    delete window.customIcons[ICON_PREFIX_LOOP];
    delete window.customIcons[ICON_PREFIX_STATE];
  }

  logger.info('Home Assistant integration cleaned up');
}
