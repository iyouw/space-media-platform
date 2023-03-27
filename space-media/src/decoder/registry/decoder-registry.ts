import { Registry } from '../../utils/registry/registry';
import { CodecId } from '../codec-id';
import { IDecoderProvider } from '../provider/i-decoder-provider';
import { Mpeg1DecoderProvider } from '../mpeg1/mpeg1-decoder-provider';
import { IDecoderRegistry } from './i-decoder-registry';
import { Mp2DecoderProvider } from '../mp2/mp2-decoder-provider';

export class DecoderRegistry extends Registry<IDecoderProvider> implements IDecoderRegistry {
  public static readonly Default = DecoderRegistry.CreateDefault();

  public static CreateDefault(): DecoderRegistry {
    const res = new DecoderRegistry();
    res.register(new Mpeg1DecoderProvider());
    res.register(new Mp2DecoderProvider());
    return res;
  }

  public getProvider(codecId: CodecId): IDecoderProvider | undefined {
    return this.find((item) => item.canDecode(codecId));
  }
}
