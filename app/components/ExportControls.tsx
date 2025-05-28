'use client';

import { useState } from 'react';
import { Download, Camera, Image, FileDown } from 'lucide-react';

interface ExportControlsProps {
  onScreenshot?: () => void;
  onExportImage?: (format: 'png' | 'jpeg') => void;
  className?: string;
}

export default function ExportControls({ 
  onScreenshot, 
  onExportImage,
  className = '' 
}: ExportControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleScreenshot = async () => {
    setIsExporting(true);
    try {
      await onScreenshot?.();
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  const handleExport = async (format: 'png' | 'jpeg') => {
    setIsExporting(true);
    try {
      await onExportImage?.(format);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  return (
    <div className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 ${className}`}>
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-1 sm:p-2">
        {/* Export Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 text-gray-300 hover:text-white transition-colors"
          title="Export Options"
        >
          <Download className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium hidden sm:inline">Export</span>
        </button>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-gray-700 space-y-1 sm:space-y-2">
            {/* Screenshot */}
            <button
              onClick={handleScreenshot}
              disabled={isExporting}
              className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm transition-all ${
                isExporting 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <Camera className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Screenshot</span>
            </button>

            {/* Export as PNG */}
            <button
              onClick={() => handleExport('png')}
              disabled={isExporting}
              className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm transition-all ${
                isExporting 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Export PNG</span>
            </button>

            {/* Export as JPEG */}
            <button
              onClick={() => handleExport('jpeg')}
              disabled={isExporting}
              className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm transition-all ${
                isExporting 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <FileDown className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Export JPEG</span>
            </button>
          </div>
        )}

        {/* Export status */}
        {isExporting && (
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-gray-700">
            <div className="text-xs text-blue-400 text-center animate-pulse">
              Exporting...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}