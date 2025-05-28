'use client';

import { useState } from 'react';
import { Settings, Palette, Gauge, ChevronDown } from 'lucide-react';

interface ViewerSettingsProps {
  onQualityChange?: (quality: number) => void;
  onRenderModeChange?: (mode: number) => void;
  currentQuality?: number;
  currentRenderMode?: number;
  className?: string;
  showRestartHint?: boolean;
}

export default function ViewerSettings({
  onQualityChange,
  onRenderModeChange,
  currentQuality = 2,
  currentRenderMode = 2,
  className = '',
  showRestartHint = false
}: ViewerSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const qualityOptions = [
    { value: 4, label: 'Low', description: 'Faster performance' },
    { value: 2, label: 'Medium', description: 'Balanced' },
    { value: 1, label: 'High', description: 'Better quality' },
  ];

  const renderModes = [
    { value: 0, label: 'Additive', description: 'Additive blending' },
    { value: 1, label: 'Three.js', description: 'Standard Three.js' },
    { value: 2, label: 'Default', description: 'Default splat rendering' },
  ];

  return (
    <div className={`absolute top-4 left-4 ${className}`}>
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-2 min-w-[240px]">
        {/* Settings Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Viewer Settings</span>
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Settings */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-gray-700 space-y-4">
            {/* Quality Setting */}
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Quality</span>
              </div>
              <div className="space-y-1">
                {qualityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onQualityChange?.(option.value);
                      setHasChanges(true);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      currentQuality === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-70">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Render Mode Setting */}
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Render Mode</span>
              </div>
              <div className="space-y-1">
                {renderModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => {
                      onRenderModeChange?.(mode.value);
                      setHasChanges(true);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      currentRenderMode === mode.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-xs opacity-70">{mode.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Restart hint */}
            {hasChanges && (
              <div className="px-3 pb-2">
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-md p-2 text-xs text-yellow-300">
                  Settings will apply after refreshing the page
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}