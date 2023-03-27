import { Handler } from 'src/utils/typings';
import { Packet } from '../demuxer/packet/packet';
import { Frame } from './frame/frame';

export interface IDecoder {
  onFrameParsed?: Handler<Frame>;
  decode(packet: Packet): void;
  dispose(): void;
}
