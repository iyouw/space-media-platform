import { MediaStreamType } from "../demuxer/media-stream/media-stream-type";
import { Packet } from "../demuxer/packet/packet";
import { Frame } from "./frame/frame";

export interface IDecoder {
  isVideo(): boolean;
  isAudio(): boolean;
  canDecode(type: MediaStreamType): boolean; 
  decode(packet: Packet): Frame;
}