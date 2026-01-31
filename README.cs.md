# Studio Icons

Animované Lottie ikony pro Home Assistant.

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | **Čeština**

## Funkce

- **Animované ikony** - Plynulé Lottie animace pro váš dashboard
- **Dva typy animací:**
  - **SIL (Loop)** - Nepřetržitě animované ikony
  - **SIS (State)** - Ikony animované při najetí myší nebo změně stavu
- **Kompatibilní s HACS** - Snadná instalace přes HACS

## Instalace

### HACS (Doporučeno)

1. Otevřete HACS v Home Assistant
2. Přejděte do sekce "Frontend"
3. Klikněte na tři tečky → "Vlastní repozitáře"
4. Přidejte repozitář: `https://github.com/joshuaaaaa/studio-icons_beta`
5. Kategorie: "Lovelace"
6. Klikněte "Přidat"
7. Nainstalujte "Studio Icons"
8. Restartujte Home Assistant

### Ruční instalace

1. Stáhněte `studio-icons.js` z tohoto repozitáře
2. Umístěte ho do složky `config/www`
3. Přidejte do `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/studio-icons.js
```

4. Restartujte Home Assistant

## Použití v Home Assistant

### Základní použití

Ikony používejte s prefixem:
- `sil:` pro smyčkové ikony (např. `sil:fan`)
- `sis:` pro stavové ikony (např. `sis:lightbulb-outline`)

### Button Card

```yaml
type: button
entity: light.obyvak
icon: sil:lightbulb-outline
tap_action:
  action: toggle
```

### Entities Card

```yaml
type: entities
entities:
  - entity: light.obyvak
    icon: sil:lightbulb-outline
  - entity: fan.ventilator
    icon: sil:fan
  - entity: lock.dvere
    icon: sis:lock-outline
```

### Mushroom Cards

```yaml
type: custom:mushroom-entity-card
entity: climate.termostat
icon: sil:thermostat
```

### Picture Elements Card

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  - type: state-icon
    entity: light.kuchyn
    icon: sil:lightbulb-outline
    style:
      left: 30%
      top: 40%
```

### Conditional Card

```yaml
type: conditional
conditions:
  - entity: binary_sensor.pohyb
    state: "on"
card:
  type: button
  icon: sil:motion-sensor
  entity: binary_sensor.pohyb
```

## Dostupné ikony

| Název ikony | Typ | Popis |
|-------------|-----|-------|
| `alert-box-outline` | SIS | Třesoucí se výstraha |
| `battery-charging` | SIL | Nabíjející baterie |
| `bell-outline` | SIS | Zvonící zvonek |
| `blinds` | SIS | Okenní žaluzie |
| `camera` | SIS | Kamera |
| `car` | SIL | Jedoucí auto |
| `clock-outline` | SIL | Tikající hodiny |
| `cloud-outline` | SIL | Plovoucí mrak |
| `cog-outline` | SIL | Otáčející se ozubené kolo |
| `door-open` | SIS | Animované dveře |
| `email-outline` | SIS | Emailová notifikace |
| `fan` | SIL | Otáčející se ventilátor |
| `fire` | SIL | Hořící oheň |
| `garage` | SIS | Garážová vrata |
| `heart-outline` | SIS | Bijící srdce |
| `home-outline` | SIS | Ikona domu |
| `leaf` | SIL | Vlající list |
| `lightbulb-outline` | SIS | Pulzující žárovka |
| `lightning-bolt` | SIS | Blikající blesk |
| `lock-outline` | SIS | Animovaný zámek |
| `motion-sensor` | SIL | Vlny detekce pohybu |
| `music-note` | SIL | Skákající nota |
| `package-variant` | SIS | Balíček |
| `pot-steam-outline` | SIS | Kouřící hrnec |
| `power` | SIS | Tlačítko napájení |
| `recycle` | SIL | Recyklační šipky |
| `run` | SIL | Běžící osoba |
| `smoke-detector` | SIS | Detektor kouře |
| `sofa-single-outline` | SIS | Pohovka |
| `solar-panel` | SIL | Solární panel |
| `speaker` | SIS | Reproduktor se zvukem |
| `television` | SIS | TV obrazovka |
| `thermostat` | SIL | Teploměr |
| `washing-machine` | SIL | Otáčející se buben |
| `water-drop` | SIL | Skákající kapka |
| `weather-fog` | SIL | Mlhavé počasí |
| `weather-hail` | SIL | Krupobití |
| `weather-night` | SIL | Měsíc a hvězdy |
| `weather-partly-cloudy` | SIL | Slunce s mraky |
| `weather-sunny` | SIL | Animované slunce |
| `wifi` | SIL | WiFi vlny |
| `window-open` | SIS | Otevřené okno |

## CSS vlastnosti

```css
studio-icon {
  --studio-icons-color: #ff9800;
  --studio-icons-background: transparent;
  --mdc-icon-size: 32px;
}
```

## Řešení problémů

### Ikony se nezobrazují
1. Restartujte Home Assistant
2. Vymažte cache prohlížeče (Ctrl+F5)
3. Zkontrolujte konzoli prohlížeče (F12) - měli byste vidět:
   ```
   STUDIO-ICONS 🌸 - v1.1.0 (fixed)
   ```

### HACS nevidí repozitář
1. Ujistěte se, že jste vybrali kategorii "Lovelace"
2. Zkuste znovu přidat repozitář

## Licence

MIT License - viz soubor [LICENSE](LICENSE).
