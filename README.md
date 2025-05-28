# GS-View

A demo application for viewing Gaussian Splats 3D data using [GaussianSplats3D](https://github.com/mkkellogg/GaussianSplats3D).

## Tech Stack

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[GaussianSplats3D](https://github.com/mkkellogg/GaussianSplats3D)** - Three.js-based Gaussian Splats viewer
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

## To-Do List

### High Priority
- [x] Set up Next.js project with TypeScript
- [x] Install and configure GaussianSplats3D library
- [x] Create 3D viewer component with Three.js integration
- [x] Implement PLY file loader for storeroom.ply data

### Medium Priority
- [x] Add camera controls (orbit, zoom, pan)
- [ ] Create UI controls for viewer settings (quality, render mode)
- [x] Implement loading state and progress indicator

### Low Priority
- [ ] Add responsive design for mobile/desktop viewing
- [ ] Optimize performance for smooth rendering
- [ ] Add export/screenshot functionality

## Getting Started

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run start     # Start production server
bun run lint      # Run ESLint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.