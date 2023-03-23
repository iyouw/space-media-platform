import { MediaSource } from 'src/media-source/media-source';
import { ProbeResult } from './probe-result';

export interface IDemuxerProvider {
  canDemux(format: number): boolean;
  probe(source: MediaSource): ProbeResult;
}
