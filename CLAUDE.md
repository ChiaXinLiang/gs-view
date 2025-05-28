# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GS-View is a Next.js-based web application for viewing Gaussian Splats 3D data. The project uses the GaussianSplats3D library to render PLY files in the browser with Three.js.

## Development Commands

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run start     # Start production server
bun run lint      # Run ESLint
bun add @mkkellogg/gaussian-splats-3d three @types/three  # Install 3D dependencies
```

## Architecture Considerations

### Gaussian Splats Integration
- GaussianSplats3D requires Three.js as a peer dependency
- The viewer must be initialized in a client-side component (use 'use client' directive)
- PLY files should be served from the public directory or loaded dynamically

### Component Structure
- Main viewer component should be in `app/components/GaussianSplatViewer.tsx`
- Use dynamic imports for Three.js components to avoid SSR issues:
  ```typescript
  const GaussianSplatViewer = dynamic(() => import('./components/GaussianSplatViewer'), {
    ssr: false
  })
  ```

### Data Loading
- The `data/storeroom.ply` file needs to be accessible to the viewer
- Consider moving PLY files to `public/models/` for direct URL access
- Implement proper loading states as PLY files can be large

### Performance Considerations
- GaussianSplats3D renders can be computationally intensive
- Implement quality controls to adjust splat count/detail
- Consider implementing LOD (Level of Detail) for better performance