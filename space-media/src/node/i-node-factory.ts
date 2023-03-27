import { Packet } from '../demuxer/packet/packet';
import { IMediaSource } from '../media-source/i-media-source';
import { Action } from '../utils/typings';
import { INode } from './i-node';

export interface INodeFactory {
  createMediaSourceNode(url: string): INode;
  createDemuxNode(): INode<IMediaSource>;
  createDecodeNode(): INode<Packet>;
  createAction<T>(action: Action<T>): INode<T>;
}
