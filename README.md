# Studio Icons

Animated Lottie icons for Home Assistant.

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Animated Icons** - Smooth Lottie animations for your dashboard
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

## Usage

### In the Icon Picker

Search for icons using the prefix:
- `sil:` for loop icons (e.g., `sil:weather-sunny`)
- `sis:` for state icons (e.g., `sis:alert-box-outline`)

### Available Icons

| Icon Name | Type | Description |
|-----------|------|-------------|
| `alert-box-outline` | SIS | Shaking alert icon |
| `battery-charging` | SIL | Charging battery |
| `bell-outline` | SIS | Ringing bell |
| `blinds` | SIS | Window blinds |
| `camera` | SIS | Camera icon |
| `car` | SIL | Moving car |
| `clock-outline` | SIL | Ticking clock |
| `cloud-outline` | SIL | Floating cloud |
| `cog-outline` | SIL | Spinning cog |
| `door-open` | SIS | Animated door |
| `email-outline` | SIS | Email notification |
| `fan` | SIL | Spinning fan |
| `fire` | SIL | Burning fire |
| `garage` | SIS | Garage door |
| `heart-outline` | SIS | Beating heart |
| `home-outline` | SIS | Home icon |
| `leaf` | SIL | Swaying leaf |
| `lightbulb-outline` | SIS | Pulsing light bulb |
| `lightning-bolt` | SIS | Flashing lightning |
| `lock-outline` | SIS | Lock animation |
| `motion-sensor` | SIL | Motion waves |
| `music-note` | SIL | Bouncing note |
| `package-variant` | SIS | Package icon |
| `pot-steam-outline` | SIS | Steaming pot |
| `power` | SIS | Power button |
| `recycle` | SIL | Recycling arrows |
| `run` | SIL | Running person |
| `smoke-detector` | SIS | Smoke detector |
| `sofa-single-outline` | SIS | Sofa icon |
| `solar-panel` | SIL | Solar panel |
| `speaker` | SIS | Speaker with sound |
| `television` | SIS | TV screen |
| `thermostat` | SIL | Thermometer |
| `washing-machine` | SIL | Spinning drum |
| `water-drop` | SIL | Bouncing drop |
| `weather-fog` | SIL | Foggy weather |
| `weather-hail` | SIL | Hail animation |
| `weather-night` | SIL | Moon and stars |
| `weather-partly-cloudy` | SIL | Sun with clouds |
| `weather-sunny` | SIL | Animated sun |
| `wifi` | SIL | WiFi waves |
| `window-open` | SIS | Open window |

### Example Usage

```yaml
# Button card example
type: button
entity: light.living_room
icon: sil:lightbulb-outline

# Entity card example
type: entities
entities:
  - entity: binary_sensor.motion
    icon: sil:motion-sensor
  - entity: lock.front_door
    icon: sis:lock-outline
```

## CSS Custom Properties

```css
studio-icon {
  --studio-icons-color: #ff9800;
  --studio-icons-background: transparent;
  --mdc-icon-size: 32px;
}
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- Lottie animations powered by [Lottie-web](https://github.com/airbnb/lottie-web)
- Icon designs based on [Material Design Icons](https://materialdesignicons.com/)
