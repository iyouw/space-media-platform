import { Registry } from '../../utils/registry/registry';
import { CodecId } from '../codec-id';
import { IDecoderProvider } from '../provider/i-decoder-provider';
import { Mpeg1DecoderProvider } from '../provider/mpeg1-decoder-provider';
import { IDecoderRegistry } from './i-decoder-registry';

export class DecoderRegistry extends Registry<IDecoderProvider> implements IDecoderRegistry {
  public static readonly Default = DecoderRegistry.CreateDefault();

  public static CreateDefault(): DecoderRegistry {
    const res = new DecoderRegistry();
    res.register(new Mpeg1DecoderProvider());
    return res;
  }

  public getProvider(codecId: CodecId): IDecoderProvider | undefined {
    return this.find((item) => item.canDecode(codecId));
  }
}
