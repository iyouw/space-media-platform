import { StreamType } from './stream-type';

export class Stream {
  public id: number;
  public type: StreamType;

  public constructor(id = 0, type: StreamType = StreamType.UNKNOW) {
    this.id = id;
    this.type = type;
  }
}
