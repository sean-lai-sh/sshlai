# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 14 (App Router), TypeScript, and React. It showcases projects, work experience, essays, and contact information with heavy emphasis on visual animations and smooth transitions.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tech Stack & Dependencies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**:
  - GSAP for scroll-based animations
  - Framer Motion for page transitions
  - Lenis for smooth scrolling
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API for contact form
- **Graphics**: Custom Rust WASM module for Perlin noise visual effects
- **Analytics**: Vercel Analytics

## Architecture Overview

### App Router Structure
The project uses Next.js App Router with pages organized in `app/`:
- `app/page.tsx` - Landing page
- `app/projects/page.tsx` - Projects showcase
- `app/essays/page.tsx` - Blog/essays section
- `app/contact/page.tsx` - Contact form
- `app/api/contactme/route.ts` - Contact form API endpoint

### Content Management
All portfolio content (projects, work experience, etc.) is centralized in `lib/consts.ts`. To add or modify content:
- Projects: Edit the `allProjects` array
- Featured projects: Modify `top3Featured` array with project indexes
- Work experience: Edit work experience arrays
- Job search status: Toggle `searching` boolean

### Component Organization
Components are organized by feature in `components/`:
- `landing/` - Homepage sections
- `projects/` - Project display components
- `animated/` - Animation wrappers and effects
- `sections/` - Reusable page sections
- `ui/` - shadcn/ui component library
- `Navigation/` - Navigation components

### Page Transitions
The app uses a custom page transition system via `PageTransitionWrapper` in `components/animated/AnimContext.tsx`. This wraps all pages in the root layout and provides smooth transitions between routes using Framer Motion's `AnimatePresence`.

### WASM Integration
The site uses a custom Rust-based Perlin noise generator compiled to WebAssembly for visual effects:
- WASM source code: `lib/wasm/` (Rust/Cargo project)
- Compiled output: `public/perlin/`
- Loader utility: `lib/wasm-loader.ts`
- Next.js config includes WASM support with `asyncWebAssembly` experiment enabled

To rebuild WASM (requires Rust + wasm-pack):
```bash
cd lib/wasm
wasm-pack build --target web --out-dir ../../public/perlin
```

### Custom Fonts
The site uses three font configurations:
- **Sans**: Inter (Google Fonts) - Primary body text
- **Mono**: JetBrains Mono (Local) - Code/technical displays
- **Loader**: Share Tech Mono (Google Fonts) - Loading screens

Local fonts are stored in `public/fonts/static/`.

## Environment Variables

Required in `.env`:
```
RESEND_API_KEY=your_resend_api_key_here
```

The Resend API key is used for the contact form email functionality.

## Key Patterns

### Animation System
- GSAP is used for scroll-triggered animations throughout the site
- Lenis provides smooth scrolling behavior
- Framer Motion handles page transitions between routes
- Animation configurations are in `components/animated/anim.ts`

### Styling Approach
- Dark mode by default (applied at root HTML level)
- Custom color scheme defined in `globals.css` and Tailwind config
- Uses CSS variables for theme colors
- SASS modules for component-specific styles (e.g., `components/animated/style.scss`)

### Type Definitions
Shared TypeScript types are defined in `lib/types.ts`, including:
- `ProjectDetails` - Project metadata structure
- `workExpDetails` - Work experience structure
- Other portfolio data types

## Notes

- The site is configured for dark mode only
- All images and assets should be placed in `public/` directory
- Essays are stored as markdown files in `public/` (e.g., `essay_1.md`)
- Lottie animations are stored as JSON in `public/` (e.g., `essay_hero.json`)
