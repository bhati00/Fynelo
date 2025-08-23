# Sales Operations App - Design System Documentation

## Brand Identity

### Logo Colors
- **Primary Text**: `#1A365D` (Deep Navy Blue)
- **Brand Gradient**: `#BE652C` → `#F0AD4F` (Warm Orange to Golden Yellow)

---

## Color System

### Light Mode Colors

#### Primary Colors
- **Primary**: `#1A365D` (Deep Navy Blue)
- **Primary Hover**: `#2D4A6B`
- **Primary Light**: `#E2E8F0`

#### Brand Colors
- **Brand Orange**: `#BE652C`
- **Brand Golden**: `#F0AD4F`
- **Brand Text**: `#1A365D`

#### Semantic Colors
- **Success**: `#10B981` (Emerald)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

#### Neutral Colors
- **Background**: `#FFFFFF`
- **Surface**: `#F8FAFC`
- **Border**: `#E2E8F0`
- **Text Primary**: `#1A365D`
- **Text Secondary**: `#64748B`
- **Text Muted**: `#94A3B8`

### Dark Mode Colors

#### Primary Colors
- **Primary**: `#4A90E2` (Lighter Blue for contrast)
- **Primary Hover**: `#357ABD`
- **Primary Light**: `#1E293B`

#### Brand Colors
- **Brand Orange**: `#D97706` (Brighter for dark mode)
- **Brand Golden**: `#FBBF24` (More vibrant)
- **Brand Text**: `#E2E8F0` (Light text on dark)

#### Semantic Colors
- **Success**: `#34D399` (Brighter Emerald)
- **Warning**: `#FBBF24` (Brighter Amber)
- **Error**: `#F87171` (Softer Red)
- **Info**: `#60A5FA` (Lighter Blue)

#### Neutral Colors
- **Background**: `#0F172A` (Slate 900)
- **Surface**: `#1E293B` (Slate 800)
- **Border**: `#334155` (Slate 700)
- **Text Primary**: `#F1F5F9` (Slate 100)
- **Text Secondary**: `#CBD5E1` (Slate 300)
- **Text Muted**: `#94A3B8` (Slate 400)

---

## Gradients

