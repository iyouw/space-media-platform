import { IMediaSource } from '../media-source/i-media-source';
import { Handler } from '../utils/typings';
import { IDemuxer } from './i-demuxer';
import { MediaType } from './media-type';
import { Packet } from './packet/packet';
import { Stream } from './stream/stream';

export abstract class Demuxer implements IDemuxer {
  private _selectedStreams: Map<number, Stream>;

  public onHeaderParsed?: Handler<void>;
  public onPacketParsed?: Handler<Packet>;

  public constructor() {
    this._selectedStreams = new Map<number, Stream>();
  }

  public abstract getStreams(type?: MediaType): Array<Stream>;

  public abstract demux(source: IMediaSource): void;

  public isSelected(streamId: number): boolean {
    return this._selectedStreams.has(streamId);
  }

  public getSelected(streamId: number): Stream | undefined {
    return this._selectedStreams.get(streamId);
  }

  public select(stream: Stream | undefined): void {
    if (!stream) return;
    this._selectedStreams.set(stream.id, stream);
  }

  public dispose(): void {
    this.onHeaderParsed = undefined;
    this.onPacketParsed = undefined;
  }
}
