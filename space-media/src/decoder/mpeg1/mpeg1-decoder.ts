import { Packet } from '../../demuxer/packet/packet';
import { Frame } from '../frame/frame';

export class Mpeg1Decoder {
  public decode(packet: Packet): Frame {
    throw new Error('Method not implemented.');
  }
}
