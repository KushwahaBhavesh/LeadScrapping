# 🌊 Smooth Scroll & Parallax Engine

A technical guide to the "Goldilocks" motion system implemented in the LeadScraper AI platform. This setup combines **Lenis** for high-performance inertia scrolling and **Framer Motion** for reactive parallax layers.

---

## 🚀 Core Technologies

| Feature | Technology | Rationale |
| :--- | :--- | :--- |
| **Inertia Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) | Lightweight, performant, and doesn't interfere with browser native scroll. |
| **Motion Orchestration** | [Framer Motion](https://www.framer.com/motion/) | Industry standard for complex React animations and scroll-linked transforms. |
| **Type Scale** | Custom Mid-Scale | Balanced typography that scales smoothly with viewport height. |

---

## 🛠 Project Implementation

### 1. Global Provider (`src/components/providers.tsx`)
The `Providers` component wraps the entire application, initializing the Lenis instance globally.

```tsx
"use client";
import { ReactLenis } from "lenis/react";

export function Providers({ children }) {
    return (
        <ReactLenis root options={{ 
            lerp: 0.1,        // Smoothness (0.1 = high inertia)
            duration: 1.5,    // Scroll duration
            smoothWheel: true 
        }}>
            {children}
        </ReactLenis>
    );
}
```

### 2. Parallax Strategy
We use the `useScroll` and `useTransform` hooks from Framer Motion to create depth.

#### **Layered Watermarks**
Watermarks like "NEWS" or "GO?" react to the `scrollYProgress` of their parent container.

```tsx
const sectionRef = useRef(null);
const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
});

// Moves from -100px to 100px horizontally as you scroll through
const xVal = useTransform(scrollYProgress, [0, 1], [-100, 100]);
```

---

## 🎨 Visual Signature

### **The "Goldilocks" Typography**
Our current type scale is optimized for a "Pro-Technical" look:
- **H1 / Display**: `90px` (Mid-Scale) with `font-black` (900 weight).
- **Secondary Headings**: `36px` to `50px` range.
- **Micro-Labels**: `11px` uppercase with `0.4em` tracking for that "Industrial" aesthetic.

### **Color Palette & Accents**
- **Primary**: `bg-black` / `bg-white` (High Contrast).
- **Accents**: 
  - `Indigo-600` for feature highlight cards.
  - `Indigo-500` for real-time validation badges.
  - `Transparent Black (2-5%)` for industrial borders.

---

## 📱 Responsiveness
- **Desktop**: Full parallax intensity and multi-column staggered reveals.
- **Mobile**: Parallax intensity is automatically clamped to prevent "jank" on low-refresh rate screens, prioritizing legibility and touch performance.

---

## 🔧 Maintenance & Performance
The system is built to be "Set and Forget":
1. **Viewport Marginalizing**: Reveal animations use `margin: "-100px"` to ensure triggers happen deep enough into the viewport.
2. **GPU Acceleration**: All motion transforms use `translateZ(0)` or `will-change: transform` indirectly via Framer Motion to ensure 60fps+ rendering.

---
*Document Version: 1.0.0 — Optimized for High-Growth Teams.*
