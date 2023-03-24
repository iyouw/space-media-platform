import { INode } from './i-node';

export abstract class Node<T = unknown> implements INode<T> {
  public static readonly DefaultChannel = Symbol('default');

  private _map: Map<unknown, INode>;

  public constructor() {
    this._map = new Map<unknown, INode>();
  }

  public abstract process(data: T): void;

  public connect(node: INode, channel?: unknown): void {
    channel ??= Node.DefaultChannel;
    this._map.set(channel, node);
  }

  public dispose(): void {
    void 0;
  }

  protected getConnectNode(channel?: unknown): INode | undefined {
    channel ??= Node.DefaultChannel;
    return this._map.get(channel);
  }
}
