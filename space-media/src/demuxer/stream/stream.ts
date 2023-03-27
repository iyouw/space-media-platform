import { CodecId } from '../../decoder/codec-id';
import { MediaType } from '../media-type';
import { IStreamTypeLookup } from './i-stream-lookup';

export class Stream {
  private _id: number;
  private _type: number;
  private _lookup: IStreamTypeLookup;

  public constructor(id = 0, type: number, streamTypeLookup: IStreamTypeLookup) {
    this._id = id;
    this._type = type;
    this._lookup = streamTypeLookup;
  }

  public get id(): number {
    return this._id;
  }

  public get type(): number {
    return this._type;
  }

  public get mediaType(): MediaType {
    const entry = this._lookup[this._type];
    return entry ? entry.mediaType : MediaType.UNKNOW;
  }

  public get codeId(): CodecId {
    const entry = this._lookup[this._type];
    return entry ? entry.codecId : CodecId.ID_UNKNOW;
  }
}
