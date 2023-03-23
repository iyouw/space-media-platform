import { Predicate } from '../typings';

export class Registry<T> {
  private _items: Array<T>;

  public constructor() {
    this._items = new Array<T>();
  }

  public register(item: T): void {
    this._items.push(item);
  }

  public find(predicate: Predicate<T>): T | undefined {
    return this._items.find(predicate);
  }

  public clear(): void {
    this._items = new Array<T>();
  }
}
