import { Registry } from '../../utils/registry/registry';
import { IMediaLoaderProvider } from '../provider/i-media-loader-provider';
import { WebsocketMediaLoaderProvider } from '../provider/websocket-media-loader-provider';
import { IMediaLoaderRegistry } from './i-media-loader-registry';

export class MediaLoaderRegistry extends Registry<IMediaLoaderProvider> implements IMediaLoaderRegistry {
  public static readonly Default = MediaLoaderRegistry.CreateDefault();

  public static CreateDefault(): MediaLoaderRegistry {
    const res = new MediaLoaderRegistry();
    res.register(new WebsocketMediaLoaderProvider());
    return res;
  }

  public getProvider(url: string): IMediaLoaderProvider | undefined {
    return this.find((item) => item.canLoad(url));
  }
}
