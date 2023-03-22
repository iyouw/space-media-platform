import { Frame } from './frame';

export type VideoFrameData = Uint8ClampedArray | Uint8Array;

export class VideoFrame extends Frame<VideoFrameData> {
  public width: number;
  public height: number;

  public constructor(width = 0, height = 0, pts = 0, data: Array<VideoFrameData> = new Array<VideoFrameData>()) {
    super(pts, data);
    this.width = width;
    this.height = height;
  }

  public override isVideo(): this is VideoFrame {
    return true;
  }
}
