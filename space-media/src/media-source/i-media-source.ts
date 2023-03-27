import { IStream } from '../utils/stream/i-stream';

export interface IMediaSource extends IStream {
  readonly url: string;
}
