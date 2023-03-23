import { IMediaLoader } from '../i-media-loader';

export interface IMediaLoaderProvider {
  canLoad(url: string): boolean;
  provide(url: string, option?: Record<string, unknown>): IMediaLoader;
}
