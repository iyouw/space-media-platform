import { MemoryStream } from '../utils/stream/memory-stream';
import { IMediaSource } from './i-media-source';

export class MediaSource extends MemoryStream implements IMediaSource {
  public url: string;

  public constructor(
    url: string,
    capacity: number = MemoryStream.Page * 10,
    maxCapacity: number = MemoryStream.Page * 20
  ) {
    super(capacity, maxCapacity);
    this.url = url;
  }
}
