export class Packet {
  public readonly streamId: number;
  public pts: number;
  public length: number;
  public data: Array<Uint8Array>;

  public constructor(streamId: number, pts = 0, length = 0, data: Array<Uint8Array> = new Array<Uint8Array>()) {
    this.streamId = streamId;
    this.pts = pts;
    this.length = length;
    this.data = data;
  }
}
