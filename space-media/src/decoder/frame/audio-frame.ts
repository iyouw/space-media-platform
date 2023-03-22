import { Frame } from "./frame";

export class AudioFrame extends Frame<Float32Array> {
  public channel: number;
  public sampleRate: number;

  public constructor(
    channel: number = 0, 
    sampleRate: number = 0, 
    pts: number = 0, 
    data: Array<Float32Array> = new Array<Float32Array>
  ) {
    super(pts, data);
    this.channel = channel;
    this.sampleRate = sampleRate;
  }

  public override isAudio(): this is AudioFrame {
    return true;
  }
}