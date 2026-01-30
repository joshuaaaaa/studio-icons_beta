/**
 * Studio Icons v2.0 - Component Styles
 */

import { css } from 'lit';

export const studioIconStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mdc-icon-size, 24px);
    height: var(--mdc-icon-size, 24px);
    margin: auto;
    fill: inherit;
    stroke: inherit;
    vertical-align: middle;
    contain: content;
  }

  :host([hidden]) {
    display: none;
  }

  .icon-wrapper {
    display: var(--ha-icon-display, inline-flex);
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Lottie SVG container */
  .icon-wrapper svg {
    width: 100%;
    height: 100%;
  }

  /* Static SVG fallback */
  .static-icon {
    width: 100%;
    height: 100%;
    fill: var(--studio-icons-color, var(--primary-text-color, var(--icon-primary-color, currentColor)));
  }

  /* Lottie layer classes */
  .background {
    fill: var(
      --studio-icons-background,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
  }

  .outline {
    stroke: var(
      --studio-icons-color,
      var(--primary-text-color, var(--icon-primary-color, currentColor))
    );
    fill: none;
  }

  .inline {
    fill: var(
      --studio-icons-color,
      var(--primary-text-color, var(--icon-primary-color, currentColor))
    );
  }

  /* Secondary color support */
  .secondary,
  .outline-secondary {
    stroke: var(
      --studio-icons-secondary-color,
      var(--secondary-text-color, var(--studio-icons-color, currentColor))
    );
  }

  .inline-secondary {
    fill: var(
      --studio-icons-secondary-color,
      var(--secondary-text-color, var(--studio-icons-color, currentColor))
    );
  }

  /* Accent color support */
  .accent,
  .outline-accent {
    stroke: var(
      --studio-icons-accent-color,
      var(--accent-color, var(--primary-color, currentColor))
    );
  }

  .inline-accent {
    fill: var(
      --studio-icons-accent-color,
      var(--accent-color, var(--primary-color, currentColor))
    );
  }

  /* Reduced motion state */
  :host([reduced-motion]) .icon-wrapper {
    animation: none !important;
  }

  /* Loading state */
  :host([loading]) .icon-wrapper {
    opacity: 0.5;
  }

  /* Error state */
  :host([error]) .icon-wrapper {
    opacity: 0.3;
  }

  /* Interactive states for SIS icons */
  :host([trigger="hover"]:hover) {
    cursor: pointer;
  }

  :host([trigger="click"]) {
    cursor: pointer;
  }

  /* Focus visible for accessibility */
  :host(:focus-visible) {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
