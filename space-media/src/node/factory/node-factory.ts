import { Packet } from 'src/demuxer/packet/packet';
import { IMediaSource } from 'src/media-source/i-media-source';
import { Action } from 'src/utils/typings';
import { ActionNode } from '../action/action';
import { MediaDecodeNode } from '../decode/media-decode-node';
import { MediaDemuxNode } from '../demux/media-demux-node';
import { INode } from '../i-node';
import { INodeFactory } from '../i-node-factory';
import { MediaSourceNode } from '../media-source/media-source-node';

export class NodeFactory implements INodeFactory {
  public static readonly Default = new NodeFactory();

  public createMediaSourceNode(url: string): INode {
    return new MediaSourceNode(url);
  }

  public createDemuxNode(): INode<IMediaSource> {
    return new MediaDemuxNode();
  }

  public createDecodeNode(): INode<Packet> {
    return new MediaDecodeNode();
  }

  public createAction<T>(action: Action<T>): INode<T> {
    return new ActionNode(action);
  }
}
