import { Packet } from '../demuxer/packet/packet';
import { Handler } from '../utils/typings';
import { Frame } from './frame/frame';
import { IDecoder } from './i-decoder';

export abstract class Decoder implements IDecoder {
  public onFrameParsed?: Handler<Frame<unknown>>;

  public abstract decode(packet: Packet): void;

  public dispose(): void {
    this.onFrameParsed = undefined;
  }
}