### Brand Gradients
\`\`\`css
/* Primary Brand Gradient */
.bg-brand-gradient {
  background: linear-gradient(135deg, #BE652C 0%, #F0AD4F 100%);
}

/* Subtle Brand Gradient */
.bg-brand-gradient-subtle {
  background: linear-gradient(135deg, #BE652C20 0%, #F0AD4F20 100%);
}

/* Dark Mode Brand Gradient */
.dark .bg-brand-gradient {
  background: linear-gradient(135deg, #D97706 0%, #FBBF24 100%);
}
\`\`\`

### Component Gradients
\`\`\`css
/* Button Gradient */
.btn-gradient {
  background: linear-gradient(135deg, #1A365D 0%, #2D4A6B 100%);
}

/* Card Gradient */
.card-gradient {
  background: linear-gradient(145deg, #F8FAFC 0%, #E2E8F0 100%);
}

/* Dark Mode Card Gradient */
.dark .card-gradient {
  background: linear-gradient(145deg, #1E293B 0%, #334155 100%);
}
\`\`\`

---

## Typography

### Font Families
- **Primary**: `Geist` (Sans-serif)
- **Secondary**: `Geist Mono` (Monospace)

### Font Scales
- **xs**: `12px` / `16px` line-height
- **sm**: `14px` / `20px` line-height
- **base**: `16px` / `24px` line-height
- **lg**: `18px` / `28px` line-height
- **xl**: `20px` / `28px` line-height
- **2xl**: `24px` / `32px` line-height
- **3xl**: `30px` / `36px` line-height
- **4xl**: `36px` / `40px` line-height

### Typography Usage

#### Headings
\`\`\`css
/* H1 - Page Titles */
.heading-1 {
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  color: #1A365D; /* Light mode */
}
.dark .heading-1 { color: #F1F5F9; }

/* H2 - Section Titles */
.heading-2 {
  font-size: 30px;
  line-height: 36px;
  font-weight: 600;
  color: #1A365D;
}
.dark .heading-2 { color: #F1F5F9; }

/* H3 - Subsection Titles */
.heading-3 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #1A365D;
}
.dark .heading-3 { color: #E2E8F0; }
\`\`\`

#### Body Text
\`\`\`css
/* Primary Body Text */
.text-body {
  font-size: 16px;
  line-height: 24px;
  color: #1A365D;
}
.dark .text-body { color: #CBD5E1; }

/* Secondary Body Text */
.text-body-secondary {
  font-size: 14px;
  line-height: 20px;
  color: #64748B;
}
.dark .text-body-secondary { color: #94A3B8; }

/* Small Text */
.text-small {
  font-size: 12px;
  line-height: 16px;
  color: #94A3B8;
}
.dark .text-small { color: #64748B; }
\`\`\`

---

## Spacing System

### Base Unit: 4px (0.25rem)

#### Spacing Scale
- **0**: `0px`
- **1**: `4px`
- **2**: `8px`
- **3**: `12px`
- **4**: `16px`
- **5**: `20px`
- **6**: `24px`
- **8**: `32px`
- **10**: `40px`
- **12**: `48px`
- **16**: `64px`
- **20**: `80px`
- **24**: `96px`

---

## Component Specifications

### Buttons

#### Primary Button
\`\`\`css
/* Light Mode */
.btn-primary {
  background: linear-gradient(135deg, #1A365D 0%, #2D4A6B 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2D4A6B 0%, #1A365D 100%);
  box-shadow: 0 4px 12px rgba(26, 54, 93, 0.3);
}

/* Dark Mode */
.dark .btn-primary {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
}

.dark .btn-primary:hover {
  background: linear-gradient(135deg, #357ABD 0%, #4A90E2 100%);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}
\`\`\`

#### Secondary Button
\`\`\`css
/* Light Mode */
.btn-secondary {
  background: transparent;
  color: #1A365D;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #E2E8F0;
}

.btn-secondary:hover {
  background: #F8FAFC;
  border-color: #1A365D;
}

/* Dark Mode */
.dark .btn-secondary {
  color: #E2E8F0;
  border-color: #334155;
}

.dark .btn-secondary:hover {
  background: #1E293B;
  border-color: #4A90E2;
}
\`\`\`

#### Brand Button
\`\`\`css
/* Light Mode */
.btn-brand {
  background: linear-gradient(135deg, #BE652C 0%, #F0AD4F 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-brand:hover {
  background: linear-gradient(135deg, #A0541F 0%, #D4943A 100%);
  box-shadow: 0 4px 12px rgba(190, 101, 44, 0.3);
}

/* Dark Mode */
.dark .btn-brand {
  background: linear-gradient(135deg, #D97706 0%, #FBBF24 100%);
}

.dark .btn-brand:hover {
  background: linear-gradient(135deg, #B45309 0%, #D97706 100%);
}
\`\`\`

### Cards

#### Default Card
\`\`\`css
/* Light Mode */
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #CBD5E1;
}

/* Dark Mode */
.dark .card {
  background: #1E293B;
  border-color: #334155;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.dark .card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border-color: #475569;
}
\`\`\`

#### Elevated Card
\`\`\`css
/* Light Mode */
.card-elevated {
  background: #FFFFFF;
  border: none;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Dark Mode */
.dark .card-elevated {
  background: #1E293B;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}
\`\`\`

### Forms

#### Input Fields
\`\`\`css
/* Light Mode */
.input {
  background: #FFFFFF;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #1A365D;
}

.input:focus {
  border-color: #1A365D;
  box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  outline: none;
}

.input::placeholder {
  color: #94A3B8;
}

/* Dark Mode */
.dark .input {
  background: #1E293B;
  border-color: #334155;
  color: #E2E8F0;
}

.dark .input:focus {
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.dark .input::placeholder {
  color: #64748B;
}
\`\`\`

### Navigation

#### Navigation Bar
\`\`\`css
/* Light Mode */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #E2E8F0;
  padding: 16px 24px;
}

/* Dark Mode */
.dark .navbar {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: #334155;
}
\`\`\`

#### Navigation Links
\`\`\`css
/* Light Mode */
.nav-link {
  color: #64748B;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #1A365D;
  background: #F8FAFC;
}

.nav-link.active {
  color: #1A365D;
  background: linear-gradient(135deg, #BE652C20 0%, #F0AD4F20 100%);
}

/* Dark Mode */
.dark .nav-link {
  color: #94A3B8;
}

.dark .nav-link:hover {
  color: #E2E8F0;
  background: #1E293B;
}

.dark .nav-link.active {
  color: #E2E8F0;
  background: linear-gradient(135deg, #D9770620 0%, #FBBF2420 100%);
}
\`\`\`

---

## HTML Element Colors

### Text Elements

#### Light Mode
- **h1, h2, h3**: `#1A365D`
- **h4, h5, h6**: `#2D4A6B`
- **p**: `#1A365D`
- **span**: `#64748B`
- **small**: `#94A3B8`
- **strong**: `#1A365D`
- **em**: `#64748B`
- **a**: `#1A365D` (hover: `#BE652C`)
- **code**: `#BE652C`

