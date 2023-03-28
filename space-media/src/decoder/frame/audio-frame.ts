import { Frame } from './frame';

export class AudioFrame extends Frame<Float32Array> {
  public channel: number;
  public sampleRate: number;
  public frameSize: number;

  public constructor(
    pts = 0,
    channel = 0,
    sampleRate = 0,
    frameSize = 0,
    data: Array<Float32Array> = new Array<Float32Array>()
  ) {
    super(pts, data);
    this.channel = channel;
    this.sampleRate = sampleRate;
    this.frameSize = frameSize;
  }

  public override isAudio(): this is AudioFrame {
    return true;
  }
}
