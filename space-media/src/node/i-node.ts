export interface INode<T = unknown> {
  connect(node: INode, channel?: unknown): void;
  process(data: T): void;
  dispose(): void;
}
