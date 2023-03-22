import { MediaStream } from "../media-stream/media-stream";

export class Packet {
  public readonly stream: MediaStream;
  public pts: number;
  public length: number;
  public data: Array<Uint8Array>;

  public constructor(
    stream: MediaStream, 
    pts: number = 0, 
    length: number = 0, 
    data: Array<Uint8Array> = new Array<Uint8Array>
  ) {
    this.stream = stream;
    this.pts = pts;
    this.length = length;
    this.data = data;
  }
}