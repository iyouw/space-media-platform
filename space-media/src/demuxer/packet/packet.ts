import { CodecId } from 'src/decoder/codec-id';
import { MediaType } from '../media-type';
import { Stream } from '../stream/stream';

export class Packet {
  public readonly stream: Stream;
  public pts: number;
  public length: number;
  public data: Array<Uint8Array>;

  public constructor(stream: Stream, pts = 0, length = 0, data: Array<Uint8Array> = new Array<Uint8Array>()) {
    this.stream = stream;
    this.pts = pts;
    this.length = length;
    this.data = data;
  }

  public get mediaType(): MediaType {
    return this.stream.mediaType;
  }

  public get codeId(): CodecId {
    return this.stream.codeId;
  }
}
