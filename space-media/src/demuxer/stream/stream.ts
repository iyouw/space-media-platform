import { MediaStreamType } from './stream-type';

export class MediaStream {
  public id: number;
  public type: MediaStreamType;

  public constructor(id = 0, type: MediaStreamType = MediaStreamType.UNKNOW) {
    this.id = id;
    this.type = type;
  }
}
