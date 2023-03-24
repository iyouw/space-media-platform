import { Counter } from 'src/utils/counter/counter';
import { MediaType } from '../media-type';
import { Stream } from '../stream/stream';

export class PMT extends Counter {
  private _streamMap: Map<number, Stream>;

  public constructor(size: number) {
    super(size);
    this._streamMap = new Map<number, Stream>();
  }

  public addStream(stream: Stream, size: number): void {
    this._streamMap.set(stream.id, stream);
    this.count(size);
  }

  public getStreams(type?: MediaType | undefined): Array<Stream> {
    const streams = Array.from(this._streamMap.values());
    if (!type) return streams;
    return streams.filter((x) => x.mediaType === type);
  }
}
