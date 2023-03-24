import { IDecoder } from 'src/decoder/i-decoder';
import { DecoderRegistry } from 'src/decoder/registry/decoder-registry';
import { IDecoderRegistry } from 'src/decoder/registry/i-decoder-registry';
import { Packet } from 'src/demuxer/packet/packet';
import { NotImplementException } from 'src/utils/exception/not-implement-exception';
import { SimpleNode } from '../simple-node';

export class MediaDecodeNode extends SimpleNode<Packet> {
  private _decoderRegistry: IDecoderRegistry;
  private _decoder?: IDecoder;

  public constructor(decoderRegistry = DecoderRegistry.Default) {
    super();
    this._decoderRegistry = decoderRegistry;
  }

  public process(data: Packet): void {
    throw new NotImplementException();
  }

  public dispose(): void {
    this._decoder?.dispose();
    this._decoder = undefined;
  }
}
