'use client';

import { Info, X } from 'lucide-react';
import { useState } from 'react';

export default function MobileControls() {
  const [showInfo, setShowInfo] = useState(true);

  if (!showInfo) return null;

  return (
    <div className="sm:hidden fixed bottom-4 left-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-3">
      <div className="flex items-start justify-between gap-2">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium text-gray-300">Touch Controls</p>
          <ul className="text-xs text-gray-400 space-y-0.5">
            <li>• One finger drag: Rotate</li>
            <li>• Two finger drag: Pan</li>
            <li>• Pinch: Zoom in/out</li>
          </ul>
        </div>
        <button
          onClick={() => setShowInfo(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}