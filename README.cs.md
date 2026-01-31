# Studio Icons v2.0

Animované Lottie ikony pro Home Assistant.

[![HACS Badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/joshuaaaaa/studio-icons_beta.svg)](https://github.com/joshuaaaaa/studio-icons_beta/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | **Česky**

## Funkce

- **Animované ikony** - Plynulé Lottie animace pro váš dashboard
- **Dva typy animací:**
  - **SIL (Loop)** - Nepřetržitě animované ikony
  - **SIS (State)** - Ikony animované při najetí myší nebo změně stavu
- **Optimalizovaný výkon:**
  - Intersection Observer - animace se pozastaví mimo obrazovku
  - Lazy loading s cachováním
  - Canvas renderer pro slabší zařízení
- **Přístupnost:**
  - Respektuje nastavení `prefers-reduced-motion`
  - Ovládání klávesnicí
- **TypeScript** - Včetně kompletních typových definic
- **HACS kompatibilní** - Snadná instalace přes HACS

## Náhled

### Stavové ikony (SIS)
Animují se při stavu "on" nebo při najetí myší.

![Náhled](https://github.com/joshuaaaaa/studio-icons_beta/blob/main/docs/studio-icons-sis.gif)

### Smyčkové ikony (SIL)
Nepřetržitě animované.

![Náhled](https://github.com/joshuaaaaa/studio-icons_beta/blob/main/docs/studio-icons-sil.gif)

## Instalace

### HACS (Doporučeno)

1. Otevřete HACS ve vašem Home Assistant
2. Přejděte do sekce "Frontend"
3. Klikněte na menu se třemi tečkami → "Vlastní repozitáře"
4. Přidejte repozitář: `https://github.com/joshuaaaaa/studio-icons_beta`
5. Kategorie: "Lovelace"
6. Klikněte "Přidat"
7. Nainstalujte "Studio Icons"
8. Restartujte Home Assistant

### Ruční instalace

1. Stáhněte `studio-icons.js` z [posledního releasu](https://github.com/joshuaaaaa/studio-icons_beta/releases)
2. Umístěte ho do složky `config/www`
3. Přidejte do `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/studio-icons.js
```

4. Restartujte Home Assistant

## Použití

### Ve výběru ikon

Hledejte ikony pomocí prefixu:
- `sil:` pro smyčkové ikony (např. `sil:weather-sunny`)
- `sis:` pro stavové ikony (např. `sis:alert-box-outline`)

### Dostupné ikony

| Název ikony | Typ | Popis |
|-------------|-----|-------|
| `weather-sunny` | SIL | Animované slunce |
| `weather-partly-cloudy` | SIL | Slunce s mraky |
| `weather-night` | SIL | Měsíc a hvězdy |
| `weather-fog` | SIL | Mlhavé počasí |
| `weather-hail` | SIL | Animace krupobití |
| `cloud-outline` | SIL | Plovoucí mrak |
| `alert-box-outline` | SIS | Ikona upozornění |
| `pot-steam-outline` | SIS | Kouřící hrnec |
| `sofa-single-outline` | SIS | Ikona pohovky |

### Pokročilá konfigurace

Element `studio-icon` můžete použít přímo s dodatečnými atributy:

```html
<studio-icon
  icon="sil:weather-sunny"
  speed="1.5"
  trigger="hover"
  primary-color="#ff9800"
></studio-icon>
```

#### Atributy

| Atribut | Typ | Výchozí | Popis |
|---------|-----|---------|-------|
| `icon` | string | - | Název ikony s prefixem (povinné) |
| `state` | string | - | Stav entity (`on`/`off`) |
| `trigger` | string | auto | Spouštěč animace: `always`, `hover`, `state`, `click`, `once`, `none` |
| `speed` | number | 1 | Násobitel rychlosti animace |
| `direction` | number | 1 | Směr animace (1 nebo -1) |
| `loop` | boolean | true | Opakování animace |
| `renderer` | string | svg | Renderer: `svg`, `canvas` |
| `primary-color` | string | - | Primární barva ikony |
| `secondary-color` | string | - | Sekundární barva |
| `accent-color` | string | - | Akcentová barva |

### CSS vlastní proměnné

```css
studio-icon {
  --studio-icons-color: #ff9800;
  --studio-icons-secondary-color: #2196f3;
  --studio-icons-accent-color: #4caf50;
  --studio-icons-background: transparent;
  --mdc-icon-size: 32px;
}
```

## Vývoj

### Požadavky

- Node.js 18+
- npm nebo yarn

### Nastavení

```bash
# Klonování repozitáře
git clone https://github.com/joshuaaaaa/studio-icons_beta.git
cd studio-icons_beta

# Instalace závislostí
npm install

# Sestavení ikon
npm run build:icons

# Vývojový režim (sledování změn)
npm run dev

# Produkční sestavení
npm run build
```

### Struktura projektu

```
studio-icons_beta/
├── src-v2/                 # TypeScript zdrojový kód (v2.0)
│   ├── components/         # Web komponenty
│   ├── utils/              # Utility funkce
│   ├── styles/             # CSS styly
│   ├── icons/              # Generovaná data ikon
│   ├── types.ts            # TypeScript definice
│   ├── constants.ts        # Konstanty
│   └── index.ts            # Vstupní bod
├── src/                    # Legacy JavaScript (v1.x)
├── lottie-json/            # Lottie animační soubory
├── dist/                   # Sestavený výstup
├── scripts/                # Build skripty
└── docs/                   # Dokumentace
```

### Přidání nových ikon

1. Vytvořte animaci v After Effects (24x24px, 25fps)
2. Exportujte jako Lottie JSON pomocí Bodymovin
3. Umístěte do složky `lottie-json/`
4. Spusťte `npm run build:icons`
5. Znovu sestavte: `npm run build`

### Pravidla pro animace

- **Rozměry:** 24x24 pixelů
- **Snímková frekvence:** 25 fps
- **Délka:** 2 sekundy (krátká) nebo 4 sekundy (dlouhá)
- **CSS třídy:**
  - `.inline` - Barva výplně
  - `.outline` - Barva obrysu
  - `.background` - Výplň pozadí

## Ladění

Povolení debug režimu v konzoli prohlížeče:

```javascript
localStorage.setItem('studio-icons-debug', 'true');
```

Přístup k ladicím nástrojům:

```javascript
// Kontrola aktivních animací
window.StudioIcons.lottieLoader.getActiveCount();

// Zobrazení schopností zařízení
window.StudioIcons.deviceDetector.detect();

// Kontrola statistik cache
window.StudioIcons.iconCache().then(cache => console.log(cache.getStats()));
```

## Historie změn

### v2.0.0
- Kompletní přepis do TypeScript
- Web komponenta založená na Lit Element
- MutationObserver místo monkey-patchingu
- Intersection Observer pro optimalizaci výkonu
- Podpora `prefers-reduced-motion`
- Lazy loading s cachováním
- HACS integrace
- Více typů spouštěčů animací
- Podpora více barev

### v1.1.0
- Opraveny problémy s blikáním
- Opraveny memory leaky v disconnectedCallback
- Přidány ochranné inicializační podmínky

### v1.0.1
- Počáteční beta verze

## Přispívání

Příspěvky jsou vítány! Před odesláním PR si prosím přečtěte naše pokyny pro přispívání.

- Nahlašujte chyby přes [GitHub Issues](https://github.com/joshuaaaaa/studio-icons_beta/issues)
- Odesílejte PR pro nové funkce nebo opravy
- Pomozte vytvořit nové animace ikon

## Licence

MIT Licence - viz soubor [LICENSE](LICENSE) pro detaily.

## Poděkování

- Lottie animace poháněny knihovnou [Lottie-web](https://github.com/airbnb/lottie-web)
- Design ikon založen na [Material Design Icons](https://materialdesignicons.com/)
