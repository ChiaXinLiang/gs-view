import { useEffect, useRef, useState } from 'react';
import type { GaussianSplatViewer } from '../types/gaussian-splats';

interface PerformanceOptimizationOptions {
  targetFPS?: number;
  measurementInterval?: number;
  enabled?: boolean;
}

export function usePerformanceOptimization(
  viewer: GaussianSplatViewer | null,
  onQualityChange: (quality: number) => void,
  options: PerformanceOptimizationOptions = {}
) {
  const {
    targetFPS = 30,
    measurementInterval = 5000, // Check every 5 seconds
    enabled = true
  } = options;

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentQuality, setCurrentQuality] = useState(2);
  const frameCountRef = useRef(0);
  const lastCheckRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    if (!viewer || !enabled) return;

    let animationId: number;

    const measureFPS = () => {
      frameCountRef.current++;
      animationId = requestAnimationFrame(measureFPS);
    };

    const checkPerformance = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - lastCheckRef.current;
      const currentFPS = Math.round(frameCountRef.current * 1000 / elapsed);
      
      fpsHistoryRef.current.push(currentFPS);
      if (fpsHistoryRef.current.length > 5) {
        fpsHistoryRef.current.shift();
      }

      const avgFPS = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;
      
      // Auto-adjust quality based on FPS
      if (avgFPS < targetFPS - 5 && currentQuality < 4) {
        // Performance is bad, reduce quality
        const newQuality = Math.min(4, currentQuality + 1);
        setCurrentQuality(newQuality);
        onQualityChange(newQuality);
        setIsOptimizing(true);
        console.log(`Performance optimization: Reducing quality to ${newQuality} (FPS: ${avgFPS})`);
      } else if (avgFPS > targetFPS + 10 && currentQuality > 1) {
        // Performance is good, can increase quality
        const newQuality = Math.max(1, currentQuality - 1);
        setCurrentQuality(newQuality);
        onQualityChange(newQuality);
        setIsOptimizing(true);
        console.log(`Performance optimization: Increasing quality to ${newQuality} (FPS: ${avgFPS})`);
      } else {
        setIsOptimizing(false);
      }

      frameCountRef.current = 0;
      lastCheckRef.current = currentTime;
    };

    // Start measuring
    animationId = requestAnimationFrame(measureFPS);
    const checkInterval = setInterval(checkPerformance, measurementInterval);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(checkInterval);
    };
  }, [viewer, enabled, targetFPS, measurementInterval, onQualityChange, currentQuality]);

  return {
    isOptimizing,
    currentQuality,
    fpsHistory: fpsHistoryRef.current
  };
}