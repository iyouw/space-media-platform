import { IDecoder } from 'src/decoder/i-decoder';
import { DecoderRegistry } from 'src/decoder/registry/decoder-registry';
import { IDecoderRegistry } from 'src/decoder/registry/i-decoder-registry';
import { Packet } from 'src/demuxer/packet/packet';
import { NotFoundException } from 'src/utils/exception/not-found-exception';
import { Node } from '../node';

export class MediaDecodeNode extends Node<Packet> {
  private _decoderRegistry: IDecoderRegistry;
  private _decoder?: IDecoder;

  public constructor(decoderRegistry = DecoderRegistry.Default) {
    super();
    this._decoderRegistry = decoderRegistry;
  }

  public process(data: Packet): void {
    if (!this._decoder) {
      const provider = this._decoderRegistry.getProvider(data.codeId);
      if (!provider) throw new NotFoundException(`decoder for ${data.codeId}`);
      this._decoder = provider.provide();
    }
    const frame = this._decoder.decode(data);
    const node = this.getConnectNode();
    node?.process(frame);
  }

  public dispose(): void {
    this._decoder?.dispose();
    this._decoder = undefined;
  }
}
