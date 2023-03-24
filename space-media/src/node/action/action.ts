import { Action } from 'src/utils/typings';
import { Node } from '../node';

export class ActionNode<T = unknown> extends Node<T> {
  private _action: Action<T>;

  public constructor(action: Action<T>) {
    super();
    this._action = action;
  }

  public override process(data: T): void {
    this._action(data);
  }
}
