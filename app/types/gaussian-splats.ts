// Type definitions for GaussianSplats3D viewer
export interface GaussianSplatViewer {
  renderer: {
    domElement: HTMLCanvasElement;
    render: (scene: unknown, camera: unknown) => void;
    setPixelRatio: (ratio: number) => void;
  };
  camera?: {
    position: {
      set: (x: number, y: number, z: number) => void;
      multiplyScalar: (scalar: number) => void;
    };
    lookAt: (x: number, y: number, z: number) => void;
    updateProjectionMatrix: () => void;
  };
  controls?: {
    reset: () => void;
  };
  scene?: unknown;
  renderReductionFactor?: number;
  splatRenderMode?: number;
  splats?: {
    renderMode?: number;
  };
  dispose: () => void;
  stop: () => void;
  start: () => void;
  addSplatScene: (
    url: string,
    options: {
      showLoadingUI?: boolean;
      splatAlphaRemovalThreshold?: number;
      position?: number[];
      rotation?: number[];
      scale?: number[];
      onProgress?: (progress: number) => void;
    }
  ) => Promise<void>;
  setRenderReductionFactor?: (factor: number) => void;
  setSplatRenderMode?: (mode: number) => void;
}