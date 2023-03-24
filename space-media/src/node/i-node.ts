export interface ISimpleNode<T = unknown> {
  connect(node: INode): void;
  process(data: T): void;
  dispose(): void;
}

export interface IMapNode<T = unknown> {
  connect(key: unknown, node: INode): void;
  process(data: T): void;
  dispose(): void;
}

export type INode<T = unknown> = ISimpleNode<T> | IMapNode<T>;
