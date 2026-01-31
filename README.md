# Studio Icons

Animated Lottie icons for Home Assistant.

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**English** | [Čeština](README.cs.md)

## Features

- **73 Animated Icons** - Smooth Lottie animations for your dashboard
- **Two Animation Types:**
  - **SIL (Loop)** - Continuously animated icons
  - **SIS (State)** - Icons that animate on hover or state change
- **HACS Compatible** - Easy installation via HACS

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

1. Download `studio-icons.js` from this repository
2. Place it in your `config/www` folder
3. Add to `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/studio-icons.js
```

4. Restart Home Assistant

## Usage in Home Assistant

### Basic Usage

Use icons with the prefix:
- `sil:` for loop icons (e.g., `sil:fan`)
- `sis:` for state icons (e.g., `sis:lightbulb-outline`)

### Card Examples

```yaml
# Button card
type: button
entity: light.living_room
icon: sil:lightbulb-on

# Entities card
type: entities
entities:
  - entity: climate.thermostat
    icon: sil:thermostat
  - entity: fan.bedroom
    icon: sil:fan
  - entity: lock.front_door
    icon: sis:lock-outline

# Tile card
type: tile
entity: vacuum.robot
icon: sil:robot-vacuum
```

## Available Icons (73)

### Climate/HVAC
| Icon | Name | Type |
|------|------|------|
| | `air-conditioner` | SIL |
| | `fire` | SIL |
| | `radiator` | SIL |
| | `snowflake` | SIL |
| | `thermometer-lines` | SIL |
| | `thermostat` | SIL |
| | `water-percent` | SIL |

### Lighting
| Icon | Name | Type |
|------|------|------|
| | `brightness-6` | SIL |
| | `ceiling-light` | SIS |
| | `lightbulb-on` | SIL |
| | `lightbulb-outline` | SIS |

### Power/Energy
| Icon | Name | Type |
|------|------|------|
| | `battery-charging` | SIL |
| | `ev-station` | SIL |
| | `flash` | SIS |
| | `plug` | SIS |
| | `power` | SIS |
| | `solar-panel` | SIL |

### Security
| Icon | Name | Type |
|------|------|------|
| | `alert-box-outline` | SIS |
| | `cctv` | SIL |
| | `lock-outline` | SIS |
| | `motion-sensor` | SIL |
| | `shield-home` | SIS |
| | `smoke-detector` | SIS |

### Doors/Windows
| Icon | Name | Type |
|------|------|------|
| | `blinds` | SIS |
| | `door-open` | SIS |
| | `garage` | SIS |
| | `gate` | SIS |
| | `window-open` | SIS |

### Appliances
| Icon | Name | Type |
|------|------|------|
| | `coffee` | SIL |
| | `fan` | SIL |
| | `fridge-outline` | SIL |
| | `microwave` | SIL |
| | `robot-vacuum` | SIL |
| | `television` | SIS |
| | `washing-machine` | SIL |

### Media
| Icon | Name | Type |
|------|------|------|
| | `cast` | SIL |
| | `music-note` | SIL |
| | `play-circle` | SIS |
| | `speaker` | SIS |
| | `volume-high` | SIL |

### Network
| Icon | Name | Type |
|------|------|------|
| | `router-wireless` | SIL |
| | `server` | SIL |
| | `wifi` | SIL |

### Water
| Icon | Name | Type |
|------|------|------|
| | `shower` | SIL |
| | `sprinkler` | SIL |
| | `water-drop` | SIL |
| | `water-pump` | SIL |

### Weather
| Icon | Name | Type |
|------|------|------|
| | `cloud-outline` | SIL |
| | `lightning-bolt` | SIS |
| | `weather-fog` | SIL |
| | `weather-hail` | SIL |
| | `weather-night` | SIL |
| | `weather-partly-cloudy` | SIL |
| | `weather-sunny` | SIL |

### Rooms
| Icon | Name | Type |
|------|------|------|
| | `bed` | SIL |
| | `desk` | SIL |
| | `home-outline` | SIS |
| | `sofa-single-outline` | SIS |

### Notifications
| Icon | Name | Type |
|------|------|------|
| | `bell-outline` | SIS |
| | `check-circle` | SIS |
| | `close-circle` | SIS |
| | `email-outline` | SIS |

### Misc
| Icon | Name | Type |
|------|------|------|
| | `camera` | SIS |
| | `car` | SIL |
| | `clock-outline` | SIL |
| | `cog-outline` | SIL |
| | `heart-outline` | SIS |
| | `leaf` | SIL |
| | `package-variant` | SIS |
| | `pot-steam-outline` | SIS |
| | `recycle` | SIL |
| | `run` | SIL |
| | `timer` | SIL |

## Icon Types

### SIL (Studio Icons Loop)
- Continuously animated
- Best for: fans, weather, loading states
- Use: `sil:icon-name`

### SIS (Studio Icons State)
- Animates on hover or state change
- Best for: lights, locks, buttons
- Use: `sis:icon-name`

## CSS Custom Properties

```css
studio-icon {
  --studio-icons-color: #ff9800;
  --studio-icons-background: transparent;
  --mdc-icon-size: 32px;
}
```

## Troubleshooting

### Icons not showing
1. Restart Home Assistant after installation
2. Clear browser cache (Ctrl+Shift+R)
3. Check browser console (F12) for:
   ```
   STUDIO-ICONS 🌸 - v1.4.0 (73 icons)
   ```

### Icons show as alert icon
- The icon name doesn't exist
- Check spelling and use correct prefix (sil: or sis:)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- Lottie animations powered by [Lottie-web](https://github.com/airbnb/lottie-web)
- Icon designs based on [Material Design Icons](https://materialdesignicons.com/)
