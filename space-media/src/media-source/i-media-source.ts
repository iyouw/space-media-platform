import { IStream } from 'src/utils/stream/i-stream';

export interface IMediaSource extends IStream {
  readonly url: string;
}
