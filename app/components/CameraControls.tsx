'use client';

import { useState, useEffect } from 'react';
import { Camera, Eye, Move, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface CameraControlsProps {
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleMode?: (mode: 'orbit' | 'pan') => void;
  className?: string;
}

export default function CameraControls({ 
  onReset, 
  onZoomIn, 
  onZoomOut,
  onToggleMode,
  className = '' 
}: CameraControlsProps) {
  const [currentMode, setCurrentMode] = useState<'orbit' | 'pan'>('orbit');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleModeToggle = () => {
    const newMode = currentMode === 'orbit' ? 'pan' : 'orbit';
    setCurrentMode(newMode);
    onToggleMode?.(newMode);
  };

  return (
    <div className={`absolute top-4 right-4 ${className}`}>
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-2">
        {/* Camera Controls Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
          title="Camera Controls"
        >
          <Camera className="w-5 h-5" />
          <span className="text-sm font-medium">Camera</span>
          <RotateCw className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-gray-700 space-y-2">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 px-3 py-1">
              <button
                onClick={handleModeToggle}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 hover:text-white transition-all w-full"
              >
                {currentMode === 'orbit' ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Orbit Mode</span>
                  </>
                ) : (
                  <>
                    <Move className="w-4 h-4" />
                    <span>Pan Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 px-3">
              <button
                onClick={onZoomIn}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 hover:text-white transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={onZoomOut}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 hover:text-white transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Reset View */}
            <div className="px-3">
              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm text-white transition-all"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Instructions */}
      <div className="mt-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 max-w-xs">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Controls</h3>
        <div className="space-y-1 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-gray-800 px-2 py-1 rounded">Left Click</span>
            <span>{currentMode === 'orbit' ? 'Rotate' : 'Pan'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-gray-800 px-2 py-1 rounded">Right Click</span>
            <span>{currentMode === 'orbit' ? 'Pan' : 'Rotate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-gray-800 px-2 py-1 rounded">Scroll</span>
            <span>Zoom In/Out</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-gray-800 px-2 py-1 rounded">Middle Click</span>
            <span>Pan (Always)</span>
          </div>
        </div>
      </div>
    </div>
  );
}