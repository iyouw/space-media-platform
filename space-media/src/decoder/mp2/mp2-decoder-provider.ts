import { CodecId } from '../codec-id';
import { IDecoder } from '../i-decoder';
import { IDecoderProvider } from '../provider/i-decoder-provider';
import { Mp2Decoder } from './mp2-decoder';

export class Mp2DecoderProvider implements IDecoderProvider {
  public canDecode(codecId: CodecId): boolean {
    return codecId === CodecId.ID_MP1 || codecId === CodecId.ID_MP2;
  }

  public provide(): IDecoder {
    return new Mp2Decoder();
  }
}
