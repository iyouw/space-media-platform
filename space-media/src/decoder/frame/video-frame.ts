import { Frame } from "./frame";

export type VideoFrameData = Uint8ClampedArray | Uint8Array;

export class VideoFrame extends Frame<VideoFrameData> {
  public width: number;
  public height: number;

  public constructor(
    width: number = 0, 
    height: number = 0, 
    pts: number = 0, 
    data: Array<VideoFrameData> = new Array<VideoFrameData>
  ) {
    super(pts, data);
    this.width = width;
    this.height = height;
  }

  public override isVideo(): this is VideoFrame {
    return true;
  }
}