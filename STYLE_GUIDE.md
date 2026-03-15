# 🎨 Roach Racing Club - UI Style Guide

## Color Palette

### Primary Colors (Roach Theme)
- `roach-50`: #f9f7f4 (Off-white)
- `roach-100`: #f0ebe4 (Light)
- `roach-200`: #ddd5c8 (Lighter beige)
- `roach-300`: #c9b8a6 (Beige)
- `roach-400`: #b59b84 (Medium brown)
- `roach-500`: #9d8672 (Tan)
- `roach-600`: #7d6d5c (Dark tan)
- `roach-700`: #5f5449 (Dark brown)
- `roach-750`: #57493f (Darker brown)
- `roach-800`: #473f37 (Very dark brown)
- `roach-850`: #3f3730 (Darker)
- `roach-900`: #2f2923 (Black)

### Accent Colors
- **Yellow/Gold**: `yellow-400` / `yellow-500` / `yellow-600`
  - Used for: Primary highlights, active states, hover effects, winner badges
- **Green**: `green-400` / `green-500` / `green-600`
  - Used for: Wins, profits, positive actions, success states
- **Red**: `red-400` / `red-500` / `red-600`
  - Used for: Losses, speed stat, negative actions
- **Orange**: `orange-400` / `orange-500`
  - Used for: Agility stat, secondary highlights
- **Blue**: `blue-400` / `blue-500` / `blue-600`
  - Used for: USDC balance, break-even states
- **Purple**: `purple-300` / `purple-400` / `purple-600`
  - Used for: Arcade mode, shop buttons

## Typography

### Headings
- **Main Title (H1)**: `text-5xl font-bold` with `bg-gradient-to-r` text
- **Section Title (H2)**: `text-2xl font-bold` with gradient text
- **Card Title (H3)**: `text-xl font-bold` with gradient text

### Body Text
- **Primary**: `text-roach-300` or `text-roach-50`
- **Secondary**: `text-roach-300`
- **Muted**: `text-roach-300` with opacity
- **Highlights**: Use accent colors (green, yellow, etc.)

## Components

### Buttons
```tailwind
/* Standard Button */
px-4 py-2 rounded-lg font-semibold transition-all

/* Gradient Button (Active/Primary) */
bg-gradient-to-r from-[color]-600 to-[color]-500
hover:from-[color]-500 hover:to-[color]-400
text-white shadow-lg hover:shadow-xl hover:shadow-[color]-500/50
transform hover:scale-105

/* Secondary Button */
bg-gradient-to-r from-roach-700 to-roach-600
hover:from-roach-600 hover:to-roach-500
text-white shadow-lg transform hover:scale-105
```

### Cards
```tailwind
/* Standard Card */
bg-gradient-to-br from-roach-800 to-roach-850
rounded-xl p-6 border border-roach-600
shadow-xl hover:shadow-2xl transition-all

/* Hoverable Card */
hover:shadow-yellow-600/20 transform hover:-translate-y-1
duration-300
```

### Progress Bars
```tailwind
/* Container */
w-full bg-roach-700 rounded-full h-4 overflow-hidden shadow-inner

/* Fill */
bg-gradient-to-r from-[color]-600 to-[color]-500
h-4 rounded-full transition-all duration-300 shadow-lg shadow-[color]-500/50
```

### Modal
```tailwind
/* Backdrop */
fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50

/* Content */
bg-gradient-to-br from-roach-800 via-roach-850 to-roach-900
rounded-xl border border-yellow-600/30
shadow-2xl shadow-yellow-600/20
```

### Stat Box
```tailwind
bg-gradient-to-br from-roach-700 to-roach-750
rounded-lg p-4 text-center
hover:shadow-lg hover:[color]-500/20 transition-all transform hover:-translate-y-1
shadow-lg
```

## Animations

### Bounce
```css
animation: bounce 1s infinite;
/* Used for: Winner badges (1st place) */
```

### Pulse
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
/* Used for: 2nd/3rd place badges */
```

### Scale Transform on Hover
```css
transform hover:scale-105
transition-all duration-200
/* Applied to: Buttons, cards, interactive elements */
```

### Lift Effect on Hover
```css
transform hover:-translate-y-1
transition-all duration-300
/* Applied to: Cards with interactive content */
```

## Spacing System

### Padding
- Small: `p-3` / `p-4`
- Medium: `p-6`
- Large: `p-12`

### Gaps
- Between elements: `gap-2` / `gap-3` / `gap-4` / `gap-6`

### Margins
- Between sections: `mb-4` / `mb-6` / `mb-8`

## Rounded Corners
- Standard: `rounded-lg`
- Large: `rounded-xl`
- Extra large: `rounded-2xl` (for modals)

## Shadows
### Standard
- `shadow-lg` - Cards, buttons
- `shadow-xl` - Modals, emphasized cards
- `shadow-2xl` - Maximum emphasis

### Colored Shadows (Accents)
- `shadow-yellow-500/50` - Primary accent
- `shadow-green-500/50` - Win/success
- `shadow-red-500/50` - Loss/negative
- `shadow-purple-500/50` - Secondary
- `shadow-blue-500/50` - Tertiary

## Gradients

### Direction Patterns
- `bg-gradient-to-r` - Left to right (buttons)
- `bg-gradient-to-br` - Top left to bottom right (cards)
- `bg-gradient-to-b` - Top to bottom (vertical)

### Common Combinations
- `from-yellow-600 to-yellow-500` - Primary highlight
- `from-green-600 to-green-500` - Success/win
- `from-roach-800 to-roach-850` - Card backgrounds
- `from-roach-700 to-roach-800` - Section backgrounds

## Responsive Design

### Breakpoints (Tailwind)
- `md:` - Medium (768px+)
- `lg:` - Large (1024px+)

### Common Patterns
```tailwind
/* Grid */
grid md:grid-cols-2 lg:grid-cols-3 gap-4

/* Flex */
flex flex-col md:flex-row gap-4

/* Text Size */
text-3xl md:text-4xl

/* Padding */
p-4 md:p-6 lg:p-8
```

## Interactive States

### Hover
- Color change
- Scale transform (+5%)
- Shadow enhancement
- Glow effect (colored shadow)

### Active (Selected)
- Gradient background
- Larger scale (±10%)
- Prominent shadow with color

### Disabled
- Reduced opacity (60-70%)
- Gray colors
- No hover effects
- Cursor: not-allowed

## Accessibility Considerations

1. **Color Contrast**: Maintain sufficient contrast between text and background
2. **Interactive Size**: Buttons minimum 44px height for touch targets
3. **Animations**: Use `prefers-reduced-motion` if implementing media queries
4. **Focus States**: Clear visual indicators for keyboard navigation
5. **Text Hierarchy**: Use size and weight to establish visual hierarchy

## Usage Examples

### Victory Section
```tailwind
/* Background */
bg-gradient-to-r from-green-700 to-green-800

/* Text */
text-green-300 animate-pulse

/* Highlight */
text-green-400 animate-bounce

/* Shadow */
shadow-green-500/50
```

### Loss Section
```tailwind
/* Background */
bg-gradient-to-r from-red-700 to-red-800

/* Text */
text-red-400

/* Shadow */
shadow-red-500/30
```

### Primary Action
```tailwind
/* Background */
bg-gradient-to-r from-yellow-600 to-yellow-500

/* Hover */
hover:from-yellow-500 hover:to-yellow-400

/* Shadow */
shadow-yellow-500/50 hover:shadow-yellow-500/70
```

---

This style guide ensures consistency across the Roach Racing Club dapp while maintaining the premium, modern aesthetic.
