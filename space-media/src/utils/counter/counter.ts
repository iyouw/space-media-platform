export class Counter {
  private _max: number;

  private _current: number;

  public constructor(max: number) {
    this._max = max;
    this._current = 0;
  }

  public get max(): number {
    return this._max;
  }

  public get current(): number {
    return this._current;
  }

  public get isCompleted(): boolean {
    return this._current >= this._max;
  }

  public count(count: number): void {
    if (this.isCompleted) return;
    this._current += count;
  }
}
