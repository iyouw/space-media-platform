import { CountableMap } from '../../utils/map/countable-map';
import { MediaType } from '../media-type';
import { Stream } from '../stream/stream';

export class PMT extends CountableMap<number, Stream> {
  public getStreams(type?: MediaType | undefined): Array<Stream> {
    const streams = this.values();
    if (!type) return streams;
    return streams.filter((x) => x.mediaType === type);
  }
}
