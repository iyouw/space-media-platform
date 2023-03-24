import { IMediaLoader } from 'src/media-loader/i-media-loader';
import { IMediaLoaderRegistry } from 'src/media-loader/registry/i-media-loader-registry';
import { MediaLoaderRegistry } from 'src/media-loader/registry/media-loader-registry';
import { IMediaSource } from 'src/media-source/i-media-source';
import { MediaSource } from 'src/media-source/media-source';
import { NotImplementException } from 'src/utils/exception/not-implement-exception';
import { SimpleNode } from '../simple-node';

export class MediaSourceNode extends SimpleNode {
  private _mediaLoaderRegistry: IMediaLoaderRegistry;

  private _mediaLoader?: IMediaLoader;
  private _mediaSource?: IMediaSource;

  public constructor(mediaLoaderRegistry = MediaLoaderRegistry.Default) {
    super();
    this._mediaLoaderRegistry = mediaLoaderRegistry;
  }

  public override process(data: unknown): void {
    throw new NotImplementException();
  }

  public dispose(): void {
    this._mediaLoader?.stop();
    this._mediaSource?.dispose();
    this._mediaLoader = undefined;
    this._mediaSource = undefined;
  }
}
