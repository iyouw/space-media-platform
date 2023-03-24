import { IMediaSource } from 'src/media-source/i-media-source';
import { BitReader } from 'src/utils/reader/bit-reader';
import { Demuxer } from '../demuxer';
import { MediaType } from '../media-type';
import { Packet } from '../packet/packet';
import { PAT } from '../pat/pat';
import { PMT } from '../pmt/pmt';
import { Program } from '../program/program';
import { Stream } from '../stream/stream';
import { PAT_PID } from './constant';

export class TSDemuxer extends Demuxer {
  private _packetSize: number;

  private _pat?: PAT;
  private _pmt?: PMT;

  // stream_id to packet
  private _packetMap: Map<number, Packet>;

  public constructor(packetSize: number) {
    super();
    this._packetSize = packetSize;
    this._packetMap = new Map<number, Packet>();
  }

  protected get isPatCompleted(): boolean {
    if (!this._pat) return false;
    return this._pat.isCompleted;
  }

  protected get isPmtCompleted(): boolean {
    if (!this._pmt) return false;
    return this._pmt.isCompleted;
  }

  public override getStreams(type?: MediaType | undefined): Array<Stream> {
    if (!this._pmt) return new Array<Stream>();
    return this._pmt.getStreams(type);
  }

  public override demux(source: IMediaSource): void {
    while (source.has(this._packetSize)) {
      const buffer = source.read(this._packetSize);
      const reader = new BitReader(buffer);
      this.parsePacket(reader);
    }
  }

  protected parsePacket(reader: BitReader): void {
    // check start code;
    if (reader.read(8) !== 0x47) return;
    // skip transport error(1 bit);
    reader.skip(1);
    const payloadStart = reader.read(1);
    // skip transport priority(1 bit)
    reader.skip(1);
    const pid = reader.read(13);
    // skip transport scrambling(2 bit)
    reader.skip(2);
    const adaptationField = reader.read(2);
    // skip continuity counter(4 bit)
    reader.skip(4);
    // check  if we have payload
    if (adaptationField & 0x01) {
      if (adaptationField & 0x02) {
        const adaptationFieldLength = reader.read(8) << 3;
        reader.skip(adaptationFieldLength);
      }
      // parse pat to find program
      if (pid === PAT_PID && !this.isPatCompleted) {
        this.parsePAT(reader, payloadStart);
      }
      // parse pmt to find stream
      if (this._pat?.has(pid) && !this.isPmtCompleted) {
        this.parsePMT(reader, payloadStart);
        if (this.isPmtCompleted) this.onHeaderParsed?.();
      }
      // parse selected stream
      if (this.isSelected(pid)) {
        this.parsePES(reader, pid, payloadStart);
      }
    }
  }

  protected parsePAT(reader: BitReader, payloadStart: number): void {
    // check is payload start
    if (payloadStart) reader.skip(8);
    // skip pat table_id(8 bit) section_syntax_indicator(1 bit) zero(1 bit) && resrve(2 bit)
    reader.skip(12);
    // read section_length(12 bit)
    const sectionLength = reader.read(12);
    // create pat
    if (!this._pat) this._pat = new PAT(sectionLength);
    // skip transport_stream_id(16 bit), reserve(2 bit), version (5 bit) current_next_indicator(1 bit)
    reader.skip(24);
    // skip section_number(8 bit), last_section_number(8 bit)
    reader.skip(8 + 8);
    // pat skip the middle & crc bytes
    // skip transport_stream_id(16 bit), reserve(2 bit), version (5 bit) current_next_indicator(1 bit)
    // skip section_number(8 bit), last_section_number(8 bit) crc(32 bit). all is 16 + 2 + 5 + 1 + 8 + 8 + 32 = 9
    this._pat.count(9);
    // resolve programs
    while (!reader.isEnd && !this.isPatCompleted) {
      const programNumber = reader.read(16);
      // skip reserve
      reader.skip(3);
      // if the slice is not program, then continue
      if (!programNumber) {
        // skip network pid
        reader.skip(13);
        continue;
      }
      // read program_pid(13 bit)
      const pid = reader.read(13);
      const program = new Program(pid, programNumber);
      // 16 bit + 3 bit + 13 bit = 4 byte. so the program size is 4
      this._pat.addProgram(program, 4);
    }
  }

