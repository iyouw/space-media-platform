import { IMediaSource } from '../media-source/i-media-source';
import { Handler } from '../utils/typings';
import { MediaType } from './media-type';
import { Packet } from './packet/packet';
import { Stream } from './stream/stream';

export interface IDemuxer {
  onHeaderParsed?: Handler<void>;
  onPacketParsed?: Handler<Packet>;
  select(stream: Stream): void;
  getStreams(type?: MediaType): Array<Stream>;
  demux(source: IMediaSource): void;
  dispose(): void;
}
