import { MediaSource } from 'src/media-source/media-source';
import { Registry } from 'src/utils/registry/registry';
import { IDemuxerProvider } from '../provider/i-demuxer-provider';

export class DemuxerRegistry extends Registry<IDemuxerProvider> {
  public static readonly Default = DemuxerRegistry.CreateDefault();

  public static CreateDefault(): DemuxerRegistry {
    const res = new DemuxerRegistry();
    return res;
  }
}
