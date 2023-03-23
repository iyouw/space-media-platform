import { IMediaLoader } from '../i-media-loader';
import { WebsocketMediaLoader } from '../websocket-media-loader';
import { IMediaLoaderProvider } from './i-media-loader-provider';

export class WebsocketMediaLoaderProvider implements IMediaLoaderProvider {
  public static readonly REGEXP = /^wss?:\/\//i;

  public canLoad(url: string): boolean {
    return WebsocketMediaLoaderProvider.REGEXP.test(url);
  }

  public provide(url: string, option?: Record<string, unknown>): IMediaLoader {
    return new WebsocketMediaLoader(url);
  }
}
