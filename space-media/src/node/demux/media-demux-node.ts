import { IDemuxer } from 'src/demuxer/i-demuxer';
import { DemuxerRegistry } from 'src/demuxer/registry/demuxer-registry';
import { IDemuxerRegistry } from 'src/demuxer/registry/i-demuxer-registry';
import { MediaSource } from 'src/media-source/media-source';
import { NotImplementException } from 'src/utils/exception/not-implement-exception';
import { MapNode } from '../map-node';

export class MediaDemuxNode extends MapNode<MediaSource> {
  private _demuxerRegistry: IDemuxerRegistry;
  private _demuxer?: IDemuxer;

  public constructor(demuxerRegistry = DemuxerRegistry.Default) {
    super();
    this._demuxerRegistry = demuxerRegistry;
  }

  public process(data: MediaSource): void {
    throw new NotImplementException();
  }

  public dispose(): void {
    this._demuxer?.dispose();
  }
}
