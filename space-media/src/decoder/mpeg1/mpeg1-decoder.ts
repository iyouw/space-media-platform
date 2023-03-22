import { MediaStreamType } from "../../demuxer/media-stream/media-stream-type";
import { Packet } from "../../demuxer/packet/packet";
import { Frame } from "../frame/frame";
import { VideoDecoder } from "../video-decoder";

export class Mpeg1Decoder extends VideoDecoder {
  public canDecode(type: MediaStreamType): boolean {
    throw new Error("Method not implemented.");
  }
  public decode(packet: Packet): Frame<unknown> {
    throw new Error("Method not implemented.");
  }
}