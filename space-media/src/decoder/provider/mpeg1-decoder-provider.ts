import { CodecId } from '../codec-id';
import { IDecoder } from '../i-decoder';
import { Mpeg1Decoder } from '../mpeg1/mpeg1-decoder';
import { IDecoderProvider } from './i-decoder-provider';

export class Mpeg1DecoderProvider implements IDecoderProvider {
  public canDecode(codecId: CodecId): boolean {
    return codecId === CodecId.MPEG1;
  }

  public provide(): IDecoder {
    return new Mpeg1Decoder();
  }
}
