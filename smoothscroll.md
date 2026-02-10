# 🌊 Smooth Scroll & Parallax Documentation

This document outlines the high-performance motion system implemented in the LeadScraper AI platform.

## 🛠 Tech Stack
- **Lenis**: For ultra-smooth inertia scrolling.
- **Framer Motion**: For parallax and scroll-linked reveals.

## 🎨 Design Tokens (CSS Color System)

### **Primary Grayscale**
| Color | Hex Code | Usage | Tailwind Token |
| :--- | :--- | :--- | :--- |
| **Deep Onyx** | `#000000` | Main backgrounds, Primary buttons | `bg-black` |
| **Stark White** | `#FFFFFF` | Content containers, Contrast text | `bg-white` |
| **Industrial Ash**| `rgba(0,0,0,0.05)` | Borders, Subtle separators | `border-black/5` |
| **Ghost Ink** | `rgba(0,0,0,0.02)` | Background watermarks | `text-black/[0.02]` |

### **Brand Accents**
| Color | Hex Code | Usage | Tailwind Token |
| :--- | :--- | :--- | :--- |
| **Intelligence Indigo**| `#4F46E5` | Active features, Staggered icons | `bg-indigo-600` |
| **Elite Purple** | `#A855F7` | Parallax background blobs | `bg-purple-500` |
| **System Glow** | `#6366F1` | Real-time status indicators | `bg-indigo-500` |

---

## 🏗 Implementation Guide

### **1. Smooth Scroll Setup**
Located in `src/components/providers.tsx`.
- **Lerp**: `0.1` — Controls the "weight" of the scroll.
- **Duration**: `1.5s` — How long the scroll momentum lasts.

### **2. Parallax Effects**
Used in `Hero.tsx`, `Newsletter.tsx`, and `CTA.tsx`.
- **Formula**: `useTransform(scrollYProgress, [0, 1], [StartPos, EndPos])`.
- **Watermark Movement**: Large background text moves slower than the foreground to create the illusion of depth.

### **3. Staggered Reveal**
Used in `Features.tsx` and `Testimonials.tsx`.
- **Viewport Trigger**: `whileInView` with a `margin: "-100px"`.
- **Stagger**: `delay: index * 0.1` — Ensures items appear one-by-one.

---

## ⚡ Performance Optimization
- **Hardware Acceleration**: All animations are optimized for GPU rendering.
- **Adaptive Precision**: Mobile devices receive a lighter version of the parallax to ensure zero input lag.

---
*Created with ♥ for the LeadScraper AI Team.*
