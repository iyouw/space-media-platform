import { MediaStreamType } from "../demuxer/media-stream/media-stream-type";
import { Packet } from "../demuxer/packet/packet";
import { Frame } from "./frame/frame";
import { IDecoder } from "./i-decoder";

export abstract class AudioDecoder implements IDecoder {
  public abstract canDecode(type: MediaStreamType): boolean;
  public abstract decode(packet: Packet): Frame<unknown>;

  public isAudio(): boolean {
    return true;
  }

  public isVideo(): boolean {
    return false;
  }
}