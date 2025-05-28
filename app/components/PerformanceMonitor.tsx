'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity, X } from 'lucide-react';

interface PerformanceMonitorProps {
  viewer?: any;
  className?: string;
}

export default function PerformanceMonitor({ viewer, className = '' }: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState(0);
  const [frameTime, setFrameTime] = useState(0);
  const [memory, setMemory] = useState<{ used: number; total: number } | null>(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!viewer || !isVisible) return;

    let animationId: number;
    const startTime = performance.now();

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCountRef.current++;

      // Calculate FPS every second
      if (currentTime - lastTimeRef.current >= 1000) {
        const currentFps = Math.round(frameCountRef.current * 1000 / (currentTime - lastTimeRef.current));
        setFps(currentFps);
        setFrameTime(Math.round(1000 / currentFps));
        
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      // Check memory if available
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        setMemory({
          used: Math.round(memInfo.usedJSHeapSize / 1048576), // Convert to MB
          total: Math.round(memInfo.totalJSHeapSize / 1048576)
        });
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [viewer, isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-2 hover:bg-gray-800 transition-colors ${className}`}
        title="Show Performance Monitor"
      >
        <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300" />
      </button>
    );
  }

  return (
    <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-3 sm:p-4 min-w-[160px] sm:min-w-[200px] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-1">
          <Activity className="w-3 sm:w-4 h-3 sm:h-4" />
          Performance
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="w-3 sm:w-4 h-3 sm:h-4" />
        </button>
      </div>
      
      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">FPS:</span>
          <span className={`font-mono ${fps >= 30 ? 'text-green-400' : fps >= 20 ? 'text-yellow-400' : 'text-red-400'}`}>
            {fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Frame Time:</span>
          <span className="text-gray-300 font-mono">{frameTime}ms</span>
        </div>
        
        {memory && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-400">Memory:</span>
              <span className="text-gray-300 font-mono">{memory.used}MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Heap:</span>
              <span className="text-gray-300 font-mono">{memory.total}MB</span>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          {fps < 30 && (
            <p className="text-yellow-400">Consider lowering quality settings for better performance</p>
          )}
          {fps >= 30 && (
            <p className="text-green-400">Performance is good</p>
          )}
        </div>
      </div>
    </div>
  );
}