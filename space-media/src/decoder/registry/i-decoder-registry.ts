import { Registry } from '../../utils/registry/registry';
import { CodecId } from '../codec-id';
import { IDecoderProvider } from '../provider/i-decoder-provider';

export interface IDecoderRegistry extends Registry<IDecoderProvider> {
  getProvider(codecId: CodecId): IDecoderProvider | undefined;
}
