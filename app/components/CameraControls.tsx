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
    <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 ${className}`}>
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-1 sm:p-2">
        {/* Camera Controls Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 text-gray-300 hover:text-white transition-colors"
          title="Camera Controls"
        >
          <Camera className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium hidden sm:inline">Camera</span>
          <RotateCw className={`w-3 sm:w-4 h-3 sm:h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-gray-700 space-y-1 sm:space-y-2">
            {/* Mode Toggle */}
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1">
              <button
                onClick={handleModeToggle}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-xs sm:text-sm text-gray-300 hover:text-white transition-all w-full"
              >
                {currentMode === 'orbit' ? (
                  <>
                    <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>Orbit Mode</span>
                  </>
                ) : (
                  <>
                    <Move className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>Pan Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
              <button
                onClick={onZoomIn}
                className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-1 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-xs sm:text-sm text-gray-300 hover:text-white transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              <button
                onClick={onZoomOut}
                className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-1 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-xs sm:text-sm text-gray-300 hover:text-white transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
            </div>

            {/* Reset View */}
            <div className="px-2 sm:px-3">
              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-xs sm:text-sm text-white transition-all"
              >
                <Maximize2 className="w-3 sm:w-4 h-3 sm:h-4" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Instructions - Hidden on mobile */}
      <div className="hidden sm:block mt-2 sm:mt-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-2 sm:p-4 max-w-xs">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">Controls</h3>
        <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-400">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-mono bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Left Click</span>
            <span>{currentMode === 'orbit' ? 'Rotate' : 'Pan'}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-mono bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Right Click</span>
            <span>{currentMode === 'orbit' ? 'Pan' : 'Rotate'}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-mono bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Scroll</span>
            <span>Zoom In/Out</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-mono bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Middle Click</span>
            <span>Pan (Always)</span>
          </div>
        </div>
      </div>
    </div>
  );
}