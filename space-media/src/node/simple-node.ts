import { INode, ISimpleNode } from './i-node';

export abstract class SimpleNode<T = unknown> implements ISimpleNode<T> {
  protected _destination?: INode;

  public connect(node: INode): void {
    this._destination = node;
  }

  public abstract process(data: T): void;
  public abstract dispose(): void;
}
