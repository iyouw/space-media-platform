import { Counter } from './counter';
import { ICountable } from './i-countable';

export class Countable implements ICountable {
  private _counter: Counter;

  public constructor(max: number) {
    this._counter = new Counter(max);
  }

  public get max(): number {
    return this._counter.max;
  }

  public get isCompleted(): boolean {
    return this._counter.isCompleted;
  }

  public count(count: number): void {
    this._counter.count(count);
  }
}
