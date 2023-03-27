import { IMediaSource } from 'src/media-source/i-media-source';
import { IDemuxer } from '../i-demuxer';
import { TSDemuxer } from '../ts/ts-demuxer';
import { IDemuxerProvider } from './i-demuxer-provider';
import { ProbeResult } from './probe-result';
import { ProbeStatus } from './probe-status';

export class TSDemuxerProvider implements IDemuxerProvider {
  public static readonly START = 0x47;

  private _packetLenth: number;

  public constructor() {
    this._packetLenth = 188;
  }

  public canDemux(format: number): boolean {
    return false;
  }

  public probe(source: IMediaSource): ProbeResult {
    if (!source.has(this._packetLenth * 3)) return { status: ProbeStatus.NEEDDATA };
    for (let i = 0; i < this._packetLenth; i++) {
      if (
        source.get(i) === TSDemuxerProvider.START &&
        source.get(i + this._packetLenth) === TSDemuxerProvider.START &&
        source.get(i + 2 * this._packetLenth) === TSDemuxerProvider.START
      ) {
        return { status: ProbeStatus.SUCCESS, provider: this };
      }
    }
    return { status: ProbeStatus.FAILURE };
  }

  public provide(): IDemuxer {
    return new TSDemuxer(this._packetLenth);
  }
}
