import { BitReader } from "../utils/reader/bit-reader";
import { Packet } from "./packet/packet";

export interface IDemuxer {
  parsePacket(reader: BitReader): Packet;
}
