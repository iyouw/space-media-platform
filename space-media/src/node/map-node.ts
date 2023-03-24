import { IMapNode, INode } from './i-node';

export abstract class MapNode<T = unknown> implements IMapNode<T> {
  protected _nodeMap: Map<unknown, INode>;

  public constructor() {
    this._nodeMap = new Map<unknown, INode>();
  }

  public connect(key: unknown, node: INode<unknown>): void {
    if (!this._nodeMap.has(key)) this._nodeMap.set(key, node);
  }

  public abstract process(data: T): void;
  public abstract dispose(): void;
}
