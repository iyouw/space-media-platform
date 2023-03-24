import { IMediaSource } from 'src/media-source/i-media-source';
import { Registry } from 'src/utils/registry/registry';
import { IDemuxerProvider } from '../provider/i-demuxer-provider';
import { ProbeResult } from '../provider/probe-result';

export interface IDemuxerRegistry extends Registry<IDemuxerProvider> {
  probe(source: IMediaSource): ProbeResult;
}
