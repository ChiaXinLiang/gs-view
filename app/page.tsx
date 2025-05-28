'use client';

import dynamic from 'next/dynamic';

const GaussianSplatViewer = dynamic(
  () => import('./components/GaussianSplatViewer'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Gaussian Splats 3D Viewer
        </h1>
        
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl">
          <GaussianSplatViewer 
            modelUrl="/models/storeroom.ply"
            className="w-full h-full"
          />
        </div>

        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Use your mouse to orbit, zoom, and pan around the 3D model
          </p>
          <p className="text-xs mt-2">
            Left click + drag: Rotate | Right click + drag: Pan | Scroll: Zoom
          </p>
        </div>
      </div>
    </main>
  );
}