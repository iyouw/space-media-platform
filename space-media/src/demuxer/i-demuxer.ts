import { Handler } from 'src/utils/typings';
import { Packet } from './packet/packet';

export interface IDemuxer {
  onHeaderParsed?: Handler<void>;
  onPacketParsed?: Handler<Packet>;
  demux(): void;
}
