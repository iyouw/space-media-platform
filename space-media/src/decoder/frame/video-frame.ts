import { Frame } from './frame';

export type VideoFrameData = Uint8ClampedArray | Uint8Array;

export class VideoFrame extends Frame<VideoFrameData> {
  public width: number;
  public height: number;

  public frameRate: number;

  public constructor(
    pts = 0,
    width = 0,
    height = 0,
    frameRate = 0,
    data: Array<VideoFrameData> = new Array<VideoFrameData>()
  ) {
    super(pts, data);

    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
  }

  public override isVideo(): this is VideoFrame {
    return true;
  }
}
