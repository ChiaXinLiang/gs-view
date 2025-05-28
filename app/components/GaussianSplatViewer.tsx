'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Viewer } from '@mkkellogg/gaussian-splats-3d';
import CameraControls from './CameraControls';
import ViewerSettings from './ViewerSettings';
import MobileControls from './MobileControls';

interface GaussianSplatViewerProps {
  modelUrl: string;
  className?: string;
  showControls?: boolean;
}

export default function GaussianSplatViewer({ modelUrl, className = '', showControls = true }: GaussianSplatViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const viewerContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [renderQuality, setRenderQuality] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gs-viewer-quality');
      return saved ? parseInt(saved) : 2;
    }
    return 2;
  });
  
  const [renderMode, setRenderMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gs-viewer-renderMode');
      return saved ? parseInt(saved) : 2;
    }
    return 2;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let viewer: Viewer | null = null;
    let mounted = true;
    let isDisposed = false;

    const initViewer = async () => {
      try {
        // Skip if already disposed (React StrictMode double mount)
        if (isDisposed) return;

        // Create a container div for the viewer
        const viewerContainer = document.createElement('div');
        viewerContainer.style.width = '100%';
        viewerContainer.style.height = '100%';
        container.appendChild(viewerContainer);
        viewerContainerRef.current = viewerContainer;

        viewer = new Viewer({
          rootElement: viewerContainer,
          cameraUp: [0, -1, 0],
          initialCameraPosition: [0, 0, 5],
          initialCameraLookAt: [0, 0, 0],
          splatRenderMode: renderMode, // Use current render mode
          renderReductionFactor: renderQuality, // Use current quality
          antialiased: true,
          useBuiltInControls: true,
          ignoreDevicePixelRatio: false,
          dropInMode: false,
          sharedMemoryForWorkers: false,
          integerBasedSort: false,
          dynamicScene: false,
        });

        if (!mounted || isDisposed) {
          viewer.dispose();
          return;
        }

        viewerRef.current = viewer;
        
        setLoading(true);
        setError(null);
        
        await viewer.addSplatScene(modelUrl, {
          showLoadingUI: false,
          splatAlphaRemovalThreshold: 10,
          position: [0, 0, 0],
          rotation: [0, 0, 0, 1],
          scale: [1, 1, 1],
          onProgress: (progressValue: number) => {
            if (mounted && !isDisposed) {
              setProgress(Math.round(progressValue * 100));
            }
          },
        });

        if (mounted && !isDisposed) {
          viewer.start();
          setLoading(false);
          setIsInitialized(true);
          
          // Store viewer reference for settings
          viewerRef.current = viewer;
          
          // Log available methods to debug
          console.log('Viewer methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(viewer)));
          
          // Check what properties/methods are available
          console.log('Viewer object:', viewer);
          console.log('Viewer properties:', Object.keys(viewer));
          
          // Look for render-related properties
          if ((viewer as any).renderReductionFactor !== undefined) {
            console.log('Found renderReductionFactor property');
          }
          if ((viewer as any).splatRenderMode !== undefined) {
            console.log('Found splatRenderMode property');
          }
        }
      } catch (err) {
        console.error('Error loading model:', err);
        if (mounted && !isDisposed) {
          setError(err instanceof Error ? err.message : 'Failed to load model');
          setLoading(false);
        }
      }
    };

    // Delay initialization slightly to avoid React StrictMode issues
    const timeoutId = setTimeout(() => {
      if (mounted && !isDisposed) {
        initViewer();
      }
    }, 100);

    return () => {
      mounted = false;
      isDisposed = true;
      clearTimeout(timeoutId);

      // Clean up viewer
      if (viewerRef.current) {
        try {
          viewerRef.current.stop();
          // Don't call dispose() as it seems to cause issues
          // Just clear our reference
        } catch (e) {
          console.warn('Error stopping viewer:', e);
        }
        viewerRef.current = null;
      }

      // Remove the viewer container
      if (viewerContainerRef.current && viewerContainerRef.current.parentNode) {
        viewerContainerRef.current.parentNode.removeChild(viewerContainerRef.current);
        viewerContainerRef.current = null;
      }
    };
  }, [modelUrl]);

  // Camera control handlers
  const handleResetCamera = useCallback(() => {
    if (!viewerRef.current || !isInitialized) return;
    
    try {
      const viewer = viewerRef.current as any;
      if (viewer.camera) {
        viewer.camera.position.set(0, 0, 5);
        viewer.camera.lookAt(0, 0, 0);
        viewer.camera.updateProjectionMatrix();
      }
      
      if (viewer.controls) {
        viewer.controls.reset();
      }
    } catch (err) {
      console.warn('Error resetting camera:', err);
    }
  }, [isInitialized]);

  const handleZoomIn = useCallback(() => {
    if (!viewerRef.current || !isInitialized) return;
    
    try {
      const viewer = viewerRef.current as any;
      if (viewer.camera) {
        const zoomFactor = 0.8;
        viewer.camera.position.multiplyScalar(zoomFactor);
        viewer.camera.updateProjectionMatrix();
      }
    } catch (err) {
      console.warn('Error zooming in:', err);
    }
  }, [isInitialized]);

  const handleZoomOut = useCallback(() => {
    if (!viewerRef.current || !isInitialized) return;
    
    try {
      const viewer = viewerRef.current as any;
      if (viewer.camera) {
        const zoomFactor = 1.2;
        viewer.camera.position.multiplyScalar(zoomFactor);
        viewer.camera.updateProjectionMatrix();
      }
    } catch (err) {
      console.warn('Error zooming out:', err);
    }
  }, [isInitialized]);

  const handleToggleMode = useCallback((mode: 'orbit' | 'pan') => {
    // The built-in controls handle this through mouse button mapping
    // Left click = rotate, right click = pan by default
    console.log('Camera mode:', mode);
  }, []);

  // Settings handlers
  const handleQualityChange = useCallback((quality: number) => {
    if (!viewerRef.current || !isInitialized) return;
    
    try {
      const viewer = viewerRef.current as any;
      
      // Try different possible method names
      if (typeof viewer.setRenderReductionFactor === 'function') {
        viewer.setRenderReductionFactor(quality);
      } else if (typeof viewer.renderReductionFactor !== 'undefined') {
        viewer.renderReductionFactor = quality;
      } else if (viewer.renderer && typeof viewer.renderer.setPixelRatio === 'function') {
        // Alternative: adjust pixel ratio for quality
        const pixelRatio = window.devicePixelRatio / quality;
        viewer.renderer.setPixelRatio(pixelRatio);
      }
      
      setRenderQuality(quality);
      localStorage.setItem('gs-viewer-quality', quality.toString());
      console.log('Quality changed to:', quality, '(will apply on refresh)');
    } catch (err) {
      console.warn('Error changing quality:', err);
    }
  }, [isInitialized]);

  const handleRenderModeChange = useCallback((mode: number) => {
    if (!viewerRef.current || !isInitialized) return;
    
    try {
      const viewer = viewerRef.current as any;
      
      // Try different possible method names
      if (typeof viewer.setSplatRenderMode === 'function') {
        viewer.setSplatRenderMode(mode);
      } else if (typeof viewer.splatRenderMode !== 'undefined') {
        viewer.splatRenderMode = mode;
      } else if (viewer.splats && typeof viewer.splats.renderMode !== 'undefined') {
        viewer.splats.renderMode = mode;
      }
      
      setRenderMode(mode);
      localStorage.setItem('gs-viewer-renderMode', mode.toString());
      console.log('Render mode changed to:', mode, '(will apply on refresh)');
    } catch (err) {
      console.warn('Error changing render mode:', err);
    }
  }, [isInitialized]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Viewer Settings */}
      {showControls && isInitialized && !loading && !error && (
        <ViewerSettings
          onQualityChange={handleQualityChange}
          onRenderModeChange={handleRenderModeChange}
          currentQuality={renderQuality}
          currentRenderMode={renderMode}
        />
      )}
      
      {/* Camera Controls */}
      {showControls && isInitialized && !loading && !error && (
        <CameraControls
          onReset={handleResetCamera}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onToggleMode={handleToggleMode}
        />
      )}
      
      {/* Mobile Controls Info */}
      {showControls && isInitialized && !loading && !error && (
        <MobileControls />
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="text-center">
            <div className="mb-2 sm:mb-4">
              <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-white text-sm sm:text-lg">Loading 3D Model...</p>
            <p className="text-white text-xs sm:text-sm mt-1 sm:mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 p-4">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 sm:p-6 max-w-md w-full">
            <h3 className="text-red-500 text-base sm:text-lg font-semibold mb-1 sm:mb-2">Error Loading Model</h3>
            <p className="text-red-300 text-xs sm:text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}