# Studio Icons v2.0

Animated Lottie icons for Home Assistant.

[![HACS Badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/joshuaaaaa/studio-icons_beta.svg)](https://github.com/joshuaaaaa/studio-icons_beta/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Animated Icons** - Smooth Lottie animations for your dashboard
- **Two Animation Types:**
  - **SIL (Loop)** - Continuously animated icons
  - **SIS (State)** - Icons that animate on hover or state change
- **Performance Optimized:**
  - Intersection Observer - animations pause when off-screen
  - Lazy loading with caching
  - Canvas renderer option for low-power devices
- **Accessibility:**
  - Respects `prefers-reduced-motion` setting
  - Keyboard navigable
- **TypeScript** - Full type definitions included
- **HACS Compatible** - Easy installation via HACS

## Preview

### State Icons (SIS)
Animate when state is on, or when you hover over the icon.

![Preview](https://github.com/joshuaaaaa/studio-icons_beta/blob/main/docs/studio-icons-sis.gif)

### Loop Icons (SIL)
Continuously animated.

![Preview](https://github.com/joshuaaaaa/studio-icons_beta/blob/main/docs/studio-icons-sil.gif)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to "Frontend" section
3. Click the three dots menu → "Custom repositories"
4. Add repository: `https://github.com/joshuaaaaa/studio-icons_beta`
5. Category: "Lovelace"
6. Click "Add"
7. Install "Studio Icons"
8. Restart Home Assistant

### Manual Installation

1. Download `studio-icons.js` from the [latest release](https://github.com/joshuaaaaa/studio-icons_beta/releases)
2. Place it in your `config/www` folder
3. Add to `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/studio-icons.js
```

4. Restart Home Assistant

## Usage

### In the Icon Picker

Search for icons using the prefix:
- `sil:` for loop icons (e.g., `sil:weather-sunny`)
- `sis:` for state icons (e.g., `sis:alert-box-outline`)

### Available Icons

| Icon Name | Type | Description |
|-----------|------|-------------|
| `weather-sunny` | SIL | Animated sun |
| `weather-partly-cloudy` | SIL | Sun with clouds |
| `weather-night` | SIL | Moon and stars |
| `weather-fog` | SIL | Foggy weather |
| `weather-hail` | SIL | Hail animation |
| `cloud-outline` | SIL | Floating cloud |
| `alert-box-outline` | SIS | Alert/warning icon |
| `pot-steam-outline` | SIS | Steaming pot |
| `sofa-single-outline` | SIS | Sofa icon |

### Advanced Configuration

You can use the `studio-icon` element directly with additional attributes:

```html
<studio-icon
  icon="sil:weather-sunny"
  speed="1.5"
  trigger="hover"
  primary-color="#ff9800"
></studio-icon>
```

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `icon` | string | - | Icon name with prefix (required) |
| `state` | string | - | Entity state (`on`/`off`) |
| `trigger` | string | auto | Animation trigger: `always`, `hover`, `state`, `click`, `once`, `none` |
| `speed` | number | 1 | Animation speed multiplier |
| `direction` | number | 1 | Animation direction (1 or -1) |
| `loop` | boolean | true | Loop animation |
| `renderer` | string | svg | Renderer: `svg`, `canvas` |
| `primary-color` | string | - | Primary icon color |
| `secondary-color` | string | - | Secondary color |
| `accent-color` | string | - | Accent color |

### CSS Custom Properties

```css
studio-icon {
  --studio-icons-color: #ff9800;
  --studio-icons-secondary-color: #2196f3;
  --studio-icons-accent-color: #4caf50;
  --studio-icons-background: transparent;
  --mdc-icon-size: 32px;
}
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/joshuaaaaa/studio-icons_beta.git
cd studio-icons_beta

# Install dependencies
npm install

# Build icons
npm run build:icons

# Development mode (watch)
npm run dev

# Production build
npm run build
```

### Project Structure

```
studio-icons_beta/
├── src-v2/                 # TypeScript source (v2.0)
│   ├── components/         # Web Components
│   ├── utils/              # Utilities
│   ├── styles/             # CSS styles
│   ├── icons/              # Generated icon data
│   ├── types.ts            # TypeScript definitions
│   ├── constants.ts        # Constants
│   └── index.ts            # Entry point
├── src/                    # Legacy JavaScript (v1.x)
├── lottie-json/            # Lottie animation files
├── dist/                   # Built output
├── scripts/                # Build scripts
└── docs/                   # Documentation
```

### Adding New Icons

1. Create animation in After Effects (24x24px, 25fps)
2. Export as Lottie JSON using Bodymovin
3. Place in `lottie-json/` folder
4. Run `npm run build:icons`
5. Rebuild: `npm run build`

### Animation Guidelines

- **Dimensions:** 24x24 pixels
- **Frame rate:** 25 fps
- **Duration:** 2 seconds (short) or 4 seconds (long)
- **CSS Classes:**
  - `.inline` - Fill color
  - `.outline` - Stroke color
  - `.background` - Background fill

## Debugging

Enable debug mode in browser console:

```javascript
localStorage.setItem('studio-icons-debug', 'true');
```

Access debugging utilities:

```javascript
// Check active animations
window.StudioIcons.lottieLoader.getActiveCount();

// View device capabilities
window.StudioIcons.deviceDetector.detect();

// Check cache stats
window.StudioIcons.iconCache().then(cache => console.log(cache.getStats()));
```

## Changelog

### v2.0.0
- Complete rewrite in TypeScript
- Lit Element based Web Component
- MutationObserver instead of monkey-patching
- Intersection Observer for performance
- `prefers-reduced-motion` support
- Lazy loading with caching
- HACS integration
- Multiple animation triggers
- Multi-color support

### v1.1.0
- Fixed flickering issues
- Fixed memory leaks in disconnectedCallback
- Added initialization guards

### v1.0.1
- Initial beta release

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

- Report bugs via [GitHub Issues](https://github.com/joshuaaaaa/studio-icons_beta/issues)
- Submit PRs for new features or fixes
- Help create new icon animations

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- Lottie animations powered by [Lottie-web](https://github.com/airbnb/lottie-web)
- Icon designs based on [Material Design Icons](https://materialdesignicons.com/)