  protected parsePMT(reader: BitReader, payloadStart: number): void {
    // check is payload start
    if (payloadStart) reader.skip(8);
    // skip pmt table_id(8 bit) section_syntax_indicator(1 bit) zero(1 bit) reserve(2 bit),
    reader.skip(12);
    // read section_length(12 bit)
    const sectionLength = reader.read(12);
    // record how many bits had readed
    if (!this._pmt) this._pmt = new PMT(sectionLength);
    // read program_number(16 bit)
    if (reader.read(16) <= 0) return;
    // skip reserve(2 bit), version(5 bit) current_next_indicator(1 bit)
    reader.skip(8);
    // skip section_number(8bit), last_section_number(8 bit),
    // reserve(3 bit), pcr_pid(13 bit), reserve(4 bit)
    reader.skip(36);
    // read program_info_length(12 bit) and skip
    // skip program_info_length
    const desc = reader.read(12);
    reader.skip(desc << 3);
    // pmt skip 16 + 7 + 1 + 36 + 12 + 32 = 13 byte
    this._pmt.count(13 + desc);
    // loop
    while (!reader.isEnd && !this.isPmtCompleted) {
      // read stream_type(8 bit)
      const streamType = reader.read(8);
      // skip reserve(3 bit)
      reader.skip(3);
      // read elementary_pid(13 bit)
      const pid = reader.read(13);
      const stream = new Stream(pid, streamType);
      // stream_type 8 bit reserve 3 bit elementary_pid 13bit. total is 8 bit + 3 bit + 13 bit = 3 bytes
      this._pmt.addStream(stream, 3);

      // skip reserve(4 bit)
      reader.skip(4);
      // read elementary_stream_info_length(12 bit) and skip it
      const desc = reader.read(12);
      reader.skip(desc << 3);
      // pmt should skip 4 bit + 12 bit = 2 byte
      this._pmt.count(2 + desc);
    }
  }

  protected parsePES(reader: BitReader, pid: number, payloadStart: number): void {
    const stream = this.getSelected(pid);
    if (!stream) return;
    if (payloadStart) {
      const prevPacket = this._packetMap.get(pid);
      if (prevPacket) this.onPacketParsed?.(prevPacket);
      // check is start
      if (reader.read(24) !== 0x01) return;
      // stream id(8 bit)
      reader.skip(8);
      const packetLength = reader.read(16);
      // reserved(2bit), pes_scrambling_control(2 bit), pes_priority(1 bit)
      // data_alignment_indicator(1 bit), copyright(1 bit), original_or_copy(1 bit)
      reader.skip(8);
      const ptsDtsFlag = reader.read(2);
      // ESCR_flag(1 bit), RS_rate_flag(1 bit), DSM_trick_mode_flag(1 bit)
      // additional_copy_info_flag(1 bit), PES_CRC_flag(1 bit), PES_extension_flag(1 bit)
      reader.skip(6);
      const headerLength = reader.read(8);

      const payloadStartIndex = reader.index + (headerLength << 3);
      const payloadLength = packetLength ? packetLength - headerLength - 3 : 0;
      const pkt = new Packet(stream);
      if (ptsDtsFlag & 0x02) {
        // The Presentation Timestamp is encoded as 33(!) bit
        // integer, but has a "marker bit" inserted at weird places
        // in between, making the whole thing 5 bytes in size.
        // You can't make this shit up...
        reader.skip(4);
        const p32_30 = reader.read(3);
        reader.skip(1);
        const p29_15 = reader.read(15);
        reader.skip(1);
        const p14_0 = reader.read(15);
        reader.skip(1);
        // Can't use bit shifts here; we need 33 bits of precision,
        // so we're using JavaScript's double number type. Also
        // divide by the 90khz clock to get the pts in seconds.
        const pts = (p32_30 * 1073741824 + p29_15 * 32768 + p14_0) / 90000;
        pkt.pts = pts;
        this._packetMap.set(pid, pkt);
      }
      reader.seek(payloadStartIndex);
    }
    const pkt = this._packetMap.get(pid);
    if (!pkt) return;
    pkt.addData(reader.readToEnd());
  }
}
