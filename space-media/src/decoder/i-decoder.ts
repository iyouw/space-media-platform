import { Packet } from '../demuxer/packet/packet';
import { Frame } from './frame/frame';

export interface IDecoder {
  decode(packet: Packet): Frame;
  dispose(): void;
}
