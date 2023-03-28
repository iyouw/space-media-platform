import { IDemuxer } from '../../demuxer/i-demuxer';
import { MediaType } from '../../demuxer/media-type';
import { Packet } from '../../demuxer/packet/packet';
import { ProbeStatus } from '../../demuxer/provider/probe-status';
import { DemuxerRegistry } from '../../demuxer/registry/demuxer-registry';
import { IDemuxerRegistry } from '../../demuxer/registry/i-demuxer-registry';
import { IMediaSource } from '../../media-source/i-media-source';
import { NotFoundException } from '../../utils/exception/not-found-exception';
import { Node } from '../node';

export class MediaDemuxNode extends Node<IMediaSource> {
  private _demuxerRegistry: IDemuxerRegistry;

  private _demuxer?: IDemuxer;

  public constructor(demuxerRegistry = DemuxerRegistry.Default) {
    super();
    this._demuxerRegistry = demuxerRegistry;
  }

  public process(data: IMediaSource): void {
    if (!this._demuxer) {
      const probeResult = this._demuxerRegistry.probe(data);
      if (probeResult.status === ProbeStatus.FAILURE) throw new NotFoundException(`demuxer for media ${data.url}`);
      if (probeResult.status === ProbeStatus.NEEDDATA) return;
      if (probeResult.status === ProbeStatus.SUCCESS) {
        this._demuxer = probeResult.provider.provide();
        this._demuxer.onHeaderParsed = this.selectMediaStream.bind(this);
        this._demuxer.onPacketParsed = this.decodePacket.bind(this);
      }
    }
    this._demuxer?.demux(data);
  }

  public override dispose(): void {
    this._demuxer?.dispose();
    this._demuxer = undefined;
  }

  protected selectMediaStream(): void {
    if (!this._demuxer) return;
    const videos = this._demuxer.getStreams(MediaType.VIDEO);
    const audios = this._demuxer.getStreams(MediaType.AUDIO);
    const selectedVideo = videos[0];
    const selectedAudio = audios[0];
    this._demuxer.select(selectedVideo);
    this._demuxer.select(selectedAudio);
  }

  protected decodePacket(packet: Packet): void {
    if (!this._demuxer) return;
    const type = packet.mediaType;
    const node = this.getConnectNode(type);
    node?.process(packet);
  }
}
