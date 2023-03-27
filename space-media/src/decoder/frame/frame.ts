import type { AudioFrame } from './audio-frame';
import type { VideoFrame } from './video-frame';

export class Frame<T = unknown> {
  public pts: number;
  public readonly data: Array<T>;

  public constructor(pts = 0, data: Array<T> = new Array<T>()) {
    this.pts = pts;
    this.data = data;
  }

  public isVideo(): this is VideoFrame {
    return false;
  }

  public isAudio(): this is AudioFrame {
    return false;
  }

  public add(data: T): void {
    this.data.push(data);
  }
}
