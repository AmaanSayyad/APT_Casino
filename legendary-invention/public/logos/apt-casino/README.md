# APT Casino Logo Files

This directory contains the logo files for the APT Casino project.

## Available Logo Files

1. **logo.svg** - Main logo with full design and text (512x512px)
2. **logo-small.svg** - Smaller version of the logo without text (256x256px)
3. **favicon.svg** - Small square icon suitable for favicons (64x64px)
4. **logo-horizontal.svg** - Horizontal version of the logo with text for headers (512x128px)

## Logo Design Elements

- **Casino Chip**: The main circular element representing a casino chip, with dashed borders
- **Gems**: Three colorful gems (blue, purple, green) representing the gems in the Mines game
- **Mine**: The central mine element with spikes, representing the mines in the game
- **Color Scheme**: Dark blue background with light blue accents, matching the app's theme

## Usage Guidelines

### In Next.js

```jsx
import Image from 'next/image';

// Main logo
<Image src="/logos/apt-casino/logo.svg" width={200} height={200} alt="APT Casino" />

// Favicon (in the head component)
<link rel="icon" href="/logos/apt-casino/favicon.svg" type="image/svg+xml" />

// Header logo
<Image src="/logos/apt-casino/logo-horizontal.svg" width={300} height={75} alt="APT Casino" />
```

### In CSS

```css
.logo {
  background-image: url('/logos/apt-casino/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.header-logo {
  background-image: url('/logos/apt-casino/logo-horizontal.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

### Converting to Other Formats

To convert to PNG or other formats, you can use tools like:
- Inkscape (open-source)
- Adobe Illustrator
- Online converters like convertio.co or svgconverter.io 