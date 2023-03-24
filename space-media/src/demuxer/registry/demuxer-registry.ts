import { IMediaSource } from 'src/media-source/i-media-source';
import { Registry } from 'src/utils/registry/registry';
import { IDemuxerProvider } from '../provider/i-demuxer-provider';
import { ProbeResult } from '../provider/probe-result';
import { ProbeStatus } from '../provider/probe-status';
import { IDemuxerRegistry } from './i-demuxer-registry';

export class DemuxerRegistry extends Registry<IDemuxerProvider> implements IDemuxerRegistry {
  public static readonly Default = DemuxerRegistry.CreateDefault();

  public static CreateDefault(): DemuxerRegistry {
    const res = new DemuxerRegistry();
    return res;
  }

  public probe(source: IMediaSource): ProbeResult {
    let res: ProbeResult = { status: ProbeStatus.FAILURE };
    for (const provider of this.items) {
      const pr = provider.probe(source);
      if (pr.status === ProbeStatus.SUCCESS) {
        res = pr;
        break;
      }
      if (pr.status === ProbeStatus.NEEDDATA) {
        res = pr;
      }
    }
    return res;
  }
}
