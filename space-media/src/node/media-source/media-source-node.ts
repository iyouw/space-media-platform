import { IMediaLoader } from '../../media-loader/i-media-loader';
import { IMediaLoaderRegistry } from '../../media-loader/registry/i-media-loader-registry';
import { MediaLoaderRegistry } from '../../media-loader/registry/media-loader-registry';
import { IMediaSource } from '../../media-source/i-media-source';
import { MediaSource } from '../../media-source/media-source';
import { NotFoundException } from '../../utils/exception/not-found-exception';
import { NotImplementException } from '../../utils/exception/not-implement-exception';
import { Node } from '../node';

export class MediaSourceNode extends Node {
  private _mediaLoaderRegistry: IMediaLoaderRegistry;

  private _mediaLoader?: IMediaLoader;
  private _mediaSource?: IMediaSource;

  public constructor(url: string, mediaSource?: IMediaSource, mediaLoaderRegistry = MediaLoaderRegistry.Default) {
    super();
    this._mediaLoaderRegistry = mediaLoaderRegistry;
    this._mediaSource = mediaSource ?? new MediaSource(url);
    this._mediaLoader = this.createMediaLoader(url);

    this._mediaLoader.onDataArrived = (data: ArrayBuffer) => {
      this._mediaSource?.write(data);
      const node = this.getConnectNode();
      node?.process(this._mediaSource);
    };

    this._mediaLoader.start();
  }

  public override process(): void {
    throw new NotImplementException();
  }

  public dispose(): void {
    this._mediaLoader?.stop();
    this._mediaSource?.dispose();
    this._mediaLoader = undefined;
    this._mediaSource = undefined;
  }

  protected createMediaLoader(url: string): IMediaLoader {
    const provider = this._mediaLoaderRegistry.getProvider(url);
    if (!provider) throw new NotFoundException(`loader for ${url}`);
    return provider.provide(url);
  }
}
