type ConstructorOptions = {
  /** repeat count.
   * default: 0
   * -1 = no repeat
   * 0 = forever
   */
  repeat: number;
  /**
   * pixel sample interval.
   * default: 10
   * lower is better
   */
  quality: number;
  /**
   * number of web workers to spawn.
   * default: 2
   */
  workers: number;
  /**
   * url to load worker script from.
   * default: gif.worker.js
   */
  workerScript: string;
  /**
   * background color where source image is transparent.
   * default: #fff
   */
  background: string;
  /**
   * output image width.
   * default: null
   */
  width: null | number;
  /**
   * output image height.
   * default: null
   */
  height: null | number;
  /**
   * transparent hex color, 0x00FF00 = green.
   * default: null
   */
  transparent:	null | string;
  /**
   * dithering method, e.g. FloydSteinberg-serpentine.
   * default: false
   */
  dither: boolean | string;
  /**
   * 	whether to print debug information to console.
   * default: false
   */
  debug: boolean;
}

type AddFrameOptions = {
  copy: boolean;
  delay: number;
  dispose: number;
}

type EventFinished = 'finished'
type EventAbort = 'abort'
type EventProgress = 'progress'

export default class GIF {
  constructor(options?: Partial<ConstructorOptions>);
  addFrame(elm: HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D, options?: Partial<AddFrameOptions>): void;
  on(eventName: EventFinished, callback: (blob: Blob) => void): void;
  on(eventName: EventAbort, callback: (blob: Blob) => void): void;
  on(eventName: EventProgress, callback: (preogress: number) => void): void;
  render(): void;
}
