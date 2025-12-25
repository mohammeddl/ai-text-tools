# Studio Export - Modular Components

A collection of **independent, reusable components** for Next.js projects. Each component has its own folder with scoped CSS Modules.

## Available Components

| Component            | Folder                           | Description                          |
| -------------------- | -------------------------------- | ------------------------------------ |
| `StudioHero`         | `/components/StudioHero`         | Hero section with animated title     |
| `StudioHeader`       | `/components/StudioHeader`       | Centered intro text section          |
| `WhoWeAre`           | `/components/WhoWeAre`           | Team parallax scroll section         |
| `MissionSection`     | `/components/MissionSection`     | Dark section with text + button      |
| `ProcessCards`       | `/components/ProcessCards`       | Stacking cards with scroll animation |
| `RecognitionSection` | `/components/RecognitionSection` | Centered recognition text            |
| `Footer`             | `/components/Footer`             | Animated footer                      |
| `Copy`               | `/components/Copy`               | Text reveal animation wrapper        |
| `BtnLink`            | `/components/BtnLink`            | Animated link button                 |

---

## Quick Start

### 1. Copy to your project

```bash
cp -r studio-export/ your-project/src/studio-export/
```

### 2. Copy assets

```bash
cp -r studio-export/assets/* your-project/public/studio-assets/
```

### 3. Install dependencies

```bash
npm install gsap @gsap/react react-icons
```

> ⚠️ **GSAP SplitText** (premium) is required for `StudioHero` and `Copy` components.

---

## Usage Examples

### Import individual components:

```tsx
import { StudioHero, ProcessCards, Footer } from "@/studio-export";

export default function Page() {
  return (
    <>
      <StudioHero title="My Title" heroImage="/my-image.jpg" />
      <ProcessCards />
      <Footer />
    </>
  );
}
```

### Or import from specific folders:

```tsx
import StudioHero from "@/studio-export/components/StudioHero/StudioHero";
import ProcessCards from "@/studio-export/components/ProcessCards/ProcessCards";
```

### Use only the full page:

```tsx
import StudioPage from "@/studio-export/StudioPage";

export default function Page() {
  return <StudioPage />;
}
```

---

## Component Props

### StudioHero

```tsx
<StudioHero
  title="Wu" // Optional, default: "Wu"
  heroImage="/studio-assets/hero.jpeg" // Optional
/>
```

### MissionSection

```tsx
<MissionSection
  paragraphs={["First paragraph", "Second paragraph"]}
  buttonLabel="View Work" // Optional
  buttonRoute="/work" // Optional
/>
```

### RecognitionSection

```tsx
<RecognitionSection label="(Awards)">
  Your recognition text here
</RecognitionSection>
```

---

## Folder Structure

```
studio-export/
├── index.ts                    # All exports
├── StudioPage.tsx              # Full page (all sections)
├── components/
│   ├── StudioHero/            # ⭐ Hero section
│   │   ├── StudioHero.tsx
│   │   └── StudioHero.module.css
│   ├── StudioHeader/          # ⭐ Intro text
│   ├── WhoWeAre/              # ⭐ Team parallax
│   ├── MissionSection/        # ⭐ Dark text section
│   ├── ProcessCards/          # ⭐ Stacking cards
│   ├── RecognitionSection/    # ⭐ Recognition
│   ├── Footer/                # ⭐ Footer
│   ├── Copy/                  # Text animation util
│   └── BtnLink/               # Button util
└── assets/                    # Copy to public/
```
