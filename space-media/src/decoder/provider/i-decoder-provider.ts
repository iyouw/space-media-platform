import { CodecId } from '../codec-id';
import { IDecoder } from '../i-decoder';

export interface IDecoderProvider {
  canDecode(codecId: CodecId): boolean;
  provide(): IDecoder;
}
