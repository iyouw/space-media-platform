import { IMediaSource } from 'src/media-source/i-media-source';
import { IDemuxer } from '../i-demuxer';
import { ProbeResult } from './probe-result';

export interface IDemuxerProvider {
  canDemux(format: number): boolean;
  probe(source: IMediaSource): ProbeResult;
  provide(): IDemuxer;
}
