import { Registry } from '../../utils/registry/registry';
import { IMediaLoaderProvider } from '../provider/i-media-loader-provider';

export interface IMediaLoaderRegistry extends Registry<IMediaLoaderProvider> {
  getProvider(url: string): IMediaLoaderProvider | undefined;
}
