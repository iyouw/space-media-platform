import { CodecId } from 'src/decoder';
import { MediaType } from '../media-type';

export interface IStreamTypeLookupEntry {
  codecId: CodecId;
  mediaType: MediaType;
}

export interface IStreamTypeLookup {
  [index: number]: IStreamTypeLookupEntry | undefined;
}
