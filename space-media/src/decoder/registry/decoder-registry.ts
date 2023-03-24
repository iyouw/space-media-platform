import { Registry } from 'src/utils/registry/registry';
import { CodecId } from '../codec-id';
import { IDecoderProvider } from '../provider/i-decoder-provider';
import { IDecoderRegistry } from './i-decoder-registry';

export class DecoderRegistry extends Registry<IDecoderProvider> implements IDecoderRegistry {
  public static readonly Default = DecoderRegistry.CreateDefault();

  public static CreateDefault(): DecoderRegistry {
    const res = new DecoderRegistry();

    return res;
  }

  public getProvider(codecId: CodecId): IDecoderProvider | undefined {
    return this.find((item) => item.canDecode(codecId));
  }
}