#### Dark Mode
- **h1, h2, h3**: `#F1F5F9`
- **h4, h5, h6**: `#E2E8F0`
- **p**: `#CBD5E1`
- **span**: `#94A3B8`
- **small**: `#64748B`
- **strong**: `#F1F5F9`
- **em**: `#94A3B8`
- **a**: `#4A90E2` (hover: `#FBBF24`)
- **code**: `#FBBF24`

### Interactive Elements

#### Light Mode
- **button**: Background `#1A365D`, Text `#FFFFFF`
- **input**: Background `#FFFFFF`, Border `#E2E8F0`, Text `#1A365D`
- **select**: Background `#FFFFFF`, Border `#E2E8F0`, Text `#1A365D`
- **textarea**: Background `#FFFFFF`, Border `#E2E8F0`, Text `#1A365D`

#### Dark Mode
- **button**: Background `#4A90E2`, Text `#FFFFFF`
- **input**: Background `#1E293B`, Border `#334155`, Text `#E2E8F0`
- **select**: Background `#1E293B`, Border `#334155`, Text `#E2E8F0`
- **textarea**: Background `#1E293B`, Border `#334155`, Text `#E2E8F0`

### Layout Elements

#### Light Mode
- **header**: Background `#FFFFFF`, Border `#E2E8F0`
- **nav**: Background `#F8FAFC`
- **main**: Background `#FFFFFF`
- **aside**: Background `#F8FAFC`, Border `#E2E8F0`
- **footer**: Background `#F8FAFC`, Border `#E2E8F0`
- **section**: Background `#FFFFFF`
- **article**: Background `#FFFFFF`, Border `#E2E8F0`

#### Dark Mode
- **header**: Background `#0F172A`, Border `#334155`
- **nav**: Background `#1E293B`
- **main**: Background `#0F172A`
- **aside**: Background `#1E293B`, Border `#334155`
- **footer**: Background `#1E293B`, Border `#334155`
- **section**: Background `#0F172A`
- **article**: Background `#1E293B`, Border `#334155`

---

## Usage Guidelines

### Do's
- Use the brand gradient sparingly for key CTAs and highlights
- Maintain consistent spacing using the 4px base unit
- Ensure proper contrast ratios for accessibility
- Use semantic color names for better maintainability
- Test all colors in both light and dark modes

### Don'ts
- Don't use more than 3 colors in a single component
- Don't mix warm and cool gradients
- Don't use brand colors for error states
- Don't ignore dark mode specifications
- Don't use arbitrary spacing values

### Accessibility
- All text maintains WCAG AA contrast ratios (4.5:1 minimum)
- Interactive elements have clear focus states
- Color is never the only way to convey information
- All gradients maintain sufficient contrast for text overlay

---

## Implementation Notes

### Tailwind CSS v4 Integration
Colors are defined in `app/globals.css` using the `@theme inline` directive:

\`\`\`css
@theme inline {
  --color-brand-orange: #BE652C;
  --color-brand-golden: #F0AD4F;
  --color-brand-text: #1A365D;
  /* ... additional color definitions */
}
\`\`\`

### Dark Mode Toggle
Implement using Tailwind's `dark:` prefix and Next.js theme provider for system preference detection.

### Component Library
All components should follow this design system and be built with consistent spacing, colors, and typography as defined above.
