declare module '@mkkellogg/gaussian-splats-3d' {
  import { Scene, Camera, Renderer, Vector3 } from 'three';

  export class Viewer {
    constructor(options?: ViewerOptions);
    
    dispose(): void;
    initialize(): void;
    render(): void;
    getRenderTargetCopyQuad(): any;
    getRenderReductionFactor(): number;
    setRenderReductionFactor(factor: number): void;
    getSplatSortCount(): number;
    setSplatSortCount(count: number): void;
    getSceneRevealMode(): number;
    setSceneRevealMode(mode: number): void;
    getSplatRenderMode(): number;
    setSplatRenderMode(mode: number): void;
    getPointCloudModeEnabled(): boolean;
    setPointCloudModeEnabled(enabled: boolean): void;
    getDropInMode(): boolean;
    setDropInMode(enabled: boolean): void;
    
    addSplatScene(
      url: string,
      options?: {
        splatAlphaRemovalThreshold?: number;
        showLoadingUI?: boolean;
        position?: number[];
        rotation?: number[];
        scale?: number[];
        onProgress?: (progress: number) => void;
        onLoaded?: () => void;
      }
    ): Promise<void>;
    
    removeSplatScene(index: number): void;
    setSceneVisibility(index: number, visible: boolean): void;
    
    start(): void;
    stop(): void;
    isReady(): boolean;
  }

  export interface ViewerOptions {
    cameraUp?: number[];
    initialCameraPosition?: number[];
    initialCameraLookAt?: number[];
    scene?: Scene;
    camera?: Camera;
    renderer?: Renderer;
    useBuiltInControls?: boolean;
    rootElement?: HTMLElement;
    ignoreDevicePixelRatio?: boolean;
    dropInMode?: boolean;
    antialiased?: boolean;
    sharedMemoryForWorkers?: boolean;
    integerBasedSort?: boolean;
    dynamicScene?: boolean;
    webXRMode?: string;
    renderMode?: number;
    sceneRevealMode?: number;
    splatRenderMode?: number;
    pointCloudModeEnabled?: boolean;
    splatSortCount?: number;
    renderReductionFactor?: number;
  }
}