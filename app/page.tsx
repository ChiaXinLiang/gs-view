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

      </div>
    </main>
  );
}