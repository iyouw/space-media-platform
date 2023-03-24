import { CodecId } from 'src/decoder/codec-id';
import { Counter } from 'src/utils/counter/counter';
import { MediaType } from '../media-type';
import { Stream } from '../stream/stream';

export class Packet extends Counter {
  public readonly stream: Stream;
  public pts: number;
  public data: Array<Uint8Array>;

  public constructor(stream: Stream, length = 0, pts = 0, data: Array<Uint8Array> = new Array<Uint8Array>()) {
    super(length);
    this.stream = stream;
    this.pts = pts;
    this.data = data;
  }

  public get mediaType(): MediaType {
    return this.stream.mediaType;
  }

  public get codeId(): CodecId {
    return this.stream.codeId;
  }

  public addData(data: Uint8Array): void {
    this.data.push(data);
    this.count(data.length);
  }
}
