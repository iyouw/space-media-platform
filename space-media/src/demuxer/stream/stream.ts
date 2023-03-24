import { CodecId } from 'src/decoder/codec-id';
import { MediaType } from '../media-type';
import { StreamType } from './stream-type';

export class Stream {
  public id: number;
  public type: StreamType;

  public constructor(id = 0, type: StreamType = StreamType.UNKNOW) {
    this.id = id;
    this.type = type;
  }

  public get mediaType(): MediaType {
    return MediaType.UNKNOW;
  }

  public get codeId(): CodecId {
    return CodecId.UNKNOW;
  }
}
