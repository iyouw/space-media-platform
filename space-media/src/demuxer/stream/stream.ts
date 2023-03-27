import { CodecId } from 'src/decoder/codec-id';
import { MediaType } from '../media-type';
import { StreamType } from './stream-type';

export class Stream {
  private _id: number;
  private _type: StreamType;

  public constructor(id = 0, type: StreamType) {
    this._id = id;
    this._type = type;
  }

  public get id(): number {
    return this._id;
  }

  public get type(): StreamType {
    return this._type;
  }

  public get mediaType(): MediaType {
    return MediaType.UNKNOW;
  }

  public get codeId(): CodecId {
    return CodecId.UNKNOW;
  }
}
