import { CodecId } from '../codec-id';
import { IDecoder } from '../i-decoder';
import { Mpeg1Decoder } from './mpeg1-decoder';
import { IDecoderProvider } from '../provider/i-decoder-provider';

export class Mpeg1DecoderProvider implements IDecoderProvider {
  public canDecode(codecId: CodecId): boolean {
    return codecId === CodecId.ID_MPEG1VIDEO || codecId === CodecId.ID_MPEG2VIDEO;
  }

  public provide(): IDecoder {
    return new Mpeg1Decoder();
  }
}
